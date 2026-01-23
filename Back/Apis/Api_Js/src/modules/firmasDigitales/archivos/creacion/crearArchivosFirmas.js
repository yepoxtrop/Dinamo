/* Librerias */
import forge from "node-forge"; 

/* Modulos node js */
import path from "path";
import fs from "fs/promises"; 

export const creacionArchivosFirmas = async ({nombre_usuario, fechaCreacion, contrasena, rutaArchivoPub, rutaArchivoKey, rutaArchivoCsr, rutaArchivoCrt, rutaArchivoP12}) => {
    try {
        /* PAR DE LLAVES(PUB, KEY) */
        /* creación de par de llaves */
        let clave = forge.pki.rsa.generateKeyPair({
            bits : 2048, 
            e : 0x10001
        }); 
        
        /* Convertir las llaves a PEM */
        let clavePrivadaPem = forge.pki.privateKeyToPem(clave.privateKey); 
        let clavePublicaPem = forge.pki.publicKeyToPem(clave.publicKey); 

        /* Guardar la llave pub */
        await fs.writeFile(
            rutaArchivoKey,
            clavePrivadaPem,
            {
                encoding:'utf-8',
            }
        );

        await fs.writeFile(
            rutaArchivoPub,
            clavePublicaPem,
            {
                encoding:'utf-8',
            }
        );

        /* SOLICITUD DE CERTIFICADO (CSR) */
        /* Iniciar la solicitud de certificado */
        let solicitudCertificado = forge.pki.createCertificationRequest();

        /* Configurar la solicitud de certificado */
        solicitudCertificado.publicKey = clave.publicKey;
        solicitudCertificado.setSubject([
            {
                name: 'commonName', 
                value: nombre_usuario 
            },
            {
                name: 'countryName', 
                value: 'CO'
            },
            {
                name: 'stateOrProvinceName',
                value: 'Cundinamarca'
            }, 
            {
                name: 'localityName', 
                value: 'Bogotá D.C'
            },
            {
                name: 'organizationName', 
                value: 'ACS - Aciel Soluciones Integrales S.A.S'
            },
        ]);

        /* Firmar la solicitud de certificado */
        solicitudCertificado.sign(clave.privateKey);
        
        /* Convertir la solicitud de certificado a PEM */
        let solicitudCertificadoPem = forge.pki.certificationRequestToPem(solicitudCertificado);
        
        /* Guardar la csr */
        await fs.writeFile(
            rutaArchivoCsr, 
            solicitudCertificadoPem,
            {
                encoding:"utf-8"
            }
        );
        
        /* CERTIFICADO (CRT) */
        let certificado = forge.pki.createCertificate();
        certificado.publicKey = clave.publicKey;

        // Serial único
        const serialBytes = forge.random.getBytesSync(16);
        certificado.serialNumber = forge.util.bytesToHex(serialBytes).replace(/^0+/, '') || '1';

        certificado.validity.notBefore = new Date(fechaCreacion);
        certificado.validity.notAfter = new Date(certificado.validity.notBefore);
        certificado.validity.notAfter.setMonth(certificado.validity.notAfter.getMonth() + 3);

        certificado.setSubject(solicitudCertificado.subject.attributes);
        certificado.setIssuer(solicitudCertificado.subject.attributes);

        certificado.setExtensions([
          { name: 'basicConstraints', cA: false },
          {
            name: 'keyUsage',
            digitalSignature: true,
            nonRepudiation: true,
            keyEncipherment: true
          },
          {
            name: 'extendedKeyUsage',
            usage: ['1.3.6.1.4.1.311.10.3.12'] // Document Signing
          },
          { name: 'subjectKeyIdentifier' }
        ]);

        certificado.sign(clave.privateKey, forge.md.sha256.create());

        /* Convertir el certificado a PEM */
        let certificadoPem = forge.pki.certificateToPem(certificado);

        /* Guardar el crt */
        await fs.writeFile(
            rutaArchivoCrt, 
            certificadoPem,
            {
                encoding:"utf-8"
            }
        );

        /* FIRMA DIGITAL (P12) */
        /* Iniciar la firma digital */
        let firmaDigital = forge.pkcs12.toPkcs12Asn1(
            clave.privateKey,
            certificado,
            contrasena,
            {
                generateLocalKeyId: true,
                friendlyName: 'Certificado ACS-FIRMAS'
            }
        );
        
        /* Convertir a binario(DER) */
        let firmaP12 = forge.asn1.toDer(firmaDigital).getBytes();

        /* Guardar el p12 */
        await fs.writeFile(
            rutaArchivoP12, 
            Buffer.from(firmaP12, 'binary')
        );        

        return true
    } catch (error) {
       return error; 
    }
}
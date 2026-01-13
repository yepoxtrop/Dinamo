//Librerias
import forge from "node-forge"; 

//Modulos Nativos
import path from "path";
import fs from "fs"; 

export const archivo_crt = async (datos, llave_publica, llave_privada, solicitud_certificado, ruta) => {
    try {
        let ruta_certificado = path.join(ruta,`${datos.cedula}.crt`); 

        let certificado = forge.pki.createCertificate();

        let archivo_pub = await fs.promises.readFile(
            llave_publica,
            {
                encoding:'utf-8',
                flag:'r'
            }
        )
        
        let archivo_key = await fs.promises.readFile(
            llave_privada,
            {
                encoding:'utf-8',
                flag:'r'
            }
        )

        let archivo_csr = await fs.promises.readFile(
            solicitud_certificado,
            {
                encoding:'utf-8',
                flag:'r'
            }
        )
    
        let llave_publica_decodificada = forge.pki.publicKeyFromPem(archivo_pub); 
        let llave_privada_decodificada = forge.pki.privateKeyFromPem(archivo_key); 
        let solicitud_certificado_decodificada = forge.pki.certificationRequestFromPem(archivo_csr); 

        certificado.publicKey = llave_publica_decodificada;
        certificado.serialNumber = '01';
        certificado.validity.notBefore = new Date();
        certificado.validity.notBefore = new Date(); 
        certificado.validity.notAfter.setFullYear(certificado.validity.notBefore.getFullYear() + 1);

        certificado.setSubject(solicitud_certificado_decodificada.subject.attributes);
        certificado.setIssuer(solicitud_certificado_decodificada.subject.attributes); // Auto-firmado: issuer = subject

        //firma el certificado
        certificado.sign(llave_privada_decodificada, forge.md.sha256.create());

        //Cifra el certificado
        let certificado_cifrado = forge.pki.certificateToPem(certificado);

        //Cracion del archivo
        fs.writeFileSync(
            ruta_certificado, 
            certificado_cifrado,
            {
                encoding:"utf-8"
            }
        );

        return {"Mensaje":"Archivo .crt creado",
                "Estado":true,
                "Certificado":ruta_certificado,
                "Error":null
            }
    } catch (error) {
        return {"Mensaje":"Fallo al crear el archivo .crt creado",
                "Estado":false,
                "Certificado":null,
                "Error":error
            }
    }
}
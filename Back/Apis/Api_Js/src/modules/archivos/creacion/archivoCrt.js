//Librerias
import forge from "node-forge"; 

//Modulos Nativos
import path from "path";
import fs from "fs"; 

export const archivoCrt = async (datos, ruta) => {
    try {

        let ruta_archivo_pub = path.join(ruta,`${datos.cedula}.pub`);
        let ruta_archivo_key = path.join(ruta,`${datos.cedula}.key`);
        let ruta_archivo_csr = path.join(ruta,`${datos.cedula}.csr`);
        let ruta_certificado = path.join(ruta,`${datos.cedula}.crt`); 

        let certificado = forge.pki.createCertificate();

        let archivo_pub = await fs.promises.readFile(
            ruta_archivo_pub,
            {
                encoding:'utf-8',
                flag:'r'
            }
        )
        
        let archivo_key = await fs.promises.readFile(
            ruta_archivo_key,
            {
                encoding:'utf-8',
                flag:'r'
            }
        )

        let archivo_csr = await fs.promises.readFile(
            ruta_archivo_csr,
            {
                encoding:'utf-8',
                flag:'r'
            }
        )
    
        let ruta_archivo_pub_decodificada = forge.pki.publicKeyFromPem(archivo_pub); 
        let ruta_archivo_key_decodificada = forge.pki.privateKeyFromPem(archivo_key); 
        let ruta_archivo_csr_decodificada = forge.pki.certificationRequestFromPem(archivo_csr); 

        certificado.publicKey = ruta_archivo_pub_decodificada;
        certificado.serialNumber = '01';
        certificado.validity.notBefore = new Date();
        certificado.validity.notBefore = new Date(); 
        certificado.validity.notAfter.setFullYear(certificado.validity.notBefore.getFullYear() + 1);

        certificado.setSubject(ruta_archivo_csr_decodificada.subject.attributes);
        certificado.setIssuer(ruta_archivo_csr_decodificada.subject.attributes); // Auto-firmado: issuer = subject

        //firma el certificado
        certificado.sign(ruta_archivo_key_decodificada, forge.md.sha256.create());

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
//Librerias
import forge from "node-forge"; 

//Modulos Nativos
import path from "path";
import fs from "fs"; 

export async function archivo_crt(datos, llave_publica_privada, solicitud_certificado, ruta) {
    try {
        let rutaArchivo = path.join(ruta,`${datos.cedula}.crt`); 

        let certificado = forge.pki.createCertificate();
        certificado.publicKey = llave_publica_privada.publicKey;
        certificado.serialNumber = '01';
        certificado.validity.notBefore = new Date();
        certificado.validity.notAfter = new Date();
        certificado.validity.notAfter.setFullYear(certificado.validity.notBefore.getFullYear() + 1);
        certificado.setSubject(solicitud_certificado.subject.attributes);
        certificado.setIssuer(solicitud_certificado.subject.attributes); // Auto-firmado: issuer = subject

        //firma el certificado
        certificado.sign(llave_publica_privada.privateKey, forge.md.sha256.create());

        //Cifra el certificado
        let certificado_cifrado = forge.pki.certificateToPem(certificado);

        //Cracion del archivo
        fs.writeFileSync(rutaArchivo, certificado_cifrado);

        return {"Mensaje":"Archivo .crt creado",
                "Estado":true,
                "Ruta":rutaArchivo,
                "Certificado":certificado,
                "Error":null
            }
    } catch (error) {
        return {"Mensaje":"Fallo al crear el archivo .crt creado",
                "Estado":false,
                "Ruta":null,
                "Certificado":null,
                "Error":error
            }
    }
}
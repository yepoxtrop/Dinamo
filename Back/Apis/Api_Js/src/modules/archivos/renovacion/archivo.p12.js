//Librerias
import forge from "node-forge"; 

//Modulos Nativos
import path from "path";
import fs from "fs"; 

export async function archivo_p12(datos, llave_publica_privada, certificado, ruta) {
    try {
        let rutaArchivo = path.join(ruta,`${datos.cedula}.p12`); 

        const FirmaDigital = forge.pkcs12.toPkcs12Asn1(
            llave_publica_privada.privateKey,
            certificado, // cadena de certificados (puedes incluir CA si la tienes)
            datos.contrasena,
            {
                generateLocalKeyId: true,
                friendlyName: 'Certificado Luis Sarmiento'
            }
        );
        
        // Convertir a binario(DER)
        let p12Der = forge.asn1.toDer(FirmaDigital).getBytes();
        fs.writeFileSync(rutaArchivo, Buffer.from(p12Der, 'binary'));

        return {"Mensaje":"Archivo .p12 creado",
                "Estado":true,
                "Ruta":rutaArchivo,
                "Certificado":p12Der,
                "Error":null
        }
    } catch (error) {
        return {"Mensaje":"Fallo al crear el archivo .p12 creado",
                "Estado":false,
                "Ruta":null,
                "Certificado":null,
                "Error":error
        }
    }
}
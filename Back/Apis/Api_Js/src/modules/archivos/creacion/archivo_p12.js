//Librerias
import forge from "node-forge"; 

//Modulos Nativos
import path from "path";
import fs from "fs"; 

export async function archivoP12(datos, ruta) {
    try {
        let ruta_archivo_key = path.join(ruta,`${datos.cedula}.key`);
        let ruta_archivo_crt = path.join(ruta,`${datos.cedula}.crt`);
        let ruta_firma = path.join(ruta,`${datos.cedula}.p12`); 
                
        let archivo_key = await fs.promises.readFile(
            ruta_archivo_key,
            {
                encoding:'utf-8',
                flag:'r'
            }
        )

        let archivo_crt = await fs.promises.readFile(
            ruta_archivo_crt,
            {
                encoding:'utf-8',
                flag:'r'
            }
        )

        let ruta_archivo_key_decodificada = forge.pki.privateKeyFromPem(archivo_key); 
        let certificado_decodificado = forge.pki.certificateFromPem(archivo_crt); 

        let firma_digital = forge.pkcs12.toPkcs12Asn1(
            ruta_archivo_key_decodificada,
            certificado_decodificado,
            datos.contrasena,
            {
                generateLocalKeyId: true,
                friendlyName: 'Certificado ACS-FIRMAS'
            }
        );
        
        // Convertir a binario(DER)
        let firma_p12 = forge.asn1.toDer(firma_digital).getBytes();
        fs.writeFileSync(
            ruta_firma, 
            Buffer.from(firma_p12, 'binary')
        );

        return {
            "Mensaje":"Archivo .p12 creado",
            "Estado":true,
            "Firma":ruta_firma,
            "Error":null
        }
    } catch (error) {
        return {
            "Mensaje":"Fallo al crear el archivo .p12 creado",
            "Estado":false,
            "Firma":null,
            "Error":error
        }
    }
}
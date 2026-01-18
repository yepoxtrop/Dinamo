//Librerias
import forge from "node-forge"; 

//Modulos Nativos
import path from "path";
import fs from "fs"; 

export const archivoKeys = async (datos, ruta) => { 
    try {
        
        let clave = forge.pki.rsa.generateKeyPair({
            bits : 2048, 
            e : 0x10001
        }); 
        
        let clave_privada_cifrada = forge.pki.privateKeyToPem(clave.privateKey); 
        let clave_publica_cifrada = forge.pki.publicKeyToPem(clave.publicKey); 

        let ruta_archivo_key = path.join(ruta,`${datos.cedula}.key`);
        let ruta_archivo_pub = path.join(ruta,`${datos.cedula}.pub`); 

        fs.writeFileSync(
            ruta_archivo_key,
            clave_privada_cifrada,
            {
                encoding:'utf-8',
            }
        );  

        fs.writeFileSync(
            ruta_archivo_pub,
            clave_publica_cifrada,
            {
                encoding:'utf-8',
            }
        );  

        return {
            "Mensaje":"Archivo .key y .pub creados",
            "Estado":true,
            "Archivo_key":ruta_archivo_key,
            "Archivo_pub":ruta_archivo_pub,
            "Error":null
        }
    } catch (error) {
        return {
            "Mensaje":"Fallo al crear el archivo .key y .pub creado",
            "Estado":false,
            "Archivo_key":null,
            "Archivo_pub":null,
            "Error":error
        }
    }
}
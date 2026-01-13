//Librerias
import forge from "node-forge"; 

//Modulos Nativos
import path from "path";
import fs from "fs"; 

export async function archivo_csr(datos, llave_publica, llave_privada, ruta) {
    try {
        let solicitud_certificado = forge.pki.createCertificationRequest();
        let ruta_solicitud_certificado = path.join(ruta,`${datos.cedula}.csr`); 

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

        let llave_publica_decodificada = forge.pki.publicKeyFromPem(archivo_pub); 
        let llave_privada_decodificada = forge.pki.privateKeyFromPem(archivo_key); 

        solicitud_certificado.publicKey = llave_publica_decodificada;
        solicitud_certificado.setSubject([
            {
                name: 'commonName', 
                value: datos.nombre 
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

        //firma el certifacado con la llave
        solicitud_certificado.sign(llave_privada_decodificada);
        
        //Cifra la solictud de certificado
        let solicitud_certificado_cifrado = forge.pki.certificationRequestToPem(solicitud_certificado);
        
        //Cracion del archivo
        fs.writeFileSync(
            ruta_solicitud_certificado, 
            solicitud_certificado_cifrado,
            {
                encoding:"utf-8"
            }
        );

        return {
            "Mensaje":"Archivo .csr creado",
            "Estado":true,
            "Solicitud_certificado":ruta_solicitud_certificado,
            "Error":null
        }
    } catch (error) {
        return {
            "Mensaje":"Fallo al crear el archivo .csr",
            "Estado":false,
            "Ruta":null,
            "Error":error
        }
    }
}
/*========================================================================================================================
FECHA CREACION: 2026/01/22
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Controlador para la creacion de firmas digitales individuales, esto incluye ficheros
                .key, .pub, .csr, .crt, .p12, con su respectiva carpeta, y adicional con el
                envio de correos de notificacion al usuario y supervisor
Modulos       : Tokens, creacion de carpetas, creacion de archivos, procedimientos almacenados y 
                modulos de node
FECHA MODIFICACION: 2026/01/22
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
MODIFICACION      : Se crea sp
========================================================================================================================*/

/* Librerias */
import multer from "multer"; 

/* Modulos */
/* Firmar documentos  */

export const firmarDocumentosController = async (request, response) =>{
    try {
        const datos = request.file;
        console.log(datos)
        response.status(200).json({
            "Mensaje":"Documento recibido",
            "Resultado":datos
        })
    } catch (error) {
        throw new Error("Error al firmar documento:"+error.message); 
    }
} 
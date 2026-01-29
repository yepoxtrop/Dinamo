/*========================================================================================================================
FECHA CREACION: 2026/01/29
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Controlador para hacer la creacion de firmas de forma masiva en a partir de un objeto con 
                objetos en su interior con la informacion de los usuario o con archivos csv y txt usando
                como delimitado el ";" y en caso de estos la primera fila no se tomara en cuenta.
Modulos       : Tokens, creacion de carpetas, creacion de archivos, procedimientos almacenados y 
                modulos de node
FECHA MODIFICACION: 2026/01/29
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
MODIFICACION      : Se crea sp
========================================================================================================================*/

/* Modulos */
import { validarTipoArchivo } from "../../modules/documentos/cargasMasivas.js";

export const firmaMasivaController = async(request, response) =>{
    try {
        const archivo = request.file;
        const peticion =  await validarTipoArchivo({rutaArchivo: archivo.path.replaceAll("\\","/")});
        console.log(peticion)
        response.status(200).json({
            "Mensaje":"Archivo recibido"
        }); 
    } catch (error) {
        console.log(error);
        response.status(500).json({
            "Mensaje":"Un error dentro del servidor"
        })
    }
}
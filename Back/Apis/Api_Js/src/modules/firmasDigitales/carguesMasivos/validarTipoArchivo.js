/* Librerias */ 
import mime from "mime-types"; 

/* Modulos */
import fs from "fs/promises"; 

export const validarTipoArchivo = async ({rutaArchivo}) => {
    try {
        const consultaTipoArchivo = await mime.lookup(rutaArchivo);
        console.log(consultaTipoArchivo);
        if (consultaTipoArchivo === "text/plain"){
            let peticionTXT = await validarArchivoTXT({pathArchivo:rutaArchivo})
            return peticionTXT; 
        }else if(consultaTipoArchivo === "text/csv"){
            //fs.createReadStream(rutaArchivo);
        }else{
            throw new Error("Tipo de archivo invalido");
        }
    } catch (error) {
        throw new Error(`Error al identificar el tipo de archivo:${error.message}`);
    }
}
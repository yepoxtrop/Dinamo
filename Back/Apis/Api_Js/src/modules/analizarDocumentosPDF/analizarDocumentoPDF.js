/* Librerias */

/* Modulos */ 
import fs from "fs/promises"; 
import { buffer } from "stream/consumers";

export const analizarDocumentoPDF = async ({pathDocumento}) =>{
    try {
        /* Convertir buffe(binario) de string y luego a hexadecimal */
        const bufferDocumento = await fs.readFile(pathDocumento); 
        const bufferHexa = bufferDocumento.toString('hex'); 


        //fs.writeFile("./buffer.txt", bufferDocumento);
        //fs.writeFile("./bufferHexa.txt", bufferHexa);


        return bufferHexa; 
    } catch (error) {
        throw new Error(`Error al analizar el documentos PDF:${error.message}`); 
    }
}
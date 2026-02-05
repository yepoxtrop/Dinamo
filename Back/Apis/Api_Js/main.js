/* Modulos */
import path from "path";
import fs from "fs/promises";

//Configuracion De Variables De Entorno
import { puerto } from "./src/settings/general/variables_generales.js";

//Constantes
import app from "./src/app.js";

async function main(puerto) {
    try {
        app.listen(puerto || 3000, ()=>{
            console.log('[ALERTA]:APLICACIÓN ARRIBA EN EL PUERTO 3000');

            /* Crear carpeta de documentos */
            let rutaDocumentos = path.join(process.cwd(), "..", "..", "..", "Docs", "DocumentosFirmas");
            fs.mkdir(rutaDocumentos, {recursive:true});  
            let rutaFirmas = path.join(process.cwd(), "..", "..", "..", "Docs", "FirmasDigitales");
            fs.mkdir(rutaFirmas, {recursive:true});  
            let rutaAnalizar = path.join(process.cwd(), "..", "..", "..", "Docs", "AnalizarDocumentos");
            fs.mkdir(rutaAnalizar, {recursive:true});  
        })
    } catch (error) {
        console.log(`[ALERTA]:${error}`); 
    }
}

main(puerto); 
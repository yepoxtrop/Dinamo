/* Modulos */
import { fileTypeFromFile } from "file-type"; 
import mime from "mime-types"; 
import csv from "csv-parser"; 
import fs from "fs/promises"; 
import { consultarUsuarioDominioCn } from "../dominio/consultarUsuarioDominio.js"; 

export const validarTipoArchivo = async ({rutaArchivo}) => {
    try {
        const consultaTipoArchivo = await mime.lookup(rutaArchivo);
        
        if (consultaTipoArchivo === "text/plain"){
            let contenidoArchivo = await fs.readFile(rutaArchivo, 'utf8'); 
            let listaFilas = contenidoArchivo.split("\n");

            listaFilas.forEach(async(valor, indice)=>{
                if (indice > 0 ){
                    try {
                        let listaUsuario = valor.split(";"); 
                    let consultaDominio = await consultarUsuarioDominioCn({nombre:listaUsuario[0]}); 
                    console.log(consultaDominio)
                    //console.log(listaUsuario)
                    //let consultaDominio
                    } catch (error) {
                        throw new Error("Error")
                    }
                }
                
            })
        }
        
        return true
    } catch (error) {
        throw new Error(`Error al identificar el tipo de archivo:${error.message}`);
    }
}

export const archivoTXT = async({pathArchivo}) =>{
    try {
        console.log(pathArchivo)
        // let contendioArchivo = await fs.readFile(rutaArchivo);
        // console.log(contendioArchivo)
        //return contendioArchivo;
    } catch (error) {
        throw new Error(`Error al procesar el archivo txt:${error.message}`); 
    }
}

// export const archivoCSV = async(rutaArchivo) =>{
//     try {
        
//     } catch (error) {
//         throw new Error(``);
//     }
// }
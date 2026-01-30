/* Librerias */
import csv from "csv-parser";

/* Modulos */
import fs from "fs"
import { consultarUsuarioDominioCn } from "../../dominio/consultarUsuarioDominio.js"; 

export const archivosCSV = async({pathArchivo}) =>{
    try {
        fs.createReadStream(pathArchivo,)
        .pipe(csv({separator:";"}))
        .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
    } catch (error) {
        
    }
}


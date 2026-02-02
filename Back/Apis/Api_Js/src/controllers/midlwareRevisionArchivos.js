/* Librerias */
import multer from 'multer';
import fs from 'fs/promises'; 
import path from 'path';
import { fileURLToPath } from 'url';
/* Funcion para la carpeta de archivos */

let rutaBase = fileURLToPath(import.meta.url); 
let rutaDocumentos = path.join(path.dirname(rutaBase),  "..", "..", "..", "..", "..", "Docs", "AnalizarDocumentos"); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, rutaDocumentos);
  },
  filename: (req, file, cb) => {
    cb(null, path.basename(file.originalname).replace(".zip","") + "_" + Date.now() + path.extname(file.originalname));
  }
});

export const midlewareRevisionArchivos = multer({storage}); 
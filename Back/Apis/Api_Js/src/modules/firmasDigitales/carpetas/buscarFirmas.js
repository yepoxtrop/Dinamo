/* Módulos node js */
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

export const buscarFirmas = async ({ nombre_usuario, cedula }) => {

    /* Construcción de rutas */
    const rutaArchivo = fileURLToPath(import.meta.url);
    const rutaBase = path.dirname(rutaArchivo);
    const rutaCarpeta = path.join(
      rutaBase,
      "..", "..", "..", "..", "..", "..", "..",
      "FirmasDigitales",
      nombre_usuario
    );
    const rutaArchivoKey = path.join(rutaCarpeta, `${cedula}.key`);
    const rutaArchivoPub = path.join(rutaCarpeta, `${cedula}.pub`);
    const rutaArchivoCsr = path.join(rutaCarpeta, `${cedula}.csr`);
    const rutaArchivoCrt = path.join(rutaCarpeta, `${cedula}.crt`);
    const rutaArchivoP12 = path.join(rutaCarpeta, `${cedula}.p12`);

    try {
        const stats = await fs.stat(rutaCarpeta);

        if (stats.isDirectory()) {
            return {
                "rutaCarpeta": rutaCarpeta,
                "rutaArchivoKey": rutaArchivoKey,
                "rutaArchivoPub": rutaArchivoPub,
                "rutaArchivoCsr": rutaArchivoCsr,
                "rutaArchivoCrt": rutaArchivoCrt,
                "rutaArchivoP12": rutaArchivoP12
            };
        } else {
            return null
        }
    } catch (error) {
        if (error.code === "ENOENT") {
            fs.mkdir(rutaCarpeta, { recursive: true });
            return {
                "rutaCarpeta": rutaCarpeta,
                "rutaArchivoKey": rutaArchivoKey,
                "rutaArchivoPub": rutaArchivoPub,
                "rutaArchivoCsr": rutaArchivoCsr,
                "rutaArchivoCrt": rutaArchivoCrt,
                "rutaArchivoP12": rutaArchivoP12
            };
        }else{
            return error;
        }
    }
};
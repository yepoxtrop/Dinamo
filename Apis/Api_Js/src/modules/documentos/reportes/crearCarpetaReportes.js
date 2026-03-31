import fs from 'fs/promises'; 
import { fileURLToPath } from 'url';
import path from 'path';

export const crearCarpetaReportes = async (nombrePeticion, nombreReporte1, nombreReporte2, nombreReporte3) =>{

    try {
        
        let rutaBase = fileURLToPath(import.meta.url); 
        let rutaBaseModificada = path.dirname(rutaBase);
        
        let rutaReportes = path.join(rutaBaseModificada, "..", "..", "..", "..", "reports", nombrePeticion); 
        let reporte1 = path.join(rutaReportes, nombreReporte1);
        let reporte2 = path.join(rutaReportes, nombreReporte2);
        let reporte3 = path.join(rutaReportes, nombreReporte3);

        await fs.mkdir(rutaReportes, { recursive: true });

        return [rutaReportes, reporte1, reporte2, reporte3];
    } catch (error) {
        throw new Error(`Error al crear las carpetas de la peticion:${error}`);
    }
}
/* Insertar Sesión */

import clientePrisma from "../../../settings/prisma/clientePrisma.js";

export const insertarSesion = async ({usuarioId, fechaSesion, dispositivo}) => {
    try {
        const consulta = await clientePrisma.sesiones.create({
            data:{
                sesion_fecha: fechaSesion,
                sesion_dispositivo: dispositivo,
                usuario_id_fk: usuarioId
            }
        })

        return consulta; 
    } catch (error) {
        throw new Error(`Error al insertar la sesión: ${error.message}`);    
    }
}
/* Insertar Usuario */

import clientePrisma from "../../../settings/prisma/clientePrisma.js";

export const insertarUsuario = async ({usuarioDominio}) => {
    try {
        const consulta = await clientePrisma.usuarios.create({
            data:{
                usuario_nombre: usuarioDominio
            }
        })

        return consulta; 
    } catch (error) {
        throw new Error(`Error al insertar el usuario: ${error.message}`);    
    }
}


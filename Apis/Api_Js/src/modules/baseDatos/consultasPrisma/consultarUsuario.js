/* Consultar Usuario */

import clientePrisma from "../../../settings/prisma/clientePrisma.js";

export const consultaUsuario = async ({usuarioDominio}) => {
    try {
        const consulta = await clientePrisma.usuarios.findFirst({
            where:{
                usuario_nombre: usuarioDominio
            }
        })

        return consulta; 
    } catch (error) {
        throw new Error(`Error al consultar el usuario: ${error.message}`);    
    }
}
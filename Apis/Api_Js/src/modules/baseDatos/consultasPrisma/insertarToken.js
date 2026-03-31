/* Insertar Sesión */

import clientePrisma from "../../../settings/prisma/clientePrisma.js";

export const insertarToken = async ({usuarioId, tokenValor}) => {
    try {
        const consulta = await clientePrisma.tokens.create({
            data:{
                token_valor: tokenValor,
                usuario_id_fk: usuarioId
            }
        })

        return consulta; 
    } catch (error) {
        throw new Error(`Error al insertar el token: ${error.message}`);    
    }
}
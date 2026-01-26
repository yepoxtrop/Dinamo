//Librerias
import jsonwebtoken from "jsonwebtoken";

//Modulos Creados
import { decodificarToken } from "./decodificarToken.js";

//Configuraciones
import { tokensLlavePrivada } from "../../settings/tokens/variablesToken.js";

export async function validarToken(token){

    try {
        const verificacion =  jsonwebtoken.verify(
            token,
            tokensLlavePrivada,
        )
        const decodificacion = await decodificarToken(token);

        return {
            "Mensaje":"Token valido y decodificado",
            "Estado":true,
            "Resultado":decodificacion.Resultado,
        }
    } catch (error) {
        return {
            "Mensaje":"Hay un problema con el token",
            "Estado":false,
            "Error":error
        }
    }
}
//Librerias
import jsonwebtoken from "jsonwebtoken";

//Modulos Creados
import { decodificarToken } from "./decodificarToken.js";

//Configuraciones
import { tokensLlavePrivada } from "../../settings/tokens/variablesToken.js";

export async function validarToken(token){

    try {
        const verificacion = jsonwebtoken.verify(
            token,
            tokensLlavePrivada,
        );

        return {
            "Mensaje":"Token valido y decodificado",
            "Estado":true,
            "Resultado":verificacion,
        };
    } catch (error) {
        return {
            "Mensaje":"Hay un problema con el token",
            "Estado":false,
            "Error":error
        };
    }
}
//Librerias
import jsonwebtoken from "jsonwebtoken";

//Modulos Creados
import { decodificar_tokens } from "./decodificar.tokens.js";

//Configuraciones
import { llave_privada } from "../../config/tokens/config.tokens.js";

export function validar_tokens(datos){

    try {
        let consulta = jsonwebtoken.verify(
            datos.token,
            llave_privada,
        )
        return {
            "Mensaje":"Token funcional",
            "Estado":true,
            "Resultado":consulta,
            "Error":null
        }
    } catch (error) {
        return {
            "Mensaje":"Hay un error en el token",
            "Estado":false,
            "Resultado":null,
            "Error":error
        }
    }
}

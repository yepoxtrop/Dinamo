/* Modulos */
import { validarToken } from "../modules/tokens/validarToken.js";

export const midlewareTokens = async (request, response, next) =>{
    try {
        const cookieToken = request.cookies.token; 

        if (!cookieToken) {
            response.status(401).json({
                "Mensaje":"No hay token, acceso denegado"
            })
        }

        try {
            let peticionValidarToken = await validarToken(cookieToken);
            next();
        } catch (error) {
            response.status(403).json({
                "Mensaje":"Token vencido, acceos denegado"+error.message
            })
        }

    } catch (error) {
        response.status(500).json({
            "Mensaje":"Error en el midleware"+error.message
        })
    }
}
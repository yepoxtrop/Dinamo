/* Modulos */
import { validarToken } from "../modules/tokens/validarToken.js";

export const midlewareTokens = async (request, response, next) =>{
    try {
        const cookieToken = request.cookies.token;
        const authHeader = request.headers.authorization || '';
        const bearerToken = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : null;

        const token = cookieToken || bearerToken;

        if (!token) {
            return response.status(401).json({
                "Mensaje":"No hay token, acceso denegado"
            });
        }

        const resultado = await validarToken(token);
        if (!resultado.Estado) {
            return response.status(403).json({
                "Mensaje":"Token vencido, acceso denegado"
            });
        }
        request.usuario = resultado.Resultado || {};
        return next();
    } catch (error) {
        return response.status(500).json({
            "Mensaje":"Error en el midleware"+error.message
        });
    }
}
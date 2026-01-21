//Modulos Creados
// --Dominio
import { validarUsuarioDominio } from "../../modules/dominio/validarUsuarioDominio.js";
import { consultadrUsuarioDominio } from "../../modules/dominio/consultarUsuarioDominio.js";
// Base de datos

// --Tokens
export const inicioSesionController = async (request, response) => {
    const datos = request.body;

    const loginDominio = await validarUsuarioDominio(datos);

    if (loginDominio === undefined) {
        let consulta =  await consultadrUsuarioDominio(datos);
        console.log(consulta);

        response.status(200).json({
            "Mensaje":"Acceso existoso",
        })
    }else{
        response.status(401).json({
            "Mensaje":"Error de autenticacion en el dominio",
        })
    }
}
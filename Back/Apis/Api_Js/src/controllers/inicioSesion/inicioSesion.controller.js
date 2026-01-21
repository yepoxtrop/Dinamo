//Modulos Creados
// --dominio
import { validarUsuarioDominio } from "../../modules/dominio/validarUsuarioDominio.js";
import { consultadrUsuarioDominio } from "../../modules/dominio/consultarUsuarioDominio.js";
// --base de datos
import { spInicioSesion } from "../../modules/baseDatos/procedimientos/spInicioSesion.js";
import { spInsertarToken } from "../../modules/baseDatos/procedimientos/spInsertarTokens.js";
// --Tokens
import { crearToken } from "../../modules/tokens/crearToken.js";

export const inicioSesionController = async (request, response) => {
    const datos = request.body;

    const loginDominio = await validarUsuarioDominio(datos);

    if (loginDominio === undefined) {
        let consulta =  await consultadrUsuarioDominio(datos);
        
        let procedimientoSesion = await spInicioSesion({
            sAMAccountName: consulta[0].sAMAccountName,
            cn: consulta[0].cn,
            fecha: datos.fecha,
            dispositivo: request.headers['user-agent']
        });

        console.log(procedimientoSesion[0][0].usuario_id);

        let token = await crearToken({
            usuarioId: procedimientoSesion[0][0].usuario_id,
            usuarioIdRol: procedimientoSesion[0][0].rol_id_fk,
            usuarioNombre: datos.usuario,
            usuarioNombreCompleto: consulta[0].cn,
            usuarioCedula: consulta[0].telephoneNumber
        })

        let procedimientoToken = await spInsertarToken({
            usuarioId: procedimientoSesion[0][0].usuario_id,
            tokenValor: token
        })

        response.status(200).json({
            "Mensaje":"Acceso existoso",
            "Token":token
        })
    }else{
        response.status(401).json({
            "Mensaje":"Error de autenticacion en el dominio",
        })
    }
}
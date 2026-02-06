/*========================================================================================================================
FECHA CREACION: 2026/01/25
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Controlador para gestionar las sesiones de los usuarios del sistema, haciendo inserciones en la base 
                de datos en la tabla usuarios, sesiones y tokens, y si el usuario es nuevo se le envia un correo
                de bienvenida con un procedimiento de la base de datos
Modulos       : Consultas en el dominio, consultas en la base de datos y tokens
FECHA MODIFICACION: 2026/01/25
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
MODIFICACION      : Se crea sp
========================================================================================================================*/

/* Modilos usados */
/* dominio */
import { validarUsuarioDominio } from "../../modules/dominio/validarUsuarioDominio.js";
import { consultadrUsuarioDominio } from "../../modules/dominio/consultarUsuarioDominio.js";
/* base de datos */
import { peticionInicioSesion } from "../../modules/baseDatos/peticionInicioSesion.js";
import { insertarToken } from "../../modules/baseDatos/consultasPrisma/insertarToken.js";
/* tokens */
import { crearToken } from "../../modules/tokens/crearToken.js";


export const inicioSesionController = async (request, response) => {
    const datos = request.body;

    const loginDominio = await validarUsuarioDominio(datos);

    if (loginDominio === undefined) {
        let consulta =  await consultadrUsuarioDominio(datos);
        
        let procedimientoSesion = await peticionInicioSesion({
            sAMAccountName: consulta[0].sAMAccountName,
            cn: consulta[0].cn,
            fecha: datos.fecha,
            dispositivo: request.headers['user-agent']
        });

        let token = await crearToken({
            usuarioId: procedimientoSesion.usuario_id,
            usuarioIdRol: procedimientoSesion.rol_id_fk,
            usuarioNombre: datos.usuario,
            usuarioNombreCompleto: consulta[0].cn,
            usuarioCedula: consulta[0].telephoneNumber
        })

        let procedimientoToken = await insertarToken({
            usuarioId: procedimientoSesion.usuario_id,
            tokenValor: token
        })

        response.cookie("token", token, {
            httpOnly: true,
            //secure: true
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
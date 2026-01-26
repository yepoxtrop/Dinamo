/* Consultas */
import { consultaUsuario } from "./consultasPrisma/consultarUsuario.js";
import { insertarUsuario } from "./consultasPrisma/insertarUsuario.js";
import { insertarSesion } from "./consultasPrisma/insertarSesion.js";
import { uspEnviarCorreos } from "./uspSqlServer/uspEnviarCorreos.js";

/* Correos */
import { modificarCorreo } from "../correo/modificarCorreo.js";
import { correos } from "../../settings/correo/objetoCorreos.js";

export const peticionInicioSesion = async({sAMAccountName, cn, fecha, dispositivo}) => {
    try {
        /* Consultar si el usuario existe en la base de datos */
        let peticionConsultarUsuario = await consultaUsuario({usuarioDominio:sAMAccountName});

        /* Si la respuesta es null, entonces no existe */
        if (peticionConsultarUsuario === null){
            peticionConsultarUsuario = await insertarUsuario({usuarioDominio:sAMAccountName});
            
            /* Enviar correo de bienvenida */
            let peticionEnviarCorreo = await uspEnviarCorreos({
                cuerpoCorreo:modificarCorreo({
                    cuerpoHtml:correos.correoBienvenida, 
                    objetoCambios:{"[NOMBRE_REAL_USUARIO]":cn
                }}),
                destinatarios:"lsarmiento@aciel.co",
                tituloCorreo:"Bienvenido a Firmas Digitales ACS"
            })
        }

        /* Insertar la sesion en la base de datos */
        let peticionInsertarSesion = await insertarSesion({
            usuarioId:peticionConsultarUsuario.usuario_id,
            fechaSesion:fecha,
            dispositivo:dispositivo
        })
        
        return peticionConsultarUsuario; 
    } catch (error) {
        throw new Error('Se ha presentado un error con una peticion:'+error); 
    }
}

// peticionInicioSesion({sAMAccountName:"Anyie.Aguirre", cn:"Anyie lorena Aguirre", fecha:new Date(), dispositivo:"hp"})
// .then((res)=>{console.log(res)})
// .catch((error)=>{console.log(error)})
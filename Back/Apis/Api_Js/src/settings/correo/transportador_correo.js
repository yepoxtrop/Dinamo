//Librerias
import nodemailer from "nodemailer";

//Constantes creadas
//--configuraciones
import { correo_host, correo_puerto, correo_seguridad, correo_usuario, correo_contrasena } from "./variables_correo.js";

export const transportador = nodemailer.createTransport({
    host:correo_host,
    port:correo_puerto,
    secure:false,
    auth:{
        user:correo_usuario,
        pass:correo_contrasena
    }
})
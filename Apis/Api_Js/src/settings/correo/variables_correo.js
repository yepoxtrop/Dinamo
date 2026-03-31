//Librerias
import { config } from "dotenv"; 
config(); 

export const correo_host = process.env.CORREO_HOST;
export const correo_puerto = process.env.CORREO_PUERTO; 
export const correo_seguridad = process.env.CORREO_SEGURIDAD;
export const correo_usuario = process.env.CORREO_USUARIO;
export const correo_contrasena = process.env.CORREO_CONTRASENA;
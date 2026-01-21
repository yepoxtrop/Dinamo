//Librerias
import { config } from "dotenv"; 
config(); 

export const base_datos_hostname = process.env.BASE_DATOS_HOSTNAME;
export const base_datos_puerto = process.env.BASE_DATOS_PUERTO;
export const base_datos_usuario = process.env.BASE_DATOS_USUARIO;
export const base_datos_contrasena = process.env.BASE_DATOS_CONTRASENA;
export const base_datos_nombre = process.env.BASE_DATOS_NOMBRE;
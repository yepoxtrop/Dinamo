//Librerias
import { config } from "dotenv";

config();

export const dominio = process.env.DOMINIO; 
export const dominio_url = process.env.DOMINIO_URL; 
export const dominio_base_dn = process.env.DOMINIO_BASE_DN; 
export const dominio_usuario_prueba = process.env.DOMINIO_USUARIO_PRUEBA; 
export const dominio_contrasena_usuario_prueba = process.env.DOMINIO_CONTRASENA_USUARIO_PRUEBA; 
export const dominio_filtro_busqueda = process.env.DOMINIO_FILTRO_BUSQUEDA; 
export const dominio_atributos = process.env.DOMINIO_ATRIBUTOS; 
export const dominio_puerto = process.env.DOMINIO_PUERTO; 
export const dominio_grupos_excluidos = process.env.DOMINIO_GRUPOS_EXCLUIDOS; 
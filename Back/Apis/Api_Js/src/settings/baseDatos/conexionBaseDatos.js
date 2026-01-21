//Librerias
import sequelize from "sequelize"; 

//Constantes Creadas
//--configuraciones
import { base_datos_nombre, base_datos_usuario, base_datos_contrasena, base_datos_hostname, base_datos_puerto} from "./variablesBaseDatos.js"


export const conexionBaseDatos = new sequelize(
    base_datos_nombre,
    base_datos_usuario,
    base_datos_contrasena,
    {
        host:base_datos_hostname,
        port:base_datos_puerto,
        dialect:'mssql',
    }
)
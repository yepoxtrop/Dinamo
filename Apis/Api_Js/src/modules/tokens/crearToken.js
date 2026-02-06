//Librerias
import jsonwebtoken from "jsonwebtoken";
import forge from "node-forge"; 

//Modulos Nativos
import fs from "fs"; 
import path from "path";

//Conifugraciones
import { tokensLlavePrivada, tokensAlgoritmo } from "../../settings/tokens/variablesToken.js";

export const crearToken = async (datos) => {
    try {
        //--Crear el token
        let token = jsonwebtoken.sign(
            {
                "idUsuario":datos.usuarioId, //traido de la consulta sql
                "rolUsuarioId":datos.usuarioIdRol, //traido de la consulta sql
                "nombreUsuario":datos.usuarioNombre, //traido del formulario login
                "nombreCompletoUsuario":datos.usuarioNombreCompleto, //traigo de la ruta con el dominio
                "cedulaUsuario":datos.usuarioCedula, //traido de la consulta sql
            },
            tokensLlavePrivada,
            {   
                algorithm: tokensAlgoritmo,
                expiresIn: "1h"
            }
        )
        return token; 
    } catch (error) {
        console.log(error)
        return {
            "Mensaje":"Fallo en  alguna de las funciones del API_PY",
            "Estado":false,
            "Resultados":null,
            "Error":error
        }
    }
}

//monitorear carpetas con .net
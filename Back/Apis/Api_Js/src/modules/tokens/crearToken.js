//Librerias
import jsonwebtoken from "jsonwebtoken";
import forge from "node-forge"; 

//Modulos Nativos
import fs from "fs"; 
import path from "path";

//Conifugraciones
import { llave_privada } from "../../config/tokens/config.tokens.js";

export async function tokens(datos) {
    try {
        //--Crear el token
        let token = jsonwebtoken.sign(
            {
                "id_usuario":datos.id_usuario, //traido de la consulta sql
                "nombreUsuario":datos.usuario, //traido del formulario login
                "nombre":datos.nombre, //traigo de la ruta con el dominio
            },
            llave_privada,
            {   
                algorithm: "HS256",
                expiresIn: "1h"
            }
        )
        return {
            "Mensaje":"Operaciones completadas satisfactoriamente. Token creado",
            "Estado":true,
            "Resultado":token,
            "Error":null,
        }
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
//Modulos Creados
//--consultas sql
import { consultar_usuario } from "../../modules/consultasSQL/sql.consultar.usuario.js";
import { insertar_usuario } from "../../modules/consultasSQL/sql.insertar.usuario.js";
//--tablas sql
import { tabla_usuarios } from "../../models/tablasSQL/tabla.usuarios.js";

export async function controller_consultar_usuario(request, response) {
    let datos = request.body; 

    try {
        let consulta_1 = await consultar_usuario(datos, tabla_usuarios);
        
        if (consulta_1.Resultado === null){
            let consulta_2 = await insertar_usuario(datos, tabla_usuarios); 
            let resultado = {
                "Mensaje":"Insercion exitosa con los datos del usuario",
                "Estado":true,
                "Resultados":consulta_2,
                "Error":null
            }
            response.status(200).json({
                "Mensaje":"Peticion completada exitosamente en la base de datos",
                "Resultado":resultado
            })
        }else{
            let resultado = {
                "Mensaje":"Consulta exitosa con los datos del usuario",
                "Estado":true,
                "Resultados":consulta_1,
                "Error":null
            }

            response.status(200).json({
                "Mensaje":"Peticion completada exitosamente en la base de datos",
                "Resultado":resultado
            })
        }
    } catch (error) {
        let resultado = {
            "Mensaje":"Fallo en la peticion con la base de datos",
            "Estado":false,
            "Resultados":null,
            "Error":error
        }

        response.status(500).json({
            "Mensaje":"Peticion completada exitosamente en la base de datos",
            "Resultado":resultado
        })
    } 
}

//Ejemplo para consulta o creacion de usuario
// controller_consultar_usuario({
//     "usuario":"nicolas.rojas" //Lo registra el usuario en el formulario [OBLIGATORIO]
// })
// .then((resultado)=>{
//     console.log(resultado)
// })
// .catch((error)=>{
//     console.log(error)
// })
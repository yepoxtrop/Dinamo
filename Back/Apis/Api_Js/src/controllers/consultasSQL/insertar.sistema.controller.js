//Modulos Creados
//--consultas sql
import { insertar_sistema } from "../../modules/consultasSQL/sql.insertar.sistema.js";
//--tablas sql
import { tabla_sistema } from "../../models/tablasSQL/tabla.sistema.js";

export async function controller_insertar_sistema(request, response) {
    let datos = request.body;

    try {
        let consulta = await insertar_sistema(datos, tabla_sistema); 
        let respuesta = {
            "Mensaje":"Datos de la accion insertados perfectamente",
            "Estado":true,
            "Resultados":consulta,
            "Error":null,
        };

        response.status(200).json({
            "Mensaje":"Peticion completada exitosamente en la base de datos",
            "Resultado":respuesta
        })
    } catch (error) {
        let respuesta = {
            "Mensaje":"Fallo en la insercion de la accion",
            "Estado":false,
            "Resultados":null,
            "Error":error,
        };

        response.status(200).json({
            "Mensaje":"Peticion completada exitosamente en la base de datos",
            "Resultado":respuesta
        })
    }
}

// //Ejemplo para la accion "CREAR FIRMAS"
// controller_insertar_sistema({
//     "id_usuario":1, //viene en el token de la sesion [OBLIGATORIO]
//     "nombreUsuario":"anderson.forero", //viene en el token de la sesion
//     "nombre":"Anderson Ivan Forero Ramirez", //viene en el token de la sesion
//     "cedula":1121313211221, //lo registra el usuario en el formulario
//     "fecha":"2025-12-12", //se toma automaticamente al enviar el formulario [OBLIGATORIO]
//     "contrasena":"123456789", //se toma automaticamente al enviar el formulario
//     "correo":"sarmientodiazluisangel@gmail.com", //lo digita el usuario en el formulario
//     "supervisor":"SIGILFREDO LARA GONZALEZ" //lo selecciona en el formulario 
// }, 1)
// .then((resultado)=>{
//     console.log(resultado); 
// })
// .catch((error)=>{
//     console.log(error); 
// })

// controller_insertar_sistema({
//     "id_usuario":1, //viene en el token de la sesion [OBLIGATORIO]
//     "nombreUsuario":"anderson.forero", //viene en el token de la sesion
//     "nombre":"Anderson Ivan Forero Ramirez", //viene en el token de la sesion
//     "cedula":1121313211221, //lo registra el usuario en el formulario
//     "fecha":"2025-12-12", //se toma automaticamente al enviar el formulario [OBLIGATORIO]
//     "contrasena":"123456789", //se toma automaticamente al enviar el formulario
//     "correo":"sarmientodiazluisangel@gmail.com", //lo digita el usuario en el formulario
//     "supervisor":"SIGILFREDO LARA GONZALEZ" //lo selecciona en el formulario 
// }, 2)
// .then((resultado)=>{
//     console.log(resultado); 
// })
// .catch((error)=>{
//     console.log(error); 
// })
//Modulos Creados
//--consultas sql
import { insertar_firmas } from "../../modules/consultasSQL/sql.insertar.firmas.js";
//--tablas sql
import { tabla_firmas } from "../../models/tablasSQL/tabla.firmas.js";

export async function controller_insertar_firmas(request, response) {
    let datos = request.body;

    try {
        let consulta = await insertar_firmas(datos, tabla_firmas); 
        let resultado = {
            "Mensaje":"Datos de la firma insertados",
            "Estado":true,
            "Resultados":consulta,
            "Error":null,
        };
        
        response.status(200).json({
            "Mensaje":"Peticion completada exitosamente en la base de datos",
            "Resultado":resultado
        })

    } catch (error) {
        let resultado = {
            "Mensaje":"No se pudieron insertar los datos de la firma",
            "Estado":false,
            "Resultados":null,
            "Error":error,
        };

        response.status(500).json({
            "Mensaje":"Fallo en la peticion con la base de datos",
            "Resultado":resultado
        })
    }
}

//Ejemplo de insertar firmas
// controller_solicitar_firmas({
//         "id_usuario":1, //viene en el token de la sesion [OBLIGATORIO]
//         "nombreUsuario":"anderson.forero", //viene en el token de la sesion
//         "nombre":"Anderson Ivan Forero Ramirez", //viene en el token de la sesion
//         "cedula":1121313211221, //lo registra el usuario en el formulario
//         "fecha":"12_12_2025_4_31_01", //se toma automaticamente al enviar el formulario
//         "contrasena":"123456789", //se toma automaticamente al enviar el formulario
//         "correo":"sarmientodiazluisangel@gmail.com", //lo digita el usuario en el formulario
//         "supervisor":"SIGILFREDO LARA GONZALEZ" //lo selecciona en el formulario 
//     }
// )
// .then((resultado)=>{
//     console.log(resultado.Resultados)
//     controller_insertar_firmas({
//         "id_usuario":1, //viene en el token de la sesion [OBLIGATORIO]
//         "nombre_firma":"...", //Se obtiene del objeto retornado por la ruta o se armca con los datos del objeto que recibe la ruta[OBLIGATORIO]
//         "ruta_firma":"...", //Se obtiene del objeto retornado por la ruta [OBLIGATORIO]
//         "fecha_creacion_firma":"2025-12-12", //Se obtiene con los datos del objeto que recibe la ruta [OBLIGATORIO]
//         "fecha_vencimiento_firma":"2025-12-12", //Se armca con los datos del objeto que recibe la ruta[OBLIGATORIO]
//     })
//     .then((respuesta)=>{
//         console.log(respuesta)
//     })
//     .catch((error)=>{
//         console.log(error); 
//     })
// })
// .catch(()=>{
//     console.log("Errro")
// })
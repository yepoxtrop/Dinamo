// //Modulos Creados
// import { tokens } from "../../modules/tokens/tokens.js";

// export async function controller_tokens(request, response) {
//     let datos = request.body;

//     try {
//         let consulta = await tokens(datos); 
        
//         let resultado = {
//             "Mensaje":"Token creado exitosamente",
//             "Estado":true,
//             "Resultados":consulta,
//             "Errores":null,
//         }
//         response.status(200).json({
//             "Mensaje":"Peticion completada en el servidor",
//             "Resultado":resultado
//         })
//     } catch (error) {
//         console.log(error)
//         let resultado = {
//             "Mensaje":"Fallo al ejecutar las funciones del aplicativo",
//             "Estado":false,
//             "Resultados":null,
//             "Errores":error,
//         }
//         response.status(500).json({
//             "Mensaje":"Fallo en la peticion enviada el servidor",
//             "Resultado":resultado
//         })
//     }
// }

// //Ejmeplo de creacion de token
// // controller_tokens({
// //     "usuario":"soporte",
// //     "contrasena":"5oP0rteAci3l!"
// // })
// // .then((respuesta)=>{
// //     console.log(respuesta)
// // })
// // .catch((error)=>{
// //     console.log(error)
// // })
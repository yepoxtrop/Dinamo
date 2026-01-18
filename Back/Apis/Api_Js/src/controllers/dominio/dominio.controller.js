// //Modulos Creados
// import { validar_dominio_py } from "../../settings/rutasApiPython/validar.dominio.js";

// export async function controller_validar_dominio(request, response) {
//     let datos = request.body; 

//     try {
//         let consulta = await validar_dominio_py(datos); 
        
//         let resultado = {
//             "Mensaje":"Validacion exitosa en el dominio",
//             "Estado":true,
//             "Resultados":consulta.Respuestas,
//             "Errores":null,
//         }; 

//         response.status(200).json({
//             "Mensaje":"Peticion completa en el servidor",
//             "Resultado":resultado,
//         }); 
//     } catch (error) {
//         let resultado = {
//             "Mensaje":"Fallo al ejecutar las funciones del aplicativo",
//             "Estado":false,
//             "Resultados":null,
//             "Errores":error,
//         };
//         response.status(500).json({
//             "Mensaje":"Fallo en la peticion con la ruta de directorio activo de python",
//             "Resultado":resultado,
//         }); 
//     }
// }

// //Ejmeplo de validacion del dominio
// // controller_validar_dominio({
// //     "usuario":"soporte", 
// //     "contrasena":"5oP0rteAci3l!"
// // })
// // .then((respuesta)=>{
// //     console.log(respuesta)
// // })
// // .catch((error)=>{
// //     console.log(error)
// // })
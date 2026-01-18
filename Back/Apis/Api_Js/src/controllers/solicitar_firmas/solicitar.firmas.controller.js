// //Modulos creados
// //--correos
// import { correo_supervisor } from "../../modules/correo/correo.supervisor.js";
// import { correo_usuario_exito } from "../../modules/correo/correo.usuario.exito.js";
// import { correo_usuario_fallo } from "../../modules/correo/correo.usuario.fallo.js";
// //--archivos
// import { archivo_crt } from "../../modules/archivos/creacion/archivo.crt.js";
// import { archivo_csr } from "../../modules/archivos/creacion/archivo.csr.js";
// import { archivo_key } from "../../modules/archivos/creacion/archivo.keys.js";
// import { archivo_p12 } from "../../modules/archivos/creacion/archivo.p12.js";
// //--api de python
// import { carpeta_usuario_py } from "../../settings/rutasApiPython/carpeta.usuario.js";
// import { archivos_usuario_py } from "../../settings/rutasApiPython/archivos.usuario.js";
// //--jwt
// import { validar_tokens } from "../../modules/tokens/validar.tokens.js" ;

// export async function controller_solicitar_firmas(request, response) {
//     let datos = request.body;
//     let token = request.headers["authorization"]
//     token = token.split(" "); 

//     try {
//         //--Validar el estado del token
//         let validar_jwt = validar_tokens({
//             "token":token[1]
//         })

//         if (validar_jwt.Estado == true){
//             //--Validar que existe la ruta del usuario|API DE PYTHON|
//             let carpeta_usuario = await carpeta_usuario_py(datos);

//             //--Crear archivos para la firma
//             let key_archivo = await archivo_key(
//                 datos, 
//                 carpeta_usuario.Resultados.Ruta
//             ); 
//             let csr_archivo = await archivo_csr(
//                 datos, 
//                 key_archivo.Archivo_pub, 
//                 key_archivo.Archivo_key, 
//                 carpeta_usuario.Resultados.Ruta
//             ); 
//             let crt_archivo = await archivo_crt(
//                 datos, 
//                 key_archivo.Archivo_pub, 
//                 key_archivo.Archivo_key, 
//                 csr_archivo.Solicitud_certificado, 
//                 carpeta_usuario.Resultados.Ruta
//             ); 
//             let p12_archivo = await archivo_p12(
//                 datos, 
//                 key_archivo.Archivo_key, 
//                 crt_archivo.Certificado,
//                 carpeta_usuario.Resultados.Ruta
//             ); 

//             //--Validar la existencia de los archivos
//             let archivos_usuario = await archivos_usuario_py(datos); 


//             try {
//                 if (archivos_usuario.Resultados.Ruta_general.Estado == true && 
//                     archivos_usuario.Resultados.Ruta_personal.Estado == true &&
//                     archivos_usuario.Resultados.Archivo_key.Estado == true &&
//                     archivos_usuario.Resultados.Archivo_csr.Estado == true &&
//                     archivos_usuario.Resultados.Archivo_crt.Estado == true &&
//                     archivos_usuario.Resultados.Archivo_p12.Estado == true 
//                 ){ 
//                     let corre_usuario = await correo_usuario_exito(datos); 
//                     let corre_supervisor = await correo_supervisor(datos); 
//                     let resultado = {
//                         "Mensaje":"Correo de exito enviado al supervisor y al usuario satisfactoriamente",
//                         "Estado":true,
//                         "Resultados":null,
//                         "Errores":null,
//                     }
//                     console.log('[ALERTA]:Peticion completada en la ruta solicitar_firmas'.bgYellow.green); 
//                     response.status(200).json({
//                         "Mensaje":"Peticion completada en el servidor",
//                         "Resultado":resultado,
//                     })
//                 }else{
//                     let corre_usuario = await correo_usuario_fallo(datos); 
//                     let resultado =  {
//                         "Mensaje":"Correo de fallo enviado al usuario satisfactoriamente",
//                         "Estado":true,
//                         "Resultados":null,
//                         "Errores":null,
//                     }
//                     console.log('[ALERTA]:Peticion completada en la ruta solicitar_firmas'.bgYellow.green); 
//                     response.status(200).json({
//                         "Mensaje":"Peticion completada en el servidor",
//                         "Resultado":resultado,
//                     })
//                 }
//             } catch (error) {
//                 console.log('[ALERTA]:Fallo en la peticion en la ruta solicitar_firmas'.bgYellow.red); 
//                 response.status(500).json({
//                     "Mensaje":"Fallo en la peticion enviada el servidor",
//                     "Resultado":error,
//                 })

//             }
//         }else{
//             response.status(401).json({
//                 "Mensaje":"Token invalido, acceso denegado",
//                 "Resultado":validar_jwt,
//             })
//         }

//     } catch (error) {
//         console.log('[ALERTA]:Fallo en la peticion en la ruta solicitar_firmas'.bgYellow.red); 
//         response.status(500).json({
//             "Mensaje":"Fallo en la peticion enviada el servidor",
//             "Resultado":error,
//         })
//     }
// }

// //Ejemplo para la creacion de una firma
// // controller_solicitar_firmas({
// //         "id_usuario":1, //viene en el token de la sesion       
// //         "nombreUsuario":"anderson.forero", //viene en el token de la sesion
// //         "nombre":"Anderson Ivan Forero Ramirez", //viene en el token de la sesion
// //         "cedula":1121313211221, //lo registra el usuario en el formulario
// //         "fecha":"12_12_2025_4_31_01", //se toma automaticamente al enviar el formulario
// //         "contrasena":"123456789", //se toma automaticamente al enviar el formulario
// //         "correo":"sarmientodiazluisangel@gmail.com", //lo digita el usuario en el formulario
// //         "supervisor":"SIGILFREDO LARA GONZALEZ" //lo selecciona en el formulario 
// //     }
// // )
// // .then((resultado)=>{
// //     console.log(resultado)
// // })
// // .catch(()=>{
// //     console.log("Errro")
// // })

// //La plata esta, solo hay que recogerla
//Modulos Creados
import { archivos_usuario_py } from "../../settings/rutasApiPython/archivos.usuario.js";

export async function controller_consultar_firmas(request, response) {
    let datos = request.body; 
    let token = request.headers["authorization"]
    token = token.split(" "); 

    try {
        //--Validar el estado del token
        let validar_jwt = validar_tokens({
            "token":token[1]
        })

        if (validar_jwt.Estado == true){
            //--Validar que existe la ruta del usuario|API DE PYTHON|
            let carpeta_usuario = await archivos_usuario_py(datos);

            console.log(carpeta_usuario); 

        }else{
            response.status(401).json({
                "Mensaje":"Token invalido, acceso denegado",
                "Resultado":validar_jwt,
            })
        }
    } catch (error) {
        console.log('[ALERTA]:Fallo en la peticion en la ruta solicitar_firmas'.bgYellow.red); 
        response.status(500).json({
            "Mensaje":"Fallo en la peticion enviada el servidor",
            "Resultado":error,
        })
    }
}
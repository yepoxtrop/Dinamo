//Libreias Instaladas
import axios from "axios";

//Configuraciones Creadas
//--Variables de dominio
import { ruta_api_python } from "./variables_api_python.js";

export const archivosUsuarioPy = async (datos, token) =>{
    try {
        let consulta = await axios.post(
            `${ruta_api_python}/Ficheros_Usuario`,
            datos,
            {
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }
        );
        return {
            "Mensaje":"Peticion completada",
            "Estado":true,
            "Resultado":consulta.data,
        };
    } catch (error) {
        console.log(error)
        return{
            "Mensaje":"Fallo en la peticion",
            "Estado":false,
            "Error":error.toString()
        }
    }
}
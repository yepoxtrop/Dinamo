//Libreias Instaladas
import axios from "axios";

//Configuraciones Creadas
//--Variables de dominio
import { ruta_api_python } from "./variables_api_python.js";

export const archivos_usuario_py = async (datos, token) =>{
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
        console.log(consulta.data)
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

archivos_usuario_py(
    {
        "nombre_usuario":"alexander.ramirez",
        "nombre":"Alezander Ramirez",
        "cedula":1023373788
    },
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlX3VzdWFyaW8iOiJsdWlzLnNhcm1pZW50byIsInNlbGYuX25vbWJyZV9yZWFsIjoiTHVpcyBBbmdlbCBTYXJtaWVudG8gRGlheiIsInJvbCI6IkFETUlOSVNUUkFET1IiLCJleHAiOjE3Njc3MjQzNTAsImlhdCI6MTc2NzcyMDc1MH0.l9vubyZlZloSEdZJ-DuxVJjMANREkwIN9RvpVR05D9c"
)
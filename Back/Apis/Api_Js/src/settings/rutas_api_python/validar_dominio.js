//Libreias instaladas
import axios from "axios"; 

//Configuraciones Creadas
//--Variables de dominio
import { ruta_api_python } from "./variables_api_python.js";

export const validar_dominio_py = async (datos) => {
    try {
        let consulta = await axios.post(
            `${ruta_api_python}/Validacion_Dominio`,
            datos
        );
        return {
            "Mensaje":"Peticion completada",
            "Estado":true,
            "Resultado":consulta.data,
        };
    }catch (error) {
        return {
            "Mensaje":"Fallo en la peticion",
            "Estado":false,
            "Error":error.toString()
        };
    }
}
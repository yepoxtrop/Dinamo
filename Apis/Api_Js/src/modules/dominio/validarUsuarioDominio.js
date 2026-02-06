//Configurraciones
import { clienteDominio } from "../../settings/dominio/clienteDominio.js";


export const validarUsuarioDominio = async (datos) =>{
    try {
        let consulta = await clienteDominio.bind(`${datos.usuario}@aciel.co`, datos.contrasena);
        return consulta;
    } catch (error) {
        console.error("Error al validar usuario en dominio:", error);
        throw error;
    }
}

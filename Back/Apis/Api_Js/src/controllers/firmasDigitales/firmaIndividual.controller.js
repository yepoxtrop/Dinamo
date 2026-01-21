//Modulos Creados
//--Tokens
import { validarToken } from "../../modules/tokens/validarToken.js";
//--Carpetas y ficheros


//--Creacion de archivos
import { archivoKeys } from "../../modules/archivos/creacion/archivoKeys.js";
import { archivoCsr } from "../../modules/archivos/creacion/archivoCsr.js";
import { archivoCrt } from "../../modules/archivos/creacion/archivoCrt.js";
import { archivoP12 } from "../../modules/archivos/creacion/archivo_p12.js";
//--Correos
import { correoUsuarioExito } from "../../modules/correo/correoUsuarioExito.js";
import { correoUsuarioFallo } from "../../modules/correo/correoUsuarioFallo.js";
import { correoSupervisor } from "../../modules/correo/correoSupervisor.js";

export const firmaIndividualController = async (request, response) => {
    const datos = request.body;
    const token = request.headers.authorization.split(" ")[1];
    
    const validacionToken = await validarToken(token);

    if (validacionToken.Estado === false) {
        return response.status(401).json({
            "Mensaje":"Token invalido",
        });
    }else{
        const peticionCarpetas = await carpetaUsuarioPy(datos, token); 
        const rutaArchivos = peticionCarpetas.Resultado.Resultado;

        const llavesPrivadas = await archivoKeys(datos, rutaArchivos);
        const peticionCertificado = await archivoCsr(datos, rutaArchivos);
        const certificado = await archivoCrt(datos, rutaArchivos);
        const firmaDigital = await archivoP12(datos, rutaArchivos);
        const peticionArchivos = await archivosUsuarioPy(datos, token);
        
        console.log(peticionArchivos);
        return response.status(200).json({
            "Datos":peticionArchivos,
        });
    }
}
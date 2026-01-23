/*========================================================================================================================
FECHA CREACION: 2026/01/22
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Controlador para la creacion de firmas digitales individuales, esto incluye ficheros
                .key, .pub, .csr, .crt, .p12, con su respectiva carpeta, y adicional con el
                envio de correos de notificacion al usuario y supervisor
Modulos       : Tokens, creacion de carpetas, creacion de archivos, procedimientos almacenados y 
                modulos de node
FECHA MODIFICACION: 2026/01/22
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
MODIFICACION      : Se crea sp
========================================================================================================================*/
import { validarToken } from "../../modules/tokens/validarToken.js";
import { buscarFirmas } from "../../modules/firmasDigitales/carpetas/buscarFirmas.js";
import { creacionArchivosFirmas } from "../../modules/firmasDigitales/archivos/creacion/crearArchivosFirmas.js";
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
        /* Rutas */
        const peticionRutaFirmas = await buscarFirmas({ 
            nombre_usuario: datos.nombre_usuario, 
            cedula: datos.cedula 
        }); 
        console.log(peticionRutaFirmas)
        
        /* Ficheros */
        const peticionArchivos = await creacionArchivosFirmas({
            nombre_usuario: datos.nombre,
            fechaCreacion: datos.fechaCreacion,
            contrasena: datos.contrasena,
            rutaArchivoKey: peticionRutaFirmas.rutaArchivoKey,
            rutaArchivoPub: peticionRutaFirmas.rutaArchivoPub,
            rutaArchivoCsr: peticionRutaFirmas.rutaArchivoCsr,
            rutaArchivoCrt: peticionRutaFirmas.rutaArchivoCrt,
            rutaArchivoP12: peticionRutaFirmas.rutaArchivoP12
        });

        console.log(peticionArchivos)

        return response.status(200).json({
            "Datos":peticionArchivos,
        });
    }
}
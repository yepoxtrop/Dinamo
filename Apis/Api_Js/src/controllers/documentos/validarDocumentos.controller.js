/* Modulos */ 
import { analizarDocumentoPDF } from "../../modules/analizarDocumentosPDF/analizarDocumentoPDF.js";

export const validarDocumentosController = async(request, response) =>{
    /* Captutrar archivo */
    const archivos = request.files; 
    //console.log(archivos)
    
    /* Analizar el pdf */
    const peticionDocumento = await analizarDocumentoPDF({arrayArchivos:archivos});

    /* Reportes */
    

    response.status(200).json({
        "Mensaje":"Peticion Recibida",
        "Resultado":peticionDocumento
    })
}; 
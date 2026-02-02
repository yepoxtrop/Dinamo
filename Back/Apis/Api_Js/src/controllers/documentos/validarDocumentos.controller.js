/* Modulos */ 
import { analizarDocumentoPDF } from "../../modules/analizarDocumentosPDF/analizarDocumentoPDF.js";

export const validarDocumentosController = async(request, response) =>{
    /* Captutrar archivo */
    const archivos = request.file; 
    
    /* Analizar el pdf */
    const peticionDocumento = await analizarDocumentoPDF({pathDocumento:archivos.path});

    

    //console.log(peticionDocumento)
    response.status(200).json({
        "Mensaje":"Peticion Recibida",
        "Resultado":peticionDocumento
    })
}; 
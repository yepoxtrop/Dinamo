/* Modulos */
import fs from "fs"; 

/* Librerias */
import { PDFDocument } from 'pdf-lib'; 
import { plainAddPlaceholder } from "@signpdf/placeholder-plain";
import { buffer } from "stream/consumers";
import signerP12 from "@signpdf/signer-p12";

/* Validar si es un pdf */
export const validarTipoPdf = ({bufferPdf}) => {
    if (!bufferPdf.toString('utf8', 0, 4).startsWith('%PDF') === true){
        throw new Error("El archivo subido No es un pdf");
    }

    return true;
}

/* Agregar un placeholder */
export const placeholderPdf = async ({bufferPdf}) => {
    try {

        const pdfConPlaceholder = await plainAddPlaceholder({
            pdfBuffer: bufferPdf, // Buffer original SIN procesar por pdf-lib
            reason: 'Firma digital',
            location: 'Colombia',
            contactInfo: 'info@empresa.com',
            signatureLength: 16384,
            page: -1, // Última página
            widgetRect: [100, 100, 300, 200] // [x, y, ancho, alto] en puntos
        });
        return pdfConPlaceholder;  
    } catch (error) {
        throw new Error(`Error al agregar el placeholder al pdf:${error.message}`);
    }
}

/* Firmar documento */
export const firmarDocumento = async({placeholderPdf, bufferP12, contrasenaP12}) => {
    try {
        
    } catch (error) {
        throw new Error(`Error al firmar el pdf:${error.message}`)
    }
}

const pdf = fs.readFileSync("C:/Users/sarmi/Desktop/PROYECTOS/TRABAJO/ACIEL/Dinamo/Docs/DocumentosFirmas/Certificado_1769458115307.pdf")

placeholderPdf({bufferPdf:pdf})
.then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
});

// 1. Recibir y validar PDF
// 2. Guardar temporalmente con nombre único
// 3. Leer y modificar PDF con pdf-lib
// 4. Aplicar placeholder para firma
// 5. Firmar con certificado P12
// 6. Verificar firma digital
// 7. Mover a ubicación final o devolver
// 8. Limpiar archivos temporales
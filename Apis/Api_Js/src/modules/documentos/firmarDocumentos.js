/* Librerias */
import { plainAddPlaceholder } from "@signpdf/placeholder-plain";
import { SignPdf } from "@signpdf/signpdf";
import { P12Signer } from "@signpdf/signer-p12";
import { PDFDocument } from "pdf-lib";

/* Modulos */
import path from "path";
import fs from "fs";

export const firmarDocumentos = async() =>{
    try {
        /* Cargar pdf */
        
        /* Archivos de firmas */
        let archivoPdf =  fs.readFileSync("C:/Users/sarmi/Desktop/PROYECTOS/TRABAJO/ACIEL/Dinamo/DocumentosFirmas/prueba.pdf")
        let firmaP12 =  fs.readFileSync("C:/Users/sarmi/Desktop/PROYECTOS/TRABAJO/ACIEL/Dinamo/FirmasDigitales/lui.sarmiento/1023373788.p12")

        /* */
        let firma = new P12Signer(firmaP12, {password:"111"});
        
        const pdfDoc = await PDFDocument.load(archivoPdf);
        const pdfBytes = await pdfDoc.save(); // Uint8Array

        // 🔑 Conversión CRÍTICA: Uint8Array → Buffer
        const pdfBuffer = Buffer.from(pdfBytes);


        /* Espacio(placeholder) para la firma */
        let placeholder = plainAddPlaceholder({
            pdfBuffer:pdfBuffer,
            reason:"se quiere firmar el archivo pdf",
            contactInfo:"soporte@aciel.co",
            name:"soporte",
            location:"Colombia",
            signatureLength: 8192
        });

        

    } catch (error) {
        throw new Error(error);
    }
}

firmarDocumentos()
.then((res)=>{console.log(res)})
.catch((err)=>{console.log(err)})
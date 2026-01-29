/* Modulos */
import fs from 'fs';
import signpdfPkg from '@signpdf/signpdf';
import signerPkg from '@signpdf/signer-p12';
import { plainAddPlaceholder } from '@signpdf/placeholder-plain';
import { PDFDocument } from 'pdf-lib';
import forge from 'node-forge';
const { SignPdf } = signpdfPkg;
const { P12Signer } = signerPkg;

/*=================================================
    FUNCIONES QUE SE ENCARGAN DE GESTIONAR
    LAS FIRMAS, LA VALIDACION DE DOCUMENTOS 
    JUNTO CON SUS CERTIFICADOS Y LA OBTENCION
    DE DATOS DE LOS MISMOS
=================================================*/ 

/* Verificar si el archivos es un PDF y si tiene firmas digitales. */
export const verificarArchivo = async({bufferPdf}) => {
    try {

        /* Verificar si es un pdf */
        if (!bufferPdf.slice(0, 5).toString() === '%PDF-') {
            throw new Error("El archivo no es un pdf");
        }

        /* Objetos de firmas */
        let arrayFirmas = []; 

        /* Leer el contendio raw del pdf */
        const pdfDoc = await PDFDocument.load(bufferPdf);
        const pdfBuffer = Buffer.from(bufferPdf);
        const pdfString = pdfBuffer.toString('binary');
        /*await fs.writeFileSync("./buffer.txt", pdfString,{encoding:"utf-8"}); */

        /* Buscar el diccionario de firmas */
        const tienefirma = pdfString.includes('/Type/Sig') || pdfString.includes('/SubFilter/adbe.pkcs7');
        if(!tienefirma){
            /*console.log("No tiene firmas");*/
            return true
        }

        /* Extraer informacion de las firmas */
        const regexFirmas = /\/Contents\s*<([0-9A-Fa-f]+)>/g;
        let match;
        let numeroFirma = 1;

        while ((match = regexFirmas.exec(pdfString)) !== null){
            let firmaProcesada = await procesarFirmas({firmaBinario:match[1]});
            /*await fs.writeFileSync("./firmasBinario.txt", firmaProcesada,{encoding:"utf-8", flag:"a"});*/
            console.log(firmaProcesada);
        }


        //     // 
        //     let p7 = null;
        //     let longitudUsada = firmaBytes.length;

        //     // Intentar parsear, reduciendo longitud si hay bytes extras
        //     for (let len = firmaBytes.length; len > 100; len -= 10) {
        //       try {
        //         const bytesRecortados = firmaBytes.substring(0, len);
        //         const asn1 = forge.asn1.fromDer(bytesRecortados);
        //         p7 = forge.pkcs7.messageFromAsn1(asn1);
        //         longitudUsada = len;
        //         break;
        //       } catch (e) {
        //         // Continuar intentando con menos bytes
        //         if (len <= 100) {
        //           throw new Error('No se pudo parsear la firma PKCS#7');
        //         }
        //       }
        //     }

        //     if (!p7) {
        //       throw new Error('No se pudo decodificar la firma');
        //     }


        //     console.log(p7)
        //   }
        // }

        
        return true;
    } catch (error) {
        throw new Error(`Error al validar el tipo de archivo:${error.message}`);
    }
}

/* Obtener la información de las firmas digitales encontradas en los pdf */
export const procesarFirmas = async({firmaBinario}) => {
    try {
        /* Modificar el string con el binario de la firma */
        let firmaHexa = firmaBinario
        .replace(/\s/g, '')
        .replace(/\n/g, '')
        .replace(/\r/g, '')
        .replace(/[^0-9A-Fa-f]/g, '')
        .toUpperCase();

        if (firmaHexa.length % 2 !== 0) {
            firmaHexa = '0' + firmaHexa;
        }

        /* Convertir a bytes */
        const firmaBytes = forge.util.hexToBytes(firmaHexa);
        const asn1 = forge.asn1.fromDer(firmaBytes);
        
        // let p7 = null;
        // let longitudUsada = firmaBytes.length;
        
        // /* Intentar parsear, reduciendo longitud si hay bytes extras */ 
        // for (let len = firmaBytes.length; len > 100; len -= 10) {
        //   try {
        //     const bytesRecortados = firmaBytes.substring(0, len);
        //     const asn1 = forge.asn1.fromDer(bytesRecortados);
        //     p7 = forge.pkcs7.messageFromAsn1(asn1);
        //     longitudUsada = len;
        //     break;
        //   } catch (e) {
        //     /* Continuar intentando con menos bytes */
        //     if (len <= 100) {
        //       throw new Error('No se pudo parsear la firma PKCS#7');
        //     }
        //   }
        // }

        //console.log(firmaBytes)

        // if (p7 === null ) {
        //     throw new Error(`No se pudo decodificar la firma:${err}`);
        // }
        

        return firmaBytes;
    } catch (error) {
        throw new Error(`Error al procesar la firma:${error.message}`); 
    }
}

/* Agregar un placeholder o espacio de firma al documento pdf */
export const agregarPlaceholder = async ({bufferPdf}) =>{
    try {
        const pdfPlaceholder = await plainAddPlaceholder({
            pdfBuffer:bufferPdf,
            reason: 'Firma Digital - Certificado',
            contactInfo: 'lui.sarmiento@aciel.com',
            name: 'Luis Sarmiento',
            location: 'Bogotá, Colombia',
            position: {
                x: 100,
                y: 100,
                width: 200,
                height: 100
            }
        });

        return pdfPlaceholder;
    } catch (error) {
        throw new Error(`Error en el placeholder:${error.message}`);
    }
}

/* Firmar documento pdf */
export const firmarPDF = async ({pdfPlaceholder, p12Buffer, p12Contrasena}) =>{
    try {
        const signer = new P12Signer(p12Buffer, { 
            passphrase: p12Contrasena
        });
        const signPdf = new SignPdf();
        const signedPdf = await signPdf.sign(pdfPlaceholder, signer);
        fs.writeFileSync('./documento-firmado.pdf', signedPdf);
        return true; 
    } catch (error) {
        throw new Error(`Error al firmar documento pdf:${error.message}`)
    }
}

/* Verificar firma digital */


//const p12Buffer = fs.readFileSync('C:/Users/sarmi/Desktop/PROYECTOS/TRABAJO/ACIEL/Dinamo/Docs/FirmasDigitales/lui.sarmiento/1023373788.p12');
const pdfBuffer = fs.readFileSync('/home/neo/Desktop/PROYECTS/Dinamo/Docs/DocumentosFirmas/F-ACS-01 ACTA-V2 27-01-2026.pdf');

verificarArchivo({bufferPdf:pdfBuffer})
.then((res)=>{
    console.log(res);

})
.catch((error)=>{
    console.log(error); 
}) 

// // 1. Recibir y validar PDF
// // 2. Guardar temporalmente con nombre único
// // 3. Leer y modificar PDF con pdf-lib
// // 4. Aplicar placeholder para firma
// // 5. Firmar con certificado P12
// // 6. Verificar firma digital
// // 7. Mover a ubicación final o devolver
// // 8. Limpiar archivos temporales
/* Modulos */
import fs from 'fs';
import signpdfPkg from '@signpdf/signpdf';
import signerPkg from '@signpdf/signer-p12';
import { plainAddPlaceholder } from '@signpdf/placeholder-plain';
import { PDFDocument } from 'pdf-lib';
import forge from 'node-forge';

const { SignPdf } = signpdfPkg;
const { P12Signer } = signerPkg;


/* Verificar si es un PDF y si tiene certificados*/
export const verificarArchivo = async({bufferPdf}) => {
    try {
        if (!bufferPdf.slice(0, 5).toString() === '%PDF-') {
            throw new Error("El archivo no es un pdf");
        }
        console.log("Es un pdf"); 

        const pdfDoc = await PDFDocument.load(bufferPdf);
        
        // Para verificar firmas, necesitas leer el contenido raw
        const pdfBuffer = Buffer.from(bufferPdf);
        const pdfString = pdfBuffer.toString('binary');
        //console.log(pdfString)
        
        //
        // Buscar el diccionario de firmas
        const tienefirma = pdfString.includes('/Type /Sig') || pdfString.includes('/SubFilter /adbe.pkcs7');
        console.log(tienefirma)

        // Extraer información de la firma (simplificado)
        if (tienefirma) {
          const firmaMatch = pdfString.match(/\/Contents\s*<([^>]+)>/);
          if (firmaMatch) {
            const firmaHex = firmaMatch[1];
            let hexLimpio = firmaHex
            .replace(/\s/g, '')           // Eliminar espacios
            .replace(/\n/g, '')           // Eliminar saltos de línea
            .replace(/\r/g, '')           // Eliminar retornos de carro
            .replace(/[^0-9A-Fa-f]/g, '') // Solo caracteres hexadecimales
            .toUpperCase();

            if (hexLimpio.length % 2 !== 0) {
              console.warn('⚠️ Longitud impar detectada, agregando 0 al inicio');
              hexLimpio = '0' + hexLimpio;
            }
            //console.log(hexLimpio)
            const firmaBytes = forge.util.hexToBytes(hexLimpio);
            console.log(firmaBytes.length); 

            // Parsear la firma (con manejo de bytes sobrantes)
            let p7 = null;
            let longitudUsada = firmaBytes.length;

            // Intentar parsear, reduciendo longitud si hay bytes extras
            for (let len = firmaBytes.length; len > 100; len -= 10) {
              try {
                const bytesRecortados = firmaBytes.substring(0, len);
                const asn1 = forge.asn1.fromDer(bytesRecortados);
                p7 = forge.pkcs7.messageFromAsn1(asn1);
                longitudUsada = len;
                break;
              } catch (e) {
                // Continuar intentando con menos bytes
                if (len <= 100) {
                  throw new Error('No se pudo parsear la firma PKCS#7');
                }
              }
            }

            if (!p7) {
              throw new Error('No se pudo decodificar la firma');
            }


            console.log(p7)
          }
        }

        
        return true;
    } catch (error) {
        throw new Error(`Error al validar el tipo de archivo:${error.message}`);
    }
}


/* Agregar un placeholder al documento pdf */
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


const p12Buffer = fs.readFileSync('C:/Users/sarmi/Desktop/PROYECTOS/TRABAJO/ACIEL/Dinamo/Docs/FirmasDigitales/lui.sarmiento/1023373788.p12');
const pdfBuffer = fs.readFileSync('C:/Users/sarmi/Desktop/PROYECTOS/TRABAJO/ACIEL/Dinamo/Docs/DocumentosFirmas/documento-firmado.pdf');

verificarArchivo({bufferPdf:pdfBuffer})
.then((res)=>{
    console.log(res)
})
.catch((error)=>{
    console.log(error)
}) 

// agregarPlaceholder({bufferPdf:pdfBuffer})
// .then((res)=>{
//     firmarPDF({pdfPlaceholder:res,p12Buffer:p12Buffer,p12Contrasena:"111"})
//     .then((res)=>{
//         console.log(res)
//     })
//     .catch((error)=>{
//         console.log(error)
//     })
// })
// .catch((error)=>{
//     console.log(error);
// })


// // 1. Recibir y validar PDF
// // 2. Guardar temporalmente con nombre único
// // 3. Leer y modificar PDF con pdf-lib
// // 4. Aplicar placeholder para firma
// // 5. Firmar con certificado P12
// // 6. Verificar firma digital
// // 7. Mover a ubicación final o devolver
// // 8. Limpiar archivos temporales
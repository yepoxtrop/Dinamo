/* Modulos */
import fs from 'fs';
import signpdfPkg from '@signpdf/signpdf';
import signerPkg from '@signpdf/signer-p12';
import { plainAddPlaceholder } from '@signpdf/placeholder-plain';
import { buffer } from 'stream/consumers';
import { error } from 'console';

const { SignPdf } = signpdfPkg;
const { P12Signer } = signerPkg;


/* Verificar si es un PDF */
export const verificarTipoArchivo = ({bufferPdf}) => {
    try {
        if (!bufferPdf.slice(0, 5).toString() === '%PDF-') {
            throw new Error("El archivo no es un pdf");
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

const p12Buffer = fs.readFileSync('C:/Users/sarmi/Desktop/PROYECTOS/TRABAJO/ACIEL/Dinamo/Docs/FirmasDigitales/lui.sarmiento/1023373788.p12');
const pdfBuffer = fs.readFileSync('C:/Users/sarmi/Desktop/PROYECTOS/TRABAJO/ACIEL/Dinamo/Docs/DocumentosFirmas/document.pdf');

agregarPlaceholder({bufferPdf:pdfBuffer})
.then((res)=>{
    firmarPDF({pdfPlaceholder:res,p12Buffer:p12Buffer,p12Contrasena:"111"})
    .then((res)=>{
        console.log(res)
    })
    .catch((error)=>{
        console.log(error)
    })
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


// async function firmarPDF() {
//   try {
//     console.log('📄 Cargando certificado P12...');
//     const p12Buffer = fs.readFileSync('C:/Users/sarmi/Desktop/PROYECTOS/TRABAJO/ACIEL/Dinamo/Docs/FirmasDigitales/lui.sarmiento/1023373788.p12');
    
//     console.log('🔑 Creando firmante...');
//     const signer = new P12Signer(p12Buffer, { 
//       passphrase: '111'
//     });
    
//     console.log('📋 Cargando PDF...');
//     let pdfBuffer = fs.readFileSync('C:/Users/sarmi/Desktop/PROYECTOS/TRABAJO/ACIEL/Dinamo/Docs/DocumentosFirmas/Certificado_1769458115307.pdf');
    
//     console.log('📝 Agregando placeholder para firma...');
//     pdfBuffer = plainAddPlaceholder({
//       pdfBuffer,
//       reason: 'Firma Digital - Certificado',
//       contactInfo: 'lui.sarmiento@aciel.com',
//       name: 'Luis Sarmiento',
//       location: 'Bogotá, Colombia'
//     });
    
//     console.log('✍️ Firmando documento...');
//     const signPdf = new SignPdf();
//     const signedPdf = await signPdf.sign(pdfBuffer, signer);
    
//     console.log('💾 Guardando PDF firmado...');
//     fs.writeFileSync('./documento-firmado.pdf', signedPdf);
    
//     console.log('✅ PDF firmado correctamente');
    
//   } catch (error) {
//     console.error('❌ Error al firmar PDF:', error.message);
//     console.error('Stack:', error.stack);
//   }
// }
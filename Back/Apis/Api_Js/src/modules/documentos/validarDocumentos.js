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
        let objetoFirmas = []; 

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
            let firmaProcesada = await procesarFirmas({firmaHexaPura:match[1]});
            let firmaDigital = {
                idFirma: firmaProcesada.certificates[0].signatureOid,
                numeroSerial: firmaProcesada.certificates[0].serialNumber,
                fechas: firmaProcesada.certificates[0].validity,
                hash: firmaProcesada.certificates[0].issuer,
                datos: {
                    C:firmaProcesada.certificates[0].subject.attributes[0].value,
                    ST:firmaProcesada.certificates[0].subject.attributes[1].value,
                    L:firmaProcesada.certificates[0].subject.attributes[2].value,
                    O:firmaProcesada.certificates[0].subject.attributes[3].value,
                    OU:firmaProcesada.certificates[0].subject.attributes[4].value,
                    CN:firmaProcesada.certificates[0].subject.attributes[5].value,
                    E:firmaProcesada.certificates[0].subject.attributes[6].value
                }

            }
            /*await fs.writeFileSync("./firmasBinario.txt", firmaProcesada,{encoding:"utf-8", flag:"a"});*/
            //console.log(firmaProcesada);
            objetoFirmas.push(firmaDigital)
            console.log(firmaDigital); 
        }
        
        return objetoFirmas;
    } catch (error) {
        throw new Error(`Error al validar el tipo de archivo:${error.message}`);
    }
}

/* Obtener la información de las firmas digitales encontradas en los pdf */
export const procesarFirmas = async({firmaHexaPura}) => {
    try {
        /* Modificar el string con el binario de la firma */
        let firmaHexa = firmaHexaPura
        .replace(/\s/g, '')
        .replace(/\n/g, '')
        .replace(/\r/g, '')
        .replace(/[^0-9A-Fa-f]/g, '')
        .toUpperCase();

        if (!/^[0-9A-F]+$/.test(firmaHexa)) {
            throw new Error('El formato no es hexadecimal válido');
        }

        if (firmaHexa.length % 2 !== 0) {
            firmaHexa = '0' + firmaHexa;
        }

        // Detectar y eliminar padding de ceros al final
        // El padding PKCS#7 en PDFs suele ser muchos 00 al final
        let hexSinPadding = firmaHexa;
        
        // Contar cuántos pares de 00 hay al final
        let paddingCount = 0;
        for (let i = firmaHexa.length - 2; i >= 0; i -= 2) {
          if (firmaHexa.substring(i, i + 2) === '00') {
            paddingCount += 2;
          } else {
            break;
          }
        }
    
    if (paddingCount > 100) {
      console.log(`⚠️ Detectado padding excesivo: ${paddingCount / 2} bytes de 00`);
      hexSinPadding = firmaHexa.substring(0, firmaHexa.length - paddingCount);
      console.log(`Hex sin padding, nueva longitud: ${hexSinPadding.length} chars`);
    }

    // Convertir hex a bytes
    const firmaBytes = forge.util.hexToBytes(hexSinPadding);
    console.log('Bytes totales:', firmaBytes.length);
    
    // Verificar que empiece con estructura PKCS#7 válida (0x30 = SEQUENCE)
    const primerByte = firmaBytes.charCodeAt(0);
    console.log('Primer byte:', primerByte, '(esperado: 48 = 0x30)');
    
    if (primerByte !== 0x30) {
      throw new Error(`Estructura inválida. Primer byte: ${primerByte}, esperado: 48 (0x30 SEQUENCE)`);
    }

        

            
        // Parsear la firma (con manejo de bytes sobrantes)
        // Parsear la firma con reducción incremental si es necesario
    let p7 = null;
    let longitudUsada = firmaBytes.length;
    let intentos = 0;
    const maxIntentos = Math.min(50, Math.floor(firmaBytes.length / 10));
    
    for (let len = firmaBytes.length; len > 100 && intentos < maxIntentos; len -= 10) {
      try {
        const bytesRecortados = firmaBytes.substring(0, len);
        const asn1 = forge.asn1.fromDer(bytesRecortados);
        p7 = forge.pkcs7.messageFromAsn1(asn1);
        
        longitudUsada = len;
        console.log(`✅ Firma parseada exitosamente con ${len} bytes (${intentos + 1} intentos)`);
        break;
        
      } catch (e) {
        intentos++;
        if (intentos >= maxIntentos || len <= 100) {
          console.error('❌ Agotados los intentos de parseo');
          console.error('Último error:', e.message);
          throw new Error(`No se pudo parsear la firma PKCS#7 después de ${intentos} intentos`);
        }
      }
    }
    
    if (p7 === null) {
      throw new Error('No se pudo decodificar la firma');
    }
        

        return p7;
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


// // 1. Recibir y validar PDF
// // 2. Guardar temporalmente con nombre único
// // 3. Leer y modificar PDF con pdf-lib
// // 4. Aplicar placeholder para firma
// // 5. Firmar con certificado P12
// // 6. Verificar firma digital
// // 7. Mover a ubicación final o devolver
// // 8. Limpiar archivos temporales
/* Librerias */
import { SignPdf } from '@signpdf/signpdf';
import { P12Signer } from '@signpdf/signer-p12';
import { pdflibAddPlaceholder } from '@signpdf/placeholder-pdf-lib';
import { plainAddPlaceholder } from '@signpdf/placeholder-plain';
import { PDFDocument, rgb } from 'pdf-lib';
import { firmarPdfConJava } from './firmarDocumentosJava.js';

const PADDING = 8;
const LINE_HEIGHT_FACTOR = 1.2;
const USAR_JAVA_SIEMPRE = true; // Flag para usar SIEMPRE Java (firma incremental segura)

function getSignatureFontSize(width, height) {
    const availableWidth = Math.max(20, width - PADDING * 2);
    const availableHeight = Math.max(20, height - PADDING * 2);
    const lineCount = 4;
    const maxSizeByHeight = availableHeight / (lineCount * LINE_HEIGHT_FACTOR);
    const maxSizeByWidth = availableWidth / 22;
    return Math.max(5, Math.min(12, Math.floor(Math.min(maxSizeByHeight, maxSizeByWidth))));
}

function getSignatureContent(certificateInfo) {
    // Formatear fecha EXACTAMENTE igual que en Java: dd/MM/yyyy HH:mm:ss
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const date = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    
    return {
        title: 'Firmado digitalmente por',
        name: certificateInfo?.commonName || '',
        organization: certificateInfo?.organization || '',
        date,
    };
}

function toAscii(value) {
    if (!value) return '';
    return value
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\x20-\x7E]/g, '');
}

function normalizeP12Buffer(p12Buffer) {
    if (!p12Buffer || !p12Buffer.length) {
        return p12Buffer;
    }

    // P12 binario válido empieza con 0x30 0x82 (SEQUENCE en DER). No normalizar.
    if (p12Buffer[0] === 0x30 && (p12Buffer[1] === 0x82 || p12Buffer[1] === 0x81)) {
        return p12Buffer;
    }

    const asciiCount = p12Buffer.reduce((count, b) => {
        const isAscii = (b >= 0x20 && b <= 0x7e) || b === 0x0a || b === 0x0d || b === 0x09;
        return count + (isAscii ? 1 : 0);
    }, 0);

    const asciiRatio = asciiCount / p12Buffer.length;
    if (asciiRatio < 0.9) {
        return p12Buffer;
    }

    const text = p12Buffer.toString('utf8');
    const base64Body = text
        .replace(/-----BEGIN[^-]*-----/g, '')
        .replace(/-----END[^-]*-----/g, '')
        .replace(/\s+/g, '');

    try {
        return Buffer.from(base64Body, 'base64');
    } catch {
        return p12Buffer;
    }
}

/**
 * Detecta si un PDF ya contiene firmas digitales
 */
function pdfHasSignatures(pdfBuffer) {
    try {
        const pdfString = pdfBuffer.toString('latin1');
        // Buscar objetos de firma digital en el PDF
        return /\/Type\s*\/Sig(?:\s|\/|>)/.test(pdfString);
    } catch {
        return false;
    }
}

/**
 * Añade objetos gráficos al PDF de forma incremental añadiendo al final del archivo
 * Esto NO invalida firmas existentes porque hace un "append" incremental
 */
function addIncrementalVisualToPage(pdfBuffer, signatureArea, certificateInfo) {
    if (!signatureArea?.page) {
        return pdfBuffer;
    }

    try {
        let pdfString = pdfBuffer.toString('latin1');
        
        // Buscar información de la página objetivo
        const pageNum = signatureArea.page;
        
        // Buscar el objeto de la página correspondiente
        // Patrón simplificado: buscar objetos de tipo /Page
        const pageMatches = [...pdfString.matchAll(/(\d+)\s+0\s+obj\s*<<[^>]*\/Type\s*\/Page[^>]*>>/g)];
        
        if (pageMatches.length < pageNum) {
            return pdfBuffer;
        }
        
        const targetPageMatch = pageMatches[pageNum - 1];
        const pageObjNum = parseInt(targetPageMatch[1]);
        
        // Obtener el MediaBox de la página para calcular coordenadas
        const mediaBoxMatch = pdfString.match(/\/MediaBox\s*\[\s*(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*\]/);
        const pageHeight = mediaBoxMatch ? parseFloat(mediaBoxMatch[4]) : 842; // Default A4
        
        const sigY = pageHeight - signatureArea.y - signatureArea.height;
        
        // Crear contenido de apariencia visual
        const content = getSignatureContent(certificateInfo);
        const fontSize = getSignatureFontSize(signatureArea.width, signatureArea.height);
        const lineHeight = fontSize * 1.25;
        
        // Construir el stream de contenido para dibujar la firma
        const visualStream = buildVisualStream(
            signatureArea.x,
            sigY,
            signatureArea.width,
            signatureArea.height,
            content,
            fontSize,
            lineHeight
        );
        
        // Obtener el número más alto de objeto
        const objNums = [...pdfString.matchAll(/(\d+)\s+0\s+obj/g)].map(m => parseInt(m[1]));
        const maxObjNum = Math.max(...objNums);
        const newStreamObjNum = maxObjNum + 1;
        
        // Crear nuevo objeto XObject stream con la apariencia
        const streamObj = 
            `${newStreamObjNum} 0 obj\n` +
            `<< /Type /XObject /Subtype /Form\n` +
            `/BBox [0 0 ${signatureArea.width} ${signatureArea.height}]\n` +
            `/Matrix [1 0 0 1 ${signatureArea.x} ${sigY}]\n` +
            `/Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >>\n` +
            `/Length ${visualStream.length}\n` +
            `>>\n` +
            `stream\n${visualStream}\nendstream\n` +
            `endobj\n`;
        
        // Añadir el nuevo objeto al final del PDF (antes de startxref)
        const startxrefPos = pdfString.lastIndexOf('startxref');
        pdfString = pdfString.slice(0, startxrefPos) + streamObj + pdfString.slice(startxrefPos);
        
        // Buscar el diccionario de la página y añadir referencia al XObject
        const pagePattern = new RegExp(`${pageObjNum}\\s+0\\s+obj\\s*<<([^]*?)>>`, 'm');
        const pageMatch = pdfString.match(pagePattern);
        
        if (pageMatch) {
            const pageDict = pageMatch[0];
            let newPageDict = pageDict;
            
            // Añadir o actualizar /Resources con nuestro XObject
            if (newPageDict.includes('/Resources')) {
                // Buscar /XObject dentro de Resources
                if (newPageDict.includes('/XObject')) {
                    newPageDict = newPageDict.replace(
                        /\/XObject\s*<<([^>]*)>>/,
                        `/XObject << $1 /Sig${newStreamObjNum} ${newStreamObjNum} 0 R >>`
                    );
                } else {
                    newPageDict = newPageDict.replace(
                        /\/Resources\s*<<([^>]*?)>>/,
                        `/Resources << $1 /XObject << /Sig${newStreamObjNum} ${newStreamObjNum} 0 R >> >>`
                    );
                }
            }
            
            pdfString = pdfString.replace(pageDict, newPageDict);
        }
        
        return Buffer.from(pdfString, 'latin1');
    } catch (error) {
        console.error('Error en addIncrementalVisualToPage:', error);
        return pdfBuffer;
    }
}

/**
 * Construye el stream de contenido PDF para la apariencia visual
 */
function buildVisualStream(x, y, width, height, content, fontSize, lineHeight) {
    const padding = 10;
    const accentWidth = 3;
    
    let stream = '';
    
    // Guardar estado gráfico
    stream += 'q\n';
    
    // Fondo azul claro
    stream += '0.97 0.98 1 rg\n';
    stream += `0 0 ${width} ${height} re f\n`;
    
    // Barra azul lateral
    stream += '0.2 0.45 0.7 rg\n';
    stream += `0 0 ${accentWidth} ${height} re f\n`;
    
    // Texto
    stream += 'BT\n';
    stream += '0 0 0 rg\n'; // Negro
    stream += '/F1 ' + fontSize + ' Tf\n';
    
    const lines = [
        { text: content.title, size: fontSize * 0.85 },
        { text: content.name, size: fontSize },
        {text: content.organization, size: fontSize * 0.9 },
        { text: content.date, size: fontSize * 0.8 },
    ].filter(l => l.text);
    
    let currentY = height - padding - fontSize;
    const textX = padding + accentWidth + 6;
    
    for (const line of lines) {
        if (currentY < 0) break;
        const escaped = escapeStringForPDF(line.text);
        stream += `${textX} ${currentY} Td\n`;
        stream += `(${escaped}) Tj\n`;
        stream += `0 -${lineHeight} Td\n`;
        currentY -= lineHeight;
    }
    
    stream += 'ET\n';
    
    // Restaurar estado
    stream += 'Q\n';
    
    return stream;
}

/**
 * Escapa caracteres especiales para strings PDF
 */
function escapeStringForPDF(str) {
    return str
        .replace(/\\/g, '\\\\')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n');
}

export const firmarDocumentos = async ({
    pdfBuffer,
    p12Buffer,
    password,
    signatureArea,
    certificateInfo,
}) => {
    try {
        const normalizedP12 = Buffer.isBuffer(p12Buffer)
            ? p12Buffer
            : Buffer.from(p12Buffer);

        // Detectar si el PDF ya tiene firmas digitales
        const hasExistingSignatures = pdfHasSignatures(pdfBuffer);

        if (USAR_JAVA_SIEMPRE) {
            // SIEMPRE usar iText (Java) que maneja correctamente firmas incrementales
            // Esto garantiza que NUNCA se invaliden firmas anteriores
            try {
                const signedPdf = await firmarPdfConJava({
                    pdfBuffer,
                    p12Buffer: normalizedP12,
                    password,
                    signatureArea,
                    certificateInfo,
                });
                return signedPdf;
            } catch (javaError) {
                console.error('ERROR al firmar con Java:', javaError.message);
                throw new Error(`Error en firma con Java: ${javaError.message}`);
            }
        }

        if (hasExistingSignatures) {
            // PDF ya firmado: usar método incremental que NO invalida firmas anteriores
            // Paso 1: Añadir placeholder de firma de forma incremental (sin apariencia visual)
            const PLACEHOLDER_SIZE = 16384;
            const pdfWithPlaceholder = plainAddPlaceholder({
                pdfBuffer: pdfBuffer,
                reason: toAscii('Firma digital adicional'),
                contactInfo: toAscii(certificateInfo?.organization || ''),
                name: toAscii(certificateInfo?.commonName || 'Firmante'),
                location: toAscii(certificateInfo?.country || ''),
                signatureLength: PLACEHOLDER_SIZE,
            });

            // Paso 2: Firmar
            const signer = new P12Signer(normalizedP12, {
                passphrase: password || '',
                asn1StrictParsing: false,
            });

            const signPdf = new SignPdf();
            const signedPdf = await signPdf.sign(pdfWithPlaceholder, signer);

            return signedPdf;
        }

        //PDF sin firmas previas: usar método completo con pdf-lib
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        let widgetRect = [0, 0, 0, 0];
        let targetPage = null;

        if (signatureArea?.page) {
            const pages = pdfDoc.getPages();
            const page = pages[signatureArea.page - 1];
            if (!page) throw new Error('Pagina no encontrada');

            targetPage = page;

            const { height: pageHeight } = page.getSize();
            const sigY = pageHeight - signatureArea.y - signatureArea.height;

            widgetRect = [
                signatureArea.x,
                sigY,
                signatureArea.x + signatureArea.width,
                sigY + signatureArea.height,
            ];

            const content = getSignatureContent(certificateInfo);
            const fontSize = getSignatureFontSize(signatureArea.width, signatureArea.height);
            const lineHeight = fontSize * 1.25;
            const padding = 10;
            const accentWidth = 3;

            page.drawRectangle({
                x: signatureArea.x,
                y: sigY,
                width: signatureArea.width,
                height: signatureArea.height,
                color: rgb(0.97, 0.98, 1),
                opacity: 0.6,
            });

            page.drawRectangle({
                x: signatureArea.x,
                y: sigY,
                width: accentWidth,
                height: signatureArea.height,
                color: rgb(0.2, 0.45, 0.7),
            });

            const lines = [
                { text: content.title, size: fontSize * 0.85 },
                { text: content.name, size: fontSize },
                { text: content.organization, size: fontSize * 0.9 },
                { text: content.date, size: fontSize * 0.8 },
            ].filter(l => l.text);

            let currentY = sigY + signatureArea.height - padding - fontSize;
            const textX = signatureArea.x + padding + accentWidth + 6;
            const maxWidth = signatureArea.width - padding * 2 - accentWidth - 6;

            for (const line of lines) {
                if (currentY < sigY) break;
                page.drawText(line.text, {
                    x: textX,
                    y: currentY,
                    size: line.size,
                    maxWidth,
                });
                currentY -= lineHeight;
            }
        }

        const PLACEHOLDER_SIZE = 16384;

        pdflibAddPlaceholder({
            pdfDoc,
            pdfPage: targetPage || pdfDoc.getPages()[0],
            reason: toAscii('Documento firmado digitalmente'),
            contactInfo: toAscii(certificateInfo?.organization || ''),
            name: toAscii(certificateInfo?.commonName || 'Firmante'),
            location: toAscii(certificateInfo?.country || ''),
            signingTime: new Date(),
            signatureLength: PLACEHOLDER_SIZE,
            subFilter: 'adbe.pkcs7.detached',
            widgetRect,
            appName: toAscii('Dinamo'),
        });

        const pdfWithPlaceholder = await pdfDoc.save({
            useObjectStreams: false,
            addDefaultPage: false,
            updateFieldAppearances: false,
        });

        const signer = new P12Signer(normalizedP12, {
            passphrase: password || '',
            asn1StrictParsing: false,
        });

        const signPdf = new SignPdf();
        const signedPdf = await signPdf.sign(pdfWithPlaceholder, signer);

        return signedPdf;
    } catch (error) {
        console.error('Error en firmarDocumentos:', error);
        throw new Error(`Error al firmar: ${error.message}`);
    }
};

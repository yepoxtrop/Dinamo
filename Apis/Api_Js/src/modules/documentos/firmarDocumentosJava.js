/* M\u00f3dulo para firma de PDF usando Java + iText 7 */
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { PDFDocument } from 'pdf-lib';

const execPromise = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al JAR compilado de Java (con todas las dependencias incluidas)
const JAR_PATH = path.join(__dirname, '../../../../java-signer/target/pdf-signer-1.0.0.jar');

/**
 * Firma un PDF usando Java + iText 7 con soporte para múltiples firmas incrementales
 * @param {Buffer} pdfBuffer - Buffer del PDF a firmar
 * @param {Buffer} p12Buffer - Buffer del certificado P12
 * @param {string} password - Contraseña del certificado
 * @param {object} signatureArea - {x, y, width, height, page}
 * @param {object} certificateInfo - Información del certificado {commonName, organization, country}
 * @returns {Promise<Buffer>} - Buffer del PDF firmado
 */
export const firmarPdfConJava = async ({
    pdfBuffer,
    p12Buffer,
    password,
    signatureArea,
    certificateInfo = {},
}) => {
    // Crear archivos temporales
    const tempDir = path.join(__dirname, '../../temp');
    await fs.mkdir(tempDir, { recursive: true });

    const inputPdfPath = path.join(tempDir, `input_${Date.now()}.pdf`);
    const outputPdfPath = path.join(tempDir, `output_${Date.now()}.pdf`);
    const p12Path = path.join(tempDir, `cert_${Date.now()}.p12`);

    try {
        // Escribir archivos temporales
        await fs.writeFile(inputPdfPath, pdfBuffer);
        await fs.writeFile(p12Path, p12Buffer);

        // Obtener altura de la página del PDF
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const pages = pdfDoc.getPages();
        const pageIndex = (signatureArea?.page || 1) - 1;
        const targetPage = pages[pageIndex] || pages[0];
        const { height: pageHeight } = targetPage.getSize();

        // Valores por defecto para signatureArea
        const x = signatureArea?.x || 50;
        const y = signatureArea?.y || 50;
        const width = signatureArea?.width || 200;
        const height = signatureArea?.height || 80;
        const page = signatureArea?.page || 1;

        // Preparar certificateInfo como JSON
        const certInfoJson = JSON.stringify({
            commonName: certificateInfo.commonName || '',
            organization: certificateInfo.organization || '',
            country: certificateInfo.country || 'CO'
        });

        // Obtener el directorio del JAR (necesario para que Java encuentre el directorio lib/)
        const jarDir = path.dirname(JAR_PATH);
        const jarName = path.basename(JAR_PATH);

        // Construir comando Java con TODOS los parámetros requeridos
        // Ejecutar desde el directorio del JAR para que encuentre el directorio lib/
        // Orden: inputPdf, outputPdf, p12Path, password, x, y, width, height, page, pageHeight, certInfo
        const command = `cd /d "${jarDir}" && java -jar "${jarName}" "${inputPdfPath}" "${outputPdfPath}" "${p12Path}" "${password}" ${x} ${y} ${width} ${height} ${page} ${pageHeight} "${certInfoJson.replace(/"/g, '\\"')}"`;

        // Ejecutar comando Java
        const { stdout, stderr } = await execPromise(command, {
            timeout: 60000, // 60 segundos de timeout
            maxBuffer: 10 * 1024 * 1024, // 10MB buffer
        });

        // Verificar si hubo errores
        if (stderr && stderr.includes('ERROR')) {
            throw new Error(`Error en firma Java: ${stderr}`);
        }

        // Verificar que el archivo de salida existe
        try {
            await fs.access(outputPdfPath);
        } catch {
            throw new Error('El archivo PDF firmado no fue generado');
        }

        // Leer el PDF firmado
        const signedPdfBuffer = await fs.readFile(outputPdfPath);

        return signedPdfBuffer;

    } catch (error) {
        console.error('Error al firmar PDF con Java:', error);
        throw new Error(`Error al firmar con Java: ${error.message}`);
    } finally {
        // Limpiar archivos temporales
        try {
            await fs.unlink(inputPdfPath).catch(() => {});
            await fs.unlink(outputPdfPath).catch(() => {});
            await fs.unlink(p12Path).catch(() => {});
        } catch (cleanupError) {
            console.warn('Error al limpiar archivos temporales:', cleanupError);
        }
    }
};

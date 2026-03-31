/*========================================================================================================================
FECHA CREACION: 2026/01/22
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Controlador para la creacion de firmas digitales individuales, esto incluye ficheros
                .key, .pub, .csr, .crt, .p12, con su respectiva carpeta, y adicional con el
                envio de correos de notificacion al usuario y supervisor
Modulos       : Tokens, creacion de carpetas, creacion de archivos, procedimientos almacenados y 
                modulos de node
FECHA MODIFICACION: 2026/01/22
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
MODIFICACION      : Se crea sp
========================================================================================================================*/

/* Librerias */
import fs from 'fs/promises';
import path from 'path';

/* Modulos */
import { firmarDocumentos } from '../../modules/documentos/firmarDocumentos.js';
import clientePrisma from '../../settings/prisma/clientePrisma.js';

const UPLOADS_SIGNATURES = path.join(process.cwd(), 'uploads', 'signatures');

export const firmarDocumentosController = async (request, response) => {
    const pdfFile = request.files?.documentoPdf?.[0];
    const p12File = request.files?.certificadoP12?.[0];

    if (!pdfFile) {
        return response.status(400).json({
            Mensaje: 'Documento PDF requerido',
        });
    }

    if (!p12File) {
        return response.status(400).json({
            Mensaje: 'Certificado .p12 requerido',
        });
    }

    let signatureArea = null;
    let certificateInfo = null;

    try {
        if (request.body?.signatureArea) {
            signatureArea = JSON.parse(request.body.signatureArea);
        }
        if (request.body?.certificateInfo) {
            certificateInfo = JSON.parse(request.body.certificateInfo);
        }
    } catch (error) {
        return response.status(400).json({
            Mensaje: 'Datos de firma invalidos',
        });
    }

    const p12Password = request.body?.p12Password || '';

    try {
        const pdfBuffer = await fs.readFile(pdfFile.path);
        const p12Buffer = await fs.readFile(p12File.path);

        if (!pdfBuffer || pdfBuffer.length < 100) {
            return response.status(400).json({
                Mensaje: 'Documento PDF vacio o invalido',
            });
        }

        if (!p12Buffer || p12Buffer.length < 100) {
            return response.status(400).json({
                Mensaje: 'Certificado .p12 vacio o invalido',
            });
        }

        const signedPdfBuffer = await firmarDocumentos({
            pdfBuffer,
            p12Buffer,
            password: p12Password,
            signatureArea,
            certificateInfo,
        });

        const usuarioId = request.usuario?.idUsuario;
        const nombreBase = (pdfFile.originalname || 'documento').replace(/\.pdf$/i, '');
        const nombreGuardado = `${nombreBase}_firmado_${Date.now()}.pdf`;
        const rutaArchivo = path.join(UPLOADS_SIGNATURES, nombreGuardado);

        await fs.mkdir(UPLOADS_SIGNATURES, { recursive: true });
        await fs.writeFile(rutaArchivo, signedPdfBuffer);

        if (usuarioId) {
            const documentosFirmadosModel = clientePrisma.documentos_firmados;
            const documentoNombre = pdfFile.originalname || nombreBase + '.pdf';
            const documentoRuta = `uploads/signatures/${nombreGuardado}`;
            const documentoFecha = new Date();

            if (documentosFirmadosModel) {
                await documentosFirmadosModel.create({
                    data: {
                        documento_nombre_original: documentoNombre,
                        documento_ruta: documentoRuta,
                        documento_fecha_firma: documentoFecha,
                        usuario_id_fk: usuarioId,
                    },
                });
            } else {
                await clientePrisma.$executeRaw`
                    INSERT INTO documentos_firmados (
                        documento_nombre_original,
                        documento_ruta,
                        documento_fecha_firma,
                        usuario_id_fk
                    )
                    VALUES (
                        ${documentoNombre},
                        ${documentoRuta},
                        ${documentoFecha},
                        ${usuarioId}
                    )
                `;
            }
        }

        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader(
            'Content-Disposition',
            `attachment; filename="${encodeURIComponent(nombreBase + '_firmado.pdf')}"`
        );

        return response.status(200).send(signedPdfBuffer);
    } catch (error) {
        console.error('Error en firmarDocumentosController:', error);
        // Enviar mensaje amigable, sin detalles técnicos de Java/stack trace
        return response.status(500).json({
            Mensaje: 'Error al firmar el documento. Por favor, intente nuevamente.',
        });
    } finally {
        try {
            await fs.unlink(pdfFile.path);
        } catch {}
        try {
            await fs.unlink(p12File.path);
        } catch {}
    }
};
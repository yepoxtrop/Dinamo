/* Controlador para listar y descargar documentos firmados por el usuario en el portal */

import fs from 'fs/promises';
import path from 'path';
import clientePrisma from '../../settings/prisma/clientePrisma.js';

const UPLOADS_BASE = process.cwd();

export const listarDocumentosFirmadosController = async (request, response) => {
    const usuarioId = request.usuario?.idUsuario;
    if (!usuarioId) {
        return response.status(401).json({ Mensaje: 'Usuario no autenticado' });
    }

    try {
        const page = Math.max(1, parseInt(request.query.page, 10) || 1);
        const pageSize = Math.min(100, Math.max(1, parseInt(request.query.pageSize, 10) || 50));
        const offset = (page - 1) * pageSize;

        const documentosFirmadosModel = clientePrisma.documentos_firmados;
        const documentos = documentosFirmadosModel
            ? await documentosFirmadosModel.findMany({
                where: { usuario_id_fk: usuarioId },
                orderBy: { documento_fecha_firma: 'desc' },
                skip: offset,
                take: pageSize,
            })
            : await clientePrisma.$queryRaw`
                SELECT
                    documento_firmado_id,
                    documento_nombre_original,
                    documento_fecha_firma,
                    documento_ruta
                FROM documentos_firmados
                WHERE usuario_id_fk = ${usuarioId}
                ORDER BY documento_fecha_firma DESC
                OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY
            `;

        const totalRow = documentosFirmadosModel
            ? await documentosFirmadosModel.count({ where: { usuario_id_fk: usuarioId } })
            : (await clientePrisma.$queryRaw`
                SELECT COUNT(1) AS total
                FROM documentos_firmados
                WHERE usuario_id_fk = ${usuarioId}
            `)?.[0];

        const total = typeof totalRow === 'number'
            ? totalRow
            : Number(totalRow?.total || 0);

        const items = documentos.map((d) => ({
            id: d.documento_firmado_id,
            name: d.documento_nombre_original,
            date: d.documento_fecha_firma,
            status: 'validated',
            type: 'pdf',
        }));

        return response.status(200).json({
            items,
            page,
            pageSize,
            total,
        });
    } catch (error) {
        console.error('Error listarDocumentosFirmados:', error);
        return response.status(500).json({
            Mensaje: 'Error al listar documentos firmados',
            Detalle: error.message,
        });
    }
};

export const descargarDocumentoFirmadoController = async (request, response) => {
    const usuarioId = request.usuario?.idUsuario;
    const id = parseInt(request.params.id, 10);

    if (!usuarioId) {
        return response.status(401).json({ Mensaje: 'Usuario no autenticado' });
    }
    if (isNaN(id)) {
        return response.status(400).json({ Mensaje: 'ID inválido' });
    }

    try {
        const documentosFirmadosModel = clientePrisma.documentos_firmados;
        const doc = documentosFirmadosModel
            ? await documentosFirmadosModel.findFirst({
                where: {
                    documento_firmado_id: id,
                    usuario_id_fk: usuarioId,
                },
            })
            : (await clientePrisma.$queryRaw`
                SELECT TOP (1)
                    documento_firmado_id,
                    documento_nombre_original,
                    documento_fecha_firma,
                    documento_ruta,
                    usuario_id_fk
                FROM documentos_firmados
                WHERE documento_firmado_id = ${id} AND usuario_id_fk = ${usuarioId}
            `)?.[0];

        if (!doc) {
            return response.status(404).json({ Mensaje: 'Documento no encontrado' });
        }

        const rutaArchivo = path.join(UPLOADS_BASE, doc.documento_ruta);
        try {
            await fs.access(rutaArchivo);
        } catch {
            return response.status(404).json({ Mensaje: 'Archivo no encontrado en el servidor' });
        }

        const buffer = await fs.readFile(rutaArchivo);
        const nombreDescarga = doc.documento_nombre_original || 'documento_firmado.pdf';

        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader(
            'Content-Disposition',
            `attachment; filename="${encodeURIComponent(nombreDescarga)}"`
        );
        return response.status(200).send(buffer);
    } catch (error) {
        console.error('Error descargarDocumentoFirmado:', error);
        return response.status(500).json({
            Mensaje: 'Error al descargar documento',
            Detalle: error.message,
        });
    }
};

export const eliminarDocumentoFirmadoController = async (request, response) => {
    const usuarioId = request.usuario?.idUsuario;
    const id = parseInt(request.params.id, 10);

    if (!usuarioId) {
        return response.status(401).json({ Mensaje: 'Usuario no autenticado' });
    }
    if (isNaN(id)) {
        return response.status(400).json({ Mensaje: 'ID inválido' });
    }

    try {
        const documentosFirmadosModel = clientePrisma.documentos_firmados;
        const doc = documentosFirmadosModel
            ? await documentosFirmadosModel.findFirst({
                where: {
                    documento_firmado_id: id,
                    usuario_id_fk: usuarioId,
                },
            })
            : (await clientePrisma.$queryRaw`
                SELECT TOP (1)
                    documento_firmado_id,
                    documento_ruta,
                    usuario_id_fk
                FROM documentos_firmados
                WHERE documento_firmado_id = ${id} AND usuario_id_fk = ${usuarioId}
            `)?.[0];

        if (!doc) {
            return response.status(404).json({ Mensaje: 'Documento no encontrado' });
        }

        const rutaArchivo = path.join(UPLOADS_BASE, doc.documento_ruta);
        try {
            await fs.unlink(rutaArchivo);
        } catch {
            // Si el archivo no existe, igual se elimina el registro
        }

        if (documentosFirmadosModel) {
            await documentosFirmadosModel.delete({
                where: { documento_firmado_id: id },
            });
        } else {
            await clientePrisma.$executeRaw`
                DELETE FROM documentos_firmados
                WHERE documento_firmado_id = ${id} AND usuario_id_fk = ${usuarioId}
            `;
        }

        return response.status(200).json({ Mensaje: 'Documento eliminado' });
    } catch (error) {
        console.error('Error eliminarDocumentoFirmado:', error);
        return response.status(500).json({
            Mensaje: 'Error al eliminar documento',
            Detalle: error.message,
        });
    }
};

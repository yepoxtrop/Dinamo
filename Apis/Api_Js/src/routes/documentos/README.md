# 📄 Rutas de Documentos

Define los endpoints para operaciones directas sobre documentos PDF: validación, firma, descarga y generación de reportes.

## 🔗 Endpoints

| Método | Ruta | Descripción | Middleware |
|--------|------|-------------|-----------|
| POST | `/validar` | Valida PDF y extrae firmas digitales | token, archivos |
| POST | `/firmar` | Firma un PDF con certificado P12 | token, archivos |
| GET | `/listado` | Lista documentos procesados | token |
| GET | `/descargar/:id` | Descarga documento firmado | token |
| POST | `/reportes/basico` | Genera CSV resumido | token |
| POST | `/reportes/detallado` | Genera CSV detallado | token |
| POST | `/reportes/excel` | Genera XLSX completo | token |

## 📋 Controladores

Cada ruta es atendida por un controlador en `src/controllers/documentos/`:

- `validarDocumentos.controller.js` – Procesa validación de PDFs.
- `firmarDocumentos.controller.js` – Firma PDFs con P12.
- `gestionarDocumentosFirmados.controller.js` – Listado y descarga de documentos.
- `reportesDocumentos.controller.js` – Genera reportes en múltiples formatos.

## 🔒 Autenticación

Todas las rutas requieren token JWT válido en la cabecera `Authorization: Bearer <token>`.

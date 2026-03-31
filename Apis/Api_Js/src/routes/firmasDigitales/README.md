# 🔐 Rutas de Firmas Digitales

Define los endpoints para gestión de certificados digitales, firmas individuales y firmas masivas en lote.

## 🔗 Endpoints

| Método | Ruta | Descripción | Middleware |
|--------|------|-------------|-----------|
| POST | `/cargarCertificado` | Carga un certificado P12 | token, archivos |
| POST | `/firmaIndividual` | Realiza firma individual de un PDF | token, archivos |
| POST | `/firmaMasiva` | Procesa firmas en lote desde CSV/TXT | token, archivos |
| GET | `/listado` | Lista certificados disponibles | token |
| DELETE | `/:id` | Elimina un certificado | token |
| GET | `/validar/:id` | Valida estado de certificado | token |

## 📋 Controladores

Cada ruta es atendida por un controlador en `src/controllers/firmasDigitales/`:

- `cargaCertificados.controller.js` – Procesa carga de certificados P12.
- `firmaIndividual.controller.js` – Maneja firmas de un documento a la vez.
- `firmaMasiva.controller.js` – Procesa firmas en lote desde archivos.
- `gestionCertificados.controller.js` – Listado, validación y eliminación de certificados.

## 🔒 Autenticación

Todas las rutas requieren token JWT válido en la cabecera `Authorization: Bearer <token>`.

## 📝 Formatos soportados

- **Certificados**: .p12, .pfx
- **Documentos**: .pdf
- **Lotes**: .csv, .txt

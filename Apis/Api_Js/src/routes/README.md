# 🛣️ Rutas (Routes)

Este directorio define todas las rutas (endpoints) disponibles de la API de firmas digitales. Las rutas se organizan por funcionalidad y son utilizadas por los controladores para procesar las solicitudes HTTP.

## 📂 Estructura

- `/documentos/` – Rutas para operaciones con documentos (carga, validación, firma, descarga).
- `/firmasDigitales/` – Rutas para gestión de certificados y operaciones de firma digital.
- `/inicioSesion/` – Rutas para autenticación y manejo de sesiones.

## 🧩 Rutas principales

### 📄 Documentos (`documentos/`)

- **POST** `/api/documentos/validar` – Valida un PDF y extrae información de firmas digitales.
- **POST** `/api/documentos/firmar` – Firma un PDF con un certificado P12.
- **GET** `/api/documentos/listado` – Obtiene listado de documentos procesados.
- **GET** `/api/documentos/descargar/:id` – Descarga un documento firmado.
- **POST** `/api/documentos/reporteBasico` – Genera reporte CSV resumido.
- **POST** `/api/documentos/reporteDetallado` – Genera reporte CSV detallado.
- **POST** `/api/documentos/reporteExcel` – Genera reporte XLSX completo.

### 🔐 Firmas Digitales (`firmasDigitales/`)

- **POST** `/api/firmas/cargarCertificado` – Carga un certificado digital P12.
- **POST** `/api/firmas/firmaIndividual` – Realiza una firma individual.
- **POST** `/api/firmas/firmaMasiva` – Procesa firmas en lote desde archivo CSV/TXT.
- **GET** `/api/firmas/listado` – Lista certificados disponibles.
- **DELETE** `/api/firmas/:id` – Elimina un certificado.

### 🔑 Inicio Sesión (`inicioSesion/`)

- **POST** `/api/auth/login` – Autentica usuario contra LDAP y emite JWT.
- **POST** `/api/auth/logout` – Invalida el token actual.
- **GET** `/api/auth/verify` – Verifica validez del token JWT.

## 🔒 Protección con Middlewares

Todas las rutas (excepto `/auth/login`) están protegidas por el middleware `tokenMiddleware` que:
- Valida presencia del token JWT en la cabecera `Authorization`.
- Verifica la firma y vigencia del token.
- Rechaza solicitudes no autorizadas con código 401.

Las rutas que reciben archivos utilizan además:
- `archivosMiddleware` – Valida formato y extensión de archivos.
- `revisionArchivosMiddleware` – Valida tamaño, cantidad de archivos y otras reglas de negocio.

## 📝 Observaciones

- Todas las rutas requieren configuración en `.env` (JWT_SECRET, DATABASE_URL, etc.).
- Los controladores asociados a cada ruta manejan la lógica de negocio.
- El formato de respuesta es JSON con estructura estándar: `{ status, message, data }`.

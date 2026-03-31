# 🛠️ Controladores y Middlewares

Este directorio agrupa los controladores que atienden las rutas de la API y los middlewares que validan
las solicitudes antes de que lleguen al controlador final. Comprender la estructura ayuda a depurar y a
probar correctamente los endpoints.

## 📁 Estructura principal

- `/documentos/` – Endpoints para carga, firma y validación de PDFs.
- `/firmasDigitales/` – Operaciones relacionadas con certificados, claves y cargas masivas.
- `/inicioSesion/` – Autenticación y emisión de tokens JWT.
- `midlewareTokens.js` – Verifica la validez del token JWT y adjunta `request.usuario`.
- `midlwareArchivos.js` – Valida que se suban archivos con extensiones y tamaños permitidos.
- `midlwareRevisionArchivos.js` – Realiza comprobaciones adicionales (duplicados, integridad) antes del
  procesamiento.

## 🧩 Controladores clave

- **firmarDocumentosController** (`/documentos/firmarDocumentos.controller.js`): Firma un PDF con un P12,
  lo guarda en el servidor y registra la operación en la base de datos.
- **validarDocumentosController** (`/documentos/validarDocumentos.controller.js`): Analiza un PDF y devuelve
  información detallada sobre las firmas y certificados contenidos.
- **gestionarDocumentosFirmadosController** (`/documentos/gestionarDocumentosFirmados.controller.js`): Lista,
  descarga y administra los documentos ya firmados en el sistema.
- **inicioSesionController** (`/inicioSesion/inicioSesion.controller.js`): Autentica usuarios contra LDAP y
  emite un JWT válido.
- **firmaIndividualController** y **firmaMasivaController** (`/firmasDigitales/...`): Preparan certificados,
  generan claves y en el caso masivo procesan lotes de solicitudes desde archivos CSV/TXT.

## 🔁 Middlewares principales

- **tokenMiddleware**: Extrae el JWT de la cabecera `Authorization`, lo verifica y rechaza solicitudes
  no autorizadas.
- **archivosMiddleware**: Comprueba que la petición incluya al menos un PDF o certificado con extensión
  correcta; devuelve error 400 en caso contrario.
- **revisionArchivosMiddleware**: Añade reglas adicionales de negocio como tamaño máximo, número máximo de
  archivos, etc.

> Revisa el contenido de cada subcarpeta para ver los controladores y middlewares auxiliares definidos.

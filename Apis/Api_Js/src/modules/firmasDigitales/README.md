# 🪪 Módulo de Firmas Digitales

Este módulo agrupa utilidades para la gestión de certificados y generación de claves, además de
procesos de firma individual y por lotes.

## 📂 Estructura de carpetas

- `archivos/` – Creación y manejo de carpetas y ficheros relacionados con las claves (.key, .csr, .crt,
  .p12).
- `carguesMasivos/` – Funciones que leen archivos CSV o TXT y generan operaciones de firma para cada
  línea.
- `carpetas/` – Helpers para estructurar directorios por usuario, fecha u otros criterios.

## 🧩 Funciones clave

- `validarTipoArchivo()` – Comprueba que un fichero tenga la extensión esperada (PDF, P12, TXT, CSV).
- `archivoTXT()` – Procesa un archivo de texto plano con instrucciones de firma masiva.
- `archivoCSV()` – Lee un CSV y transforma cada fila en una solicitud de firma.

> Estos métodos son usados por los controladores `firmaIndividualController` y
> `firmaMasivaController`.

## 🔍 Observaciones

- Asegúrate de que las rutas de salida de certificados tengan permisos de escritura.
- El manejo de errores se delega a los controladores que llaman a estas funciones.
- La validación previa de archivos evita procesar datos corruptos o formatos incorrectos.

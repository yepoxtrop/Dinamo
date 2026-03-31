# 📄 Módulo Documentos

Este módulo maneja todas las operaciones relacionadas con documentos PDF, incluyendo análisis de firmas digitales, procesos de firma y generación de reportes.

## 📂 Estructura

- `analizarDocumentosPDF/` – Utilidades para leer y analizar PDFs binarios, extrayendo información de certificados y firmas.
- `firmarDocumentos.js` – Lógica de firma digital utilizando bibliotecas JavaScript.
- `firmarDocumentosJava.js` – Integración con servicios Java para firmas avanzadas.
- `reportes/` – Generación de reportes en diferentes formatos (CSV, XLSX, PDF).

## 🧩 Funciones principales

- `analizarDocumentoPDF()` – Extrae firmas digitales y certificados de un PDF.
- `firmarDocumento()` – Aplica firma digital a un documento PDF.
- `firmarDocumentoJava()` – Utiliza servicios Java para firmas complejas.
- `generarReporteCSV()` – Crea reportes básicos en formato CSV.
- `generarReporteXLSX()` – Genera reportes detallados en Excel.
- `generarReportePDF()` – (En construcción) Reportes visuales en PDF.

## ⚙️ Configuración

Requiere configuración de rutas de almacenamiento y servicios externos:

```javascript
// settings/general/config.js
{
  rutaDocumentos: process.env.RUTA_DOCUMENTOS,
  rutaReportes: process.env.RUTA_REPORTES,
  servicioJava: process.env.URL_SERVICIO_JAVA
}
```

## 📝 Observaciones

- Los documentos se procesan en memoria para evitar almacenamiento temporal innecesario.
- La integración con Java permite firmas más robustas y compatibles.
- Los reportes incluyen validación de firmas y metadatos de documentos.</content>
<parameter name="filePath">c:\Users\luis.sarmiento\Desktop\PROYECTOS\FIRMAS DIGITALES\firmas-digitales-back\Apis\Api_Js\src\modules\documentos\README.md
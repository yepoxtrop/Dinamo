# 📊 Reportes PDF

## 📌 Estado Actual

🚧 **En Desarrollo**

Este módulo está destinado a generar reportes en formato **PDF** con información de documentos analizados y sus firmas digitales.

---

## 🎯 Objetivos Planeados

- [ ] Generar PDF con cabecera y pie de página
- [ ] Incluir tabla resumen de documentos
- [ ] Incluir tabla detallada de firmas
- [ ] Añadir gráficos de estado
- [ ] Personalizar estilos y colores
- [ ] Incluir logo de la empresa
- [ ] Soporte para múltiples páginas
- [ ] Generación de índice automático

---

## 📚 Librerías Recomendadas

Para la implementación de reportes PDF se recomienda:

### Opción 1: **pdfkit** (Recomendada para simplicidad)
```javascript
import PDFDocument from 'pdfkit';

// Crear documento
const doc = new PDFDocument();

// Agregar contenido
doc.fontSize(25).text('Título del Reporte', 100, 100);
doc.fontSize(12).text('Contenido...', 100, 150);

// Guardar
doc.pipe(fs.createWriteStream('reporte.pdf'));
doc.end();
```

**Ventajas:**
- API simple e intuitiva
- Buena documentación
- Soporte para tablas
- Manejo de fuentes y estilos

### Opción 2: **pdf-lib** (Para manipulación avanzada)
```javascript
import { PDFDocument } from 'pdf-lib';

const pdfDoc = await PDFDocument.create();
const page = pdfDoc.addPage([612, 792]);
```

**Ventajas:**
- Crear PDFs desde cero o modificar existentes
- Manejo preciso de elementos
- Soporte para formularios

### Opción 3: **jsPDF + html2canvas** (Para convertir HTML a PDF)
```javascript
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const canvas = await html2canvas(element);
const imgData = canvas.toDataURL('image/png');
const pdf = new jsPDF();
pdf.addImage(imgData, 'PNG', 0, 0);
```

**Ventajas:**
- Reutilizar plantillas HTML
- Estilos CSS nativos
- Más control visual

---

## 📋 Estructura Propuesta

```javascript
/*========================================================================================================================
FECHA CREACION: 2026/03/03
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Función que genera reportes en PDF a partir de análisis de documentos
Modulos       : fs
Librerias     : pdfkit
FECHA MODIFICACION: 2026/03/03
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
========================================================================================================================*/

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

/**
 * @param {Object} param0 - Objeto con parámetros
 * @param {String} param0.pathArchivo - Ruta donde guardar el PDF
 * @param {Array} param0.listaObjetos - Datos de documentos analizados
 * @param {Object} param0.opciones - Opciones de formato (opcional)
 * @returns {Boolean} true si fue exitoso
 */
export const reportePDF = async ({ 
  pathArchivo = './reporte.pdf',
  listaObjetos,
  opciones = {}
}) => {
  try {
    // Validar entrada
    if (!Array.isArray(listaObjetos) || listaObjetos.length === 0) {
      throw new Error('listaObjetos debe ser un array no vacío');
    }

    // Crear documento PDF
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50
    });

    // Crear directorio si no existe
    const dir = path.dirname(pathArchivo);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Crear stream de escritura
    const stream = fs.createWriteStream(pathArchivo);
    doc.pipe(stream);

    // Generar contenido
    generarEncabezado(doc);
    generarResumen(doc, listaObjetos);
    generarTablaFirmas(doc, listaObjetos);
    generarPiePagina(doc);

    // Finalizar documento
    doc.end();

    // Esperar a que se escriba
    return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(true));
      stream.on('error', reject);
    });

  } catch (error) {
    throw new Error(`Error al generar PDF: ${error.message}`);
  }
};

// Funciones auxiliares
function generarEncabezado(doc) {
  doc.fontSize(24).font('Helvetica-Bold');
  doc.text('REPORTE DE ANÁLISIS DE FIRMAS DIGITALES', 50, 50);
  
  doc.fontSize(10).font('Helvetica');
  doc.text(`Generado: ${new Date().toLocaleString()}`, 50, 90);
  
  doc.moveTo(50, 110).lineTo(550, 110).stroke();
}

function generarResumen(doc, listaObjetos) {
  doc.fontSize(14).font('Helvetica-Bold').text('Resumen', 50, 120);
  
  // Calcular estadísticas
  let totalDocumentos = listaObjetos.length;
  let totalFirmas = 0;
  let totalVencidas = 0;
  
  listaObjetos.forEach(obj => {
    Object.values(obj).forEach(doc => {
      if (doc.NumeroFirmas) totalFirmas += doc.NumeroFirmas;
      if (doc.NumeroFirmasVencidas) totalVencidas += doc.NumeroFirmasVencidas;
    });
  });

  doc.fontSize(10).font('Helvetica');
  doc.text(`Total de Documentos: ${totalDocumentos}`, 50, 145);
  doc.text(`Total de Firmas: ${totalFirmas}`, 50, 160);
  doc.text(`Firmas Vencidas: ${totalVencidas}`, 50, 175);
}

function generarTablaFirmas(doc, listaObjetos) {
  // Implementar tabla con firmas
  doc.fontSize(12).font('Helvetica-Bold').text('Detalle de Firmas', 50, 210);
  // ... código para generar tabla
}

function generarPiePagina(doc) {
  // Número de página
  doc.fontSize(10).text(
    'Página 1 de 1',
    50,
    750,
    { align: 'center' }
  );
}
```

---

## 🔄 Integración con Otros Módulos

El reporte PDF se integraría con:

```
analizarDocumentoPDF.js
        ↓
    listaFirmas
        ↓
reportePDF.js
        ↓
archivo PDF (.pdf)
```

---

## 📊 Datos de Entrada

```javascript
{
  "documento.pdf": {
    "NombreDocumento": "documento.pdf",
    "EstadoArchivo": "Válido",
    "NumeroFirmas": 2,
    "NumeroFirmasVencidas": 0,
    "Firmas": [
      {
        "Firma_1": {
          "NumeroFirma": 1,
          "Version": 3,
          "Serial": "00...",
          "EstadoDeCertificado": "Disponible",
          "FechaDeVencimiento": "2027-01-30",
          // ... más campos
        }
      }
    ]
  }
}
```

---

## 💡 Características Futuras

1. **Múltiples Plantillas**
   - Plantilla ejecutiva (resumen)
   - Plantilla detallada (completa)
   - Plantilla de auditoría (forensic)

2. **Personalización**
   - Logo de empresa personalizado
   - Colores corporativos
   - Headers y footers dinámicos

3. **Gráficas**
   - Gráfico de estado de firmas
   - Timeline de firmas
   - Comparativa por documento

4. **Certificados**
   - Cadena de certificación visual
   - Validez de certificados
   - Información extendida del emisor

5. **Conformidad**
   - Cumplimiento normativo
   - Estándares internacionales
   - Certificaciones

---

## ⚠️ Consideraciones de Implementación

- **Tamaño de archivo:** Para listas grandes, considerar reportes por documento
- **Memoria:** Paginar contenido para documentos extensos
- **Performance:** Usar streams para mejor eficiencia
- **Estilos:** Mantener consistencia con otros reportes
- **Fuentes:** Usar fuentes estándar para compatibilidad

---

## 📞 Próximos Pasos

1. Seleccionar librería de PDF apropiada
2. Diseñar estructura del reporte
3. Implementar versión básica
4. Agregar validaciones
5. Testing con diferentes tipos de datos
6. Optimización y refinamiento

---

**Estado:** 🚧 En desarrollo  
**Prioridad:** Media  
**Responsable:** Luis Ángel Sarmiento Díaz  

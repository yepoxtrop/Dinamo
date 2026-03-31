# 📊 Reportes XLSX (Excel)

## 📌 Descripción

Este módulo genera reportes en formato **Excel (.xlsx)** con múltiples hojas y formato profesional. Utiliza la librería `exceljs` para crear workbooks completos con metadatos y estilos.

---

## 🔧 Dependencias

```javascript
// exceljs: Para crear y manipular archivos Excel
import excelJs from 'exceljs';

// console (nativa): Para error logging
import { error } from 'console';
```

---

## 📄 reporteXLSX.js

### Propósito
Generar archivos Excel profesionales con información detallada de documentos y firmas digitales.

### Función Principal

```javascript
export const reporteXLSX = async ({listaObjetos}) => {}
```

### Parámetros Entrada

| Nombre | Tipo | Requerido | Descripción |
|--------|------|-----------|-------------|
| `listaObjetos` | Array | ✅ Sí | Array de objetos con datos de documentos |

### Estructura del Workbook

```
Workbook (reporte.xlsx)
├── Metadatos
│   ├── Creator: "Soporte Acs"
│   ├── Company: "ACS - Aciel Soluciones Integrales S.A.S"
│   ├── Description: "Libro de reportes"
│   ├── Created: [Fecha actual]
│   ├── Modified: [Fecha actual]
│   └── LastPrinted: [Fecha actual]
└── Hojas
    └── Hoja 1
        ├── Headers y Footers
        ├── Columnas dinámicas
        └── Filas de datos
```

### Proceso Interno

```
1. Crear nuevo Workbook
2. Configurar metadatos
3. Agregar hoja "Hoja 1"
4. Obtener columnas dinámicas con obtenerColumnas()
5. Formatear objetos con formatearObjetos()
6. Asignar columnas y filas
7. Configurar header/footer
8. Guardar en ./reporte.xlsx
9. Retornar true o lanzar excepción
```

### Funciones Auxiliares

#### 1. `obtenerColumnas(listaObjetos)`

**Propósito:** Extraer automáticamente todas las columnas únicas del conjunto de datos.

**Parámetros:**
- `listaObjetos` (Array): Lista de objetos a analizar

**Algoritmo:**
1. Recorre todos los objetos
2. Identifica propiedades planas (strings, números, etc.)
3. Extrae propiedades de objetos anidados:
   - `editor` → lista de claves de editor
   - `sujeto` → lista de claves de sujeto
   - `validacion` → lista de claves de validación
4. Retorna estructura de columnas

**Retorno:**
```javascript
{
  listaConcatenadaOriginal: Array,    // Todas las claves en un array plano
  listaConSublistasOriginal: [
    listaItems,      // [0] Propiedades generales
    listaEditor,     // [1] Propiedades del editor
    listaSujeto      // [2] Propiedades del sujeto
  ]
}
```

**Ejemplo de Retorno:**
```javascript
{
  listaConcatenadaOriginal: [
    'archivo', 'numeroFirma', 'serial', 'estado',
    'commonName', 'countryName', 'stateOrProvinceName',  // from editor
    'commonName', 'countryName', ...  // from sujeto
  ],
  listaConSublistasOriginal: [
    ['archivo', 'numeroFirma', 'serial', 'estado'],
    ['commonName', 'countryName', 'stateOrProvinceName', ...],
    ['commonName', 'countryName', ...]
  ]
}
```

#### 2. `formatearObjetos(listaIndices, listaObjetos)`

**Propósito:** Transformar objetos anidados en propiedades planas para Excel.

**Parámetros:**
- `listaIndices` (Array[Array]): Estructura de índices de `obtenerColumnas()`
- `listaObjetos` (Array): Lista de objetos a formatear

**Algoritmo:**
1. Para cada objeto en la lista:
   - Busca propiedades `editor`, `sujeto`, `validacion`
   - Convierte cada subpropiedad en una propiedad del objeto principal
   - Agrega sufijos: `Editor`, `Sujeto`
   - Rellena vacíos con strings vacíos
   - Elimina las propiedades anidadas originales
2. Retorna lista de objetos planos

**Ejemplo Transformación:**
```javascript
// ANTES
{
  "archivo": "doc.pdf",
  "editor": {
    "commonName": "Juan",
    "countryName": "CO"
  }
}

// DESPUÉS
{
  "archivo": "doc.pdf",
  "commonNameEditor": "Juan",
  "countryNameEditor": "CO"
}
```

**Retorno:**
```javascript
[
  {
    "archivo": "doc1.pdf",
    "numeroFirma": 1,
    "commonNameEditor": "Juan Pérez",
    "countryNameEditor": "CO",
    "countryNameSujeto": "CO",
    ...
  }
]
```

### Ejemplo de Uso Completo

```javascript
import { reporteXLSX } from './reportesXLSX/reporteXLSX.js';

const listaObjetos = [
  {
    "archivo": "prueba.pdf",
    "numeroFirma": 1,
    "totalCertificadosCadena": 1,
    "version": 2,
    "serial": "00c8b48e27a4...",
    "oidFirma": "1.2.840.113549.1.1.11",
    "validacion": {
      "notBefore": "2026-01-30T18:02:20.000Z",
      "notAfter": "2026-04-30T18:02:20.000Z"
    },
    "estado": "Disponible",
    "editor": {
      "commonName": "Sigilfredo Lara Gonzalez",
      "countryName": "CO",
      "stateOrProvinceName": "Cundinamarca",
      "localityName": "Bogota D.C",
      "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
      "organizationalUnitName": "Sistemas"
    },
    "sujeto": {
      "commonName": "Sigilfredo Lara Gonzalez",
      "countryName": "CO",
      "stateOrProvinceName": "Cundinamarca",
      "localityName": "Bogota D.C",
      "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
      "organizationalUnitName": "Sistemas"
    }
  }
];

try {
  const resultado = await reporteXLSX({ listaObjetos });
  
  if (resultado) {
    console.log('✅ Reporte Excel generado en ./reporte.xlsx');
  }
} catch (error) {
  console.error('❌ Error:', error.message);
}
```

### Archivo Generado

**Ubicación:** `./reporte.xlsx`

**Estructura:**
- Une **automáticamente** todas las columnas necesarias
- Genera filas según la cantidad de registros
- Headers y footers personalizables
- Metadatos profesionales

---

## ⚙️ Configuración

### Metadatos del Workbook

```javascript
const libro = new excelJs.Workbook();
libro.creator = 'Soporte Acs';                    // Creador
libro.lastModifiedBy = 'Soporte Acs';            // Último editor
libro.created = new Date();                       // Fecha de creación
libro.modified = new Date();                      // Fecha de modificación
libro.lastPrinted = new Date();                   // Última impresión
libro.company = 'ACS - Aciel Soluciones...';     // Compañía
libro.description = 'Libro de reportes';          // Descripción
```

### Headers y Footers

```javascript
const hoja1 = libro.addWorksheet('Hoja 1', {
  headerFooter: {
    firstHeader: 'Hola',    // Header en primera página
    firstFooter: 'Adios'    // Footer en primera página
  }
});
```

### Exportar a Archivo

```javascript
await libro.xlsx.writeFile('./reporte.xlsx');
```

---

## ⚠️ Limitaciones Actuales

| Limitación | Impacto | Solución |
|-----------|--------|----------|
| Datos de prueba hardcodeados | Función no es reutilizable | Eliminar datos de prueba al final |
| Sin parámetro de ruta | Siempre guarda en `./reporte.xlsx` | Agregar parámetro `pathArchivo` |
| Sin validación | Errores silenciosos | Validar estructura de entrada |
| Sin estilos | Apariencia básica | Agregar formato a celdas |
| Puede faltar `columnasObj` | Valores `undefined` en cells | Mejorar lógica de asignación |
| Una sola hoja | No hay separación de datos | Crear hojas por tipo de reporte |

---

## 🚀 Mejoras Propuestas

### 1. Eliminar datos de prueba
```javascript
// Remover este bloque al final del archivo
reporteXLSX({listaObjetos:[...]})
```

### 2. Agregar parámetro de ruta
```javascript
export const reporteXLSX = async ({
  listaObjetos,
  pathArchivo = './reporte.xlsx'
}) => {
  // ...
  await libro.xlsx.writeFile(pathArchivo);
}
```

### 3. Agregar estilos
```javascript
// Formato de headers
hoja1.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
hoja1.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };

// Autoajuste de ancho
hoja1.columns.forEach(col => {
  col.width = col.header.length + 2;
});
```

### 4. Múltiples hojas
```javascript
const hoja1 = libro.addWorksheet('Resumen');
const hoja2 = libro.addWorksheet('Firmas Vencidas');
const hoja3 = libro.addWorksheet('Detalle Completo');
```

### 5. Agregar validaciones
```javascript
if (!Array.isArray(listaObjetos) || listaObjetos.length === 0) {
  throw new Error('listaObjetos debe ser un array no vacío');
}

if (!listaObjetos[0] || typeof listaObjetos[0] !== 'object') {
  throw new Error('Estructura de datos inválida');
}
```

### 6. Crear directorio si no existe
```javascript
import path from 'path';

const dir = path.dirname(pathArchivo);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
```

---

## 📊 Estructura de Datos Esperada

```javascript
[
  {
    "archivo": "string",                  // Nombre del archivo PDF
    "numeroFirma": number,                // Número de firma
    "totalCertificadosCadena": number,    // Cantidad de certificados
    "version": number,                    // Versión del certificado
    "serial": "string",                   // Número serial
    "oidFirma": "string",                 // Identificador OID
    "estado": "string",                   // Estado (Disponible/Vencido)
    
    "validacion": {                       // Objeto de validación
      "notBefore": "ISO date string",
      "notAfter": "ISO date string"
    },
    
    "editor": {                           // Informacion del emisor
      "commonName": "string",
      "countryName": "string",
      "stateOrProvinceName": "string",
      "localityName": "string",
      "organizationName": "string",
      "organizationalUnitName": "string"
    },
    
    "sujeto": {                           // Información del firmante
      "commonName": "string",
      "countryName": "string",
      // ... mismo patrón que editor
    }
  }
]
```

---

## 💡 Ejemplos de Mejora Recomendada

### Versión Mejorada Básica

```javascript
export const reporteXLSX = async ({
  listaObjetos,
  pathArchivo = './reporte.xlsx'
}) => {
  // Validar entrada
  if (!Array.isArray(listaObjetos) || listaObjetos.length === 0) {
    throw new Error('listaObjetos debe ser un array no vacío');
  }

  try {
    const libro = new excelJs.Workbook();
    
    // Metadatos
    libro.creator = 'Soporte Acs';
    libro.company = 'ACS - Aciel Soluciones Integrales S.A.S';
    libro.description = 'Libro de reportes';
    libro.created = new Date();
    
    // Crear hoja
    const hoja = libro.addWorksheet('Resumen');
    
    // Obtener columnas y formatear
    const {listaConcatenadaOriginal} = obtenerColumnas(listaObjetos);
    const datosFormateados = formatearObjetos(
      [listaConcatenadaOriginal, [], []],
      listaObjetos
    );
    
    // Configurar
    hoja.columns = listaConcatenadaOriginal.map(col => ({
      header: col,
      key: col,
      width: 15
    }));
    
    // Agregar datos
    datosFormateados.forEach(fila => {
      hoja.addRow(fila);
    });
    
    // Guardar
    await libro.xlsx.writeFile(pathArchivo);
    return true;
    
  } catch (error) {
    throw new Error(`Error al generar Excel: ${error.message}`);
  }
};
```

---

## 📞 Contacto y Historial

**Creado:** 2026/03/03  
**Autor:** Luis Ángel Sarmiento Díaz  
**Estado:** ⚠️ Incompleto (requiere refinamiento)  

Para contribuciones o reportar bugs, contactar al autor principal.

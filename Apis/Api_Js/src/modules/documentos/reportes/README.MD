# 📊 Módulo de Reportes

## 📌 Descripción General

El módulo de **reportes** se encarga de generar diferentes formatos de salida para los análisis de documentos PDF con firmas digitales. Proporciona exportación a tres formatos principales: **CSV (básico y detallado)**, **XLSX** y **PDF**.

**Autor:** Luis Ángel Sarmiento Díaz  
**Fecha de Creación:** 2026/03/03

---

## 📂 Estructura del Módulo

```
reportes/
├── README.md                    # Este archivo
├── reportesCSV/                 # Reportes en formato CSV
│   ├── reporteBasicoCSV.js
│   └── reporteDetalladoCSV.js
├── reportesPDF/                 # Reportes en formato PDF
│   └── reportePDF.js            # (En desarrollo)
└── reportesXLSX/                # Reportes en formato Excel
    └── reporteXLSX.js
```

---

## 🔧 Dependencias

| Librería | Versión | Descripción |
|----------|---------|-------------|
| `json-2-csv` | - | Conversión de objetos JSON a CSV |
| `exceljs` | - | Generación de archivos Excel (.xlsx) |
| `fs` (nativa) | - | Escritura de archivos en el sistema |

---

## 📄 Reportes Disponibles

### 1️⃣ Reporte Básico CSV (`reporteBasicoCSV.js`)

**Propósito:** Genera un CSV con un esquema básico y resumido de los documentos analizados.

#### Función Principal
```javascript
export const reporteBasicoCSV = async ({pathArchivo, listaObjetos}) => {}
```

#### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `pathArchivo` | String | Ruta donde se guardará el archivo CSV (actualmente ignorada, usa `./ejem.csv`) |
| `listaObjetos` | Array | Lista de objetos con información de documentos analizados |

#### Estructura de Salida
Columnas generadas:
- `Archivo` - Nombre del archivo PDF
- `EstadoDelDocumento` - Estado general del documento
- `NumeroDeFirmas` - Total de firmas encontradas
- `NumeroDeFirmasVencidas` - Total de firmas expiradas
- `FirmaVencida[n]` - Sujeto de la firma vencida (dinámica según `maxFirmasVencidas`)
- `FechaDeVencimientoDeFirma[n]` - Fecha de expiración (dinámica)

#### Características
- ✅ BOM UTF-8 para compatibilidad con Excel
- ✅ Delimitador: `;` (punto y coma)
- ✅ Calcula automáticamente el máximo de firmas vencidas en toda la lista
- ✅ Crea columnas dinámicas según la cantidad de firmas vencidas

#### Retorno
- `true` si la generación fue exitosa
- Lanza excepción si hay error

#### Ejemplo de Uso
```javascript
import { reporteBasicoCSV } from './reportesCSV/reporteBasicoCSV.js';

const listaObjetos = [
  {
    "documento.pdf": {
      "NombreDocumento": "documento.pdf",
      "EstadoArchivo": "Válido",
      "NumeroFirmas": 2,
      "NumeroFirmasVencidas": 1,
      "Firmas": [...]
    }
  }
];

await reporteBasicoCSV({ 
  pathArchivo: './reportes/reporte.csv',
  listaObjetos 
});
```

---

### 2️⃣ Reporte Detallado CSV (`reporteDetalladoCSV.js`)

**Propósito:** Genera un CSV con información detallada de cada firma digital encontrada.

#### Función Principal
```javascript
export const reporteDetalladoCSV = async ({pathArchivo, listaObjetos}) => {}
```

#### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `pathArchivo` | String | Ruta donde se guardará el archivo CSV (actualmente ignorada, usa `./ejem.csv`) |
| `listaObjetos` | Array | Lista de objetos con información de documentos analizados |

#### Estructura de Salida
Extrae todas las firmas individuales con sus detalles:
- `NumeroFirma` - Número de firma dentro del documento
- `Version` - Versión del certificado
- `Serial` - Número serial del certificado
- `OidFirma` - Identificador OID de la firma
- `FechaDeCreacion` - Fecha de inicio de validez
- `FechaDeVencimiento` - Fecha de fin de validez
- `EstadoDeCertificado` - Estado actual (Disponible/Vencido)
- `Editor` - Información de la entidad emisora
- `sujeto` - Información del firmante
- `FechaDeUso` - Cuándo se utilizó la firma

#### Características
- ✅ Una fila por cada firma encontrada
- ✅ BOM UTF-8 para compatibilidad con Excel
- ✅ Delimitador: `;`
- ✅ Extrae información granular de certificados

#### Retorno
- `true` si la generación fue exitosa
- Lanza excepción si hay error

#### Ejemplo de Uso
```javascript
import { reporteDetalladoCSV } from './reportesCSV/reporteDetalladoCSV.js';

await reporteDetalladoCSV({ 
  pathArchivo: './reportes/reporte_detallado.csv',
  listaObjetos 
});
```

---

### 3️⃣ Reporte Excel XLSX (`reporteXLSX.js`)

**Propósito:** Genera un archivo Excel con múltiples hojas y formato profesional.

#### Función Principal
```javascript
export const reporteXLSX = async ({listaObjetos}) => {}
```

#### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `listaObjetos` | Array | Lista de objetos con información de documentos analizados |

#### Funcionalidades
- ✅ Crea un Workbook con metadatos profesionales
- ✅ Información del libro:
  - **Creator:** Soporte Acs
  - **Company:** ACS - Aciel Soluciones Integrales S.A.S
  - **Description:** Libro de reportes
  - **Timestamps:** Created, Modified, LastPrinted automáticos
- ✅ Detección automática de columnas
- ✅ Procesamiento de objetos anidados (editor, sujeto, validación)
- ✅ Header y Footer personalizables

#### Funciones Auxiliares

**`obtenerColumnas(listaObjetos)`**
- Extrae todas las claves únicas del conjunto de objetos
- Categoriza columnas en: items originales, editor, sujeto
- Retorno:
  ```javascript
  {
    listaConcatenadaOriginal: Array,      // Todas las claves en un array
    listaConSublistasOriginal: Array[]    // Claves agrupadas por categoría
  }
  ```

**`formatearObjetos(listaIndices, listaObjetos)`**
- Aplana objetos anidados en propiedades individuales
- Agrega sufijos: `Editor`, `Sujeto` a las claves
- Rellena valores faltantes con strings vacíos
- Retorno: Array de objetos formateados

#### Retorno
- `true` si la generación fue exitosa
- Lanza excepción si hay error
- Archivo generado: `./reporte.xlsx`

#### Ejemplo de Uso
```javascript
import { reporteXLSX } from './reportesXLSX/reporteXLSX.js';

const listaObjetos = [
  {
    "archivo": "documento.pdf",
    "numeroFirma": 1,
    "serial": "00",
    "estado": "Disponible",
    "editor": {
      "commonName": "Juan Pérez",
      "countryName": "CO",
      ...
    },
    "sujeto": {
      "commonName": "Juan Pérez",
      "countryName": "CO",
      ...
    }
  }
];

await reporteXLSX({ listaObjetos });
```

---

### 4️⃣ Reporte PDF (`reportePDF.js`)

**Estado:** 🚧 En desarrollo  
**Propósito:** Generar reportes en formato PDF

---

## 🔄 Flujo de Datos

```
Documentos PDF cargados
        ↓
Análisis con analizarDocumentoPDF
        ↓
Lista de Firmas Encontradas
        ↓
    ┌───┴───┬──────────┬─────────┐
    ↓       ↓          ↓         ↓
  CSV     CSV       Excel      PDF
Básico  Detallado   XLSX      (próximo)
```

---

## 📊 Estructura de Entrada Esperada

El módulo de reportes espera recibir objetos con la siguiente estructura:

```javascript
{
  "nombreDocumento.pdf": {
    "NombreDocumento": "nombreDocumento.pdf",
    "EstadoArchivo": "Válido",
    "CausaVencimientoArchivo": "",
    "NumeroFirmas": 2,
    "NumeroFirmasVencidas": 1,
    "Firmas": [
      {
        "Firma_1": {
          "NumeroFirma": 1,
          "Version": 3,
          "Serial": "00c8b48e27...",
          "OidFirma": "1.2.840.113549.1.1.11",
          "FechaDeCreacion": "2026-1-30",
          "FechaDeVencimiento": "2027-1-30",
          "EstadoDeCertificado": "Disponible",
          "Editor": "C=CO|ST=Cundinamarca|...",
          "sujeto": "C=CO|ST=Cundinamarca|...",
          "CausaDeVencimientoDeCertificado": "",
          "FechaDeUso": "2026-03-01"
        }
      }
    ]
  }
}
```

---

## 🐛 Problemas Conocidos y Mejoras Sugeridas

### Reporte Básico CSV
- ⚠️ El parámetro `pathArchivo` es ignorado; siempre guarda en `./ejem.csv`
- ⚠️ La importación de `csv` no se utiliza; puede removerse
- 💡 Variable `listaEstandarizada` no se usa

### Reporte Detallado CSV
- ⚠️ El parámetro `pathArchivo` es ignorado; siempre guarda en `./ejem.csv`
- 💡 Mismo patrón que reporteBasicoCSV

### Reporte XLSX
- 🔄 El código tiene datos de prueba dentro de la exportación
- 💡 Las funciones podrían mejorarse para mejor manejo de `undefined`/`null`
- 💡 Sin manejo de estilos ni formato de celdas avanzado

---

## 💡 Recomendaciones de Mejora

1. **Unificar gestión de rutas**
   ```javascript
   // Implementar validación y uso real del parámetro pathArchivo
   const rutaFinal = pathArchivo || './reportes/default.csv';
   ```

2. **Agregar validaciones**
   - Validar que `listaObjetos` no sea vacía
   - Validar estructura mínima esperada
   - Verificar permisos de escritura antes de guardar

3. **Mejorar manejo de errores**
   - Crear directorio si no existe
   - Mensajes de error más descriptivos
   - Logging de operaciones importantes

4. **Agregar configurabilidad**
   - Permitir elegir delimitador CSV
   - Configurar nombre de hoja en Excel
   - Personalizar estilos y formatos

5. **Optimizar rendimiento**
   - Para listas grandes, usar streams
   - Implementar paginación en Excel

---

## 📞 Notas de Contacto

**Creado por:** Luis Ángel Sarmiento Díaz  
**Modificación Principal:** 2026/03/03  

Para cambios o mejoras, actualizar la fecha de modificación y el autor correspondiente en los encabezados de cada archivo.

---

## 📋 Tabla Comparativa de Reportes

| Característica | CSV Básico | CSV Detallado | Excel | PDF |
|---|---|---|---|---|
| Resumen por documento | ✅ | ❌ | ✅ | - |
| Detalle por firma | ✅ | ✅ | ✅ | - |
| Múltiples hojas | ❌ | ❌ | ✅ | - |
| Formato visual | ❌ | ❌ | ✅ | - |
| Parámetro de ruta | ⚠️ | ⚠️ | ❌ | - |
| Estado | ✅ Activo | ✅ Activo | ⚠️ Incompleto | 🚧 En desarrollo |

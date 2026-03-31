# 📊 Reportes CSV

## 📌 Descripción

Este módulo contiene las funciones para generar resumidos en formato **CSV** a partir del análisis de documentos PDF con firmas digitales.

**Está compuesto por:**
1. **reporteBasicoCSV.js** - Versión resumida con información general
2. **reporteDetalladoCSV.js** - Versión completa con detalles de cada firma

---

## 🔧 Dependencias

```javascript
// json-2-csv: Para conversión de JSON a CSV
import { json2csv } from 'json-2-csv';

// fs: Módulo nativo para escritura de archivos de forma asincrona
import fs from 'fs/promises';
```

---

## 📄 reporteBasicoCSV.js

### Propósito
Generar un CSV resumido con información sobre documentos analizados y sus firmas vencidas.

### Función Principal

```javascript
export const reporteBasicoCSV = async ({pathArchivo, listaObjetos}) => {}
```

### Parámetros Entrada

| Nombre | Tipo | Requerido | Descripción |
|--------|------|-----------|-------------|
| `pathArchivo` | String | ✅ Sí | Ruta del donde se alojara el archivo |
| `listaObjetos` | Array | ✅ Sí | Array de objetos con datos de documentos |

### Proceso Interno

```
1. Formatear objetos con formatearObjetos()
2. Generar CSV con json2csv()
3. Agregar BOM UTF-8 (\uFEFF) para caracteres especiales
4. Guardar en ./ejem.csv con encoding UTF-8
5. Retornar true o lanzar excepción
```

### Columnas Generadas

| Columna | Fuente | Descripción |
|---------|--------|-------------|
| `Archivo` | `clave` | Nombre del documento PDF |
| `EstadoDelDocumento` | `EstadoArchivo` | Estado general del archivo |
| `NumeroDeFirmas` | `NumeroFirmas` | Total de firmas encontradas |
| `NumeroDeFirmasVencidas` | `NumeroFirmasVencidas` | Cantidad de firmas expiradas |
| `FirmaVencida[n]` | `sujeto` (si vencida) | Sujeto del certificado vencido |
| `FechaDeVencimientoDeFirma[n]` | `FechaDeVencimiento` | Fecha de expiración |

### Función Auxiliar: `formatearObjetos(listaObjetos)`

**Descripción:** Transforma la estructura de entrada en un array plano apto para CSV.

**Algoritmo:**
1. Calcula `maxFirmasVencidas` en toda la lista
2. Para cada documento:
   - Extrae información general (archivo, estado, número de firmas)
   - Crea columnas vacías para todas las firmas vencidas posibles
   - Si hay firmas vencidas, completa los datos
3. Retorna array de objetos formateados

**Retorno:**
```javascript
[
  {
    "Archivo": "documento-ejemplo.pdf",
    "EstadoDelDocumento": "Válido",
    "NumeroDeFirmas": 2,
    "NumeroDeFirmasVencidas": 1,
    "FirmaVencida1": "Nombre=MONKEY D. LUFFY|C=CO",
    "FechaDeVencimientoDeFirma1": "2026-01-30",
    "FirmaVencida2": "",
    "FechaDeVencimientoDeFirma2": ""
  }
]
```

### Salida Esperada (./ejem.csv)

```csv
Archivo;EstadoDelDocumento;NumeroDeFirmas;NumeroDeFirmasVencidas;FirmaVencida1;FechaDeVencimientoDeFirma1;FirmaVencida2;FechaDeVencimientoDeFirma2
informe.pdf;Válido;3;1;CN=María García|C=CO|...;2025-12-31;;
```

---

<!-- ## 📄 reporteDetalladoCSV.js

### Propósito
Generar un CSV detallado con información específica de cada firma digital encontrada.

### Función Principal

```javascript
export const reporteDetalladoCSV = async ({pathArchivo, listaObjetos}) => {}
```

### Parámetros Entrada

| Nombre | Tipo | Requerido | Descripción |
|--------|------|-----------|-------------|
| `pathArchivo` | String | ⚠️ No | Ruta del archivo (actualmente no se utiliza) |
| `listaObjetos` | Array | ✅ Sí | Array de objetos con datos de documentos |

### Proceso Interno

```
1. Extrae primera entrada para obtener estructura
2. Itera buscando propiedades que coincidan con /Firma_*/
3. Extrae todos los objetos de firma encontrados
4. Genera CSV con json2csv()
5. Agregar BOM UTF-8
6. Guardar en ./ejem.csv
7. Retornar true o lanzar excepción
```

### Columnas Generadas

Todas las propiedades de los objetos de firma:
- `NumeroFirma`
- `Version`
- `Serial`
- `OidFirma`
- `FechaDeCreacion`
- `FechaDeVencimiento`
- `EstadoDeCertificado`
- `Editor`
- `sujeto`
- `CausaDeVencimientoDeCertificado`
- `FechaDeUso`

### Ejemplo de Uso

```javascript
import { reporteDetalladoCSV } from './reportesCSV/reporteDetalladoCSV.js';

const documentosAnalizados = [
  {
    "documento.pdf": {
      "NombreDocumento": "documento.pdf",
      "NumeroFirmas": 2,
      "NumeroFirmasVencidas": 0,
      "Firmas": [
        {
          "Firma_1": {
            "NumeroFirma": 1,
            "Version": 3,
            "Serial": "00c8b48e...",
            "OidFirma": "1.2.840.113549.1.1.11",
            "FechaDeCreacion": "2026-01-30",
            "FechaDeVencimiento": "2027-01-30",
            "EstadoDeCertificado": "Disponible",
            "Editor": "C=CO|ST=Cundinamarca|...",
            "sujeto": "CN=Firmante|C=CO|...",
            "FechaDeUso": "2026-03-01"
          }
        }
      ]
    }
  }
];

try {
  await reporteDetalladoCSV({
    pathArchivo: './reportes/documento_detallado.csv',
    listaObjetos: documentosAnalizados
  });
  console.log('✅ Reporte detallado generado');
} catch (error) {
  console.error('❌ Error:', error.message);
}
```

### Salida Esperada (./ejem.csv)

```csv
NumeroFirma;Version;Serial;OidFirma;FechaDeCreacion;FechaDeVencimiento;EstadoDeCertificado;Editor;sujeto;CausaDeVencimientoDeCertificado;FechaDeUso
1;3;00c8b48e...;1.2.840.113549.1.1.11;2026-01-30;2027-01-30;Disponible;C=CO|..;CN=Firmante|...;;2026-03-01
2;3;00d9c59f...;1.2.840.113549.1.1.11;2026-01-29;2027-01-29;Disponible;C=CO|..;CN=Otro|...;;2026-03-01
```

---

## ⚙️ Configuración

### Delimitador CSV
Ambas funciones usan `;` (punto y coma) como delimitador:
```javascript
delimiter: { field: ";" }
```

Para cambiar el delimitador, modificar:
```javascript
json2csv(datos, {
  delimiter: {
    field: "," // Para usar coma
  }
})
```

### Codificación
```javascript
encoding: 'utf-8'
```

### BOM UTF-8
Se agrega `\uFEFF` al inicio para compatibilidad con Excel y otros lectores.

---

## ⚠️ Limitaciones Actuales

| Limitación | Impacto | Solución |
|-----------|--------|----------|
| `pathArchivo` ignorado | Siempre guarda en `./ejem.csv` | Usar el parámetro en `fs.writeFileSync()` |
| Ruta fija | No se puede guardar en diferentes directorios | Implementar validación y creación de directorios |
| Sin validación | Errores silenciosos si datos inválidos | Agregar validación de entrada |
| Sobreescribe | Borra reportes anteriores | Agregar timestamp o appending |

---

## 🚀 Mejoras Propuestas

1. **Usar el parámetro pathArchivo**
   ```javascript
   const rutaFinal = pathArchivo || './ejem.csv';
   fs.writeFileSync(rutaFinal, ...);
   ```

2. **Crear directorio si no existe**
   ```javascript
   const dir = path.dirname(rutaFinal);
   if (!fs.existsSync(dir)) {
     fs.mkdirSync(dir, { recursive: true });
   }
   ```

3. **Agregar timestamp a los archivos**
   ```javascript
   const fecha = new Date().toISOString().split('T')[0];
   const archivo = `./reportes/reporte_${fecha}.csv`;
   ```

4. **Validación de entrada**
   ```javascript
   if (!Array.isArray(listaObjetos) || listaObjetos.length === 0) {
     throw new Error('listaObjetos debe ser un array no vacío');
   }
   ```

5. **Añadir opciones configurables**
   ```javascript
   export const reporteBasicoCSV = async ({
     pathArchivo,
     listaObjetos,
     delimitador = ';',
     incluirBOM = true
   }) => { ... }
   ```

---

## 📞 Contacto y Historial

**Creado:** 2026/03/03  
**Autor:** Luis Ángel Sarmiento Díaz  
**Última modificación:** 2026/03/03  

Para contribuciones o reportar bugs, contactar al autor principal. -->

# 🛠️ Utilidades

Contiene funciones auxiliares y utilidades generales para operaciones repetitivas, inicialización de directorios y tareas del sistema.

## 📂 Archivos principales

- `carpetasIniciales.js` – Crea la estructura de carpetas necesarias al iniciar la aplicación.

## 🧩 Funciones

### `carpetasIniciales.js`

Se encarga de crear automáticamente los directorios necesarios para el funcionamiento de la aplicación:

```javascript
export function crearCarpetasIniciales() {
  // Crea directorios si no existen:
  // - /uploads/       → Almacena archivos cargados
  // - /downloads/     → Archivos listos para descargar
  // - /temp/          → Archivos temporales
  // - /logs/          → Logs de la aplicación
  // - /reports/       → Reportes generados
}
```

#### Carpetas creadas

| Carpeta | Propósito |
|---------|-----------|
| `/uploads` | Almacena PDFs y certificados cargados por usuarios |
| `/downloads` | PDFs firmados listos para descargar |
| `/temp` | Archivos temporales durante procesamiento |
| `/logs` | Archivos de log de la aplicación |
| `/reports` | Reportes generados (CSV, XLSX, PDF) |
| `/signatures` | Firmas digitales extraídas temporalmente |

## 🧑‍💻 Uso

Se invoca automáticamente al iniciar la API (`main.js`):

```javascript
import { crearCarpetasIniciales } from './utils/carpetasIniciales.js';

// Al arrancar la aplicación
crearCarpetasIniciales();
console.log('Carpetas iniciales creadas');
```

## 📝 Observaciones

- Las carpetas se crean con permisos 755 (lectura/escritura/ejecución para propietario).
- Si las carpetas ya existen, no se sobreescriben.
- En caso de error, la aplicación debería fallar con un mensaje claro.
- Útil para deployments containerizados donde los volúmenes no persisten.

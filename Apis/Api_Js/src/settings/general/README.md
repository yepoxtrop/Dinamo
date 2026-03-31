# 🎛️ Configuración General

Define las variables y configuraciones generales de la aplicación, incluyendo puerto, entorno, logs y ajustes globales.

## 🔧 Archivos principales

- `variables_generales.js` – Variables de entorno generales de la aplicación.

## 📬 Variables configurables

```env
# Aplicación
API_PORT=3000
NODE_ENV=development
API_VERSION=1.0.0
API_NAME=Firmas Digitales API

# Logs
LOG_LEVEL=info
LOG_FILE=./logs/api.log

# Límites
MAX_FILE_SIZE=50MB
MAX_CONCURRENT_REQUESTS=100
REQUEST_TIMEOUT=30000

# Seguridad
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:3000
```

## 🧩 Configuraciones principales

| Variable | Valores | Propósito |
|----------|---------|-----------|
| `NODE_ENV` | development, production, test | Entorno de ejecución |
| `API_PORT` | 3000-65535 | Puerto donde corre la API |
| `LOG_LEVEL` | debug, info, warn, error | Nivel de detalle de logs |
| `MAX_FILE_SIZE` | Ej: 50MB | Tamaño máximo de archivos |
| `RATE_LIMIT_MAX_REQUESTS` | Número | Límite de solicitudes por ventana |

## 📝 Observaciones

- **Desarrollo vs Producción**: NODE_ENV cambia comportamientos de seguridad y logs.
- **Puerto**: En producción, usar puerto 443/80 con HTTPS/HTTP.
- **Logs**: En desarrollo, logs a consola. En producción, a archivo y syslog.
- **Límites**: Ajustar según capacidad del servidor y uso esperado.

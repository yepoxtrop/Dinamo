# ⚙️ Configuraciones (Settings)

Este directorio centraliza todas las configuraciones y variables de entorno de la API, incluyendo conexión a bases de datos, servicios de correo, autenticación LDAP, tokens JWT y dominios.

## 📂 Estructura

- `/correo/` – Configuración de SMTP y servicios de correo electrónico.
- `/dominio/` – Configuración de conexión LDAP a directorios corporativos.
- `/general/` – Variables generales de la aplicación (puertos, logs, etc.).
- `/others/` – Configuraciones adicionales y utilitarios.
- `/prisma/` – Configuración del cliente Prisma y conexión a base de datos.
- `/tokens/` – Configuración de generación y validación de tokens JWT.

## 🔒 Variables de Entorno

Las configuraciones se cargan desde el archivo `.env`:

```
# Base de Datos
DATABASE_URL=sqlserver://usuario:contraseña@localhost:1433/dinamo_BD

# JWT
JWT_SECRET=tu_secreto_super_seguro_aqui
JWT_EXPIRES_IN=1h

# Correo
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña_de_app

# LDAP
LDAP_URL=ldap://directorio.empresa.com
LDAP_BASE_DN=dc=empresa,dc=com
LDAP_BIND_DN=cn=admin,dc=empresa,dc=com
LDAP_BIND_PASSWORD=contraseña_ldap

# API
API_PORT=3000
NODE_ENV=development
```

## 🧩 Módulos principales

| Módulo | Propósito | Variables |
|--------|-----------|-----------|
| `clientePrisma.js` | Cliente Prisma conectado a BD | DATABASE_URL |
| `variablesToken.js` | Configuración JWT | JWT_SECRET, JWT_EXPIRES_IN |
| `transportadorCorreo.js` | Servicio SMTP | SMTP_* |
| `clienteDominio.js` | Cliente LDAP para autenticación | LDAP_* |
| `variables_generales.js` | Config general de app | API_PORT, NODE_ENV |

## 📝 Observaciones

- **Seguridad**: Nunca commitear `.env` con secretos reales. Usar `.env.example` como plantilla.
- **Desarrollo vs Producción**: Diferentes configuraciones según NODE_ENV.
- **Validación al inicio**: La aplicación valida todas las variables obligatorias al arrancar.
- **Hot reload**: Algunos cambios en settings requieren reiniciar la aplicación.

# 🗄️ Configuración Prisma & Base de Datos

Define la conexión a la base de datos mediante Prisma ORM y configuraciones del cliente SQL Server.

## 🔧 Archivos principales

- `clientePrisma.js` – Cliente Prisma singleton para conexión a base de datos.
- `variablesPrisma.js` – Variables de entorno específicas de Prisma.

## 📬 Variables de Entorno

```env
# Base de Datos - SQL Server
DATABASE_URL=sqlserver://USUARIO:CONTRASEÑA@SERVIDOR:1433/NOMBRE_BD?schema=dbo

# Logs de Prisma
DATABASE_LOGGING=query,error,warn
```

## 🧩 Cliente Prisma

Instancia singleton (una única conexión reutilizada):

```javascript
import clientePrisma from './clientePrisma.js';

// Usar Prisma para consultas
const usuarios = await clientePrisma.usuario.findMany();
```

## 📊 Tablas principales (según schema.prisma)

- `usuario` – Registro de usuarios del sistema
- `sesion` – Sesiones activas y tokens JWT
- `peticion` – Solicitudes de validación/firma
- `documento_validado` – Documentos analizados
- `datos_certificados` – Certificados extraídos de PDFs
- `firma_digital` – Registro de firmas realizadas
- `descarga_archivo` – Historial de descargas

## 🔄 Migraciones

Las migraciones se encuentran en `prisma/migrations/`:

```bash
# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Verificar estado
npx prisma migrate status
```

## 🛡️ Características de seguridad

- **Prepared Statements**: Previene inyección SQL.
- **Validación de tipos**: TypeScript para seguridad en tiempo de compilación.
- **Transacciones**: Para operaciones multi-tabla.
- **Soft deletes**: Marca registros como eliminados sin borrar.

## 📝 Observaciones

- El archivo `schema.prisma` es la fuente de verdad para la BD.
- Los cambios al schema requieren crear una migración.
- Para desarrollo local, considerar usar SQLite para mayor simplicidad.
- En producción, validar credenciales de BD y permisos de usuario.

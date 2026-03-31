# 🗄️ Módulo Base de Datos

Este módulo centraliza el acceso a la base de datos, utilizando Prisma como ORM principal y consultas SQL directas para operaciones específicas. Maneja autenticación, gestión de tokens, firmas y usuarios.

## 📂 Estructura

- `consultasPrisma/` – Operaciones CRUD utilizando Prisma Client (insertar, consultar, eliminar usuarios, tokens, sesiones, firmas).
- `uspSqlServer/` – Llamadas a procedimientos almacenados en SQL Server para operaciones complejas.
- `peticionInicioSesion.js` – Lógica específica para el proceso de login.
- `peticionInsertarFirma.js` – Inserción de registros de firmas digitales.

## 🧩 Funciones principales

- `consultarUsuario()` – Busca usuarios por criterios específicos.
- `insertarUsuario()` – Crea nuevos registros de usuario.
- `insertarToken()` – Almacena tokens de autenticación.
- `eliminarToken()` – Remueve tokens expirados o inválidos.
- `insertarSesion()` – Registra sesiones de usuario activas.
- `insertarFirma()` – Guarda información de firmas realizadas.

## ⚙️ Configuración

Requiere configuración de Prisma en `prisma/schema.prisma` y variables de entorno para la conexión a la base de datos:

```
DATABASE_URL="sqlserver://..."
```

## 📝 Observaciones

- Todas las funciones retornan promesas y deben manejarse con `async/await`.
- Las consultas Prisma se optimizan para evitar N+1 queries.
- Los procedimientos almacenados se usan para lógica compleja que requiere transacciones.</content>
<parameter name="filePath">c:\Users\luis.sarmiento\Desktop\PROYECTOS\FIRMAS DIGITALES\firmas-digitales-back\Apis\Api_Js\src\modules\baseDatos\README.md
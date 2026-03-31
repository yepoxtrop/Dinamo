# API de Firmas Digitales (JavaScript)

Esta API RESTful desarrollada en Node.js se encarga de gestionar las principales funcionalidades del sistema de firmas digitales, incluyendo autenticación de usuarios, manejo de documentos PDF, validación de firmas electrónicas, y generación de reportes.

## 🚀 Características

- **Autenticación JWT**: Sistema seguro de autenticación con tokens JWT
- **Gestión de Documentos**: Carga, firma y validación de documentos PDF
- **Firmas Digitales**: Soporte para firmas individuales y masivas
- **Validación de Certificados**: Verificación de certificados digitales y estados de vigencia
- **Reportes XLSX**: Generación de reportes detallados en Excel sobre firmas y documentos
- **Integración LDAP**: Autenticación contra directorios activos
- **Base de Datos**: Soporte para MySQL y SQL Server mediante Prisma ORM
- **Envío de Correos**: Notificaciones automáticas por email

## 🛠️ Tecnologías Utilizadas

- **Runtime**: Node.js con ES6 Modules
- **Framework**: Express.js
- **Base de Datos**: Prisma ORM (MySQL/SQL Server)
- **Autenticación**: JSON Web Tokens (JWT)
- **Criptografía**: Node-forge, PKI.js
- **Documentos**: PDF-lib, SignPDF
- **Reportes**: ExcelJS
- **Correos**: Nodemailer
- **LDAP**: LDAPTS

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Base de datos MySQL o SQL Server

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd firmas-digitales-back/Apis/Api_Js
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto con las variables necesarias (ver sección Variables de Entorno)

4. **Configurar base de datos**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Iniciar el servidor**
   ```bash
   npm run dev
   ```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado)

## 📖 Uso

### Desarrollo
```bash
npm run dev  # Inicia el servidor con nodemon
```

### Producción
```bash
node main.js
```

## 🔗 Endpoints de la API

La API está disponible bajo el prefijo `/Dinamo_Js`. Todos los endpoints requieren autenticación JWT excepto el login.

### Autenticación
- `POST /Dinamo_Js/login` - Inicio de sesión

### Firmas Digitales
- `POST /Dinamo_Js/Firma_Individual` - Firma individual de documentos
- `POST /Dinamo_Js/Firma_Masiva` - Firma masiva de documentos

### Gestión de Documentos
- `POST /Dinamo_Js/Firmar_Documentos` - Firmar documentos PDF
- `GET /Dinamo_Js/Documentos_Firmados` - Listar documentos firmados
- `GET /Dinamo_Js/Documentos_Firmados/:id/descargar` - Descargar documento firmado
- `DELETE /Dinamo_Js/Documentos_Firmados/:id` - Eliminar documento firmado

### Validación
- `POST /Dinamo_Js/Validar_Documentos` - Validar firmas de documentos

## ⚙️ Variables de Entorno

### Aplicación
- `PUERTO` - Puerto del servidor (por defecto: 3000)

### Correos
- `CORREO_HOST` - Servidor SMTP
- `CORREO_PUERTO` - Puerto SMTP
- `CORREO_SEGURIDAD` - Tipo de seguridad (TLS/SSL)
- `CORREO_USUARIO` - Usuario del correo
- `CORREO_CONTRASENA` - Contraseña del correo

### Base de Datos
- `BASE_DATOS_HOSTNAME` - Host de la base de datos
- `BASE_DATOS_PUERTO` - Puerto de la base de datos
- `BASE_DATOS_USUARIO` - Usuario de la base de datos
- `BASE_DATOS_CONTRASENA` - Contraseña de la base de datos
- `BASE_DATOS_NOMBRE` - Nombre de la base de datos

### JWT
- `TOKENS_LLAVE_PRIVADA` - Clave privada para JWT
- `TOKENS_ALGORITMO` - Algoritmo de encriptación JWT

### Dominio (LDAP)
- `DOMINIO` - URL del dominio
- `DOMINIO_URL` - URL completa del dominio
- `DOMINIO_BASE_DN` - Base DN del dominio
- `DOMINIO_USUARIO_PRUEBA` - Usuario de prueba
- `DOMINIO_CONTRASENA_USUARIO_PRUEBA` - Contraseña del usuario de prueba
- `DOMINIO_FILTRO_BUSQUEDA` - Filtro de búsqueda LDAP

## 📂 Estructura del Proyecto

```
firmas-digitales-back/Apis/Api_Js/
├── src/
│   ├── app.js                 # Configuración principal de Express
│   ├── controllers/           # Controladores de la API
│   │   ├── documentos/        # Gestión de documentos
│   │   ├── firmasDigitales/   # Lógica de firmas
│   │   ├── inicioSesion/      # Autenticación
│   │   └── midleware*.js      # Middlewares
│   ├── modules/               # Módulos reutilizables
│   │   ├── baseDatos/         # Conexión a BD
│   │   ├── correo/            # Envío de emails
│   │   ├── documentos/        # Utilidades de documentos
│   │   ├── firmasDigitales/   # Utilidades de firmas
│   │   └── tokens/            # Gestión de JWT
│   ├── routes/                # Definición de rutas
│   │   ├── documentos/        # Rutas de documentos
│   │   ├── firmasDigitales/   # Rutas de firmas
│   │   └── inicioSesion/      # Rutas de auth
│   └── settings/              # Configuraciones
│       ├── correo/            # Config email
│       ├── dominio/           # Config LDAP
│       ├── general/           # Variables generales
│       ├── prisma/            # Config BD
│       └── tokens/            # Config JWT
├── prisma/                    # Configuración de Prisma
│   ├── schema.prisma          # Esquema de BD
│   └── migrations/            # Migraciones
├── uploads/                   # Archivos subidos
├── temp/                      # Archivos temporales
├── utils/                     # Utilidades
├── main.js                    # Punto de entrada
├── package.json               # Dependencias
└── README.md                  # Este archivo
```

## 📋 Pendientes

- [ ] Implementar sistema de cookies
- [ ] Desarrollar middlewares adicionales
- [ ] Integrar modelos con Prisma
- [ ] Optimizar validación de firmas de documentos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👤 Autor

**Luis Angel Sarmiento Diaz**
- Email: sarmientodiazluisangel@gmail.com
- LinkedIn: [Tu perfil]

---

*Desarrollado con ❤️ para ACS - Aciel Soluciones Integrales S.A.S*
- `DOMINIO_ATRIBUTOS`
- `DOMINIO_PUERTO`
- `DOMINIO_GRUPOS_EXCLUIDOS`

---

## 🚀 Cómo iniciar
1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
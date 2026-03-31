# ✒️ Dinamo — Plataforma de Firmas Digitales

**Dinamo** es una plataforma segura e intuitiva que permite a empresas y usuarios gestionar, analizar y validar firmas digitales en documentos PDF desde cualquier lugar. Su propósito es agilizar procesos, reducir costos operativos y garantizar la validez legal de las transacciones digitales.

---

## 🔑 Características Principales

| Característica | Descripción |
|---|---|
| 🔐 **Autenticación segura** | Certificados digitales y protocolos de cifrado para verificar la identidad del firmante |
| 🖥️ **Multiplataforma** | Acceso desde navegadores web en computadoras y tablets |
| 📄 **Gestión de documentos** | Carga, analiza y valida el contenido de PDFs y el estado de sus firmas |
| ⚖️ **Validez legal** | Cumplimiento con normativas internacionales (eIDAS, ESIGN) y leyes locales de firma electrónica |
| 🗂️ **Auditoría completa** | Registro detallado de cada acción: quién firmó, cuándo y desde dónde |

---

## 🎯 Beneficios

- ⚡ **Rapidez** — Elimina la necesidad de imprimir, escanear o enviar documentos físicos.
- 💰 **Ahorro** — Reduce costos de papel, mensajería y almacenamiento físico.
- 🛡️ **Seguridad** — Protege la integridad y confidencialidad de la información.
- 🌍 **Accesibilidad** — Firma documentos en cualquier momento y lugar.
- 🌱 **Sostenibilidad** — Contribuye a la reducción del uso de papel.

---

## 🤖 Documentación Técnica

Esta sección describe el funcionamiento interno del proyecto para desarrolladores y colaboradores.

### 💼 Estructura del Proyecto

El proyecto se organiza en tres carpetas principales:
```
dinamo/
├── firmas-digitales-back/       # Lógica del servidor y servicios
│   ├── Apis/                    # Endpoints y controladores de la API REST
│   │   ├── Api_Js/              # 
│   │   └── java-signer/         # 
│   ├── Aplicaciones_Extra/      # Módulos y utilidades auxiliares
│   │   └── Dinamo_Tokens/       # Archivo .exe para generar tokens de prueba
│   └── Base_Datos/              # Modelos, migraciones y configuración de BD
│       ├── MYSQL/               # Modelo de la base de datos en mysql
│       └── SQL SERVER/          # Modelo de la base de datos en sql server
│
└── firmas-digitales-front/      # Interfaz de usuario (cliente)
```

### ⚙️ Requisitos Previos

> *(Agrega aquí la versión de Node.js, dependencias principales, variables de entorno necesarias, etc.)*

### 🚀 Instalación y Uso
```bash
# Clonar el repositorio
git clone https://github.com/DesarrolloAciel/Firmas-Digitales-Back.git

# Instalar dependencias
cd Apis/Api_Js
npm install
```

```env
#Configurar las variables de entorno en Apis/Api_Js/.env

#Variable Para Arrancar La Aplicación
PUERTO=
 
#Variables Para Correos(Si usa una libreria como nodemailer)
CORREO_HOST="" 
CORREO_PUERTO=
CORREO_SEGURIDAD=
CORREO_USUARIO=""
CORREO_CONTRASENA=""

#Llaves Para El JWT
TOKENS_LLAVE_PRIVADA=""
TOKENS_ALGORITMO=""
 
#Variables Del Dominio
DOMINIO=""
DOMINIO_URL=""
DOMINIO_BASE_DN=""
DOMINIO_USUARIO_PRUEBA=""
DOMINIO_CONTRASENA_USUARIO_PRUEBA=""
DOMINIO_FILTRO_BUSQUEDA=""
DOMINIO_ATRIBUTOS=""
DOMINIO_PUERTO=389
DOMINIO_GRUPOS_EXCLUIDOS=""
 
#Variables para Base de datos
DATABASE_URL="" #Exclusiva en caso de que use prisma
DB_USER=""
DB_PASSWORD=""
DB_NAME=""
DB_HOST=""
```

```bash
# Arrancar la aplicacion
npm run dev
```

> *Pasos Siguientes*

## 📘 Documentación interna

Cada carpeta bajo `Apis/Api_Js/src` contiene su propio `README.md` con información
específica sobre los módulos, controladores y utilidades. Consulta esos archivos para
obtener detalles técnicos, ejemplos de uso y flujos de datos dentro del servidor.

- `controllers/` – lista de controladores y middlewares.
- `modules/` – descripción de cada módulo de negocio.
- `modules/firmasDigitales`, `analizarDocumentosPDF`, `dominio`, `documentos/reportes` etc.

Esta documentación complementa la visión general ofrecida en este README.


---

## 📄 Licencia

*Neo*

---

<p align="center">Desarrollado con ❤️ por el equipo de ACS</p>
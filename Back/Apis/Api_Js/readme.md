# API de JS

Esta API basada en JavaScript se encarga de gestionar las principales tareas del sistema, incluyendo autenticación, manejo de base de datos y comunicación con servicios externos.

## 📂 Estructura de carpetas

- **prismas:** Configuración y cliente de Prisma.
- **src:**
  - **controllers:** Lógica de negocio y controladores de endpoints.
  - **modules:** Módulos reutilizables y utilidades.
  - **routes:** Definición de rutas y endpoints de la API.
  - **settings:** Configuración de base de datos, variables y adaptadores.

## 📝 Pendientes

- [ ] Crear cookies  
- [ ] Implementar middleware  
- [ ] Usar modelos con Prisma  
- [ ] Firmas documentos y validarlos

## ⚙️ Variables de entorno

### Aplicación
- `PUERTO`

### Correos
- `CORREO_HOST`
- `CORREO_PUERTO`
- `CORREO_SEGURIDAD`
- `CORREO_USUARIO`
- `CORREO_CONTRASENA`

### Base de datos
- `BASE_DATOS_HOSTNAME`
- `BASE_DATOS_PUERTO`
- `BASE_DATOS_USUARIO`
- `BASE_DATOS_CONTRASENA`
- `BASE_DATOS_NOMBRE`

### JWT
- `TOKENS_LLAVE_PRIVADA`
- `TOKENS_ALGORITMO`

### Dominio
- `DOMINIO`
- `DOMINIO_URL`
- `DOMINIO_BASE_DN`
- `DOMINIO_USUARIO_PRUEBA`
- `DOMINIO_CONTRASENA_USUARIO_PRUEBA`
- `DOMINIO_FILTRO_BUSQUEDA`
- `DOMINIO_ATRIBUTOS`
- `DOMINIO_PUERTO`
- `DOMINIO_GRUPOS_EXCLUIDOS`

---

## 🚀 Cómo iniciar
1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
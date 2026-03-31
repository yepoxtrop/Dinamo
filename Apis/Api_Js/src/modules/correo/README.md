# 📧 Módulo Correo

Este módulo gestiona el envío de notificaciones por email utilizando `nodemailer`. Proporciona plantillas y configuraciones para diferentes tipos de correos relacionados con el proceso de firmas digitales.

## 📂 Estructura

- `correoSupervisor.js` – Envío de notificaciones a supervisores sobre actividades del sistema.
- `correoUsuarioExito.js` – Plantillas y envío de correos de confirmación exitosa de operaciones.
- `correoUsuarioFallo.js` – Notificaciones de error o fallos en procesos de firma.
- `modificarCorreo.js` – Utilidades para modificar o personalizar el contenido de correos.

## 🧩 Funciones principales

- `enviarCorreoSupervisor()` – Notifica a supervisores sobre eventos importantes.
- `enviarCorreoExito()` – Confirma operaciones exitosas a los usuarios.
- `enviarCorreoFallo()` – Informa sobre errores o rechazos de firmas.
- `modificarPlantillaCorreo()` – Personaliza plantillas de email según necesidades.

## ⚙️ Configuración

Requiere configuración SMTP en el archivo de settings de correo:

```javascript
// settings/correo/config.js
{
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}
```

## 📝 Observaciones

- Utiliza plantillas HTML simples para mantener consistencia visual.
- Todas las funciones son asíncronas y retornan el resultado del envío.
- Incluye manejo básico de errores de conexión SMTP.</content>
<parameter name="filePath">c:\Users\luis.sarmiento\Desktop\PROYECTOS\FIRMAS DIGITALES\firmas-digitales-back\Apis\Api_Js\src\modules\correo\README.md
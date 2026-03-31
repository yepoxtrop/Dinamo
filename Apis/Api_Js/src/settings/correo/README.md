# 📧 Configuración de Correo

Define la configuración SMTP para envío de correos electrónicos, incluyendo plantillas y servicios relacionados.

## 🔧 Archivos principales

- `transportadorCorreo.js` – Configura el transporte SMTP usando Nodemailer.
- `variables_correo.js` – Variables de entorno específicas del correo.
- `objetoCorreos.js` – Plantillas y contenido de correos predefinidas.

## 📬 Variables de Entorno

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña_de_app
SMTP_FROM=noreply@empresa.com
```

## 🧩 Servicio de Correo

Utiliza **Nodemailer** para envío de correos:

```javascript
import { transportadorCorreo } from './transportadorCorreo.js';

// Enviar correo
await transportadorCorreo.sendMail({
  from: 'noreply@empresa.com',
  to: 'usuario@empresa.com',
  subject: 'Asunto',
  html: '<p>Contenido HTML</p>'
});
```

## 📮 Plantillas dispone

- **Bienvenida**: Cuando un usuario se registra.
- **Contraseña olvidada**: Con enlace de reset.
- **Confirmación de operación**: Firma completada, documento listo.
- **Alertas**: Certificados por vencer, errores críticos.

## 📝 Observaciones

- El servidor SMTP requiere credenciales válidas en `.env`.
- Para Gmail, usar contraseña de aplicación, no la contraseña de cuenta principal.
- Las plantillas pueden usar variables internas que se reemplazan dinámicamente.

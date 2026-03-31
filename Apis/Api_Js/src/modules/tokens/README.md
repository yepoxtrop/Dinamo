# 🔐 Módulo Tokens

Este módulo gestiona la creación, decodificación y validación de tokens JWT (JSON Web Tokens) utilizados para autenticar y autorizar usuarios en el sistema de firmas digitales.

## 📂 Estructura

- `crearToken.js` – Genera nuevos tokens JWT con payload personalizado.
- `decodificarToken.js` – Extrae y verifica el contenido de un token sin validarlo completamente.
- `validarToken.js` – Verifica la autenticidad e integridad de un token JWT.

## 🧩 Funciones principales

- `crearToken(payload, expiracion)` – Crea un token firmado con la información del usuario.
- `decodificarToken(token)` – Decodifica un token para acceder a su payload sin verificar firma.
- `validarToken(token)` – Verifica que el token sea válido, no expirado y correctamente firmado.

## ⚙️ Configuración

Utiliza una clave secreta definida en las variables de entorno:

```javascript
// settings/tokens/config.js
{
  secretKey: process.env.JWT_SECRET_KEY,
  algoritmo: 'HS256',
  expiracionDefault: '24h'
}
```

## 📝 Observaciones

- Los tokens incluyen información del usuario y permisos para acceso a rutas protegidas.
- La validación se realiza en middlewares antes de procesar solicitudes.
- Los tokens expirados se eliminan automáticamente de la base de datos.</content>
<parameter name="filePath">c:\Users\luis.sarmiento\Desktop\PROYECTOS\FIRMAS DIGITALES\firmas-digitales-back\Apis\Api_Js\src\modules\tokens\README.md
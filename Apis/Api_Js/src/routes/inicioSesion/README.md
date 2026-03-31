# 🔑 Rutas de Inicio Sesión

Define los endpoints para autenticación de usuarios, emisión de tokens JWT y validación de sesiones.

## 🔗 Endpoints

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---------------|
| POST | `/login` | Autentica usuario contra LDAP e emite JWT | ❌ No requerida |
| POST | `/logout` | Invalida el token actual | ✅ Requerida |
| GET | `/verify` | Verifica validez del token JWT | ✅ Requerida |
| POST | `/refresh` | Renmueva un token expirado por uno nuevo | ✅ Requerida |

## 📋 Controladores

Cada ruta es atendida por un controlador en `src/controllers/inicioSesion/`:

- `inicioSesion.controller.js` – Autentica usuarios contra LDAP y emite JWT.
- `cierreSesion.controller.js` – Invalida tokens y registra logout.
- `validarSesion.controller.js` – Verifica vigencia y validez del token.

## 🔐 Flujo de Autenticación

1. **Login**: Usuario envía credenciales a `/login`.
2. **LDAP**: Sistema valida contra servidor LDAP configurado.
3. **JWT**: Si autenticación es exitosa, se emite token JWT válido por 1 hora.
4. **Token**: Cliente almacena el token y lo incluye en cabecera `Authorization: Bearer <token>`.
5. **Validación**: Middleware verifica token en cada solicitud posterior.

## 📝 Estructura de respuestas

### Login exitoso (200)
```json
{
  "status": "success",
  "message": "Sesión iniciada correctamente",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "usuario": "juan.perez",
    "nombre": "Juan Pérez",
    "expiracion": "2026-03-26T10:30:00Z"
  }
}
```

### Login fallido (401)
```json
{
  "status": "error",
  "message": "Credenciales inválidas"
}
```

## ⌚ Tiempos de expiración

- **Access Token**: 1 hora
- **Refresh Token**: 7 días (si está implementado)
- **Sesión inactiva**: 30 minutos (configurable en .env)

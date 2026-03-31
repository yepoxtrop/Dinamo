# 🔑 Configuración de Tokens JWT

Define la configuración y variables de entorno para la generación, validación y manejo de tokens JSON Web Tokens (JWT).

## 🔧 Archivos principales

- `variablesToken.js` – Variables de entorno específicas de JWT.

## 📬 Variables de Entorno

```env
# JWT
JWT_SECRET=tu_secreto_super_seguro_de_minimo_32_caracteres
JWT_EXPIRES_IN=1h
JWT_ALGORITHM=HS256

# Refresh Token (opcional)
JWT_REFRESH_SECRET=otro_secreto_super_seguro_minimo_32_caracteres
JWT_REFRESH_EXPIRES_IN=7d
```

## 🧩 Estructura de Token

Un token JWT válido tiene la estructura: `header.payload.signature`

### Header
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload
```json
{
  "sub": "usuario_id",
  "username": "juan.perez",
  "nombre": "Juan Pérez",
  "email": "juan.perez@empresa.com",
  "iat": 1679123456,
  "exp": 1679127056
}
```

### Signature
```
HMACSHA256(
  base64(header) + "." + base64(payload),
  JWT_SECRET
)
```

## 🔐 Proceso de autenticación

1. **Login**: Usuario envía credenciales.
2. **Validación LDAP**: Se verifican contra directorio corporativo.
3. **Generación JWT**: Se crea token válido por 1 hora.
4. **Token en cabecera**: Cliente enía `Authorization: Bearer <token>`.
5. **Middleware valida**: Cada solicitud verifica firma y tiempo de expiración.

## ⏰ Tiempos

| Token | Duración | Uso |
|-------|----------|-----|
| Access Token | 1 hora | Acceso a endpoints protegidos |
| Refresh Token | 7 días | Renovar Access Token sin re-login |

## 🛡️ Mejores prácticas

- **Secreto fuerte**: Mínimo 32 caracteres, caracteres especiales.
- **HTTPS siempre**: Los tokens viajan en la cabecera y deben ser cifrados en tránsito.
- **Almacenamiento seguro**: En cliente, usar httpOnly cookies, no localStorage.
- **No confiar en cliente**: La expiración debe validarse también en servidor.

## 📝 Observaciones

- Cambiar JWT_SECRET en producción con valor único por instancia.
- Usar algoritmo más fuerte (RS256) para máxima seguridad si es posible.
- Implementar logouts mediante blacklist de tokens si es necesario.

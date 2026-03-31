# 🔐 Configuración de Dominio (LDAP)

Define la conexión al directorio LDAP corporativo para autenticación de usuarios contra Active Directory o directorio similar.

## 🔧 Archivos principales

- `clienteDominio.js` – Cliente LDAP para conexiones al servidor de directorio.
- `variablesDominio.js` – Variables de entorno específicas de LDAP.

## 📬 Variables de Entorno

```env
LDAP_URL=ldap://directorio.empresa.com:389
LDAP_BASE_DN=dc=empresa,dc=com
LDAP_BIND_DN=cn=admin,dc=empresa,dc=com
LDAP_BIND_PASSWORD=contraseña_ldap
LDAP_SEARCH_FILTER=(sAMAccountName={{username}})
```

## 🧩 Cliente LDAP

Utiliza **ldapts** para conexiones seguras al servidor LDAP:

```javascript
import { clienteDominio } from './clienteDominio.js';

// Autenticar usuario
const usuario = await clienteDominio.authenticate('juan.perez', 'contraseña');
```

## 🔍 Proceso de autenticación

1. **Conexión**: Se conecta al servidor LDAP usando BIND_DN y BIND_PASSWORD.
2. **Búsqueda**: Busca el usuario usando el SEARCH_FILTER.
3. **Validación**: Intenta bind con las credenciales del usuario.
4. **Resultado**: Retorna datos del usuario si es exitoso, error si falla.

## 📊 Atributos de usuario extraídos

- `dn` – Distinguished Name (identificador único)
- `sAMAccountName` – Nombre de usuario de red
- `cn` – Nombre común
- `mail` – Correo electrónico
- `memberOf` – Grupos a los que pertenece
- `description` – Descripción o cargo

## 📝 Observaciones

- LDAP requiere configuración de firewall/red para alcanzar el servidor.
- Las credenciales BIND_DN deben tener permisos de lectura en el directorio.
- Para producción, usar TLS/SSL (`ldaps://`) en lugar de conexión sin cifrar.
- El servicio es crucial para autenticación corporativa.

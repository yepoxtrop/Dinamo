# 🛜 Módulo Dominio (LDAP)

Este módulo gestiona la interacción con un servidor LDAP o Active Directory. Se utiliza
principalmente para autenticar usuarios y obtener información de directorio (grupos, atributos,
roles, etc.).

## Funciones habituales

- `autenticarUsuario({usuario, password})` — Valida credenciales contra el dominio.
- `buscarUsuario({...filtros})` — Realiza consultas LDAP para obtener datos de perfiles.
- `validarMiembroDeGrupo({usuario, grupo})` — Comprueba pertenencia a un grupo específico.

## Configuración
Las variables relativas al dominio se definen en el `.env` de la API:

```
DOMINIO_URL=
DOMINIO_BASE_DN=
DOMINIO_USUARIO_PRUEBA=
DOMINIO_CONTRASENA_USUARIO_PRUEBA=
DOMINIO_FILTRO_BUSQUEDA=
DOMINIO_ATRIBUTOS=
DOMINIO_PUERTO=389
DOMINIO_GRUPOS_EXCLUIDOS=
```

> El módulo abstrae la conexión y el manejo de sesiones, cerrando la comunicación al terminar cada
> operación.

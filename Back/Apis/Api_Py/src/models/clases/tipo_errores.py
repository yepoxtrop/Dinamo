from enum import Enum;

class Tipo_Errores(str, Enum):
    #Errores generales
    ERROR = "Fallo en la aplicacion"
    
    #Errores en el dominio
    ERROR_LDAP = "No se pudieron crear los objetos para la conexion con el dominio"
    ERROR_BIND = "No fue posible el logueo con las credenciales del usuario"
    ERROR_CREDENCIALES_INVALIDAS = "Las credenciales registradas son invalidas"
    ERROR_UNIDAD_ORDGANIZATIVA_INVALIDA = "La unidad organizativa a la que pertenece el usuario esta bloqueada"
    ERROR_UNIDAD_ORDGANIZATIVA_DESCONOCIDA = "No se reconece la unidad organizativa indicada por el usuario"
    
    #Errores en el manejo de directorios y ficheros
    ERROR_PERMISOS_INSUFICIENTES = "Permisos insuficientes"
    ERROR_MODULO_OS = "Fallos en el modulo os"
    ERROR_ARCHIVO_INEXISTENTE = "Archivos inexistentes"
    ERROR_CONSULTA_VACIA = "Conulta sin resultados"
    
    #Errores en los tokens
    ERROR_TOKEN_EXPIRADO = "El token ha expirado"
    ERROR_TOKEN_INVALIDO = "El token es invalido"
    ERROR_TOKEN_LLAVE_INVALIDA = "La llave segura no funciona"
    ERROR_TOKEN_ALGORITMO_INVALIDO = "El algoritmo de tokens no funciona"
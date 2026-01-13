#Librerias Instaladas
from fastapi import status; 

#Modelo Creado
from src.models.clases.tipo_errores import Tipo_Errores;

alertas_dominio = {
    Tipo_Errores.ERROR:status.HTTP_500_INTERNAL_SERVER_ERROR,
    Tipo_Errores.ERROR_LDAP:status.HTTP_500_INTERNAL_SERVER_ERROR,
    Tipo_Errores.ERROR_BIND:status.HTTP_401_UNAUTHORIZED,
    Tipo_Errores.ERROR_CREDENCIALES_INVALIDAS:status.HTTP_401_UNAUTHORIZED,
    Tipo_Errores.ERROR_UNIDAD_ORDGANIZATIVA_INVALIDA:status.HTTP_401_UNAUTHORIZED,
    Tipo_Errores.ERROR_UNIDAD_ORDGANIZATIVA_DESCONOCIDA:status.HTTP_500_INTERNAL_SERVER_ERROR,
}

alertas_directorios_ficheros = {
    Tipo_Errores.ERROR:status.HTTP_500_INTERNAL_SERVER_ERROR,
    Tipo_Errores.ERROR_MODULO_OS:status.HTTP_500_INTERNAL_SERVER_ERROR,
    Tipo_Errores.ERROR_PERMISOS_INSUFICIENTES:status.HTTP_500_INTERNAL_SERVER_ERROR,
    Tipo_Errores.ERROR_ARCHIVO_INEXISTENTE:status.HTTP_500_INTERNAL_SERVER_ERROR,   
}


alertas_consultas_sql = {
    
}

alertas_tokens = {
    Tipo_Errores.ERROR:status.HTTP_500_INTERNAL_SERVER_ERROR,
    Tipo_Errores.ERROR_TOKEN_INVALIDO:status.HTTP_401_UNAUTHORIZED,
    Tipo_Errores.ERROR_TOKEN_LLAVE_INVALIDA:status.HTTP_401_UNAUTHORIZED,
    Tipo_Errores.ERROR_TOKEN_ALGORITMO_INVALIDO:status.HTTP_401_UNAUTHORIZED,
    Tipo_Errores.ERROR_TOKEN_EXPIRADO:status.HTTP_401_UNAUTHORIZED,
}
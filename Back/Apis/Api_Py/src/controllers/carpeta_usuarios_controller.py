#Librerias Instaladas
from fastapi import HTTPException

#Clases creadas
from src.modules.archivos_firmas.archivos_firmas import Archivos_Firmas;
from src.modules.logs.logs import Logs;

#Modelos Creados 
from src.models.controladores.request.usuario_modelo_request import Usuario_Modelo_Request;
from src.models.controladores.request.logs_modelo_request import Logs_Modelo_Request;
from src.models.controladores.response.modelo_general_response import Modelo_General_Response;
from src.models.clases.modelo_errores import Modelo_Errores;
from src.models.clases.modelo_respuesta import Modelo_Respuesta;
from src.models.clases.alertas_http import alertas_directorios_ficheros; 

def carpeta_usuarios_controller(datos:Usuario_Modelo_Request) -> Modelo_General_Response:
    objeto = Archivos_Firmas(datos); 
    consulta =  objeto.consultar_carpeta_firmas_usuario(); 
    
    if isinstance(consulta, Modelo_Errores):
        codigo = alertas_directorios_ficheros.get(consulta.Tipo_error);
        raise HTTPException(
            status_code=codigo,
            detail=consulta.Descripcion_error
        )
    
    return Modelo_General_Response(
        Mensaje="Peticion realizada satisfactoriamente",
        Estado=True,
        Resultado=consulta.Resultado
    )
#Clases creadas
from src.modules.archivos_firmas.archivos_firmas import Archivos_Firmas;

#Librerias Instaladas
from typing import Union;
from fastapi import HTTPException;

#Modelos Creados
from src.models.clases.alertas_http import alertas_directorios_ficheros; 
from src.models.clases.modelo_errores import Modelo_Errores;
from src.models.clases.modelo_respuesta import Modelo_Respuesta; 
from src.models.controladores.request.usuario_modelo_request import Usuario_Modelo_Request;
from src.models.controladores.response.modelo_general_response import Modelo_General_Response;

def controller_archivos_usuario(datos:Usuario_Modelo_Request) -> Union[Modelo_Errores, Modelo_Respuesta]: 
    objeto = Archivos_Firmas(datos); 
    consulta = objeto.consulta_general(); 
    
    if isinstance(consulta, Modelo_Errores):
        codigo = alertas_directorios_ficheros.get(consulta.Tipo_error)
        raise HTTPException(
            status_code=codigo,
            detail=consulta.Descripcion_error
        )
        
    return Modelo_General_Response(
        Mensaje="Peticion realizada satisfactoriamente",
        Estado=True,
        Resultado=consulta.Resultado
    ); 
#Clases Creadas
from src.modules.dominio.dominio import Dominio; 

#Librerias Instaladas
from fastapi import HTTPException, status; 
from typing import Union;

#Modelos Creados
from src.models.controladores.request.dominio_modelo_request import Dominio_Modelo_Request
from src.models.clases.alertas_http import alertas_dominio;
from src.models.clases.modelo_errores import Modelo_Errores;
from src.models.clases.modelo_respuesta import Modelo_Respuesta; 

def controller_dominio(datos:Dominio_Modelo_Request) -> Union[Modelo_Errores, Modelo_Respuesta]:
    objeto = Dominio(datos); 
    consulta = objeto.consultar_dominio(); 
    
    if isinstance(consulta, Modelo_Errores):
        codigo = alertas_dominio.get(consulta.Tipo_error)
        raise HTTPException(
            status_code=codigo,
            detail=consulta.Descripcion_error
        )
    return consulta.Resultado; 
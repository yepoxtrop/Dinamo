#Librerias Instaladas
from fastapi import APIRouter, Depends;
from typing import Annotated; 

#Controladores Creados
#--Ficheros
from src.controllers.archivos_usuario_controller import controller_archivos_usuario;
#--Tokens
from src.controllers.verficar_tokens_controller import controller_verificar_tokens;

#Modelos Creados
from src.models.controladores.response.modelo_general_response import Modelo_General_Response; 
from src.models.controladores.request.usuario_modelo_request import Usuario_Modelo_Request;

router_ficheros = APIRouter(
    prefix="/Dinamo_Py",
    tags=["Ficheros"]
);

@router_ficheros.post("/Ficheros_Usuario")
def Ficheros_Usuario(token:Annotated[str, Depends(controller_verificar_tokens)], datos:Usuario_Modelo_Request):
    consulta = controller_archivos_usuario(datos); 
    return consulta; 
    
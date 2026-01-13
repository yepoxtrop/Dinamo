#Librerias Instaladas
from fastapi import APIRouter, HTTPException, Header, Depends, status;
from typing import Annotated

#Controladores Creados
#--Directorios
from src.controllers.carpeta_general_controller import carpeta_general_controller;
from src.controllers.carpeta_usuarios_controller import carpeta_usuarios_controller;
#--Tokens
from src.controllers.verficar_tokens_controller import controller_verificar_tokens;

#Modelos Creados
from src.models.controladores.response.modelo_general_response import Modelo_General_Response; 
from src.models.controladores.request.usuario_modelo_request import Usuario_Modelo_Request;

router_directorios = APIRouter(
    prefix="/Dinamo_Py",
    tags=["Directorios"]
);

@router_directorios.get("/Carpeta_General")
def Carpeta_General(token:Annotated[str, Depends(controller_verificar_tokens)]) -> Modelo_General_Response:
    consulta = carpeta_general_controller(); 
    return consulta; 
    
@router_directorios.post("/Carpeta_Usuario")
def Carpeta_Usuario(token:Annotated[str, Depends(controller_verificar_tokens)], datos:Usuario_Modelo_Request) -> Modelo_General_Response:
    consulta = carpeta_usuarios_controller(datos)
    return consulta
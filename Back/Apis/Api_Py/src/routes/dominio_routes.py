#Librerias Instaladas
from fastapi import APIRouter, HTTPException, status, Depends;
from typing import Annotated;

#Controladores Creados
from src.controllers.dominio_controller import controller_dominio;
from src.controllers.verficar_tokens_controller import controller_verificar_tokens;

#Modelos Creados
from src.models.controladores.request.dominio_modelo_request import Dominio_Modelo_Request;

router_dominio = APIRouter(
    prefix="/Dinamo_Py",
    tags=["Dominio"]
);

@router_dominio.post("/Validacion_Dominio")
def Validacion_Dominio(datos:Dominio_Modelo_Request):
    consulta = controller_dominio(datos); 
    return consulta;
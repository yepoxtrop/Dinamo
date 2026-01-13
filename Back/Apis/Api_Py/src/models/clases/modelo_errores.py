#Modulos Nativos
from typing import Optional, Union;
from pydantic import BaseModel;
from fastapi import status;

#Modelos Creados
from src.models.clases.tipo_errores import Tipo_Errores

class Modelo_Errores(BaseModel):
    Mensaje:str
    Estado_boleano:bool = False
    Tipo_error:Tipo_Errores
    Descripcion_error:Optional[str]=None
#Modulos Nativos
from typing import Optional, Union;
from pydantic import BaseModel;

class Modelo_Respuesta(BaseModel):
    Mensaje:str
    Estado_boleano:bool = True
    Resultado:Optional[Union[str, dict, list]]=None
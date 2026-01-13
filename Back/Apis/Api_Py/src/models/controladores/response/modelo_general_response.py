#Modulos Nativos
from pydantic import BaseModel;
from typing import Optional, Union;

class Modelo_General_Response(BaseModel):
    Mensaje:str
    Estado:bool
    Resultado:Optional[Union[str, dict, list]]=None
    Error:Optional[str]=None
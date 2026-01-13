#Modulos Nativos
from pydantic import BaseModel; 
from typing import Optional

class Logs_Modelo_Request(BaseModel):
    nombre:str
    mensajes:list
    carpeta_principal:str
    carpeta_secundaria:Optional[str]=None
#Modulos Nativos
from pydantic import BaseModel; 

class Usuario_Modelo_Request(BaseModel):
    nombre_usuario:str
    nombre:str
    cedula:int
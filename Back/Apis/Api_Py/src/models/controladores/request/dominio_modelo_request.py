#Modulos Nativos
from pydantic import BaseModel; 

class Dominio_Modelo_Request(BaseModel):
    usuario:str
    contrasena:str
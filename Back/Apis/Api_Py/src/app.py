#Librerias Instaladas
from fastapi import FastAPI; 

#Router Creado
from src.routes import *;

app = FastAPI(); 
app.include_router(router_directorios); 
app.include_router(router_ficheros); 
app.include_router(router_dominio); 

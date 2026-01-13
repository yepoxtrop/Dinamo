#Librerias Instaladas
from dotenv import load_dotenv; 

#Modulos Nativos
import os;

load_dotenv(); 

DOMINIO = os.environ.get("DOMINIO"); 
DOMINIO_ATRIBUTOS = os.environ.get("DOMINIO_ATRIBUTOS");
DOMINIO_URL = os.environ.get("DOMINIO_URL");
DOMINIO_BASE_DN = os.environ.get("DOMINIO_BASE_DN");
DOMINIO_USUARIO_PRUEBA = os.environ.get("DOMINIO_USUARIO_PRUEBA");
DOMINIO_USUARIO_PRUEBA_CONTRASENA = os.environ.get("DOMINIO_CONTRASENA_USUARIO_PRUEBA");
DOMINIO_PUERTO = os.environ.get("DOMINIO_PUERTO");
DOMINIO_FILTRO_BUSQUEDA = os.environ.get("DOMINIO_FILTRO_BUSQUEDA");
DOMINIO_GRUPOS_EXCLUIDOS = os.environ.get("DOMINIO_GRUPOS_EXCLUIDOS"); 
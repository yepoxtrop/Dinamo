#Librerias Instaladas
from dotenv import load_dotenv;

#Modulos Nativos
import os;

load_dotenv();

BASE_DATOS_HOSTNAME = os.getenv("BASE_DATOS_HOSTNAME");
BASE_DATOS_PUERTO = os.getenv("BASE_DATOS_PUERTO");
BASE_DATOS_USUARIO = os.getenv("BASE_DATOS_USUARIO");
BASE_DATOS_CONTRASENA = os.getenv("BASE_DATOS_CONTRASENA");
BASE_DATOS_NOMBRE = os.getenv("BASE_DATOS_NOMBRE");

#Librerias Instaladas
from dotenv import load_dotenv;

#Modulos Nativos
import os;

load_dotenv(); 

TOKENS_LLAVE_PRIVADA = os.environ.get("TOKENS_LLAVE_PRIVADA");
TOKENS_ALGORITMO = os.environ.get("TOKENS_ALGORITMO");
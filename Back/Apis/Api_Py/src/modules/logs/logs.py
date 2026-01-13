#Modulos Nativos
import os; 

#Librerias Instaladas
from colorama import Fore, Back, init, Style; 

#Modelos Creados
from src.models.controladores.request.logs_modelo_request import Logs_Modelo_Request
from src.models.clases.modelo_respuesta import Modelo_Respuesta; 


class Logs(object):
    _id = 0; 

    def __init__(self, objeto:Logs_Modelo_Request):
        self._nombre = objeto.nombre; 
        self._mensajes = objeto.mensajes; 
        self._carpeta_principal = objeto.carpeta_principal; 
        self._carpeta_secundaria = objeto.carpeta_secundaria; 

    def registro_logs(self):
        init(); 
        
        try:
            
            if self._carpeta_secundaria == None:
                rutaLogs = os.path.abspath(os.path.join(os.path.dirname(__file__),"..","..","..","..", "..","..","REGISTRO_LOGS",self._carpeta_principal));  
            else: 
                rutaLogs = os.path.abspath(os.path.join(os.path.dirname(__file__),"..","..","..","..", "..","..","REGISTRO_LOGS",self._carpeta_principal,self._carpeta_secundaria)); 
            
            nombreArchivo = f"{self._nombre}_{Logs._id}.log"; 
            
            rutaArchivo = os.path.join(rutaLogs,nombreArchivo); 
                
            if not os.path.exists(rutaLogs):
                try:
                    os.makedirs(rutaLogs); 
                except Exception as error:
                    return error; 

            
            with open(rutaArchivo,"w",encoding="utf-8") as log:
                for i in self._mensajes: 
                    log.write(f"[ALERTA]:{i}"); 
                    log.write("\n"); 
            Logs._id += 1; 
            
            print(Back.GREEN + Fore.WHITE + "Para mas detalles visite el archivo " + Fore.BLACK + rutaArchivo + Style.RESET_ALL); 
            
            return Modelo_Respuesta(
                Mensaje="Archivo log creado satisfactoriamente",
                Estado=True
            ); 
        except Exception as error:
            return Modelo_Respuesta(
                Mensaje="Error al crear el archivo log",
                Estado=False,
                Error=str(error)
            ); 
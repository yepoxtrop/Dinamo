#Librerias Instaladas
from sqlalchemy import select, true;
from sqlalchemy.orm import sessionmaker;
from typing import Union; 

#Modulos Nativos
import os;

#Modelos Creados
from src.models.controladores.request.usuario_modelo_request import Usuario_Modelo_Request;
from src.models.clases.modelo_respuesta import Modelo_Respuesta; 
from src.models.clases.modelo_errores import Modelo_Errores;
from src.models.clases.tipo_errores import Tipo_Errores; 

#Configuraciones Creadas
from src.settings.base_datos_sql import *

#Tablas Creadas
from src.models.tablas_sql import *;

class Archivos_Firmas(object):
    __ruta_carpeta_firmas = os.path.abspath(os.path.join(os.path.dirname(__file__),"..","..","..","..", "..","..","Firmas_Usuarios")); 

    def __init__(self, objeto:Usuario_Modelo_Request):
        self.__nombre_usuario = objeto.nombre_usuario; 
        self.__nombre = objeto.nombre; 
        self.__cedula = objeto.cedula; 
        self.__ruta_carpeta_usuario = os.path.abspath(os.path.join(self.get_ruta_carpeta_firmas(), self.get_nombre_usuario())); 
        self.__ruta_archivo_pub = os.path.abspath(os.path.join(self.get_ruta_carpeta_usuario(), f"{self.get_cedula()}.pub")); 
        self.__ruta_archivo_csr = os.path.abspath(os.path.join(self.get_ruta_carpeta_usuario(), f"{self.get_cedula()}.csr")); 
        self.__ruta_archivo_crt = os.path.abspath(os.path.join(self.get_ruta_carpeta_usuario(), f"{self.get_cedula()}.crt")); 
        self.__ruta_archivo_p12 = os.path.abspath(os.path.join(self.get_ruta_carpeta_usuario(), f"{self.get_cedula()}.p12")); 

    def get_nombre_usuario(self):
        return self.__nombre_usuario; 
    
    def get_nombre(self):
        return self.__nombre; 
    
    def get_cedula(self):
        return self.__cedula; 
    
    def get_ruta_carpeta_usuario(self):
        return self.__ruta_carpeta_usuario; 
    
    def get_ruta_archivo_pub(self):
        return self.__ruta_archivo_pub; 
    
    def get_ruta_archivo_csr(self):
        return self.__ruta_archivo_csr; 
    
    def get_ruta_archivo_crt(self):
        return self.__ruta_archivo_crt;
    
    def get_ruta_archivo_p12(self):
        return self.__ruta_archivo_p12; 
    
    def gestionar_directorios(self, ruta:str) -> Union[Modelo_Errores, Modelo_Respuesta]:
        try:
            if os.path.exists(ruta):
                return Modelo_Respuesta(
                    Mensaje=f"La ruta si existe",
                    Resultado=ruta,
                )
            else:
                os.makedirs(ruta, exist_ok=True) 
                return Modelo_Respuesta(
                    Mensaje=f"La ruta fue creada",
                    Resultado=ruta,
                )
        except OSError as error:
            return Modelo_Errores(
                Mensaje=f"Se ha presentado un error.",
                Tipo_error=Tipo_Errores.ERROR_MODULO_OS,
                Descripcion_error=str(error),
            )
        except PermissionError as error:
            return Modelo_Errores(
                Mensaje=f"Permisos insuficientes",
                Tipo_error=Tipo_Errores.ERROR_PERMISOS_INSUFICIENTES,
                Descripcion_error=str(error)
            )
        except Exception as error:
            return Modelo_Errores(
                Mensaje="Se ha presentado un error",
                Tipo_error=Tipo_Errores.ERROR,
                Descripcion_error=str(error)
            );
        
    def verificar_ficheros(self, ruta:str) -> Union[Modelo_Errores, Modelo_Respuesta]:
        try:
            if os.path.exists(ruta):
                return Modelo_Respuesta(
                    Mensaje=f"La ruta si existe.",
                    Resultado=ruta,
                )
            else: 
                return Modelo_Respuesta(
                    Mensaje=f"La ruta no existe.",
                )
        except OSError as error:
            return Modelo_Errores(
                Mensaje=f"Se ha presentado un error.",
                Tipo_error=Tipo_Errores.ERROR_MODULO_OS,
                Descripcion_error=str(error),
            )
        except PermissionError as error:
            return Modelo_Errores(
                Mensaje=f"Permisos insuficientes",
                Tipo_error=Tipo_Errores.ERROR_PERMISOS_INSUFICIENTES,
                Descripcion_error=str(error)
            )
        except Exception as error:
            return Modelo_Errores(
                Mensaje="Se ha presentado un error",
                Tipo_error=Tipo_Errores.ERROR,
                Descripcion_error=str(error)
            );
    
    def consultar_carpeta_firmas(self) -> Union[Modelo_Errores, Modelo_Respuesta]:
        consulta = self.gestionar_directorios(ruta=self.get_ruta_carpeta_firmas()); 
        return consulta; 

    def consultar_carpeta_firmas_usuario(self) -> Union[Modelo_Errores, Modelo_Respuesta]:
        consulta = self.gestionar_directorios(ruta=self.get_ruta_carpeta_usuario());
        return consulta; 

    def consultar_key(self) -> Union[Modelo_Errores, Modelo_Respuesta]:
        try:
            sesion_local = sessionmaker(bind=conector);

            with sesion_local() as sesion:
                consulta_1 = select(Tabla_Usuarios).where(Tabla_Usuarios.usuario_nombre == self.get_nombre_usuario()); 
                resultado_1 = sesion.execute(consulta_1).scalar(); 
                if resultado_1 != None:
                    consulta_2 = select(Tabla_Firmas).where(Tabla_Firmas.usuario_id_fk == resultado_1.usuario_id); 
                    resultado_2 = sesion.execute(consulta_2).scalar();
                    if resultado_2 != None:
                        consulta_3 = select(Tabla_Llaves_Privadas).where(Tabla_Llaves_Privadas.firma_id_fk == resultado_2.firma_id); 
                        resultado_3 = str(sesion.execute(consulta_3).scalar()).split(","); 
                        return Modelo_Respuesta(
                            Mensaje="Llave privada encontrada en la DB",
                            Resultado=resultado_3[1]
                        ) 
                    else:
                        return Modelo_Respuesta(
                            Mensaje="Firma no encontrada en la DB",
                        )
                else:
                    return Modelo_Respuesta(
                        Mensaje="Usuario no encontrado en la DB",
                    )
        except Exception as error:
            return Modelo_Errores(
                Mensaje="Se ha presentado un error",
                Tipo_error=Tipo_Errores.ERROR,
                Descripcion_error=str(error)
            )

    def consultar_archivo_pub(self) -> Union[Modelo_Errores, Modelo_Respuesta]:
        consulta = self.verificar_ficheros(ruta=self.get_ruta_archivo_pub()); 
        return consulta; 

    def consultar_archivo_csr(self)  -> Union[Modelo_Errores, Modelo_Respuesta]:
        consulta = self.verificar_ficheros(ruta=self.get_ruta_archivo_csr()); 
        return consulta; 
    
    def consultar_archivo_crt(self)  -> Union[Modelo_Errores, Modelo_Respuesta]:
        consulta = self.verificar_ficheros(ruta=self.get_ruta_archivo_crt()); 
        return consulta; 

    def consultar_archivo_p12(self)  -> Union[Modelo_Errores, Modelo_Respuesta]:
        consulta = self.verificar_ficheros(ruta=self.get_ruta_archivo_p12()); 
        return consulta; 
    
    def consulta_general(self) -> Union[Modelo_Respuesta, Modelo_Errores]:
        llave_privada = self.consultar_key(); 
        if isinstance(llave_privada, Modelo_Errores):
            return llave_privada; 
            
        
        archivo_pub = self.consultar_archivo_pub(); 
        if isinstance(llave_privada, Modelo_Errores):
            return archivo_pub; 
        
        archivo_csr = self.consultar_archivo_csr(); 
        if isinstance(llave_privada, Modelo_Errores):
            return archivo_csr; 
        
        archivo_crt = self.consultar_archivo_crt(); 
        if isinstance(llave_privada, Modelo_Errores):
            return archivo_crt; 
        
        archivo_p12 = self.consultar_archivo_p12();
        if isinstance(llave_privada, Modelo_Errores):
            return archivo_p12; 
        
        return Modelo_Respuesta(
            Mensaje="Consulta completada",
            Resultado={
                "llave_privada":llave_privada.Resultado,
                "archivo_pub":archivo_pub.Resultado,
                "archivo_csr":archivo_csr.Resultado,
                "archivo_crt":archivo_crt.Resultado,
                "archivo_p12":archivo_p12.Resultado,
            }
        )
        
    @classmethod 
    def get_ruta_carpeta_firmas(cls):
        return cls.__ruta_carpeta_firmas; 
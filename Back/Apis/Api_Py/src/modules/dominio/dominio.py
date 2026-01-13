#Librerias Instaladas
from ldap3 import Connection, Server, NTLM; 
from ldap3.core.exceptions import LDAPInvalidCredentialsResult, LDAPBindError, LDAPException, LDAPNoSuchObjectResult; 
from typing import Union;

#Modulos Nativos
import json;

#Configuraciones
from src.settings.dominio.variables_dominio import DOMINIO, DOMINIO_ATRIBUTOS, DOMINIO_URL, DOMINIO_BASE_DN, DOMINIO_PUERTO, DOMINIO_FILTRO_BUSQUEDA, DOMINIO_GRUPOS_EXCLUIDOS;

#Modelos Creados
from src.models.controladores.request.dominio_modelo_request import Dominio_Modelo_Request;
from src.models.clases.modelo_errores import Modelo_Errores;
from src.models.clases.modelo_respuesta import Modelo_Respuesta; 
from src.models.clases.tipo_errores import Tipo_Errores;

class Dominio(object):
    __dominio = DOMINIO; 
    __dominio_atributos = DOMINIO_ATRIBUTOS; 
    __dominio_url = DOMINIO_URL; 
    __dominio_base_dn = DOMINIO_BASE_DN;
    __dominio_puerto = int(DOMINIO_PUERTO); 
    __dominio_filtro_busqueda = DOMINIO_FILTRO_BUSQUEDA;
    __dominio_grupos_excluidos = DOMINIO_GRUPOS_EXCLUIDOS;
    
    def __init__(self, objeto:Dominio_Modelo_Request):
        self.__usuario = objeto.usuario; 
        self.__contrasena = objeto.contrasena; 
        
    def get_usuario(self) -> str:
        return self.__usuario; 
    
    def get_contrasena(self) -> str:
        return self.__contrasena; 
        
    def crear_conexion(self) -> Union[Connection, Modelo_Errores] :
        try:    
            servidor = Server(
                host=self.get_dominio_url(), 
                port=self.get_dominio_puerto(), 
                use_ssl=False
            ); 
            conexion = Connection(
                server=servidor, 
                user=f"{self.get_dominio()}\\{self.get_usuario()}", 
                password=self.get_contrasena(), 
                authentication=NTLM
            );  
        except LDAPException as error:
            return Modelo_Errores(
                Mensaje="Error en la creacion de objetos para la conexion con el dominio",
                Tipo_error=Tipo_Errores.ERROR_LDAP,
                Descripcion_error=str(error)
            );  
        except Exception as error:
            return Modelo_Errores(
                Mensaje="Se ha presentado un error",
                Tipo_error=Tipo_Errores.ERROR,
                Descripcion_error=str(error)
            );
        else:
            return conexion; 
        
    def consultar_usuario(self, conexion:Connection) -> Union[Modelo_Errores, Modelo_Respuesta]:
        try:
            test_conexion = conexion.bind(); 
            if test_conexion:
            
                conexion.search(
                    search_base=self.get_dominio_base_dn(),
                    search_filter=f"({self.get_dominio_filtro_busqueda()}={self.get_usuario()})",
                    attributes=self.get_dominio_atributos().split(",")
                ); 
                
                consulta = conexion.entries[0].entry_to_json(); 
                consulta_objeto = json.loads(consulta); 
                
                lista_base = consulta_objeto["dn"].split(",");
                
                if lista_base[1][3:] in self.get_dominio_grupos_excluidos():
                    return Modelo_Errores(
                        Mensaje="Acceso denegado.",
                        Tipo_error=Tipo_Errores.ERROR_UNIDAD_ORDGANIZATIVA_INVALIDA,
                        Descripcion_error="La unidad organizativa del usuario no tiene permitido acceder"
                    )
                    
                
                return Modelo_Respuesta(
                    Mensaje=f"Consulta completa satisfactoriamente",
                    Resultado=consulta_objeto
                );
                
            else:
            
                return Modelo_Errores(
                    Mensaje=f"Acceso denegado",
                    Tipo_error=Tipo_Errores.ERROR_BIND,
                    Descripcion_error="El usuario no tiene acceso al dominio"
                );
            
        except LDAPBindError as error:
            return Modelo_Errores(
                Mensaje="Error en la autenticacion del usuario",
                Tipo_error=Tipo_Errores.ERROR_BIND,
                Descripcion_error=str(error)  
            );
        except LDAPInvalidCredentialsResult as error:
            return Modelo_Errores(
                Mensaje="Error en las credenciales del usuario",
                Tipo_error=Tipo_Errores.ERROR_CREDENCIALES_INVALIDAS,
                Descripcion_error=str(error)  
            )  
        except LDAPNoSuchObjectResult as error:
            return Modelo_Errores(
                Mensaje="Unidad organizativa no encontrada",
                Tipo_error=Tipo_Errores.ERROR_UNIDAD_ORDGANIZATIVA_DESCONOCIDA,
                Descripcion_error=str(error)
            )
        except LDAPException as error:
            return Modelo_Errores(
                Mensaje="Error en la creacion de objetos para la conexion con el dominio",
                Tipo_error=Tipo_Errores.ERROR_LDAP,
                Descripcion_error=str(error)
            ); 
        except Exception as error:
            return Modelo_Errores(
                Mensaje="Se ha presentado un error",
                Tipo_error=Tipo_Errores.ERROR,
                Descripcion_error=str(error)
            ); 
    
    def consultar_dominio(self) -> Union[Modelo_Respuesta, Modelo_Errores]:
        conexion = self.crear_conexion()
        
        if isinstance(conexion, Modelo_Errores):
            return conexion;
        try:
            consulta = self.consultar_usuario(conexion=conexion); 
            return consulta; 
        finally:
            if isinstance(conexion, Connection):
                conexion.unbind();
    
    @classmethod
    def get_dominio(cls) -> str:
        return cls.__dominio; 
    
    @classmethod
    def get_dominio_atributos(cls)  -> str:
        return cls.__dominio_atributos; 
    
    @classmethod
    def get_dominio_url(cls)  -> str:
        return cls.__dominio_url;
    
    @classmethod
    def get_dominio_base_dn(cls)  -> str:
        return cls.__dominio_base_dn; 
    
    @classmethod
    def get_dominio_puerto(cls)  -> int:
        return cls.__dominio_puerto;
    
    @classmethod
    def get_dominio_filtro_busqueda(cls) -> str:
        return cls.__dominio_filtro_busqueda;
    
    @classmethod
    def get_dominio_grupos_excluidos(cls) -> list:
        return cls.__dominio_grupos_excluidos.split(",");
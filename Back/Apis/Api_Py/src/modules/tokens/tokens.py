#Librerias Instaladas
import jwt; 
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError, InvalidAlgorithmError, InvalidKeyError;
from typing import Union;

#Constantes Creadas
from src.settings.tokens.variable_tokens import TOKENS_LLAVE_PRIVADA, TOKENS_ALGORITMO; 

#Modelos Creados
from src.models.clases.tipo_errores import Tipo_Errores;
from src.models.clases.modelo_errores import Modelo_Errores;
from src.models.clases.modelo_respuesta import Modelo_Respuesta;  

class Tokens(object):
    __tokens_llave_privada = TOKENS_LLAVE_PRIVADA; 
    __tokens_algoritmo = TOKENS_ALGORITMO; 
    
    def __init__(self, token:str):
        self.__token = token; 
        
    def get_token(self):
        return self.__token; 
        
    def validar_token(self) -> Union[Modelo_Respuesta, Modelo_Errores]:
        try:
            token_decodificado = jwt.decode(jwt=self.get_token(), key=self.get_tokens_llave_privada(), algorithms=self.get_tokens_algoritmo()); 
            
        except ExpiredSignatureError as error:
            return Modelo_Errores(
                Mensaje="El token ha expirado",
                Tipo_error=Tipo_Errores.ERROR_TOKEN_EXPIRADO,
                Descripcion_error="El token ha expirado"
            ); 
        except InvalidTokenError as error:
            return Modelo_Errores(
                Mensaje="El token es invalido",
                Tipo_error=Tipo_Errores.ERROR_TOKEN_INVALIDO,
                Descripcion_error="El token no cumple la estructura o ha sido modificado"
            ); 
        except InvalidKeyError as error:
            return Modelo_Errores(
                Mensaje="La llave es invalida",
                Tipo_error=Tipo_Errores.ERROR_TOKEN_LLAVE_INVALIDA,
                Descripcion_error="El token no fue firmado con la llave secreta asignada"
            ); 
        except InvalidAlgorithmError as error:
            return Modelo_Errores(
                Mensaje="El algoritmo es invalido",
                Tipo_error=Tipo_Errores.ERROR_TOKEN_ALGORITMO_INVALIDO,
                Descripcion_error="El token no cumple con el algoritmo indicado"
            ); 
        except Exception as error:
            return Modelo_Errores(
                Mensaje="Se ha presentado un error",
                Tipo_error=Tipo_Errores.ERROR,
                Descripcion_error=str(error)
            ); 
        else:
            return Modelo_Respuesta(
                Mensaje="Token valido, activo y decodificado exitosamente",
                Resultado=token_decodificado
            ); 
            
    @classmethod
    def get_tokens_llave_privada(cls):
        return cls.__tokens_llave_privada; 
    
    @classmethod
    def get_tokens_algoritmo(cls):
        return cls.__tokens_algoritmo;
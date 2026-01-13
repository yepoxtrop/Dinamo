#Clases Creadas
from src.modules.tokens.tokens import Tokens;
from fastapi import Header, Depends, HTTPException, status;
from typing import Annotated;

#Modelos 
from src.models.clases.modelo_respuesta import Modelo_Respuesta;
from src.models.clases.modelo_errores import Modelo_Errores;
from src.models.clases.alertas_http import alertas_tokens;

def controller_verificar_tokens(Authorization:Annotated[str,Header(...)]) -> Modelo_Respuesta:
    if not (Authorization.startswith("Bearer ")):
        raise HTTPException(
            status_code=401, 
            detail="Formato de token inválido",  
            headers={"WWW-Authenticate": "Bearer"}
        ); 
            
    token_recibido = Tokens(Authorization[7:])
    peticion = token_recibido.validar_token(); 
    
    if isinstance(peticion, Modelo_Errores):
        codigo = alertas_tokens.get(peticion.Tipo_error)
        raise HTTPException(
            status_code=codigo,
            detail=peticion.Descripcion_error,
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    return peticion 
    
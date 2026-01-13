#Routers Creados
from src.routes.directorios_routes import router_directorios;
from src.routes.ficheros_routes import router_ficheros;
from src.routes.dominio_routes import router_dominio;

__all__ = [
    'router_directorios',
    'router_ficheros',
    'router_dominio'
]
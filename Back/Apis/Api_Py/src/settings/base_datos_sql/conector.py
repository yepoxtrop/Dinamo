#Librerias Instaladas
from sqlalchemy import create_engine;

#Constantes Creadas
from src.settings.base_datos_sql.variables_sql import BASE_DATOS_HOSTNAME, BASE_DATOS_PUERTO, BASE_DATOS_NOMBRE, BASE_DATOS_USUARIO, BASE_DATOS_CONTRASENA;

#Conector explicito
#conector = create_engine(f"mssql+pyodbc://{BASE_DATOS_USUARIO}:{BASE_DATOS_CONTRASENA}@{BASE_DATOS_HOSTNAME}/{BASE_DATOS_NOMBRE}?driver=ODBC+Driver+17+for+SQL+Server");

#Conector con logueo de windows(local)
conector = create_engine(
    f"mssql+pyodbc://@{BASE_DATOS_HOSTNAME}/{BASE_DATOS_NOMBRE}?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"
)
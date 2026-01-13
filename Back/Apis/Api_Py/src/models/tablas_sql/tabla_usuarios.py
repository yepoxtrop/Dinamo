#Librerias Instaladas
from sqlalchemy import ForeignKey, String;
from sqlalchemy.orm import Mapped, mapped_column, relationship;

#Tablas Creadas
from src.models.tablas_sql.tabla_base import Tabla_Base;

#Modulos Nativos
from typing import List, Optional;
from datetime import datetime;

class Tabla_Usuarios(Tabla_Base):
    __tablename__ = 'usuarios';

    usuario_id: Mapped[int] = mapped_column(nullable=False, primary_key=True, autoincrement=True);
    usuario_nombre: Mapped[str] = mapped_column(String(50),nullable=False, unique=True);
    usuario_ultima_conexion: Mapped[datetime] = mapped_column(nullable=False);
    rol_id_fk: Mapped[int] = mapped_column(ForeignKey('roles.rol_id'), nullable=False, default=3);

    restriccion_roles_en_usuarios: Mapped['Tabla_Roles'] = relationship(back_populates='restriccion_roles_para_usuarios');

    restriccion_usuarios_para_tokens: Mapped[List['Tabla_Tokens']] = relationship(back_populates='restriccion_usuarios_en_tokens');
    restriccion_usuarios_para_archivos: Mapped[List['Tabla_Archivos_Firmados']] = relationship(back_populates='restriccion_usuarios_en_archivos');
    restriccion_usuarios_para_firmas: Mapped[List['Tabla_Firmas']] = relationship(back_populates='restriccion_usuarios_en_archivos');
    restriccion_usuarios_para_sesion: Mapped[List['Tabla_Inicio_Sesion']] = relationship(back_populates='restriccion_usuarios_en_sesion');
    restriccion_usuarios_para_acciones_sistema: Mapped[List['Tabla_Acciones_Sistema']] = relationship(back_populates='restriccion_usuarios_en_acciones_sistema');

    def __repr__(self) -> str:
        return f"usuario_id:{self.usuario_id!r}, usuario_nombre:{self.usuario_nombre!r}, usuario_ultima_conexion:{self.usuario_ultima_conexion!r}, rol_id_fk:{self.rol_id_fk!r}"
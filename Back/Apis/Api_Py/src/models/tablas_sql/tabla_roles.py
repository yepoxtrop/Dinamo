#Librerias Instaladas
from sqlalchemy import String;
from sqlalchemy.orm import Mapped, mapped_column, relationship;

#Tablas Creadas
from src.models.tablas_sql.tabla_base import Tabla_Base;

#Modulos Nativos
from typing import List, Optional;

class Tabla_Roles(Tabla_Base):
    __tablename__ = 'roles';

    rol_id: Mapped[int] = mapped_column(nullable=False, primary_key=True, autoincrement=True);
    rol_nombre: Mapped[str] = mapped_column(String(50),nullable=False, unique=True);

    restriccion_roles_para_usuarios: Mapped[list['Tabla_Usuarios']] = relationship(back_populates='restriccion_roles_en_usuarios');

    def __repr__(self):
        return f"Tabla_Roles(rol_id={self.rol_id!r}, rol_nombre={self.rol_nombre!r})"
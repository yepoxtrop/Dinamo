#Librerias Instaladas
from sqlalchemy import String;
from sqlalchemy.orm import Mapped, mapped_column, relationship;

#Tablas Creadas
from src.models.tablas_sql.tabla_base import Tabla_Base;

#Modulos Nativos
from typing import List, Optional;

class Tabla_Acciones(Tabla_Base):
    __tablename__ = 'acciones';

    accion_id: Mapped[int] = mapped_column(nullable=False, primary_key=True, autoincrement=True);
    accion_nombre: Mapped[str] = mapped_column(String(50),nullable=False, unique=True);

    restriccion_acciones_para_acciones_sistema: Mapped[list['Tabla_Acciones_Sistema']] = relationship(back_populates='restriccion_acciones_en_acciones_sistema');

    def __repr__(self):
        return f"Tabla_Acciones(accion_id={self.accion_id!r}, accion_nombre={self.accion_nombre!r})"
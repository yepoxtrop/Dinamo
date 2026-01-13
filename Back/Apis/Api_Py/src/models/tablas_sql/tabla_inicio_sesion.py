#Librerias Instaladas
from sqlalchemy import ForeignKey, String, CheckConstraint;
from sqlalchemy.orm import Mapped, mapped_column, relationship;

#Tablas Creadas
from src.models.tablas_sql.tabla_base import Tabla_Base;

#Modulos Nativos
from typing import List, Optional;
from datetime import datetime;

class Tabla_Inicio_Sesion(Tabla_Base):
    __tablename__ = 'inicio_sesion';

    sesion_id: Mapped[int] = mapped_column(nullable=False, primary_key=True, autoincrement=True);
    sesion_fecha: Mapped[datetime] = mapped_column(nullable=False);
    sesion_dispositivo: Mapped[str] = mapped_column(String(50),nullable=False);
    usuario_id_fk: Mapped[int] = mapped_column(ForeignKey('usuarios.usuario_id'), nullable=False);

    restriccion_usuarios_en_sesion: Mapped['Tabla_Usuarios'] = relationship(back_populates='restriccion_usuarios_para_sesion');

    def __repr__(self) -> str:
        return f"Tabla_Inicio_Sesion(sesion_id={self.sesion_id!r}, sesion_fecha={self.sesion_fecha!r}, sesion_dispositivo={self.sesion_dispositivo!r}, usuario_id_fk={self.usuario_id_fk!r})"


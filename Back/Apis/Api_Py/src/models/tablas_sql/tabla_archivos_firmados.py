#Librerias Instaladas
from sqlalchemy import ForeignKey, String, CheckConstraint;
from sqlalchemy.orm import Mapped, mapped_column, relationship;

#Tablas Creadas
from src.models.tablas_sql.tabla_base import Tabla_Base;

#Modulos Nativos
from typing import List, Optional;
from datetime import datetime;

class Tabla_Archivos_Firmados(Tabla_Base):
    __tablename__ = 'archivos_firmados';

    archivo_id: Mapped[int] = mapped_column(nullable=False, primary_key=True, autoincrement=True);
    archivo_direccion: Mapped[str] = mapped_column(String(1000),nullable=False);
    archivo_fecha: Mapped[datetime] = mapped_column(nullable=False);
    usuario_id_fk: Mapped[int] = mapped_column(ForeignKey('usuarios.usuario_id'), nullable=False);

    restriccion_usuarios_en_archivos: Mapped['Tabla_Usuarios'] = relationship(back_populates='restriccion_usuarios_para_archivos');

    def __repr__(self) -> str:
        return f"Tabla_Archivos_Firmados(archivo_id={self.archivo_id!r}, archivo_direccion={self.archivo_direccion!r}, archivo_fecha={self.archivo_fecha!r}, usuario_id_fk={self.usuario_id_fk!r})"


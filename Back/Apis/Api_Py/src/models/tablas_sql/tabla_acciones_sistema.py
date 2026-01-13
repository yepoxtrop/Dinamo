#Librerias Instaladas
from sqlalchemy import String, ForeignKey;
from sqlalchemy.orm import Mapped, mapped_column, relationship;

#Tablas Creadas
from src.models.tablas_sql.tabla_base import Tabla_Base;

#Modulos Nativos
from typing import List, Optional
from datetime import datetime;

class Tabla_Acciones_Sistema(Tabla_Base):
    __tablename__ = 'acciones_sistema';

    sistema_id: Mapped[int] = mapped_column(nullable=False, primary_key=True, autoincrement=True);
    sistema_fecha: Mapped[datetime] = mapped_column(nullable=False);
    accion_id_fk: Mapped[int] = mapped_column(ForeignKey('acciones.accion_id'), nullable=False);
    usuario_id_fk: Mapped[int] = mapped_column(ForeignKey('usuarios.usuario_id'), nullable=False);

    restriccion_acciones_en_acciones_sistema: Mapped['Tabla_Acciones'] = relationship(back_populates='restriccion_acciones_para_acciones_sistema');
    restriccion_usuarios_en_acciones_sistema: Mapped['Tabla_Usuarios'] = relationship(back_populates='restriccion_usuarios_para_acciones_sistema');

    def __repr__(self):
        return f"Tabla_Acciones_Sistema(sistema_id={self.sistema_id!r}, sistema_fecha={self.sistema_fecha!r}, accion_id_fk={self.accion_id_fk!r}, usuario_id_fk={self.usuario_id_fk!r})"
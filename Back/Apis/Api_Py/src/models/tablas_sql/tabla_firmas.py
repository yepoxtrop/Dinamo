#Librerias Instaladas
from sqlalchemy import ForeignKey, String;
from sqlalchemy.orm import Mapped, mapped_column, relationship;

#Tablas Creadas
from src.models.tablas_sql.tabla_base import Tabla_Base;

#Modulos Nativos
from typing import List, Optional;
from datetime import datetime;

class Tabla_Firmas(Tabla_Base):
    __tablename__ = 'firmas';

    firma_id: Mapped[int] = mapped_column(nullable=False, primary_key=True, autoincrement=True);
    firma_pub: Mapped[str] = mapped_column(String(1000),nullable=False);
    firma_csr: Mapped[str] = mapped_column(String(1000),nullable=False);
    firma_crt: Mapped[str] = mapped_column(String(1000),nullable=False);
    firma_p12: Mapped[str] = mapped_column(String(1000),nullable=False);
    firma_fecha_creacion: Mapped[datetime] = mapped_column(nullable=False);
    firma_fecha_vencimiento: Mapped[datetime] = mapped_column(nullable=False);
    firma_estado: Mapped[bool] = mapped_column(nullable=False);
    usuario_id_fk: Mapped[int] = mapped_column(ForeignKey('usuarios.usuario_id'), nullable=False);

    restriccion_usuarios_en_archivos: Mapped['Tabla_Usuarios'] = relationship(back_populates='restriccion_usuarios_para_firmas');

    restriccion_firmas_para_llaves: Mapped[list['Tabla_Llaves_Privadas']] = relationship(back_populates='restriccion_firmas_en_llaves');

    def __repr__(self) -> str:
        return f"Tabla_Firmas(firma_id={self.firma_id!r}, firma_pub={self.firma_pub!r}, firma_csr={self.firma_csr!r}, firma_crt={self.firma_crt!r}, firma_p12={self.firma_p12!r}, firma_fecha_creacion={self.firma_fecha_creacion!r}, firma_fecha_vencimiento={self.firma_fecha_vencimiento!r}, firma_estado={self.firma_estado!r}, usuario_id_fk={self.usuario_id_fk!r})"
#Librerias Instaladas
from sqlalchemy import ForeignKey, String;
from sqlalchemy.orm import Mapped, mapped_column, relationship;

#Tablas Creadas
from src.models.tablas_sql.tabla_base import Tabla_Base;

#Modulos Nativos
from typing import List, Optional;
from datetime import datetime;

class Tabla_Llaves_Privadas(Tabla_Base):
    __tablename__ = 'llaves_privadas';

    llave_id: Mapped[int] = mapped_column(nullable=False, primary_key=True, autoincrement=True);
    llave_valor: Mapped[str] = mapped_column(String(1000),nullable=False);
    firma_id_fk: Mapped[int] = mapped_column(ForeignKey('firmas.firma_id'), nullable=False);

    restriccion_firmas_en_llaves: Mapped['Tabla_Firmas'] = relationship(back_populates='restriccion_firmas_para_llaves');

    def __repr__(self) -> str:
        return f"{self.llave_id!r},{self.llave_valor!r},{self.firma_id_fk!r}"
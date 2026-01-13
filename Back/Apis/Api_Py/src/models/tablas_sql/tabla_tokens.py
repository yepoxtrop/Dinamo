#Librerias Instaladas
from sqlalchemy import ForeignKey, String, CheckConstraint, text;
from sqlalchemy.orm import Mapped, mapped_column, relationship;

#Tablas Creadas
from src.models.tablas_sql.tabla_base import Tabla_Base;

#Modulos Nativos
from typing import List, Optional;
from datetime import datetime;

class Tabla_Tokens(Tabla_Base):
    __tablename__ = 'tokens';

    token_id: Mapped[int] = mapped_column(nullable=False, primary_key=True, autoincrement=True);
    token_valor: Mapped[str] = mapped_column(String(1000),nullable=False);
    token_duracion: Mapped[str] = mapped_column(String(50), nullable=False, default='1 hora');
    token_inicio: Mapped[datetime] = mapped_column(nullable=False);
    token_fin: Mapped[datetime] = mapped_column(nullable=False);
    usuario_id_fk: Mapped[int] = mapped_column(ForeignKey('usuarios.usuario_id'), nullable=False);

    restriccion_usuarios_en_tokens: Mapped['Tabla_Usuarios'] = relationship(back_populates='restriccion_usuarios_para_tokens');

    __table_args__ = (
        CheckConstraint(text("token_duracion='1 hora'")),
    );

    def __repr__(self) -> str:
        return f"Tabla_Tokens(token_id={self.token_id!r}, token_valor={self.token_valor!r}, token_duracion={self.token_duracion!r}, token_inicio={self.token_inicio!r}, token_fin={self.token_fin!r}, usuario_id_fk={self.usuario_id_fk!r})"
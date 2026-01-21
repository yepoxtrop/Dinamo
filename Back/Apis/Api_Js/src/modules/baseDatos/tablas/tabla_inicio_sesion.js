//Configuraciones Creadas
import { conexionBaseDatos } from "../../../settings/consultas_sql/conexion_sql.js";

//Librerias
import { DataTypes } from "sequelize";

export const tabla_inicio_sesion = conexionBaseDatos.define(
    'inicio_sesion',
    {
        sesion_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        sesion_fecha:{
            type: DataTypes.DATE,
            allowNull: false, 
        },
        sesion_dispositivo:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        usuario_id_fk:{
            type: DataTypes.INTEGER,
            allowNull: false, 
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)
//Configuraciones Creadas
import { conexionBaseDatos } from "../../settings/consultas_sql/conexion_sql.js";

//Librerias
import { DataTypes } from "sequelize";

export const tabla_sistema = conexionBaseDatos.define(
    'acciones_sistema',
    {
        sistema_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        sistema_fecha:{
            type: DataTypes.DATE,
            allowNull: false, 
        },
        accion_id_fk:{
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        usuario_id_fk:{
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)
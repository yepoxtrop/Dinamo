//Configuraciones Creadas
import { conexion_base_datos } from "../../settings/consultas_sql/conexion_sql.js";

//Librerias
import { DataTypes } from "sequelize"; 

export const tabla_correos_usuarios = conexion_base_datos.define(
    'correos_usuarios',
    {
        correo_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        correo:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        usuario_id_fk:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)


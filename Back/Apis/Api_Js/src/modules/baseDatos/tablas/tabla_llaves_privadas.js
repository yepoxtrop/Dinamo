//Librerias
import { DataTypes } from "sequelize";

//Configuraciones Creadas
import { conexionBaseDatos } from "../../../settings/consultas_sql/conexion_sql.js";

export const tabla_llaves_privadas = conexionBaseDatos.define(
    "llaves_privadas",
    {
        llave_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        }, 
        llave_valor:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        firma_id_fk:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)
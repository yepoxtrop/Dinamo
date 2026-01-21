//Librerias 
import { DataTypes } from "sequelize";

//Configuraciones Creadas
import { conexionBaseDatos } from "../../settings/consultas_sql/conexion_sql.js";

//Modelos Creados
//--tablas sql
import { tabla_acciones_sistema } from "./tabla_acciones_sistema.js";

export const tabla_acciones = conexionBaseDatos.define(
    "acciones",
    {
        accion_id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        }, 
        rol_nombre: {
            type:DataTypes.STRING, 
            allowNull:false,
            unique:true
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

tabla_acciones.hasMany(tabla_acciones_sistema,{
    foreignKey:"accion_id_fk"
});

tabla_acciones_sistema.belongsTo(tabla_acciones);
//Librerias
import { DataTypes } from "sequelize";

//Configuraciones Creadas
import { conexion_base_datos } from "../../settings/consultas_sql/conexion_sql.js";

//Modelos Creados
//--tablas sql
import { tabla_usuarios } from "./tabla_usuarios.js";

export const tabla_roles = conexion_base_datos.define(
    "roles",
    {
        rol_id:{
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

tabla_roles.hasMany(tabla_usuarios, {
    foreignKey:"rol_id_fk"
})

tabla_usuarios.belongsTo(tabla_roles);
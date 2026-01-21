//Configuraciones Creadas
import { conexionBaseDatos } from "../../../settings/consultas_sql/conexion_sql.js";

//Librerias
import { DataTypes } from "sequelize";

//Modelos Creados
//--tablas sql
import { tabla_correos_usuarios } from "./tabla_correos_usuarios.js";
import { tabla_tokens } from "./tabla_tokens.js";
import { tabla_acciones_sistema } from "./tabla_acciones_sistema.js";
import { tabla_archivos_firmados } from "./tabla_archivos_firmados.js";
import { tabla_inicio_sesion } from "./tabla_inicio_sesion.js";
import { tabla_firmas } from "./tabla_firmas.js";

export const tabla_usuarios = conexionBaseDatos.define(
    'usuarios',
    {
        usuario_id:{
            type: DataTypes.INTEGER,
            primaryKey: true, 
            allowNull: false,
            autoIncrement: true,
        },
        usuario_nombre:{
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true, 
        },
        usuario_ultima_conexion:{
            type:DataTypes.DATE,
            allowNull:false
        },
        rol_id_fk:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

tabla_usuarios.hasMany(tabla_correos_usuarios, {
    foreignKey:"usuario_id_fk"
})

tabla_usuarios.hasMany(tabla_tokens, {
    foreignKey:"usuario_id_fk"
})

tabla_usuarios.hasMany(tabla_acciones_sistema, {
    foreignKey:"usuario_id_fk"
})

tabla_usuarios.hasMany(tabla_archivos_firmados, {
    foreignKey:"usuario_id_fk"
})

tabla_usuarios.hasMany(tabla_inicio_sesion, {
    foreignKey:"usuario_id_fk"
})

tabla_usuarios.hasOne(tabla_firmas, {
    foreignKey:"usuario_id_fk"
})

tabla_correos_usuarios.belongsTo(tabla_usuarios); 
tabla_tokens.belongsTo(tabla_usuarios); 
tabla_acciones_sistema.belongsTo(tabla_usuarios);
tabla_archivos_firmados.belongsTo(tabla_usuarios); 
tabla_inicio_sesion.belongsTo(tabla_usuarios); 
tabla_firmas.belongsTo(tabla_usuarios);
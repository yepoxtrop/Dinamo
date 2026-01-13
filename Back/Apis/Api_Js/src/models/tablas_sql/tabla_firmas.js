//Librerias
import { DataTypes } from "sequelize";

//Configuraciones Creadas
import { conexion_base_datos } from "../../settings/consultas_sql/conexion_sql.js";

//Modelos Creados
//--tablas sql
import { tabla_llaves_privadas } from "./tabla_llaves_privadas.js";

export const tabla_firmas = conexion_base_datos.define(
    'firmas',
    {
        firma_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        firma_pub:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        firma_csr:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        firma_crt:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        firma_p12:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        firma_fecha_creacion:{
            type: DataTypes.DATE,
            allowNull:false,
        }
        ,
        firma_fecha_vencimiento:{
            type: DataTypes.DATE,
            allowNull:false,
        },
        firma_estado:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
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

tabla_firmas.hasOne(tabla_llaves_privadas, {
    foreignKey:"firma_id_fk"
})
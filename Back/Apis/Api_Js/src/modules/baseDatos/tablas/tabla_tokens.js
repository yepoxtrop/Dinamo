//Librerias 
import { DataTypes } from "sequelize";

//Configuraciones Creadas
import { conexionBaseDatos } from "../../../settings/consultas_sql/conexion_sql.js";

export const tabla_tokens = conexionBaseDatos.define(
    "tabla_tokens",
    {
        token_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        }, 
        token_valor:{
            type: DataTypes.STRING,
            allowNull: false,
        },	
        token_duracion:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "1 hora",
            validate:{
                equals:"1 hora"
            }
        },
        token_inicio:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        token_fin:{
            type: DataTypes.DATE,
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
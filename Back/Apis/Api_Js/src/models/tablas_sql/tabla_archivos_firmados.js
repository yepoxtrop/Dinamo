//Librerias 
import { DataTypes } from "sequelize";

//Configuraciones Creadas
import { conexion_base_datos } from "../../settings/consultas_sql/conexion_sql.js";

export const tabla_archivos_firmados = conexion_base_datos.define(
    "archivos_firmados",
    {
        archivo_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        archivo_direccion:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        archivo_fecha:{
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
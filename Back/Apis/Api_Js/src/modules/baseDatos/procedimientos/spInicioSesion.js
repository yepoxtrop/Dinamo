//Librerias
import { QueryTypes } from "sequelize";

//Conifguraciones creadas
import { conexionBaseDatos } from "../../../settings/baseDatos/conexionBaseDatos.js";

export const spInicioSesion = async (datos) => {

    try {
        const consulta = await conexionBaseDatos.query(
            'exec sp_inicio_sesion @usuario=?, @nombre_usuario=?, @fecha_sesion=?, @dispositivo=?',
            {
                replacements:[datos.sAMAccountName, datos.cn, datos.fecha, datos.dispositivo],
                type: QueryTypes.RAW
            }
        );

        return consulta;
    } catch (error) {
        console.log(error)
    }
}
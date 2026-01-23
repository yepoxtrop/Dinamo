//Librerias
import { QueryTypes } from "sequelize";

//Conifguraciones creadas
import { conexionBaseDatos } from "../../../settings/baseDatos/conexionBaseDatos.js";

export const spInicioSesion = async (datos) => {

    try {
        const consulta = await conexionBaseDatos.query(
            'exec usp_inicio_sesion @usuarioDominio=?, @nombreCompletoUsuario=?, @fechaInicioSesion=?, @dispositivoSesion=?',
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
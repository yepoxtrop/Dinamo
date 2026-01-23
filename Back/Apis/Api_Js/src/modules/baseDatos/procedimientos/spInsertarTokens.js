//Librerias
import { QueryTypes } from "sequelize";

//Conifguraciones creadas
import { conexionBaseDatos } from "../../../settings/baseDatos/conexionBaseDatos.js";

export const spInsertarToken = async (datos) => {
    console.log(datos)
    try {
        const consulta = await conexionBaseDatos.query(
            'exec usp_insertar_tokens @usuarioId=?, @tokenValor=?',
            {
                replacements:[datos.usuarioId, datos.tokenValor],
                type: QueryTypes.RAW
            }
        );

        return consulta;
    } catch (error) {
        console.log(error)
    }
}
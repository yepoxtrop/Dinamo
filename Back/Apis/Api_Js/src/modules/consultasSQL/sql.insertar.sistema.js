export async function insertar_sistema(datos, tablas) {
    try {
        let consulta = await tablas.create({
            sistema_fecha : datos.fecha,
            accion_id_fk : datos.accion,
            usuario_id_fk : datos.id_usuario
        });
        return {
            "Mensaje":"Insercion completada satisfactoriamente en la tabla acciones_sistema.",
            "Estado":true,
            "Resultado":consulta.dataValues,
            "Error":null,
        }
    } catch (error) {
        return {
            "Mensaje":"Fallo en la operacion insercion en la tabla acciones_sistema.",
            "Estado":false,
            "Resultado":null,
            "Error":error
        }
    }
}
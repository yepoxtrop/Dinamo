export async function insertar_firmas(datos, tablas) {
    try {
        let consulta = await tablas.create({
            firma_nombre : datos.nombre_firma,
            firma_ruta : datos.ruta_firma,
            firma_fecha_creacion : datos.fecha_creacion_firma,
            firma_fecha_vencimiento : datos.fecha_vencimiento_firma, 
            usuario_id_fk : datos.id_usuario
        });
        return {
            "Mensaje":"Insercion completada satisfactoriamente en la tabla firmas.",
            "Estado":true,
            "Resultado":consulta.dataValues,
            "Error":null,
        }
    } catch (error) {
        return {
            "Mensaje":"Fallo en la operacion insercion en la tabla firmas.",
            "Estado":false,
            "Resultado":null,
            "Error":error
        }
    }
}
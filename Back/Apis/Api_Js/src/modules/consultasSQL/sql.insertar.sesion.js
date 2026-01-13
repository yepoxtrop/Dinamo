export async function insertar_sesion(datos, tablas) {
    try {
        let consulta = await tablas.create({
            sesion_fecha : datos.fecha,
            sesion_dispositivo : datos.dispositivo,
            usuario_id_fk : datos.id_usuario
        });
        console.log(consulta); 

    } catch (error) {
        console.log(error)
        return {
            "Mensaje":"Fallo en la operación inserción",
            "Estatus":false,
            "Error":error
        }
    }
}
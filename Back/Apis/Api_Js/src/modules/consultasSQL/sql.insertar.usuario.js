export async function insertar_usuario(datos, tablas) {
    try {
        let consulta = await tablas.create({
            usuario_nombre : datos.usuario
        });
        return {
            "Mensaje":"Insercion completada satisfactoriamente en la tabla usuarios.",
            "Estado":true,
            "Resultado":consulta.dataValues,
            "Error":null,
        }; 
    } catch (error) {
        return {
            "Mensaje":"Fallo en la operacion insercion en la tablas usuarios.",
            "Estado":false,
            "Resultado":null,
            "Error":error
        }
    }
} 
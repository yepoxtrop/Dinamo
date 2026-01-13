export async function consultar_usuario(datos, tablas) {
    try {
        let consulta = await tablas.findOne({
            where:{
                usuario_nombre:datos.usuario,
            }
        })
        if (consulta != null){
            return {
                "Mensaje":"Consulta completada satisfactoriamente en la tabla usuarios.",
                "Estado":true,
                "Resultado":consulta.dataValues,
                "Error":null,
            };
        }else{
            return {
                "Mensaje":"Consulta completada satisfactoriamente en la tabla usuarios.",
                "Estado":true,
                "Resultado":null,
                "Error":null,
            };
        }
    } catch (error) {
        return {
            "Mensaje":"Fallo en la operacion de consulta en la tabla usuarios.",
            "Estado":false,
            "Resultado":null,
            "Error":error
        }
    }
} 
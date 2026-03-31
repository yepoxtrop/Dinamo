export const modificarCorreo = ({cuerpoHtml, objetoCambios}) => {
    try {
        for (let i=0; i<Object.keys(objetoCambios).length; i++){
            let clave = Object.keys(objetoCambios)[i].toString();
            clave = clave.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            let valor = Object.values(objetoCambios)[i];
            const regex = new RegExp(clave, "g"); // reemplaza todas las ocurrencias
            cuerpoHtml = cuerpoHtml.replace(regex, valor);
        }

        return cuerpoHtml;
    } catch (error) {
        throw new Error("Error al modificar las el HTML:"+error.message);
    }
}

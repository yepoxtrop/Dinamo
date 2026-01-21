//Librerias
import { Control } from "ldapts";

//Configuraciones
import { clienteDominio } from "../../settings/dominio/clienteDominio.js";

//Constantes
import { dominio_base_dn, dominio_filtro_busqueda, dominio_atributos } from "../../settings/dominio/variablesDominio.js";

export const consultadrUsuarioDominio = async (datos) =>{
    let consulta = await clienteDominio.search(
        dominio_base_dn, 
        {
            scope: 'sub',
            filter: `(${dominio_filtro_busqueda}=${datos.usuario})`,
            attributes: dominio_atributos.split(","),
        }
    );

    console.log(consulta);
    return consulta.searchEntries;
};

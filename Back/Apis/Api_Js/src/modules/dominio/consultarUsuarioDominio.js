/* Modulos */
import { Control } from "ldapts";
import { validarUsuarioDominio } from "./validarUsuarioDominio.js";

//Configuraciones
import { clienteDominio } from "../../settings/dominio/clienteDominio.js";
import { dominio_base_dn, dominio_filtro_busqueda, dominio_atributos, dominio_usuario_prueba, dominio_contrasena_usuario_prueba } from "../../settings/dominio/variablesDominio.js";
import { error } from "node:console";

export const consultadrUsuarioDominio = async (datos) =>{
    let consulta = await clienteDominio.search(
        dominio_base_dn, 
        {
            scope: 'sub',
            filter: `(${dominio_filtro_busqueda}=${datos.usuario})`,
            attributes: dominio_atributos.split(","),
        }
    );
    return consulta.searchEntries;
};

export const consultarUsuarioDominioCn = async ({nombre}) => {
    try {
        let loginDominio = await validarUsuarioDominio({
            usuario:dominio_usuario_prueba,
            contrasena:dominio_contrasena_usuario_prueba
        });

        if (loginDominio !== undefined){
            throw new Error(`No se puede loguear con el dominio:${error.message}`);
        }

        let consulta = await clienteDominio.search(
            dominio_base_dn, 
            {
                scope: 'sub',
                filter: `(CN=${nombre})`,
                attributes: dominio_atributos.split(","),
            }
        );



        return consulta.searchEntries;
    } catch (error) {
        throw new Error(`Error en la consulta:${error.message}`)
    }
}


// consultarUsuarioDominioCn({nombre:"LUIS ANGEL SARMIENDTO DIAZ"})
// .then((res)=>{
//     console.log(res)
// })
// .catch((error)=>{
//     console.log(error)
// })
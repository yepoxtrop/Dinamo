/* Modulos*/
import fs from "fs/promises"
import { consultarUsuarioDominioCn } from "../../dominio/consultarUsuarioDominio.js"; 

export const archivosTXT = async({pathArchivo}) =>{
    try {
        let contenidoArchivo = await fs.readFile(pathArchivo, 'utf8'); 
        let listaFilas = contenidoArchivo.split("\n");
        let listaObjetos = [];
        for (let i =1; i<listaFilas.length; i++){
            let subListaDatos = listaFilas[i].split(";");
            if (subListaDatos.length <5 || subListaDatos.length >5){
                throw new Error("El archivo no cumple con el formato del documento");
            }
            if (isNaN(subListaDatos[3]) || !subListaDatos[4].includes('@')){
                throw new Error("Campos con datos incorrectos");
            }
            
            let consultaUsuario = await consultarUsuarioDominioCn({nombre:subListaDatos[0]});
            if (consultaUsuario.length === 0){
                throw new Error("No se encuentra el usuario en el dominio");
            }
            
            listaObjetos.push({
                nombreCompleto: consultaUsuario[0].cn,
                usuarioDominio: consultaUsuario[0].sAMAccountName,
                area: subListaDatos[1].charAt(0).toUpperCase() + subListaDatos[1].slice(1),
                supervisor: subListaDatos[2],
                cedula: subListaDatos[3],
                correo: subListaDatos[4].trim()
            });
        }
        return listaObjetos; 
    } catch (error) {
        throw new Error("Error al procesar el archivo");
    }
}
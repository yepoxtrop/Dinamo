/*========================================================================================================================
FECHA CREACION: 2026/03/03
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Funcion que se encarga de generar el reporte en csv de los archivos pdf analizados pero en un esquema
                basico
Modulos       : fs
Librerias     : json-2-csv
FECHA MODIFICACION: 2026/03/06
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
========================================================================================================================*/

/* Liberias */
import { json2csv } from 'json-2-csv';

/* Modulos */
import fs from 'fs/promises';

/**
 * @author Luis Angel Sarmiento Diaz
 * @description - Esta funcion se encarga de generar el reporte en CSV con un formato sencillo(resumido)
 * @param {Object} - Objeto con dos campos
 * @param {String} pathArchivo - Es la ruta donde se van a guardar los archivos
 * @param {Array} listaObjetos - La lista con la informacion de cada documento(en formato de objetos)
 * @returns {Array} - Devuelve un array con un objeto por documento, en donde la informacion es resumida
 */
export const reporteBasicoCSV = async ({pathArchivo, listaObjetos}) => {
    try {
        let datosEstrcuturados = formatearObjetosVista(listaObjetos); 
        /* Generar CSV una sola vez con todos los rows */
        await fs.writeFile(pathArchivo, '\uFEFF' + json2csv(datosEstrcuturados, {
            delimiter: {
                field: ";"
            }
        }),
        {
            encoding:'utf-8'
        }
        );
        return true;
    } catch (error) {
        throw new Error(`Se ha presentado un error al generar el CSV:${error}`);
    }
}; 

/* Funciones Auxiliares */
/**
 * @description - Esta funcion se encarga de formatear la lista de objetos a un formato sencillo
 * @param {Array} listaObjetos - Lista con objetos, los cuales reporesentan a cada documento que se ha cargado
 * @returns {Array} - Devuelve un array con un objeto por documento, en donde la informacion es resumida
 */
function formatearObjetos(listaObjetos){
    let listaObjetosModificados = [];

    try {

        let maxFirmasVencidas = 0;
        for (let i = 0; i < listaObjetos.length; i++) {
            Object.entries(listaObjetos[i]).forEach(([clave, valor]) => {
                if (valor["NumeroFirmasVencidas"] > maxFirmasVencidas) {
                    maxFirmasVencidas = valor["NumeroFirmasVencidas"];
                }
            });
        }

        /* For para reccorrer la lista de objetos */
        for(let i = 0; i<listaObjetos.length; i++){
            let modeloObjeto = {};
            /* For para recorrer los objetos(los documentos) */
            Object.entries(listaObjetos[i]).forEach(([clave,valor])=>{
                
                /* Datos generales */
                modeloObjeto["Archivo"]                 = clave; 
                modeloObjeto["EstadoDelDocumento"]      = valor["EstadoArchivo"]; 
                modeloObjeto["NumeroDeFirmas"]          = valor["NumeroFirmas"]; 
                modeloObjeto["NumeroDeFirmasVencidas"]  = valor["NumeroFirmasVencidas"]; 
                
                for (let n = 1; n <= maxFirmasVencidas; n++) {
                    modeloObjeto[`FirmaVencida${n}`]                  = '';
                    modeloObjeto[`FechaDeVencimientoDeFirma${n}`]     = '';
                }

                if (valor["NumeroFirmasVencidas"] !== 0){
                    /* For para recorrer lista de objetos de firmas */ 
                    for (let j = 0; j < valor["Firmas"].length; j++){
                    
                        /* For para recorrer los objetos(las firmas)  */
                        Object.entries(valor["Firmas"][j]).forEach(([llave, asignacion])=>{
                            if (asignacion["EstadoDeCertificado"] === 'Vencido') {
                                let regexNombre = /commonName=([^|]+)/g;
                                let regexPais   = /countryName=([^|]+)/g;
                                
                                let coincidenciaNombre = regexNombre.exec(asignacion["sujeto"]);
                                let coincidenciaPais = regexPais.exec(asignacion["sujeto"]);
                                
                                let sujeto = `Nombre=${coincidenciaNombre[1]}|Pais=${coincidenciaPais[1]}`;

                                modeloObjeto[`FirmaVencida${asignacion["NumeroFirma"]}`] = sujeto;

                                modeloObjeto[`FechaDeVencimientoDeFirma${asignacion["NumeroFirma"]}`] = asignacion["FechaDeVencimiento"];
                            }
                        })
                    }
                }
                
            })
            listaObjetosModificados.push(modeloObjeto);

        }
        
        return listaObjetosModificados;
        
    } catch (error) {
        throw new Error("Error al formatear el objeto:"+error);
    }
}

function formatearObjetosVista(listaObjetos){
    let listaObjetosModificados = [];

    try {

        /* For para reccorrer la lista de objetos */
        for(let i = 0; i<listaObjetos.length; i++){

            /* Objeto base */
            let modeloObjeto = {};

            modeloObjeto["Archivo"]                 = listaObjetos[i]["documentoNombre"]; 
            modeloObjeto["EstadoDelDocumento"]      = listaObjetos[i]["documentoEstado"]==1?'Valido':(listaObjetos[i]["documentoEstado"]==0?'Invalido':'No definido'); 
            modeloObjeto["NumeroDeFirmas"]          = listaObjetos[i]["documentoTotalFirmas"]; 
            modeloObjeto["NumeroDeFirmasVencidas"]  = listaObjetos[i]["documentoFirmasVencidas"]; 
            modeloObjeto["NumeroDeFirmasValidas"]  = listaObjetos[i]["documentoFirmasValidas"];

            listaObjetosModificados.push(modeloObjeto);

        }
        
        return listaObjetosModificados;
        
    } catch (error) {
        throw new Error("Error al formatear el objeto:"+error);
    }
}
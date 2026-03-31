/*========================================================================================================================
FECHA CREACION: 2026/03/03
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Funcion que se encarga de generar el reporte en csv de los archivos pdf analizados con 
                un esquema mas detallado
Modulos       : fs
Librerias     : json-2-csv
FECHA MODIFICACION: 2026/03/03
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
========================================================================================================================*/

/* Liberias */
import { json2csv } from 'json-2-csv';

/* Modulos */
import fs from 'fs/promises';

/**
 * @author Luis Angel Sarmiento Diaz
 * @description - Esta funcion se encarga de generar el reporte en CSV con un formato detallado(datos mas especificos)
 * @param {Object} params - Parámetros de entrada.
 * @param {string} params.pathArchivo - Es la ruta donde se van a guardar los archivos.
 * @param {Array} params.listaObjetos - La lista con la informacion de cada documento(en formato de objetos).
 * @returns {Promise<boolean>} `true` si el archivo se generó correctamente.
 * @throws {Error} Si ocurre un error durante la generación del CSV.
 */
export const reporteDetalladoCSV = async ({pathArchivo, listaObjetos}) => {
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
 * @author Luis Angel Sarmiento Diaz
 * @description - Esta funcion se encarga de formatear la lista de objetos a un formato detallado para el reporte CSV.
 * @param {Array} listaObjetos - Lista con objetos, los cuales representan a cada documento que se ha cargado.
 * @returns {Array} - Devuelve un array con un objeto por firma de documento, en donde la informacion es detallada.
 * @throws {Error} Si ocurre un error durante el formateo de los objetos.
 */
function formatearObjetos(listaObjetos){
    let listaObjetosModificados = [];

    try {

        /* For para reccorrer la lista de objetos */
        for(let i = 0; i<listaObjetos.length; i++){
            
            
            /* For para recorrer los objetos(los documentos) */
            Object.entries(listaObjetos[i]).forEach(([clave,valor])=>{
                

                for (let j = 0; j < valor["Firmas"].length; j++){

                    let modeloObjeto = {};    
                    /* Datos generales */
                    modeloObjeto["Archivo"]                 = clave; 
                    modeloObjeto["EstadoDelDocumento"]      = valor["EstadoArchivo"]; 
                    modeloObjeto["NumeroDeFirmas"]          = valor["NumeroFirmas"]; 
                    modeloObjeto["NumeroDeFirmasVencidas"]  = valor["NumeroFirmasVencidas"]; 
                    modeloObjeto["NumeroDeFirmasValidas"]   =  valor["NumeroFirmas"] - valor["NumeroFirmasVencidas"];

                    /* For para recorrer los objetos(las firmas)  */
                    Object.entries(valor["Firmas"][j]).forEach(([llave, asignacion])=>{

                        modeloObjeto["NumeroDeFirma"] = j+1;
                        let regexNombre = /commonName=([^|]+)/;
                        let regexPais   = /countryName=([^|]+)/;
                        
                        let coincidenciaNombre = regexNombre.exec(asignacion["sujeto"]);
                        let coincidenciaPais = regexPais.exec(asignacion["sujeto"]);
                        
                        let coincidenciaNombre2 = regexNombre.exec(asignacion["Editor"]);
                        let coincidenciaPais2 = regexPais.exec(asignacion["Editor"]);
                        let sujeto = '';
                        let autoridadCertificadora = '';

                        if (coincidenciaNombre === null && coincidenciaPais === null){
                            sujeto = `Nombre=NoEncontrado|Pais=NoEncontrado`;
                        }else if(coincidenciaNombre === null && coincidenciaPais !== null){
                            sujeto = `Nombre=NoEncontrado|Pais=${coincidenciaPais[1]}`;    
                        }else if((coincidenciaNombre !== null && coincidenciaPais === null)){
                            sujeto = `Nombre=${coincidenciaNombre[1]}|Pais=NoEncontrado`;    
                        }else{
                            sujeto = `Nombre=${coincidenciaNombre[1]}|Pais=${coincidenciaPais[1]}`;
                        }

                        if (coincidenciaNombre2 === null && coincidenciaPais2 === null){
                            autoridadCertificadora = `Nombre=NoEncontrado|Pais=NoEncontrado`;
                        }else if(coincidenciaNombre2 === null && coincidenciaPais2 !== null){
                            autoridadCertificadora = `Nombre=NoEncontrado|Pais=${coincidenciaPais2[1]}`;
                        }else if((coincidenciaNombre2 !== null && coincidenciaPais2 === null)){
                            autoridadCertificadora = `Nombre=${coincidenciaNombre2[1]}|Pais=NoEncontrado`;    
                        }else{
                            autoridadCertificadora = `Nombre=${coincidenciaNombre2[1]}|Pais=${coincidenciaPais2[1]}`;
                        }

                        modeloObjeto["DatosDelFirmante"] = sujeto;
                        modeloObjeto["AutoridadCertificadora"] = autoridadCertificadora;
                        modeloObjeto["FechaCreacion"] = asignacion["FechaDeCreacion"];
                        modeloObjeto["FechaVencimiento"] = asignacion["FechaDeVencimiento"];
                        modeloObjeto["EstadoDeCertificado"] = asignacion["EstadoDeCertificado"];

                        
                    })
                    
                    listaObjetosModificados.push(modeloObjeto);

                }
                

            })
        }
        
        return listaObjetosModificados;
        
    } catch (error) {
        throw new Error("Error al formatear el objeto:"+error);
    }
}

/**
 * @author Luis Angel Sarmiento Diaz
 * @description - Esta funcion se encarga de formatear la lista de objetos desde la vista de base de datos para el reporte CSV detallado.
 * @param {Array} listaObjetos - Lista con objetos obtenidos de la base de datos, representando certificados de documentos.
 * @returns {Array} - Devuelve un array con un objeto por certificado, formateado para el reporte CSV.
 * @throws {Error} Si ocurre un error durante el formateo de los objetos.
 */
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
            modeloObjeto["NumeroDeFirmasValidas"]   = listaObjetos[i]["documentoFirmasValidas"];
            modeloObjeto["NumeroDeFirma"]           = listaObjetos[i]["certificadoNumero"];
            
            let regexNombre = /commonName=([^|]+)/;
            let regexPais   = /countryName=([^|]+)/;
            
            let coincidenciaNombre = regexNombre.exec(listaObjetos[i]["certificadoSujeto"]);
            let coincidenciaPais = regexPais.exec(listaObjetos[i]["certificadoSujeto"]);
            let coincidenciaNombre2 = regexNombre.exec(listaObjetos[i]["certificadoEditor"]);
            let coincidenciaPais2 = regexPais.exec(listaObjetos[i]["certificadoEditor"]);
            let sujeto = '';
            let autoridadCertificadora = '';
            
            if (coincidenciaNombre === null && coincidenciaPais === null){
                sujeto = `Nombre=NoEncontrado|Pais=NoEncontrado`;
            }else if(coincidenciaNombre === null && coincidenciaPais !== null){
                sujeto = `Nombre=NoEncontrado|Pais=${coincidenciaPais[1]}`;    
            }else if((coincidenciaNombre !== null && coincidenciaPais === null)){
                sujeto = `Nombre=${coincidenciaNombre[1]}|Pais=NoEncontrado`;    
            }else{
                sujeto = `Nombre=${coincidenciaNombre[1]}|Pais=${coincidenciaPais[1]}`;
            }

            if (coincidenciaNombre2 === null && coincidenciaPais2 === null){
                autoridadCertificadora = `Nombre=NoEncontrado|Pais=NoEncontrado`;
            }else if(coincidenciaNombre2 === null && coincidenciaPais2 !== null){
                autoridadCertificadora = `Nombre=NoEncontrado|Pais=${coincidenciaPais2[1]}`;
            }else if((coincidenciaNombre2 !== null && coincidenciaPais2 === null)){
                autoridadCertificadora = `Nombre=${coincidenciaNombre2[1]}|Pais=NoEncontrado`;    
            }else{
                autoridadCertificadora = `Nombre=${coincidenciaNombre2[1]}|Pais=${coincidenciaPais2[1]}`;
            }
            
            modeloObjeto["Firmante"]                = sujeto;
            modeloObjeto["AutoridadCertificadora"]  = autoridadCertificadora;
            modeloObjeto["FechaCreacion"]           = listaObjetos[i]["certificadoFechaCreacion"];
            modeloObjeto["FechaVencimiento"]        = listaObjetos[i]["certificadoFechaVencimiento"];
            modeloObjeto["EstadoDeCertificado"]     = listaObjetos[i]["certificadoEstado"]==1?'Valido':(listaObjetos[i]["documentoEstado"]==0?'Invalido':'No definido');

            
                                
            listaObjetosModificados.push(modeloObjeto);

        }
        
        return listaObjetosModificados;
        
    } catch (error) {
        throw new Error("Error al formatear el objeto:"+error);
    }
}
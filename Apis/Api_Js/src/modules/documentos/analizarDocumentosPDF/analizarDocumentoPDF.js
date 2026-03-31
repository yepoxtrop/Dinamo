/* Librerias */
import forge from "node-forge";
import { fileTypeFromFile } from 'file-type';

/* Modulos */ 
import fs from "fs/promises"; 
import path from 'path';
import { fileURLToPath } from 'url';

/** 
 * DESCRIPCION GENERAL DEL MODULO
 * @author Luis Angel Sarmiento Diaz
 * @packages node-forge, file-type, fs/promises, path, url
 * @module analizarDocumentoPDF - Este módulo se encarga de analizar el contenido de los documentos PDF cargados, buscando firmas digitales. Utiliza expresiones regulares para identificar las secciones relevantes del PDF que contienen las firmas y sus rangos de bytes. Luego, decodifica la firma hexadecimal encontrada en formato PKCS#7 utilizando la librería "node-forge". Finalmente, extrae información relevante de los certificados asociados a las firmas, como el número de serie, la validez y el estado de vencimiento, y devuelve una lista con los resultados del análisis.
 * @param {Object} params - Parámetros de entrada para el análisis.
 * @param {Array<Object>} params.arrayArchivos - Array de objetos de archivo PDF. Cada objeto debe incluir 'path' (ruta absoluta del archivo) y 'originalname' (nombre original del archivo).
 * @returns {Promise<Array<Object>>} - Devuelve una promesa que resuelve en una lista de objetos. Cada objeto representa un documento analizado con propiedades como 'NombreDocumento', 'TipoDocumento', 'NumeroFirmas', 'NumeroFirmasVencidas', 'Firmas' (array de objetos con detalles de cada firma digital, incluyendo versión, serial, fechas, estado, etc.).
 * @throws {Error} - Lanza un error si ocurre un problema durante la lectura de archivos, validación de tipos o decodificación de firmas.
 * 
 * @example
 * const archivos = [{ path: '/uploads/documento1.pdf', originalname: 'documento1.pdf' }];
 * const resultado = await analizarDocumentoPDF({ arrayArchivos: archivos });
 * // resultado[0] contiene análisis del primer documento
 * 
 * FUNCIONES AUXILIARES DEL MODULO
 * @function decodificarFirmaHexa - Decodifica firma hexadecimal a objeto PKCS#7.
 * @function obtenerItems - Extrae atributos de certificados en formato string.
 * @function tipoArchivo - Valida si un archivo es PDF.
 * @function validarEstadoFecha - Verifica validez de certificado por fechas.
 * @function validarEstadoFechaUso - Valida si firma se usó en fecha válida.
 * @function validarCadenaDeConfianza - Verifica cadena de confianza de certificados.
 * @function validarHash - Valida permisos de firma en certificado.
 * @function estadoDocumentoPDF - Determina estado general del documento.
 * 
 * FILTROS PARA LA VALIDACIÓN DE FIRMAS DIGITALES
 */

export const analizarDocumentoPDF = async ({arrayArchivos}) =>{
    /* Inicializar variables */
    const lista_firmas = []; 
    /* Expresiones regulares para capturar firmas y fechas en las que se firma */
    const regexByteRange = /\/ByteRange\s*\[\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*\]/g;
    const regexFirma = /\/Contents\s*<([0-9A-Fa-f]+)>/g;
    const regexFechaFirma = /\/M\(D:(\d{14}[+-]\d{2}'\d{2}'|D:\d{14}Z?)\)/g;
    
    try {
        /* For para el array de archivos */
        for (let i = 0; i < arrayArchivos.length; i++) {
            let listaFirma = []; 
            let objetoFirma = {}; 
            let listaFirmasFechas = []; 
            let contadorFirmasVencidas = 0; 

            /* Estrcutura basica para cada objeto */
            objetoFirma[arrayArchivos[i].originalname] = {
                "NombreDocumento": arrayArchivos[i].originalname,
                "EstadoArchivo":"",
                "CausaVencimientoArchivo":"",
                "NumeroFirmas":"",
                "NumeroFirmasVencidas":"",
                "TipoDocumento":"",
                "Firmas":[]
            };

            /* Validar si un documento es documento es un pdf */
            let esPdf = await tipoArchivo(arrayArchivos[i].path);
            if (!esPdf){

                /* Si no es un pdf */
                let objetoCertificado = {
                    "NumeroFirma":0,
                    "Version": "",
                    "Serial": "",
                    "OidFirma": "",
                    "FechaDeCreacion": "",
                    "FechaDeVencimiento": "",
                    "EstadoDeCertificado": "",
                    "Editor": "",
                    "sujeto": "",
                    "CausaDeVencimientoDeCertificado":"",
                    "FechaDeUso":"",
                    "ValidacionVencimiento": ['',''],
                    "ValidacionFechaDeUso": ['',''],
                    "ValidacionHash": ['',''], 
                    "ValidacionCadenaConfianza": ['','']
                }

                
                objetoFirma[arrayArchivos[i].originalname]['Firma_0'] = objetoCertificado;

            }else {
                
                /* Si es un pdf */
                objetoFirma[arrayArchivos[i].originalname]["TipoDocumento"] = "PDF"; 

                /* Contenido del pdf */
                let contenidoDocumento = await fs.readFile(arrayArchivos[i].path);
                let bufferToString = contenidoDocumento.toString('binary');

                /* Encontrar todos los matches primero */
                const matchesByteRange = [...bufferToString.matchAll(regexByteRange)];
                const matchesFirma = [...bufferToString.matchAll(regexFirma)];
                const matchFechasFirmas = [...bufferToString.matchAll(regexFechaFirma)];
                
                /* Hallar fechas en las que se usaron las firmas por pdf */
                if (matchFechasFirmas.length>0){
                    Object.entries(matchFechasFirmas).forEach(([clave,valor])=>{
                        let solamenteFecha = `${valor[1].slice(0,4)}-${valor[1].slice(4,6)}-${valor[1].slice(6,8)}`;
                        listaFirmasFechas.push(solamenteFecha);
                    })
                }

                /* Verificar que coincidan */
                if (matchesByteRange.length !== matchesFirma.length) {
                    console.warn('Advertencia: Cantidad diferente de ByteRanges y Firmas');
                }

                if (Math.min(matchesByteRange.length, matchesFirma.length) === 0) {
                    let objetoCertificado = {
                        "NumeroFirma":0,
                        "Version": "",
                        "Serial": "",
                        "OidFirma": "",
                        "FechaDeCreacion": "",
                        "FechaDeVencimiento": "",
                        "EstadoDeCertificado": "",
                        "Editor": "",
                        "sujeto": "",
                        "CausaDeVencimientoDeCertificado":"",
                        "FechaDeUso":"",
                        "ValidacionVencimiento": ['',''],
                        "ValidacionFechaDeUso": ['',''],
                        "ValidacionHash": ['',''], 
                        "ValidacionCadenaConfianza": ['','']
                    }

                    listaFirma.push({'Firma_0':objetoCertificado});
                }; 

                /*await fs.writeFile('./contenido.txt', bufferToString, {flag:'a'})*/

                /* Procesar cada firma */
                for (let j = 0; j < Math.min(matchesByteRange.length, matchesFirma.length); j++) {
                    let firmaHex = matchesFirma[j][1];
                    
                    let byteRangeEncontrado = [ 
                        Number(matchesByteRange[j][1]),  
                        Number(matchesByteRange[j][2]),  
                        Number(matchesByteRange[j][3]),  
                        Number(matchesByteRange[j][4]),  
                    ];

                    let rangoEsperado = byteRangeEncontrado[2] - (byteRangeEncontrado[0] + byteRangeEncontrado[1]) - 2;

                    let peticionPkcs7 = decodificarFirmaHexa(firmaHex);

                    if (peticionPkcs7 && peticionPkcs7.certificates && peticionPkcs7.certificates.length > 0) {

                        /* Identificar el certificado del firmante */
                        let indiceCertificado = 0; 

                        for (let k = 0; k < peticionPkcs7.certificates.length; k++){
                            const esCA = peticionPkcs7.certificates[k].getExtension('basicConstraints')?.cA === true;
                            const esAutoFirmado = peticionPkcs7.certificates[k].subject.hash === peticionPkcs7.certificates[k].issuer.hash;

                            if (esAutoFirmado && esCA) {
                              continue/* Root CA — auto-firmada y es CA */
                            } else if (esCA) {
                              continue/* CA Intermedia — es CA pero alguien la firmó */
                            } else {
                              indiceCertificado = k;/* Certificado del firmante */
                            }
                        }

                        /* Solo agregar el certificado del firmante */
                        const certFirmante = peticionPkcs7.certificates[indiceCertificado];
                        let fechaCreacion = new Date(certFirmante.validity.notBefore);
                        let fechaVencimiento = new Date(certFirmante.validity.notAfter);

                        /* Pruebas de validacion de los certificados */
                        let pruebaEstadoFechaUso = validarEstadoFechaUso(fechaCreacion, fechaVencimiento, listaFirmasFechas[j]);
                        let prubaFechaVencimiento = validarEstadoFecha(certFirmante.validity.notBefore, certFirmante.validity.notAfter);
                        let pruebaHash = validarHash(certFirmante); 
                        let pruebaCadenaConfianza = validarCadenaDeConfianza(peticionPkcs7); 
                        let estadoFirma = estadoDocumentoFirma(prubaFechaVencimiento, pruebaEstadoFechaUso, pruebaHash, pruebaCadenaConfianza);
                        
                        let objetoCertificado = {
                            "NumeroFirma":j+1,
                            "Version": certFirmante.version,
                            "Serial": certFirmante.serialNumber,
                            "OidFirma": certFirmante.signatureOid,
                            "FechaDeCreacion": `${fechaCreacion.getFullYear()}-${fechaCreacion.getMonth()+1}-${fechaCreacion.getDate()}`,
                            "FechaDeVencimiento": `${fechaVencimiento.getFullYear()}-${fechaVencimiento.getMonth()+1}-${fechaVencimiento.getDate()}`,
                            "EstadoDeCertificado": estadoFirma[0],
                            "Editor": obtenerItems(certFirmante.issuer.attributes),
                            "sujeto": obtenerItems(certFirmante.subject.attributes),
                            "CausaDeVencimientoDeCertificado":estadoFirma[1],
                            "FechaDeUso":listaFirmasFechas[j],
                            "ValidacionVencimiento": prubaFechaVencimiento,
                            "ValidacionFechaDeUso": pruebaEstadoFechaUso,
                            "ValidacionHash": pruebaHash, 
                            "ValidacionCadenaConfianza": pruebaCadenaConfianza
                        }

                        if (objetoCertificado["EstadoDeCertificado"] === false){
                            contadorFirmasVencidas += 1; 
                        }

                        let llave = `Firma_${j + 1}`;
                        listaFirma.push({[llave]:objetoCertificado});
                    }
                }

                /* Modificacion de campos predeterminados del dobjeto del documento pdf */
                objetoFirma[arrayArchivos[i].originalname]["Firmas"] = listaFirma; 
                objetoFirma[arrayArchivos[i].originalname]["NumeroFirmas"] = matchesByteRange.length;
                objetoFirma[arrayArchivos[i].originalname]["NumeroFirmasVencidas"] = contadorFirmasVencidas;
                let estadoDocumento = estadoDocumentoPDF(listaFirma); 
                objetoFirma[arrayArchivos[i].originalname]["EstadoArchivo"] = estadoDocumento; 
                objetoFirma[arrayArchivos[i].originalname]["CausaVencimientoArchivo"] = estadoDocumento===true?'Todas las firmas son válidas':estadoDocumento===false?'Uno o más firmas son inválidas':"";
            }
            lista_firmas.push(objetoFirma);
        }
        
        return lista_firmas; 
    } catch (error) {
        throw new Error(`Error al analizar el documento PDF: ${error.message}`); 
    }
}; 


/**
 * @description Decodifica un bloque de firma digital en hexadecimal (contenido de /Contents) a un objeto PKCS#7.
 * @param {string} firmaHexa - Cadena hexadecimal que representa la firma digital extraída del documento PDF.
 * @returns {Object|null} - Objeto con `certificates` si la decodificación es exitosa; `null` si falla.
 */
function decodificarFirmaHexa(firmaHex) {
    try {
        const firmaBytes = forge.util.hexToBytes(firmaHex);
        const buffer = forge.util.createBuffer(firmaBytes, 'raw');

        // Parsear la estructura ASN.1 sin exigir que consuma todos los bytes (padding de 0x00)
        const asn1 = forge.asn1.fromDer(buffer.bytes(), { parseAllBytes: false });

        /*
         * Estructura esperada (CMS SignedData):
         *
         * SEQUENCE {                          ← asn1 (ContentInfo)
         *   OID (1.2.840.113549.1.7.2)        ← [0] signedData OID
         *   [0] EXPLICIT {                    ← [1] wrapper
         *     SEQUENCE {                      ← SignedData
         *       INTEGER (version)             ← [0]
         *       SET (digestAlgorithms)        ← [1]
         *       SEQUENCE (encapContentInfo)   ← [2]
         *       [0] (certificates)            ← [3]  ← lo que necesitamos
         *       ...
         *     }
         *   }
         * }
         */

        /* Navegar hasta los certificados manualmente */
        const signedDataWrapper = asn1.value[1];        
        const signedData = signedDataWrapper.value[0]; 

        /* El campo [0] IMPLICIT dentro de SignedData contiene los certificados */
        /* Su posición puede variar; lo buscamos por tag 0xA0 (context [0]) */
        const certField = signedData.value.find(
            node => node.tagClass === forge.asn1.Class.CONTEXT_SPECIFIC && node.type === 0
        );

        if (!certField) {
            console.warn('No se encontró el campo de certificados en la firma.');
            return null;
        }

        /* Cada elemento de certField.value es un certificado DER → convertir a objeto forge */
        const certificates = certField.value.map(certAsn1 => {
            return forge.pki.certificateFromAsn1(certAsn1);
        });

        return { certificates };

    } catch (error) {
        console.error('Error al decodificar firma ASN.1:', error.message);
        return null;
    }
}

/**
 * @description Convierte una lista de atributos de certificado (DN) en una cadena de texto formateada.
 * @param {Array<Object>} listaAtributos - Lista de objetos que representan los atributos del certificado (p.ej. { name, shortName, value }).
 * @returns {string} - Cadena con atributos concatenados con formato `key=value|`.
 * @throws {Error} - Si algún elemento no contiene las claves esperadas.
 */
function obtenerItems(listaAtributos){
    try {
        let stringItems = ''; 
        for(let i = 0; i<listaAtributos.length; i++){
            let extra = 1; 
            if('name' in listaAtributos[i] && 'value' in listaAtributos[i]){
                let name = listaAtributos[i].name;
                stringItems += `${name}=${listaAtributos[i].value}|`;
            }else if ('shortName' in listaAtributos[i] && 'value' in listaAtributos[i]){
                let shortName = listaAtributos[i].shortName;
                stringItems += `${shortName}=${listaAtributos[i].value}|`;
            }else if('value' in listaAtributos[i]){
                let extraName = `extra${extra}`;
                stringItems += `${extraName}=${listaAtributos[i].value}|`;
                extra ++; 
            }
            else {
                throw new Error(`Llaves no encontradas`); 
            }
        }
        return stringItems; 
    } catch (error) {
        throw new Error(`Error al obtener los items:${error.message}`)
    }
}

/**
 * @description Verifica si un archivo es un PDF consultando su tipo MIME.
 * @param {string} rutaArchivo - Ruta absoluta del archivo a validar.
 * @returns {Promise<boolean>} - `true` si es PDF, `false` en caso contrario.
 * @throws {Error} - Si falla la lectura o la detección del tipo.
 */
async function tipoArchivo(rutaArchivo) {
    try {
        let tipoDocumento  = await fileTypeFromFile(rutaArchivo);

        if (tipoDocumento.mime === 'application/pdf' ){
            return true; 
        }else {
            return false;
        }
        
    } catch (error) {
        throw new Error("Probelma al validar el tipo de archivo:"+error);
    }
}

/**
 * @description Evalúa si un certificado está vigente en función de su fecha de inicio y fin.
 * @param {Date} fechaInicio - Fecha de inicio de validez del certificado.
 * @param {Date} fechaFin - Fecha de fin de validez del certificado.
 * @returns {[boolean,string]} - Array con [estado, mensaje]. `true` si sigue vigente; `false` si está vencido.
 * @throws {Error} - Si ocurre un error al procesar las fechas.
 */
function validarEstadoFecha(fechaInicio, fechaFin){
    try {

        /* Validar por fecha de vencimiento */ 
        const fechaActual = new Date(); 
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        if (fechaActual > inicio && fechaActual < fin) {
            return [true, "La firma sigue siendo vigente."];
        }else{
            return [false, "Se venció por caducidad."];
        }

    } catch (error) {
        throw new Error(`Problema al validar fechas:${error.message}`);
    }
}

/**
 * @description Comprueba si la firma se utilizó dentro del período de validez del certificado.
 * @param {Date} fechaInicio - Fecha de inicio de validez del certificado.
 * @param {Date} fechaFin - Fecha de fin de validez del certificado.
 * @param {string} fechaUso - Fecha en la que se utilizó la firma (formato YYYY-MM-DD).
 * @returns {[boolean,string]} - Array con [estado, mensaje]. `true` si la firma se usó en periodo válido.
 * @throws {Error} - Si ocurre un error al comparar fechas.
 */
function validarEstadoFechaUso(fechaInicio, fechaFin, fechaUso){
    try {
        if (!fechaUso) {
            return [null, 'Fecha de uso no disponible (posible sello de tiempo).'];
        }

        const inicio = new Date(fechaInicio);
        const fin    = new Date(fechaFin);
        const fecha  = new Date(fechaUso);

        if (isNaN(fecha.getTime())) {
            return [null, 'Fecha de uso inválida o no reconocida.'];
        }

        if (fecha > inicio && fecha < fin) {
            return [true, 'La firma se usó estando vigente.'];
        } else {
            return [false, 'La firma se usó cuando ya no era vigente.'];
        }

    } catch (error) {
        throw new Error(`Problema al validar fecha de uso: ${error.message}`);
    }
}

/**
 * @description Valida la cadena de confianza de los certificados incluidos en una firma digital PKCS#7.
 * @param {Object} firma - Objeto PKCS#7 obtenido al parsear la firma digital.
 * @param {Array} firma.certificates - Array de certificados contenidos en la firma.
 * @returns {Array} - Retorna un array de dos elementos: [booleano, mensaje].
 *                    - true si la cadena de confianza se puede construir y se valida correctamente.
 *                    - false si falta un emisor, la firma es inválida o no se alcanza una Root CA confiable.
 * @throws {Error} - Si ocurre un error durante la validación.
 */
function validarCadenaDeConfianza(firma) {
    const certificados = firma.certificates;

    if (certificados.length === 1) {
        const cert = certificados[0];
        const esAutoFirmado = cert.subject.hash === cert.issuer.hash;

        if (esAutoFirmado) {
            return [true, 'Certificado auto-firmado — no emitido por una CA reconocida'];
        } else {
            return [true, 'Cadena incompleta, no se asegura la identidad del usuario — faltan la CA intermedia y/o Root CA'];
        }
    }

    const { roots, intermediates, endEntities } = clasificarCertificados(certificados);

    // CORRECCIÓN: si no hay certificado de firmante (ej. sello de tiempo
    // que solo embebe CAs), no se puede construir cadena
    if (!endEntities || endEntities.length === 0) {
        return [true, 'Cadena incompleta, no se asegura la identidad del usuario — faltan la CA intermedia y/o Root CA'];
    }

    const cadenaConfianza = [endEntities[0]];
    let current = endEntities[0];
    const allCandidates = [...intermediates, ...roots];

    for (let i = 0; i < 10; i++) {
        const issuerDN = current.issuer.hash;

        if (current.subject.hash === issuerDN) break;

        const issuer = allCandidates.find(c => c.subject.hash === issuerDN);

        if (!issuer) {
            return [false, `No se encontró el emisor para: ${current.issuer.getField('CN')?.value}`];
        }

        const verificacionCripto = issuer.verify(current);
        if (!verificacionCripto) {
            return [false, 'Firma del certificado inválida'];
        }

        cadenaConfianza.push(issuer);
        current = issuer;

        const isTrusted = roots.some(r => r.subject.hash === current.subject.hash);
        if (isTrusted) return [true, 'Certificado funciona con cadena de seguridad'];
    }

    return [false, 'No se alcanzó una Root CA de confianza'];
}


/**
 * @description Clasifica una colección de certificados PKCS#7 en raíces, intermedias y entidades finales.
 * @param {Array<Object>} certificates - Array de certificados obtenidos de la firma PKCS#7.
 * @returns {{roots: Object[], intermediates: Object[], endEntities: Object[]}} - Objetos agrupados por tipo.
 * @throws {Error} - Si ocurre un error durante la clasificación.
 */
function clasificarCertificados(certificates){
    
    try{
        const certificados = Object.values(certificates);

        const roots = [];
        const intermediates = [];
        const endEntities = [];

        for (const cert of certificados) {
          const esCA = cert.getExtension('basicConstraints')?.cA === true;
          const esAutoFirmado = cert.subject.hash === cert.issuer.hash;

          if (esAutoFirmado && esCA) {
            roots.push(cert);/* Root CA — auto-firmada y es CA */
          } else if (esCA) {
            intermediates.push(cert);/* CA Intermedia — es CA pero alguien la firmó */
          } else {
            endEntities.push(cert);/* Certificado del firmante */
          }
        }

        return { roots, intermediates, endEntities };
    }catch(error){
        throw new Error(`Problema al clasificar los tipos de certificados:${error}`);
    }
}


/**
 * @description Valida el uso de clave del certificado (keyUsage) para firma digital.
 * @param {Object} certificado - Certificado PKCS#7 del firmante.
 * @returns {[boolean,string]} - Array con [estado, mensaje].
 * @throws {Error} - Si ocurre un error al leer extensiones del certificado.
 */
function validarHash(certificado) {   
    try {
        const keyUsageExt = certificado.getExtension('keyUsage');

        if (!keyUsageExt) {
            return [true, 'Válido, pero no confiable' ];
        };

        if (!(keyUsageExt.digitalSignature === true)) {
            return [false, 'No valido para firmar documentos'];
        }

        if (!(keyUsageExt.nonRepudiation === true)) {
            return [true, 'No repudio, puede tener limitaciones legales'];
        }

        return [ true, "Válido en términos de permisos" ];
    } catch (error) {
        throw new Error(`Problema al validar el hash del certificado del firmante:${error}`); 
    }
}

/**
 * @description Consolida los resultados parciales de validación de una firma y determina su estado global.
 * @param {[boolean,string]} ValidacionVencimiento - Resultado de validar fechas de vigencia.
 * @param {[boolean,string]} ValidacionFechaDeUso - Resultado de validar la fecha de uso.
 * @param {[boolean,string]} ValidacionHash - Resultado de validar permisos de firma.
 * @param {[boolean,string]} ValidacionCadenaConfianza - Resultado de validar la cadena de confianza.
 * @returns {[boolean,string]} - Array con [estado, mensaje].
 * @throws {Error} - Si ocurre un error durante la evaluación.
 */
function estadoDocumentoFirma(ValidacionVencimiento, ValidacionFechaDeUso, ValidacionHash, ValidacionCadenaConfianza) {
    try {
        
        const fechaUsoIndeterminada = ValidacionFechaDeUso[0] === null;

        if (!fechaUsoIndeterminada && ValidacionFechaDeUso[0] === false) {
            return [false, `La firma es inválida debido a: ${ValidacionFechaDeUso[1]}|${ValidacionHash[1]}|${ValidacionCadenaConfianza[1]}`];
        }

        if (ValidacionHash[0] === false || ValidacionCadenaConfianza[0] === false) {
            return [false, `La firma es inválida debido a: ${ValidacionFechaDeUso[1]}|${ValidacionHash[1]}|${ValidacionCadenaConfianza[1]}`];
        }

        if (fechaUsoIndeterminada) {
            // Válida en lo demás, pero sin confirmación de fecha de uso
            return [true, `La firma es válida, pero tenga en cuenta: ${ValidacionFechaDeUso[1]}`];
        }

        if (ValidacionVencimiento[0] === false) {
            return [true, `La firma es válida, pero tenga en cuenta: ${ValidacionVencimiento[1]}`];
        }

        return [true, 'La firma es completamente válida'];

    } catch (error) {
        throw new Error(`Problema al validar el estado final de la firma en el PDF:${error}`)
    }
}

/**
 * @description Determina el estado general del documento según las firmas analizadas.
 *              - Si alguna firma tiene `EstadoDeCertificado === ""`, retorna `null` (estado indeterminado).
 *              - Si alguna firma es inválida, retorna `false`.
 *              - Si todas son válidas, retorna `true`.
 * @param {Array<Object>} listaFirmas - Lista de objetos con información de las firmas analizadas.
 * @returns {boolean|null} - `true` si todas las firmas son válidas; `false` si alguna es inválida; `null` si hay estados indeterminados.
 * @throws {Error} - Si ocurre un error durante el procesamiento.
 */
function estadoDocumentoPDF(listaFirmas) {
    /* Cada sujeto representará un certificado único (p.ej. CN+O+OU) y se considera válido */
    /* solo si todas sus apariciones en `listaFirmas` son válidas. */
    const resumenPorSujeto = new Map();

    try {
        for (const firmaObj of listaFirmas) {
            /* Cada `firmaObj` es un objeto que contiene una o más firmas (p.ej. Firma_1, Firma_2) */
            for (const [, valor] of Object.entries(firmaObj)) {
                const sujeto = valor?.sujeto ?? '';
                const estadoRaw = valor?.EstadoDeCertificado;

                /* Si alguno de los estados es una cadena vacía, consideramos el resultado indeterminado. */
                if (estadoRaw === '') return null;

                const estado = Boolean(estadoRaw);

                if (!resumenPorSujeto.has(sujeto)) {
                    /* Primera vez que vemos este sujeto: registramos su estado. */
                    resumenPorSujeto.set(sujeto, { estado });
                } else {
                    const anterior = resumenPorSujeto.get(sujeto);
                    /* Si alguna instancia del mismo sujeto es inválida, consideramos el sujeto inválido. */
                    resumenPorSujeto.set(sujeto, { estado: anterior.estado && estado });
                }
            }
        }

        /* Devuelve true solo si todos los sujetos son válidos. */
        return [...resumenPorSujeto.values()].every(r => r.estado);
    } catch (error) {
        throw new Error(`Problema al validar el estado final del documento PDF:${error}`);
    }
}
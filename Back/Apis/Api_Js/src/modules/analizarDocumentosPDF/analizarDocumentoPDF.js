/* Librerias */
import forge from "node-forge";

/* Modulos */ 
import fs from "fs/promises"; 

export const analizarDocumentoPDF = async ({arrayArchivos}) =>{
    const listaFirmas = []; 
    let totalFirmas = 0; 

    try {
        /* Expresiones regulares */
        const regexByteRange = /\/ByteRange\s*\[\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*\]/g;
        const regexFirma = /\/Contents\s*<([0-9A-Fa-f]+)>/g;
        
        /* For para el array de archivos */
        for (let i = 0; i < arrayArchivos.length; i++) {

            /* Contenido del pdf */
            let contenidoDocumento = await fs.readFile(arrayArchivos[i].path);
            let bufferToString = contenidoDocumento.toString('binary');
            
            /* Encontrar todos los matches primero */
            const matchesByteRange = [...bufferToString.matchAll(regexByteRange)];
            const matchesFirma = [...bufferToString.matchAll(regexFirma)];
        

            /* Verificar que coincidan */
            if (matchesByteRange.length !== matchesFirma.length) {
                console.warn('Advertencia: Cantidad diferente de ByteRanges y Firmas');
            }

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

                // console.log(`Firma ${i + 1}:
                // - Rango esperado: ${rangoEsperado}
                // - Rango firma hexa: ${firmaHex.length/2}    
                // `);

                let peticionPkcs7 = decodificarFirmaHexa(firmaHex);

                if (peticionPkcs7 && peticionPkcs7.certificates && peticionPkcs7.certificates.length > 0) {
                    // Solo agregar el certificado del firmante (el primero)
                    const certFirmante = peticionPkcs7.certificates[0];

                    let objetoCertificado = {
                        "archivo":arrayArchivos[i].originalname,
                        "numeroFirma": j + 1,
                        "totalCertificadosCadena": peticionPkcs7.certificates.length,
                        "version": certFirmante.version,
                        "serial": certFirmante.serialNumber,
                        "oidFirma": certFirmante.signatureOid,
                        "validacion": certFirmante.validity,
                        "estado": validarVencimientoFirma(certFirmante.validity.notBefore, certFirmante.validity.notAfter),
                        "editor": obtenerItems(certFirmante.issuer.attributes),
                        "sujeto": obtenerItems(certFirmante.subject.attributes), 
                    }

                    listaFirmas.push(objetoCertificado);
                }
                
                totalFirmas +=1;
            }
        }
        return listaFirmas; 
    } catch (error) {
        throw new Error(`Error al analizar el documento PDF: ${error.message}`); 
    }
}; 


/* Funciones auxiliares para el funcionamiento del modulo */
const decodificarFirmaHexa = (firmaHexa) => {
  try {
    /* Convertir hex a bytes */
    const firmaBytes = forge.util.hexToBytes(firmaHexa);
    
    /* Crear buffer para lectura */
    const buffer = forge.util.createBuffer(firmaBytes, 'raw');
    
    /* Parsear SOLO la estructura ASN.1 válida (ignora el padding de 0) */ 
    const asn1 = forge.asn1.fromDer(buffer.bytes(), { parseAllBytes: false });
    
    /* Convertir a PKCS#7 */
    const pkcs7 = forge.pkcs7.messageFromAsn1(asn1);
    
    return pkcs7;
  } catch (error) {
    console.error("Error al decodificar firma ASN.1:", error);
  }
};

const obtenerItems = (listaAtributos) =>{
    try {
        let objetoItems = {}
        for(let i = 0; i<listaAtributos.length; i++){
            let extra = 1; 
            if('name' in listaAtributos[i] && 'value' in listaAtributos[i]){
                let name = listaAtributos[i].name;
                objetoItems[name] = listaAtributos[i].value;
            }else if ('shortName' in listaAtributos[i] && 'value' in listaAtributos[i]){
                let shortName = listaAtributos[i].shortName;
                objetoItems[shortName] = listaAtributos[i].value;
            }else if('value' in listaAtributos[i]){
                let extraName = `extra${extra}`;
                objetoItems[extraName] = listaAtributos[i].value;
                extra ++; 
            }
            else {
                throw new Error(`Llaves no encontradas`); 
            }
        }
        return objetoItems; 
    } catch (error) {
        throw new Error(`Error al obtener los items:${error.message}`)
    }
}

const validarVencimientoFirma = (fechaInicio, fechaFin) => {
    try {
        let fecha = new Date()

        if (fecha > fechaFin) {
            return 'Vencida';
        }

        if (fecha < fechaInicio) {
            return 'No disponible aún';
        }

        return 'Disponible'

    } catch (error) {
        throw new Error(`Problema al validar fechas:${error.message}`);
    }
}
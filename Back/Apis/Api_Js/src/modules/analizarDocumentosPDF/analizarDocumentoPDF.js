/* Librerias */
import forge from "node-forge";

/* Modulos */ 
import fs from "fs/promises"; 
import { error } from "console";

export const analizarDocumentoPDF = async ({pathDocumento}) =>{
    try {
        const listaFirmas = []; 

        /* Expresiones regulares */
        const regexByteRange = /\/ByteRange\s*\[\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*\]/g;
        const regexFirma = /\/Contents\s*<([0-9A-Fa-f]+)>/g;

        /* Contenido del pdf */
        let contenidoDocumento = await fs.readFile(pathDocumento);
        let bufferToString = contenidoDocumento.toString('binary');
        
        /* Encontrar todos los matches primero */
        const matchesByteRange = [...bufferToString.matchAll(regexByteRange)];
        const matchesFirma = [...bufferToString.matchAll(regexFirma)];
        
        /* Verificar que coincidan */
        if (matchesByteRange.length !== matchesFirma.length) {
            console.warn('Advertencia: Cantidad diferente de ByteRanges y Firmas');
        }
        
        /* Procesar cada firma */
        for (let i = 0; i < Math.min(matchesByteRange.length, matchesFirma.length); i++) {
            let firmaHex = matchesFirma[i][1];
            let byteRangeEncontrado = [ 
                Number(matchesByteRange[i][1]),  
                Number(matchesByteRange[i][2]),  
                Number(matchesByteRange[i][3]),  
                Number(matchesByteRange[i][4]),  
            ];

            let rangoEsperado = byteRangeEncontrado[2] - (byteRangeEncontrado[0] + byteRangeEncontrado[1]) - 2;
            
            console.log(`Firma ${i + 1}:
            - Rango esperado: ${rangoEsperado}
            - Rango firma hexa: ${firmaHex.length/2}    
            `);
            
            let peticionPkcs7 = decodificarFirmaHexa(firmaHex);
            
            if (peticionPkcs7 && peticionPkcs7.certificates && peticionPkcs7.certificates.length > 0) {
                // Solo agregar el certificado del firmante (el primero)
                const certFirmante = peticionPkcs7.certificates[0];
                
                listaFirmas.push({
                    "numeroFirma": i + 1,
                    "version": certFirmante.version,
                    "serial": certFirmante.serialNumber,
                    "oidFirma": certFirmante.signatureOid,
                    "validacion": certFirmante.validity,
                    "issuer": obtenerItems(certFirmante.issuer.attributes),
                    "subject": obtenerItems(certFirmante.subject.attributes), 
                    "totalCertificadosCadena": peticionPkcs7.certificates.length,
                    "estado": new Date() > certFirmante.validity.notAfter ? 'Vencido' : 'Funcional' 
                });
            }
        }
        
        await fs.writeFile('./resultado.txt', JSON.stringify(listaFirmas, null, 2));
        return listaFirmas; 
    } catch (error) {
        throw new Error(`Error al analizar el documento PDF: ${error.message}`); 
    }
}; 


/* Funciones Esenciales para el funcionamiento del modulo */
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

        if (fecha < fechaFin) {
            return 'No disponible aún';
        }

        return 'Disponible'

    } catch (error) {
        throw new Error(`Problema al validar fechas:${error.message}`);
    }
}
/* Librerias */
import forge from "node-forge";

/* Modulos */ 
import fs from "fs/promises"; 

export const analizarDocumentoPDF = async ({pathDocumento}) =>{
    try {
        const listaFirmas = []; 

        /* Expresiones regulares para hallar el rango de bytes y las firmas */
        const regexByteRange = /\/ByteRange\s*\[\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*\]/g;
        const regexFirma = /\/Contents\s*<([0-9A-Fa-f]+)>/g;

        /* Contenido del pdf */
        let contenidoDocumento = await fs.readFile(pathDocumento);
        let bufferDocumento = Buffer.from(contenidoDocumento);
        let bufferToString = bufferDocumento.toString('binary')
        
        /* Matchs de las expresiones regulares con el str del buffer */
        let matchByteRange;
        let matchFirma;
        
        /* Ciclo para hallar las firmas y los rangos */
        while ((matchFirma = regexFirma.exec(bufferToString)) !== null &&
        (matchByteRange = regexByteRange.exec(bufferToString)) !== null) {

            /* Contenido de la firma encontrada */
            let firmaHex = matchFirma[1];
            
            /* Rangos de ubicacion de la firma en el pdf */
            let byteRangeEncontrado = [ 
                Number(matchByteRange[1]),  
                Number(matchByteRange[2]),  
                Number(matchByteRange[3]),  
                Number(matchByteRange[4]),  
            ];
            //fs.writeFile("./buffer.txt", firmaBinaria);

            /* Rango esperado(debe de ser igual a la longitud de la firma) */
            let rangoEsperado = byteRangeEncontrado[2] - (byteRangeEncontrado[0]+byteRangeEncontrado[1]) -2;
            
            console.log(`Rangos
            -Rango esperado:${rangoEsperado}
            -Rango firma hexa:${firmaHex.length/2}    
            `)
            
            /* Hallar el rango real en asn1 para obtener el certificado */
            let peticionPkcs7 = decodificarFirmaHexa(firmaHex);
            console.log('certificado')
            for (let i = 0; i < peticionPkcs7.certificates.length; i++){
                console.log('certificado encontrado')
                console.log(peticionPkcs7.certificates[i])
                listaFirmas.push({
                    "version":peticionPkcs7.certificates[i].version,
                    "serial":peticionPkcs7.certificates[i].serialNumber,
                    "OidFimra":peticionPkcs7.certificates[i].signatureOid,
                    "validacion":peticionPkcs7.certificates[i].validity,
                    "issuer":peticionPkcs7.certificates[i].issuer,
                    "subject":peticionPkcs7.certificates[i].subject
                    
                })
            }
        }

        return listaFirmas; 
    } catch (error) {
        throw new Error(`Error al analizar el documentos PDF:${error.message}`); 
    }
}; 




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
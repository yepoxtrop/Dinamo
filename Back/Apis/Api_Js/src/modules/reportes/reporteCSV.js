/* Liberias */
import * as csv from 'csv';

/* Modulos */
import fs from 'fs'

export const reporteCSV = async ({pathArchivo, listaObjetos}) => {
    try {

        /* Obtener el total de columnas fijas para el csv */
        let columnasCsv = obtenerColumnas(listaObjetos); 

        /* Formatear los objetos con todas las columnas encontradas */
        let objetosModificados = formatearObjetos(
            columnasCsv.listaConSublistasOriginal, 
            listaObjetos
        )
        //console.log(objetosModificados)

        let reporte = csv.stringify(objetosModificados, {
            header:true,
            delimiter:";"
        }, (error, res)=>{
            if (error) {
                throw new Error(`Error al generar el archivo CSV:${error.message}`); 
            }
            fs.writeFileSync('./reporte.csv', res, {encoding:'utf-8'});
            return true
        })
    } catch (error) {
        throw new Error(`Se ha presentado un error al generar el CSV:${error.message}`);
    }
}

/* Funciones auxiliares para el funcionamiento del modulo */
const obtenerColumnas = (listaObjetos) => {
    let listaItems = [];
    let listaEditor = []; 
    let listaSujeto = []; 

    try {
        for (let i=0; i<listaObjetos.length; i++){
            Object.entries(listaObjetos[i]).forEach(([clave, valor])=>{
                if (clave === 'validacion' && typeof valor === 'object' ){
                    Object.keys(valor).forEach((llave)=>{
                        if (!listaItems.includes(llave)){
                            listaItems.push(llave)
                        }
                    })
                }
                
                if (clave === 'editor' && typeof valor === 'object' ){
                    Object.keys(valor).forEach((llave)=>{
                        if (!listaEditor.includes(llave)){
                            listaEditor.push(llave)
                        }
                    })
                } 
                
                if (clave === 'sujeto' && typeof valor === 'object' ){
                    Object.keys(valor).forEach((llave)=>{
                        if (!listaSujeto.includes(llave)){
                            listaSujeto.push(llave)
                        }
                    })
                }
                
            
                if (!listaItems.includes(clave) && typeof valor !== 'object'){
                    listaItems.push(clave)
                }
            })     
        }
        return {
            listaConcatenadaOriginal:  listaItems.concat(listaEditor, listaSujeto),
            listaConSublistasOriginal: [listaItems, listaEditor, listaSujeto],
        };
    } catch (error) {
        throw new Error(`Error al obtener las columnas:${error.message}`)
    }
}

const formatearObjetos = (listaIndices, listaObjetos) => {
    let listaObjetosFormateados = [];

    try {
        for (let i=0; i<listaObjetos.length; i++){
            Object.entries(listaObjetos[i]).forEach(([clave, valor])=>{
                if (typeof valor === 'object'){
                    if (clave === "editor"){
                        let llavesObjeto = Object.keys(valor); 
                        for (let j = 0; j < listaIndices[1].length; j++){
                            if (llavesObjeto.includes(listaIndices[1][j])){
                                listaObjetos[i][`${listaIndices[1][j]}Editor`] = valor[listaIndices[1][j]]; 
                            }else{
                                listaObjetos[i][`${listaIndices[1][j]}Editor`] = ""; 
                            }
                        }
                    }

                    if (clave === 'sujeto'){
                        let llavesObjeto = Object.keys(valor); 
                        for (let j = 0; j < listaIndices[2].length; j++){
                            if (llavesObjeto.includes(listaIndices[2][j])){
                                listaObjetos[i][`${listaIndices[2][j]}Sujeto`] = valor[listaIndices[2][j]]; 
                            }else{
                                listaObjetos[i][`${listaIndices[2][j]}Sujeto`] = ""; 
                            }
                        }
                    }

                    if (clave === 'validacion'){
                        Object.entries(valor).forEach(([llave, asignacion])=>{
                            if (listaIndices[0].includes(llave)){
                                listaObjetos[i][llave] = asignacion;
                            }else{
                                listaObjetos[i][llave] = "";
                            }
                        })
                    }


                }
            })  
            delete listaObjetos[i].editor;
            delete listaObjetos[i].sujeto;
            delete listaObjetos[i].validacion;  
            
            listaObjetosFormateados.push(listaObjetos[i])
        }
        return listaObjetosFormateados; 
    } catch (error) {
        throw new Error(`Error al formatear el objeto:${error.message}`); 
    }
}

// reporteCSV({pathArchivo:"./aa", listaObjetos:[
//         {
//             "archivo": "CHIMBORAZO_1906_PLA.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "5edc1641be9cb2f6",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-12-07T15:36:00.000Z",
//                 "notAfter": "2025-12-07T15:36:00.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "ES",
//                 "localityName": "Barcelona (see current address at www.uanataca.com/address)",
//                 "organizationName": "UANATACA S.A.",
//                 "organizationalUnitName": "TSP-UANATACA",
//                 "commonName": "UANATACA CA2 2016",
//                 "extra1": "VATES-A66721499"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "surname": "ABAD PEÃA",
//                 "givenName": "WALTER FRANCISCO",
//                 "serialNumber": "IDCEC-0953449220",
//                 "commonName": "WALTER FRANCISCO ABAD PEÃA",
//                 "extra1": "TINEC-0953449220001"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1906_PLA.pdf",
//             "numeroFirma": 2,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "4a3dd6a9",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-04-18T16:41:03.000Z",
//                 "notAfter": "2025-04-18T16:41:03.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "PRISCILA ALEXANDRA GUANOLUISA BAQUE",
//                 "serialNumber": "0930488697-180424115048",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1906_PLA.pdf",
//             "numeroFirma": 3,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "169a6dc3",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-01-30T00:10:12.000Z",
//                 "notAfter": "2026-01-29T00:10:12.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "ANDRES ALEXANDER LOPEZ MORAN",
//                 "serialNumber": "0923994792-290124192001",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1906_INF3.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "54cfb969",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-02-05T02:09:25.000Z",
//                 "notAfter": "2027-02-05T02:09:25.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "LETICIA ELIZABETH CARVALLO PAREDES",
//                 "serialNumber": "0925778722-040225211919",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1929_PLA.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "5edc1641be9cb2f6",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-12-07T15:36:00.000Z",
//                 "notAfter": "2025-12-07T15:36:00.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "ES",
//                 "localityName": "Barcelona (see current address at www.uanataca.com/address)",
//                 "organizationName": "UANATACA S.A.",
//                 "organizationalUnitName": "TSP-UANATACA",
//                 "commonName": "UANATACA CA2 2016",
//                 "extra1": "VATES-A66721499"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "surname": "ABAD PEÃA",
//                 "givenName": "WALTER FRANCISCO",
//                 "serialNumber": "IDCEC-0953449220",
//                 "commonName": "WALTER FRANCISCO ABAD PEÃA",
//                 "extra1": "TINEC-0953449220001"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1929_PLA.pdf",
//             "numeroFirma": 2,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "4a3dd6a9",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-04-18T16:41:03.000Z",
//                 "notAfter": "2025-04-18T16:41:03.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "PRISCILA ALEXANDRA GUANOLUISA BAQUE",
//                 "serialNumber": "0930488697-180424115048",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1929_PLA.pdf",
//             "numeroFirma": 3,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "169a6dc3",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-01-30T00:10:12.000Z",
//                 "notAfter": "2026-01-29T00:10:12.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "ANDRES ALEXANDER LOPEZ MORAN",
//                 "serialNumber": "0923994792-290124192001",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1929_INF3.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "2a440d3a7c330c19",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-02-05T01:07:00.000Z",
//                 "notAfter": "2027-02-05T01:07:00.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "ES",
//                 "localityName": "Barcelona (see current address at www.uanataca.com/address)",
//                 "organizationName": "UANATACA S.A.",
//                 "organizationalUnitName": "TSP-UANATACA",
//                 "commonName": "UANATACA CA2 2016",
//                 "extra1": "VATES-A66721499"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "surname": "SALAZAR GOMEZ",
//                 "givenName": "MARIA CAROLINA",
//                 "serialNumber": "IDCEC-0921197240",
//                 "commonName": "MARIA CAROLINA SALAZAR GOMEZ"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1905_INF3.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "00ac3641e24cc613bd4e6b7e13233d4741",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-06-25T16:02:44.000Z",
//                 "notAfter": "2026-06-25T17:02:44.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "FIRMASEGURA S.A.S.",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "stateOrProvinceName": "TUNGURAHUA",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-1 FIRMASEGURA S.A.S.",
//                 "localityName": "AMBATO"
//             },
//             "sujeto": {
//                 "serialNumber": "7e8c932a-581a-4d4e-9b2c-a48466cc0f33",
//                 "emailAddress": "contadorvalle@gmail.com",
//                 "commonName": "VANESSA ELIZABETH VALLE  FRANCO",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "FIRMASEGURA S.A.S.",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1905_PLA.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "5edc1641be9cb2f6",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-12-07T15:36:00.000Z",
//                 "notAfter": "2025-12-07T15:36:00.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "ES",
//                 "localityName": "Barcelona (see current address at www.uanataca.com/address)",
//                 "organizationName": "UANATACA S.A.",
//                 "organizationalUnitName": "TSP-UANATACA",
//                 "commonName": "UANATACA CA2 2016",
//                 "extra1": "VATES-A66721499"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "surname": "ABAD PEÃA",
//                 "givenName": "WALTER FRANCISCO",
//                 "serialNumber": "IDCEC-0953449220",
//                 "commonName": "WALTER FRANCISCO ABAD PEÃA",
//                 "extra1": "TINEC-0953449220001"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1905_PLA.pdf",
//             "numeroFirma": 2,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "4a3dd6a9",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-04-18T16:41:03.000Z",
//                 "notAfter": "2025-04-18T16:41:03.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "PRISCILA ALEXANDRA GUANOLUISA BAQUE",
//                 "serialNumber": "0930488697-180424115048",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1905_PLA.pdf",
//             "numeroFirma": 3,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "169a6dc3",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-01-30T00:10:12.000Z",
//                 "notAfter": "2026-01-29T00:10:12.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "ANDRES ALEXANDER LOPEZ MORAN",
//                 "serialNumber": "0923994792-290124192001",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_2110_PLA.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "5edc1641be9cb2f6",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-12-07T15:36:00.000Z",
//                 "notAfter": "2025-12-07T15:36:00.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "ES",
//                 "localityName": "Barcelona (see current address at www.uanataca.com/address)",
//                 "organizationName": "UANATACA S.A.",
//                 "organizationalUnitName": "TSP-UANATACA",
//                 "commonName": "UANATACA CA2 2016",
//                 "extra1": "VATES-A66721499"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "surname": "ABAD PEÃA",
//                 "givenName": "WALTER FRANCISCO",
//                 "serialNumber": "IDCEC-0953449220",
//                 "commonName": "WALTER FRANCISCO ABAD PEÃA",
//                 "extra1": "TINEC-0953449220001"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_2110_PLA.pdf",
//             "numeroFirma": 2,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "4a3dd6a9",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-04-18T16:41:03.000Z",
//                 "notAfter": "2025-04-18T16:41:03.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "PRISCILA ALEXANDRA GUANOLUISA BAQUE",
//                 "serialNumber": "0930488697-180424115048",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_2110_PLA.pdf",
//             "numeroFirma": 3,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "169a6dc3",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-01-30T00:10:12.000Z",
//                 "notAfter": "2026-01-29T00:10:12.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "ANDRES ALEXANDER LOPEZ MORAN",
//                 "serialNumber": "0923994792-290124192001",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_2110_INF3.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "36ee641f",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-02-04T20:25:31.000Z",
//                 "notAfter": "2026-02-04T20:25:31.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "MARIA VIVIANA PUCUJI CHICAIZA",
//                 "serialNumber": "0502955339-040225153521",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1929_INF2.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "715f45d9892e12b0",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-08-21T14:42:02.000Z",
//                 "notAfter": "2026-08-21T14:42:02.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "PATRICIA ESTHER GAINZA RIOFRIO",
//                 "serialNumber": "0925032955-210825095152",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1905_INF2.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "715f45d9892e12b0",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-08-21T14:42:02.000Z",
//                 "notAfter": "2026-08-21T14:42:02.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "PATRICIA ESTHER GAINZA RIOFRIO",
//                 "serialNumber": "0925032955-210825095152",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1904_PLA.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "5edc1641be9cb2f6",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-12-07T15:36:00.000Z",
//                 "notAfter": "2025-12-07T15:36:00.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "ES",
//                 "localityName": "Barcelona (see current address at www.uanataca.com/address)",
//                 "organizationName": "UANATACA S.A.",
//                 "organizationalUnitName": "TSP-UANATACA",
//                 "commonName": "UANATACA CA2 2016",
//                 "extra1": "VATES-A66721499"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "surname": "ABAD PEÃA",
//                 "givenName": "WALTER FRANCISCO",
//                 "serialNumber": "IDCEC-0953449220",
//                 "commonName": "WALTER FRANCISCO ABAD PEÃA",
//                 "extra1": "TINEC-0953449220001"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1904_PLA.pdf",
//             "numeroFirma": 2,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "4a3dd6a9",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-04-18T16:41:03.000Z",
//                 "notAfter": "2025-04-18T16:41:03.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "PRISCILA ALEXANDRA GUANOLUISA BAQUE",
//                 "serialNumber": "0930488697-180424115048",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1904_PLA.pdf",
//             "numeroFirma": 3,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "169a6dc3",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-01-30T00:10:12.000Z",
//                 "notAfter": "2026-01-29T00:10:12.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "ANDRES ALEXANDER LOPEZ MORAN",
//                 "serialNumber": "0923994792-290124192001",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1904_INF3.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "0f93d119",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-02-04T21:43:35.000Z",
//                 "notAfter": "2026-02-04T21:43:35.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "EVA ALEXANDRA MOROCHO CORRALES",
//                 "serialNumber": "0922592886-040225165329",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1817_PLA.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "5edc1641be9cb2f6",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-12-07T15:36:00.000Z",
//                 "notAfter": "2025-12-07T15:36:00.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "ES",
//                 "localityName": "Barcelona (see current address at www.uanataca.com/address)",
//                 "organizationName": "UANATACA S.A.",
//                 "organizationalUnitName": "TSP-UANATACA",
//                 "commonName": "UANATACA CA2 2016",
//                 "extra1": "VATES-A66721499"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "surname": "ABAD PEÃA",
//                 "givenName": "WALTER FRANCISCO",
//                 "serialNumber": "IDCEC-0953449220",
//                 "commonName": "WALTER FRANCISCO ABAD PEÃA",
//                 "extra1": "TINEC-0953449220001"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1817_PLA.pdf",
//             "numeroFirma": 2,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "4a3dd6a9",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-04-18T16:41:03.000Z",
//                 "notAfter": "2025-04-18T16:41:03.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "PRISCILA ALEXANDRA GUANOLUISA BAQUE",
//                 "serialNumber": "0930488697-180424115048",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1817_PLA.pdf",
//             "numeroFirma": 3,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "169a6dc3",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-01-30T00:10:12.000Z",
//                 "notAfter": "2026-01-29T00:10:12.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "ANDRES ALEXANDER LOPEZ MORAN",
//                 "serialNumber": "0923994792-290124192001",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1817_INF3.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "4a3dd6a9",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-04-18T16:41:03.000Z",
//                 "notAfter": "2025-04-18T16:41:03.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "PRISCILA ALEXANDRA GUANOLUISA BAQUE",
//                 "serialNumber": "0930488697-180424115048",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1817_INF2.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "5edc1641be9cb2f6",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2024-12-07T15:36:00.000Z",
//                 "notAfter": "2025-12-07T15:36:00.000Z"
//             },
//             "estado": "Vencida",
//             "editor": {
//                 "countryName": "ES",
//                 "localityName": "Barcelona (see current address at www.uanataca.com/address)",
//                 "organizationName": "UANATACA S.A.",
//                 "organizationalUnitName": "TSP-UANATACA",
//                 "commonName": "UANATACA CA2 2016",
//                 "extra1": "VATES-A66721499"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "surname": "ABAD PEÃA",
//                 "givenName": "WALTER FRANCISCO",
//                 "serialNumber": "IDCEC-0953449220",
//                 "commonName": "WALTER FRANCISCO ABAD PEÃA",
//                 "extra1": "TINEC-0953449220001"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1906_INF2.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "715f45d9892e12b0",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-08-21T14:42:02.000Z",
//                 "notAfter": "2026-08-21T14:42:02.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "PATRICIA ESTHER GAINZA RIOFRIO",
//                 "serialNumber": "0925032955-210825095152",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_2110_INF2.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "715f45d9892e12b0",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-08-21T14:42:02.000Z",
//                 "notAfter": "2026-08-21T14:42:02.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "PATRICIA ESTHER GAINZA RIOFRIO",
//                 "serialNumber": "0925032955-210825095152",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1904_INF2.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "715f45d9892e12b0",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-08-21T14:42:02.000Z",
//                 "notAfter": "2026-08-21T14:42:02.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "commonName": "PATRICIA ESTHER GAINZA RIOFRIO",
//                 "serialNumber": "0925032955-210825095152",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "countryName": "EC"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_2110_INF1.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "41bbd251",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2019-10-15T21:20:12.000Z",
//                 "notAfter": "2039-10-06T21:20:12.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1817_INF1.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "41bbd251",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2019-10-15T21:20:12.000Z",
//                 "notAfter": "2039-10-06T21:20:12.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1929_INF1.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "41bbd251",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2019-10-15T21:20:12.000Z",
//                 "notAfter": "2039-10-06T21:20:12.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1906_INF1.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "41bbd251",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2019-10-15T21:20:12.000Z",
//                 "notAfter": "2039-10-06T21:20:12.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1905_INF1.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "41bbd251",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2019-10-15T21:20:12.000Z",
//                 "notAfter": "2039-10-06T21:20:12.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
//             }
//         },
//         {
//             "archivo": "CHIMBORAZO_1904_INF1.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 3,
//             "version": 2,
//             "serial": "41bbd251",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2019-10-15T21:20:12.000Z",
//                 "notAfter": "2039-10-06T21:20:12.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
//             },
//             "sujeto": {
//                 "countryName": "EC",
//                 "organizationName": "SECURITY DATA S.A. 2",
//                 "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
//                 "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 29-01-2026.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "67510f1002de5dd46a063f010cd3e95fc5238156",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-07-08T15:25:06.000Z",
//                 "notAfter": "2026-07-08T15:25:06.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "1000163533",
//                 "commonName": "jose luis piÃ±eros barreto",
//                 "emailAddress": "jpineros@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "1000163533",
//                 "commonName": "jose luis piÃ±eros barreto",
//                 "emailAddress": "jpineros@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 29-01-2026.pdf",
//             "numeroFirma": 2,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "04bb7fd6fcfdad09cebe8db982b4a3161081da90",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-07-08T17:10:49.000Z",
//                 "notAfter": "2026-07-08T17:10:49.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "1024542358",
//                 "commonName": "anyie lorena aguirre aguirre",
//                 "emailAddress": "aaguirre@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "1024542358",
//                 "commonName": "anyie lorena aguirre aguirre",
//                 "emailAddress": "aaguirre@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 29-01-2026.pdf",
//             "numeroFirma": 3,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "01",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-12-16T15:22:53.000Z",
//                 "notAfter": "2026-12-16T15:22:52.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "commonName": "Johan Nicolas Rojas Jiménez",
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogotá D.C",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S"
//             },
//             "sujeto": {
//                 "commonName": "Johan Nicolas Rojas Jiménez",
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogotá D.C",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 29-01-2026.pdf",
//             "numeroFirma": 4,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "01",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-12-10T22:05:59.000Z",
//                 "notAfter": "2026-12-10T22:05:59.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "commonName": "Luis Angel Sarmiento Diaz",
//                 "countryName": "CO",
//                 "localityName": "Bogotá D.C",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S"
//             },
//             "sujeto": {
//                 "commonName": "Luis Angel Sarmiento Diaz",
//                 "countryName": "CO",
//                 "localityName": "Bogotá D.C",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 29-01-2026.pdf",
//             "numeroFirma": 5,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "637e5cf958dae4008753502359819f8ea3daef85",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2026-01-07T17:50:28.000Z",
//                 "notAfter": "2027-01-07T17:50:28.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS-Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "Brayan Esteban Gutierrez Silva",
//                 "emailAddress": "ssss"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS-Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "Brayan Esteban Gutierrez Silva",
//                 "emailAddress": "ssss"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 29-01-2026.pdf",
//             "numeroFirma": 6,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "74b99e50028dfde705f59ac6602cbdcd3a39092f",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2026-01-27T16:46:26.000Z",
//                 "notAfter": "2027-01-27T16:46:26.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "Yoimer Andres Manyoma Ramirez",
//                 "emailAddress": "soporte@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "Yoimer Andres Manyoma Ramirez",
//                 "emailAddress": "soporte@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 29-01-2026.pdf",
//             "numeroFirma": 7,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "01",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-12-01T21:26:56.000Z",
//                 "notAfter": "2027-12-01T21:26:56.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "commonName": "Anderson Ivan Forero Ramirez",
//                 "emailAddress": "andiforero@soy.sena.edu.co",
//                 "countryName": "CO",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "35"
//             },
//             "sujeto": {
//                 "commonName": "Anderson Ivan Forero Ramirez",
//                 "emailAddress": "andiforero@soy.sena.edu.co",
//                 "countryName": "CO",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "35"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 29-01-2026.pdf",
//             "numeroFirma": 8,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "7f29f83c37fcd19b929320bd2d74866e4fc15226",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2026-01-06T14:16:22.000Z",
//                 "notAfter": "2027-01-06T14:16:22.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS-Aciel Soluciones Integrales",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "David Alejandro Claros",
//                 "emailAddress": "dclaros@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS-Aciel Soluciones Integrales",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "David Alejandro Claros",
//                 "emailAddress": "dclaros@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 29-01-2026.pdf",
//             "numeroFirma": 9,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "1be9d24a7a4814d9143b13d6d54377815b7ccf89",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-06-26T15:00:58.000Z",
//                 "notAfter": "2026-06-26T15:00:58.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "80243453",
//                 "commonName": "sigilfredo lara gonzalez",
//                 "emailAddress": "slara@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "80243453",
//                 "commonName": "sigilfredo lara gonzalez",
//                 "emailAddress": "slara@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 27-01-2026.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "04bb7fd6fcfdad09cebe8db982b4a3161081da90",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-07-08T17:10:49.000Z",
//                 "notAfter": "2026-07-08T17:10:49.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "1024542358",
//                 "commonName": "anyie lorena aguirre aguirre",
//                 "emailAddress": "aaguirre@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "1024542358",
//                 "commonName": "anyie lorena aguirre aguirre",
//                 "emailAddress": "aaguirre@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 27-01-2026.pdf",
//             "numeroFirma": 2,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "01",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-12-16T15:22:53.000Z",
//                 "notAfter": "2026-12-16T15:22:52.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "commonName": "Johan Nicolas Rojas Jiménez",
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogotá D.C",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S"
//             },
//             "sujeto": {
//                 "commonName": "Johan Nicolas Rojas Jiménez",
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogotá D.C",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 27-01-2026.pdf",
//             "numeroFirma": 3,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "01",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-12-10T22:05:59.000Z",
//                 "notAfter": "2026-12-10T22:05:59.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "commonName": "Luis Angel Sarmiento Diaz",
//                 "countryName": "CO",
//                 "localityName": "Bogotá D.C",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S"
//             },
//             "sujeto": {
//                 "commonName": "Luis Angel Sarmiento Diaz",
//                 "countryName": "CO",
//                 "localityName": "Bogotá D.C",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 27-01-2026.pdf",
//             "numeroFirma": 4,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "637e5cf958dae4008753502359819f8ea3daef85",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2026-01-07T17:50:28.000Z",
//                 "notAfter": "2027-01-07T17:50:28.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS-Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "Brayan Esteban Gutierrez Silva",
//                 "emailAddress": "ssss"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS-Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "Brayan Esteban Gutierrez Silva",
//                 "emailAddress": "ssss"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 27-01-2026.pdf",
//             "numeroFirma": 5,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "74b99e50028dfde705f59ac6602cbdcd3a39092f",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2026-01-27T16:46:26.000Z",
//                 "notAfter": "2027-01-27T16:46:26.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "Yoimer Andres Manyoma Ramirez",
//                 "emailAddress": "soporte@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "Yoimer Andres Manyoma Ramirez",
//                 "emailAddress": "soporte@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 27-01-2026.pdf",
//             "numeroFirma": 6,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "01",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-12-01T21:26:56.000Z",
//                 "notAfter": "2027-12-01T21:26:56.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "commonName": "Anderson Ivan Forero Ramirez",
//                 "emailAddress": "andiforero@soy.sena.edu.co",
//                 "countryName": "CO",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "35"
//             },
//             "sujeto": {
//                 "commonName": "Anderson Ivan Forero Ramirez",
//                 "emailAddress": "andiforero@soy.sena.edu.co",
//                 "countryName": "CO",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "35"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 27-01-2026.pdf",
//             "numeroFirma": 7,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "7f29f83c37fcd19b929320bd2d74866e4fc15226",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2026-01-06T14:16:22.000Z",
//                 "notAfter": "2027-01-06T14:16:22.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS-Aciel Soluciones Integrales",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "David Alejandro Claros",
//                 "emailAddress": "dclaros@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS-Aciel Soluciones Integrales",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "David Alejandro Claros",
//                 "emailAddress": "dclaros@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 27-01-2026.pdf",
//             "numeroFirma": 8,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "67510f1002de5dd46a063f010cd3e95fc5238156",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-07-08T15:25:06.000Z",
//                 "notAfter": "2026-07-08T15:25:06.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "1000163533",
//                 "commonName": "jose luis piÃ±eros barreto",
//                 "emailAddress": "jpineros@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "1000163533",
//                 "commonName": "jose luis piÃ±eros barreto",
//                 "emailAddress": "jpineros@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 27-01-2026.pdf",
//             "numeroFirma": 9,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "1be9d24a7a4814d9143b13d6d54377815b7ccf89",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-06-26T15:00:58.000Z",
//                 "notAfter": "2026-06-26T15:00:58.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "80243453",
//                 "commonName": "sigilfredo lara gonzalez",
//                 "emailAddress": "slara@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "80243453",
//                 "commonName": "sigilfredo lara gonzalez",
//                 "emailAddress": "slara@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 19-01-2026.pdf",
//             "numeroFirma": 1,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "04bb7fd6fcfdad09cebe8db982b4a3161081da90",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-07-08T17:10:49.000Z",
//                 "notAfter": "2026-07-08T17:10:49.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "1024542358",
//                 "commonName": "anyie lorena aguirre aguirre",
//                 "emailAddress": "aaguirre@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "1024542358",
//                 "commonName": "anyie lorena aguirre aguirre",
//                 "emailAddress": "aaguirre@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 19-01-2026.pdf",
//             "numeroFirma": 2,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "01",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-12-16T15:22:53.000Z",
//                 "notAfter": "2026-12-16T15:22:52.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "commonName": "Johan Nicolas Rojas Jiménez",
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogotá D.C",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S"
//             },
//             "sujeto": {
//                 "commonName": "Johan Nicolas Rojas Jiménez",
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogotá D.C",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 19-01-2026.pdf",
//             "numeroFirma": 3,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "01",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-12-10T22:05:59.000Z",
//                 "notAfter": "2026-12-10T22:05:59.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "commonName": "Luis Angel Sarmiento Diaz",
//                 "countryName": "CO",
//                 "localityName": "Bogotá D.C",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S"
//             },
//             "sujeto": {
//                 "commonName": "Luis Angel Sarmiento Diaz",
//                 "countryName": "CO",
//                 "localityName": "Bogotá D.C",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 19-01-2026.pdf",
//             "numeroFirma": 4,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "637e5cf958dae4008753502359819f8ea3daef85",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2026-01-07T17:50:28.000Z",
//                 "notAfter": "2027-01-07T17:50:28.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS-Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "Brayan Esteban Gutierrez Silva",
//                 "emailAddress": "ssss"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS-Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "Brayan Esteban Gutierrez Silva",
//                 "emailAddress": "ssss"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 19-01-2026.pdf",
//             "numeroFirma": 5,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "74b99e50028dfde705f59ac6602cbdcd3a39092f",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2026-01-27T16:46:26.000Z",
//                 "notAfter": "2027-01-27T16:46:26.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "Yoimer Andres Manyoma Ramirez",
//                 "emailAddress": "soporte@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "Yoimer Andres Manyoma Ramirez",
//                 "emailAddress": "soporte@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 19-01-2026.pdf",
//             "numeroFirma": 6,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "01",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-12-01T21:26:56.000Z",
//                 "notAfter": "2027-12-01T21:26:56.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "commonName": "Anderson Ivan Forero Ramirez",
//                 "emailAddress": "andiforero@soy.sena.edu.co",
//                 "countryName": "CO",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "35"
//             },
//             "sujeto": {
//                 "commonName": "Anderson Ivan Forero Ramirez",
//                 "emailAddress": "andiforero@soy.sena.edu.co",
//                 "countryName": "CO",
//                 "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "35"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 19-01-2026.pdf",
//             "numeroFirma": 7,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "7f29f83c37fcd19b929320bd2d74866e4fc15226",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2026-01-06T14:16:22.000Z",
//                 "notAfter": "2027-01-06T14:16:22.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS-Aciel Soluciones Integrales",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "David Alejandro Claros",
//                 "emailAddress": "dclaros@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "Bogota",
//                 "organizationName": "ACS-Aciel Soluciones Integrales",
//                 "organizationalUnitName": "Sistemas",
//                 "commonName": "David Alejandro Claros",
//                 "emailAddress": "dclaros@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 19-01-2026.pdf",
//             "numeroFirma": 8,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "67510f1002de5dd46a063f010cd3e95fc5238156",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-07-08T15:25:06.000Z",
//                 "notAfter": "2026-07-08T15:25:06.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "1000163533",
//                 "commonName": "jose luis piÃ±eros barreto",
//                 "emailAddress": "jpineros@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "1000163533",
//                 "commonName": "jose luis piÃ±eros barreto",
//                 "emailAddress": "jpineros@aciel.co"
//             }
//         },
//         {
//             "archivo": "F-ACS-01 ACTA-V2 19-01-2026.pdf",
//             "numeroFirma": 9,
//             "totalCertificadosCadena": 1,
//             "version": 2,
//             "serial": "1be9d24a7a4814d9143b13d6d54377815b7ccf89",
//             "oidFirma": "1.2.840.113549.1.1.11",
//             "validacion": {
//                 "notBefore": "2025-06-26T15:00:58.000Z",
//                 "notAfter": "2026-06-26T15:00:58.000Z"
//             },
//             "estado": "Disponible",
//             "editor": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "80243453",
//                 "commonName": "sigilfredo lara gonzalez",
//                 "emailAddress": "slara@aciel.co"
//             },
//             "sujeto": {
//                 "countryName": "CO",
//                 "stateOrProvinceName": "Cundinamarca",
//                 "localityName": "BogotÃ¡",
//                 "organizationName": "ACS-Aceil Soluciones Integrales S.A.S",
//                 "organizationalUnitName": "80243453",
//                 "commonName": "sigilfredo lara gonzalez",
//                 "emailAddress": "slara@aciel.co"
//             }
//         }
//     ]

// })
// .then((res)=>{
//     console.log(res);
// })
// .catch((error)=>{
//     console.log(error);
// })



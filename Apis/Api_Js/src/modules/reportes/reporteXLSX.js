/* Librerias */
import { error } from 'console';
import excelJs from 'exceljs';

export const reporteXLSX = async ({listaObjetos}) =>{
    try {
        const libro = new excelJs.Workbook();

        /* Informacion básica del libro */
        libro.creator = 'Soporte Acs';
        libro.lastModifiedBy = 'Soporte Acs';
        libro.created = new Date();
        libro.modified = new Date(); 
        libro.lastPrinted = new Date(); 
        libro.company = 'ACS - Aciel Soluciones Integrales S.A.S';
        libro.description = 'Libro de reportes'

        /* Hoja 1 */
        const hoja1 = libro.addWorksheet('Hoja 1', {
            headerFooter:{
                firstHeader:"Hola",
                firstFooter:"Adios"
            }
        }); 

        /* Agregar Columnas */
        let columnas = obtenerColumnas(listaObjetos);

        hoja1.columns = [
            { header: 'Id', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 32 },
            { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
        ];

        /* Agregar Filas */
        hoja1.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});
        hoja1.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});
        hoja1.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});


        /* Crear libro */
        await libro.xlsx.writeFile('./reporte.xlsx'); 

        return true; 
    } catch (error) {
        throw new Error(`Error al generar archivo:${error.message}`); 
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


reporteXLSX({listaObjetos:[
        {
            "archivo": "pruebPdf.pdf",
            "numeroFirma": 1,
            "totalCertificadosCadena": 1,
            "version": 2,
            "serial": "00",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2026-01-30T18:02:20.000Z",
                "notAfter": "2026-04-30T18:02:20.000Z"
            },
            "estado": "Disponible",
            "editor": {
                "commonName": "Sigilfredo Lara Gonzalez",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "sujeto": {
                "commonName": "Sigilfredo Lara Gonzalez",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            }
        },
        {
            "archivo": "pruebPdf.pdf",
            "numeroFirma": 2,
            "totalCertificadosCadena": 1,
            "version": 2,
            "serial": "00",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2026-01-30T18:02:19.000Z",
                "notAfter": "2026-04-30T18:02:19.000Z"
            },
            "estado": "Disponible",
            "editor": {
                "commonName": "Anderson Ivan Forero Ramírez",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "sujeto": {
                "commonName": "Anderson Ivan Forero Ramírez",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            }
        },
        {
            "archivo": "pruebPdf.pdf",
            "numeroFirma": 3,
            "totalCertificadosCadena": 1,
            "version": 2,
            "serial": "00",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2026-01-30T18:02:20.000Z",
                "notAfter": "2026-04-30T18:02:20.000Z"
            },
            "estado": "Disponible",
            "editor": {
                "commonName": "Anyie Lorena Aguirre Aguirre",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "sujeto": {
                "commonName": "Anyie Lorena Aguirre Aguirre",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            }
        },
        {
            "archivo": "pruebPdf.pdf",
            "numeroFirma": 4,
            "totalCertificadosCadena": 1,
            "version": 2,
            "serial": "00",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2026-01-30T17:49:36.000Z",
                "notAfter": "2026-04-30T17:49:36.000Z"
            },
            "estado": "Disponible",
            "editor": {
                "commonName": "Brayan Camilo Garcia Martinez",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "sujeto": {
                "commonName": "Brayan Camilo Garcia Martinez",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            }
        },
        {
            "archivo": "pruebPdf.pdf",
            "numeroFirma": 5,
            "totalCertificadosCadena": 1,
            "version": 2,
            "serial": "090000000000000000090000",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2026-01-30T18:02:20.000Z",
                "notAfter": "2026-04-30T18:02:20.000Z"
            },
            "estado": "Disponible",
            "editor": {
                "commonName": "Brayan Esteban Gutierrez Silva",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "sujeto": {
                "commonName": "Brayan Esteban Gutierrez Silva",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            }
        },
        {
            "archivo": "pruebPdf.pdf",
            "numeroFirma": 6,
            "totalCertificadosCadena": 1,
            "version": 2,
            "serial": "00",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2026-01-30T18:02:20.000Z",
                "notAfter": "2026-04-30T18:02:20.000Z"
            },
            "estado": "Disponible",
            "editor": {
                "commonName": "David Alejandro Claros Peña",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "sujeto": {
                "commonName": "David Alejandro Claros Peña",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            }
        },
        {
            "archivo": "pruebPdf.pdf",
            "numeroFirma": 7,
            "totalCertificadosCadena": 1,
            "version": 2,
            "serial": "00",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2026-01-30T18:02:20.000Z",
                "notAfter": "2026-04-30T18:02:20.000Z"
            },
            "estado": "Disponible",
            "editor": {
                "commonName": "Jose Luis Piñeros Barreto",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "sujeto": {
                "commonName": "Jose Luis Piñeros Barreto",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            }
        },
        {
            "archivo": "CHIMBORAZO_1817_INF1.pdf",
            "numeroFirma": 1,
            "totalCertificadosCadena": 3,
            "version": 2,
            "serial": "41bbd251",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2019-10-15T21:20:12.000Z",
                "notAfter": "2039-10-06T21:20:12.000Z"
            },
            "estado": "Disponible",
            "editor": {
                "countryName": "EC",
                "organizationName": "SECURITY DATA S.A. 2",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
            },
            "sujeto": {
                "countryName": "EC",
                "organizationName": "SECURITY DATA S.A. 2",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
            }
        },
        {
            "archivo": "CHIMBORAZO_1817_INF2.pdf",
            "numeroFirma": 1,
            "totalCertificadosCadena": 1,
            "version": 2,
            "serial": "5edc1641be9cb2f6",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2024-12-07T15:36:00.000Z",
                "notAfter": "2025-12-07T15:36:00.000Z"
            },
            "estado": "Vencida",
            "editor": {
                "countryName": "ES",
                "localityName": "Barcelona (see current address at www.uanataca.com/address)",
                "organizationName": "UANATACA S.A.",
                "organizationalUnitName": "TSP-UANATACA",
                "commonName": "UANATACA CA2 2016",
                "extra1": "VATES-A66721499"
            },
            "sujeto": {
                "countryName": "EC",
                "surname": "ABAD PEÃA",
                "givenName": "WALTER FRANCISCO",
                "serialNumber": "IDCEC-0953449220",
                "commonName": "WALTER FRANCISCO ABAD PEÃA",
                "extra1": "TINEC-0953449220001"
            }
        },
        {
            "archivo": "CHIMBORAZO_1817_INF3.pdf",
            "numeroFirma": 1,
            "totalCertificadosCadena": 3,
            "version": 2,
            "serial": "4a3dd6a9",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2024-04-18T16:41:03.000Z",
                "notAfter": "2025-04-18T16:41:03.000Z"
            },
            "estado": "Vencida",
            "editor": {
                "countryName": "EC",
                "organizationName": "SECURITY DATA S.A. 2",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
            },
            "sujeto": {
                "commonName": "PRISCILA ALEXANDRA GUANOLUISA BAQUE",
                "serialNumber": "0930488697-180424115048",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "organizationName": "SECURITY DATA S.A. 2",
                "countryName": "EC"
            }
        },
        {
            "archivo": "CHIMBORAZO_1817_PLA.pdf",
            "numeroFirma": 1,
            "totalCertificadosCadena": 1,
            "version": 2,
            "serial": "5edc1641be9cb2f6",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2024-12-07T15:36:00.000Z",
                "notAfter": "2025-12-07T15:36:00.000Z"
            },
            "estado": "Vencida",
            "editor": {
                "countryName": "ES",
                "localityName": "Barcelona (see current address at www.uanataca.com/address)",
                "organizationName": "UANATACA S.A.",
                "organizationalUnitName": "TSP-UANATACA",
                "commonName": "UANATACA CA2 2016",
                "extra1": "VATES-A66721499"
            },
            "sujeto": {
                "countryName": "EC",
                "surname": "ABAD PEÃA",
                "givenName": "WALTER FRANCISCO",
                "serialNumber": "IDCEC-0953449220",
                "commonName": "WALTER FRANCISCO ABAD PEÃA",
                "extra1": "TINEC-0953449220001"
            }
        },
        {
            "archivo": "CHIMBORAZO_1817_PLA.pdf",
            "numeroFirma": 2,
            "totalCertificadosCadena": 3,
            "version": 2,
            "serial": "4a3dd6a9",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2024-04-18T16:41:03.000Z",
                "notAfter": "2025-04-18T16:41:03.000Z"
            },
            "estado": "Vencida",
            "editor": {
                "countryName": "EC",
                "organizationName": "SECURITY DATA S.A. 2",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
            },
            "sujeto": {
                "commonName": "PRISCILA ALEXANDRA GUANOLUISA BAQUE",
                "serialNumber": "0930488697-180424115048",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "organizationName": "SECURITY DATA S.A. 2",
                "countryName": "EC"
            }
        },
        {
            "archivo": "CHIMBORAZO_1817_PLA.pdf",
            "numeroFirma": 3,
            "totalCertificadosCadena": 3,
            "version": 2,
            "serial": "169a6dc3",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2024-01-30T00:10:12.000Z",
                "notAfter": "2026-01-29T00:10:12.000Z"
            },
            "estado": "Vencida",
            "editor": {
                "countryName": "EC",
                "organizationName": "SECURITY DATA S.A. 2",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
            },
            "sujeto": {
                "commonName": "ANDRES ALEXANDER LOPEZ MORAN",
                "serialNumber": "0923994792-290124192001",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "organizationName": "SECURITY DATA S.A. 2",
                "countryName": "EC"
            }
        }
    ]})
.then((res)=>{
    console.log(res)
})
.catch((error)=>{
    console.log(error)
})
/* Liberias */
import * as csv from 'csv';
import { arch } from 'node:os';

export const reporteCSV = async ({pathArchivo, objetoCertificados}) => {
    try {
        csv.generate({
            columns: 1,
            delimiter: ";",
            length: 2,
            encoding: 'utf-8'
        }).pipe(process.stdout);
        return null; 
    } catch (error) {
        throw new Error(`Se ha presentado un error al generar el CSV:${error.message}`);
    }
}

reporteCSV({pathArchivo:"./aa", objetoCertificados:""})
.then((res)=>{
    console.log(res);
})
.catch((error)=>{
    console.log(error);
})

/* FUNCIONES AUXILIARES */
const obtenerColumnas = (listaObjetos) => {
    let listaItems = [];
    let listaEditor = []; 
    let listaSujeto = []; 
    
    try {
        

        return listaItems;
    } catch (error) {
        throw new Error(`Error al obtener las columnas:${error.message}`)
    }
}


console.log(obtenerColumnas(
        [
        {
            "numeroFirma": 1,
            "version": 2,
            "serial": "7c1b5e53263c6cb8",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2025-01-13T16:06:00.000Z",
                "notAfter": "2027-01-13T16:06:00.000Z"
            },
            "issuer": {
                "countryName": "ES",
                "localityName": "Barcelona (see current address at www.uanataca.com/address)",
                "organizationName": "UANATACA S.A.",
                "organizationalUnitName": "TSP-UANATACA",
                "commonName": "UANATACA CA2 2016",
                "extra1": "VATES-A66721499"
            },
            "subject": {
                "countryName": "EC",
                "surname": "ZAPATIER GAMARRA",
                "givenName": "VIANCA VERONA",
                "serialNumber": "IDCEC-1204467029",
                "commonName": "VIANCA VERONA ZAPATIER GAMARRA"
            },
            "totalCertificadosCadena": 1,
            "estado": "Disponible"
        },
        {
            "numeroFirma": 2,
            "version": 2,
            "serial": "4a3dd6a9",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2024-04-18T16:41:03.000Z",
                "notAfter": "2025-04-18T16:41:03.000Z"
            },
            "issuer": {
                "countryName": "EC",
                "organizationName": "SECURITY DATA S.A. 2",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
            },
            "subject": {
                "commonName": "PRISCILA ALEXANDRA GUANOLUISA BAQUE",
                "serialNumber": "0930488697-180424115048",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "organizationName": "SECURITY DATA S.A. 2",
                "countryName": "EC"
            },
            "totalCertificadosCadena": 3,
            "estado": "Vencida"
        },
        {
            "numeroFirma": 3,
            "version": 2,
            "serial": "169a6dc3",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2024-01-30T00:10:12.000Z",
                "notAfter": "2026-01-29T00:10:12.000Z"
            },
            "issuer": {
                "countryName": "EC",
                "organizationName": "SECURITY DATA S.A. 2",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "commonName": "AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA"
            },
            "subject": {
                "commonName": "ANDRES ALEXANDER LOPEZ MORAN",
                "serialNumber": "0923994792-290124192001",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "organizationName": "SECURITY DATA S.A. 2",
                "countryName": "EC"
            },
            "totalCertificadosCadena": 3,
            "estado": "Vencida"
        },
        {
            "numeroFirma": 4,
            "version": 2,
            "serial": "41bbd251",
            "oidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2019-10-15T21:20:12.000Z",
                "notAfter": "2039-10-06T21:20:12.000Z"
            },
            "issuer": {
                "countryName": "EC",
                "organizationName": "SECURITY DATA S.A. 2",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
            },
            "subject": {
                "countryName": "EC",
                "organizationName": "SECURITY DATA S.A. 2",
                "organizationalUnitName": "ENTIDAD DE CERTIFICACION DE INFORMACION",
                "commonName": "AUTORIDAD DE CERTIFICACION RAIZ CA-2 SECURITY DATA"
            },
            "totalCertificadosCadena": 3,
            "estado": "Disponible"
        }
    ]))
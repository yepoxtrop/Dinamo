# ⚙️ Modulos
Los diferentes modulos que encuentre en esta seccion son el esqueleto del Dinamo, entre la combinacion de los mismos se forman los controladores del aplicativo.\
Caracteristicas generales de los modulos existentes:
- La mayoria son asincronos.
- Varios integran el uso de las diferentes librerias mencionadas en el `README.md` del API.
- Muchos de ellos retornan objetos directamente.
- Los parametros de los modulos se reciben de forma desestructurada.

## 📄 Analizar Documentos PDF(Node-Forge)
El modulo que se encarga de **analizar documentos pdf** tanto para verificar su estado y generar su respectivo reporte o para validar el documento antes de ser firmado.\
El modulo lo encuentra en el siguiente fichero `Dinamo\Back\Apis\Api_Js\src\modules\analizarDocumentosPDF\analizarDocumentoPDF.js`, dentro del mismo encontrara las siguientes funciones:
- **analizarDocumentoPDF:** Es la función principal del modulo, y es la que unicamente se puede exportar para ser usada en otras partes del código. El modulo únicmanete recibe un solo parametro que es `pathDocumento`, como el nombre de la variable lo indica la funcion recibe un path de un archivo pdf existente, este se encargara lo siguiente:
    - Verificar que el documento sea un archivo pdf verificando en la version strign de su buffer la existencia de la etiqueta `%PDF-`.
    - Con las expresiones regulares se buscan la etiqueta `/ByteRange` y `/Type/Sig`, estas etiquetas serviran para encontrar las formas y sus rangos en el documento pdf, si la ultima etiqueta no existe, signifca que no hay firmas en el documento pdf.
    - Decodificar la cadena hexadecimal de la firma pasando de hexadecimal a bytes, luego de bytes a asn.1, lugo de asn.1 a pkcs7
    - Con la versión pkcs7 de la firma se obtiene la información completa de las firmas.
Use la funcón de la siguiente forma:
```javascript
analizarDocumentoPDF({pathDocumento:'Dinamo/Docs/DocumentosFirmas/docPrueba.pdf'})
.then((res)=>{console.log(res)})
.catch((err)=>{console.log(err))

//Si todo esta bien la funcion debera de retornarle un objeto de la siguiente forma
{
    "Mensaje": "Peticion Recibida",
    "Resultado": [
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
    ]
}
```
- **decodificarFirmaHexa:** Esta funcion se encarga de recibir el string hexadecimal que coincide con la expresion regular para capturar las firmas en el documento pdf, la funcion se encargara de de recibir el string, convertirlo a bytes y luego hacer a asn.1 ignorando el padding de 0x00 que hay en la firma, posterior a ello realizara la conversion a pkcs7.
- **obtenerAtributosCert:** Esta funcion se encarga de recibir una lista que incluye objetos con la informacion de la autoridad certificadora o el firmante, a partir de ello se buscan las etiquetas name, shortName o si no existe ninguna de esas dos pero si una etiqueta llamada extra.
- **validarVencimientoFirma** Esta funcion calcula el estado de la firma segun su fecha de validacion, por ende hay tres estados posibles: `Disponible`, `Vencida`, `No disponible aun`.

## 🪪 Base de Datos(Prisma)

## 📧 Correos(NodeMailer)

## 🛜 Dominio(Ldaps)

## 🔏 Tokens(Jwt)

# 💀 Observaciones

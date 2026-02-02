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
            "serial": "00",
            "OidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2026-01-30T18:02:20.000Z",
                "notAfter": "2026-04-30T18:02:20.000Z"
            },
            "issuer": {
                "commonName": "Sigilfredo Lara Gonzalez",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "subject": {
                "commonName": "Sigilfredo Lara Gonzalez",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "totalCertificadosCadena": 1
        },
        {
            "numeroFirma": 2,
            "version": 2,
            "serial": "00",
            "OidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2026-01-30T18:02:19.000Z",
                "notAfter": "2026-04-30T18:02:19.000Z"
            },
            "issuer": {
                "commonName": "Anderson Ivan Forero Ramírez",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "subject": {
                "commonName": "Anderson Ivan Forero Ramírez",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "totalCertificadosCadena": 1
        },
        {
            "numeroFirma": 3,
            "version": 2,
            "serial": "00",
            "OidFirma": "1.2.840.113549.1.1.11",
            "validacion": {
                "notBefore": "2026-01-30T18:02:20.000Z",
                "notAfter": "2026-04-30T18:02:20.000Z"
            },
            "issuer": {
                "commonName": "Anyie Lorena Aguirre Aguirre",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "subject": {
                "commonName": "Anyie Lorena Aguirre Aguirre",
                "countryName": "CO",
                "stateOrProvinceName": "Cundinamarca",
                "localityName": "Bogota D.C",
                "organizationName": "ACS - Aciel Soluciones Integrales S.A.S",
                "organizationalUnitName": "Sistemas"
            },
            "totalCertificadosCadena": 1
        }
    ]
}

```
- **decodificarFirmaHexa:**
- **obtenerAtributosCert:**

## 🪪 Base de Datos(Prisma)

## 📧 Correos(NodeMailer)

## 🛜 Dominio(Ldaps)

## 🔏 Tokens(Jwt)

# 💀 Observaciones

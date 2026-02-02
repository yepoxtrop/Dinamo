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
- **analizarDocumentoPDF:** Es la función principal del modulo, y es la que unicamente se puede exportar para ser usada en otras partes del código. El modulo únicmanete recibe un solo parametro que es `pathDocumento`
```
console.log('')

```
- **decodificarFirmaHexa:**
- **obtenerAtributosCert:**

## 🪪 Base de Datos(Prisma)

## 📧 Correos(NodeMailer)

## 🛜 Dominio(Ldaps)

## 🔏 Tokens(Jwt)

# 💀 Observaciones

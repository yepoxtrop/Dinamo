# 🔍 Analizar Documentos PDF

La función central `analizarDocumentoPDF({ arrayArchivos })` se encarga de examinar el contenido
binario de uno o varios archivos PDF y extraer las firmas digitales que contengan. Utiliza expresiones
regulares para localizar los rangos de bytes de las firmas y `node-forge` para decodificar la estructura
PKCS#7 de cada firma.

### Qué devuelve
Un array de objetos donde cada entrada representa un documento; la clave es el nombre original y el
valor incluye información general del archivo y un subarray con cada firma encontrada.

### Campos principales
- `NombreDocumento` – nombre del fichero.
- `EstadoArchivo` – estado global del documento (Válido, Inválido, etc.).
- `NumeroFirmas` – total de firmas detectadas.
- `NumeroFirmasVencidas` – cuántas de esas firmas tienen certificados expirados.
- `Firmas` – lista de objetos `Firma_N` con detalles del certificado.

### Ejemplo de salida
```json
[
  {
    "Documento1.pdf": {
      "NombreDocumento": "Documento1.pdf",
      "EstadoArchivo": "Válido",
      "NumeroFirmas": 1,
      "NumeroFirmasVencidas": 0,
      "Firmas": [
        {
          "Firma_1": {
            "NumeroFirma": 1,
            "Version": 3,
            "Serial": "00AB34...",
            "OidFirma": "1.2.840.113549.1.1.11",
            "FechaDeCreacion": "2026-01-30",
            "FechaDeVencimiento": "2027-01-30",
            "EstadoDeCertificado": "Disponible",
            "Editor": "C=CO|ST=Cundinamarca|...",
            "sujeto": "C=CO|ST=Cundinamarca|...",
            "CausaDeVencimientoDeCertificado": "",
            "FechaDeUso": "2026-03-11"
          }
        }
      ]
    }
  }
]
```

> Internamente la función también intenta captar la fecha de firma (`/M(D:...)`), y avisa si los
rangos byte y contenidos no coinciden.

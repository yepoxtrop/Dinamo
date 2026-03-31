# Firma Digital con Java + iText 8

Este módulo utiliza Java con iText 8 para firmar PDFs con soporte para **múltiples firmas incrementales visibles**.

## Características

- ✅ **Firmas incrementales**: Preserva f firmas anteriores sin invalidarlas
- ✅ **Apariencia visual**: Todas las firmas son visibles en Adobe Reader  
- ✅ **Estándar PAdES**: Compatible con estándares de firma digital
- ✅ **BouncyCastle**: Soporte completo para criptografía PKCS#7/CMS

## Requisitos

- Java JDK 17+ (ya instalado: OpenJDK 25.0.2)
- Maven 3.6+ (ya instalado: Maven 3.9.12)
- Node.js 18+ para la integración

## Compilación

```bash
cd java-signer
mvn clean package -DskipTests
```

Esto genera: `target/pdf-signer-1.0.0.jar` (~15MB con todas las dependencias)

## Uso desde Node.js

```javascript
import { firmarPdfConJava } from './modules/documentos/firmarDocumentosJava.js';

const signedPdfBuffer = await firmarPdfConJava({
    pdfBuffer: pdfBuffer,      // Buffer del PDF
    p12Buffer: p12Buffer,      // Buffer del certificado
    password: 'password',      // Contraseña del P12
    signatureArea: {           // Área de la firma
        x: 50,
        y: 100,
        page: 1
    }
});
```

## Arquitectura

```
┌─────────────────────┐
│   Node.js API       │
│  (Express + Prisma) │
└──────────┬──────────┘
           │
           │ child_process.exec
           ▼
┌─────────────────────┐
│  Java + iText 8     │
│  PdfSigner.jar      │
└─────────────────────┘
           │
           ▼
     PDF Firmado con
   firma visual incremental
```

## Ventajas sobre pdf-lib

| Característica | pdf-lib | iText 8 |
|---|---|---|
| Firmas incrementales | ❌ Reconstruye PDF | ✅ Modo append |
| Visual en múltiples firmas | ❌ Invalida anteriores | ✅ Preserva todas |
| Estándar de industria | ❌ | ✅ |
| Complejidad | Baja | Alta (requiere Java) |

## Troubleshooting

### Error: "Cannot find java"
Verifica que Java esté en el PATH:
```bash
java -version
```

### Error: "JAR not found"
Compila el proyecto Maven:
```bash
cd java-signer && mvn package
```

### Error de firma 
Verifica que el certificado P12 sea válido y la contraseña correcta.

## Flujo de Firma Múltiple

1. **Usuario A sube PDF limpio** → Firma con su P12 → Descarga
2. **Usuario B sube PDF de A** → Firma con su P12 → Descarga  
3. **Usuario C sube PDF de B** → Firma con su P12 → Descarga

**Resultado**: PDF final con 3 firmas visibles y válidas ✅

## Dependencias (en pom.xml)

- iText 8.0.5 (kernel, io, layout, forms, sign)
- BouncyCastle 1.79 (bcpkix, bcprov, bcutil)
- Gson 2.11.0 (para JSON)

Total: ~15MB en JAR único con todas las dependencias incluidas.

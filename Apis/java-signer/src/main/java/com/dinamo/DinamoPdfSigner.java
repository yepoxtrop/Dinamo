package com.dinamo;

import com.itextpdf.kernel.pdf.*;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.kernel.pdf.xobject.PdfFormXObject;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.layout.Canvas;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.signatures.*;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import java.io.*;
import java.security.*;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.security.auth.x500.X500Principal;

public class DinamoPdfSigner {
    
    static {
        Security.addProvider(new BouncyCastleProvider());
    }

    public static void main(String[] args) {
        if (args.length < 11) {
            System.err.println("ERROR: Argumentos insuficientes");
            System.err.println("Uso: java -jar pdf-signer.jar <inputPdf> <outputPdf> <p12Path> <password> <x> <y> <width> <height> <page> <pageHeight> <certInfo>");
            System.exit(1);
        }

        try {
            String inputPdf = args[0];
            String outputPdf = args[1];
            String p12Path = args[2];
            String password = args[3];
            float x = Float.parseFloat(args[4]);
            float y = Float.parseFloat(args[5]);
            float width = Float.parseFloat(args[6]);
            float height = Float.parseFloat(args[7]);
            int page = Integer.parseInt(args[8]);
            float pageHeight = Float.parseFloat(args[9]);
            String certInfo = args.length > 10 ? args[10] : "";

            signPdf(inputPdf, outputPdf, p12Path, password, x, y, width, height, page, pageHeight, certInfo);

            System.out.println("SUCCESS: PDF firmado correctamente");
            System.exit(0);
        } catch (Exception e) {
            System.err.println("ERROR: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }

    private static void signPdf(String src, String dest, String p12Path, String password, 
                                float x, float y, float width, float height, int page, 
                                float pageHeight, String certInfoJson) throws Exception {
        
        // Cargar el certificado P12
        KeyStore ks = KeyStore.getInstance("PKCS12");
        try (FileInputStream fis = new FileInputStream(p12Path)) {
            ks.load(fis, password.toCharArray());
        }

        String alias = ks.aliases().nextElement();
        PrivateKey pk = (PrivateKey) ks.getKey(alias, password.toCharArray());
        Certificate[] chain = ks.getCertificateChain(alias);
        
        // Extraer información del certificado
        X509Certificate cert = (X509Certificate) chain[0];
        X500Principal principal = cert.getSubjectX500Principal();
        String dn = principal.getName();
        
        // Parsear DN para extraer campos
        String commonName = extractField(dn, "CN");
        String organization = extractField(dn, "O");
        String country = extractField(dn, "C");

        // Parsear certificateInfo de JSON si está disponible
        if (certInfoJson != null && !certInfoJson.isEmpty() && !certInfoJson.equals("{}")) {
            try {
                if (certInfoJson.contains("\"commonName\"")) {
                    commonName = extractJsonField(certInfoJson, "commonName");
                }
                if (certInfoJson.contains("\"organization\"")) {
                    organization = extractJsonField(certInfoJson, "organization");
                }
            } catch (Exception e) {
                // Usar valores del certificado si falla el parseo
            }
        }

        commonName = sanitizeSignatureText(commonName);
        organization = sanitizeSignatureText(organization);

        // Fecha actual formateada
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        String dateStr = sdf.format(new Date());

        // Convertir coordenadas: JavaScript usa origen superior-izquierdo, PDF usa origen inferior-izquierdo
        float pdfY = pageHeight - y - height;
        
        Rectangle rect = new Rectangle(x, pdfY, width, height);
        
        // Nombre único para el campo de firma
        String fieldName = "Signature_" + System.currentTimeMillis();

        // Inspeccionar firmas existentes (si hay) antes de firmar
        boolean hasExistingSignatures = false;
        try (PdfDocument inspectDoc = new PdfDocument(new PdfReader(src))) {
            SignatureUtil signatureUtil = new SignatureUtil(inspectDoc);
            java.util.List<String> sigNames = signatureUtil.getSignatureNames();
            hasExistingSignatures = sigNames != null && !sigNames.isEmpty();
            System.out.println("INFO: Firmas existentes: " + sigNames);
            if (hasExistingSignatures) {
                for (String sigName : sigNames) {
                    boolean covers = signatureUtil.signatureCoversWholeDocument(sigName);
                    int rev = signatureUtil.getRevision(sigName);
                    System.out.println("INFO: Firma " + sigName + " cubre documento: " + covers + ", revision: " + rev);
                }
            }
        } catch (Exception e) {
            System.out.println("WARN: No se pudo inspeccionar firmas existentes: " + e.getMessage());
        }

        // Crear firma con modo append (incremental) para no invalidar firmas anteriores
        PdfReader reader = new PdfReader(src);
        reader.setUnethicalReading(true); // Permite firmar PDFs ya firmados
        
        // IMPORTANTE: useAppendMode() es crucial para no invalidar firmas anteriores
        StampingProperties stampingProps = new StampingProperties().useAppendMode();
        
        PdfSigner signer = new PdfSigner(reader, new FileOutputStream(dest), stampingProps);
        
        // Configurar las propiedades de firma
        signer.setFieldName(fieldName);
        signer.setPageNumber(page);
        signer.setPageRect(rect);
        signer.setReason("Documento firmado digitalmente");
        signer.setLocation(country != null ? country : "Colombia");
        signer.setCertificationLevel(
            hasExistingSignatures
                ? PdfSigner.NOT_CERTIFIED
                : PdfSigner.CERTIFIED_FORM_FILLING_AND_ANNOTATIONS
        );
        
        // Crear apariencia visual personalizada exactamente igual que en Node.js
        PdfSignatureAppearance appearance = signer.getSignatureAppearance();
        appearance.setPageRect(rect);
        appearance.setPageNumber(page);
        appearance.setReuseAppearance(false);
        appearance.setLayer2Text("");
        
        // Obtener el layer2 donde dibujaremos la apariencia
        PdfFormXObject layer2 = appearance.getLayer2();
        
        // Crear PdfCanvas para dibujar
        PdfCanvas canvas = new PdfCanvas(layer2, signer.getDocument());
        
        // Constantes de diseño
        float padding = 6;
        float accentWidth = 3;
        float innerGap = 6;
        float lineHeightFactor = 1.3f;
        float[] lineScales = {0.9f, 1.0f, 0.9f, 0.85f};
        
        // Colores
        DeviceRgb backgroundColor = new DeviceRgb(247, 250, 255); // rgb(0.97, 0.98, 1)
        DeviceRgb accentColor = new DeviceRgb(51, 115, 179);      // rgb(0.2, 0.45, 0.7)
        DeviceRgb textColor = new DeviceRgb(0, 0, 0);             // Negro
        
        // Dibujar fondo azul claro
        canvas.saveState();
        canvas.setFillColor(backgroundColor);
        canvas.rectangle(0, 0, width, height);
        canvas.fill();
        canvas.restoreState();
        
        // Dibujar barra azul lateral
        canvas.saveState();
        canvas.setFillColor(accentColor);
        canvas.rectangle(0, 0, accentWidth, height);
        canvas.fill();
        canvas.restoreState();
        
        // Dibujar texto
        canvas.saveState();
        canvas.setFillColor(textColor);
        
        try {
            PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
            
            String[] lines = {
                "Firmado digitalmente por",
                commonName != null ? commonName : "",
                organization != null ? organization : "",
                dateStr
            };
            
            float fontSize = calculateFontSize(width, height, lines, font, lineScales, padding, accentWidth, innerGap, lineHeightFactor);
            float lineHeight = fontSize * lineHeightFactor;
            float textX = padding + accentWidth + innerGap;
            float availableHeight = Math.max(0, height - padding * 2);
            float maxScale = getMaxScale(lineScales);
            float totalTextHeight = ((lines.length - 1) * lineHeight) + (fontSize * maxScale);
            float extraSpace = Math.max(0, availableHeight - totalTextHeight);
            float topY = padding + extraSpace / 2 + totalTextHeight;
            float currentY = topY - (fontSize * lineScales[0]);
            
            for (int i = 0; i < lines.length && i < lineScales.length; i++) {
                String line = lines[i];
                if (line != null && !line.isEmpty()) {
                    canvas.beginText();
                    canvas.setFontAndSize(font, fontSize * lineScales[i]);
                    canvas.moveText(textX, currentY);
                    canvas.showText(line);
                    canvas.endText();
                    currentY -= lineHeight;
                }
            }
        } catch (Exception e) {
            System.err.println("Error al dibujar texto: " + e.getMessage());
        }
        
        canvas.restoreState();

        // Configurar firma criptográfica
        IExternalSignature pks = new PrivateKeySignature(pk, DigestAlgorithms.SHA256, BouncyCastleProvider.PROVIDER_NAME);
        IExternalDigest digest = new BouncyCastleDigest();

        // Firmar el documento con CMS (compatible con Adobe)
        signer.signDetached(digest, pks, chain, null, null, null, 8192, PdfSigner.CryptoStandard.CMS);
        
        System.out.println("INFO: Firma añadida en modo incremental (firmas anteriores preservadas)");
        System.out.println("INFO: Coordenadas PDF: x=" + x + ", y=" + pdfY + ", width=" + width + ", height=" + height);
        System.out.println("INFO: Campo de firma: " + fieldName);
    }
    
    /**
     * Calcula el tamaño de fuente basado en las dimensiones del rectángulo y el ancho real del texto.
     * Algoritmo CONSERVADOR para GARANTIZAR que toda la firma quepa sin salirse.
     */
    private static float calculateFontSize(
        float width,
        float height,
        String[] lines,
        PdfFont font,
        float[] lineScales,
        float padding,
        float accentWidth,
        float innerGap,
        float lineHeightFactor
    ) {
        float availableWidth = Math.max(20, width - padding * 2 - accentWidth - innerGap);
        float availableHeight = Math.max(20, height - padding * 2);
        int lineCount = lines != null ? lines.length : 0;
        float maxScale = getMaxScale(lineScales);
        
        if (lineCount == 0) {
            return 8f;
        }
        
        // Calcular tamaño basado en la altura (considerando el mayor tamaño de línea)
        float heightFactor = ((lineCount - 1) * lineHeightFactor) + maxScale;
        float maxSizeByHeight = availableHeight / heightFactor;
        
        // Calcular tamaño basado en el ancho real del texto
        float maxSizeByWidth = Float.MAX_VALUE;
        for (int i = 0; i < lineCount && i < lineScales.length; i++) {
            String line = lines[i] == null ? "" : lines[i];
            if (line.isEmpty()) {
                continue;
            }
            float widthAtOne = font.getWidth(line, 1);
            if (widthAtOne > 0) {
                float candidate = availableWidth / (widthAtOne * lineScales[i]);
                maxSizeByWidth = Math.min(maxSizeByWidth, candidate);
            }
        }
        if (maxSizeByWidth == Float.MAX_VALUE) {
            maxSizeByWidth = maxSizeByHeight;
        }
        
        float size = Math.min(maxSizeByHeight, maxSizeByWidth);
        return Math.max(5, Math.min(28, size));
    }

    private static float getMaxScale(float[] scales) {
        float max = 1f;
        if (scales == null) {
            return max;
        }
        for (float scale : scales) {
            if (scale > max) {
                max = scale;
            }
        }
        return max;
    }

    private static String sanitizeSignatureText(String value) {
        if (value == null) {
            return "";
        }

        return value
            .replace("\\t", " ")
            .replace("\t", " ")
            .replaceAll("[\\r\\n]+", " ")
            .replaceAll("\\s{2,}", " ")
            .trim();
    }

    /**
     * Extrae un campo del Distinguished Name (DN)
     */
    private static String extractField(String dn, String fieldName) {
        try {
            String[] parts = dn.split(",");
            for (String part : parts) {
                String trimmed = part.trim();
                if (trimmed.startsWith(fieldName + "=")) {
                    return trimmed.substring(fieldName.length() + 1);
                }
            }
        } catch (Exception e) {
            // Ignorar errores de parsing
        }
        return null;
    }
    
    /**
     * Extrae un campo de un JSON simple (sin usar librería externa)
     */
    private static String extractJsonField(String json, String fieldName) {
        try {
            String pattern = "\"" + fieldName + "\"\\s*:\\s*\"([^\"]+)\"";
            java.util.regex.Pattern p = java.util.regex.Pattern.compile(pattern);
            java.util.regex.Matcher m = p.matcher(json);
            if (m.find()) {
                return m.group(1);
            }
        } catch (Exception e) {
            // Ignorar errores de parsing
        }
        return null;
    }
}

import path from "path";
import fs from "fs/promises";

function carpetasInciales() {

    let rutaDocsAnalizados = path.join(process.cwd(), "uploads", "documentosAnalizados");
    fs.mkdir(rutaDocsAnalizados, {recursive:true});

    let rutaSignatures = path.join(process.cwd(), "uploads", "signatures");
    fs.mkdir(rutaSignatures, {recursive:true});

    let rutaReports = path.join(process.cwd(), "reports");
    fs.mkdir(rutaReports, {recursive:true});
    
    let rutaCertificates = path.join(process.cwd(), "certificates");
    fs.mkdir(rutaCertificates, {recursive:true});
}

export default carpetasInciales;
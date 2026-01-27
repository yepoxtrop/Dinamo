export const validarDocumentosController = async(request, response) =>{
    const archivos = request.file; 
    console.log(archivos)
};

// 1. Recibir y validar PDF
// 2. Guardar temporalmente con nombre único
// 3. Leer y modificar PDF con pdf-lib
// 4. Aplicar placeholder para firma
// 5. Firmar con certificado P12
// 6. Verificar firma digital
// 7. Mover a ubicación final o devolver
// 8. Limpiar archivos temporales
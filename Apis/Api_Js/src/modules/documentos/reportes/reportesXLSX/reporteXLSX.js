/* Librerias */
import excelJs from 'exceljs';

/**
 * @author Luis Angel Sarmiento Diaz
 * @description - Función que se encarga de generar reportes en formato Excel (XLSX).
 * @param {Object} params - Parámetros de entrada.
 * @param {string} params.pathArchivo - Ruta donde se guardarán los archivos generados.
 * @param {Array} params.listaObjetos - Lista con la información de cada documento en formato de objetos.
 * @returns {Promise<boolean>} `true` si el archivo se generó correctamente.
 * @throws {Error} Si ocurre un error durante la generación del reporte.
 */
export const reporteXLSX = async ({pathArchivo, listaObjetos}) =>{
    try {

        let datosEstrcuturados = formatearObjetosVista(listaObjetos); 

        /* Crear el libro de excel */
        const libro = new excelJs.Workbook();
        
        /* Propiedades del libro */
        libro.creator = 'Soporte ACS';
        libro.description = 'Reporte de los archivo cargados en formato xlsx'; 
        libro.company = 'ACS - Aciel Soluciones Integrales S.A.S'; 
        libro.title = 'REPORTE DE DOCUMENTOS PDF'; 
        libro.views = [{
            x: 0, y: 0, width: 10000, height: 20000,
            firstSheet: 0, activeTab: 0, visibility: 'visible'
        }]

        const borderEstilo = {
            top:    { style: 'thin', color: { argb: 'FFFFFFFF' } },
            left:   { style: 'thin', color: { argb: 'FFFFFFFF' } },
            bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            right:  { style: 'thin', color: { argb: 'FFFFFFFF' } }
        };

        const bordesTabla1V0 = {
            top:    { style: 'thin', color: { argb: 'FF000000' } },
            left:   { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            right:  { style: 'thin', color: { argb: 'FF000000' } }
        };
        
        const bordesTabla1V1 = {
            top:    { style: 'thin', color: { argb: 'FFFFFFFF' } },
            left:   { style: 'thin', color: { argb: 'FFFFFFFF' } },
            bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            right:  { style: 'thin', color: { argb: 'FFFFFFFF' } }
        };

        const bordesTabla1V2 = {
            top:    { style: 'thin', color: { argb: 'FFFFFFFF' } },
            left:   { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            right:  { style: 'thin', color: { argb: 'FF000000' } }
        }

        const bordesTabla1V3 = {
            top:    { style: 'thin', color: { argb: 'FFFFFFFF' } },
            left:   { style: 'thin', color: { argb: 'FFFFFFFF' } },
            bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            right:  { style: 'thin', color: { argb: 'FF000000' } }
        }

        const bordesTabla1V4 = {
            top:    { style: 'thin', color: { argb: 'FFFFFFFF' } },
            left:   { style: 'thin', color: { argb: 'FFFFFFFF' } },
            bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            right:  { style: 'thin', color: { argb: 'FFFFFFFF' } }
        }

        const bordesTabla1V5 = {
            top:    { style: 'thin', color: { argb: 'FF000000' } },
            left:   { style: 'thin', color: { argb: 'FFFFFFFF' } },
            bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            right:  { style: 'thin', color: { argb: 'FFFFFFFF' } }
        }

        const bordesTabla1V6 = {
            top:    { style: 'thin', color: { argb: 'FF000000' } },
            left:   { style: 'thin', color: { argb: 'FFFFFFFF' } },
            bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            right:  { style: 'thin', color: { argb: 'FF000000' } }
        }

        const bordesTabla1V7 = {
            top:    { style: 'thin', color: { argb: 'FF000000' } },
            left:   { style: 'thin', color: { argb: 'FFFFFFFF' } },
            bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            right:  { style: 'thin', color: { argb: 'FFFFFFFF' } }
        }

        const bordesTabla1V8 = {
            top:    { style: 'thin', color: { argb: 'FFFFFFFF' } },
            left:   { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FF000000' } },
            right:  { style: 'thin', color: { argb: 'FFFFFFFF' } }
        }
        
        const bordesTabla1V8_1 = {
            top:    { style: 'thin', color: { argb: 'FFFFFFFF' } },
            left:   { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            right:  { style: 'thin', color: { argb: 'FFFFFFFF' } }
        }

        const bordesTabla1V9 = {
            top:    { style: 'thin', color: { argb: 'FFFFFFFF' } },
            left:   { style: 'thin', color: { argb: 'FFFFFFFF' } },
            bottom: { style: 'thin', color: { argb: 'FF000000' } },
            right:  { style: 'thin', color: { argb: 'FFFFFFFF' } }
        }

        const bordesTabla1V10 = {
            top:    { style: 'thin', color: { argb: 'FFFFFFFF' } },
            left:   { style: 'thin', color: { argb: 'FFFFFFFF' } },
            bottom: { style: 'thin', color: { argb: 'FF000000' } },
            right:  { style: 'thin', color: { argb: 'FF000000' } }
        }

        const bordesTabla1V11 = {
            top:    { style: 'thin', color: { argb: 'FFFFFFFF' } },
            left:   { style: 'thin', color: { argb: 'FFFFFFFF' } },
            bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
            right:  { style: 'thin', color: { argb: 'FF000000' } }
        }

        /* Crear hoja 2 */
        /* Tomar en cuenta:
           - El tipo de documento
           - El estado del documento pdf
           - El estado de los certificados
        */
        const hoja1 = libro.addWorksheet('Indicadores',{ 
            properties:{
                tabColor:{argb:"FF0D7377"},
            }
        }); 
        hoja1.getColumn('A').width = 25;
        hoja1.getColumn('B').width = 70;
        
        
        /* Crear tablas */
        hoja1.mergeCells('A1:B1');
        hoja1.getCell('A1').value = 'TIPOS DE DOCUMENTOS';
        hoja1.getCell('A1').alignment = { horizontal: 'center' };
        hoja1.getCell('A1').font = { 
            bold: true, 
            size: 13,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja1.getCell('A1').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF0C2135' }
        };
        hoja1.getCell('A2').font = { 
            bold: true, 
            size: 13,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja1.getCell('A2').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00A8C3' }
        };
        hoja1.getCell('B2').font = { 
            bold: true, 
            size: 13,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja1.getCell('B2').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00A8C3' }
        };
        hoja1.addTable({
            name: 'TiposDeDocumentos',
            ref: 'A2',
            headerRow: true,
            style: {
                theme: 'TableStyleDark3',
                showRowStripes: true,
            },
            columns: [
                { name: 'Tipo', filterButton:false },
                { name: 'Explicación', filterButton:false }
            ],
            rows: [
                ['✔️ Documento PDF', 'Los documentos en este formato son los únicos validos por el sistema.'],
                ['❌ Documento distintos', 'Documentos diferentes al formato PDF son rechazados.'],
            ],
        });
        hoja1.getCell('A2').alignment = {horizontal:'center'};
        hoja1.getCell('B2').alignment = {horizontal:'center'};


        hoja1.mergeCells('A6:B6');
        hoja1.getCell('A6').value = 'ESTADOS DE DOCUMENTOS';
        hoja1.getCell('A6').alignment = { horizontal: 'center' };
        hoja1.getCell('A6').font = { bold: true, size: 13 };
        hoja1.getCell('A6').font = { 
            bold: true, 
            size: 13,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja1.getCell('A6').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF0C2135' }
        };
        hoja1.getCell('A7').font = { 
            bold: true, 
            size: 13,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja1.getCell('A7').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00A8C3' }
        };
        hoja1.getCell('B7').font = { 
            bold: true, 
            size: 13,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja1.getCell('B7').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00A8C3' }
        };
        hoja1.addTable({
            name: 'EstadoDeDocumentos',
            ref: 'A7',
            headerRow: true,
            style: {
                theme: 'TableStyleDark3',
                showRowStripes: true,
            },
            columns: [
                { name: 'Tipo', filterButton:false },
                { name: 'Explicación', filterButton:false }
            ],
            rows: [
                ['✔️ Válido / Vigente', 'Todos los certificados están en buen estado.'],
                ['❌ Inválido / Venciedo', 'Uno o más certificados no están en buen estado.'],
                ['❓ Sin Resultados', 'No se encontraron certificos dentro del documento.'],
            ],
        });
        hoja1.getCell('A7').alignment = {horizontal:'center'};
        hoja1.getCell('B7').alignment = {horizontal:'center'};

        hoja1.mergeCells('A13:B13');
        hoja1.getCell('A13').value = 'ESTADOS DE CERTIFICADOS';
        hoja1.getCell('A13').alignment = { horizontal: 'center' };
        hoja1.getCell('A13').font = { bold: true, size: 13 };
        hoja1.getCell('A13').font = { 
            bold: true, 
            size: 13,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja1.getCell('A13').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF0C2135' }
        };
        hoja1.getCell('A14').font = { 
            bold: true, 
            size: 13,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja1.getCell('A14').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00A8C3' }
        };
        hoja1.getCell('B14').font = { 
            bold: true, 
            size: 13,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja1.getCell('B14').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00A8C3' }
        };
        hoja1.addTable({
            name: 'EstadoDeCertificados',
            ref: 'A14',
            headerRow: true,
            style: {
                theme: 'TableStyleDark3',
                showRowStripes: true,
            },
            columns: [
                { name: 'Tipo', filterButton:false },
                { name: 'Explicación', filterButton:false }
            ],
            rows: [
                ['✔️ Válido / Vigente', 'El certificado dentro del documento PDF es válido.'],
                ['❌ Inválido / Vencido', 'El certificado dentro del documento PDF no es válido.'],
            ],
        });
        hoja1.getCell('A14').alignment = {horizontal:'center'};
        hoja1.getColumn('A').eachCell((celda)=>{
            const valor = celda.value?.toString() ?? '';
            const celdaActual = celda.address?.toString() ?? '';
            
            if (valor.startsWith('✔️')){
                celda.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFE8F5E9' }
                };
                celda.font = {
                    name: 'Calibri',
                    color: { argb: '2E7D32' },
                    family: 2,
                    size: 10,
                    bold: true
                }
                hoja1.getCell(celdaActual.replace("A","B")).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFE8F5E9' }
                }
                hoja1.getCell(celdaActual.replace("A","B")).font = {
                    name: 'Calibri',
                    color: { argb: '2D3748' },
                    family: 2,
                    size: 10,
                }
            } else if (valor.startsWith('❌')){
                celda.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFEBEE' } // rojo
                };
                celda.font = {
                    name: 'Calibri',
                    color: { argb: 'FFC62828' },
                    family: 2,
                    size: 10,
                    bold: true
                }
                hoja1.getCell(celdaActual.replace("A","B")).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFEBEE' }
                }
                hoja1.getCell(celdaActual.replace("A","B")).font = {
                    name: 'Calibri',
                    color: { argb: '2D3748' },
                    family: 2,
                    size: 10,
                }
            } else if (valor.startsWith('❓')){
                celda.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFDE7'  } // amarillo
                };
                celda.font = {
                    name: 'Calibri',
                    color: { argb: 'F57F17' },
                    family: 2,
                    size: 10,
                    bold: true
                }
                hoja1.getCell(celdaActual.replace("A","B")).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFDE7' }
                }
                hoja1.getCell(celdaActual.replace("A","B")).font = {
                    name: 'Calibri',
                    color: { argb: '2D3748' },
                    family: 2,
                    size: 10,
                }
            }
        }) 
        hoja1.getCell('B14').alignment = {horizontal:'center'};


        hoja1.getColumn('A').eachCell((celda) => {
            celda.border = borderEstilo;
        });
        hoja1.getColumn('B').eachCell((celda) => {
            celda.border = borderEstilo;
        });

        /* Crear  hoja 2*/
        /* Tomar en cuenta:
           - El tipo de documento
           - El estado del documento pdf
           - El estado de los certificados
        */
        const hoja2 = libro.addWorksheet('Gestión de Firmas',{ 
            properties:{
                tabColor:{argb:"FF0D7377"},
            }
        }); 

        

        /* Crear espacios para los encabezados del reporte */
        hoja2.mergeCells('A1:Q1');
        hoja2.mergeCells('A2:Q2');
        hoja2.mergeCells('A3:D3');
        hoja2.mergeCells('E3:H3');
        hoja2.mergeCells('I3:J3');
        hoja2.mergeCells('K3:L3');
        hoja2.mergeCells('M3:O3');
        hoja2.mergeCells('P3:Q3');

        /* Asignar valores a los encabezados del repote */ 
        hoja2.getCell('A1').value = 'GESTIÓN DE DOCUMENTOS Y FIRMAS DIGITALES';
        hoja2.getCell('A2').value = 'Registro de validación y trazabilidad de firmas electrónicas';
        hoja2.getCell('A3').value = 'DOCUMENTO';
        hoja2.getCell('E3').value = 'FIRMAS';
        hoja2.getCell('I3').value = 'FIRMAS';
        hoja2.getCell('K3').value = 'AUTORIDAD CERTIFICADORA';
        hoja2.getCell('M3').value = 'FECHAS';
        hoja2.getCell('P3').value = 'CERTIFICADO';
        
        /* Alineacion  */
        hoja2.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };
        hoja2.getCell('A2').alignment = { horizontal: 'center', vertical: 'middle' };
        hoja2.getCell('A3').alignment = { horizontal: 'center', vertical: 'middle' };
        hoja2.getCell('E3').alignment = { horizontal: 'center', vertical: 'middle' };
        hoja2.getCell('I3').alignment = { horizontal: 'center', vertical: 'middle' };
        hoja2.getCell('K3').alignment = { horizontal: 'center', vertical: 'middle' };
        hoja2.getCell('M3').alignment = { horizontal: 'center', vertical: 'middle' };
        hoja2.getCell('P3').alignment = { horizontal: 'center', vertical: 'middle' };

        /* Ancho de los encabezados del reporte */
        hoja2.getColumn('A').width = 30;
        hoja2.getColumn('B').width = 25;
        hoja2.getColumn('C').width = 31;
        hoja2.getColumn('D').width = 28;
        hoja2.getColumn('E').width = 20;
        hoja2.getColumn('F').width = 20;
        hoja2.getColumn('G').width = 20;
        hoja2.getColumn('H').width = 20;
        hoja2.getColumn('I').width = 25;
        hoja2.getColumn('J').width = 20;
        hoja2.getColumn('K').width = 30;
        hoja2.getColumn('L').width = 30;
        hoja2.getColumn('M').width = 20;
        hoja2.getColumn('N').width = 25;
        hoja2.getColumn('O').width = 20;
        hoja2.getColumn('P').width = 26;
        hoja2.getColumn('Q').width = 20;

        /* Estilos para columna A1 */
        hoja2.getCell('A1').font = { 
            bold: true, 
            size: 16,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('A1').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF0C2135' }
        };
        hoja2.getCell('A1').border = bordesTabla1V0; 
        hoja2.getRow(1).height = 35

        /* Estilos para columna A2 */
        hoja2.getCell('A2').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('A2').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF1B2A4A' }
        };
        hoja2.getCell('A2').border = bordesTabla1V2; 
        hoja2.getRow(2).height = 18; 

        /* Estilos para columna A3 */
        hoja2.getCell('A3').font = { 
            size: 9,
            name: 'Calibri',
            color: { argb: 'FFFFFF' },
            bold: true
        };
        hoja2.getCell('A3').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00A8C3' }
        };
        hoja2.getCell('A3').border = bordesTabla1V3; 

        /* Estilos para columna A4 */
        hoja2.getCell('A4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('A4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('A4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('A4').border = bordesTabla1V5;

        /* Estilos para columna B3 */
        hoja2.getCell('B3').border = bordesTabla1V1; 

        /* Estilos para columna B4 */
        hoja2.getCell('B4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('B4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('B4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('B4').border = bordesTabla1V7;

        /* Estilos para columna C3 */
        hoja2.getCell('C3').border = bordesTabla1V1; 

        /* Estilos para columna C4 */
        hoja2.getCell('C4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('C4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('C4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('C4').border = bordesTabla1V7;

        /* Estilos para columna B3 */
        hoja2.getCell('D3').border = bordesTabla1V1; 

        /* Estilos para columna D4 */
        hoja2.getCell('D4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('D4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('D4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('D4').border = bordesTabla1V7;

        /* Estilos para columna E3 */
        hoja2.getCell('E3').font = { 
            size: 9,
            name: 'Calibri',
            color: { argb: 'FFFFFF' },
            bold: true
        };
        hoja2.getCell('E3').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00A8C3' }
        };
        hoja2.getCell('E3').border = bordesTabla1V1; 

        /* Estilos para columna E4 */
        hoja2.getCell('E4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('E4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('E4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('E4').border = bordesTabla1V7;

        /* Estilos para columna B3 */
        hoja2.getCell('F3').border = bordesTabla1V1; 

        /* Estilos para columna F4 */
        hoja2.getCell('F4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('F4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('F4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('F4').border = bordesTabla1V7;

        /* Estilos para columna G3 */
        hoja2.getCell('G3').border = bordesTabla1V1; 

        /* Estilos para columna G4 */
        hoja2.getCell('G4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('G4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('G4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('G4').border = bordesTabla1V7;

        /* Estilos para columna H3 */
        hoja2.getCell('H3').border = bordesTabla1V1; 

        /* Estilos para columna H4 */
        hoja2.getCell('H4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('H4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('H4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('H4').border = bordesTabla1V7;

        /* Estilos para columna I3 */
        hoja2.getCell('I3').font = { 
            size: 9,
            name: 'Calibri',
            color: { argb: 'FFFFFF' },
            bold: true
        };
        hoja2.getCell('I3').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00A8C3' }
        };
        hoja2.getCell('I3').border = bordesTabla1V1; 
        
        /* Estilos para columna I4 */
        hoja2.getCell('I4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('I4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('I4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('I4').border = bordesTabla1V7;

        /* Estilos para columna J3 */
        hoja2.getCell('J3').border = bordesTabla1V1; 

        /* Estilos para columna J4 */
        hoja2.getCell('J4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('J4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('J4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('J4').border = bordesTabla1V7;

        /* Estilos para columna K3 */
        hoja2.getCell('K3').font = { 
            size: 9,
            name: 'Calibri',
            color: { argb: 'FFFFFF' },
            bold: true
        };
        hoja2.getCell('K3').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00A8C3' }
        };
        hoja2.getCell('K3').border = bordesTabla1V1; 

        /* Estilos para columna K4 */
        hoja2.getCell('K4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('K4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('K4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('K4').border = bordesTabla1V7;

        /* Estilos para columna L3 */
        hoja2.getCell('L3').border = bordesTabla1V1; 

        /* Estilos para columna L4 */
        hoja2.getCell('L4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('L4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('L4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('L4').border = bordesTabla1V7;

        /* Estilos para columna M3 */
        hoja2.getCell('M3').font = { 
            size: 9,
            name: 'Calibri',
            color: { argb: 'FFFFFF' },
            bold: true
        };
        hoja2.getCell('M3').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00A8C3' }
        };
        hoja2.getCell('M3').border = bordesTabla1V1; 

        /* Estilos para columna M4 */
        hoja2.getCell('M4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('M4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('M4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('M4').border = bordesTabla1V7;
        
        /* Estilos para columna N3 */
        hoja2.getCell('N3').border = bordesTabla1V1; 

        /* Estilos para columna N4 */
        hoja2.getCell('N4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('N4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('N4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('N4').border = bordesTabla1V7;

        /* Estilos para columna O3 */
        hoja2.getCell('O3').border = bordesTabla1V1; 

        /* Estilos para columna O4*/
        hoja2.getCell('O4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('O4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('O4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('O4').border = bordesTabla1V7;

        /* Estilos para columna P3*/
        hoja2.getCell('P3').font = { 
            size: 9,
            name: 'Calibri',
            color: { argb: 'FFFFFF' },
            bold: true
        };
        hoja2.getCell('P3').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00A8C3' }
        };
        hoja2.getCell('P3').border = bordesTabla1V1; 

        /* Estilos para columna P4*/
        hoja2.getCell('P4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('P4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('P4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('P4').border = bordesTabla1V7;

        /* Estilos para columna Q3 */
        hoja2.getCell('Q3').border = bordesTabla1V3; 

        /* Estilos para columna Q4*/
        hoja2.getCell('Q4').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        hoja2.getCell('Q4').font = { 
            italic:true,
            size: 10,
            name: 'Calibri',
            color: { argb: 'FFFFFF' }
        };
        hoja2.getCell('Q4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2E5984' }
        };
        hoja2.getCell('Q4').border = bordesTabla1V6;


        /* Creacion de tabla */ 
        hoja2.addTable({
            name: 'GestionDeFirmas',
            ref: 'A4',
            headerRow: true,
            style: {
                theme: '',
                showRowStripes: true,
            },
            totalsRow:true, 
            columns: [
                { name: 'Archivos', filterButton:true, },
                { name: 'Estado del Documento', filterButton:true },
                { name: 'Motivo del Estado', filterButton:true },
                { name: 'Tipo de Documento', filterButton:true },
                { name: '# Firmas', filterButton:true },
                { name: '# Firmas Vencidas', filterButton:true },
                { name: '# Firmas Válidas', filterButton:true },
                { name: 'No. Firma', filterButton:true },
                { name: 'Nombre del Firmante', filterButton:true },
                { name: 'País del Firmante', filterButton:true },
                { name: 'Autoridad Certificadora', filterButton:true },
                { name: 'País Autoridad Cert.', filterButton:true },
                { name: 'Fecha de Creación', filterButton:true },
                { name: 'Fecha de Vencimiento', filterButton:true },
                { name: 'Fecha de Uso', filterButton:true },
                { name: 'Estado del Certificado', filterButton:true },
                { name: 'Motivo', filterButton:true },
            ],
            rows: datosEstrcuturados,
        });

        /* Estilos para la columna Q */
        hoja2.getColumn('Q').eachCell((celda)=>{
            celda.border = bordesTabla1V11;
        });

        /* Estilos para la columna A */
        hoja2.getColumn('A').eachCell((celda)=>{
            const valor = celda.value?.toString() ?? '';
            const celdaActual = celda.address?.toString() ?? '';
            celda.border = bordesTabla1V8_1;

            if (valor === 'Total'){
                /* Estilos columna A* */ 
                hoja2.getCell(celdaActual).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual).font = { 
                    italic:true,
                    bold:true, 
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF2999FF' }
                };
                hoja2.getCell(celdaActual).border = bordesTabla1V8;

                /* Estilos columna B* */ 
                hoja2.getCell(celdaActual.replace('A','B')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','B')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','B')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','B')).border = bordesTabla1V9;

                /* Estilos columna C* */ 
                hoja2.getCell(celdaActual.replace('A','C')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','C')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','C')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','C')).border = bordesTabla1V9;

                /* Estilos columna D* */ 
                hoja2.getCell(celdaActual.replace('A','D')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','D')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','D')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','D')).border = bordesTabla1V9;

                /* Estilos columna E* */ 
                hoja2.getCell(celdaActual.replace('A','E')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','E')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','E')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','E')).border = bordesTabla1V9;

                /* Estilos columna F* */ 
                hoja2.getCell(celdaActual.replace('A','F')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','F')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','F')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','F')).border = bordesTabla1V9;

                /* Estilos columna G* */ 
                hoja2.getCell(celdaActual.replace('A','G')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','G')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','G')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','G')).border = bordesTabla1V9;

                /* Estilos columna H* */ 
                hoja2.getCell(celdaActual.replace('A','H')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','H')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','H')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','H')).border = bordesTabla1V9;

                /* Estilos columna I* */ 
                hoja2.getCell(celdaActual.replace('A','I')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','I')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','I')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','I')).border = bordesTabla1V9;

                /* Estilos columna J* */ 
                hoja2.getCell(celdaActual.replace('A','J')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','J')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','J')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','J')).border = bordesTabla1V9;

                /* Estilos columna K* */ 
                hoja2.getCell(celdaActual.replace('A','K')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','K')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','K')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','K')).border = bordesTabla1V9;

                /* Estilos columna L* */ 
                hoja2.getCell(celdaActual.replace('A','L')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','L')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','L')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','L')).border = bordesTabla1V9;

                /* Estilos columna M* */ 
                hoja2.getCell(celdaActual.replace('A','M')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','M')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','M')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','M')).border = bordesTabla1V9;

                /* Estilos columna N* */ 
                hoja2.getCell(celdaActual.replace('A','N')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','N')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','N')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','N')).border = bordesTabla1V9;

                /* Estilos columna O* */ 
                hoja2.getCell(celdaActual.replace('A','O')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','O')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','O')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
               hoja2.getCell(celdaActual.replace('A','O')).border = bordesTabla1V9; 

                /* Estilos columna P* */ 
                hoja2.getCell(celdaActual.replace('A','P')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','P')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','P')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','P')).border = bordesTabla1V9;

                /* Estilos columna Q* */ 
                hoja2.getCell(celdaActual.replace('A','Q')).alignment = {
                    horizontal: 'center',
                    vertical: 'middle'
                };
                hoja2.getCell(celdaActual.replace('A','Q')).font = { 
                    italic:true,
                    size: 10,
                    name: 'Calibri',
                    color: { argb: 'FFFFFF' }
                };
                hoja2.getCell(celdaActual.replace('A','Q')).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF81C3FF' }
                };
                hoja2.getCell(celdaActual.replace('A','Q')).border = bordesTabla1V10;
            }
        })

        /* Estilos para la columna  B */
        hoja2.getColumn('B').eachCell((celda)=>{
            const valor = celda.value?.toString() ?? '';
            const celdaActual = celda.address?.toString() ?? '';
            
            if (valor ===  'true'){
                celda.value = '✔️ Válido / Vigente';
                celda.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFE8F5E9' }
                };
                celda.font = {
                    name: 'Calibri',
                    color: { argb: '2E7D32' },
                    family: 2,
                    size: 10,
                    bold: true
                }
            } else if (valor === 'false'){
                celda.value = '❌ Inválido / Venciedo';
                celda.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFEBEE' } // rojo
                };
                celda.font = {
                    name: 'Calibri',
                    color: { argb: 'FFC62828' },
                    family: 2,
                    size: 10,
                    bold: true
                }
            } else if (valor  === 'null'){
                celda.value = '❓ Sin Resultados';
                celda.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFDE7'  } // amarillo
                };
                celda.font = {
                    name: 'Calibri',
                    color: { argb: 'F57F17' },
                    family: 2,
                    size: 10,
                    bold: true
                }
            }
        })

        /* Estilos para la columna D */
        hoja2.getColumn('D').eachCell((celda)=>{
            const valor = celda.value?.toString() ?? '';
            const celdaActual = celda.address?.toString() ?? '';
            
            if (valor ===  'PDF'){
                celda.value = '✔️ Documento PDF';
                celda.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFE8F5E9' }
                };
                celda.font = {
                    name: 'Calibri',
                    color: { argb: '2E7D32' },
                    family: 2,
                    size: 10,
                    bold: true
                }
            } else if(valor ===  'NOPDF'){
                celda.value = '❌ Documento distinto';
                celda.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFEBEE' } // rojo
                };
                celda.font = {
                    name: 'Calibri',
                    color: { argb: 'FFC62828' },
                    family: 2,
                    size: 10,
                    bold: true
                }
            }
        })
        
        /* Estilos para la columna P */ 
        hoja2.getColumn('P').eachCell((celda)=>{
            const valor = celda.value?.toString() ?? '';
            const celdaActual = celda.address?.toString() ?? '';
            
            if (valor ===  'true'){
                celda.value = '✔️ Válido / Vigente';
                celda.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFE8F5E9' }
                };
                celda.font = {
                    name: 'Calibri',
                    color: { argb: '2E7D32' },
                    family: 2,
                    size: 10,
                    bold: true
                }
            } else if(valor ===  'false'){
                celda.value = '❌ Inválido / Vencido';
                celda.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFEBEE' } // rojo
                };
                celda.font = {
                    name: 'Calibri',
                    color: { argb: 'FFC62828' },
                    family: 2,
                    size: 10,
                    bold: true
                }
            } else if (valor  === 'null'){
                celda.value = '❓ Sin Resultados';
                celda.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFDE7'  } // amarillo
                };
                celda.font = {
                    name: 'Calibri',
                    color: { argb: 'F57F17' },
                    family: 2,
                    size: 10,
                    bold: true
                }
            }
        })


        /* Escribir archivo xlsx */
        await libro.xlsx.writeFile(pathArchivo)
        return true; 
    } catch (error) {

        throw new Error(`Error al generar archivo:${error.message}`); 
    }
}

/* Funciones Auxiliares */
/**
 * @author Luis Angel Sarmiento Diaz
 * @description - Esta funcion se encarga de formatear la lista de objetos a un formato sencillo para XLSX.
 * @param {Array} listaObjetos - Lista con objetos, los cuales representan a cada documento que se ha cargado.
 * @returns {Array} - Devuelve un array con sublistas, para cumplir el formato de la libreria XLSX.
 * @throws {Error} Si ocurre un error durante el formateo de los objetos.
 */
function formatearObjetos(listaObjetos){
    let listaObjetosModificados = []; /* Va a almacenar sub listas */

    try {

        /* For para reccorrer la lista de objetos */
        for(let i = 0; i<listaObjetos.length; i++){
            
            /* For para recorrer los objetos(los documentos) */
            Object.entries(listaObjetos[i]).forEach(([clave,valor])=>{
                

                for (let j = 0; j < valor["Firmas"].length; j++){

                    let modeloLista = [];
                    /* Datos generales */
                    modeloLista.push(clave) ; 
                    modeloLista.push(valor["EstadoArchivo"] === true?true:(valor["EstadoArchivo"]=== false?false:'null'));
                    modeloLista.push(valor["CausaVencimientoArchivo"]);//Motivo del estado - pendiente
                    modeloLista.push(valor["TipoDocumento"] === 'PDF'?'PDF':'NOPDF'); 
                    modeloLista.push(valor["NumeroFirmas"]); 
                    modeloLista.push(valor["NumeroFirmasVencidas"]); 
                    modeloLista.push(valor["NumeroFirmas"] - valor["NumeroFirmasVencidas"]);

                    /* For para recorrer los objetos(las firmas)  */
                    Object.entries(valor["Firmas"][j]).forEach(([llave, asignacion])=>{

                        modeloLista.push(asignacion["NumeroFirma"]);
                        let regexNombre = /commonName=([^|]+)/;
                        let regexPais   = /countryName=([^|]+)/;
                        
                        let coincidenciaNombre = regexNombre.exec(asignacion["sujeto"]);
                        let coincidenciaPais = regexPais.exec(asignacion["sujeto"]);
                        
                        let coincidenciaNombre2 = regexNombre.exec(asignacion["Editor"]);
                        let coincidenciaPais2 = regexPais.exec(asignacion["Editor"]);
                        let sujetoNombre                = '';
                        let sujetoPais                  = '';
                        let autoridadCertificadora      = '';
                        let autoridadCertificadoraPais  = '';


                        if (coincidenciaNombre === null && coincidenciaPais !== null){
                            sujetoPais = coincidenciaPais[1];     
                        }else if((coincidenciaNombre !== null && coincidenciaPais === null)){
                            sujetoNombre = coincidenciaNombre[1];    
                        }else if((coincidenciaNombre !== null && coincidenciaPais !== null)){
                            sujetoNombre = coincidenciaNombre[1];
                            sujetoPais = coincidenciaPais[1];    
                        }

                        if (coincidenciaNombre2 === null && coincidenciaPais2 !== null){
                            autoridadCertificadoraPais = coincidenciaPais2[1];
                        }else if((coincidenciaNombre2 !== null && coincidenciaPais2 === null)){
                            autoridadCertificadora = coincidenciaNombre2[1];    
                        }else if((coincidenciaNombre2 !== null && coincidenciaPais2 !== null)) {
                            autoridadCertificadora = coincidenciaNombre2[1];    
                            autoridadCertificadoraPais = coincidenciaPais2[1];
                        }

                        modeloLista.push(sujetoNombre);
                        modeloLista.push(sujetoPais);
                        modeloLista.push(autoridadCertificadora);
                        modeloLista.push(autoridadCertificadoraPais);
                        modeloLista.push(asignacion["FechaDeCreacion"]);
                        modeloLista.push(asignacion["FechaDeVencimiento"]);
                        modeloLista.push(asignacion["FechaDeUso"]);
                        modeloLista.push(asignacion["EstadoDeCertificado"] === true?true:(asignacion["EstadoDeCertificado"]===false?false:"null"));
                        modeloLista.push(asignacion["CausaDeVencimientoDeCertificado"]);// Motivo del estado - pendiente

                        
                    })
                    
                    listaObjetosModificados.push(modeloLista);

                }
            })
        }

        return listaObjetosModificados;
    } catch (error) {
        throw new Error("Error al formatear el objeto:"+error);
    }
}

/**
 * @author Luis Angel Sarmiento Diaz
 * @description - Esta funcion se encarga de formatear la lista de objetos desde la vista de base de datos a un formato sencillo para XLSX.
 * @param {Array} listaObjetos - Lista con objetos obtenidos de la vista de base de datos, representando certificados y documentos validados.
 * @returns {Array} - Devuelve un array con sublistas, formateadas para cumplir con el formato de la libreria ExcelJS.
 * @throws {Error} Si ocurre un error durante el formateo de los objetos.
 */
function formatearObjetosVista(listaObjetos){
    let listaObjetosModificados = []; /* Va a almacenar sub listas */

    try {

        /* For para reccorrer la lista de objetos */
        for(let i = 0; i<listaObjetos.length; i++){
            
            let modeloLista = [];

            modeloLista.push(listaObjetos[i]["documentoNombre"]); 
            modeloLista.push(listaObjetos[i]["documentoEstado"] == 1?true:(listaObjetos[i]["documentoEstado"] == 0?false:'null'));
            modeloLista.push(listaObjetos[i]["documentoCausa"]);
            modeloLista.push(listaObjetos[i]["documentoTipo"] == 'PDF'?'PDF':'NOPDF'); 
            modeloLista.push(listaObjetos[i]["documentoTotalFirmas"]);
            modeloLista.push(listaObjetos[i]["documentoFirmasVencidas"]);
            modeloLista.push(listaObjetos[i]["documentoFirmasValidas"]);
            modeloLista.push(listaObjetos[i]["certificadoNumero"]);

            let regexNombre = /commonName=([^|]+)/;
            let regexPais   = /countryName=([^|]+)/;
                    
            let coincidenciaNombre = regexNombre.exec(listaObjetos[i]["certificadoSujeto"]);
            let coincidenciaPais = regexPais.exec(listaObjetos[i]["certificadoSujeto"]);        
            let coincidenciaNombre2 = regexNombre.exec(listaObjetos[i]["certificadoEditor"]);
            let coincidenciaPais2 = regexPais.exec(listaObjetos[i]["certificadoEditor"]);
                    
            let sujetoNombre                = '';
            let sujetoPais                  = '';
            let autoridadCertificadora      = '';
            let autoridadCertificadoraPais  = '';
            
                    
            if (coincidenciaNombre === null && coincidenciaPais !== null){
                    
                sujetoPais = coincidenciaPais[1];     
            }else if((coincidenciaNombre !== null && coincidenciaPais === null)){
                    
                sujetoNombre = coincidenciaNombre[1];    
            }else if((coincidenciaNombre !== null && coincidenciaPais !== null)){
                    
                sujetoNombre = coincidenciaNombre[1];
                sujetoPais = coincidenciaPais[1];    
            }
              
            if (coincidenciaNombre2 === null && coincidenciaPais2 !== null){
                    
                autoridadCertificadoraPais = coincidenciaPais2[1]; 
            }else if((coincidenciaNombre2 !== null && coincidenciaPais2 === null)){
                    
                autoridadCertificadora = coincidenciaNombre2[1];    
            }else if((coincidenciaNombre2 !== null && coincidenciaPais2 !== null)) {
                    
                autoridadCertificadora = coincidenciaNombre2[1];    
                autoridadCertificadoraPais = coincidenciaPais2[1];
            }
            
                    
            modeloLista.push(sujetoNombre);
            modeloLista.push(sujetoPais);
            modeloLista.push(autoridadCertificadora);
            modeloLista.push(autoridadCertificadoraPais);

            modeloLista.push(listaObjetos[i]["certificadoFechaCreacion"]);
            modeloLista.push(listaObjetos[i]["certificadoFechaVencimiento"]);
            modeloLista.push(listaObjetos[i]["certificadoFechaUso"]);
            modeloLista.push(listaObjetos[i]["certificadoEstado"] == 1?true:(listaObjetos[i]["certificadoEstado"] == 0?false:"null"));
            modeloLista.push(listaObjetos[i]["certificadoCausa"]);

            listaObjetosModificados.push(modeloLista);
        }

        return listaObjetosModificados;
    } catch (error) {
        throw new Error("Error al formatear el objeto:"+error);
    }
}
/* Librerias */
import { error } from 'console';
import excelJs from 'exceljs';

export const reporteXSLS = async () =>{
    try {
        const libro = new excelJs.Workbook();

        /* Informacion básica del libro */
        libro.creator = 'Soporte Acs';
        libro.lastModifiedBy = 'Soporte Acs';
        libro.created = new Date();
        libro.modified = new Date(); 
        libro.lastPrinted = new Date(); 
        libro.company = 'ACS - Aciel Soluciones Integrales S.A.S';
        libro.description = 'Libro de reportes'

        /* Hoja 1 */
        const hoja1 = libro.addWorksheet('Hoja 1', {
            headerFooter:{
                firstHeader:"Hola",
                firstFooter:"Adios"
            }
        }); 

        hoja1.columns = [
            { header: 'Id', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 32 },
            { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
        ];

        await libro.xlsx.writeFile('./reporte.xlsx')

        console.log(hoja1)
    } catch (error) {
        throw new Error()
    }
}

reporteXSLS()
.then((res)=>{
    console.log(res)
})
.catch((error)=>{
    console.log(error)
})
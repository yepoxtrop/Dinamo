export const nombrePeticionesPDF = (nombreUsuario) =>{
    try {
        const fecha = new Date();
        const anio = fecha.getFullYear();
        const dia = fecha.getMonth();
        const mes = fecha.getDate();

        const hora = fecha.getHours();
        const min = fecha.getMinutes();
        const seg = fecha.getSeconds();
        const miliSeg = fecha.getMilliseconds();
        
        const numRandom = Math.floor(Math.random() * 100) + 0;

        const nombrePeticion = `${nombreUsuario}-${anio}${mes}${dia}_${numRandom}_${hora}${min}${seg}${miliSeg}`;
        const nombreReporteBasico = `ReporteBasico-${anio}${mes}${dia}_${numRandom}_${hora}${min}${seg}${miliSeg}.csv`;
        const nombreReporteMedio = `ReporteDetallado-${anio}${mes}${dia}_${numRandom}_${hora}${min}${seg}${miliSeg}.csv`;
        const nombreReporteCompleto = `ReporteCompleto-${anio}${mes}${dia}_${numRandom}_${hora}${min}${seg}${miliSeg}.xlsx`;
        return [nombrePeticion, nombreReporteBasico, nombreReporteMedio, nombreReporteCompleto];
    } catch (error) {
        throw new Error(`Error al nombrar la peticion:${error}`)
    }
}
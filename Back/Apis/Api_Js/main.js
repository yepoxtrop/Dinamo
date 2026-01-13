//Configuracion De Variables De Entorno
import { puerto } from "./src/settings/general/variables_generales.js";

//Constantes
import app from "./src/app.js";

function main(puerto) {
    try {
        app.listen(puerto || 3000, ()=>{
            console.log('[ALERTA]:APLICACIÓN ARRIBA EN EL PUERTO 3000'); 
        })
    } catch (error) {
        console.log(`[ALERTA]:${error}`); 
    }
}

main(puerto);
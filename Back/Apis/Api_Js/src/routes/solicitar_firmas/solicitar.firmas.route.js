//Controladores Creados
import { controller_solicitar_firmas } from "../../controllers/solicitar_firmas/solicitar.firmas.controller.js";

//Librerias instaladas
import express from "express"

let router = express.Router(); 

router.post("/solicitar_firmas", controller_solicitar_firmas); 

export default router; 
//Controladores Creados
import { controller_consultar_firmas } from "../../controllers/solicitar_firmas/consultar.firmas.controller.js";

//Librerias instaladas
import express from "express"

let router = express.Router(); 

router.post("/consultar_firmas", controller_consultar_firmas); 

export default router; 
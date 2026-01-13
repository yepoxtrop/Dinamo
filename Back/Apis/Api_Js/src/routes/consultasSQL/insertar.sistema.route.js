//Controlador Creado
import { controller_insertar_sistema } from "../../controllers/consultasSQL/insertar.sistema.controller.js";

//Librerias
import express from "express";

let router = express.Router(); 

router.post("/insertar_sistema", controller_insertar_sistema); 

export default router; 
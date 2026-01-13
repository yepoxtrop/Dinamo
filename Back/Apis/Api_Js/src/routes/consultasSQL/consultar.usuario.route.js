//Controlador Creado
import { controller_consultar_usuario } from "../../controllers/consultasSQL/consultar.usuario.controller.js";

//Librerias
import express from "express";

let router = express.Router(); 

router.post("/consultar_usuario", controller_consultar_usuario); 

export default router; 
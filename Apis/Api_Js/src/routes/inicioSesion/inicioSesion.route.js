//Librerias
import express from "express";

//Controladores
import { inicioSesionController } from "../../controllers/inicioSesion/inicioSesion.controller.js";
import { cerrarSesionController } from "../../controllers/inicioSesion/cerrarSesion.controller.js";

let router = express.Router();

router.post("/Inicio_Sesion", inicioSesionController);
router.post("/Cerrar_Sesion", cerrarSesionController);

export default router;
//Librerias
import express from "express";

//Controladores
import { inicioSesionController } from "../../controllers/inicioSesion/inicioSesion.controller.js";

let router = express.Router();

router.post("/Inicio_Sesion", inicioSesionController);

export default router;
/* Librerias */
import express from "express";

/* Controladores y midlewares */
import { firmaMasivaController } from "../../controllers/firmasDigitales/firmaMasiva.controller.js";
import { midlewareTokens } from "../../middlewares/midlewareTokens.js";
import { midlewareArchivos } from "../../middlewares/midlwareArchivos.js";

let router = express.Router();

router.post("/Firma_Masiva", /*midlewareTokens,*/ midlewareArchivos.single('documento'), firmaMasivaController);

export default router;
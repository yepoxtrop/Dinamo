/* Librerias */
import express from "express";

/* Controladores y midlewares */
import { validarDocumentosController } from "../../controllers/documentos/validarDocumentos.controller.js";
import { midlewareTokens } from "../../controllers/midlewareTokens.js";
import { midlewareArchivos } from "../../controllers/midlwareArchivos.js";
import { midlewareRevisionArchivos } from "../../controllers/midlwareRevisionArchivos.js";

let router = express.Router();

router.post("/Validar_Documentos", /*midlewareTokens,*/ midlewareRevisionArchivos.array('documento', 30) ,validarDocumentosController);

export default router;
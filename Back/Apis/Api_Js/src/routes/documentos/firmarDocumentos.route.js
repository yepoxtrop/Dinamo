/* Librerias */
import express from "express";

/* Controladores y midlewares */
import { firmarDocumentosController } from "../../controllers/documentos/firmarDocumentos.controller.js";
import { midlewareTokens } from "../../controllers/midlewareTokens.js";
import { midlewareArchivos } from "../../controllers/midlwareArchivos.js";

let router = express.Router();

router.post("/Firmar_Documentos", midlewareTokens, midlewareArchivos.single('documentoPdf') ,firmarDocumentosController);

export default router;
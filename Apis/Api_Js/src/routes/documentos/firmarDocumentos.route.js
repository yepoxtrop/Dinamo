/* Librerias */
import express from "express";

/* Controladores y midlewares */
import { firmarDocumentosController } from "../../controllers/documentos/firmarDocumentos.controller.js";
import {
    listarDocumentosFirmadosController,
    descargarDocumentoFirmadoController,
	eliminarDocumentoFirmadoController,
} from "../../controllers/documentos/gestionarDocumentosFirmados.controller.js";
import { midlewareTokens } from "../../middlewares/midlewareTokens.js";
import { midlewareArchivos } from "../../middlewares/midlwareArchivos.js";

let router = express.Router();

router.post(
	"/Firmar_Documentos",
	midlewareTokens,
	midlewareArchivos.fields([
		{ name: 'documentoPdf', maxCount: 1 },
		{ name: 'certificadoP12', maxCount: 1 },
	]),
	firmarDocumentosController
);

router.get("/Documentos_Firmados", midlewareTokens, listarDocumentosFirmadosController);
router.get("/Documentos_Firmados/:id/descargar", midlewareTokens, descargarDocumentoFirmadoController);
router.delete("/Documentos_Firmados/:id", midlewareTokens, eliminarDocumentoFirmadoController);

export default router;
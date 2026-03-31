/* Librerias */
import express from "express";

/* Controladores y midlewares */
import { firmaIndividualController } from "../../controllers/firmasDigitales/firmaIndividual.controller.js";
import { midlewareTokens } from "../../middlewares/midlewareTokens.js";

let router = express.Router();

router.post("/Firma_Individual", midlewareTokens, firmaIndividualController);

export default router;
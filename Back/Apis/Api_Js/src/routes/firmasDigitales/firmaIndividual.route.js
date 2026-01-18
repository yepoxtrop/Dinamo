//Librerias
import express from "express";

//Controlador
import { firmaIndividualController } from "../../controllers/firmasDigitales/firmaIndividual.controller.js";

let router = express.Router();

router.post("/Firma_Individual", firmaIndividualController);

export default router;
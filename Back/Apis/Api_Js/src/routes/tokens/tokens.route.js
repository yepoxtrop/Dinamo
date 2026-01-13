//Controladores Creados
import { controller_tokens } from "../../controllers/tokens/tokens.controller.js";

//Liberias Instaladas
import express from "express";

const router = express.Router();

router.post("/tokens", controller_tokens);

export default router;
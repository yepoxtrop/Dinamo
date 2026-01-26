//Librerias
import express from "express"; 
import cors from "cors"; 
import cookieParser from 'cookie-parser';

//Rutas creadas
//--Inicio de Sesion
import rutaInicioSesion from "../src/routes/inicioSesion/inicioSesion.route.js";
//--Firmas
import rutaFirmaIndividual from "../src/routes/firmasDigitales/firmaIndividual.route.js";

const app = express(); 

/* Configuración de CORS */
app.use(express.json()) 
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(cookieParser()); 


/* rRutas */
app.use("/Dinamo_Js",rutaInicioSesion);
app.use("/Dinamo_Js",rutaFirmaIndividual);

export default app;
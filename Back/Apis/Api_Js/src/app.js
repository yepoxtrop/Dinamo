//Librerias
import express from "express"; 
import cors from "cors"; 

//Rutas creadas
//--Firmas
import rutaFirmaIndividual from "../src/routes/firmasDigitales/firmaIndividual.route.js";
//import ruta_solicitar_firmas from "../src/routes/solicitar_firmas/solicitar.firmas.route.js"; 
//import ruta_consultar_firmas from "../src/routes/solicitar_firmas/consultar.firmas.route.js";
//--Dominio
//import ruta_validar_dominio from "../src/routes/dominio/dominio.route.js"; 
//--Consultas SQL
//import ruta_consultar_usuario from "../src/routes/consultasSQL/consultar.usuario.route.js"; 
//import ruta_insertar_firmas from "../src/routes/consultasSQL/insertar.firmas.route.js"
//import ruta_insertar_sistema from "../src/routes/consultasSQL/insertar.sistema.route.js";
//--JSON Web Tokens
//import ruta_tokens from "../src/routes/tokens/tokens.route.js"; 

const app = express(); 

app.use(express.json()) 
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// app.use("/FIRMAS_ACS",ruta_solicitar_firmas); 
// app.use("/FIRMAS_ACS",ruta_consultar_firmas); 
// app.use("/FIRMAS_ACS",ruta_validar_dominio); 
// app.use("/FIRMAS_ACS",ruta_consultar_usuario); 
// app.use("/FIRMAS_ACS",ruta_insertar_firmas); 
// app.use("/FIRMAS_ACS",ruta_insertar_sistema); 
// app.use("/FIRMAS_ACS",ruta_tokens); 
app.use("/Dinamo_Js",rutaFirmaIndividual);



export default app;
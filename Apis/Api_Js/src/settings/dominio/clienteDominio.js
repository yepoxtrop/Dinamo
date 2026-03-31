//Librerias
import { Client } from "ldapts";

//Constantes
import { dominio_url, dominio_puerto } from "./variablesDominio.js";


export const clienteDominio = new Client({
    url: `ldap://${dominio_url}:${dominio_puerto}`,
    timeout: 0,
    connectTimeout: 0,
    strictDN: true
})

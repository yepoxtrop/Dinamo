//Librerias
import { config } from "dotenv";

//Configuraciones Hechas
import { transportador } from "../../config/correo/config.correo.js";

//Objetos Creados
import { supervisores } from "../../settings/objetos/supervisores.js";

export async function correo_usuario_exito(datos) {
    try {
        let correo = await transportador.sendMail({
            from:`"FIRMAS ACS" <${transportador.options.auth.user}>`,
            to:datos.correo,
            subject:"Correo de confirmación",
            html:`
                    <table style="background-color:rgb(0, 168, 195);width:100%;" border="0">
                        <tbody >
                            <tr>
                                <td style="width:3rem;"><img src="cid:logo_svg" style="width:3rem"/></td>
                                <td><span style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1.7rem;color:rgb(255,255,255);"><strong>FIRMAS DIGITALES</strong></span></td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1.1rem;">
                        <span class="resaltados" style="font-weight: bold;color: rgb(12, 33, 53);">
                            Cordial saludo
                        </span>
                    </h3>

                    <p style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1rem;">
                        Estimad@ <span class="resaltados" style="font-weight: bold;color: rgb(12, 33, 53);">${datos.nombre}</span> espero te encuentres muy bien. De parte de <span class="resaltados" style="font-weight: bold;color: rgb(12, 33, 53);">ACS - Aciel Soluciones Integrales S.A.S y el equipo de soporte técnico</span>,te notificamos que la creación de tu firma digital ha sido creada satisfactoriamente, la firma la podrás encontrar dentro de la plataforma y allí mismo la podrás usar.
                    </p>
                    
                    <p style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1rem;">
                        Debes de tener en cuenta lo siguiente para el manejo y uso de tu firma digital:
                    </p>

                    <ul class="lista1">
                        <li class="texto" style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1rem;" >
                            La contraseña de tu firma es la misma que colocaste en el formulario de creación y solicitud de firmas.
                        </li>
                        <li class="texto" style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1rem;">           
                            Únicamente puedes hacer uso de las firmas dentro de la plataforma de firmas digitales.
                        </li>
                        <li class="texto" style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1rem;">           
                            Para hacer uso de las firmas digitales debes de tener un documento en formato PDF cargado en el sitema.
                        </li>
                        <li class="texto" style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1rem;">
                            Las firmas vencen, tienen una durabilidad semestral, por lo que deberás de solicitar una nueva firma pasado dicho tiempo.
                        </li>
                    </ul>

                    <p class="texto" style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1rem;">
                        En caso de presentar algún inconveniente con las firmas puedes crear un caso en las siguientes mesas de ayuda:
                    </p>

                    <ul class="lista2" style="width: 100%;">
                        <li class="texto" style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1rem;">HelpDesk ACS: <a href="https://helpdesk.acielcolombia.com:8080" target="_blank" class="hipervinculos-mesa" style="text-decoration: none; color: rgb(0, 168, 195);">https://helpdesk.acielcolombia.com:8080</a></li>
                        <li class="texto" style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1rem;">HelpDesk NuevaEPS: <a href="https://helpdeskneps.acielcolombia.com:86/helpdeskacsneps" target="_blank" class="hipervinculos-mesa" style="text-decoration: none; color: rgb(0, 168, 195);">https://helpdeskneps.acielcolombia.com:86/helpdeskacsneps</a></li>
                    </ul>

                    <p class="texto" style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1rem;">
                        <span style="font-weight: bold;color: rgb(12, 33, 53);">NOTA:</span> Ten en cuenta que este correo es enviado a tu coordinador de calidad, es decir al señor o señora <span style="font-weight: bold;color: rgb(12, 33, 53);">${datos.supervisor}</span> para que él pueda tener el seguimiento de las veces en las que has solicitado la creación de tu firma.
                    </p>

                    <p class="texto" style="font-family:'Segoe UI', 'Lucida Sans', sans-serif; font-size: 1rem;">
                        <span class="resaltados" style="font-weight: bold;color: rgb(12, 33, 53);">Cordialmente Firmas ACS.</span>
                    </p>
            
                        <table id="x_table_0_0_0" style="font-family: 'Segoe UI', 'Lucida Sans', sans-serif; font-size: 14.16px; width: 465.75pt; color: #242424; border-collapse: collapse; border-spacing: 0px;">
                            <tbody>
                                <tr>
                                    <td style="padding: 0cm; width: 255.75pt; height: 22px;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">&nbsp;</span></p>
                                    </td>
                                    <td rowspan="6" style="border-left: 1pt solid #cdcdcd; padding: 0cm; width: 8.8pt; height: 22px;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;">&nbsp;</span></p>
                                    </td>
                                    <td style="padding: 0cm; width: 21.45pt; height: 22px;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;">&nbsp;</span></p>
                                    </td>
                                    <td style="padding: 0cm; width: 225.55pt; height: 22px;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;">&nbsp;</span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td rowspan="4" style="padding: 0cm; width: 255.75pt; height: 7.5pt;">
                                        <p class="elementToProof" style="margin: 0cm;"><span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">&nbsp;</span><span style="font-family: aptos, aptos_embeddedfont, aptos_msfontservice, calibri, helvetica, sans-serif; font-size: 16px; color: #000000;"><span class="Object" role="link" id="OBJ_PREFIX_DWT61_com_zimbra_url" style="color: #005a95; cursor: pointer;"><a href="https://aciel.co/acielemailsig/acsiso900120152020.pdf" rel="noopener noreferrer nofollow noopener noreferrer" target="_blank" style="color: #005a95; text-decoration-line: none; cursor: pointer; margin: 0px;"><img alt="logo-completo" id="x_x_x_x_image_0_0_0" width="358" height="86" pnsrc="cid:imgLogo" src="cid:logo_footer" saveddisplaymode="" style="width: 358px; height: 86px; max-width: 746px; margin: 0px;" /></a></span></span></p>
                                        <div class="elementToProof" style="margin: 0cm; font-family: verdana, sans-serif; font-size: 10.5pt; color: black;"></div>
                                    </td>
                                    <td style="padding: 0cm; width: 21.45pt; height: 7.5pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;"><img width="12" height="12" alt="correo" pnsrc="cid:imgCorreo" src="cid:correo_footer" style="width: 12px; height: 12px; min-width: auto; min-height: auto; margin: 0px;" /></span></p>
                                    </td>
                                    <td style="padding: 0cm; width: 225.55pt; height: 7.5pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 9pt; color: rgb(0, 168, 195);"><u>firmas<span class="Object" role="link" id="OBJ_PREFIX_DWT62_ZmEmailObjectHandler" style="color: #005a95; text-decoration-line: none; cursor: pointer;"><a href="mailto:firmas@acielcolombia.com" target="_blank" rel="nofollow noopener noreferrer" style="color: rgb(0, 168, 195); text-decoration-line: none; cursor: pointer; margin: 0px;">@acielcolombia.com</a></span></u></span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0cm; width: 21.45pt; height: 7.5pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;"><img width="12" height="12" alt="telefono" pnsrc="cid:imgTelefono" src="cid:telefono_footer" style="width: 12px; height: 12px; min-width: auto; min-height: auto; margin: 0px;" /></span></p>
                                    </td>
                                    <td style="padding: 0cm; width: 225.55pt; height: 7.5pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 9pt; color: black;"><span class="Object" role="link" id="OBJ_PREFIX_DWT63_com_zimbra_phone" style="color: #005a95; cursor: pointer;"><a href="callto:+57 (601) 268-7585" style="color: rgb(0, 168, 195); text-decoration-line: none; cursor: pointer;">+57&nbsp;(601) 268-7585</a></span></span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0cm; width: 21.45pt; height: 3.75pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;"><img width="12" height="12" alt="direccion" pnsrc="cid:imgDireccion" src="cid:direccion_footer" style="width: 12px; height: 12px; min-width: auto; min-height: auto; margin: 0px;" /></span></p>
                                    </td>
                                    <td style="padding: 0cm; width: 225.55pt; height: 3.75pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 9pt; color: rgb(0, 168, 195);">Calle 85A #28C11, Bogot&aacute;, Colombia, 111211</span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0cm; width: 21.45pt; height: 3.75pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;"><img width="12" height="12" pnsrc="cid:imgHipervinculo" alt="pagina-web" src="cid:hipervinculo_footer" style="width: 12px; height: 12px; min-width: auto; min-height: auto; margin: 0px;" /></span></p>
                                    </td>
                                    <td style="padding: 0cm; width: 225.55pt; height: 3.75pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 9pt; color: blue;"><u><span class="Object" role="link" id="OBJ_PREFIX_DWT64_com_zimbra_url" style="color: #005a95; text-decoration-line: none; cursor: pointer;"><a href="https://aciel.co/" rel="noopener noreferrer nofollow noopener noreferrer" target="_blank" style="color: rgb(0, 168, 195); text-decoration-line: none; cursor: pointer; margin: 0px;">https://aciel.co/</a></span></u></span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0cm; width: 255.75pt; height: 7.5pt;"></td>
                                    <td style="padding: 0cm; width: 21.45pt; height: 7.5pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;">&nbsp;</span></p>
                                    </td>
                                    <td style="padding: 0cm; width: 225.55pt; height: 7.5pt;">
                                        <p align="right" class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;">
                                            <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: blue;">
                                                <u>
                                                    <span class="Object" role="link" id="OBJ_PREFIX_DWT65_com_zimbra_url" style="color: #005a95; text-decoration-line: none; cursor: pointer;">
                                                        <a href="https://www.linkedin.com/company/acielcolombia/mycompany/" rel="noopener noreferrer nofollow noopener noreferrer" target="_blank" style="color: blue; text-decoration-line: none; cursor: pointer; margin: 0px;">
                                                            <img width="23" height="23" pnsrc="cid:imgLinkedin" src="cid:linkedin_footer" style="width: 23px; height: 23px; min-width: auto; min-height: auto; margin: 0px;" />
                                                        </a>
                                                    </span>
                                                </u>
                                            </span>
                                            <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">&nbsp;</span>
                                            <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: blue;">
                                                <u>
                                                    <span class="Object" role="link" id="OBJ_PREFIX_DWT66_com_zimbra_url" style="color: #005a95; text-decoration-line: none; cursor: pointer;">
                                                        <a href="https://www.facebook.com/AcielColombia.S.A.S" rel="noopener noreferrer nofollow noopener noreferrer" target="_blank" style="color: blue; text-decoration-line: none; cursor: pointer; margin: 0px;">
                                                            <img width="23" height="23" pnsrc="cid:imgFacebook" src="cid:facebook_footer" style="width: 23px; height: 23px; min-width: auto; min-height: auto; margin: 0px;" />
                                                        </a>
                                                    </span>
                                                </u>
                                            </span>
                                            <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">&nbsp;</span>
                                            <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: blue;">
                                                <u>
                                                    <span class="Object" role="link" id="OBJ_PREFIX_DWT67_com_zimbra_url" style="color: #005a95; text-decoration-line: none; cursor: pointer;">
                                                        <a href="https://www.youtube.com/channel/UC2xTc4uxduvw0DXv670Sjcw" rel="noopener noreferrer nofollow noopener noreferrer" target="_blank" style="color: blue; text-decoration-line: none; cursor: pointer; margin: 0px;">
                                                            <img width="33" height="23" pnsrc="cid:imgYoutube" src="cid:youtube_footer" style="width: 33px; height: 23px; min-width: auto; min-height: auto; margin: 0px;" />
                                                        </a>
                                                    </span>
                                                </u>
                                            </span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0cm; width: 255.75pt; height: 7.5pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;">
                                            <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">&nbsp;</span>
                                        </p>
                                    </td>
                                    <td style="padding: 0cm; width: 9.55pt; height: 7.5pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;">
                                            <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">&nbsp;</span>
                                        </p>
                                    </td>
                                    <td style="padding: 0cm; width: 21.45pt; height: 7.5pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;">
                                            <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">&nbsp;</span>
                                        </p>
                                    </td>
                                    <td style="padding: 0cm; width: 225.55pt; height: 7.5pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;">
                                            <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">&nbsp;</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" style="border-top: 1pt solid #cdcdcd; padding: 0cm; width: 512.25pt; height: 3.75pt;">
                                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;">
                                            <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">
                                                <img id="x_image_1" width="683" height="260" pnsrc="cid:imgDescripcion" src="cid:descripcion_footer" style="width: 683px; height: 260px; min-width: auto; min-height: auto; margin: 0px;" />
                                            </span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>`,
            attachments:[
                {
                    filename:"",
                    path:"./src/others/plantillaCorreo/src/img/Logo-mi.png",
                    cid:"logo_svg"
                },
                {
                    filename:"",
                    path:"./src/others/plantillaCorreo/src/img/logo.png",
                    cid:"logo_footer"
                },
                {
                    filename:"",
                    path:"./src/others/plantillaCorreo/src/img/correo.png",
                    cid:"correo_footer"
                },
                {
                    filename:"",
                    path:"./src/others/plantillaCorreo/src/img/direccion.png",
                    cid:"direccion_footer"
                },
                {
                    filename:"",
                    path:"./src/others/plantillaCorreo/src/img/telefono.png",
                    cid:"telefono_footer"
                },
                {
                    filename:"",
                    path:"./src/others/plantillaCorreo/src/img/hipervinculo.png",
                    cid:"hipervinculo_footer"
                },
                {
                    filename:"",
                    path:"./src/others/plantillaCorreo/src/img/facebook.png",
                    cid:"facebook_footer"
                },
                {
                    filename:"",
                    path:"./src/others/plantillaCorreo/src/img/youtube.png",
                    cid:"youtube_footer"
                },
                {
                    filename:"",
                    path:"./src/others/plantillaCorreo/src/img/linkedin.png",
                    cid:"linkedin_footer"
                },
                {
                    filename:"",
                    path:"./src/others/plantillaCorreo/src/img/descripcion.png",
                    cid:"descripcion_footer"
                },
            ]
        })
        return {"Mensaje":"Correo enviado", 
                "Estado":true, 
                "Correo":correo, 
                "Error":null}
    } catch (error) {
        return {"Mensaje":"Correo no enviado", 
                "Estado":false, 
                "Correo":null,
                "Error":error}
    }
}

//Objeto Que Recibe la funcion
// let datos={
//     "nombre":"Luis Angel Sarmiento Diaz",
//     "correo":"sarmientodiazluisangel@gmail.com",
//     "supervisor":"SIGILFREDO LARA GONZALEZ",
//     "numero":3218854561
// }
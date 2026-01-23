/*========================================================================================================================
FECHA CREACION: 2026/01/22
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Sp para insertar los tokens creados para las sesiones de un usuario, variables
				@usuarioDominioId  -> Id del usuario en la tabla usuarios
				@tokenValor -> Valor del token creado en JS
FECHA MODIFICACION: 2026/01/22
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
MODIFICACION      : Se crea sp
========================================================================================================================*/

/* Usar la base de datos */
use Dinamo;
go

/* Elimina sp si existe */ 
if OBJECT_ID('usp_inicio_sesion') is not null
	drop procedure usp_inicio_sesion;
go

/* Crear o modificar sp */
create or alter procedure usp_inicio_sesion 
	@usuarioDominio         nvarchar(45), 
    @nombreCompletoUsuario  nvarchar(300), 
	@fechaInicioSesion      datetime2, 
    @dispositivoSesion      nvarchar(50)
as
	begin

        /* Variables */
        declare @usuarioId              int;
        declare @usuarioIdRol           int;
        declare @mensajeEncabezado      nvarchar(MAX);
        declare @mensajeBienvenidaPt1   nvarchar(MAX);
        declare @mensajeBienvenidaPt2   nvarchar(MAX);
        declare @mensajeFirma           nvarchar(MAX);
        declare @mensajeHtml            nvarchar(MAX);

        set @mensajeEncabezado = N'
        <table style="background-color:rgb(0, 168, 195);width:100%;" border="0">
		    <tbody >
		        <tr>
		            <td style="width:3rem;"><img src="https://raw.githubusercontent.com/yepoxtrop/Dinamo/main/Back/Apis/Api_Js/src/settings/others/plantillaCorreo/src/img/Logo-mi.png" style="width:3rem"/></td>
		            <td><span style="font-family:Segoe UI, Lucida Sans, sans-serif; font-size: 1.7rem;color:rgb(255,255,255);"><strong>FIRMAS DIGITALES</strong></span></td>
		        </tr>
		    </tbody>
		</table>
        ';

        set @mensajeBienvenidaPt1 = N'
        <h3 style="font-family:Segoe UI, Lucida Sans, sans-serif; font-size: 1.1rem;">
	        <span class="resaltados" style="font-weight: bold;color: rgb(12, 33, 53);">Bienvenido al Sistema de Firmas ACS</span>
        </h3>
        <p style="font-family:Segoe UI, Lucida Sans, sans-serif; font-size: 1rem;">Estimad@ <span class="resaltados" style="font-weight: bold;color: rgb(12, 33, 53);">
        ';

        set @mensajeBienvenidaPt2 = N'
        </span> estás a un paso de firmar documentos de forma rápida, segura y 100% legal. Con nuestro aplicativo web, olvídate del papeleo: firma contratos, acuerdos y actas en cuestión de segundos.</p>            
	    <p style="font-family:Segoe UI, Lucida Sans, sans-serif; font-size: 1rem;">Nos caracterizamos por:</p>           
		<ul>
		    <li>Crear tu firma digital con validez legal.</li>
		    <li>Validar la autenticidad de los documentos pdf con firmas externas.</li>
		    <li>Firmar documentos pdf.</li>
		    <li>Generar reportes sobre los documentos validados.</li>
		</ul>
        ';

        set @mensajeFirma = N'
		<p class="texto" style="font-family:Segoe UI, Lucida Sans, sans-serif; font-size: 1rem;">
            <span class="resaltados" style="font-weight: bold;color: rgb(12, 33, 53);">Cordialmente Firmas ACS.</span>
        </p>
		<table id="x_table_0_0_0" style="font-family: Segoe UI, Lucida Sans, sans-serif; font-size: 14.16px; width: 465.75pt; color: #242424; border-collapse: collapse; border-spacing: 0px;">
            <tbody>
                <tr>
                    <td style="padding: 0cm; width: 255.75pt; height: 22px;">
                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;">
                            <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">&nbsp;</span>
                        </p>
                    </td>
                    <td rowspan="6" style="border-left: 1pt solid #cdcdcd; padding: 0cm; width: 8.8pt; height: 22px;">
                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;">
                            <span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;">&nbsp;</span>
                        </p>
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
                        <p class="elementToProof" style="margin: 0cm;">
                            <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">&nbsp;</span>
                                <span style="font-family: aptos, aptos_embeddedfont, aptos_msfontservice, calibri, helvetica, sans-serif; font-size: 16px; color: #000000;">
                                <span class="Object" role="link" id="OBJ_PREFIX_DWT61_com_zimbra_url" style="color: #005a95; cursor: pointer;">
                                    </a>
                                    <a href="https://aciel.co/acielemailsig/acsiso900120152020.pdf" rel="noopener noreferrer nofollow noopener noreferrer" target="_blank" style="color: #005a95; text-decoration-line: none; cursor: pointer; margin: 0px;">
                                    <img alt="logo-completo" id="x_x_x_x_image_0_0_0" width="358" height="86"  src="https://raw.githubusercontent.com/yepoxtrop/Dinamo/main/Back/Apis/Api_Js/src/settings/others/plantillaCorreo/src/img/logo.png" saveddisplaymode="" style="width: 358px; height: 86px; max-width: 746px; margin: 0px;" />
                                </span>
                            </span>
                        </p>
                        <div class="elementToProof" style="margin: 0cm; font-family: verdana, sans-serif; font-size: 10.5pt; color: black;"></div>
                    </td>
                    <td style="padding: 0cm; width: 21.45pt; height: 7.5pt;">
                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;"><img width="12" height="12" alt="correo" pnsrc="cid:imgCorreo" src="https://raw.githubusercontent.com/yepoxtrop/Dinamo/main/Back/Apis/Api_Js/src/settings/others/plantillaCorreo/src/img/correo.png" style="width: 12px; height: 12px; min-width: auto; min-height: auto; margin: 0px;" /></span></p>
                    </td>
                    <td style="padding: 0cm; width: 225.55pt; height: 7.5pt;">
                        <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 9pt; color: rgb(0, 168, 195);"><u>firmas<span class="Object" role="link" id="OBJ_PREFIX_DWT62_ZmEmailObjectHandler" style="color: #005a95; text-decoration-line: none; cursor: pointer;"><a href="mailto:firmas@acielcolombia.com" target="_blank" rel="nofollow noopener noreferrer" style="color: rgb(0, 168, 195); text-decoration-line: none; cursor: pointer; margin: 0px;">@acielcolombia.com</a></span></u></span></p>
                    </td>
                </tr>
                <tr>
                   <td style="padding: 0cm; width: 21.45pt; height: 7.5pt;">
                       <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;"><img width="12" height="12" alt="telefono" pnsrc="cid:imgTelefono" src="https://raw.githubusercontent.com/yepoxtrop/Dinamo/main/Back/Apis/Api_Js/src/settings/others/plantillaCorreo/src/img/telefono.png" style="width: 12px; height: 12px; min-width: auto; min-height: auto; margin: 0px;" /></span></p>
                   </td>
                   <td style="padding: 0cm; width: 225.55pt; height: 7.5pt;">
                       <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 9pt; color: black;"><span class="Object" role="link" id="OBJ_PREFIX_DWT63_com_zimbra_phone" style="color: #005a95; cursor: pointer;"><a href="callto:+57 (601) 268-7585" style="color: rgb(0, 168, 195); text-decoration-line: none; cursor: pointer;">+57&nbsp;(601) 268-7585</a></span></span></p>
                   </td>
                </tr>
                <tr>
                   <td style="padding: 0cm; width: 21.45pt; height: 3.75pt;">
                       <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;"><img width="12" height="12" alt="direccion" pnsrc="cid:imgDireccion" src="https://raw.githubusercontent.com/yepoxtrop/Dinamo/main/Back/Apis/Api_Js/src/settings/others/plantillaCorreo/src/img/direccion.png" style="width: 12px; height: 12px; min-width: auto; min-height: auto; margin: 0px;" /></span></p>
                   </td>
                   <td style="padding: 0cm; width: 225.55pt; height: 3.75pt;">
                       <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 9pt; color: rgb(0, 168, 195);">Calle 85A #28C11, Bogot&aacute;, Colombia, 111211</span></p>
                   </td>
                </tr>
                <tr>
                   <td style="padding: 0cm; width: 21.45pt; height: 3.75pt;">
                       <p class="elementToProof" style="margin: 0cm; font-family: aptos, sans-serif; font-size: 12pt;"><span style="font-family: verdana, sans-serif; font-size: 11pt; color: black;"><img width="12" height="12" pnsrc="cid:imgHipervinculo" alt="pagina-web" src="https://raw.githubusercontent.com/yepoxtrop/Dinamo/main/Back/Apis/Api_Js/src/settings/others/plantillaCorreo/src/img/hipervinculo.png" style="width: 12px; height: 12px; min-width: auto; min-height: auto; margin: 0px;" /></span></p>
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
                                           <img width="23" height="23" pnsrc="cid:imgLinkedin" src="https://raw.githubusercontent.com/yepoxtrop/Dinamo/main/Back/Apis/Api_Js/src/settings/others/plantillaCorreo/src/img/linkedin.png" style="width: 23px; height: 23px; min-width: auto; min-height: auto; margin: 0px;" />
                                       </a>
                                   </span>
                               </u>
                           </span>
                           <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">&nbsp;</span>
                           <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: blue;">
                               <u>
                                   <span class="Object" role="link" id="OBJ_PREFIX_DWT66_com_zimbra_url" style="color: #005a95; text-decoration-line: none; cursor: pointer;">
                                       <a href="https://www.facebook.com/AcielColombia.S.A.S" rel="noopener noreferrer nofollow noopener noreferrer" target="_blank" style="color: blue; text-decoration-line: none; cursor: pointer; margin: 0px;">
                                           <img width="23" height="23" pnsrc="cid:imgFacebook" src="https://raw.githubusercontent.com/yepoxtrop/Dinamo/main/Back/Apis/Api_Js/src/settings/others/plantillaCorreo/src/img/facebook.png" style="width: 23px; height: 23px; min-width: auto; min-height: auto; margin: 0px;" />
                                       </a>
                                   </span>
                               </u>
                           </span>
                           <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: black;">&nbsp;</span>
                           <span style="font-family: verdana, sans-serif; font-size: 10.5pt; color: blue;">
                               <u>
                                   <span class="Object" role="link" id="OBJ_PREFIX_DWT67_com_zimbra_url" style="color: #005a95; text-decoration-line: none; cursor: pointer;">
                                       <a href="https://www.youtube.com/channel/UC2xTc4uxduvw0DXv670Sjcw" rel="noopener noreferrer nofollow noopener noreferrer" target="_blank" style="color: blue; text-decoration-line: none; cursor: pointer; margin: 0px;">
                                           <img width="33" height="23" pnsrc="cid:imgYoutube" src="https://raw.githubusercontent.com/yepoxtrop/Dinamo/main/Back/Apis/Api_Js/src/settings/others/plantillaCorreo/src/img/youtube.png" style="width: 33px; height: 23px; min-width: auto; min-height: auto; margin: 0px;" />
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
                               <img id="x_image_1" width="683" height="260" pnsrc="cid:imgDescripcion" src="https://raw.githubusercontent.com/yepoxtrop/Dinamo/main/Back/Apis/Api_Js/src/settings/others/plantillaCorreo/src/img/descripcion.png" style="width: 683px; height: 260px; min-width: auto; min-height: auto; margin: 0px;" />
                           </span>
                       </p>
                   </td>
                </tr>
            </tbody>
        </table>
        ';

        
        begin try
            
            /* Validar si las variables no esta vacias */
            if @usuarioDominio is null or @nombreCompletoUsuario  is null or  @fechaInicioSesion  is null or  @dispositivoSesion is null
                throw 5002, 'Error en las variables, alguna esta vacia', 1; 

            /* Validar si el usuario existe  */
            if not exists (select *from usuarios where usuario_nombre = @usuarioDominio)
				begin 

                    /* Insertar usuario y sesion */
					insert into usuarios(usuario_nombre) values(@usuarioDominio);
                    select @usuarioId = usuario_id, @usuarioIdRol = rol_id_fk from usuarios where usuario_nombre = @usuarioDominio; 
					insert into sesiones(sesion_fecha,sesion_dispositivo,usuario_id_fk) values(@fechaInicioSesion, @dispositivoSesion, @usuarioId);

                    /* Enviar correo de bienvenida */
                    begin try
                        set @mensajeHtml = CONCAT(@mensajeEncabezado, @mensajeBienvenidaPt1, @nombreCompletoUsuario, @mensajeBienvenidaPt2, @mensajeFirma);
                        exec msdb.dbo.sp_send_dbmail @profile_name = 'Correos Pruebas',
					        @recipients = 'lsarmiento@aciel.co',
					        @subject = 'Correo de Bienvenida - Firmas ACS',
					        @body = @mensajeHtml,
					        @body_format = 'HTML'
                    end try
                    begin catch
                        throw 5003, 'Error al enviar el correo', 1; 
                    end catch

                    /* Resultados */
                    select @usuarioId as usuario_id, @usuarioIdRol as rol_id_fk;
				    print('Usuario creado en la base de datos');
				end
			else

                /* Insertar sesion */
                select @usuarioId = usuario_id, @usuarioIdRol = rol_id_fk from usuarios where usuario_nombre = @usuarioDominio; 
				insert into sesiones(sesion_fecha,sesion_dispositivo,usuario_id_fk) values(@fechaInicioSesion, @dispositivoSesion, @usuarioId);

                /* Resultados */
                select @usuarioId as usuario_id, @usuarioIdRol as rol_id_fk;
        end try
        begin catch
            throw 5001, 'Error en el select o insert de las tablas usaurios o sesiones', 1;
        end catch
            
	end
go



-- exec sp_inicio_sesion 'johan.rojas', 'Johan Nicolas Rojas Jimenez', '2026-12-25 14:30:00.1230000', 'ACER';


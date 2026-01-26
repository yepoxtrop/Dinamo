/*========================================================================================================================
FECHA CREACION: 2026/01/22
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Sp para enviar correos,
				@cuerpoCorreo
FECHA MODIFICACION: 2026/01/22
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
MODIFICACION      : Se modifica el sp para que envie unicamente correos, el sp recibe el cuerpo en HTML,
                    los remitentes y el asunto del mismo. La idea es llamar el sp desde prisma.
========================================================================================================================*/

/* Usar la base de datos */
use Dinamo;
go

/* Elimina sp si existe */ 
if OBJECT_ID('usp_enviar_correos') is not null
	drop procedure usp_enviar_correos;
go

/* Crear o modificar sp */
create or alter procedure usp_enviar_correos
	@cuerpoCorreo   nvarchar(MAX), 
    @destinatarios  nvarchar(1000), 
	@tituloCorrreo  nvarchar(500)
as
	begin
        begin try
            /* Enviar correo de bienvenida */
            
            exec msdb.dbo.sp_send_dbmail @profile_name = 'Correos Pruebas',
	            @recipients = @destinatarios,
	            @subject = @tituloCorrreo,
	            @body = @cuerpoCorreo,
	            @body_format = 'HTML'
                  
            /* Resultados */
	        print('Correo enviado satisfactoriamente');
        end try
        begin catch
            select @@ERROR;
            throw 50001, 'Error en el select o insert de las tablas usaurios o sesiones', 1;
        end catch
            
	end
go



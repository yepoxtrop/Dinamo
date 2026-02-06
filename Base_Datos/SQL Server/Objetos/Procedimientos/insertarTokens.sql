/*========================================================================================================================
FECHA CREACION: 2026/01/22
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Sp para insertar los tokens creados para las sesiones de un usuario, variables
				@usuarioId  -> Id del usuario en la tabla usuarios
				@tokenValor -> Valor del token creado en JS
FECHA MODIFICACION: 2026/01/22
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
MODIFICACION      : Se crea sp
========================================================================================================================*/

/* Usar la base de datos */
use Dinamo;
go

/* Elimina sp si existe */ 
if OBJECT_ID('usp_insertar_tokens') is not null
	drop procedure usp_insertar_tokens;
go

/* Crear o modificar sp */
create or alter procedure usp_insertar_tokens 
	@usuarioId  int,
	@tokenValor nvarchar(200)
as
	begin

		/* Depuracion de errores */
		begin try
			
			/* Validar contenido de variables */
			if @usuarioId is null or @tokenValor is null
				throw 5001, 'Variables vacias', 2;
			
			/* Insertar token */
			insert into tokens(token_valor, usuario_id_fk ) values(@tokenValor, @usuarioId);
			print('Token insertado'); 
		end try
		begin catch
			throw 5001, 'Error al insertar el token', 1; 
		end catch
	end
go
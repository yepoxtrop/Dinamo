/*========================================================================================================================
FECHA CREACION: 2026/03/31
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Sp iniciar sesion,
				@cuerpoCorreo
FECHA MODIFICACION: 2026/03/21
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
========================================================================================================================*/

use Dinamo;
go

create or alter procedure usp_inicio_sesion
	@fecha					datetime2,
	@nombreUsuarioDominio	nvarchar(200),
	@nombreUsuarioReal		nvarchar(500),
	@dispositivo			nvarchar(200)
as
begin 
	
	/* Variables locales */
	declare @usuarioId		int;
	declare @usuarioNombre	nvarchar(200);

	/* Consultar si el usuario existe en la base */
	select [usuario_id] = @usuarioId from [dbo].[usuarios] where [usuario_nombre] = @nombreUsuarioDominio;

	if @usuarioId = null
		insert into [dbo].[usuarios]

end
/*========================================================================================================================
FECHA CREACION: 2026/03/19
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Script de procedimientos almacenados enfocados en los reportes de la aplicacion
FECHA MODIFICACION: 2026/03/19
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
MODIFICACION      : Se modifican los comentarios de restricciones
========================================================================================================================*/

/* Usar la base de datos */
use Dinamo;
go

/*
PROCEDIMIENTO:	usp_insertar_peticiones
DESCRIPCION:	Se encarga de insertar la petición más reciente y capturar su id
RESULTADO:		Se retorna el id de la peticion
VARIABLES DE ENTRADA:	-idUsuario:id del usuario que carga la peticion
						-peticionFecha:fecha en la que s ecarga la peticion
						-peticionNombre:nombre de la peticion
VARIABLES LOCALES:		-idPeticionNueva:id de la peticion
*/
create or alter procedure usp_insertar_peticiones 
	@idUsuario		int,
	@peticionFecha	datetime2,
	@peticionNombre	nvarchar(MAX)
as
begin
	/* Variables locales para el resto del usp */
	declare @idPeticionNueva int;

	/* Operaciones en tabla <documentos_validados> 
		- Insertar documento
		- Consultar documento
	*/
	insert into [dbo].[peticiones_validacion](
		[peticion_validacion_fecha], 
		[peticion_validacion_nombre], 
		[usuario_id_fk]
	) values (@peticionFecha, @peticionNombre, @idUsuario);
	set @idPeticionNueva = (select top 1 [peticion_validacion_id] from [dbo].[peticiones_validacion]  where [usuario_id_fk] = @idUsuario order by [peticion_validacion_id] desc);
	select @idPeticionNueva as 'IdPeticion';
end
go

/*
PROCEDIMIENTO:	usp_insertar_documentos
DESCRIPCION:	Se encarga de insertar la petición más reciente y capturar su id
VARIABLES DE ENTRADA:	-idPeticion:
						-documentoNombre:
						-documentoUbicacion:
						-documentoEstado:
						-documentoCausaEstado:
						-documentoTotalFirmas:
						-documentoFirmasVencidas:
						-documentoTipo:
VARIABLES LOCALES:		-idDocumentoNuevo:id de la peticion
*/
create or alter procedure usp_insertar_documentos
	@idPeticion				 int,
	@documentoNombre		 nvarchar(MAX),
	@documentoUbicacion		 nvarchar(MAX),
	@documentoEstado		 bit,
	@documentoCausaEstado	 nvarchar(MAX),
	@documentoTotalFirmas	 int,
	@documentoFirmasVencidas int,
	@documentoTipo			 nvarchar(30)
as
begin
	/* Variables locales para el resto del usp */
	declare @idDocumentoNuevo int;

	/* Operaciones en tabla <documentos_validados> 
		- Insertar peticion
		- Consultar peticion
	*/
	insert into [dbo].[documentos_validados](
		[documento_validado_nombre],
		[documento_validado_ubicacion],
		[documento_validado_estado],
		[documento_validado_causa_estado],
		[documento_validado_total_firmas],
		[documento_validado_firmas_vencidas],
		[documento_validado_tipo],
		[peticion_validacion_id_fk]
	) values(
		@documentoNombre, 
		@documentoUbicacion, 
		@documentoEstado, 
		@documentoCausaEstado, 
		@documentoTotalFirmas, 
		@documentoFirmasVencidas, 
		@documentoTipo,
		@idPeticion
	);
	set @idDocumentoNuevo = (select top 1 [documento_validado_id] from [dbo].[documentos_validados] where [peticion_validacion_id_fk] = @idPeticion order by [documento_validado_id] desc);
	select @idDocumentoNuevo as 'IdDocumento';
end
go

/*
PROCEDIMIENTO:	usp_insertar_certficiados
DESCRIPCION:	Se encarga de insertar la petición más reciente y capturar su id
VARIABLES DE ENTRADA:	-@idDocumento			
						-@certificadoNumero							
						-@certificadoVersion				
						-@certificadoSerial							
						-@certificadoOid								 
						-@certificadoCreacion						
						-@certificadoVencimiento						
						-@certificadoEstado							 
						-@certificadoEditor							
						-@certificadoSujeto							
						-@certificadoCausaEstado						
						-@certificadoUso								 
						-@certificadoValidacionVencimientoEstado		
						-@certificadoValidacionVencimientoDescripcion 
						-@certificadoValidacionUsoEstado	
						-@certificadoValidacionUsoDescripcion	
						-@certificadoValidacionHashEstado
						-@certificadoValidacionHashDescripcion	
						-@certificadoValidacionIntegridadEstado		
						-@certificadoValidacionIntegridadDescripcion
*/
create or alter procedure usp_insertar_certficiados
	@idDocumento								 int,
	@certificadoNumero							 int,
	@certificadoVersion							 nvarchar(100),
	@certificadoSerial							 nvarchar(200), 
	@certificadoOid								 nvarchar(200),
	@certificadoCreacion						 date,
	@certificadoVencimiento						 date,
	@certificadoEstado							 bit,
	@certificadoEditor							 nvarchar(MAX),
	@certificadoSujeto							 nvarchar(MAX),
	@certificadoCausaEstado						 nvarchar(MAX),
	@certificadoUso								 date,
	@certificadoValidacionVencimientoEstado		 bit,
	@certificadoValidacionVencimientoDescripcion nvarchar(MAX),
	@certificadoValidacionUsoEstado				 bit,
	@certificadoValidacionUsoDescripcion		 nvarchar(MAX),
	@certificadoValidacionHashEstado			 bit,
	@certificadoValidacionHashDescripcion		 nvarchar(MAX),
	@certificadoValidacionIntegridadEstado		 bit,
	@certificadoValidacionIntegridadDescripcion  nvarchar(MAX) 
as
begin 
	/* Operaciones en tabla <datos_certfiicados> 
		- Insertar certficiado
	*/
	insert into [dbo].[datos_certificados](
		[dato_certificado_numero],
		[dato_certificado_version],
		[dato_certificado_serial],
		[dato_certificado_oid],
		[dato_certificado_fecha_creacion],
		[dato_certificado_fecha_vencimiento],
		[dato_certificado_estado],
		[dato_certificado_editor],
		[dato_certificado_sujeto],
		[dato_certificado_causa_estado],
		[dato_certificado_fecha_uso],
		[dato_certificado_validacion_vencimiento_estado],
		[dato_certificado_validacion_vencimiento_descripcion],
		[dato_certificado_validacion_uso_estado],
		[dato_certificado_validacion_uso_descripcion],
		[dato_certificado_validacion_hash_estado],
		[dato_certificado_validacion_hash_descripcion],
		[dato_certificado_validacion_integridad_estado],
		[dato_certificado_validacion_integridad_descripcion],
		[documento_validado_fk]
	) values(								
		@certificadoNumero,							
		@certificadoVersion,			
		@certificadoSerial,			
		@certificadoOid,				
		@certificadoCreacion,						
		@certificadoVencimiento,						
		@certificadoEstado,							
		@certificadoEditor,	
		@certificadoSujeto,			
		@certificadoCausaEstado,					
		@certificadoUso,							
		@certificadoValidacionVencimientoEstado,		
		@certificadoValidacionVencimientoDescripcion, 
		@certificadoValidacionUsoEstado,				
		@certificadoValidacionUsoDescripcion,		 
		@certificadoValidacionHashEstado,	
		@certificadoValidacionHashDescripcion,		 
		@certificadoValidacionIntegridadEstado,		
		@certificadoValidacionIntegridadDescripcion,
		@idDocumento
	);
	select 'Certfiicado Insertado' as "Mensaje";
end
go

/*
PROCEDIMIENTO:	usp_generar_reporte_basico
DESCRIPCION:	Se encarga de insertar la petición más reciente y capturar su id
VARIABLES DE ENTRADA:	-idPeticion:
						-idUsuario:
*/
create or alter procedure usp_generar_reporte_basico 
	@idPeticion	int,
	@idUsuario	int
as
begin

	/* Operaciones en vista <reporte_basico> 
		- Consultar segun peticion y usuario
	*/
	select *from [dbo].[reporte_basico] where [usuarioId] = @idUsuario and [peticionId] = @idPeticion;
end
go

/*
PROCEDIMIENTO:	usp_generar_reporte_medio
DESCRIPCION:	Se encarga de insertar la petición más reciente y capturar su id
VARIABLES DE ENTRADA:	-idPeticion:
						-idUsuario:
*/
create or alter procedure usp_generar_reporte_medio 
	@idPeticion	int,
	@idUsuario	int
as
begin

	/* Operaciones en vista <reporte_medio> 
		- Consultar segun peticion y usuario
	*/
	select *from [dbo].[reporte_medio] where [usuarioId] = @idUsuario and [peticionId] = @idPeticion;
end
go

/*
PROCEDIMIENTO:	usp_generar_reporte_completo
DESCRIPCION:	Se encarga de insertar la petición más reciente y capturar su id
VARIABLES DE ENTRADA:	-idPeticion:
						-idUsuario:
*/
create or alter procedure usp_generar_reporte_completo 
	@idPeticion	int,
	@idUsuario	int
as
begin

	/* Operaciones en vista <reporte_completo> 
		- Consultar segun peticion y usuario
	*/
	select *from [dbo].[reporte_completo] where [usuarioId] = @idUsuario and [peticionId] = @idPeticion;
end
go

/*
PROCEDIMIENTO:	usp_insertar_reportes
DESCRIPCION:	Se encarga de insertar la petición más reciente y capturar su id
VARIABLES DE ENTRADA:	-idPeticion:
						-idUsuario:
*/
create or alter procedure usp_insertar_reportes 
	@idPeticion	int,
	@fechaReporte datetime2, 
	@ubicacionReporte nvarchar(MAX),
	@tipoReporte int
as
begin

	/* Operaciones en vista <reportes> 
		- Insertar reportes en tabla reportes 
	*/
	insert into [dbo].[reportes]([reporte_ubicacion], [reporte_fecha], [peticion_validacion_id_fk], [tipo_reporte_id_fk])
	values(@ubicacionReporte, @fechaReporte, @idPeticion, @tipoReporte);
end
go




/* PRUEBAS DE UPS

exec [dbo].[usp_insertar_peticiones] 
@idUsuario = 1,
@peticionFecha = '2026-03-19 00:00:00.0000000',
@peticionNombre = 'PeticionXXXXXXXXXX';
go

exec [dbo].[usp_insertar_documentos]
@idPeticion = 1,
@documentoNombre = 'CHIMBORAZO_1817_INF1.pdf',
@documentoUbicacion = './CHIMBORAZO_1817_INF1.pdf',
@documentoEstado = 1,
@documentoCausaEstado = 'Todas las firmas son válidas',
@documentoTotalFirmas = 1,
@documentoFirmasVencidas = 0,
@documentoTipo = 'PDF';
go

exec [dbo].[usp_insertar_certficiados]
@idDocumento = 58,
@certificadoNumero = 2,
@certificadoVersion	= '2',
@certificadoSerial = '169a6dc3', 
@certificadoOid	= '1.2.840.113549.1.1.11', 
@certificadoCreacion = '2024-1-29', 
@certificadoVencimiento	= '2026-1-28', 
@certificadoEstado	= 1, 
@certificadoEditor	= 'countryName=EC|organizationName=SECURITY DATA S.A. 2|organizationalUnitName=ENTIDAD DE CERTIFICACION DE INFORMACION|commonName=AUTORIDAD DE CERTIFICACION SUBCA-2 SECURITY DATA|', 
@certificadoSujeto	= 'commonName=ANDRES ALEXANDER LOPEZ MORAN|serialNumber=0923994792-290124192001|organizationalUnitName=ENTIDAD DE CERTIFICACION DE INFORMACION|', 
@certificadoCausaEstado	= 'La firma es válida, pero tenga en cuenta: Se venció por caducidad.', 
@certificadoUso	= '2025-08-15', 
@certificadoValidacionVencimientoEstado	= 0, 
@certificadoValidacionVencimientoDescripcion = 'Se venció por caducidad.', 
@certificadoValidacionUsoEstado				 = 1, 
@certificadoValidacionUsoDescripcion		 = 'La firma se usó estando vigente.', 
@certificadoValidacionHashEstado			 = 1, 
@certificadoValidacionHashDescripcion		 = 'Válido en términos de permisos', 
@certificadoValidacionIntegridadEstado		 = 1, 
@certificadoValidacionIntegridadDescripcion = 'Certificado funciona con cadena de seguridad';

exec [dbo].[usp_generar_reporte_basico]
@idPeticion	=1,
@idUsuario	=1

exec [dbo].[usp_generar_reporte_medio]
@idPeticion	=1,
@idUsuario	=1


exec [dbo].[usp_generar_reporte_completo]
@idPeticion	=14,
@idUsuario	=2

*/
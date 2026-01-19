/*
//====================================
// PROCEDIMIENTO DE REGISTRO DE 
// SESIONES
//====================================
*/

use Dinamo;
go


if OBJECT_ID('sp_inicio_sesion') is not null
	drop procedure sp_inicio_sesion;
go

create procedure sp_inicio_sesion 
	@usuario nvarchar(45), 
	@fecha_sesion datetime2, 
	@resultado int output 
as
	begin
		if not exists (select *from usuarios where usuario_nombre = @usuario)
			begin
				insert into usuarios(usuario_nombre, usuario_ultima_conexion) values(@usuario, @fecha_sesion);
				select @resultado = usuario_id from usuarios where usuario_nombre = @usuario;
				select 'Usuario creado en la base de datos' as 'Resultado';
			end
		else
			begin
				update usuarios set usuario_ultima_conexion = @fecha_sesion where usuario_nombre = @usuario;
				select @resultado = usuario_id from usuarios where usuario_nombre = @usuario;
				select 'Usuario actualizado en la base de datos' as 'Resultado';
			end
	end;
go


declare @resultado int; 
exec sp_inicio_sesion 'david.claros', '2026-12-25 14:30:00.1230000', @resultado output;
select @resultado; 
go

/*
//====================================
// [NOTA]:LA ACTUALIZACIÓN DE LAS 
// SESIONES LAS HACE UN DISPARADOR
//====================================
*/
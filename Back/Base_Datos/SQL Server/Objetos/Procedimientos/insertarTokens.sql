/*
//====================================
// PROCEDIMIENTO QUE INSERTA TOKENS
//====================================
*/

if OBJECT_ID('sp_insertar_tokens') is not null
	drop procedure sp_insertar_tokens;
go

create procedure sp_insertar_tokens
	@usuario_id int,
	@token_valor nvarchar(200)
as
	begin
		insert into tokens(token_valor, usuario_id_fk ) values(@token_valor, @usuario_id);
		print('Se ha insertado el token'); 
	end
go
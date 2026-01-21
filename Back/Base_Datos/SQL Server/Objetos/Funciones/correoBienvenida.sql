/*
//====================================
// Funcion de correo de bienvenida
//====================================
*/

if OBJECT_ID('fn_correo_bienvenida') is not null
	drop function fn_correo_bienvenida;
go

create function fn_correo_bienvenida(@correo_remitenete, @usuario)
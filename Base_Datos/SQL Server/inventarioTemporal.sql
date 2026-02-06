/*
//====================================
// CREACION DE LA BASE DE DATOS
// LA MEJOR BASE DE DATOS
// SIMULACION DE INVENTARIO
// :v
//====================================
*/

if DB_ID('Inventario_Temporal') is null
	create database Inventario_Temporal;
go

use Inventario_Temporal;
go

/*
//=============================
// CREACION DE TABLAS
//=============================
*/

if OBJECT_ID('Supervisor') is null
	create table Supervisores (
		supervisor_id int not null identity(1,1),
		supervisor_nombre nvarchar(45) not null,
		supervisor_correo nvarchar(100) not null,
	);
go

insert into Supervisores(supervisor_nombre, supervisor_correo) values
	('Sigifredo Lara', 'lsarmiento@aciel.co'),
	('Julio Castillo', 'lsarmiento@aciel.co'),
	('David Claros', 'lsarmiento@aciel.co'),
	('Johan Rojas', 'lsarmiento@aciel.co'),
	('Tatiana Garcia', 'lsarmiento@aciel.co'),
	('Anderson Forero', 'lsarmiento@aciel.co'),
	('Anyie Aguirre', 'lsarmiento@aciel.co'); 
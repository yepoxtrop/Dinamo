/*
//====================================
// CREACION DE LA BASE DE DATOS
//====================================
*/
if DB_ID('Dinamo') is null
	create database Dinamo;
go

-- drop database dinamo

use Dinamo;
go

/*
//=============================
// CREACION DE TABLAS
//=============================
*/
if OBJECT_ID('roles') is null
	create table roles (
		rol_id int not null identity(1,1), 
	    rol_nombre varchar(50) not null unique,
	    constraint pk_rol primary key(rol_id) -- llave primaria
	); 

if OBJECT_ID('usuarios') is null
	create table usuarios (
		usuario_id int not null identity(1,1),
	    usuario_nombre varchar(50) not null unique,
		usuario_ultima_conexion datetime2 not null,
	    rol_id_fk int not null default 3,
	    constraint pk_usuario primary key(usuario_id), -- llave primaria
	    constraint fk_rol_en_usuarios foreign key(rol_id_fk) references roles(rol_id) -- llave foranea
	); 

if OBJECT_ID('acciones') is null
	create table acciones (
		accion_id int not null identity(1,1), 
	    accion_nombre varchar(50) not null unique,
	    constraint pk_accion primary key(accion_id) -- llave primaria
	);

if OBJECT_ID('inicio_sesion') is null
	create table inicio_sesion (
		sesion_id int not null identity(1,1),
	    sesion_fecha datetime2 not null,
	    sesion_dispositivo varchar(50) not null,
	    usuario_id_fk int not null,
	    constraint pk_sesion primary key(sesion_id), -- llave primaria
	    constraint fk_usuario_en_inicio_sesion foreign key(usuario_id_fk) references usuarios(usuario_id) -- llave foranea
	);

if OBJECT_ID('acciones_sistema') is null
	create table acciones_sistema (
		sistema_id int not null identity(1,1),
	    sistema_fecha datetime2 not null,
	    accion_id_fk int not null,
	    usuario_id_fk int not null,
	    constraint pk_sistema primary key(sistema_id), -- llave primaria
	    constraint fk_usuario_en_acciones_sistema foreign key(usuario_id_fk) references usuarios(usuario_id), -- llave foranea
	    constraint fk_acciones_en_acciones_sistema foreign key(accion_id_fk) references acciones(accion_id) -- llave foranea
	);

if OBJECT_ID('firmas') is null
	create table firmas (
		firma_id int not null identity(1,1),
	    firma_pub nvarchar(1000) not null,
		firma_csr nvarchar(1000) not null,
		firma_crt nvarchar(1000) not null,
		firma_p12 nvarchar(1000) not null,
	 	firma_fecha_creacion datetime2 not null,
		firma_fecha_vencimiento datetime2 not null,
		firma_estado bit not null,
	    usuario_id_fk int not null,
	    constraint pk_firma primary key(firma_id), -- llave primaria
	    constraint fk_usuario_en_firmas foreign key(usuario_id_fk) references usuarios(usuario_id), -- llave foranea
		constraint check_fecha_vencimiento check(firma_fecha_vencimiento>firma_fecha_creacion),
		constraint check_fecha_creacion check(firma_fecha_creacion<firma_fecha_vencimiento),
	);

if OBJECT_ID('llaves_privadas') is null
	create table llaves_privadas (
		llave_id int not null identity(1,1),
		llave_valor nvarchar(1000) not null unique,
		firma_id_fk int not null unique, 
	    constraint pk_llave primary key(llave_id), -- llave primaria
	    constraint fk_firmas_en_llaves_privadas foreign key(firma_id_fk) references firmas(firma_id) -- llave foranea
	); 

if OBJECT_ID('tokens') is null
	create table tokens (
		token_id int not null identity(1,1),
		token_valor	nvarchar(1000) not null,
		token_duracion varchar(50) not null default '1 hora',
		token_inicio datetime2 not null, 
		token_fin datetime2 not null,
		usuario_id_fk int not null,
	    constraint pk_token primary key(token_id), -- llave primaria
	    constraint fk_usuario_en_tokens foreign key(usuario_id_fk) references usuarios(usuario_id), -- llave foranea
		constraint check_token_duracion check(token_duracion='1 hora'),
		constraint check_token_inicio check(token_inicio<token_fin),
		constraint check_token_fin check(token_fin>token_inicio)
	);

if OBJECT_ID('archivos_firmados') is null
	create table archivos_firmados (
		archivo_id int not null identity(1,1),
	    archivo_direccion nvarchar(1000) not null,
	    archivo_fecha datetime2 not null,
		usuario_id_fk int not null,
	    constraint pk_archivo primary key(archivo_id), -- llave primaria
	    constraint fk_usuario_en_archivos_firmados foreign key(usuario_id_fk) references usuarios(usuario_id) -- llave foranea
	);

if OBJECT_ID('correos_usuarios') is null
	create table correos_usuarios (
		correo_id int not null identity(1,1),
		correo varchar(100) not null,
		usuario_id_fk int not null,
		constraint pk_correo primary key(correo_id), -- llave primaria
		constraint fk_usuario_en_correos foreign key(usuario_id_fk) references usuarios(usuario_id), -- llave foranea
	)
go

/*
//=============================
// REGISTROS NECESARIOS
//=============================
*/
insert into roles(rol_nombre) VALUES
	('ADMINISTRADOR'),
	('TECNICO'),
	('NORMAL');
go

insert into acciones(accion_nombre) VALUES
	('CREAR FIRMAS'),
	('FIRMAR DOCUMENTOS'),
	('GENERAR REPORTE'),
	('RENOVAR FIRMA'),
	('ELIMINAR FIRMA');
go

insert into usuarios(usuario_nombre, usuario_ultima_conexion, rol_id_fk) VALUES
	('user_firmas','2025-12-25 14:30:00.123' ,1),
	('soporte', '2025-12-25 14:30:00.123',2);
go
/*
//====================================
// CREACION DE LA BASE DE DATOS
// LA MEJOR BASE DE DATOS
// DINAMO
// :V
//====================================
*/
if DB_ID('Dinamo') is null
	begin
		create database Dinamo;
		print('Base de datos creada');
	end
-- drop database Dinamo
go

use Dinamo;
go

/*
//=============================
// CREACION DE TABLAS
//=============================
*/
if OBJECT_ID('roles') is null
	begin
		create table roles (
			rol_id int not null identity(1,1), 
		    rol_nombre varchar(50) not null unique,
			rol_descripcion nvarchar(300) not null,
		    constraint pk_rol primary key(rol_id) -- llave primaria
		); 
		print('Tabla ROLES creada');
	end

if OBJECT_ID('usuarios') is null
	begin
		create table usuarios (
			usuario_id int not null identity(1,1),
			usuario_nombre varchar(50) not null unique,
			rol_id_fk int not null default 4,
			constraint pk_usuario primary key(usuario_id), -- llave primaria
			constraint fk_rol_en_usuarios foreign key(rol_id_fk) references roles(rol_id) -- llave foranea
		); 
		print('Tabla USUARIOS creada');
	end

if OBJECT_ID('tipos_correos') is null
	begin
		create table tipos_correos (
			tipo_correo_id int not null identity(1,1), 
		    tipo_correo_nombre varchar(50) not null unique,
			tipo_correo_descripcion nvarchar(300) not null,
		    constraint pk_tipo_correo primary key(tipo_correo_id) -- llave primaria
		); 
		print('Tabla TIPOS_CORREOS creada');
	end

if OBJECT_ID('correos_enviados') is null
	begin
		create table correos_enviados (
			correo_enviado_id int not null identity(1,1),
			correo_enviado_fecha datetime2 not null,
			correo_enviado_cuerpo nvarchar(MAX) not null,
			usuario_id_fk int not null,
			tipo_correo_id_fk int not null,
			constraint pk_correo_usado primary key(correo_enviado_id), -- llave primaria
			constraint fk_usuario_en_correo_enviado foreign key(usuario_id_fk) references usuarios(usuario_id), --lave foranea
			constraint fk_tipo_correo_en_correo_enviado foreign key(tipo_correo_id_fk) references tipos_correos(tipo_correo_id), --lave foranea
		);
		print('Tabla CORREOS_ENVIADOS creada');
	end

if OBJECT_ID('sesiones') is null
	 begin
		create table sesiones (
			sesion_id int not null identity(1,1),
			sesion_fecha datetime2 not null,
			sesion_dispositivo varchar(50) not null,
			usuario_id_fk int not null,
			constraint pk_sesion primary key(sesion_id), -- llave primaria
			constraint fk_usuario_en_inicio_sesion foreign key(usuario_id_fk) references usuarios(usuario_id) -- llave foranea
		);
		print('Tabla SESIONES creada');
	 end

if OBJECT_ID('tokens') is null
	begin 
		create table tokens (
			token_id int not null identity(1,1),
			token_valor	nvarchar(2000) not null,
			token_duracion varchar(50) not null default '1 hora',
			usuario_id_fk int not null,
			constraint pk_token primary key(token_id), -- llave primaria
			constraint fk_usuario_en_tokens foreign key(usuario_id_fk) references usuarios(usuario_id), -- llave foranea
			constraint check_token_duracion check(token_duracion='1 hora'), -- restriccion check
		);
		print('Tablas TOKENS creada')
	end

if OBJECT_ID('peticiones_validacion') is null
	begin
		create table peticiones_validacion (
			peticion_validacion_id int not null identity(1,1),
			peticion_validacion_fecha datetime not null,
			peticion_validacion_nombre nvarchar(300) not null,
			usuario_id_fk int not null,
			constraint pk_peticion_validacion primary key(peticion_validacion_id), -- llave primaria
			constraint fk_usuario_en_peticion_validacion foreign key(usuario_id_fk) references usuarios(usuario_id) -- llave foranea
		);
		print('Tablas PETICIONES_VALIDACION creada');
	end

if OBJECT_ID('tipo_reportes') is null
	begin
		create table tipo_reportes (
			tipo_reporte_id int not null identity(1,1), 
		    tipo_reporte_nombre varchar(50) not null unique,
			tipo_reporte_descripcion nvarchar(300) not null,
		    constraint pk_tipo_reporte primary key(tipo_reporte_id) -- llave primaria
		); 
		print('Tabla TIPOS_REPORTES creada');
	end

if OBJECT_ID('reportes') is null 
	begin 
		create table reportes (
			reporte_id int not null identity(1,1),
			reporte_ubicacion nvarchar(MAX) not null,
			reporte_fecha datetime2 not null,
			peticion_validacion_id_fk int not null,
			tipo_reporte_id_fk int not null,
			constraint pk_reporte primary key(reporte_id), -- llave primaria
			constraint fk_peticion_validacion_en_reporte foreign key(peticion_validacion_id_fk) references peticiones_validacion(peticion_validacion_id), -- llave foranea
			constraint fk_tipo_reporte_en_reporte foreign key(tipo_reporte_id_fk) references tipo_reportes(tipo_reporte_id) -- llave foranea
		);
		print('Tabla REPORTES creada');
	end

if OBJECT_ID('documentos_validados') is null 
	begin 
		create table documentos_validados (
			documento_validado_id int not null identity(1,1),
			documento_validado_ubicacion nvarchar(MAX) not null,
			documento_validado_estado bit not null,
			peticion_validacion_id_fk int not null,
			constraint pk_documento_validado primary key(documento_validado_id), -- llave primaria
			constraint fk_peticion_validacion_en_documento_validado foreign key(peticion_validacion_id_fk) references peticiones_validacion(peticion_validacion_id), -- llave foranea
		);
		print('Tabla DOCUMENTOS_VALIDADOS creada');
	end

if OBJECT_ID('datos_certificados') is null
	begin
		create table datos_certificados (
			dato_certificado_id int not null identity(1,1),
			dato_certificado_version nvarchar(100) not null default 'X.509',
			dato_certificado_serie nvarchar(100) not null, 
			dato_certificado_algoritmo nvarchar(100) not null default 'rsa',
			dato_certificado_emisor nvarchar(300) not null,
			dato_certificado_cn nvarchar(300) not null,
			dato_certificado_o nvarchar(100) not null,
			dato_certificado_ou nvarchar(100) not null,
			dato_certificado_i nvarchar(100) not null,
			dato_certificado_st nvarchar(100) not null,
			dato_certificado_c nvarchar(100) not null,
			dato_certificado_estado bit not null,
			documento_validado_fk int not null,
			constraint pk_datos_certificados primary key (dato_certificado_id), -- llave primaria
			constraint fk_documento_validado_en_dato_certificado foreign key(documento_validado_fk) references documentos_validados(documento_validado_id) -- llave foranea
		);
		print('Tabla DATOS_CERTIFICADOS creada');
	end

if OBJECT_ID('tipo_firmas') is null
	begin
		create table tipo_firmas (
			tipo_firma_id int not null identity(1,1),
			tipo_firma_nombre nvarchar(30) not null unique,
			tipo_firma_descripcion nvarchar(300) not null,
			constraint pk_tipo_firma primary key(tipo_firma_id), -- llave primaria
		); 
		print('Tabla TIPO_FIRMAS creada');
	end

if OBJECT_ID('firmas') is null
	begin
		create table firmas (
			firma_id int not null identity(1,1),
			firma_pub nvarchar(MAX) not null,
			firma_csr nvarchar(MAX) not null,
			firma_crt nvarchar(MAX) not null,
			firma_p12 nvarchar(MAX) not null,
	 		firma_fecha_creacion datetime2 not null,
			firma_fecha_vencimiento datetime2 not null,
			firma_estado bit not null,
			usuario_id_fk int not null,
			tipo_firma_id_fk int not null,
			constraint pk_firma primary key(firma_id), -- llave primaria
			constraint fk_usuario_en_firma foreign key(usuario_id_fk) references usuarios(usuario_id), -- llave foranea
			constraint fk_tipo_firma_en_firma foreign key(tipo_firma_id_fk) references tipo_firmas(tipo_firma_id), -- llave foranea
			constraint check_fecha_vencimiento check(firma_fecha_vencimiento>firma_fecha_creacion), -- restriccion check
			constraint check_fecha_creacion check(firma_fecha_creacion<firma_fecha_vencimiento), -- restriccion check
		);
		print('Tabla FIRMAS creada');
	end

if OBJECT_ID('llaves_privadas') is null
	begin
		create table llaves_privadas (
			llave_id int not null identity(1,1),
			llave_valor nvarchar(MAX) not null,
			firma_id_fk int not null unique, 
			constraint pk_llave primary key(llave_id), -- llave primaria
			constraint fk_firmas_en_llave_privada foreign key(firma_id_fk) references firmas(firma_id) -- llave foranea
		); 
		print('Tabla LLAVES_PRIVADAS creada'); 
	end

if OBJECT_ID('contrasenas_firmas') is null
	begin
		create table contrasenas_firmas(
			contrasena_firma_id int not null identity(1,1),
			contrasena_firma_valor nvarchar(1000) not nulL,
			firma_id_fk int not null unique,
			constraint pk_contrasena_firma primary key(contrasena_firma_id), -- llave primaria
			constraint fk_firma_en_contrasena_firma foreign key(firma_id_fk) references firmas(firma_id) -- llave foranea
		);
		print('Tabla CONTRASENA_FIRMAS creada'); 
	end

if OBJECT_ID('documentos_firmados') is null
	begin
		create table documentos_firmados (
			documento_firmado_id int not null identity(1,1),
			documento_firmado_ubicacion nvarchar(MAX) not null,
			documento_firmado_fecha datetime2 not null,
			firma_id_fk int not null,
			constraint pk_archivo primary key(documento_firmado_id), -- llave primaria
			constraint fk_firma_en_archivos_firmados foreign key(firma_id_fk) references firmas(firma_id) -- llave foranea
		);
		print('Tabla DOCUMENTOS_FIRMADOS creada');
	end

if OBJECT_ID('version_firmas') is null
	begin
		create table version_firmas (
			version_firma_id int not null identity(1,1),
			version_firma_nombre nvarchar(50) not null unique,
			version_firma_descripcion nvarchar(300) not null,
			constraint pk_version_firma primary key(version_firma_id) -- llave primaria
		)
	end

if OBJECT_ID('configuracion_firmas') is null
	begin
		create table configuracion_firmas (
			configuracion_firma_id int not null identity(1,1),
			configuracion_firma_version nvarchar(100) not null default 'X.509',
			configuracion_firma_serie nvarchar(100) not null, 
			configuracion_firma_algoritmo nvarchar(100) not null default 'rsa',
			configuracion_firma_emisor nvarchar(300) not null,
			configuracion_firma_cn nvarchar(300) not null,
			configuracion_firma_o nvarchar(100) not null,
			configuracion_firma_ou nvarchar(100) not null,
			configuracion_firma_i nvarchar(100) not null,
			configuracion_firma_st nvarchar(100) not null,
			configuracion_firma_c nvarchar(100) not null,
			firma_id_fk int not null,
			version_firma_id_fk int not null,
			constraint pk_configuracion_firma primary key (configuracion_firma_id), -- llave primaria
			constraint fk_firma_en_configuracion_firma foreign key(firma_id_fk) references firmas(firma_id), -- llave foranea
			constraint fk_version_firma foreign key(version_firma_id_fk) references version_firmas(version_firma_id), -- llave foranea
		);
		print('Tabla CONFIGURACION_FIRMAS creada');
	end

/*
//=============================
// REGISTROS NECESARIOS
//=============================
*/
insert into roles(rol_nombre, rol_descripcion) values
	('ADMIN', '..'),
	('TECNICO', '..'),
	('SUPERVISOR', '..'),
	('NORMAL', '..');

insert into tipo_firmas(tipo_firma_nombre, tipo_firma_descripcion) values
	('MANUAL', '..'),
	('MASIVA', '..'),
	('EXTERNA', '..');

insert into tipos_correos(tipo_correo_nombre, tipo_correo_descripcion) values
	('BIENVENIDA', '..'),
	('CREACION_FIRMA', '..'),
	('REPORTES', '..');

insert into tipo_reportes(tipo_reporte_nombre, tipo_reporte_descripcion) values
	('FIRMAS_CREADAS', '..'),
	('DOCUMENTOS_VALIDOS', '..'),
	('DOCUMENTOS_INVALIDOS', '..');

insert into usuarios(usuario_nombre, rol_id_fk) values
	('user_firmas', 1),
	('soporte', 2);
go
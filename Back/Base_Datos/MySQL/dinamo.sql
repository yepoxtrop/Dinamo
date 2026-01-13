/*
//====================================
// CREACION DE LA BASE DE DATOS
//====================================
*/
CREATE DATABASE IF NOT EXISTS Dinamo; 
USE Dinamo; 
-- drop database Dinamo;

/*
//=============================
// CREACION DE TABLAS
//=============================
*/
create table if not exists roles (
	rol_id int comment 'Identificador unico del registro' not null auto_increment, 
    rol_nombre varchar(50) comment 'Nombre del rol' not null unique,
    constraint pk_rol primary key(rol_id) -- llave primaria
); 

create table if not exists usuarios (
	usuario_id int comment 'Identificador unico del registro' not null auto_increment,
    usuario_nombre varchar(50) comment 'Nombre de usuario del empleado' not null unique,
    usuario_ultima_conexion datetime comment 'Fecha de ultimo login del usuario' not null,
    rol_id_fk int comment 'Identificador del rol relacionado con el usuario' not null default 3,
    constraint pk_usuario primary key(usuario_id), -- llave primaria
    constraint fk_rol_en_usuarios foreign key(rol_id_fk) references roles(rol_id) -- llave foranea
); 

create table if not exists acciones (
	accion_id int comment 'Identificador unico del registro' not null auto_increment, 
    accion_nombre varchar(50) comment 'Nombre de la accion' not null unique,
    constraint pk_accion primary key(accion_id) -- llave primaria
);

create table if not exists inicio_sesion (
	sesion_id int comment 'Identificador unico del registro' not null auto_increment,
    sesion_fecha datetime comment 'Fecha de la sesion' not null,
    sesion_dispositivo varchar(50) comment 'Nombre del dispositivo en el que se creo la sesion' not null,
    usuario_id_fk int comment 'Identificador del usuario relacionado con esa sesion' not null,
    constraint pk_sesion primary key(sesion_id), -- llave primaria
    constraint fk_usuario_en_inicio_sesion foreign key(usuario_id_fk) references usuarios(usuario_id) -- llave foranea
);

create table if not exists acciones_sistema (
	sistema_id int comment 'Identificador unico del registro' not null auto_increment,
    sistema_fecha datetime comment 'Fecha en la que se realiza la accion' not null,
    accion_id_fk int comment 'Identificador de la accion relacionado con esa accion hecha en el sistema' not null,
    usuario_id_fk int comment 'Identificador del usuario relacionado con esa accion en el sistema' not null,
    constraint pk_sistema primary key(sistema_id), -- llave primaria
    constraint fk_usuario_en_acciones_sistema foreign key(usuario_id_fk) references usuarios(usuario_id), -- llave foranea
    constraint fk_acciones_en_acciones_sistema foreign key(accion_id_fk) references acciones(accion_id) -- llave foranea
);

create table if not exists firmas (
	firma_id int comment 'Identificador unico del registro' not null auto_increment,
    firma_pub nvarchar(1000) comment 'Ubicación del archivo pub de la firma' not null,
	firma_csr nvarchar(1000) comment 'Ubicación del archivo csr de la firma' not null,
	firma_crt nvarchar(1000) comment 'Ubicación del archivo crt de la firma' not null,
	firma_p12 nvarchar(1000) comment 'Ubicación del archivo p12 de la firma' not null,
 	firma_fecha_creacion datetime comment 'Fecha en la que se crea la firma' not null check(firma_fecha_creacion<firma_fecha_vencimiento),
	firma_fecha_vencimiento datetime comment 'Fecha en la que vence la firma' not null check(firma_fecha_vencimiento>firma_fecha_creacion),
	firma_estado bool comment 'Estado en el que se encuentra la firma' not null,
    usuario_id_fk int comment 'Identificador del usuario relacionado con esa firma' not null,
    constraint pk_firma primary key(firma_id), -- llave primaria
    constraint fk_usuario_en_firmas foreign key(usuario_id_fk) references usuarios(usuario_id) -- llave foranea
);

create table if not exists llaves_privadas (
	llave_id int comment 'Identificador unico del registro' not null auto_increment,
	llave_valor nvarchar(1000) comment 'Valor de la llave privada de la firma' not null unique,
	firma_id_fk int comment 'Identificador de la firma relacionado con la llave' not null unique, 
    constraint pk_llave primary key(llave_id),
    constraint fk_firmas_en_llaves_privadas foreign key(firma_id_fk) references firmas(firma_id) -- llave foranea
); 

create table if not exists tokens (
	token_id int comment 'Identificador unico del registro' not null auto_increment,
	token_valor	nvarchar(1000) comment 'Token' not null,
	token_duracion varchar(50) comment 'Duracion del token' not null default '1 hora' check(token_duracion='1 hora'),
	token_inicio datetime comment 'Fecha en la que se creo el token' not null check(token_inicio<token_fin), 
	token_fin datetime comment 'Fecha en la que se vence el token' not null check(token_fin>token_inicio),
	usuario_id_fk int comment 'Identificador del usuario relacionado con esa sesion' not null,
    constraint pk_token primary key(token_id),
    constraint fk_usuario_en_tokens foreign key(usuario_id_fk) references usuarios(usuario_id) -- llave foranea
);

create table if not exists archivos_firmados (
	archivo_id int comment 'Identificador unico del registro' not null auto_increment,
    archivo_direccion nvarchar(1000) comment 'Ubicación del archivo firmado' not null,
    archivo_fecha datetime comment 'Fecga en la que se firmó el archivo' not null,
	usuario_id_fk int comment 'Identificador del usuario relacionado con esa sesion' not null,
    constraint pk_archivo primary key(archivo_id),
    constraint llave_foranea_usuario_en_archivo foreign key(usuario_id_fk) references usuarios(usuario_id) -- llave foranea
);

create table if not exists correos_usuarios (
		correo_id int comment 'Identificador unico del registro' not null auto_increment,
		correo varchar(100) comment 'Correo electronico' not null unique,
		usuario_id_fk int comment 'Identificador del usuario relacionado con esa sesion' not null,
		constraint pk_correo primary key(correo_id), -- llave primaria
		constraint fk_usuario_en_correos foreign key(usuario_id_fk) references usuarios(usuario_id) -- llave foranea
);
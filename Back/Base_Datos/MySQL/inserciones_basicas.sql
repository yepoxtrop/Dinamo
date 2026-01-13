/*
//=============================
// INSERCIONES POR DEFAULT
//=============================
*/
INSERT INTO roles(rol_nombre) VALUES('ADMINISTRADOR'),('TECNICO'),('NORMAL');
INSERT INTO acciones(accion_nombre) VALUES('CREAR FIRMAS'),('FIRMAR DOCUMENTOS'),('GENERAR REPORTE'),('RENOVAR FIRMA'),('ELIMINAR FIRMA');
INSERT INTO usuarios(usuario_nombre, rol_id_fk) VALUES('user_firmas', 1),('soporte',2),('luis.sarmiento',3);
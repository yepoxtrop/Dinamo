/*========================================================================================================================
FECHA CREACION: 2026/03/19
AUTOR         : LUIS ANGEL SARMIENTO DIAZ
DETALLE       : Script de vistas para reportes
FECHA MODIFICACION: 2026/03/19
AUTOR MODIFICACION: LUIS ANGEL SARMIENTO DIAZ
MODIFICACION      : Se modifican los comentarios de restricciones
========================================================================================================================*/

/* Usar la base de datos */
use Dinamo;
go

/*
VISTA:			reporte_completo
DESCRIPCION:	cuenta con la estructura para los reportes en formato xlsx
*/
create or alter view reporte_completo as select 
[dbo].[usuarios].[usuario_id] as 'usuarioId',
[dbo].[peticiones_validacion].[peticion_validacion_id] as 'peticionId', 
[dbo].[peticiones_validacion].[peticion_validacion_nombre] as 'peticionNombre',
[dbo].[documentos_validados].[documento_validado_nombre] as 'documentoNombre',
[dbo].[documentos_validados].[documento_validado_estado] as 'documentoEstado',
[dbo].[documentos_validados].[documento_validado_causa_estado] as 'documentoCausa',
[dbo].[documentos_validados].[documento_validado_tipo] as 'documentoTipo',
[dbo].[documentos_validados].[documento_validado_total_firmas] as 'documentoTotalFirmas',
[dbo].[documentos_validados].[documento_validado_firmas_vencidas] as 'documentoFirmasVencidas',
[dbo].[documentos_validados].[documento_validado_total_firmas]-[dbo].[documentos_validados].[documento_validado_firmas_vencidas] as 'documentoFirmasValidas',
[dbo].[datos_certificados].[dato_certificado_numero] as 'certificadoNumero',
[dbo].[datos_certificados].[dato_certificado_sujeto] as 'certificadoSujeto',
[dbo].[datos_certificados].[dato_certificado_editor] as 'certificadoEditor',
[dbo].[datos_certificados].[dato_certificado_fecha_creacion] as 'certificadoFechaCreacion',
[dbo].[datos_certificados].[dato_certificado_fecha_vencimiento] as 'certificadoFechaVencimiento',
[dbo].[datos_certificados].[dato_certificado_fecha_uso]  as 'certificadoFechaUso',
[dbo].[datos_certificados].[dato_certificado_estado] as 'certificadoEstado',
[dbo].[datos_certificados].[dato_certificado_causa_estado] as 'certificadoCausa'
from [dbo].[usuarios]
inner join [dbo].[peticiones_validacion]
on [dbo].[usuarios].[usuario_id] = [dbo].[peticiones_validacion].[usuario_id_fk]
inner join [dbo].[documentos_validados]
on [dbo].[documentos_validados].[peticion_validacion_id_fk] = [dbo].[peticiones_validacion].[peticion_validacion_id]
left join [dbo].[datos_certificados]
on [dbo].[documentos_validados].[documento_validado_id] = [dbo].[datos_certificados].[documento_validado_fk];
go

/*
VISTA:			reporte_medio
DESCRIPCION:	cuenta con la estructura para los reportes en formato csv medio
*/
create or alter view reporte_medio as select 
[dbo].[usuarios].[usuario_id] as 'usuarioId',
[dbo].[peticiones_validacion].[peticion_validacion_id] as 'peticionId', 
[dbo].[peticiones_validacion].[peticion_validacion_nombre] as 'peticionNombre',
[dbo].[documentos_validados].[documento_validado_nombre] as 'documentoNombre',
[dbo].[documentos_validados].[documento_validado_estado] as 'documentoEstado',
[dbo].[documentos_validados].[documento_validado_total_firmas] as 'documentoTotalFirmas',
[dbo].[documentos_validados].[documento_validado_firmas_vencidas] as 'documentoFirmasVencidas',
[dbo].[documentos_validados].[documento_validado_total_firmas]-[dbo].[documentos_validados].[documento_validado_firmas_vencidas] as 'documentoFirmasValidas',
[dbo].[datos_certificados].[dato_certificado_numero] as 'certificadoNumero',
[dbo].[datos_certificados].[dato_certificado_sujeto] as 'certificadoSujeto',
[dbo].[datos_certificados].[dato_certificado_editor] as 'certificadoEditor',
[dbo].[datos_certificados].[dato_certificado_fecha_creacion] as 'certificadoFechaCreacion',
[dbo].[datos_certificados].[dato_certificado_fecha_vencimiento] as 'certificadoFechaVencimiento',
[dbo].[datos_certificados].[dato_certificado_estado] as 'certificadoEstado'
from [dbo].[usuarios]
inner join [dbo].[peticiones_validacion]
on [dbo].[usuarios].[usuario_id] = [dbo].[peticiones_validacion].[usuario_id_fk]
inner join [dbo].[documentos_validados]
on [dbo].[documentos_validados].[peticion_validacion_id_fk] = [dbo].[peticiones_validacion].[peticion_validacion_id]
left join [dbo].[datos_certificados]
on [dbo].[documentos_validados].[documento_validado_id] = [dbo].[datos_certificados].[documento_validado_fk];
go

/*
VISTA:			reporte_basico
DESCRIPCION:	cuenta con la estructura para los reportes en formato csv basico
*/
create or alter view reporte_basico as select 
[dbo].[usuarios].[usuario_id] as 'usuarioId',
[dbo].[peticiones_validacion].[peticion_validacion_id] as 'peticionId', 
[dbo].[peticiones_validacion].[peticion_validacion_nombre] as 'peticionNombre',
[dbo].[documentos_validados].[documento_validado_nombre] as 'documentoNombre',
[dbo].[documentos_validados].[documento_validado_estado] as 'documentoEstado',
[dbo].[documentos_validados].[documento_validado_total_firmas] as 'documentoTotalFirmas',
[dbo].[documentos_validados].[documento_validado_firmas_vencidas] as 'documentoFirmasVencidas',
[dbo].[documentos_validados].[documento_validado_total_firmas]-[dbo].[documentos_validados].[documento_validado_firmas_vencidas] as 'documentoFirmasValidas'
from [dbo].[usuarios]
inner join [dbo].[peticiones_validacion]
on [dbo].[usuarios].[usuario_id] = [dbo].[peticiones_validacion].[usuario_id_fk]
inner join [dbo].[documentos_validados]
on [dbo].[documentos_validados].[peticion_validacion_id_fk] = [dbo].[peticiones_validacion].[peticion_validacion_id];
go

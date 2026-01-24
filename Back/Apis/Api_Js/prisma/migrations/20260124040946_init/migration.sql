BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[configuracion_firmas] (
    [configuracion_firma_id] INT NOT NULL IDENTITY(1,1),
    [configuracion_firma_version] NVARCHAR(100) NOT NULL CONSTRAINT [DF__configura__confi__3E1D39E1] DEFAULT 'X.509',
    [configuracion_firma_serie] NVARCHAR(100) NOT NULL,
    [configuracion_firma_algoritmo] NVARCHAR(100) NOT NULL CONSTRAINT [DF__configura__confi__3F115E1A] DEFAULT 'rsa',
    [configuracion_firma_emisor] NVARCHAR(300) NOT NULL,
    [configuracion_firma_cn] NVARCHAR(300) NOT NULL,
    [configuracion_firma_o] NVARCHAR(100) NOT NULL,
    [configuracion_firma_ou] NVARCHAR(100) NOT NULL,
    [configuracion_firma_i] NVARCHAR(100) NOT NULL,
    [configuracion_firma_st] NVARCHAR(100) NOT NULL,
    [configuracion_firma_c] NVARCHAR(100) NOT NULL,
    [firma_id_fk] INT NOT NULL,
    [version_firma_id_fk] INT NOT NULL,
    CONSTRAINT [pk_configuracion_firma] PRIMARY KEY CLUSTERED ([configuracion_firma_id])
);

-- CreateTable
CREATE TABLE [dbo].[contrasenas_firmas] (
    [contrasena_firma_id] INT NOT NULL IDENTITY(1,1),
    [contrasena_firma_valor] NVARCHAR(1000) NOT NULL,
    [firma_id_fk] INT NOT NULL,
    CONSTRAINT [pk_contrasena_firma] PRIMARY KEY CLUSTERED ([contrasena_firma_id]),
    CONSTRAINT [UQ__contrase__2872F92C438439D9] UNIQUE NONCLUSTERED ([firma_id_fk])
);

-- CreateTable
CREATE TABLE [dbo].[correos_enviados] (
    [correo_enviado_id] INT NOT NULL IDENTITY(1,1),
    [correo_enviado_fecha] DATETIME2 NOT NULL,
    [correo_enviado_cuerpo] NVARCHAR(max) NOT NULL,
    [usuario_id_fk] INT NOT NULL,
    [tipo_correo_id_fk] INT NOT NULL,
    CONSTRAINT [pk_correo_usado] PRIMARY KEY CLUSTERED ([correo_enviado_id])
);

-- CreateTable
CREATE TABLE [dbo].[datos_certificados] (
    [dato_certificado_id] INT NOT NULL IDENTITY(1,1),
    [dato_certificado_version] NVARCHAR(100) NOT NULL CONSTRAINT [DF__datos_cer__dato___236943A5] DEFAULT 'X.509',
    [dato_certificado_serie] NVARCHAR(100) NOT NULL,
    [dato_certificado_algoritmo] NVARCHAR(100) NOT NULL CONSTRAINT [DF__datos_cer__dato___245D67DE] DEFAULT 'rsa',
    [dato_certificado_emisor] NVARCHAR(300) NOT NULL,
    [dato_certificado_cn] NVARCHAR(300) NOT NULL,
    [dato_certificado_o] NVARCHAR(100) NOT NULL,
    [dato_certificado_ou] NVARCHAR(100) NOT NULL,
    [dato_certificado_i] NVARCHAR(100) NOT NULL,
    [dato_certificado_st] NVARCHAR(100) NOT NULL,
    [dato_certificado_c] NVARCHAR(100) NOT NULL,
    [dato_certificado_estado] BIT NOT NULL,
    [documento_validado_fk] INT NOT NULL,
    CONSTRAINT [pk_datos_certificados] PRIMARY KEY CLUSTERED ([dato_certificado_id])
);

-- CreateTable
CREATE TABLE [dbo].[documentos_firmados] (
    [documento_firmado_id] INT NOT NULL IDENTITY(1,1),
    [documento_firmado_ubicacion] NVARCHAR(max) NOT NULL,
    [documento_firmado_fecha] DATETIME2 NOT NULL,
    [firma_id_fk] INT NOT NULL,
    CONSTRAINT [pk_archivo] PRIMARY KEY CLUSTERED ([documento_firmado_id])
);

-- CreateTable
CREATE TABLE [dbo].[documentos_validados] (
    [documento_validado_id] INT NOT NULL IDENTITY(1,1),
    [documento_validado_ubicacion] NVARCHAR(max) NOT NULL,
    [documento_validado_estado] BIT NOT NULL,
    [peticion_validacion_id_fk] INT NOT NULL,
    CONSTRAINT [pk_documento_validado] PRIMARY KEY CLUSTERED ([documento_validado_id])
);

-- CreateTable
CREATE TABLE [dbo].[firmas] (
    [firma_id] INT NOT NULL IDENTITY(1,1),
    [firma_pub] NVARCHAR(max) NOT NULL,
    [firma_csr] NVARCHAR(max) NOT NULL,
    [firma_crt] NVARCHAR(max) NOT NULL,
    [firma_p12] NVARCHAR(max) NOT NULL,
    [firma_fecha_creacion] DATETIME2 NOT NULL,
    [firma_fecha_vencimiento] DATETIME2 NOT NULL,
    [firma_estado] BIT NOT NULL,
    [usuario_id_fk] INT NOT NULL,
    [tipo_firma_id_fk] INT NOT NULL,
    CONSTRAINT [pk_firma] PRIMARY KEY CLUSTERED ([firma_id])
);

-- CreateTable
CREATE TABLE [dbo].[llaves_privadas] (
    [llave_id] INT NOT NULL IDENTITY(1,1),
    [llave_valor] NVARCHAR(max) NOT NULL,
    [firma_id_fk] INT NOT NULL,
    CONSTRAINT [pk_llave] PRIMARY KEY CLUSTERED ([llave_id]),
    CONSTRAINT [UQ__llaves_p__2872F92C78DE71BA] UNIQUE NONCLUSTERED ([firma_id_fk])
);

-- CreateTable
CREATE TABLE [dbo].[peticiones_validacion] (
    [peticion_validacion_id] INT NOT NULL IDENTITY(1,1),
    [peticion_validacion_fecha] DATETIME NOT NULL,
    [peticion_validacion_nombre] NVARCHAR(300) NOT NULL,
    [usuario_id_fk] INT NOT NULL,
    CONSTRAINT [pk_peticion_validacion] PRIMARY KEY CLUSTERED ([peticion_validacion_id])
);

-- CreateTable
CREATE TABLE [dbo].[reportes] (
    [reporte_id] INT NOT NULL IDENTITY(1,1),
    [reporte_ubicacion] NVARCHAR(max) NOT NULL,
    [reporte_fecha] DATETIME2 NOT NULL,
    [peticion_validacion_id_fk] INT NOT NULL,
    [tipo_reporte_id_fk] INT NOT NULL,
    CONSTRAINT [pk_reporte] PRIMARY KEY CLUSTERED ([reporte_id])
);

-- CreateTable
CREATE TABLE [dbo].[roles] (
    [rol_id] INT NOT NULL IDENTITY(1,1),
    [rol_nombre] VARCHAR(50) NOT NULL,
    [rol_descripcion] NVARCHAR(300) NOT NULL,
    CONSTRAINT [pk_rol] PRIMARY KEY CLUSTERED ([rol_id]),
    CONSTRAINT [UQ__roles__4900B49A99D98291] UNIQUE NONCLUSTERED ([rol_nombre])
);

-- CreateTable
CREATE TABLE [dbo].[sesiones] (
    [sesion_id] INT NOT NULL IDENTITY(1,1),
    [sesion_fecha] DATETIME2 NOT NULL,
    [sesion_dispositivo] VARCHAR(50) NOT NULL,
    [usuario_id_fk] INT NOT NULL,
    CONSTRAINT [pk_sesion] PRIMARY KEY CLUSTERED ([sesion_id])
);

-- CreateTable
CREATE TABLE [dbo].[tipo_firmas] (
    [tipo_firma_id] INT NOT NULL IDENTITY(1,1),
    [tipo_firma_nombre] NVARCHAR(30) NOT NULL,
    [tipo_firma_descripcion] NVARCHAR(300) NOT NULL,
    CONSTRAINT [pk_tipo_firma] PRIMARY KEY CLUSTERED ([tipo_firma_id]),
    CONSTRAINT [UQ__tipo_fir__1557963A7A74E6C5] UNIQUE NONCLUSTERED ([tipo_firma_nombre])
);

-- CreateTable
CREATE TABLE [dbo].[tipo_reportes] (
    [tipo_reporte_id] INT NOT NULL IDENTITY(1,1),
    [tipo_reporte_nombre] VARCHAR(50) NOT NULL,
    [tipo_reporte_descripcion] NVARCHAR(300) NOT NULL,
    CONSTRAINT [pk_tipo_reporte] PRIMARY KEY CLUSTERED ([tipo_reporte_id]),
    CONSTRAINT [UQ__tipo_rep__910808BDAC927371] UNIQUE NONCLUSTERED ([tipo_reporte_nombre])
);

-- CreateTable
CREATE TABLE [dbo].[tipos_correos] (
    [tipo_correo_id] INT NOT NULL IDENTITY(1,1),
    [tipo_correo_nombre] VARCHAR(50) NOT NULL,
    [tipo_correo_descripcion] NVARCHAR(300) NOT NULL,
    CONSTRAINT [pk_tipo_correo] PRIMARY KEY CLUSTERED ([tipo_correo_id]),
    CONSTRAINT [UQ__tipos_co__AD329B0A0A69FB4D] UNIQUE NONCLUSTERED ([tipo_correo_nombre])
);

-- CreateTable
CREATE TABLE [dbo].[tokens] (
    [token_id] INT NOT NULL IDENTITY(1,1),
    [token_valor] NVARCHAR(2000) NOT NULL,
    [token_duracion] VARCHAR(50) NOT NULL CONSTRAINT [DF__tokens__token_du__123EB7A3] DEFAULT '1 hora',
    [usuario_id_fk] INT NOT NULL,
    CONSTRAINT [pk_token] PRIMARY KEY CLUSTERED ([token_id])
);

-- CreateTable
CREATE TABLE [dbo].[usuarios] (
    [usuario_id] INT NOT NULL IDENTITY(1,1),
    [usuario_nombre] VARCHAR(50) NOT NULL,
    [rol_id_fk] INT NOT NULL CONSTRAINT [DF__usuarios__rol_id__04E4BC85] DEFAULT 4,
    CONSTRAINT [pk_usuario] PRIMARY KEY CLUSTERED ([usuario_id]),
    CONSTRAINT [UQ__usuarios__220D44A2BC6B5ADB] UNIQUE NONCLUSTERED ([usuario_nombre])
);

-- CreateTable
CREATE TABLE [dbo].[version_firmas] (
    [version_firma_id] INT NOT NULL IDENTITY(1,1),
    [version_firma_nombre] NVARCHAR(50) NOT NULL,
    [version_firma_descripcion] NVARCHAR(300) NOT NULL,
    CONSTRAINT [pk_version_firma] PRIMARY KEY CLUSTERED ([version_firma_id]),
    CONSTRAINT [UQ__version___FD908468D566A588] UNIQUE NONCLUSTERED ([version_firma_nombre])
);

-- AddForeignKey
ALTER TABLE [dbo].[configuracion_firmas] ADD CONSTRAINT [fk_firma_en_configuracion_firma] FOREIGN KEY ([firma_id_fk]) REFERENCES [dbo].[firmas]([firma_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[configuracion_firmas] ADD CONSTRAINT [fk_version_firma] FOREIGN KEY ([version_firma_id_fk]) REFERENCES [dbo].[version_firmas]([version_firma_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[contrasenas_firmas] ADD CONSTRAINT [fk_firma_en_contrasena_firma] FOREIGN KEY ([firma_id_fk]) REFERENCES [dbo].[firmas]([firma_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[correos_enviados] ADD CONSTRAINT [fk_tipo_correo_en_correo_enviado] FOREIGN KEY ([tipo_correo_id_fk]) REFERENCES [dbo].[tipos_correos]([tipo_correo_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[correos_enviados] ADD CONSTRAINT [fk_usuario_en_correo_enviado] FOREIGN KEY ([usuario_id_fk]) REFERENCES [dbo].[usuarios]([usuario_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[datos_certificados] ADD CONSTRAINT [fk_documento_validado_en_dato_certificado] FOREIGN KEY ([documento_validado_fk]) REFERENCES [dbo].[documentos_validados]([documento_validado_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[documentos_firmados] ADD CONSTRAINT [fk_firma_en_archivos_firmados] FOREIGN KEY ([firma_id_fk]) REFERENCES [dbo].[firmas]([firma_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[documentos_validados] ADD CONSTRAINT [fk_peticion_validacion_en_documento_validado] FOREIGN KEY ([peticion_validacion_id_fk]) REFERENCES [dbo].[peticiones_validacion]([peticion_validacion_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[firmas] ADD CONSTRAINT [fk_tipo_firma_en_firma] FOREIGN KEY ([tipo_firma_id_fk]) REFERENCES [dbo].[tipo_firmas]([tipo_firma_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[firmas] ADD CONSTRAINT [fk_usuario_en_firma] FOREIGN KEY ([usuario_id_fk]) REFERENCES [dbo].[usuarios]([usuario_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[llaves_privadas] ADD CONSTRAINT [fk_firmas_en_llave_privada] FOREIGN KEY ([firma_id_fk]) REFERENCES [dbo].[firmas]([firma_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[peticiones_validacion] ADD CONSTRAINT [fk_usuario_en_peticion_validacion] FOREIGN KEY ([usuario_id_fk]) REFERENCES [dbo].[usuarios]([usuario_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[reportes] ADD CONSTRAINT [fk_peticion_validacion_en_reporte] FOREIGN KEY ([peticion_validacion_id_fk]) REFERENCES [dbo].[peticiones_validacion]([peticion_validacion_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[reportes] ADD CONSTRAINT [fk_tipo_reporte_en_reporte] FOREIGN KEY ([tipo_reporte_id_fk]) REFERENCES [dbo].[tipo_reportes]([tipo_reporte_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[sesiones] ADD CONSTRAINT [fk_usuario_en_inicio_sesion] FOREIGN KEY ([usuario_id_fk]) REFERENCES [dbo].[usuarios]([usuario_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tokens] ADD CONSTRAINT [fk_usuario_en_tokens] FOREIGN KEY ([usuario_id_fk]) REFERENCES [dbo].[usuarios]([usuario_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[usuarios] ADD CONSTRAINT [fk_rol_en_usuarios] FOREIGN KEY ([rol_id_fk]) REFERENCES [dbo].[roles]([rol_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

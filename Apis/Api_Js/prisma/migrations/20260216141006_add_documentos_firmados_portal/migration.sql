BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[documentos_firmados_portal] (
    [documento_firmado_portal_id] INT NOT NULL IDENTITY(1,1),
    [documento_nombre_original] NVARCHAR(500) NOT NULL,
    [documento_ruta] NVARCHAR(500) NOT NULL,
    [documento_fecha_firma] DATETIME2 NOT NULL,
    [usuario_id_fk] INT NOT NULL,
    CONSTRAINT [pk_documento_firmado_portal] PRIMARY KEY CLUSTERED ([documento_firmado_portal_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[documentos_firmados_portal] ADD CONSTRAINT [fk_usuario_en_documentos_firmados_portal] FOREIGN KEY ([usuario_id_fk]) REFERENCES [dbo].[usuarios]([usuario_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

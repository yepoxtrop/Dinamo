BEGIN TRY

BEGIN TRAN;

-- Paso 1: Eliminar constraints de la tabla documentos_firmados actual
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_firma_en_archivos_firmados')
BEGIN
    ALTER TABLE [dbo].[documentos_firmados] DROP CONSTRAINT [fk_firma_en_archivos_firmados];
END;

IF EXISTS (SELECT * FROM sys.key_constraints WHERE name = 'pk_archivo' AND parent_object_id = OBJECT_ID('dbo.documentos_firmados'))
BEGIN
    ALTER TABLE [dbo].[documentos_firmados] DROP CONSTRAINT [pk_archivo];
END;

-- Paso 2: Renombrar la tabla actual documentos_firmados a documentos_firmados_old (como respaldo temporal)
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'documentos_firmados')
BEGIN
    EXEC sp_rename 'dbo.documentos_firmados', 'documentos_firmados_old';
END;

-- Paso 3: Renombrar documentos_firmados_portal a documentos_firmados
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'documentos_firmados_portal')
BEGIN
    -- Eliminar la clave foránea actual
    IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_usuario_en_documentos_firmados_portal')
    BEGIN
        ALTER TABLE [dbo].[documentos_firmados_portal] DROP CONSTRAINT [fk_usuario_en_documentos_firmados_portal];
    END;
    
    -- Eliminar la clave primaria
    IF EXISTS (SELECT * FROM sys.key_constraints WHERE name = 'pk_documento_firmado_portal')
    BEGIN
        ALTER TABLE [dbo].[documentos_firmados_portal] DROP CONSTRAINT [pk_documento_firmado_portal];
    END;
    
    -- Renombrar la tabla
    EXEC sp_rename 'dbo.documentos_firmados_portal', 'documentos_firmados';
    
    -- Renombrar la columna ID
    EXEC sp_rename 'dbo.documentos_firmados.documento_firmado_portal_id', 'documento_firmado_id', 'COLUMN';
    
    -- Recrear la clave primaria con el nuevo nombre
    ALTER TABLE [dbo].[documentos_firmados] ADD CONSTRAINT [pk_archivo] PRIMARY KEY CLUSTERED ([documento_firmado_id]);
    
    -- Recrear la clave foránea con el nuevo nombre
    ALTER TABLE [dbo].[documentos_firmados] ADD CONSTRAINT [fk_usuario_en_documentos_firmados] FOREIGN KEY ([usuario_id_fk]) REFERENCES [dbo].[usuarios]([usuario_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
END;

-- Paso 4: Eliminar la tabla antigua documentos_firmados_old si existe
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'documentos_firmados_old')
BEGIN
    DROP TABLE [dbo].[documentos_firmados_old];
END;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

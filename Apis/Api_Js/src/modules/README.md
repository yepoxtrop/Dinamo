# ⚙️ Módulos

Los módulos contienen las funciones reutilizables que forman la lógica de negocio del servidor. Se
invocan desde los controladores o entre sí.

## 📦 Módulos principales

- **documentos/analizarDocumentosPDF** – Lee PDFs binarios, extrae firmas digitales y devuelve un objeto
  con información de cada certificado encontrado.
- **firmasDigitales/** – Maneja creación de carpetas y archivos de clave, generación de certificados y
  procesos para firmas individuales o masivas.
- **documentos/** – Operaciones sobre archivos PDF ya cargados (firma, validación, gestión de ficheros
  firmados).
- **documentos/reportes/** – Generación de reportes en CSV (básico/detallado), XLSX y, en construcción,
  PDF para visualizar resultados.
- **baseDatos/** – Helpers y lógica de acceso a la base de datos mediante Prisma o consultas SQL
  crudas.
- **correo/** – Envío de notificaciones por email utilizando `nodemailer` y plantillas sencillas.
- **dominio/** – Conexiones LDAP/AD para autenticación de usuarios y consultas de atributos/grupos.
- **tokens/** – Creación y verificación de JWT usados para proteger las rutas.

> Nota: los módulos suelen recibir parámetros como objetos desestructurados y retornan promesas.

## 📝 Observaciones

- La mayoría de funciones son asíncronas y se espera manejo de errores externo.
- Mantener consistencia entre nombres de módulos y los paths que usan los controladores.
- Si agrega un nuevo módulo, agrégalo a esta lista con descripción breve.


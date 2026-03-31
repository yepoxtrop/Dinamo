# 🛠️ Configuraciones Adicionales

Contiene utilidades, supervisores y configuraciones auxiliares para operaciones especiales y monitoreo.

## 📂 Estructura

- `/supervisores.js` – Objetos de supervisión y monitoreo de operaciones.

## 🧩 Funcionalidades

### Supervisores

Objetos que rastrean el estado de operaciones largas como:
- **Firma de documentos**: Progreso de firma, documento actual, firmas completadas.
- **Procesamiento de lotes**: Progreso general, errores encontrados.
- **Generación de reportes**: Estado de generación, archivo en construcción.

#### Ejemplo de uso

```javascript
import { supervisores } from './objetos/supervisores.js';

// Crear supervisor
const supervisor = supervisores.crearSupervisor('firma-masiva', {
  total: 100,
  actual: 0
});

// Actualizar progreso
supervisor.actualizar(50, 'Procesando firma 50...');

// Finalizar
supervisor.completar();
```

## 📊 Datos capturados

- **ID de operación**: Identificador único
- **Tipo de operación**: firma-individual, firma-masiva, reporte, etc.
- **Progreso**: Porcentaje completado
- **Estado**: en-progreso, completado, error
- **Errores**: Lista de errores encontrados
- **Timestamp**: Fecha/hora de inicio y fin

## 📝 Observaciones

- Los supervisores son útiles para WebSockets y actualizaciones en tiempo real.
- Se limpian automáticamente después de cierto tiempo.
- Pueden ser consultados por clientes para mostrar barras de progreso.

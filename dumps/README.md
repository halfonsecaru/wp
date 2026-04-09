# 📁 Directorio de Dumps SQL

Este directorio está destinado para almacenar archivos dump SQL que pueden ser procesados por el sistema de migración de base de datos.

## 🚀 Cómo usar la funcionalidad de lectura de dumps

### 1. Colocar el archivo dump

Coloca tu archivo dump SQL en este directorio. El sistema buscará por defecto un archivo llamado `database_dump.sql` en esta ubicación.

### 2. Usar el endpoint REST

#### Procesar dump con ruta por defecto:
```bash
POST http://localhost:3000/database-migration/process-dump
Content-Type: application/json

{}
```

#### Procesar dump con ruta personalizada:
```bash
POST http://localhost:3000/database-migration/process-dump
Content-Type: application/json

{
  "dumpFilePath": "C:\\ruta\\completa\\al\\archivo.sql"
}
```

### 3. Usar directamente el servicio

```typescript
// En tu controlador o servicio
const result = await this.databaseMigrationService.processDumpFile();
// O con ruta personalizada
const result = await this.databaseMigrationService.processDumpFile('/ruta/al/dump.sql');
```

## 📊 Formato de respuesta

El sistema devuelve un objeto con la siguiente estructura:

```json
{
  "success": true,
  "tablesProcessed": 20,
  "tablesWithData": 15,
  "totalRows": 1250,
  "data": {
    "usuarios": [...],
    "companies": [...],
    "products": [...]
  },
  "processingOrder": ["usuarios", "countries", "provinces", ...]
}
```

## 🗂️ Orden de procesamiento

El sistema procesa las tablas siguiendo la estructura de carpetas del proyecto:

1. **usersData**: `usuarios`, `countries`, `provinces`, `cities`, `empleados`, `direcciones`
2. **company**: `companies`
3. **supplier**: `supplier`
4. **shops**: `shops`
5. **products**: `colors`, `sizes`, `tipo`, `familia`, `temporada`, `group`, `modelo`, `articles`, `tags`
6. **historials**: `historial_articulos`, `historial_tags`

## 📝 Formato de dump soportado

El sistema puede procesar dumps SQL estándar con declaraciones INSERT:

```sql
INSERT INTO usuarios (id, name, email) VALUES (1, 'Juan', 'juan@email.com');
INSERT INTO usuarios (id, name, email) VALUES 
  (2, 'María', 'maria@email.com'),
  (3, 'Pedro', 'pedro@email.com');
```

## 🔧 Endpoints disponibles

- `POST /database-migration/process-dump` - Procesar archivo dump
- `GET /database-migration/external-data?limit=5` - Obtener datos de BD externa (método original)
- `GET /database-migration/test-connection` - Probar conexión a BD externa
- `POST /database-migration/custom-query` - Ejecutar consulta personalizada

## ⚠️ Notas importantes

- Los archivos dump pueden ser grandes, asegúrate de tener suficiente memoria disponible
- El sistema parsea el dump línea por línea para optimizar el uso de memoria
- Los datos se organizan automáticamente según las dependencias del proyecto
- Si una tabla no está en la estructura definida, se agregará al final del procesamiento

## 🎯 Ejemplo de uso completo

1. Coloca tu archivo `database_dump.sql` en este directorio
2. Haz una petición POST al endpoint:
   ```bash
   curl -X POST http://localhost:3000/database-migration/process-dump \
        -H "Content-Type: application/json" \
        -d '{}'
   ```
3. El sistema procesará el dump y devolverá los datos organizados por tabla

¡Listo! Ahora puedes procesar dumps SQL sin necesidad de conectarte a una base de datos externa.
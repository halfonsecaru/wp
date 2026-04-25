# AlfButton - Componente UI de Élite

Componente de botón de alto rendimiento diseñado para el ecosistema AlfComponents. Impulsado por el Elite CSS Variable Engine, este componente combina polimorfismo, reactividad total con Signals y una estética premium adaptable.

## Características Principales

- **Polimorfismo Nativo**: Se transforma automáticamente de <button> a <a> si se detecta una URL.
- **Elite Style Engine**: Control total mediante variables CSS para estados (Default, Hover, Active, Focus, Disabled).
- **Protección de Datos**: Debounce configurable para evitar clicks accidentales múltiples.
- **Accesibilidad Avanzada**: Gestión inteligente de foco (Smart Blur), etiquetas ARIA dinámicas y estados aria-busy.
- **Carga Adaptativa**: Spinner que escala proporcionalmente al tamaño del botón.
- **Tooltip Integrado**: Directiva host integrada para etiquetas de información inmediata.
- **Modo Geek**: Definiciones preestablecidas inspiradas en la cultura pop (Jedi, Matrix, Cyber).

## Uso Básico

```typescript
import { AlfButton } from '@alfcomponents/components';

// En tu template
<alf-button 
  label="Enviar" 
  variant="primary" 
  (onClick)="handleSave()">
</alf-button>
```

## Referencia de API

### Inputs (Propiedades)

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `label` | `string` | Texto del botón (soporta i18n automático). |
| `predefined` | `DefaultButtonKeys | string` | Identificador de configuración preestablecida (Accept, Cancel, Jedi...). |
| `visualType` | `AlfButtonVisualTypeEnum` | Estilo visual: `Solid`, `Outlined`, `Text`, `Ghost`, `ThreeD`, `Glossy`, etc. |
| `loading` | `AlfLoadingInterface` | Controla el estado de carga y el spinner. |
| `tooltip` | `string | AlfTooltipConfig` | Configuración del tooltip flotante. |
| `debounceTime` | `number` | Tiempo en ms para ignorar clicks repetidos (por defecto 0). |
| `link` | `{ url: string, target?: string }` | Si se provee, el componente renderiza un link <a>. |

### Outputs (Eventos)

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `onClick` | `output<MouseEvent>` | Emitido al hacer click (asíncrono/reactivo). |
| `onHoverEnter` | `output<MouseEvent>` | Emitido cuando el puntero entra. |

## Configuraciones Pro (Modo Geek)

El botón incluye variantes preconfiguradas que puedes usar mediante el input `predefined`:

- `DefaultButtonKeys.Accept`: Verde éxito con icono de check.
- `DefaultButtonKeys.Cyber`: Estética neón con bordes rectos.
- `DefaultButtonKeys.Matrix`: Fuente monoespaciada y sombras digitales.
- `DefaultButtonKeys.Jedi`: Efecto de brillo de sable láser.

---
*Parte del Design System Alfonizer.*

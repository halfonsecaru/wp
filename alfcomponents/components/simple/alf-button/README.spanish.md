# AlfButton - Componente de Botón Élite

Componente de botón standalone de alto rendimiento diseñado para Angular 22. Implementa el **Elite Visual Engine**, con centralización total del diseño en TypeScript, soporte polimórfico (button/anchor) y sistema de temas dinámico mediante variables CSS.

## Características Principales

- **Render Polimórfico**: Alterna automáticamente entre `<button>` y `<a>` según la configuración del input `link`.
- **Elite Visual Engine**: Toda la lógica visual (Sólido, Outline, Soft, Ghost, etc.) se resuelve de manera reactiva mediante la clase base.
- **Sistema de Temas Dinámico**: Utiliza `AlfColorEnum` con variables CSS y fallbacks para un cambio de tema instantáneo y sin parpadeos.
- **Inputs Atómicos**: Divide la configuración en inputs reactivos individuales (evita objetos de configuración gigantes).
- **Protección de Doble Click**: Implementa un sistema de `debounceTime` reactivo para evitar múltiples ejecuciones en acciones críticas.
- **Zoneless Ready**: Diseñado para funcionar de forma óptima en arquitecturas Angular sin Zone.js.

## Uso Básico

```html
<alf-button
  [id]="'btn-save'"
  [variant]="AlfColorVariantEnum.Primary"
  [label]="'Guardar Cambios'"
  (onClick)="handleSave($event)">
</alf-button>
```

```typescript
import { AlfColorVariantEnum } from '@alfcomponents/enums';
```

## API del Componente

### Inputs Principales

| Input | Tipo | Descripción |
|---|---|---|
| `type` | `AlfButtonTypeEnum` | Tipo HTML del botón (`button`, `submit`, `reset`). |
| `label` | `string` | Texto visible del botón (sobrescribe i18n). |
| `iconLeft` | `string \| AlfIconsUnicodeIconEnum` | Icono a la izquierda del texto. |
| `iconRight` | `string \| AlfIconsUnicodeIconEnum` | Icono a la derecha del texto. |
| `link` | `ButtonLink` | Configuración de enlace (convierte el botón en `<a>`). |
| `debounceTime` | `number` | Tiempo de espera en ms para filtrar clicks repetidos. |

### Configuración Visual (Heredada de `AlfBaseDirectives`)

| Propiedad | Descripción |
|---|---|
| `variant` | Variante de color y estilo visual (Primary, Success, SuccessSoft, PrimaryOutline, etc.). |
| `disabled` | Estado de interacción del componente. |
| `ripple` | Configuración del efecto de ondas al hacer click. |
| `animations` | Animaciones de entrada/salida (Animate.css). |

## Estructura de Estilos

El componente utiliza una estrategia dual:
1. **SCSS**: Define la estructura de layout, gap y comportamientos estáticos.
2. **TypeScript (Engine)**: Inyecta los estilos dinámicos (colores, sombras, tipografía) basados en la variante seleccionada, asegurando que la lógica de diseño esté siempre en el código.

## i18n y Traducciones

El componente soporta internacionalización nativa para etiquetas comunes. Las traducciones se encuentran en `i18n/alf-button.i18n.ts`.

---
Parte del ecosistema **Alfonizer Design System**.

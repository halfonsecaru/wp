# AlfCheckbox - Componente de Checkbox Élite

Componente de checkbox standalone de alto rendimiento diseñado para Angular 22. Implementa el **Elite Visual Engine**, con centralización total del diseño en TypeScript, reactividad nativa mediante Signals y un sistema de temas dinámico mediante variables CSS.

## Características Principales

- **Signals Nativos**: Utiliza `input()`, `model()` y `computed()` para una reactividad pura y eficiente.
- **Elite Visual Engine**: Toda la lógica visual (colores, ripples, bordes) está centralizada en `defaultVariants.ts`.
- **Sistema de Temas Dinámico**: Utiliza `AlfColorEnum` con variables CSS y fallbacks para un cambio de tema instantáneo y sin parpadeos.
- **Modos Visuales**: Soporte para estilos `Elegant` (redondeado/circular) y `Standard` (cuadrado).
- **Estado Indeterminado**: Soporte completo para estados "mixed" (útil en árboles de selección).
- **Zoneless Ready**: Diseñado para funcionar de forma óptima en arquitecturas Angular sin Zone.js.

## Uso Básico

```html
<alf-checkbox
  [(checked)]="isAccepted"
  [label]="'Acepto los términos'"
  [variant]="AlfColorVariantEnum.Primary">
</alf-checkbox>
```

```typescript
import { AlfColorVariantEnum } from '@alfcomponents/enums';
```

## API del Componente

### Inputs Principales

| Input | Tipo | Descripción |
|---|---|---|
| `inputConfig` | `AlfCheckboxInterface` | Objeto de configuración integral del checkbox. |
| `checked` | `model<boolean>` | Binding bidireccional del estado marcado. |
| `indeterminate` | `model<boolean>` | Binding bidireccional del estado indeterminado. |
| `label` | `input<string>` | Texto de la etiqueta. |
| `labelPosition` | `input<'before' \| 'after'>` | Posición de la etiqueta relativa al checkbox. |
| `checkboxStyle` | `AlfCheckboxVariantEnum` | Estilo visual (`Elegant` o `Standard`). |
| `value` | `input<string \| number>` | Valor asociado al checkbox. |
| `name` | `input<string>` | Atributo name nativo para agrupaciones. |
| `error` | `input<string>` | Mensaje de error reactivo. |
| `helperText` | `input<string>` | Texto de ayuda reactivo. |
| `iconSelected` | `input<AlfIconsUnicodeIconEnum>` | Icono personalizado para el estado marcado. |

### Configuración Visual (Heredada)

| Propiedad | Descripción |
|---|---|
| `variant` | Variante de color base (Primary, Success, etc.). |
| `size` | Escala de dimensiones (XS a 2XL). |
| `disabled` | Estado de interacción del componente. |

## Estructura de Estilos

El componente utiliza una estrategia dual:
1. **SCSS**: Define la estructura de layout, gap y comportamientos estáticos.
2. **TypeScript (Engine)**: Inyecta los estilos dinámicos (colores, sombras, tipografía) basados en la variante seleccionada, asegurando que la lógica de diseño esté siempre en el código.

---
Parte del ecosistema **Alfonizer Design System**.

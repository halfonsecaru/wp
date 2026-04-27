# AlfButtons - Componente de Boton (Nuevo)

Componente de boton standalone para AlfComponents con motor visual por variables CSS, soporte link/button, eventos reactivos y debounce de clicks.

## Caracteristicas principales

- Render polimorfico: `<button>` por defecto y `<a>` cuando se envia `link`.
- Motor visual centralizado: presets por `visualType` y `colorVariant`.
- Variante `Light` ajustada para mantener color de texto consistente en hover/active.
- Eventos reactivos: `onClick`, `onHoverEnter`, `onHoverLeave`.
- Proteccion de doble click con `debounceTime`.
- Integracion con tooltip y ripple via directivas.
- Soporte i18n para botones predefinidos usando `getAlfPredefinedButton(...)`.

## Uso basico

```html
<alf-buttons
  [inputConfig]="saveButton"
  tooltip="Guardar cambios"
  (onClick)="handleSave($event)">
</alf-buttons>
```

```ts
import { getAlfPredefinedButton } from '@alfcomponents/components/simple/alf-buttons/alf-button-predefined';
import { DefaultButtonKeys } from '@alfcomponents/components/simple/alf-buttons/enums/defaultButtonKeys.interface';

saveButton = getAlfPredefinedButton(DefaultButtonKeys.Accept, { lang: 'es' });
```

## API completa

Prioridad de resolucion de propiedades: input directo > `inputConfig` > valor por defecto interno.

### Inputs propios de boton

| Input | Tipo | Descripcion |
|---|---|---|
| `inputConfig` | `AlfButtonInterface` | Configuracion completa del boton en un solo objeto. |
| `type` | `AlfButtonTypeEnum` | Tipo HTML del boton (`button`, `submit`, etc.). |
| `label` | `string` | Texto visible del boton. |
| `iconLeft` | `AlfIconsUnicodeIconEnum` | Icono a la izquierda del label. |
| `iconRight` | `AlfIconsUnicodeIconEnum` | Icono a la derecha del label. |
| `link` | `{ url: string; target?: AlfLinkTargetEnum }` | Si existe, renderiza `<a>` en lugar de `<button>`. |
| `debounceTime` | `number` | Umbral en ms para ignorar clicks repetidos. |

### Inputs base heredados

| Input | Tipo | Descripcion |
|---|---|---|
| `tooltip` | `string \| AlfTooltipConfig` | Tooltip del host. |
| `ripple` | `boolean \| AlfRippleInterface` | Activa/desactiva ripple o permite configurarlo. |
| `colorVariant` | `AlfColorVariantEnum` | Variante de color base del componente. |
| `visualType` | `AlfButtonVisualTypeEnum` | Tipo visual (`Solid`, `Outlined`, `Text`, etc.). |
| `predefined` | `AlfVisualPredefinedEnum` | Preset visual predefinido del design system. |
| `cursor` | `AlfCursorEnum` | Cursor CSS del host. |
| `disabled` | `boolean` | Estado deshabilitado. |
| `aria` | `AlfAriaBaseInterface` | Configuracion de atributos ARIA. |
| `animations` | `AlfAnimateCssInterface` | Configuracion de animaciones de entrada/salida. |
| `backgrounds` | `AlfBackgroundsInterface` | Overrides de fondo por estado. |
| `border` | `AlfBorderInterface` | Overrides de borde por estado. |
| `displayAndLayout` | `AlfDisplayAndLayoutInterface` | Overrides de display, align, gap, etc. |
| `margin` | `AlfMarginInterface` | Overrides de margen por estado. |
| `outline` | `AlfOutlineInterface` | Overrides de outline por estado. |
| `padding` | `AlfPaddingInterface` | Overrides de padding por estado. |
| `shadows` | `AlfShadowsInterface` | Overrides de sombras por estado. |
| `textStyle` | `AlfTextStyleInterface` | Overrides de estilo de texto por estado. |
| `transform` | `AlfTransformInterface` | Overrides de transform por estado. |
| `typography` | `AlfTypographyInterface` | Overrides tipograficos por estado. |

### Outputs

| Output | Tipo | Descripcion |
|---|---|---|
| `onClick` | `output<MouseEvent>` | Se emite en click validado por debounce. |
| `onHoverEnter` | `output<MouseEvent>` | Se emite en `mouseenter`. |
| `onHoverLeave` | `output<MouseEvent>` | Se emite en `mouseleave`. |

### Valores por defecto reales

| Propiedad | Default real | Fuente |
|---|---|---|
| `debounceTime` | `0` | `alf-buttons.ts` (`input<number>(0)`) |
| `type` | `AlfButtonTypeEnum.Button` | `base-button-configuration.ts` (`typeComputed`) |
| `label` | `'Boton'` | `base-button-configuration.ts` (`labelComputed`) |
| `link` | `undefined` | `base-button-configuration.ts` (`linkComputed`) |
| `ripple` | `true` | `alf-base-configuration.ts` (`rippleInputComputed`) |
| `colorVariant` | `AlfColorVariantEnum.Default` | `alf-base-configuration.ts` (`colorVariantComputed`) |
| `cursor` | `AlfCursorEnum.Pointer` | `alf-base-configuration.ts` (`cursorComputed`) |
| `disabled` | `false` | `alf-base-configuration.ts` (`disabledComputed`) |
| `tooltip` | `undefined` | `alf-base-configuration.ts` (`tooltipComputed`) |
| `predefined` | `undefined` | `alf-base-configuration.ts` (`predefinedComputed`) |
| `visualType` | `undefined` | `alf-base-configuration.ts` (`visualTypeComputed`) |
| `aria` | `undefined` | `alf-base-configuration.ts` (`ariaComputed`) |
| `animations` | `undefined` | `alf-base-configuration.ts` (`animationsComputed`) |
| `backgrounds`, `border`, `displayAndLayout`, `margin`, `outline`, `padding`, `shadows`, `textStyle`, `transform`, `typography` | `undefined` | `alf-base-configuration.ts` (computed de overrides) |

Notas practicas:
- Si `visualType` y `predefined` son `undefined`, el motor visual resuelve estilo efectivo `Solid`.
- Si `link` es `undefined`, el render efectivo es `<button>`.

## Visual types soportados

- `Solid`
- `Outlined`
- `Text`
- `Ghost`
- `Soft`
- `Crystal`
- `ThreeD`
- `Glossy`
- `Gradient`
- `Raised`

## Notas de i18n

- El i18n de labels predefinidos vive en `i18n/alf-button.i18n.ts`.
- Para aplicar i18n, usa `getAlfPredefinedButton(...)`.
- Si defines `label` manualmente en `inputConfig`, ese texto manual prevalece.

---
Parte del Design System Alfonizer.

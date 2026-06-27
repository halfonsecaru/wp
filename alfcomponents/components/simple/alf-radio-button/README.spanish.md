# AlfRadioButton

AlfRadioButton es un componente de botón de opción premium para Alfonizer, diseñado bajo la arquitectura Élite.

## Características

- Basado en Angular Signals (Zoneless Ready).
- Soporte completo para i18n (7 idiomas).
- Altamente personalizable mediante el motor visual central.
- Variantes visuales: Elegant (Neumórfico) y Standard.
- Arquitectura de inputs planos — no se requiere objeto `config`.

## Instalación

El componente se exporta como parte de `alfcomponents`.

```typescript
import { AlfRadioButton } from '@alfcomponents/components';
```

## Uso Básico

```html
<alf-radio-button 
  [(checked)]="opcionSeleccionada" 
  label="Opción 1"
  name="grupo1"
  value="1">
</alf-radio-button>
```

## Propiedades

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `variant` | `string \| AlfColorVariantEnum` | Variante predefinida (ej: 'Primary', 'SuccessOutline'). |
| `checked` | `model<boolean>` | Estado de selección (Two-way binding). |
| `label` | `input<string>` | Texto de la etiqueta. |
| `labelPosition` | `input<'before' \| 'after'>` | Posición de la etiqueta (por defecto: `'after'`). |
| `size` | `input<AlfSizeEnum \| string>` | Tamaño (XS, SM, MD, LG, XL, 2XL). |
| `radioButtonStyle` | `input<AlfRadioButtonVariantEnum>` | Estilo visual: `Elegant` o `Standard`. |
| `disabled` | `input<boolean>` | Deshabilita el botón de opción. |
| `error` | `input<string>` | Mensaje de error de validación. |
| `helperText` | `input<string>` | Texto informativo de ayuda. |
| `value` | `input<any>` | Valor emitido al seleccionar. |
| `name` | `input<string>` | Nombre del grupo para el comportamiento nativo de radio. |

## Variantes de Estilo

Se pueden configurar a través de la propiedad `radioButtonStyle`:

- `Elegant`: Estilo con sombras neumórficas y transiciones suaves.
- `Standard`: Estilo clásico y limpio en forma de caja.

## Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `onCheckedChange` | `output<any>` | Emite el `value` cuando se selecciona el botón de opción. |

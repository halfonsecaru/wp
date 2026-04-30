# AlfRadioButton

AlfRadioButton es un componente de botón de opción premium para Alfonizer, diseñado bajo la arquitectura Élite.

## Características

- Basado en Angular Signals (Zoneless Ready).
- Soporte completo para i18n (7 idiomas).
- Altamente personalizable mediante el motor visual central.
- Variantes visuales: Elegant (Neumórfico) y Standard.

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
| `variant` | `string \| AlfColorVariantEnum` | Variante predefinida (ej: 'SolidPrimary', 'OutlinedSuccess'). |
| `config` | `AlfRadioButtonInterface` | Configuración detallada del componente. |
| `checked` | `model<boolean>` | Estado de selección (Two-way binding). |
| `label` | `input<string>` | Texto de la etiqueta. |
| `size` | `input<AlfSizeEnum>` | Tamaño (SM, MD, LG, XL). |

## Variantes de Estilo

Se pueden configurar a través de la propiedad `radioButtonStyle` en la configuración:

- `Elegant`: Estilo con sombras neumórficas y transiciones suaves.
- `Standard`: Estilo clásico y limpio.

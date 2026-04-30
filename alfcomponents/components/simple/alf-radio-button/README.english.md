# AlfRadioButton

AlfRadioButton is a premium radio button component for Alfonizer, designed under the Elite architecture.

## Features

- Based on Angular Signals (Zoneless Ready).
- Full i18n support (7 languages).
- Highly customizable via the central visual engine.
- Visual variants: Elegant (Neumorphic) and Standard.

## Installation

The component is exported as part of `alfcomponents`.

```typescript
import { AlfRadioButton } from '@alfcomponents/components';
```

## Basic Usage

```html
<alf-radio-button 
  [(checked)]="isSelected" 
  label="Option 1"
  name="group1"
  value="1">
</alf-radio-button>
```

## Properties

| Property | Type | Description |
|-----------|------|-------------|
| `variant` | `string \| AlfColorVariantEnum` | Predefined variant (e.g., 'SolidPrimary', 'OutlinedSuccess'). |
| `config` | `AlfRadioButtonInterface` | Detailed component configuration. |
| `checked` | `model<boolean>` | Selection state (Two-way binding). |
| `label` | `input<string>` | Label text. |
| `size` | `input<AlfSizeEnum>` | Size (SM, MD, LG, XL). |

## Style Variants

Can be configured via the `radioButtonStyle` property in the configuration:

- `Elegant`: Style with neumorphic shadows and smooth transitions.
- `Standard`: Classic and clean style.

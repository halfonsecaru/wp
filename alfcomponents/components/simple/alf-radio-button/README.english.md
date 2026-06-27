# AlfRadioButton

AlfRadioButton is a premium radio button component for Alfonizer, designed under the Elite architecture.

## Features

- Based on Angular Signals (Zoneless Ready).
- Full i18n support (7 languages).
- Highly customizable via the central visual engine.
- Visual variants: Elegant (Neumorphic) and Standard.
- Flat-input architecture — no `config` object required.

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
| `variant` | `string \| AlfColorVariantEnum` | Predefined variant (e.g., 'Primary', 'SuccessOutline'). |
| `checked` | `model<boolean>` | Selection state (Two-way binding). |
| `label` | `input<string>` | Label text. |
| `labelPosition` | `input<'before' \| 'after'>` | Position of the label (default: `'after'`). |
| `size` | `input<AlfSizeEnum \| string>` | Size (XS, SM, MD, LG, XL, 2XL). |
| `radioButtonStyle` | `input<AlfRadioButtonVariantEnum>` | Visual style: `Elegant` or `Standard`. |
| `disabled` | `input<boolean>` | Disables the radio button. |
| `error` | `input<string>` | Validation error message. |
| `helperText` | `input<string>` | Informational helper text. |
| `value` | `input<any>` | Value emitted on selection. |
| `name` | `input<string>` | Group name for native radio behavior. |

## Style Variants

Can be configured via the `radioButtonStyle` property:

- `Elegant`: Style with neumorphic shadows and smooth transitions.
- `Standard`: Classic and clean box style.

## Events

| Event | Type | Description |
|-------|------|-------------|
| `onCheckedChange` | `output<any>` | Emits the `value` when the radio button is selected. |

# AlfCheckbox

Elite checkbox component for the AlfComponents library. It offers a premium design with multiple visual variants, fluid animations, and full internationalization support.

## Features

- 3 Visual Styles: Elegant (Neumorphic), Standard (Material), Moving (Expansive).
- Two-way binding support (`checked`, `indeterminate`).
- Predefined variants system (Solid, Outline, Crystal).
- Integrated multilingual support.
- Enhanced accessibility (WAI-ARIA).

## Basic Usage

```html
<alf-checkbox 
  [(checked)]="isChecked"
  label="I accept the terms"
  variant="SolidPrimary"
>
</alf-checkbox>
```

## Properties

| Property | Type | Description |
|---|---|---|
| `variant` | `string \| AlfColorVariantEnum` | Color and style variant (e.g., 'OutlineSuccess') |
| `config` | `AlfCheckboxInterface` | Full component configuration |
| `checked` | `boolean` (model) | Selection state |
| `indeterminate` | `boolean` (model) | Indeterminate state |
| `checkboxStyle` | `AlfCheckboxVariantEnum` | Visual style: Elegant, Standard, Moving |
| `label` | `string` | Label text |
| `size` | `AlfSizeEnum` | Size: Sm, Md, Lg, Xl |
| `disabled` | `boolean` | Disables the component |

## Visual Variants

1. **Elegant**: Circular design with neumorphic depth effects.
2. **Standard**: Traditional square design with smooth transitions.
3. **Moving**: The checkbox expands to wrap the text when selected.

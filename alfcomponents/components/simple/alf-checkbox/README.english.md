# AlfCheckbox

Elite checkbox component for the AlfComponents library. It offers a premium design with multiple visual variants, fluid animations, and full internationalization support.

## Features

- 3 Interaction Styles: Elegant (Neumorphic), Standard (Clean), Moving (Expansive).
- 5 Visual Families: Solid, Outlined, Standard, Soft, Crystal.
- Two-way binding support (`checked`, `indeterminate`).
- Validation system (helperText, error).
- Integrated multilingual support and WAI-ARIA accessibility.


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

## Interaction Styles

1. **Elegant**: Circular design with neumorphic depth effects.
2. **Standard**: Traditional square design with smooth transitions.
3. **Moving**: The checkbox expands to wrap the text when selected.

## Variant Families

- **Solid**: Filled background and solid border.
- **Outlined**: Solid border and transparent background.
- **Standard**: Borderless, minimalist style.
- **Soft**: Very soft pastel background without borders.
- **Crystal**: Glass-like translucent effect without borders.

# AlfCheckbox - Elite Checkbox Component

High-performance standalone checkbox component designed for Angular 22. It implements the **Elite Visual Engine**, with full design centralization in TypeScript, native Signals reactivity, and a dynamic theme system powered by CSS variables.

## Key Features

- **Native Signals**: Powered by `input()`, `model()`, and `computed()` for pure and efficient reactivity.
- **Elite Visual Engine**: All visual logic (colors, ripples, borders) is centralized in `defaultVariants.ts`.
- **Dynamic Theming**: Utilizes `AlfColorEnum` with CSS variables and fallbacks for instantaneous, flicker-free theme switching.
- **Visual Styles**: Support for `Elegant` (rounded/circular) and `Standard` (square) styles.
- **Indeterminate State**: Full support for "mixed" states, ideal for selection trees.
- **Zoneless Ready**: Optimized for Angular architectures without Zone.js.

## Basic Usage

```html
<alf-checkbox
  [(checked)]="isAccepted"
  [label]="'Accept terms and conditions'"
  [variant]="AlfColorVariantEnum.Primary">
</alf-checkbox>
```

```typescript
import { AlfColorVariantEnum } from '@alfcomponents/enums';
```

## Component API

### Main Inputs

| Input | Type | Description |
|---|---|---|
| `checked` | `model<boolean>` | Two-way binding for the checked state. |
| `indeterminate` | `model<boolean>` | Two-way binding for the indeterminate state. |
| `label` | `input<string>` | Checkbox label text. |
| `labelPosition` | `input<'before' \| 'after'>` | Label position relative to the checkbox. |
| `checkboxStyle` | `AlfCheckboxVariantEnum` | Visual style (`Elegant` or `Standard`). |
| `value` | `input<string \| number>` | Associated value for the checkbox. |
| `name` | `input<string>` | Native name attribute for grouping. |
| `error` | `input<string>` | Reactive error message. |
| `helperText` | `input<string>` | Reactive helper text. |
| `iconSelected` | `input<AlfIconsUnicodeIconEnum>` | Custom icon to display when checked. |

### Visual Configuration (Inherited)

| Property | Description |
|---|---|
| `variant` | Base color variant (Primary, Success, etc.). |
| `size` | Dimension scale (XS to 2XL). |
| `disabled` | Component interaction state. |

## Styling Architecture

The component uses a dual strategy:
1. **SCSS**: Defines layout structure, gap, and static behaviors.
2. **TypeScript (Engine)**: Injects dynamic styles (colors, shadows, typography) based on the selected variant, ensuring design logic stays within the code.

---
Part of the **Alfonizer Design System** ecosystem.

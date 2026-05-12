# AlfCheckbox - Elite Checkbox Component

High-performance standalone checkbox component designed for Angular 21. Fully integrated with the **Elite Visual Engine** and optimized for Zoneless architectures using native Signals.

## Key Features

- **Native Signals**: Powered by `input()`, `model()`, and `computed()` for pure and efficient reactivity.
- **Elite Visual Engine**: Colors, ripples, and borders centrally managed via `defaultVariants.ts`.
- **Visual Styles**: Support for `Elegant` (rounded/circular) and `Standard` (square) styles.
- **Indeterminate State**: Full support for "mixed" states, ideal for selection trees.
- **Dynamic Theming**: Implemented with `AlfColorEnum` and CSS variables for instant theme switching.
- **Accessibility**: Full ARIA management and keyboard support (Space/Enter).

## Basic Usage

```html
<alf-checkbox
  [(checked)]="isAccepted"
  [label]="'Accept terms and conditions'"
  [variant]="AlfColorVariantEnum.Primary"
/>
```

### Usage with Full Configuration
```typescript
import { getAlfCheckboxDefaultConfig } from './predefined/alf-checkbox.predefined';

config = getAlfCheckboxDefaultConfig(AlfColorVariantEnum.Success);
```
```html
<alf-checkbox [config]="config" />
```

## Component API

| Property | Type | Description |
|---|---|---|
| `checked` | `model<boolean>` | Two-way binding for the checked state. |
| `indeterminate` | `model<boolean>` | Two-way binding for the indeterminate state. |
| `label` | `input<string>` | Checkbox label text. |
| `checkboxStyle` | `AlfCheckboxVariantEnum` | Visual style (`Elegant` or `Standard`). |
| `size` | `AlfSizeEnum` | Dimension scale (XS to 2XL). |
| `disabled` | `input<boolean>` | Disabled state. |
| `error` | `input<string>` | Reactive error message. |

## Elite Refactoring
This component has been migrated to the "Centralized Engine" architecture, ensuring its colors and behaviors are 100% consistent with other components such as `AlfButton`.

---
Part of the **Alfonizer Design System** ecosystem.

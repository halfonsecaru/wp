# AlfSwitch - Elite Switch Component

High-performance standalone switch/toggle component designed for Angular 22. Fully integrated with the **Elite Visual Engine** and optimized for Zoneless architectures using native Signals.

## Key Features

- **Native Signals**: Powered by `input()`, `model()`, and `computed()` for pure and efficient reactivity.
- **Elite Visual Engine**: Colors, ripples, and borders centrally managed via `defaultVariants.ts`.
- **Visual Styles**: Support for `Elegant` (rounded/pills) and `Standard` (square/rectangular) styles.
- **Dynamic Theming**: Implemented with `AlfColorEnum` and CSS variables for instant theme switching.
- **Accessibility**: Full ARIA management and keyboard support (Space/Enter).

## Basic Usage

```html
<alf-switch
  [(checked)]="isActive"
  [label]="'Enable notifications'"
  [variant]="AlfColorVariantEnum.Primary"
/>
```

### Usage with Full Configuration
```typescript
import { getAlfSwitchDefaultConfig } from './predefined/alf-switch.predefined';

config = getAlfSwitchDefaultConfig(AlfColorVariantEnum.Success);
```
```html
<alf-switch [config]="config" />
```

## Component API

| Property | Type | Description |
|---|---|---|
| `checked` | `model<boolean>` | Two-way binding for the checked/active state. |
| `label` | `input<string>` | Switch label text. |
| `switchStyle` | `'elegant' \| 'standard'` | Visual style (`elegant` or `standard`). |
| `size` | `AlfSizeEnum` | Dimension scale (XS to 2XL). |
| `disabled` | `input<boolean>` | Disabled state. |
| `error` | `input<string>` | Reactive error message. |

## Elite Refactoring
This component has been migrated to the "Centralized Engine" architecture, ensuring its colors and behaviors are 100% consistent with other components such as `AlfButton`.

---
Part of the **Alfonizer Design System** ecosystem.

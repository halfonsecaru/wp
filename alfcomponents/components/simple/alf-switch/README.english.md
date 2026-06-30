# AlfSwitch - Elite Switch Component

High-performance standalone switch/toggle component designed for Angular 22. Fully integrated with the **Omni-Reactive** chromatic token system and optimized for Zoneless architectures using Angular Signals.

## 🌟 Key Features

- **Native Signals**: Powered by `input()`, `model()`, and `computed()` for pure and efficient reactivity.
- **Omni-Reactive Palette Engine**: Centrally managed colors, shadows, and borders via `AlfColorEnum`.
- **Visual Styles**: Support for `Elegant` (rounded/pill) and `Standard` (square/rectangular) styles.
- **Dynamic Theming**: Seamless integration with chromatic variants (`primary`, `success`, `danger`, etc.).
- **Accessibility & Micro-interactions**: Full ARIA support, keyboard interaction (Space/Enter), and smooth thumb and track transitions.

## 🚀 Basic Usage

```html
<alf-switch
  [(checked)]="isActive"
  label="Enable notifications"
  [variant]="AlfColorVariantEnum.Primary"
/>
```

### Advanced Example
```html
<alf-switch
  [(checked)]="darkMode"
  label="Dark Mode"
  labelPosition="before"
  switchStyle="elegant"
  [variant]="AlfColorVariantEnum.Success"
  (onCheckedChange)="handleToggle($event)"
/>
```

## 📋 Component API

| Property | Type | Description |
|---|---|---|
| `checked` | `model<boolean>` | Two-way binding for the checked/active state. |
| `label` | `input<string>` | Switch label text. |
| `labelText` | `input<string>` | Alternative alias for switch label. |
| `switchStyle` | `'elegant' \| 'standard'` | Visual style (`elegant` or `standard`). |
| `labelPosition` | `'before' \| 'after'` | Position of the label relative to the switch track. |
| `colorSwitch` | `AlfColorEnum \| string` | Custom direct color override for track/thumb. |
| `variant` | `AlfColorVariantEnum` | Main chromatic variant (`primary`, `danger`, etc.). |
| `disabled` | `input<boolean>` | Disables interaction with the switch. |
| `isLoading` | `input<boolean>` | Displays an integrated loading spinner (`AlfSpinner`). |

## 🔔 Events (*Outputs*)

| Event | Type | Description |
|---|---|---|
| `onCheckedChange` | `output<boolean>` | Emits the new boolean state upon toggling. |

---
Part of the **Alfonizer Design System** ecosystem.

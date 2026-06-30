# AI Usage Guide: AlfSwitch (Elite Standard)

This document describes how to use and extend the `alf-switch` component safely when generating code via AI assistants, following the project's technical rigor.

## 🏗️ Current Architecture

- **Component**: `alfcomponents/components/simple/alf-switch/alf-switch.ts`
- **Core Base Engine**: Inherits from `AlfBaseDirectives` for centralized reactive styles (background, border, shadows, typography).
- **Styling**: SCSS layout + CSS custom properties (`--alf-sw-*`) linked to `AlfColorEnum` tokens.
- **Signals**: Native Angular 22 Signals (`input`, `model`, `computed`) for full Zoneless reactivity.

## 💡 Recommended Implementation Examples

### 1. Standard Toggle
```html
<alf-switch
  [(checked)]="isEnabled"
  label="Enable Feature"
  [variant]="AlfColorVariantEnum.Primary"
/>
```

### 2. Custom Style & Position
```html
<alf-switch
  [(checked)]="autoSave"
  label="Auto Save Changes"
  labelPosition="before"
  switchStyle="elegant"
  [variant]="AlfColorVariantEnum.Success"
  (onCheckedChange)="onSaveToggle($event)"
/>
```

## 📐 Technical Rules (Mandatory)

1. **Access Modifiers**: Always specify `public`, `protected`, or `private`.
2. **Immutability & Readonly**: Declare all signal inputs, models, and injected properties as `readonly`.
3. **Arrow Functions**: Component handlers MUST be defined as arrow functions to preserve lexical binding.
4. **Two-Way Binding**: Use `model<boolean>()` for `checked`.
5. **No Ad-Hoc Hex Colors**: Colors must always resolve via `AlfColorEnum` or CSS variables linked to tokens.

## ⚡ State & Event API

- `checked`: `model<boolean>` - Controls the switch toggle state.
- `disabled`: `input<boolean>` - Inherited state disabling interaction.
- `isLoading`: `input<boolean>` - Renders an integrated loading spinner (`AlfSpinner`).
- `onCheckedChange`: `output<boolean>` - Emits new boolean state after toggling.

---
*Technical reference for AI agent generators.*

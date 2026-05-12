# AI Usage Guide: AlfCheckbox (Elite Standard)

This document describes how to use and extend the `alf-checkbox` component safely from an AI assistant, following the project's technical rigor.

## Current Architecture

- **Component**: `alfcomponents/components/simple/alf-checkbox/alf-checkbox.ts`
- **Core Engine**: Fully integrated with `alfcomponents/base/defaultVariants.ts` via `resolveVariantConfig`.
- **Styling**: Dual strategy using SCSS (layout) and CSS Variables (`AlfColorEnum`) for dynamic theming.
- **Signals**: Native Angular 21 Signals (`input`, `model`, `computed`) for full reactivity and Zoneless support.

## Recommended Usage

### 1. Predefined Configuration
Always use the factory to get system defaults:
```ts
import { getAlfCheckboxDefaultConfig } from './predefined/alf-checkbox.predefined';

const config = getAlfCheckboxDefaultConfig(AlfColorVariantEnum.Success);
```

### 2. Implementation Example
```html
<alf-checkbox
  [(checked)]="termsAccepted"
  [label]="'Accept terms and conditions'"
  [variant]="AlfColorVariantEnum.Primary"
/>
```

## Technical Rules (Mandatory)

- **Modifiers**: NEVER omit access modifiers (`public`, `private`, `protected`).
- **Readonly**: All signals and injected dependencies MUST be `readonly`.
- **Arrow Functions**: All class methods MUST be arrow functions to preserve `this`.
- **Signals**: Use `model()` for two-way bindings like `checked` and `indeterminate`.
- **Hierarchy**: The component resolves properties using: `Individual Inputs > inputConfig > Factory Defaults`.

## State Management

- `checked`: `model<boolean>` - Controls the checkmark state.
- `indeterminate`: `model<boolean>` - Displays a "mixed" dash state. Setting `checked` manually resets this to `false`.
- `disabled`: `input<boolean>` - Inherited from `AlfBaseConfiguration`.

## Events

- `onCheckedChange`: `output<boolean>` - Emits the new state after a toggle.

## Refactoring Status
- [x] Standardized Directory Structure
- [x] Inherits from `AlfBaseCommonConfigInterface`
- [x] Integrated with Elite Visual Engine
- [x] CSS Variables with fallbacks
- [x] Readonly signals and arrow functions

---
*Technical reference for AI agents.*

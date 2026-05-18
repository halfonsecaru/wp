# AI Usage Guide: AlfSwitch (Elite Standard)

This document describes how to use and extend the `alf-switch` component safely from an AI assistant, following the project's technical rigor.

## Current Architecture

- **Component**: `alfcomponents/components/simple/alf-switch/alf-switch.ts`
- **Core Engine**: Fully integrated with `alfcomponents/base/defaultVariants.ts` via `resolveVariantConfig`.
- **Styling**: Dual strategy using SCSS (layout) and CSS Variables (`AlfColorEnum`) via visualprefix `--alf-sw` for dynamic theming.
- **Signals**: Native Angular 21 Signals (`input`, `model`, `computed`) for full reactivity and Zoneless support.

## Recommended Usage

### 1. Predefined Configuration
Always use the factory to get system defaults:
```ts
import { getAlfSwitchDefaultConfig } from './predefined/alf-switch.predefined';

const config = getAlfSwitchDefaultConfig(AlfColorVariantEnum.Success);
```

### 2. Implementation Example
```html
<alf-switch
  [(checked)]="isActive"
  [label]="'Enable notifications'"
  [variant]="AlfColorVariantEnum.Primary"
/>
```

## Technical Rules (Mandatory)

- **Modifiers**: NEVER omit access modifiers (`public`, `private`, `protected`).
- **Readonly**: All signals and injected dependencies MUST be `readonly`.
- **Arrow Functions**: All class methods MUST be arrow functions to preserve `this`.
- **Signals**: Use `model()` for two-way bindings like `checked`.
- **Hierarchy**: The component resolves properties using: `Individual Inputs > inputConfig > Factory Defaults`.

## State Management

- `checked`: `model<boolean>` - Controls the switch toggle state.
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

# AI Usage Guide: AlfCheckbox (Elite Visual Engine)

This document describes how to extend and use the `alf-checkbox` component safely from an AI assistant, adhering to the project's technical rigor and Architectural rules.

## Current Architecture

- **Component**: `alfcomponents/components/simple/alf-checkbox/alf-checkbox.ts`
- **Core Engine**: Centralized in `alfcomponents/base/defaultVariants.ts`. All visual logic is resolved here.
- **DNA Identities**: `BASIC_IDENTITIES` (inside `defaultVariants.ts`) maps semantic roles (`Primary`, `Success`, etc.) to brand colors, contrast, and ripple behavior.
- **Styling Strategy**: Dual approach. SCSS for static layout and **CSS Variables** (`AlfColorEnum`) with hex fallbacks for dynamic theming.
- **Signals**: Native Angular 22 Signals (`input`, `model`, `computed`) for full reactivity and Zoneless support.

## Recommended Configuration Workflow

1. **Direct Component Inputs**: Instead of a factory function, pass inputs directly to the component. Inherited visual properties (e.g. `variant`) are processed reactively by the base directive.
   ```html
   <alf-checkbox
     [(checked)]="termsAccepted"
     [label]="'Accept terms and conditions'"
     [variant]="AlfColorVariantEnum.Primary">
   </alf-checkbox>
   ```

2. **Customization**: Spreading and combining configs can also be done via the optional `inputConfig` input if needed, but direct signal inputs are the preferred approach for reactivity.

## Technical Rules (Mandatory)

- **Access Modifiers**: Every variable and method MUST have a modifier (`public`, `private`, `protected`).
- **Readonly Signals**: All signals (`input`, `computed`, `model`) MUST be `readonly`.
- **Arrow Functions**: Use arrow functions for all class methods, except lifecycle hooks and host event handlers which can be standard methods.
- **No Directives Overuse**: Do NOT use `CommonModule` or `*ngIf`. Use `@if`, `@for`, and `@let`.
- **Direct Template Listeners**: Listen to interactive DOM events directly in the template (e.g., `(click)`) to prevent unnecessary host propagation and maintain precision.
- **Hierarchy**: The component resolves properties using: `Individual Inputs > inputConfig > Inherited Context`.

## State Management

- `checked`: `model<boolean>` - Controls the checkmark state.
- `indeterminate`: `model<boolean>` - Displays a "mixed" dash state. Setting `checked` manually resets this to `false`.
- `disabled`: `input<boolean>` - Inherited from `AlfBaseConfiguration`.

## Events and Behavior

- **Outputs**: `onCheckedChange` - Emits the new state after a toggle.
- **Identities & IDs**: Generates a unique `internalId` with an `alf-cb` prefix.
- **Keyboard Support**: Space and Enter keys natively toggle the checkbox state.

## Testing

Run tests before committing changes:
```powershell
npx vitest run alfcomponents/components/simple/alf-checkbox/alf-checkbox.spec.ts
```

---
*Technical reference for AI agents and component maintenance.*

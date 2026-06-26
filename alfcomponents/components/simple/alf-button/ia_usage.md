# AI Usage Guide: AlfButton (Elite Visual Engine)

This document describes how to extend and use the `alf-button` component safely from an AI assistant, adhering to the project's technical rigor and Architectural rules.

## Current Architecture

- **Component**: `alfcomponents/components/simple/alf-button/alf-button.ts`
- **Core Engine**: Centralized in `alfcomponents/components/base/bases.directive.ts` via base class `AlfBaseDirectives`.
- **Styling Strategy**: Dual approach. SCSS for static layout, and **CSS Variables** computed dynamically via the base directive.
- **Polymorphism**: Automatically renders `<button>` or `<a>` based on the presence of the `link` input.

## Recommended Configuration Workflow

1. **Direct Component Inputs**: Sliced/atomic inputs are passed directly to the component. Inherited visual properties (e.g. `variant`, `disabled`) are processed reactively by the base directive.
   ```html
   <alf-button
     [id]="'my-custom-id'"
     [variant]="AlfColorVariantEnum.Primary"
     [label]="'Accept Changes'"
     [iconLeft]="AlfIconsUnicodeIconEnum.CheckMark"
     [debounceTime]="100"
     (onClick)="handleSave($event)">
   </alf-button>
   ```

2. **No Monolithic Config**: The component does not accept an `inputConfig` or `config` object; all settings are passed individually via dedicated inputs for performance, autocomplete, and simplicity.

## Technical Rules (Mandatory)

- **Access Modifiers**: Every variable and method MUST have a modifier (`public`, `private`, `protected`).
- **Readonly Signals**: All signals (`input`, `computed`, `model`) MUST be `readonly`.
- **Arrow Functions**: Use arrow functions for all class methods, except lifecycle hooks and host event handlers which can be standard methods.
- **No Directives Overuse**: Do NOT use `CommonModule` or `*ngIf`. Use `@if`, `@for`, and `@let`.
- **Direct Template Listeners**: Listen to interactive DOM events directly in the template (e.g., `(click)`, `(mouseenter)`, `(mouseleave)`) to prevent unnecessary host propagation and maintain precision.

## Events and Behavior

- **Outputs**: `onClick`, `onHoverEnter`, `onHoverLeave`.
- **Debounce**: Controlled by `debounceTime` (default 0) inside the click handler to filter rapid double-clicks.
- **Identities & IDs**: Generates a unique `idComputed` property combining the `id()` input or a fallback `ButtonsInternalId` prefix.

## Testing

Run tests before committing changes:
```powershell
npx vitest run alfcomponents/components/simple/alf-button/alf-button.spec.ts
```

---
*Technical reference for AI agents and component maintenance.*

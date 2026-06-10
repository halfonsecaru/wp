# AI Usage Guide: AlfButton (Elite Visual Engine)

This document describes how to extend and use the `alf-button` component safely from an AI assistant, adhering to the project's technical rigor and Architectural rules.

## Current Architecture

- **Component**: `alfcomponents/components/simple/alf-button/alf-button.ts`
- **Core Engine**: Centralized in `alfcomponents/base/defaultVariants.ts`. All visual logic (Solid, Outline, Soft, etc.) is resolved here.
- **DNA Identities**: `BASIC_IDENTITIES` (inside `defaultVariants.ts`) maps semantic roles (`Primary`, `Success`, etc.) to brand colors, contrast, and ripple behavior.
- **Styling Strategy**: Dual approach. SCSS for static layout and **CSS Variables** (`AlfColorEnum`) with hex fallbacks for dynamic theming.
- **Polymorphism**: Automatically renders `<button>` or `<a>` based on the presence of the `link` input.

## Intelligent Variant Resolution

The system uses a smart lookup mechanism:
- If you request `AlfColorVariantEnum.PrimaryOutline`, the engine first checks for a specific identity for that variant.
- If not found, it automatically resolves to the base family identity (`Primary`).
- This ensures consistency across all decorative variants (Outline, Soft, Ghost, Crystal, 3D, Gradient).

## Recommended Configuration Workflow

1. **Direct Component Inputs**: Instead of a factory function, pass inputs directly to the component. Inherited visual properties (e.g. `colorVariant`) are processed reactively by the base directive.
   ```html
   <alf-button
     [id]="'my-custom-id'"
     [colorVariant]="AlfColorVariantEnum.Primary"
     [label]="'Accept Changes'"
     [iconLeft]="AlfIconsUnicodeIconEnum.CheckMark"
     [debounceTime]="100"
     (onClick)="handleSave($event)">
   </alf-button>
   ```

2. **Customization**: Spreading and combining configs can also be done via the optional `inputConfig` input if needed, but direct signal inputs are the preferred approach for reactivity.

## Technical Rules (Mandatory)

- **Access Modifiers**: Every variable and method MUST have a modifier (`public`, `private`, `protected`).
- **Readonly Signals**: All signals (`input`, `computed`, `model`) MUST be `readonly`.
- **Arrow Functions**: Use arrow functions for all class methods, except lifecycle hooks and host event handlers which can be standard methods.
- **No Directives Overuse**: Do NOT use `CommonModule` or `*ngIf`. Use `@if`, `@for`, and `@let`.
- **Direct Template Listeners**: Listen to interactive DOM events directly in the template (e.g., `(click)`, `(mouseenter)`, `(mouseleave)`) to prevent unnecessary host propagation and maintain precision.

## Events and Behavior

- **Outputs**: `onClick`, `onHoverEnter`, `onHoverLeave`.
- **Debounce**: Controlled by `debounceTime` (default 0) inside `onHostClick` handler to filter rapid double-clicks.
- **Identities & IDs**: Generates a unique `buttonId` computed property combining the `id()` input or a fallback `ButtonsInternalId` prefix.

## Testing

Run tests before committing changes:
```powershell
npx vitest run alfcomponents/components/simple/alf-button/alf-button.spec.ts
```

---
*Technical reference for AI agents and component maintenance.*

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

1. **Base Configuration**: Always start with the factory function to get the Design System defaults:
   ```ts
   import { getAlfButtonDefaultConfig } from '@alfcomponents/components/simple/alf-button/predefined/alf-button.predefined';
   
   const config = getAlfButtonDefaultConfig(AlfColorVariantEnum.PrimaryOutline);
   ```

2. **Customization**: Merge properties over the base config. Avoid hardcoding styles; use `AlfColorEnum` or `AlfPxEnum`.
   ```ts
   const finalConfig = {
     ...config,
     label: 'Accept Changes',
     iconLeft: AlfIconsUnicodeIconEnum.CheckMark,
     displayAndLayout: { default: { width: AlfPxEnum.Px160 } }
   };
   ```

3. **Reactive Binding**: Bind to the `[inputConfig]` property of the component.

## Technical Rules (Mandatory)

- **Access Modifiers**: Every variable and method MUST have a modifier (`public`, `private`, `protected`).
- **Readonly Signals**: All signals (`input`, `computed`, `model`) MUST be `readonly`.
- **Arrow Functions**: Use arrow functions for all class methods to ensure `this` context.
- **No Directives Overuse**: Do NOT use `CommonModule` or `*ngIf`. Use `@if`, `@for`, and `@let`.

## Events and Behavior

- **Outputs**: `onClick`, `onHoverEnter`, `onHoverLeave`.
- **Debounce**: Controlled by `debounceTime` (default 0). Internal logic prevents rapid double-clicks.
- **Accessibility**: Automatic ARIA management and smart focus handling (blur on mouse click to avoid persistent focus rings).

## Testing

Run tests before committing changes:
```powershell
npx vitest run alfcomponents/components/simple/alf-button/alf-button.spec.ts
npx vitest run alfcomponents/components/simple/alf-button/alf-button-predefined.spec.ts
```

---
*Technical reference for AI agents and component maintenance.*

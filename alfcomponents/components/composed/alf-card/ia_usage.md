# AI Usage Guide: AlfCard (Elite Composed)

This document describes how to implement, configure, and compose the `AlfCard` component family safely when generating code via AI assistants, following the project's technical rigor.

## 🏗️ Architecture & Subcomponent Hierarchy (Angular 22+)

`AlfCard` uses modular subcomponents. Always structure them in logical order:

- `<alf-card>`: Root container holding the variant, elevation shadow, and main layout.
- `<alf-card-img>`: Top header image banner (clips top corners automatically via `border.ts`).
- `<alf-card-title>`: Formatted, centered title heading inheriting effective variant text colors.
- `<alf-card-body>`: Main text body container (evaluates background as transparent by default).
- `<alf-card-actions>`: Footer wrapper for action buttons or links (`<alf-button>`).

### Standard Composition Example:
```html
<alf-card [variant]="AlfColorVariantEnum.Primary">
  <alf-card-img src="/image.png" alt="Header Banner" />
  <alf-card-title>Card Heading</alf-card-title>
  <alf-card-body>
    Main descriptive body text for this composed card layout.
  </alf-card-body>
  <alf-card-actions style="justify-content: flex-end; gap: 0.5rem;">
    <alf-button [variant]="AlfColorVariantEnum.Light">Action</alf-button>
  </alf-card-actions>
</alf-card>
```

## 📐 Technical Rules for AI Generators (Mandatory)

1. **Subcomponent Inheritance**: Subcomponents (`CardTitle`, `CardBody`, `CardActions`, `CardImage`) automatically evaluate transparent backgrounds and inherit text colors based on the parent `<alf-card>` variant.
2. **Border Clipping**: Do not add manual border-radius inline styles to images inside `<alf-card-img>`; `border.ts` and `border.scss` handle `borderTopLeftRadius` and `borderTopRightRadius` dynamically.
3. **No Direct Style Overrides**: Avoid hardcoding static hex colors or overriding container layouts. Use `AlfColorEnum` or CSS variables linked to design tokens.
4. **Immutability & Access Modifiers**: Keep all component signals `readonly` and specify explicit access modifiers (`public`, `protected`, `private`).

## ⚡ Input API Reference

- `variant`: `input<AlfColorVariantEnum>` - Main chromatic variant (`primary`, `success`, `danger`, etc.).
- `elevated`: `input<boolean>` - Controls drop-shadow elevation (defaults to `true`).
- `disabled`: `input<boolean>` - Controls reactive disabled state.

---
*Technical reference for AI agent generators.*

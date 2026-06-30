# AI Usage Guide: AlfAutocomplete (Elite Composed)

This document describes how to implement and use the `AlfAutocompleteComponent` safely when generating code via AI assistants, following the project's technical rigor.

## 🏗️ Component Architecture & Composition

`AlfAutocompleteComponent` wraps an inner `<alf-input>` and renders a floating `<alf-auto-complete-panel>` dropdown when focused or typed into.

- **Component**: `alfcomponents/components/composed/alf-autocomplete/alf-autocomplete.ts`
- **Dropdown Panel**: `alfcomponents/components/composed/alf-autocomplete/al-auto-completef-panel/alf-auto-complete-panel.ts`
- **Signals**: Native Angular 22 Signals (`input`, `signal`, `computed`).

### Standard Implementation Example:
```html
<alf-autocomplete
  label="Select Country"
  [options]="countryOptions"
  [variant]="AlfColorVariantEnum.Primary"
  (optionSelected)="onCountrySelected($event)"
/>
```

## 📐 Technical Rules for AI Generators (Mandatory)

1. **Standalone Inputs Only**: Never pass a obsolete `[config]` object. Use direct signal inputs such as `[appearance]`, `[variant]`, `[clearable]`, and `[options]`.
2. **Options Interface**: Options passed to `[options]` MUST conform to `AlfSelectOption` (`{ label: string, value: any, icon?: string, group?: string }`).
3. **Immutability & Access Modifiers**: Keep component signals `readonly` and specify explicit access modifiers (`public`, `protected`, `private`).
4. **No Direct Style Overrides**: Avoid hardcoding static hex colors or overriding container layouts. Use `AlfColorEnum` or CSS variables linked to design tokens.

## ⚡ API Reference

- `options`: `input<AlfSelectOption[]>` - List of autocomplete items.
- `variant`: `input<AlfColorVariantEnum>` - Chromatic variant.
- `appearance`: `input<AlfInputAppearanceEnum>` - Visual input style (`standard` | `outline`).
- `clearable`: `input<boolean>` - Enables clear button.
- `optionSelected`: `output<AlfSelectOption>` - Emits selected item.

---
*Technical reference for AI agent generators.*

# AlfAutocomplete Component (Elite Composed)

`AlfAutocomplete` is a modular, flexible, and high-performance autocomplete select component designed for Angular 22. Fully integrated with the **Omni-Reactive** engine on top of native Signals architecture, ready for Zoneless applications.

## 🌟 Key Features

- **Native Signals Powered**: Uses Angular's reactive Signals (`input()`, `model()`, `signal()`, `computed()`) for ultra-fast Zoneless filtering.
- **Accent-Insensitive Filtering**: Automatic NFD string normalization so searching ignores diacritics and case.
- **Reactive Animated Dropdown**: Floating panel (`<alf-auto-complete-panel>`) synced with chromatic tokens and visual transitions of the chosen variant.
- **Full Variant Support**: Inherits same chromatic variants as `AlfInput` (Solid, Outline, Ghost, Soft, Crystal, 3D, Gradient).

## 🚀 Usage Examples

### Basic Autocomplete
```html
<alf-autocomplete
  label="Select a country"
  [options]="countries"
  [variant]="AlfColorVariantEnum.Primary"
/>
```

### Autocomplete with Clear Button and Custom Appearance
```html
<alf-autocomplete
  label="Search clients"
  [options]="clientOptions"
  [clearable]="true"
  [appearance]="AlfInputAppearanceEnum.Outline"
  [variant]="AlfColorVariantEnum.Success"
  (optionSelected)="handleClientSelect($event)"
/>
```

## 📋 API Reference (`<alf-autocomplete>`)

| Property | Type | Description |
|---|---|---|
| `options` | `input<AlfSelectOption[]>` | List of selectable options (`label`, `value`, `icon`, `group`). |
| `variant` | `AlfColorVariantEnum \| string` | Thematic color variant for both field and dropdown panel. |
| `appearance` | `AlfInputAppearanceEnum` | Visual appearance style (`standard` or `outline`). |
| `label` | `input<string>` | Floating or descriptive field label. |
| `placeholder` | `input<string>` | Interior placeholder text. |
| `clearable` | `input<boolean>` | Enables clear button to reset selection. |
| `disabled` | `input<boolean>` | Reactive disabled state. |
| `isLoading` | `input<boolean>` | Shows loading spinner state. |

## 🔔 Events (*Outputs*)

| Event | Type | Description |
|---|---|---|
| `optionSelected` | `output<AlfSelectOption>` | Emits selected option when picked by user. |

---
Part of the **Alfonizer Design System** ecosystem.

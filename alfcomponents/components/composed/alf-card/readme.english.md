# AlfCard Component (Elite Composed)

`AlfCard` is a modular, flexible, and high-performance card component designed for Angular 22. Fully integrated with the **Omni-Reactive** engine on top of native Signals architecture, ready for Zoneless applications.

## 🌟 Key Features

- **Native Signals Powered**: Uses Angular's reactive Signals (`input()`, `model()`, `computed()`) for ultra-fast rendering and change detection.
- **Modular Subcomponents**: Cleanly structure your cards using `<alf-card-img>`, `<alf-card-title>`, `<alf-card-body>`, `<alf-card-actions>`, `<alf-card-header>`, and `<alf-card-footer>`.
- **Omni-Reactive Engine Integration**: The root container manages variant background and elevation shadows, while subcomponents dynamically inherit transparent text colors intelligently.
- **Automatic Image Fitting**: The `<alf-card-img>` subcomponent automatically inherits top border radii (`borderTopLeftRadius` and `borderTopRightRadius`) configured in `border.ts` for smooth and seamless clipping.

## 🧱 Subcomponent Structure

The card is composed of the following combinable child tags:
- `<alf-card>` (Root container with variant and elevation)
- `<alf-card-img>` (Header image banner with automatic border clipping)
- `<alf-card-title>` (Formatted centered heading)
- `<alf-card-body>` (Description text or main content body)
- `<alf-card-actions>` (Footer action container for buttons or links)

## 🚀 Usage Examples

### Standard Card with Action Buttons
```html
<alf-card>
  <alf-card-img src="/assets/landscape.jpg" alt="Cover Photo" />
  <alf-card-title>Minimalist Product Edition</alf-card-title>
  <alf-card-body>
    Crafted with high quality organic materials. Designed for maximum comfort and durability.
  </alf-card-body>
  <alf-card-actions style="justify-content: space-between; align-items: center;">
    <span style="font-size: 1.25rem; font-weight: 800;">$49.00</span>
    <alf-button [variant]="AlfColorVariantEnum.Primary">Add to Cart</alf-button>
  </alf-card-actions>
</alf-card>
```

### Thematic Chromatic Variant (e.g. Success)
```html
<alf-card [variant]="AlfColorVariantEnum.Success" [elevated]="true">
  <alf-card-title>Operation Successful</alf-card-title>
  <alf-card-body>
    Data has been successfully synchronized with the central server.
  </alf-card-body>
  <alf-card-actions style="justify-content: flex-end;">
    <alf-button [variant]="AlfColorVariantEnum.Light">Accept</alf-button>
  </alf-card-actions>
</alf-card>
```

## 📋 API Reference (`<alf-card>`)

| Property | Type | Description |
|---|---|---|
| `variant` | `AlfColorVariantEnum \| string` | Thematic color variant of the card. |
| `elevated` | `boolean` | Adds soft elevation drop-shadow to the card (defaults to `true`). |
| `id` | `input<string>` | Optional unique identifier. |
| `helperText` | `input<string>` | Helper or accessibility text. |
| `disabled` | `input<boolean>` | Reactive disabled state for the card and its subcomponents. |

---
Part of the **Alfonizer Design System** ecosystem.

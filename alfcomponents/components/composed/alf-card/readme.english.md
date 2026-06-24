# AlfCard Component

`AlfCard` is a highly flexible, modern, and visually premium card component for Angular 18+ built on the new **Signals** architecture. It integrates with the Élite visual theme engine, automatically applying borders, padding, shadows, glassmorphism, or gradients depending on the selected variant.

## Features
- **Signals Powered**: Uses Angular's reactive Signals (`input()`, `computed()`) for high-performance rendering.
- **Modular Subcomponents**: Structure cards using `<alf-card-img>`, `<alf-card-title>`, `<alf-card-body>`, and `<alf-card-actions>`.
- **Predefined Premium Themes**: Supports various variant paradigms including Solid, Outline, Soft, Ghost, Crystal (Glassmorphism), 3D Depth, and Gradients.
- **Responsive & Interactive**: Responds beautifully to focus, hover, active, and disabled states.

## Installation / Structure
The card relies on the following subcomponents:
- `alf-card` (Root container)
- `alf-card-img` (Header banner image wrapper)
- `alf-card-title` (Centered bold title heading)
- `alf-card-body` (Main text content body)
- `alf-card-actions` (Footer action container)

## Usage Example

### Basic Solid Card
```html
<alf-card variant="primary">
  <alf-card-img src="/assets/landscape.png" alt="Header Image" />
  <alf-card-title>Beautiful Destination</alf-card-title>
  <alf-card-body>
    Enjoy a wonderful journey to some of the most premium and visually stunning destinations.
  </alf-card-body>
  <alf-card-actions>
    <button style="background: transparent; border: none; font-weight: 600; cursor: pointer; color: inherit;">Read More</button>
  </alf-card-actions>
</alf-card>
```

### Crystal (Glassmorphism) Variant
```html
<alf-card variant="crystal-primary" [elevated]="true">
  <alf-card-title>Glassmorphism Effect</alf-card-title>
  <alf-card-body>
    Renders with a sleek background blur and translucent borders.
  </alf-card-body>
</alf-card>
```

## API Reference

### `<alf-card>` Inputs
- `config` (`AlfCardConfigInterface`): A master configuration object combining all attributes.
- `variant` (`AlfColorVariantEnum | string`): The thematic color variant of the card.
- `elevated` (`boolean`): Adds a soft, premium drop-shadow to the card (defaults to `true`).
- `helperText` (`string`): Helper or accessibility label text.
- `disabled` (`boolean`): Toggles the card's disabled state visual style.

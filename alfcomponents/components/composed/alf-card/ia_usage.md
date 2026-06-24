# AlfCard AI Usage Guidelines

This document outlines how AI assistants should implement, configure, and style the `AlfCard` component and its subcomponents.

## 1. Architecture & Subcomponents (Angular 18+)
`AlfCard` is composed of multiple subcomponents, allowing modular layouts. Always use them in their respective structural order:

- `<alf-card>`: The root container.
- `<alf-card-img>`: Displays a top card banner or image (optional).
- `<alf-card-title>`: Renders the card's heading, styled and centered automatically (optional).
- `<alf-card-body>`: Contains the main descriptive text or content (optional).
- `<alf-card-actions>`: Wraps footer actions (buttons, icons, or links) (optional).

### Standard Layout Example:
```html
<alf-card variant="primary">
  <alf-card-img src="/image.png" alt="Card Header Image" />
  <alf-card-title>Card Heading</alf-card-title>
  <alf-card-body>
    This is the description or main body of the card component.
  </alf-card-body>
  <alf-card-actions>
    <button style="background: transparent; border: none; font-weight: 600; cursor: pointer; color: inherit;">Action 1</button>
  </alf-card-actions>
</alf-card>
```

## 2. Configuration & Input Bindings
- **Direct Input**: You can pass `[variant]`, `[elevated]`, and `[helperText]` directly to `<alf-card>`.
- **Master Config**: Alternatively, pass an `AlfCardConfigInterface` object using `[config]`:
  ```html
  <alf-card [config]="cardConfig()"></alf-card>
  ```

## 3. Stylistic Guidelines (Élite visual system)
- **Do not write static layout properties** (like `display`, `width`, `gap`, `padding` etc.) directly in SCSS when adding custom styles to these components. 
- All layout properties must be set using the Élite visual CSS variables so that they are correctly merged, handled, and inherited through all states (default, hover, active, focus, disabled).
  - *Example in actions SCSS:*
    ```scss
    .my-custom-actions {
      --alf-card-actions-layout-display: flex;
      --alf-card-actions-layout-gap: 1rem;
      @include alf-display-and-layout-style('--alf-card-actions', ...);
    }
    ```

## 4. Variants
The card styling engine automatically maps colors, typography, borders, shadows, and glassmorphism. Supported `variant` styles:
- **Solid**: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`.
- **Outline**: `outline-primary`, `outline-secondary`, etc.
- **Ghost**: `ghost-primary`, `ghost-secondary`, etc.
- **Soft**: `soft-primary`, `soft-secondary`, etc.
- **Crystal (Glassmorphism)**: `crystal-primary`, `crystal-secondary`, etc.
- **3D Depth**: `depth-primary`, `depth-secondary`, etc.
- **Gradient**: `gradient-primary`, `gradient-purple`, `gradient-sunset`, etc.

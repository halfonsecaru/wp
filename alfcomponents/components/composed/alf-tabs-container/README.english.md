# AlfTabsContainer (Elite Standard)

`AlfTabsContainer` is an advanced navigation component designed for Angular 21. It provides a fluid user experience with automatic height transitions, touch gesture support, and multiple predefined visual styles.

## Key Features

- **Elite Architecture**: 100% Signal-based and Zoneless Ready.
- **Fluid Transitions**: Cross-fade tab switching with smooth height adjustment.
- **Visual Variants**: Native support for `Outline`, `Solid` (Soft), and `Crystal` (Glassmorphism) styles.
- **Touch Navigation**: Built-in support for swipe gestures on mobile devices.
- **Smart Scroll**: Horizontal scroll header with automatic navigation arrows when content exceeds width.

## Basic Usage

```html
<alf-tabs-container variant="OutlinePrimary">
  <alf-tab label="General" iconLeft="⚙️">
    <div class="p-4">General tab content</div>
  </alf-tab>
  <alf-tab label="Security" iconLeft="🔒">
    <div class="p-4">Security tab content</div>
  </alf-tab>
</alf-tabs-container>
```

## Attributes and Configuration

### AlfTabsContainer
- `variant`: Predefined visual style. Examples: `OutlinePrimary`, `SolidSuccess`, `CrystalInfo`, `OutlineDark`.
- `fluid`: (boolean) Enables/disables smooth height transitions (default: `false`).
- `activeIndex`: (model) Index of the active tab (supports two-way binding).

### AlfTab
- `label`: Text to display in the navigation button.
- `iconLeft` / `iconRight`: Optional icons for the tab.

## Visual Styles

- **Outline**: Variant-colored border and text, transparent background.
- **Solid**: Soft (pastel) background with high-contrast text.
- **Crystal**: Frosted glass effect using background blur (`backdrop-filter`).

## Technical Notes
This component utilizes the WAAPI animation engine for the slider and Animate.css for content transitions, ensuring optimal performance without blocking the main thread.

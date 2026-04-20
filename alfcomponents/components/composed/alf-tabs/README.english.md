# AlfTabs - User Documentation

The `AlfTabs` component is an Élite orchestrator designed to manage tab navigation with maximum performance and a fluid user experience. It supports animated transitions, keyboard navigation, touch gestures, and a sliding "Master Indicator" system.

## Tri-Component Architecture

For maximum flexibility, the system is divided into three pieces:
1.  **alf-tabs**: The main container that coordinates state and animation.
2.  **alf-tab**: The header (button) for each tab.
3.  **alf-tab-content**: The panel containing the information to be displayed.

## Usage Modes

### 1. Content Projection (Highly Flexible)
This is the recommended mode. It allows full control over the content and its structure.

```html
<alf-tabs [(activeIndex)]="myActiveTab">
  <!-- Headers -->
  <alf-tab [index]="0" [defineComponent]="{ label: 'General', prefix: '⚙️' }"></alf-tab>
  <alf-tab [index]="1" [defineComponent]="{ label: 'Profile', prefix: '👤' }"></alf-tab>

  <!-- Panels -->
  <alf-tab-content [index]="0">
    <h3>General Settings</h3>
    <p>Tab 1 content...</p>
  </alf-tab-content>

  <alf-tab-content [index]="1" [lazy]="true">
    <h3>User Profile</h3>
    <p>Lazily loaded content...</p>
  </alf-tab-content>
</alf-tabs>
```

### 2. Dynamic Configuration (Factory Pattern)
You can use predefined configurations to instantly apply complex styles and behaviors.

```html
<alf-tabs [predefined]="'sidebar'" [(activeIndex)]="activeTab">
  <!-- Panels still require projection -->
  <alf-tab-content [index]="0">Dashboard</alf-tab-content>
  <alf-tab-content [index]="1">Reports</alf-tab-content>
</alf-tabs>
```

## Élite Features

- **Master Mode**: A sliding indicator that smoothly adapts to the size of the active header.
- **Smart Scroll**: If tabs overflow the container, automatic navigation arrows appear, showing only if there is content to scroll towards.
- **Keyboard Navigation**: Full support for `ArrowLeft`, `ArrowRight`, `Home`, and `End`.
- **Touch Gestures**: Native support for tab switching via swipe on mobile devices.
- **Zoneless Ready**: Implemented with Angular 21 Signals for optimal performance without Zone.js.

## API Reference

### Inputs
- `activeIndex`: (Model) Index of the active tab (supports bi-directional binding).
- `position`: (AlfTabsPositionEnum) Position of the headers [Top, Bottom, Left, Right].
- `predefined`: (AlfTabsInterface | string) Preset configuration.

### Outputs
- `tabChange`: Emitted when the tab index changes (useful for auditing or data loading).

---

Developed with ❤️ for the Alfonizer ecosystem.

# AI Usage Guide: AlfTabs (Composed Component)

This document provides instructions for other AI models on how to implement and interact with the `AlfTabs` component ecosystem.

## Component Architecture
`AlfTabs` follows a tri-component architecture:
1.  **AlfTabs**: The coordinator. Handles `activeIndex` (model), scroll arrows, and swipe gestures.
2.  **AlfTab**: The header button. Uses `AlfButton` internally.
3.  **AlfTabContent**: The visibility-controlled content panel.

## Usage Patterns

### A. Projected Content (Recommended for full control)
```html
<alf-tabs [(activeIndex)]="activeTab">
  <!-- Headers -->
  <alf-tab [index]="0" [config]="{ label: 'General', prefix: '⚙️' }"></alf-tab>
  <alf-tab [index]="1" [config]="{ label: 'Security', prefix: '🔒' }"></alf-tab>

  <!-- Panels -->
  <alf-tab-content [index]="0">
    <h3>General Settings</h3>
    <!-- Your content -->
  </alf-tab-content>

  <alf-tab-content [index]="1" [lazy]="true">
    <h3>Security Configuration</h3>
    <!-- Your content -->
  </alf-tab-content>
</alf-tabs>
```

### B. Configuration-Driven (via DNA/Predefined)
```html
<alf-tabs [predefined]="'sidebar'" [(activeIndex)]="currentTab">
  <!-- Content still needs to be projected with indices -->
  <alf-tab-content [index]="0">Content A</alf-tab-content>
  <alf-tab-content [index]="1">Content B</alf-tab-content>
</alf-tabs>
```

## Critical Technical Rules
- **Indexing**: All children (`alf-tab` and `alf-tab-content`) MUST receive a numerical `[index]` to synchronize correctly.
- **Bi-directional Binding**: Always use `[(activeIndex)]` to ensure your state stays in sync with user interactions (clicks, keyboard, swipe).
- **Styling**: Do not apply width/height directly to `alf-tab-content` inner container unless overriding. Use the `AlfTabContentInterface` for granular style configuration.
- **Gestures**: Swipe is enabled by default. To disable it, use `[config]="{ behavior: { enableSwipe: false } }"`.

# AI Usage Guide: AlfTabs (Élite Master)

This document provides instructions for other AI models on how to implement and interact with the `AlfTabs` component ecosystem following the Élite standards.

## Component Architecture
`AlfTabs` follows a tri-component architecture:
1.  **AlfTabs**: The coordinator. Uses **Zoneless Signal architecture**.
2.  **AlfTab**: The header. Uses **native buttons** for maximum performance and CSS control.
3.  **AlfTabContent**: The visibility-controlled content panel.

## Usage Patterns

### A. Projected Content (Fully Reactive)
```html
<alf-tabs [(activeIndex)]="activeTab">
  <!-- Headers -->
  <alf-tab [index]="0" [defineComponent]="{ label: 'General' }"></alf-tab>
  <alf-tab [index]="1" [defineComponent]="{ label: 'Security' }"></alf-tab>

  <!-- Panels -->
  <alf-tab-content [index]="0">Content 1</alf-tab-content>
  <alf-tab-content [index]="1">Content 2</alf-tab-content>
</alf-tabs>
```

## Élite Technical Requirements (Mandatory for AI)
1. **Directives**: DO NOT use `[ngStyle]`, `[ngClass]` or `ngTemplateOutlet`.
2. **Portals**: For dynamic template rendering, use the `[alfPortal]` directive provided in the package:
   ```html
   <ng-container [alfPortal]="tab.contentTemplate()"></ng-container>
   ```
3. **Signals**: Interact only with `readonly` signals and `model()` for state. All interactions should be zoneless-ready.
4. **Lifecycle**: All methods are implemented as **Arrow Functions**; ensure this pattern is followed for any extension or override.
5. **Aesthetics**: Always check `indicatorColorComputed()` if you need to align sub-components with the current brand theme.
6. **Accessibility**: The component handles ARIA live regions via `liveMessageComputed`. Ensure labels are provided for proper readout.

# AlfButton - Elite Button Component

High-performance standalone button component designed for Angular 21. It implements the **Elite Visual Engine**, with full design centralization in TypeScript, polymorphic support (button/anchor), and a dynamic theme system powered by CSS variables.

## Key Features

- **Polymorphic Rendering**: Automatically switches between `<button>` and `<a>` based on the `link` input configuration.
- **Elite Visual Engine**: All visual logic (Solid, Outline, Soft, Ghost, etc.) is centralized in `defaultVariants.ts`.
- **Dynamic Theming**: Utilizes `AlfColorEnum` with CSS variables and fallbacks for instantaneous, flicker-free theme switching.
- **Smart Identity Inheritance**: Decorative variants (e.g., `PrimaryOutline`) automatically inherit the chromatic DNA from their base family (`Primary`).
- **Double-Click Protection**: Implements a reactive `debounceTime` system to prevent multiple executions on critical actions.
- **Zoneless Ready**: Optimized for Angular architectures without Zone.js.

## Basic Usage

```html
<alf-button
  [inputConfig]="saveButtonConfig"
  (onClick)="handleSave($event)">
</alf-button>
```

```typescript
import { getAlfButtonDefaultConfig } from '@alfcomponents/components/simple/alf-button/predefined/alf-button.predefined';
import { AlfColorVariantEnum } from '@alfcomponents/enums';

// Get the predefined configuration from the design system
saveButtonConfig = getAlfButtonDefaultConfig(AlfColorVariantEnum.Primary);
```

## Component API

### Main Inputs

| Input | Type | Description |
|---|---|---|
| `inputConfig` | `AlfButtonInterface` | Comprehensive button configuration object. |
| `type` | `AlfButtonTypeEnum` | Button HTML type (`button`, `submit`, `reset`). |
| `label` | `string` | Visible button text (overrides i18n). |
| `iconLeft` | `AlfIconsUnicodeIconEnum` | Icon placed to the left of the text. |
| `iconRight` | `AlfIconsUnicodeIconEnum` | Icon placed to the right of the text. |
| `link` | `AlfLinkInterface` | Link configuration (converts the button to an `<a>`). |
| `debounceTime` | `number` | Wait time in ms to filter repeated clicks. |

### Visual Configuration (Inherited)

| Property | Description |
|---|---|
| `colorVariant` | Base color variant (Primary, Success, etc.). |
| `visualType` | Visual style (Solid, Outline, Ghost, Soft, Crystal, 3D, Gradient). |
| `disabled` | Component interaction state. |
| `ripple` | Click ripple effect configuration. |
| `animations` | Entrance/exit animations (Animate.css). |

## Styling Architecture

The component uses a dual strategy:
1. **SCSS**: Defines layout structure, gap, and static behaviors.
2. **TypeScript (Engine)**: Injects dynamic styles (colors, shadows, typography) based on the selected variant, ensuring design logic stays within the code.

## i18n and Translations

The component supports native internationalization for common labels. Translations are located in `i18n/alf-button.i18n.ts`. When using `getAlfButtonDefaultConfig`, the system attempts to resolve the appropriate label based on the configured language.

---
Part of the **Alfonizer Design System** ecosystem.

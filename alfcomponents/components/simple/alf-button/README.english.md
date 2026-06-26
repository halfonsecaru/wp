# AlfButton - Elite Button Component

High-performance standalone button component designed for Angular 22. It implements the **Elite Visual Engine**, with full design centralization in TypeScript, polymorphic support (button/anchor), and a dynamic theme system powered by CSS variables.

## Key Features

- **Polymorphic Rendering**: Automatically switches between `<button>` and `<a>` based on the `link` input.
- **Elite Visual Engine**: All visual logic (Solid, Outline, Soft, Ghost, etc.) is resolved reactively via the base class.
- **Dynamic Theming**: Utilizes `AlfColorEnum` with CSS variables and fallbacks for instantaneous, flicker-free theme switching.
- **Atomic Inputs**: Slices configuration into dedicated reactive inputs (no monolithic config object).
- **Double-Click Protection**: Implements a reactive `debounceTime` system to prevent multiple executions on critical actions.
- **Zoneless Ready**: Optimized for Angular architectures without Zone.js.

## Basic Usage

```html
<alf-button
  [id]="'btn-save'"
  [variant]="AlfColorVariantEnum.Primary"
  [label]="'Save Changes'"
  (onClick)="handleSave($event)">
</alf-button>
```

```typescript
import { AlfColorVariantEnum } from '@alfcomponents/enums';
```

## Component API

### Main Inputs

| Input | Type | Description |
|---|---|---|
| `type` | `AlfButtonTypeEnum` | Button HTML type (`button`, `submit`, `reset`). |
| `label` | `string` | Visible button text (overrides i18n). |
| `iconLeft` | `string \| AlfIconsUnicodeIconEnum` | Icon placed to the left of the text. |
| `iconRight` | `string \| AlfIconsUnicodeIconEnum` | Icon placed to the right of the text. |
| `link` | `ButtonLink` | Link configuration (converts the button to an `<a>`). |
| `debounceTime` | `number` | Wait time in ms to filter repeated clicks. |

### Visual Configuration (Inherited from `AlfBaseDirectives`)

| Property | Description |
|---|---|
| `variant` | Color and visual variant style (Primary, Success, SuccessSoft, PrimaryOutline, etc.). |
| `disabled` | Component interaction state. |
| `ripple` | Click ripple effect configuration. |
| `animations` | Entrance/exit animations (Animate.css). |

## Styling Architecture

The component uses a dual strategy:
1. **SCSS**: Defines layout structure, gap, and static behaviors.
2. **TypeScript (Engine)**: Injects dynamic styles (colors, shadows, typography) based on the selected variant, ensuring design logic stays within the code.

## i18n and Translations

The component supports native internationalization for common labels. Translations are located in `i18n/alf-button.i18n.ts`.

---
Part of the **Alfonizer Design System** ecosystem.

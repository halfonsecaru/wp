# AlfButton - Elite UI Component

High-performance button component designed for the AlfComponents ecosystem. Powered by the Elite CSS Variable Engine, this component combines polymorphism, full reactivity with Signals, and a premium adaptable aesthetic.

## Main Features

- **Native Polymorphism**: Automatically transforms from <button> to <a> if a URL is detected.
- **Elite Style Engine**: Full control via CSS variables for states (Default, Hover, Active, Focus, Disabled).
- **Data Protection**: Configurable debounce to prevent multiple accidental clicks.
- **Advanced Accessibility**: Intelligent focus management (Smart Blur), dynamic ARIA labels, and aria-busy states.
- **Adaptive Loading**: Spinner that scales proportionally to the button size.
- **Integrated Tooltip**: Built-in host directive for immediate information labels.
- **Geek Mode**: Predefined definitions inspired by pop culture (Jedi, Matrix, Cyber).

## Basic Usage

```typescript
import { AlfButton } from '@alfcomponents/components';

// In your template
<alf-button 
  label="Send" 
  variant="primary" 
  (onClick)="handleSave()">
</alf-button>
```

## API Reference

### Inputs

| Property | Type | Description |
|-----------|------|-------------|
| `label` | `string` | Button text (supports automatic i18n). |
| `predefined` | `DefaultButtonKeys | string` | Predefined configuration identifier (Accept, Cancel, Jedi...). |
| `visualType` | `AlfButtonVisualTypeEnum` | Visual style: `Solid`, `Outlined`, `Text`, `Ghost`, `ThreeD`, `Glossy`, etc. |
| `loading` | `AlfLoadingInterface` | Controls loading state and spinner. |
| `tooltip` | `string | AlfTooltipConfig` | Floating tooltip configuration. |
| `debounceTime` | `number` | Time in ms to ignore repeated clicks (default 0). |
| `link` | `{ url: string, target?: string }` | If provided, component renders as an <a> link. |

### Outputs

| Event | Type | Description |
|--------|------|-------------|
| `onClick` | `output<MouseEvent>` | Emitted on click (async/reactive). |
| `onHoverEnter` | `output<MouseEvent>` | Emitted when pointer enters. |

## Pro Configurations (Geek Mode)

The button includes preconfigured variants you can use via the `predefined` input:

- `DefaultButtonKeys.Accept`: Success green with check icon.
- `DefaultButtonKeys.Cyber`: Neon aesthetic with sharp edges.
- `DefaultButtonKeys.Matrix`: Monospaced font and digital shadows.
- `DefaultButtonKeys.Jedi`: Lightsaber glow effect.

---
*Part of the Alfonizer Design System.*

# AI Usage Guide: AlfButton Component

This document details how to interact with, extend, and configure the AlfButton component from the perspective of an AI assistant.

## Core Architecture (Elite CSS Engine)

The component inherits from AlfBaseComponent. DO NOT attempt to apply manual CSS styles using external classes if it can be avoided. The component uses a JS object to CSS variable mapping engine.

### Data Flow
1.  **Resolved Identity**: The predefined object is combined with individual @Inputs.
2.  **Style Resolver**: The resulting object is processed and injected into the host as variables of the type --alf-btn-* or --alf-txt-*.

## How to Create a New Predefined Button

If you need to create a new variant (e.g., "SpaceX Mode"), DO NOT modify the AlfButton component itself. You must follow the library's Factory Pattern:

1.  **Add the Key**: In alfcomponents/components/alf-button/enums/defaultButtonKeys.interface.ts.
2.  **Add the Configuration**: In alfcomponents/components/alf-button/predefined/alf-button.predefined.ts, inside the getAlfPredefinedButton function.

Example of an "Elite" configuration:
```typescript
case 'SPACEX':
  return mergeDeep(base, {
    label: 'Launch',
    variant: AlfColorVariantEnum.Dark,
    typography: { 
      default: { family: AlfFontFamilyEnum.System, weight: '900' } 
    },
    backgrounds: {
      default: { color: AlfColorEnum.Black },
      hover: { color: AlfColorEnum.Gray900 }
    },
    transform: { hover: { scale: 1.05 } },
    iconRight: AlfIconsUnicodeIconEnum.Rocket
  });
```

## Accessibility and Behavior Logic

### Smart Blur & Focus
The component detects whether the click is mechanical (mouse) or logical (keyboard). 
- If you use the event.detail > 0 property (real click), the button will automatically blur() to clear the visual focus.
- For tests, if you want to simulate focus loss, dispatch a MouseEvent with detail: 1.

### Debounce
To prevent double submits in heavy processes, use the debounceTime input (e.g., 300). The component internally manages lastClickTime using Date.now().

## Loading States
The loading object (AlfLoadingInterface) controls visibility.
- When loading, the original content is hidden with visibility: hidden (to reserve space) and an AlfSpinner is shown.
- The spinner automatically scales its size by consulting the sizeComputed() signal.

## Tooltip Host Integration
The button uses Host Directives. To configure the tooltip from code:
1.  Inject the instance or pass the object through the tooltip input.
2.  The AI must know that tooltip accepts a string or an AlfTooltipConfig object.

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

### Inputs (Properties)

| Property | Type | Description |
|-----------|------|-------------|
| `label` | `string` | Button text (supports automatic i18n). |
| `predefined` | `DefaultButtonKeys | string` | Predefined configuration identifier (Accept, Cancel, Jedi...). |
| `visualType` | `AlfButtonVisualTypeEnum` | Visual style: `Solid`, `Outlined`, `Text`, `Ghost`, `ThreeD`, `Glossy`, etc. |
| `loading` | `AlfLoadingInterface` | Controls loading state and spinner. |
| `tooltip` | `string | AlfTooltipConfig` | Floating tooltip configuration. |
| `debounceTime` | `number` | Time in ms to ignore repeated clicks (default 0). |
| `link` | `{ url: string, target?: string }` | If provided, component renders a link <a>. |

### Outputs (Events)

| Event | Type | Description |
|--------|------|-------------|
| `onClick` | `output<MouseEvent>` | Emitted on click (async/reactive). |
| `onHoverEnter` | `output<MouseEvent>` | Emitted when pointer enters. |

## Pro Configurations (Geek Mode)

The button includes preconfigured variants you can use via the predefined input:

- `DefaultButtonKeys.Accept`: Success green with check icon.
- `DefaultButtonKeys.Cyber`: Neon aesthetic with straight borders.
- `DefaultButtonKeys.Matrix`: Monospaced font and digital shadows.
- `DefaultButtonKeys.Jedi`: Lightsaber glow effect.

## Critical Rules for AI
- **Imports**: Use the @alfcomponents/... aliases to avoid circular dependencies through index.ts if you are inside the button's own folder.
- **I18n**: The label tags are automatically resolved against alf-button.i18n.ts. Do not translate manually in the controller.
- **Signals**: Always use .set() in input setters to keep JIT reactivity balanced with Vitest.

---
*Technical Reference Document for Cognitive Agents.*

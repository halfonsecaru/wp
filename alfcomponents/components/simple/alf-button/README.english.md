# AlfButtons - Button Component (New)

Standalone button component for AlfComponents with CSS-variable driven visuals, link/button polymorphism, reactive outputs, and click debounce.

## Main features

- Polymorphic render: `<button>` by default and `<a>` when `link` is provided.
- Centralized visual engine: presets resolved by `visualType` and `colorVariant`.
- `Light` variant adjusted to keep text color consistent on hover/active.
- Reactive outputs: `onClick`, `onHoverEnter`, `onHoverLeave`.
- Double-click protection with `debounceTime`.
- Tooltip and ripple integration via directives.
- i18n support for predefined buttons through `getAlfPredefinedButton(...)`.

## Basic usage

```html
<alf-buttons
  [inputConfig]="saveButton"
  tooltip="Save changes"
  (onClick)="handleSave($event)">
</alf-buttons>
```

```ts
import { getAlfPredefinedButton } from '@alfcomponents/components/simple/alf-buttons/alf-button-predefined';
import { DefaultButtonKeys } from '@alfcomponents/components/simple/alf-buttons/enums/defaultButtonKeys.interface';

saveButton = getAlfPredefinedButton(DefaultButtonKeys.Accept, { lang: 'en' });
```

## Full API

Property resolution priority: direct input > `inputConfig` > internal default.

### Button-specific inputs

| Input | Type | Description |
|---|---|---|
| `inputConfig` | `AlfButtonInterface` | Full button configuration as a single object. |
| `type` | `AlfButtonTypeEnum` | HTML button type (`button`, `submit`, etc.). |
| `label` | `string` | Visible button label. |
| `iconLeft` | `AlfIconsUnicodeIconEnum` | Left icon. |
| `iconRight` | `AlfIconsUnicodeIconEnum` | Right icon. |
| `link` | `{ url: string; target?: AlfLinkTargetEnum }` | If provided, renders `<a>` instead of `<button>`. |
| `debounceTime` | `number` | Threshold in ms to ignore repeated clicks. |

### Inherited base inputs

| Input | Type | Description |
|---|---|---|
| `tooltip` | `string \| AlfTooltipConfig` | Host tooltip configuration. |
| `ripple` | `boolean \| AlfRippleInterface` | Enables/disables ripple or provides ripple config. |
| `colorVariant` | `AlfColorVariantEnum` | Base color variant. |
| `visualType` | `AlfButtonVisualTypeEnum` | Visual kind (`Solid`, `Outlined`, `Text`, etc.). |
| `predefined` | `AlfVisualPredefinedEnum` | Design-system visual preset. |
| `cursor` | `AlfCursorEnum` | Host cursor style. |
| `disabled` | `boolean` | Disabled state. |
| `aria` | `AlfAriaBaseInterface` | ARIA configuration object. |
| `animations` | `AlfAnimateCssInterface` | Enter/exit animation configuration. |
| `backgrounds` | `AlfBackgroundsInterface` | Per-state background overrides. |
| `border` | `AlfBorderInterface` | Per-state border overrides. |
| `displayAndLayout` | `AlfDisplayAndLayoutInterface` | Display, alignment, gap, and layout overrides. |
| `margin` | `AlfMarginInterface` | Per-state margin overrides. |
| `outline` | `AlfOutlineInterface` | Per-state outline overrides. |
| `padding` | `AlfPaddingInterface` | Per-state padding overrides. |
| `shadows` | `AlfShadowsInterface` | Per-state shadow overrides. |
| `textStyle` | `AlfTextStyleInterface` | Per-state text style overrides. |
| `transform` | `AlfTransformInterface` | Per-state transform overrides. |
| `typography` | `AlfTypographyInterface` | Per-state typography overrides. |

### Outputs

| Output | Type | Description |
|---|---|---|
| `onClick` | `output<MouseEvent>` | Emitted on click after debounce validation. |
| `onHoverEnter` | `output<MouseEvent>` | Emitted on `mouseenter`. |
| `onHoverLeave` | `output<MouseEvent>` | Emitted on `mouseleave`. |

### Real default values

| Property | Real default | Source |
|---|---|---|
| `debounceTime` | `0` | `alf-buttons.ts` (`input<number>(0)`) |
| `type` | `AlfButtonTypeEnum.Button` | `base-button-configuration.ts` (`typeComputed`) |
| `label` | `'Boton'` | `base-button-configuration.ts` (`labelComputed`) |
| `link` | `undefined` | `base-button-configuration.ts` (`linkComputed`) |
| `ripple` | `true` | `alf-base-configuration.ts` (`rippleInputComputed`) |
| `colorVariant` | `AlfColorVariantEnum.Default` | `alf-base-configuration.ts` (`colorVariantComputed`) |
| `cursor` | `AlfCursorEnum.Pointer` | `alf-base-configuration.ts` (`cursorComputed`) |
| `disabled` | `false` | `alf-base-configuration.ts` (`disabledComputed`) |
| `tooltip` | `undefined` | `alf-base-configuration.ts` (`tooltipComputed`) |
| `predefined` | `undefined` | `alf-base-configuration.ts` (`predefinedComputed`) |
| `visualType` | `undefined` | `alf-base-configuration.ts` (`visualTypeComputed`) |
| `aria` | `undefined` | `alf-base-configuration.ts` (`ariaComputed`) |
| `animations` | `undefined` | `alf-base-configuration.ts` (`animationsComputed`) |
| `backgrounds`, `border`, `displayAndLayout`, `margin`, `outline`, `padding`, `shadows`, `textStyle`, `transform`, `typography` | `undefined` | `alf-base-configuration.ts` (override computeds) |

Practical notes:
- If `visualType` and `predefined` are `undefined`, the effective visual style resolves to `Solid`.
- If `link` is `undefined`, the effective render is `<button>`.

## Supported visual types

- `Solid`
- `Outlined`
- `Text`
- `Ghost`
- `Soft`
- `Crystal`
- `ThreeD`
- `Glossy`
- `Gradient`
- `Raised`

## i18n notes

- Predefined label i18n lives in `i18n/alf-button.i18n.ts`.
- Use `getAlfPredefinedButton(...)` to get translated labels.
- If you set `label` manually in `inputConfig`, that manual text takes precedence.

---
Part of the Alfonizer Design System.

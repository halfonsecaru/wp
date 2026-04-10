# alf-button

Highly customizable, accessible button component based on Angular Signals (Angular 21).

## 📋 API Reference

### Inputs

Direct input properties via Angular Signals:

| Name | Type | Default | Description |
|---|---|---|---|
| `config` | `AlfButtonInterface` | `Theme 'ACCEPT'` | Reactive master configuration (styles, props, behavior). |

### Events (@Output)

| Name | Type | Description |
|---|---|---|
| `clicked` | `MouseEvent` | Emitted when the button is clicked. |

---

## 🛠️ AlfButtonInterface (Full Structure)

This interface extends the library's global hierarchy. Below is a breakdown of **all** available properties, including inherited ones.

### 1. Button Specific Properties
| Property | Type | Description |
|---|---|---|
| `type` | `AlfButtonTypeEnum` | HTML Type: `Button`, `Submit`, `Reset`. |
| `id` | `number` | Unique ID for form identification or tracking. |
| `link` | `{ url: string; target?: AlfLinkTargetEnum }` | Configuration to render as a link. |

### 2. Base Behavior (AlfBaseComponentInterface)
| Property | Type | Description |
|---|---|---|
| `variant` | `AlfColorVariantEnum` | Predefined color theme (Primary, Success, Danger, Ghost, Soft, etc.). |
| `size` | `AlfFontSizeEnum` | Button size (Xs, Sm, Base, Lg, Xl, etc.). |
| `disabled` | `boolean \| Signal` | Disables the button via configuration. |
| `loading` | `boolean \| Signal` | Shows loading spinner and disables interaction. |
| `ripple` | `boolean` | Ripple effect on click (Material Design). |
| `label` | `string` | Button text. |
| `animation` | `object` | `{ type: Enum, duration?: ms, delay?: ms }`. |

### 3. Detailed Visual Styles (AlfBaseStylesInterface)
These properties support states: **default**, **hover**, **active** and **focus**.

#### A. Border & Radius (`border` & `outline`)
| Property | Description |
|---|---|
| `borderWidth` | General or specific thickness (Top, Right, Bottom, Left). |
| `borderStyle` | Type: Solid, Dashed, Dotted, Double, None. |
| `borderColor` | Border color (Inherits from AlfColorEnum). |
| `borderRadius` | General or specific corner rounding. |

#### B. 2D/3D Transformations (`transform`)
| Property | Description |
|---|---|
| `translateX/Y/Z` | Axis displacement. |
| `scaleX/Y/Z` | Scaling (e.g., 1.1 to enlarge on hover). |
| `rotate/X/Y/Z` | Rotation in degrees. |
| `skewX/Y` | Skewing. |
| `perspective` | Depth for 3D effects. |
| `filter` | CSS filters like `blur()`, `brightness()`, etc. |
| `backdropFilter` | Background filters behind the element. |

#### C. Layout & Display (`displayAndLayout`)
| Property | Description |
|---|---|
| `display` | Block, Inline, Flex, Grid, None. |
| `position` | Relative, Absolute, Fixed, Sticky. |
| `width / height` | Fixed or relative dimensions. |
| `minWidth / Max` | Size limits. |
| `zIndex` | Vertical stacking order. |
| `gap` | Spacing between flex/grid elements. |
| `overflow` | Clipping control (Hidden, Scroll, Auto). |
| `aspectRatio` | Aspect ratio (e.g., '1/1'). |

#### D. Shadows (`shadows`)
| Property | Description |
|---|---|
| `boxShadow` | Outer or inner shadow (`boxShadowInset`). |
| `textShadow` | Shadow applied to label text. |
| `dropShadow` | Shadow filter for irregular shapes. |

#### E. Spacing (`padding` & `margin`)
| Property | Description |
|---|---|
| `padding` | Internal spacing (general or per side T, R, B, L). |
| `margin` | External spacing (general or per side T, R, B, L). |

#### F. Background & Text Colors (`backgroundStyle`)
| Property | Description |
|---|---|
| `color` | Button text color. |
| `backgroundColor` | Button background color. |

#### G. Direct Style Properties
- `cursor`: Pointer type (`Pointer`, `Grab`, `NotAllowed`).
- `opacity`: Transparency (0.0 to 1.0).
- `pointerEvents`: Enable/Disable CSS level clicks.
- `resize`: Allow manual resizing (`None`, `Both`).
- `scrollBehavior`: `Auto` or `Smooth`.

### 4. Global Properties (AllPropertiesInterface)
| Property | Type | Description |
|---|---|---|
| `prefix` | `AlfIconsUnicodeIconEnum \| string` | Icon before text. |
| `suffix` | `AlfIconsUnicodeIconEnum \| string` | Icon after text. |
| `tooltip` | `AlfTooltipConfigInterface \| string` | Tooltip text or full configuration. |
| `ariaLabel` | `string` | Text for screen readers. |
| `customClass` | `string` | Additional CSS classes. |
| `customStyle` | `Record<string, string>` | Custom inline CSS styles object. |

---

## 🚀 Basic Usage

```typescript
import { AlfButton } from 'alf-components';
import { AlfColorVariantEnum } from 'alf-components';

@Component({
  imports: [AlfButton],
  template: `
    <alf-button [config]="buttonConfig" (clicked)="onButtonClick($event)">
      Save
    </alf-button>
  `
})
export class MyComponent {
  buttonConfig = signal({
    variant: AlfColorVariantEnum.Primary,
    label: 'Save'
  });

  onButtonClick = (event: MouseEvent): void => {
    console.log('Button clicked!', event);
  };
}
```

## 🎨 Predefined Variants

The library includes predefined configurations ready to use:

```typescript
import { AlfDefaultSolidButtons, AlfDefaultOutlineButtons, AlfDefaultGhostButtons } from 'alf-components';

// Solid Buttons
const acceptBtn = AlfDefaultSolidButtons()['ACCEPT'];
const cancelBtn = AlfDefaultSolidButtons()['CANCEL'];
const deleteBtn = AlfDefaultSolidButtons()['DELETE'];

// Outline Buttons
const primaryOutline = AlfDefaultOutlineButtons()['PRIMARY'];
```

## 🔗 Button as Link

```typescript
const linkButtonConfig = {
  label: 'Go to Google',
  link: {
    url: 'https://google.com',
    target: AlfLinkTargetEnum.Blank // New tab
  }
};
```

---

## 🌍 Global Theming
This component supports dynamic theming via the `ALF_THEME` token.
- **Color Palette**: Colors are generated as native CSS variables (`--alf-color-primary`).
- **Variants**: Inherits global theme configurations if not locally overwritten.
- **Deep Merge**: Component configuration intelligently merges with the theme (you can overwrite just a `padding-top` and keep the rest of the theme style).

---

## ♿ Accessibility

The component complies with W3C ARIA standards:
- Automatic `aria-label` mapping when provided.
- `aria-disabled="true"` when the button is disabled.
- `aria-busy="true"` during loading state.
- Full keyboard navigation support (`Tab`, `Enter`, `Space`).
- Visual ripple effect provides interaction feedback.

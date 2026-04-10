# 🤖 AI Context: AlfButton

This document provides technical guidelines for AI models to generate correct and optimized code for the `AlfButton` component.

## 1. Interface Architecture (Component DNA)

The button uses a powerful configuration-first approach. AI agents must understand the inheritance tree to leverage all styling capabilities.

### Inheritance Chain:
1.  **`AlfBaseComponentInterface`**: Fundamental behavior (`variant`, `disabled`, `loading`, `label`, `ripple`).
2.  **`AlfBaseStylesInterface`**: The styling engine. Every property here is an **Interface itself** supporting states (**default**, **hover**, **active**, **focus**).
3.  **`AllPropertiesInterface`**: Combines the above + global utilities (`prefix`, `suffix`, `tooltip`, `customClass`, `customStyle`, `ariaLabel`).
4.  **`AlfButtonInterface`**: Specific specialization for buttons and links.
    - **Extends**: `AllPropertiesInterface`.
    - **Omits**: `responsive` (handled via layout properties).
    - **Specific keys**: `type`, `id` (number), `link`.

---

## 2. Global Styling Sub-Systems (Nested Interfaces)

Inside `config`, you can navigate these deep trees. All support `default`, `hover`, `active`, and `focus` states.

### A. Border & Radius (`config.border`)
- **`borderWidth`**: `AlfPxEnum.Px1`, `AlfRemEnum.Rem1`, etc.
- **`borderRadius`**: `AlfRadiusEnum.Md`, `Full`, etc.
- **States**: Change border color or width on `hover` or `active`.

### B. Shadows (`config.shadows`)
- **`boxShadow`**: `AlfShadowEnum.Sm`, `Md`, `Lg`, `Xl`, `Inner`.
- **States**: Increase shadow on `hover` for a "lifting" effect.

### C. Transformations (`config.transform`)
- **Move/Rotate/Scale**: Perfect for micro-interactions on `hover` or `active`.
- **Filters**: `filter` (blur, brightness) and `backdropFilter`.

### D. Display & Layout (`config.displayAndLayout`)
- **Dimensions**: `width`, `height`, `minWidth`, `maxWidth`.
- **Flex/Grid**: Control centering and alignment if needed.

---

## 3. Key Enums Reference

| Enum Category | Required Library Enum |
|---------------|-----------------------|
| **Primary Theme** | `AlfColorVariantEnum` (PrimarySolid, SecondaryOutline, SuccessSoft, DangerGhost, etc.) |
| **Component Size**| `AlfFontSizeEnum` (Xs, Sm, Base, Lg, Xl) |
| **Button Type**   | `AlfButtonTypeEnum` (Button, Submit, Reset) |
| **Link Target**   | `AlfLinkTargetEnum` (Blank, Self, Parent, Top) |
| **Icons**         | `AlfIconsUnicodeIconEnum` (Check, ArrowRight, Heart, etc.) |
| **Colors**        | `AlfColorEnum` (Primary, Success, Gray050, Blue550, etc.) |

---

## 4. Input/Output Contract

| Prop | Tipo | Binding | Note |
|------|------|---------|------|
| `config` | `AlfButtonInterface` | `[config]` | Master config object. |
| `clicked` | `MouseEvent` | `(clicked)` | Emitted on click (if not loading). |

---

## 5. Pro Usage Patterns (Deep Styling)

### Pattern 1: Link acting as an External Button
```html
<alf-button 
  [config]="{ 
    label: 'Visit Website', 
    variant: AlfColorVariantEnum.PrimaryOutline,
    link: { url: 'https://google.com', target: AlfLinkTargetEnum.Blank },
    suffix: AlfIconsUnicodeIconEnum.ExternalLink
  }">
</alf-button>
```

### Pattern 2: Highly Interactive Custom Button
```html
<alf-button 
  (clicked)="onSave()"
  [config]="{ 
    label: 'Save Changes',
    variant: AlfColorVariantEnum.SuccessSolid,
    shadows: {
      default: { boxShadow: AlfShadowEnum.Sm },
      hover: { boxShadow: AlfShadowEnum.Md }
    },
    transform: {
      hover: { scale: 1.05, translateY: '-2px' },
      active: { scale: 0.95 }
    },
    prefix: AlfIconsUnicodeIconEnum.Save,
    tooltip: 'Ctrl + S to save'
  }">
</alf-button>
```

---

## 6. Critical constraints for AI
1.  **Imports**: Always import `AlfButton` and the required Enums in the component's imports.
2.  **Model Loading**: The component handles loading states automatically; just pass `loading: true` in config to show a spinner and disable interaction.
3.  **Prefix/Suffix**: Use these instead of manual inner HTML for consistent icon placement.
4.  **Enums over Strings**: Always prefer library Enums for safety and consistency.
5.  **States**: Define specific visual changes inside the state keys (`hover`, `active`) within each style sub-interface.

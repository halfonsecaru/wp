# AlfCard - Elite Card Component

High-performance standalone card component designed for Angular 22. It implements the **Elite Visual Engine**, with nested sub-components for robust structural layout (title, body, actions, images), polymorphic link/button interactivity, and a dynamic theme system powered by CSS variables.

## Key Features

- **Nested Component Layout**: Organized slots using subcomponents (`alf-card-title`, `alf-card-body`, `alf-card-actions`, `alf-card-img`).
- **Interactive States**: Supports `clickable` and `href` configurations, adding premium elevation shadows, hover scaling transitions, active state offsets, and focus-visible rings.
- **Accessibility & Focus**: Implements dynamic semantic ARIA roles (`article`, `button`, `link`), keyboard tab indexing, and Space/Enter trigger listeners.
- **Interactive Bubbling Shield**: Automatically ignores card clicks coming from inner buttons or links.
- **Dynamic Theming**: Utilizes `AlfColorEnum` with CSS variables for instant theme integration.
- **Zoneless Ready**: Optimized for Angular architectures without Zone.js.

## Basic Usage

```html
<alf-card [colorVariant]="AlfColorVariantEnum.PrimaryOutline" [clickable]="true" (onClick)="onCardClick($event)">
  <alf-card-img src="https://picsum.photos/seed/card/600/300" alt="Demo Image"></alf-card-img>
  <alf-card-title><h3>Example Title</h3></alf-card-title>
  <alf-card-body>
    <p>This is the main body content of the card.</p>
  </alf-card-body>
  <alf-card-actions>
    <alf-button [colorVariant]="AlfColorVariantEnum.Primary" (onClick)="$event.stopPropagation(); accept()">
      Accept
    </alf-button>
  </alf-card-actions>
</alf-card>
```

## Component API

### Main Card Inputs

| Input | Type | Description |
|---|---|---|
| `inputConfig` | `AlfCardConfigInterface` | Comprehensive card configuration object. |
| `colorVariant` | `AlfColorVariantEnum` | Color variant (Primary, Secondary, Success, etc. and their Outlined versions). |
| `clickable` | `boolean` | If true, turns the card into an interactive button structure. |
| `href` | `string` | URL target if the card acts as an anchor. |
| `target` | `string` | Target for the anchor link (`_self`, `_blank`). |

### Main Card Outputs

| Output | Type | Description |
|---|---|---|
| `onClick` | `MouseEvent` | Triggered when the card is clicked (not triggered by inner action buttons). |

---
Part of the **Alfonizer Design System** ecosystem.

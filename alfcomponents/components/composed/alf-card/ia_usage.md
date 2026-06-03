# AI Usage Guide: AlfCard (Elite Visual Engine)

This document describes how to use and extend the `alf-card` component and its sub-components safely from an AI assistant, adhering to the project's technical rigor and Architectural rules.

## Current Architecture

- **Main Component**: `alfcomponents/components/composed/alf-card/alf-card.ts`
- **Sub-components**: 
  - `alf-card-title` — Slot for the card title.
  - `alf-card-body` — Slot for the main content body.
  - `alf-card-actions` — Slot for action buttons.
  - `alf-card-img` — Slot for images (direct `src` input or projected HTML `<img>` elements).
- **Core Engine**: Centralized in `alfcomponents/base/defaultVariants.ts`. All visual logic is resolved here.
- **Styling Strategy**: Dual approach. SCSS for layout/mixins and **CSS Variables** mapped dynamically for the active variant.
- **OnPush Change Detection**: All card elements utilize `ChangeDetectionStrategy.OnPush`.

## Interactivity & Accessibility

- **Interactivity**: 
  - `clickable = input<boolean>(false)`
  - `href = input<string | undefined>()`
  - `target = input<string>('_self')`
  - When `clickable` is `true` or `href` is defined, the card displays a pointer cursor, transition scales, and shadow elevations on hover.
- **Accessibility**: 
  - Host binds dynamic roles (`article`, `button`, or `link`) and `tabindex` (e.g. `0` if interactive, `-1` if disabled).
  - Listens to `keydown.enter` and `keydown.space` keys to simulate card clicks for keyboard-only users.
- **Bubbling Prevention**: Checks the click event source; if the clicked target belongs to an interactive child element (like a button inside `alf-card-actions`), the main card click/navigation handler is automatically bypassed to prevent double action triggers.

## Recommended Configuration Workflow

1. **Card Setup**:
   ```html
   <alf-card [colorVariant]="AlfColorVariantEnum.PrimaryOutline" [clickable]="true" (onClick)="onCardClick($event)">
     <alf-card-img src="path/to/image.jpg" alt="Description"></alf-card-img>
     <alf-card-title><h3>My Title</h3></alf-card-title>
     <alf-card-body><p>My body text goes here.</p></alf-card-body>
     <alf-card-actions>
       <alf-button [colorVariant]="AlfColorVariantEnum.Primary" (onClick)="$event.stopPropagation(); doSomething()">Action</alf-button>
     </alf-card-actions>
   </alf-card>
   ```

2. **Custom Configurations**:
   You can override configurations using the `[config]` input (typed as `AlfCardConfigInterface`).

## Technical Rules (Mandatory)

- **Access Modifiers**: Every variable and method MUST have a modifier (`public`, `private`, `protected`).
- **Readonly Signals**: All signals (`input`, `computed`, `model`) MUST be `readonly`.
- **Arrow Functions**: Use arrow functions for all class methods/event listeners.
- **No Directives Overuse**: Use standard Angular control flow (`@if`, `@for`, `@let`) instead of legacy structural directives.

---
*Technical reference for AI agents and component maintenance.*

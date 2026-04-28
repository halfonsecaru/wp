# AlfTabsContainer Technical Documentation (AI Usage)

## Component Core
- **Selector**: `alf-tabs-container`
- **Class**: `AlfTabsContainerComponent`
- **Pattern**: Composed component using Content Projection (`<ng-content>`) for `alf-tab` children.
- **Zoneless**: Yes (uses `afterNextRender`, `ResizeObserver`, and Signals).

## Architecture Highlights
- **Communication**: Uses `contentChildren(AlfTabComponent)` to orchestrate children. Syncs `active` state via `setActive()` method in children.
- **Height Management**: Uses a "Ghost" element strategy for fluid height transitions. The parent container animates its height based on the `reportHeight()` signal from the active child.
- **Cross-Fade**: Non-blocking tab switching. Triggering `playExitAnimation()` on the old tab while simultaneously activating the new one. Entry animation is delayed by 100ms for a smoother overlay effect.

## Key Inputs & Signals
- `variant`: `input<string | AlfColorVariantEnum>`. Supports `Outline[Color]`, `Solid[Color]`, and `Crystal[Color]` (e.g., `OutlinePrimary`, `SolidSuccess`, `CrystalInfo`).
- `config`: `input<AlfTabsContainerConfigInterface>`. Manual override for backgrounds, borders, and animations.
- `fluid`: `input<boolean>`. Enables/disables fluid height transitions (aliased from `fluidHeightInput`).
- `activeIndex`: `model<number>`. Two-way binding for the current tab.

## Interaction Patterns
- **Swipe Support**: Integrated horizontal swipe detection on the content area (threshold: 60px). Axes discrimination to prevent vertical scroll interference.
- **Header Scroll**: Automatic horizontal scroll with navigation arrows when tabs exceed container width. Uses `ResizeObserver` for metric updates.
- **Slider**: WAAPI-animated indicator that follows the active button width and position.

## Predefined Variants logic
- **Outline**: Uses variant color for border and text. Transparent background.
- **Solid**: Uses a "Soft" style (10% variant color mixed with white) for background and full variant color for text/border.
- **Crystal**: Glassmorphism effect via `backdrop-filter: blur(12px)` and semi-transparent background.

## Child Component: AlfTab
- **Selector**: `alf-tab`
- **Contract**: Reports height changes via `ResizeObserver` to the parent.
- **Animation States**: Managed via `currentAnimationClass` computed property. Handles `absolute` positioning during exit to allow cross-fade.

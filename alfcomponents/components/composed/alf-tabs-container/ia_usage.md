# AlfTabsContainer Technical Documentation (AI)

## Component Overview
- **Selector**: `alf-tabs-container`
- **Class**: `AlfTabsContainerComponent`
- **Architecture**: Composed component using Content Projection.
- **Parent-Child Communication**: The container uses `contentChildren(AlfTabComponent)` to find children and an `effect()` to set their `isActive` signal.

## Inputs
- `config`: `input.required<AlfTabsContainerInterface>()`. Defines the navigation buttons and style.

## Internal State
- `activeIndex`: `signal<number>(0)`. Tracks the currently selected tab index.

## Child Component: AlfTab
- **Selector**: `alf-tab`
- **Inputs**: `tabConfig`: `input.required<AlfSingleTabInterface>()`.
- **Logic**: Only renders content if `isActive()` is true (controlled by parent).

## Modernization Standards
- Uses Angular 21 Control Flow (`@for`, `@if`, `@let`).
- Zoneless ready.
- Standalone components.
- Strict access modifiers.
- No legacy directives (*ngIf, etc.).

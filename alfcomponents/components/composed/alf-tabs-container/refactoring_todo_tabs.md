# 🚀 Refactoring Plan: AlfTabs Elite Architecture

This document outlines the steps required to refactor the `AlfTabsContainer` and `AlfTab` components to meet the project's **Elite Technical Standards**.

## 🏗️ 1. Architecture & Core Structure
- [x] **Strict Inheritance**: Ensure `AlfTabsContainerComponent` leverage `AlfBaseConfiguration` and `AlfTabComponent` leverage `AlfBaseButtonConfiguration` (to maintain label/icon API).
- [x] **Access Modifiers**: Verify all properties and methods have explicit `public`, `private`, or `protected` modifiers.
- [x] **Readonly Signals**: Apply `readonly` to all Signal properties (`input`, `model`, `computed`, `signal`).
- [x] **Dependency Injection**: Use `readonly` for all injected dependencies (`inject(ElementRef)`, etc.).

## ⚛️ 2. Reactivity & Signals (Angular 22)
- [x] **Variant Resolution**: Standardize the `variant` input resolution logic using the robust mapping pattern (similar to `AlfRadioButton`).
- [x] **Refactor Navigation Logic**: Simplify the `navigationTabs` computed signal and improve the synchronization between the container and individual tabs.
- [x] **Zoneless Readiness**: Ensure all interactions and animations are triggered in a way that doesn't rely on zone-based change detection.

## 🧹 3. Code Quality (Clean Code)
- [x] **Arrow Functions**: Ensure ALL class methods are arrow functions.
- [x] **Logic Extraction**: Move complex logic from `computed` signals or effects into independent class methods where appropriate.
- [x] **Typing**: Ensure strong typing across all interfaces and enums.

## 📄 4. Template & HTML (Angular 22 Purist)
- [x] **Modern Control Flow**: Verify exclusive use of `@if`, `@for`, `@switch`.
- [x] **Local Variables**: Implement `@let` for repeated calculations or signal reads in the template.
- [x] **Clean Imports**: Remove any unused imports or deprecated directives (e.g., `CommonModule` if not needed for pipes).

## 🎨 5. Styling & Animations
- [x] **Dual Strategy**: 
    - [x] Move static layout and base styles to SCSS.
    - [x] Delegate dynamic behavior (slider movement, height transitions) strictly to **WAAPI**.
- [x] **CSS Variables**: Use the centralized visual engine mixins (`alf-display-layout-css-vars`, `alf-border-css-vars`, etc.) to stabilize the components.
- [x] **Slider Logic**: Refactor the slider movement logic to be more robust and strictly WAAPI-based.

## 🧪 6. Testing & Documentation
- [ ] **Unit Tests**: Update `.spec.ts` files to reflect architectural changes and ensure coverage.
- [x] **Documentation**: Update `README.english.md`, `README.spanish.md`, and `ia_usage.md`.

---
**Current Status**: 📝 Planning Phase
**Priority**: High (Composed Component)

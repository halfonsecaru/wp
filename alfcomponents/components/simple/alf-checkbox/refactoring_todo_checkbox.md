# Refactoring Plan: AlfCheckbox (Elite Standard)

This document outlines the steps to upgrade the `AlfCheckbox` component to the Elite architecture established for the Design System.

## 1. Directory Structure & Naming
- [x] Ensure all files follow the standard naming: `alf-checkbox.[ts|html|scss|spec.ts]`.
- [x] Verify directory structure: `enums/`, `interfaces/`, `predefined/`, `i18n/`, `utils/`.

## 2. Contracts & Types (Theming Pro)
- [x] **Interfaces**: Review `AlfCheckboxInterface` to ensure it inherits from `AlfBaseCommonConfigInterface`.
- [x] **Enums**: Align `AlfCheckboxVariantEnum` (Elegant/Standard) with the component's visual logic.
- [x] **Visual Engine**: Update `AlfColorVariantEnum` usage to support smart identity inheritance.

## 3. Predefined Patterns (The Elite Factory)
- [x] **Factory**: Refactor `getAlfCheckboxDefaultConfig` to use the centralized `resolveVariantConfig` from `defaultVariants.ts`.
- [x] **Smart Identity**: Ensure `AlfCheckbox` benefits from the `getVariantIdentity` logic in `defaultVariants.ts`.
- [x] **Base Config**: Define a robust `ALF_CHECKBOX_DEFAULT` that mirrors the high-quality defaults.

## 4. Component Logic (Angular 21)
- [x] **Signals**: Audit all inputs to ensure they use `input()` and `model()` (Zoneless ready).
- [x] **Readonly**: Ensure all signals and injected dependencies are `readonly`.
- [x] **Reactive Merge**: Refine the `finalConfig` computed signal to handle the hierarchy.
- [x] **Accessibility**: Enhance keyboard support (Space/Enter) and ARIA attributes.

## 5. Styling (Dual Strategy)
- [x] **CSS Variables**: Replace hardcoded hex values in SCSS with `AlfColorEnum` tokens.
- [x] **Mixins**: Ensure all mixins (`alf-background-css-vars`, etc.) are applied correctly.

## 6. Documentation & Quality
- [x] **READMEs**: Created/Updated `README.english.md` and `README.spanish.md`.
- [x] **AI Guide**: Updated `ia_usage.md` with the new architecture.

---
*Status: COMPLETED ✅*

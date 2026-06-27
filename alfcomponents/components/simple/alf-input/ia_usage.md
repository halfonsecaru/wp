# AlfInput Usage Guidelines

This document outlines how AI assistants should implement and interact with the `AlfInput` component.

## 1. Architecture & Reactivity (Angular 18+)
- **Signals Only**: Do not use old `@Input()`, `@Output()`, or `ngOnChanges`. `AlfInput` is built strictly with `input()`, `model()`, `computed()`, and `output()`.
- **Flat Inputs**: Pass all properties directly and individually (e.g. `[label]="'Name'"`, `[placeholder]="'Enter name'"`, `[disabled]="true"`). The obsolete config object is no longer supported.
- **Value Binding**: Use `[(value)]="mySignal"` or `[value]="mySignal()"` for the main data.
- **Change Detection**: The component is fully `OnPush`.

## 3. Appearances & Variants
`AlfInput` has three primary structural **Appearances**:
1. `AlfInputAppearanceEnum.Outline` (Default, bordered with floating label cutout)
2. `AlfInputAppearanceEnum.Fill` (Filled background, bottom border)
3. `AlfInputAppearanceEnum.Standard` (Only bottom border, transparent background)

**Color Variants:**
The input now resolves any `AlfColorVariantEnum` dynamically. You can safely pass `Primary`, `PrimarySoft`, `PrimaryOutline`, or even `Primary3D`. The component's styling engine (`alf-input-functions.ts`) will calculate the correct borders, paddings, and background text-contrasts automatically. 

## 4. Projections (Prefix / Suffix)
- You can pass simple strings via `[prefix]="'€'"` or `[suffix]="'.00'"`.
- For rich HTML/components (like a country dropdown or complex icon buttons), project them into the input wrapper using the `alfPrefix` and `alfSuffix` attributes:
  ```html
  <alf-input label="Phone">
    <div alfPrefix>...</div>
    <button alfSuffix>...</button>
  </alf-input>
  ```
Do **not** attempt to hack the component's internal `.alf-input-container` CSS when projecting prefixes. The component already floats the label correctly relative to the entire wrapper.

## 5. Forms Integration
- `AlfInput` implements `ControlValueAccessor` correctly via `forwardRef`. It works seamlessly with Reactive Forms (`[formControl]="ctrl"`).
- It handles `setDisabledState`, `writeValue`, and internal blur/focus updates autonomously.

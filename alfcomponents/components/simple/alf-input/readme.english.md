# AlfInput

`AlfInput` is a highly customizable, modern, and reactive text input component for Angular 18+ built entirely on the new **Signals** architecture. It implements `ControlValueAccessor` to integrate perfectly with Angular Forms.

## Features
- **Signals Powered**: Uses `input()`, `model()`, `output()`, and `computed()` for ultra-fast `OnPush` change detection.
- **Form Integration**: Fully compatible with Reactive Forms and Template-driven Forms.
- **Appearances**: Supports three native layouts (`Outline`, `Fill`, and `Standard`).
- **Dynamic Color Variants**: Compatible with all color palettes and variants (Solid, Soft, Outline, 3D, Gradient, Ghost) via an intelligent internal styling engine.
- **Built-in Addons**: Password visibility toggle, clear button, character counters, and error/helper text handling.
- **Rich Projection**: Inject icons, dropdowns, or custom HTML directly into the input structure via `[alfPrefix]` and `[alfSuffix]`.

## Usage Example

### Basic Input
```html
<alf-input 
  label="Username"
  placeholder="Enter your username"
  [(value)]="mySignal"
  [appearance]="AlfInputAppearanceEnum.Outline">
</alf-input>
```

### With Prefix and Forms
```html
<alf-input 
  label="Phone Number"
  [formControl]="phoneCtrl">
  <div alfPrefix>🇪🇸 +34</div>
  <button alfSuffix>Call</button>
</alf-input>
```

## API

### Inputs
- `label` (`string`): The floating or static label for the input.
- `placeholder` (`string`): Placeholder text.
- `type` (`AlfInputTypeEnum | string`): HTML input type (e.g., text, password, email).
- `appearance` (`AlfInputAppearanceEnum`): Outline, Fill, or Standard.
- `clearable` (`boolean`): Shows a clear icon (X) when the input has value.
- `showPasswordToggle` (`boolean`): Shows an eye icon to toggle password visibility.
- `showCharCounter` (`boolean`): Displays a character count (requires `maxLength`).
- `debounceTime` (`number`): Delays the emission of the `onInput` event.
- `isLoading` (`boolean`): Overlays a centered spinner with transparent background on the input.

### Models
- `value` (`model<string>`): Two-way bindable value signal.

### Outputs
- `onInput` (`string`): Emitted after the user types (respects `debounceTime`).
- `onClear` (`void`): Emitted when the clear icon is clicked.

## Projection Slots
You can use standard Angular content projection to place custom elements inside the input:
- `<ng-content select="[alfPrefix]"></ng-content>`
- `<ng-content select="[alfSuffix]"></ng-content>`

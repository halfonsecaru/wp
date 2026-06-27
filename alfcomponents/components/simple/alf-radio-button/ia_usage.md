# AI Usage Guide: AlfRadioButton

AlfRadioButton is an Elite component designed for high-performance and premium aesthetics. It uses the `AlfBaseConfiguration` pattern for visual consistency and follows the same flat-input architecture as `AlfCheckbox`.

## Implementation Details

- **Inheritance**: Extends `AlfBaseDirectives`.
- **State Management**: Uses Angular Signals `model()` for two-way binding (`checked`).
- **Visual Engine**: Uses `visualPrefix = 'RadioButton'` (Maps to `--alf-rb` in CSS).
- **Variants**: Supports `AlfColorVariantEnum` (Primary, Success, Danger, etc.) with robust string mapping.
- **Validation**: Built-in support for `helperText` and `error` messages.
- **Accessibility**: Uses a hidden native input for standard accessibility behavior.
- **Architecture**: All properties are flat inputs — there is no `config` / `inputConfig` object.

## Inputs & Outputs

- `variant`: `AlfColorVariantEnum` (e.g., Primary, Success).
- `checked`: `model<boolean>` (Two-way binding).
- `value`: `input<any>` (Value emitted on selection).
- `name`: `input<string>` (Grouping name).
- `radioButtonStyle`: `AlfRadioButtonVariantEnum` (Elegant, Standard).
- `label`: `input<string>` (Label text).
- `labelPosition`: `input<'before' | 'after'>` (Label position, default `'after'`).
- `size`: `AlfSizeEnum` (XS to 2XL).
- `disabled`: `input<boolean>` (inherited from base).
- `error`: `input<string>` (Error message).
- `helperText`: `input<string>` (Helper message).
- `onCheckedChange`: `output<any>` (Emits value when selected).

## Code Snippets for IAs

### Simple Selection
```typescript
@Component({
  imports: [AlfRadioButton],
  template: `
    <alf-radio-button 
      [(checked)]="isSelected" 
      [value]="1" 
      name="group1" 
      label="Option 1">
    </alf-radio-button>
  `
})
export class MyComp {
  isSelected = signal(false);
}
```

### With Variant and Style
```typescript
@Component({
  imports: [AlfRadioButton],
  template: `
    <alf-radio-button 
      [variant]="AlfColorVariantEnum.Success"
      [radioButtonStyle]="AlfRadioButtonVariantEnum.Elegant"
      label="Accept Terms"
      [size]="AlfSizeEnum.LG"
      [(checked)]="isSelected">
    </alf-radio-button>
  `
})
export class MyComp {
  isSelected = signal(false);
  AlfColorVariantEnum = AlfColorVariantEnum;
  AlfRadioButtonVariantEnum = AlfRadioButtonVariantEnum;
  AlfSizeEnum = AlfSizeEnum;
}
```

### With Helper Text and Error
```html
<alf-radio-button 
  label="Accept Terms"
  helperText="Read the terms before accepting"
  [(checked)]="isSelected">
</alf-radio-button>

<alf-radio-button 
  label="Required field"
  error="You must select an option"
  [(checked)]="hasError">
</alf-radio-button>
```

### Label Position Before
```html
<alf-radio-button 
  label="Label on the left" 
  labelPosition="before"
  [(checked)]="selected">
</alf-radio-button>
```

### Disabled State
```html
<alf-radio-button 
  label="Disabled option" 
  [disabled]="true"
  [checked]="false">
</alf-radio-button>
```

## Internal Structure
- `div.alf-rb`: Main container, applies layout/margin styles via the Elite engine. Also hosts structural directives like `alfTooltipText` and `alfAnimations`.
- `label.alf-rb-wrapper`: Clickable area, handles gap and orientation.
- `input[type="radio"][hidden]`: Hidden native input for state and accessibility.
- `div.alf-rb-circle`: The visual circle, applies background/border/shadow styles. Also hosts the `alfRipple` directive for the isolated ripple effect.
- `div.alf-rb-dot`: The inner dot that appears when checked.

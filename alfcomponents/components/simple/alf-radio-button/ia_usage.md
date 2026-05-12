# AI Usage Guide: AlfRadioButton

AlfRadioButton is an Elite component designed for high-performance and premium aesthetics. It uses the `AlfBaseConfiguration` pattern for visual consistency and follows the same architecture as `AlfCheckbox`.

## Implementation Details

- **Inheritance**: Extends `AlfBaseConfiguration<AlfRadioButtonInterface>`.
- **State Management**: Uses Angular Signals `model()` for two-way binding (`checked`).
- **Visual Engine**: Uses `visualPrefix = 'RadioButton'` (Maps to `--alf-rb` in CSS).
- **Variants**: Supports `AlfColorVariantEnum` (Primary, Success, Danger, etc.) with robust string mapping.
- **Validation**: Built-in support for `helperText` and `error` messages.
- **Accessibility**: Uses a hidden native input for standard accessibility behavior.

## Inputs & Outputs

- `variant`: `AlfColorVariantEnum` (e.g., Primary, Success).
- `checked`: `model<boolean>` (Two-way binding).
- `value`: `input<any>` (Value emitted on selection).
- `name`: `input<string>` (Grouping name).
- `radioButtonStyle`: `AlfRadioButtonVariantEnum` (Elegant, Standard).
- `label`: `input<string>` (Label text).
- `size`: `AlfSizeEnum` (XS to 2XL).
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

### Advanced Config
```typescript
@Component({
  imports: [AlfRadioButton],
  template: `
    <alf-radio-button 
      [config]="myConfig" 
      [(checked)]="isSelected">
    </alf-radio-button>
  `
})
export class MyComp {
  isSelected = signal(false);
  myConfig: AlfRadioButtonInterface = {
    radioButtonStyle: AlfRadioButtonVariantEnum.Elegant,
    variant: AlfColorVariantEnum.Success,
    label: 'Accept Terms',
    error: 'Field required'
  };
}
```

## Internal Structure
- `div.alf-rb`: Main container, applies layout/margin styles via the Elite engine.
- `label.alf-rb-wrapper`: Clickable area, handles gap and orientation.
- `input[type="radio"][hidden]`: Hidden native input for state and accessibility.
- `div.alf-rb-circle`: The visual circle, applies background/border/shadow styles.
- `div.alf-rb-dot`: The inner dot that appears when checked.

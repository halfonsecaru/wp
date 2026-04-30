# AI Usage Guide: AlfRadioButton

AlfRadioButton is an Elite component designed for high-performance and premium aesthetics. It uses the `AlfBaseConfiguration` pattern for visual consistency.

## Implementation Details

- **Inheritance**: Extends `AlfBaseConfiguration<AlfRadioButtonInterface>`.
- **State Management**: Uses Angular Signals `model()` for two-way binding (`checked`).
- **Visual Engine**: Uses `visualPrefix = '--alf-rb'` to map CSS variables.
- **Variants**: Supports `Solid`, `Outlined`, `Standard`, `Soft`, and `Crystal` prefixes in the `variant` input.
- **Validation**: Built-in support for `helperText` and `error` messages.

## Style Variants (radioButtonStyle)

- `AlfRadioButtonVariantEnum.Elegant`: Default circular neumorphic style.
- `AlfRadioButtonVariantEnum.Standard`: Classic circular style.

## Code Snippets for IAs

### Simple Selection
```typescript
@Component({
  imports: [AlfRadioButton],
  template: `<alf-radio-button [(checked)]="isSelected" label="Option 1"></alf-radio-button>`
})
export class MyComp {
  isSelected = signal(false);
}
```

### Advanced Config
```typescript
const myConfig: AlfRadioButtonInterface = {
  radioButtonStyle: AlfRadioButtonVariantEnum.Elegant,
  colorVariant: AlfColorVariantEnum.Success,
  label: 'Accept Terms',
  error: 'Field required'
};
```

## Internal Structure
- `div.alf-rb`: Main container, applies layout/margin styles.
- `label.alf-rb-wrapper`: Clickable area, handles gap and orientation.
- `div.alf-rb-circle`: The visual circle, applies background/border/shadow styles.
- `div.alf-rb-dot`: The inner dot that appears when checked.

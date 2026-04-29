# AI Usage Guide: AlfCheckbox

AlfCheckbox is an Elite component designed for high-performance and premium aesthetics. It uses the `AlfBaseConfiguration` pattern for visual consistency.

## Implementation Details

- **Inheritance**: Extends `AlfBaseConfiguration<AlfCheckboxInterface>`.
- **State Management**: Uses Angular Signals `model()` for two-way binding.
- **Visual Engine**: Uses `visualPrefix = '--alf-cb'` to map CSS variables.
- **Variants**: Supports `Solid`, `Outline`, and `Crystal` prefixes in the `variant` input.

## Style Variants (checkboxStyle)

- `AlfCheckboxVariantEnum.Elegant`: Default circular neumorphic style.
- `AlfCheckboxVariantEnum.Standard`: Classic square style.
- `AlfCheckboxVariantEnum.Moving`: Advanced animation where the box expands into the wrapper.

## Code Snippets for IAs

### Simple Toggle
```typescript
@Component({
  imports: [AlfCheckbox],
  template: `<alf-checkbox [(checked)]="isActive" label="Status"></alf-checkbox>`
})
export class MyComp {
  isActive = signal(false);
}
```

### Advanced Config
```typescript
const myConfig: AlfCheckboxInterface = {
  checkboxStyle: AlfCheckboxVariantEnum.Moving,
  colorVariant: AlfColorVariantEnum.Success,
  label: 'Accept Terms',
  error: 'Field required'
};
```

## Internal Structure
- `div.alf-cb`: Main container, applies layout/margin styles.
- `label.alf-cb-wrapper`: Clickable area, handles gap and orientation.
- `div.alf-cb-box`: The visual box, applies background/border/shadow styles.
- `span.alf-cb-icon`: Displays checkmark or indeterminate symbol.

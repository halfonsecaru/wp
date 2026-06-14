import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { generateUniqueId } from '@alfcomponents/shared';
import {
  AlfCheckboxVariantEnum,
  AlfIconsUnicodeIconEnum,
  AlfSizeEnum
} from '@alfcomponents/enums';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfCheckboxInterface } from './interfaces/alf-checkbox.interface';


import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { AlfBaseDirective } from '@alfcomponents/components/base/base.directive';

/**
 * AlfCheckbox Component
 * ✅ Elite Design System Standard.
 * ✅ Reactive Signals (input, model, computed).
 * ✅ Centralized Visual Engine Integration.
 */
@Component({
  selector: 'alf-checkbox',
  standalone: true,
  imports: [
    ...ALF_CORE_DIRECTIVES
  ],
  templateUrl: './alf-checkbox.html',
  styleUrl: './alf-checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlfCheckbox extends AlfBaseDirective {
  // ── 1. Attributes ─────────────────────────────────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: 'alf-cb' });


  // ── 2. Signals (Inputs & Models) ──────────────────────────────────────────
  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.Checkbox);
  };


  public readonly inputConfig = input<AlfCheckboxInterface>(undefined, { alias: 'config' });

  // /** Two-way binding for the checked state */
  public readonly checked = model<boolean>(false);

  // /** Two-way binding for the indeterminate state */
  public readonly indeterminate = model<boolean>(false);

  // /** Associated value */
  public readonly value = input<string | number>(undefined);

  // /** Native name attribute for grouping */
  public readonly name = input<string>(undefined);

  // /** Specific checkbox style (Elegant vs Standard) */
  public readonly checkboxStyle = input<AlfCheckboxVariantEnum | 'standard' | 'elegant'>();

  // /** Label text for the checkbox */
  public readonly label = input<string>(undefined);

  // /** Label position (before/after) */
  public readonly labelPosition = input<"before" | "after">("after");

  // /** Reactive error message */
  public readonly error = input<string>(undefined);

  // /** Reactive helper text */
  public readonly helperText = input<string>(undefined);

  // /** Icon selected */
  public readonly iconSelected = input<AlfIconsUnicodeIconEnum>();

  // /** Icon Checked status */
  public readonly isChecked = input<boolean>(false);

  // /** Indeterminate state */
  public readonly isIndeterminate = input<boolean>(false);

  public override readonly isDisabled = computed<boolean>(() => 
    this.disabled() === true || 
    this.isDisabledInput() === true || 
    this.inputConfig()?.disabled === true
  );


  // // ── 3. State Signals ──────────────────────────────────────────────────────
  public readonly focused = signal<boolean>(false);
  public readonly hovered = signal<boolean>(false);


  // // ── 4. Computed (Reactive Engine) ─────────────────────────────────────────
  protected readonly checkboxStyleComputed = computed<AlfCheckboxVariantEnum>(() => (this.checkboxStyle() ?? this.inputConfig()?.checkboxStyle ?? AlfCheckboxVariantEnum.Elegant) as AlfCheckboxVariantEnum);
  protected readonly labelComputed = computed<string>(() => this.label() ?? this.inputConfig()?.label);
  protected readonly labelPositionComputed = computed<'before' | 'after'>(() => this.labelPosition() ?? this.inputConfig()?.labelPosition);
  protected readonly sizeComputed = computed<AlfSizeEnum>(() => this.size() ?? this.inputConfig()?.size ?? AlfSizeEnum.MD);
  protected readonly iconSelectedComputed = computed<string>(() => this.iconSelected() ?? this.inputConfig()?.iconSelected ?? AlfIconsUnicodeIconEnum.CheckMark);
  protected readonly isCheckedComputed = computed<boolean>(() => this.isChecked() ?? this.inputConfig()?.checked);
  protected readonly isIndeterminatedComputed = computed<boolean>(() => this.isIndeterminate() ?? this.inputConfig()?.indeterminate);
  protected readonly valueComputed = computed<string | number>(() => this.value() ?? this.inputConfig()?.value);
  protected readonly nameComputed = computed<string>(() => this.name() ?? this.inputConfig()?.name);
  protected readonly helperComputed = computed<string>(() => this.helperText() ?? this.inputConfig()?.helperText);
  protected readonly errorComputed = computed<string>(() => this.error() ?? this.inputConfig()?.error);

  // ── 4. Outputs ────────────────────────────────────────────────────────────
  /** Emitted whenever the checked state changes */
  public readonly onCheckedChange = output<boolean>();

  // ── 5. Handlers (Arrow Functions) ─────────────────────────────────────────

  /**
   * Toggles the checkbox state.
   * Resets indeterminate state on manual change.
   */
  public readonly toggle = (): void => {
    if (this.isDisabled()) return;

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.indeterminate.set(false);
    this.onCheckedChange.emit(newValue);
  };

  // /** Handles the change event from the native input */
  public readonly onInputChange = (event: Event): void => {
    if (this.isDisabled()) return;
    this.toggle();
  };

  // /** Click handler for the label wrapper */
  protected readonly onLabelClick = (event: Event): void => {
    if (this.isDisabled()) return;
    event.preventDefault();
    this.toggle();
  };

  // /** Keyboard support (Space/Enter) */
  protected readonly onInputKeydown = (event: KeyboardEvent): void => {
    if (this.isDisabled()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  };
}

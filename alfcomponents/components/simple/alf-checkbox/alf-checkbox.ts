import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  output
} from '@angular/core';
import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import {
  AlfCheckboxVariantEnum,
  AlfColorVariantEnum,
  AlfIconsUnicodeIconEnum,
  AlfSizeEnum
} from '@alfcomponents/enums';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';
import { AlfCheckboxInterface } from './interfaces/alf-checkbox.interface';
import {
  ALF_CHECKBOX_DEFAULT,
  getAlfCheckboxDefaultConfig,
} from './predefined/alf-checkbox.predefined';

@Component({
  selector: 'alf-checkbox',
  standalone: true,
  imports: [AlfTooltipTextDirective, AlfRippleDirective],
  templateUrl: './alf-checkbox.html',
  styleUrl: './alf-checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCheckbox extends AlfBaseConfiguration<AlfCheckboxInterface> {
  // ── 1. Effects ────────────────────────────────────────────────────────────

  // ── 2. Attributes ─────────────────────────────────────────────────────────

  protected override readonly visualPrefix = visualprefixEnum.Checkbox;
  protected readonly internalId = generateUniqueId({ prefix: 'alf-cb' });

  private readonly el = inject(ElementRef);

  // ── 3. Signals ────────────────────────────────────────────────────────────

  /** Choosing a predefined style (Primary, Secondary, etc.) - Supports base and local naming */
  public readonly variant = input<AlfColorVariantEnum | undefined>(undefined);

  /** Direct user configuration. */
  public override readonly inputConfig = input<AlfCheckboxInterface>(undefined, { alias: 'config' });

  /** Two-way binding for the checked state */
  public readonly checked = model<boolean>(false);

  /** Two-way binding for the indeterminate state */
  public readonly indeterminate = model<boolean>(false);

  /** Visual style (Elegant, Standard) */
  public readonly checkboxStyle = input<AlfCheckboxVariantEnum>();

  /** Label text */
  public readonly label = input<string>();

  /** Checkbox size */
  public readonly size = input<AlfSizeEnum>();

  /** Error message */
  public readonly error = input<string>();

  /** Helper text */
  public readonly helperText = input<string>();

  // ── 4. Computed ───────────────────────────────────────────────────────────

  /**
   * Final configuration merge.
   * Mirroring AlfInput logic for role and appearance resolution.
   */

  public readonly finalConfig = computed(() => {
    const v = this.colorVariant() ?? this.variant();
    const cfg = {
      ...getAlfCheckboxDefaultConfig(v ? v : AlfColorVariantEnum.Secondary),
      ...this.inputConfig(),
    };

    return {
      ...cfg,
      checkboxStyle: this.checkboxStyle() ?? cfg?.checkboxStyle,
      label: this.label() ?? cfg?.label,
      size: this.size() ?? cfg?.size,
      error: this.error() ?? cfg?.error,
      helperText: this.helperText() ?? cfg?.helperText,
      colorVariant: v ? v : AlfColorVariantEnum.Secondary,
      disabled: this.disabled() ?? cfg?.disabled,
      checked: this.checked(),
      indeterminate: this.indeterminate(),
    };

  });

  public override readonly resolvedConfig = this.finalConfig;

  /** Resolves the visual style */
  public readonly checkboxStyleComputed = computed(
    () => this.resolvedConfig()?.checkboxStyle ?? AlfCheckboxVariantEnum.Elegant
  );

  /** Resolves the label text */
  public readonly labelComputed = computed(() => this.resolvedConfig()?.label ?? '');

  /** Resolves the label position */
  public readonly labelPositionComputed = computed(
    () => this.resolvedConfig()?.labelPosition ?? 'after'
  );

  /** Resolves the size */
  public readonly sizeComputed = computed(() => this.resolvedConfig()?.size ?? AlfSizeEnum.MD);

  /** Resolves if it's disabled */
  public readonly isDisabled = computed(() => this.disabledComputed());

  /** Icon to display inside the box */
  public readonly displayIcon = computed(() => {
    if (this.indeterminate()) return '−';
    return this.resolvedConfig()?.iconSelected || AlfIconsUnicodeIconEnum.CheckMark;
  });

  // ── 5. Lifecycle Hooks ────────────────────────────────────────────────────

  // ── 6. Outputs ────────────────────────────────────────────────────────────

  /** Emits when the checked state changes */
  public readonly onCheckedChange = output<boolean>();

  // ── 7. Functions / Handlers ───────────────────────────────────────────────

  @HostListener('click', ['$event'])
  public readonly onHostClick = (event: Event): void => {
    if (this.isDisabled()) return;
    event.preventDefault();
    this.toggle();
  };

  /** Toggles the checked state */
  public readonly toggle = (): void => {
    if (this.isDisabled()) return;

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.indeterminate.set(false);
    this.onCheckedChange.emit(newValue);
  };

  /** Accessibility keyboard handler */
  public readonly onInputKeydown = (event: KeyboardEvent): void => {
    if (this.isDisabled()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  };
}

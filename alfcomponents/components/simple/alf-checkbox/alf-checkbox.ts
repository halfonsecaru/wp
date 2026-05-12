import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  output,
  ViewEncapsulation
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
  getAlfCheckboxDefaultConfig,
} from './predefined/alf-checkbox.predefined';

/**
 * AlfCheckbox Component
 * ✅ Elite Design System Standard.
 * ✅ Reactive Signals (input, model, computed).
 * ✅ Centralized Visual Engine Integration.
 */
@Component({
  selector: 'alf-checkbox',
  standalone: true,
  imports: [AlfTooltipTextDirective, AlfRippleDirective],
  templateUrl: './alf-checkbox.html',
  styleUrl: './alf-checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlfCheckbox extends AlfBaseConfiguration<AlfCheckboxInterface> {
  // ── 1. Attributes ─────────────────────────────────────────────────────────

  protected override readonly visualPrefix: string = visualprefixEnum.Checkbox;
  protected readonly internalId: string = generateUniqueId({ prefix: 'alf-cb' });

  private readonly el: ElementRef = inject(ElementRef);

  // ── 2. Signals (Inputs & Models) ──────────────────────────────────────────

  /** Choosing a predefined style (Primary, Secondary, etc.) - Supports base and local naming */
  public readonly variant = input<AlfColorVariantEnum | undefined>(undefined);

  /** Direct user configuration (Elite Standard) */

  public override readonly inputConfig = input<AlfCheckboxInterface>(undefined, { alias: 'config' });

  /** Two-way binding for the checked state */
  public readonly checked = model<boolean>(false);

  /** Two-way binding for the indeterminate state */
  public readonly indeterminate = model<boolean>(false);

  /** Specific checkbox style (Elegant vs Standard) */
  public readonly checkboxStyle = input<AlfCheckboxVariantEnum>();

  /** Label text for the checkbox */
  public readonly label = input<string>();

  /** Dimension scale (XS to 2XL) */
  public readonly size = input<AlfSizeEnum>();

  /** Reactive error message */
  public readonly error = input<string>();

  /** Reactive helper text */
  public readonly helperText = input<string>();

  // ── 3. Computed (Reactive Engine) ─────────────────────────────────────────

  /**
   * Final configuration merge.
   * Resolves hierarchy: Inputs > InputConfig > Design System Defaults.
   */
  public readonly finalConfig = computed<AlfCheckboxInterface>(() => {
    const rawV = (this.colorVariant() ?? this.variant() ?? this.inputConfig()?.colorVariant) as string;
    
    // Mapeo manual ultra-robusto para las variantes core si vienen como string
    let v: AlfColorVariantEnum | undefined;
    if (rawV) {
      const lowerV = rawV.toLowerCase();
      const coreVariants: Record<string, AlfColorVariantEnum> = {
        primary: AlfColorVariantEnum.Primary,
        secondary: AlfColorVariantEnum.Secondary,
        success: AlfColorVariantEnum.Success,
        danger: AlfColorVariantEnum.Danger,
        warning: AlfColorVariantEnum.Warning,
        info: AlfColorVariantEnum.Info,
        light: AlfColorVariantEnum.Light,
        dark: AlfColorVariantEnum.Dark,
        transparent: AlfColorVariantEnum.Transparent
      };
      
      v = coreVariants[lowerV] ?? (rawV as AlfColorVariantEnum);
    }

    const cfg = {
      ...getAlfCheckboxDefaultConfig(v),
      ...this.inputConfig(),
    };

    return {
      ...cfg,
      checkboxStyle: this.checkboxStyle() ?? cfg?.checkboxStyle,
      label: this.label() ?? cfg?.label,
      size: this.size() ?? cfg?.size,
      error: this.error() ?? cfg?.error,
      helperText: this.helperText() ?? cfg?.helperText,
      disabled: this.disabled() ?? cfg?.disabled,
      checked: this.checked(),
      indeterminate: this.indeterminate(),
    };
  });

  /** Syncs with AlfBaseConfiguration resolvedConfig */
  public override readonly resolvedConfig = this.finalConfig;

  /** Resolves the effective checkbox style */
  public readonly checkboxStyleComputed = computed<AlfCheckboxVariantEnum>(
    () => this.resolvedConfig()?.checkboxStyle ?? AlfCheckboxVariantEnum.Elegant
  );

  /** Resolves the visible label */
  public readonly labelComputed = computed<string>(() => this.resolvedConfig()?.label ?? '');

  /** Resolves the label positioning (before/after) */
  public readonly labelPositionComputed = computed<'before' | 'after'>(
    () => this.resolvedConfig()?.labelPosition ?? 'after'
  );

  /** Resolves the dimension scale */
  public readonly sizeComputed = computed<AlfSizeEnum>(() => this.resolvedConfig()?.size ?? AlfSizeEnum.MD);

  /** Icon to display inside the checked box */
  public readonly displayIcon = computed<string>(() => {
    if (this.indeterminate()) return '−';
    return this.resolvedConfig()?.iconSelected || AlfIconsUnicodeIconEnum.CheckMark;
  });

  // ── 4. Outputs ────────────────────────────────────────────────────────────

  /** Emitted whenever the checked state changes */
  public readonly onCheckedChange = output<boolean>();

  // ── 5. Handlers (Arrow Functions) ─────────────────────────────────────────

  /**
   * Toggles the checkbox state.
   * Resets indeterminate state on manual change.
   */
  public readonly toggle = (): void => {
    if (this.disabledComputed()) return;

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.indeterminate.set(false);
    this.onCheckedChange.emit(newValue);
  };

  /** Click handler for the label wrapper */
  protected readonly onLabelClick = (event: Event): void => {
    if (this.disabledComputed()) return;
    event.preventDefault();
    this.toggle();
  };

  /** Keyboard support (Space/Enter) */
  protected readonly onInputKeydown = (event: KeyboardEvent): void => {
    if (this.disabledComputed()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  };
}

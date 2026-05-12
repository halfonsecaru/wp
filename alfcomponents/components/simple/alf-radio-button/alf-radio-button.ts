import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import {
  AlfRadioButtonVariantEnum,
  AlfColorVariantEnum,
  AlfSizeEnum
} from '@alfcomponents/enums';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';
import { AlfRadioButtonInterface } from './interfaces/alf-radio-button.interface';
import {
  getAlfRadioButtonDefaultConfig,
} from './predefined/alf-radio-button.predefined';

/**
 * AlfRadioButton Component
 * ✅ Elite Design System Standard.
 * ✅ Reactive Signals (input, model, computed).
 * ✅ Centralized Visual Engine Integration.
 */
@Component({
  selector: 'alf-radio-button',
  standalone: true,
  imports: [AlfTooltipTextDirective, AlfRippleDirective],
  templateUrl: './alf-radio-button.html',
  styleUrl: './alf-radio-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlfRadioButton extends AlfBaseConfiguration<AlfRadioButtonInterface> {
  // ── 1. Attributes ─────────────────────────────────────────────────────────

  protected override readonly visualPrefix: string = visualprefixEnum.RadioButton;
  protected readonly internalId: string = generateUniqueId({ prefix: 'alf-rb' });

  private readonly el: ElementRef = inject(ElementRef);

  // ── 2. Signals (Inputs & Models) ──────────────────────────────────────────

  /** Choosing a predefined style (Primary, Secondary, etc.) - Supports base and local naming */
  public readonly variant = input<AlfColorVariantEnum | undefined>(undefined);

  /** Direct user configuration (Elite Standard) */
  public override readonly inputConfig = input<AlfRadioButtonInterface>(undefined, { alias: 'config' });

  /** Two-way binding for the checked state */
  public readonly checked = model<boolean>(false);

  /** Associated value */
  public readonly value = input<any>(undefined);

  /** Native name attribute for grouping */
  public readonly name = input<string>(undefined);

  /** Specific radio style (Elegant vs Standard) */
  public readonly radioButtonStyle = input<AlfRadioButtonVariantEnum>();

  /** Label text for the radio button */
  public readonly label = input<string>();

  /** Dimension scale (XS to 2XL) */
  public readonly size = input<AlfSizeEnum>();

  /** Reactive error message */
  public readonly error = input<string>();

  /** Reactive helper text */
  public readonly helperText = input<string>();

  // ── 3. State Signals ──────────────────────────────────────────────────────

  public readonly focused = signal<boolean>(false);
  public readonly hovered = signal<boolean>(false);

  // ── 4. Computed (Reactive Engine) ─────────────────────────────────────────

  /**
   * Final configuration merge.
   * Resolves hierarchy: Inputs > InputConfig > Design System Defaults.
   */
  public readonly finalConfig = computed<AlfRadioButtonInterface>(() => {
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
      ...getAlfRadioButtonDefaultConfig(v),
      ...this.inputConfig(),
    };

    return {
      ...cfg,
      radioButtonStyle: this.radioButtonStyle() ?? cfg?.radioButtonStyle,
      label: this.label() ?? cfg?.label,
      size: this.size() ?? cfg?.size,
      value: this.value() ?? cfg?.value,
      name: this.name() ?? cfg?.name,
      error: this.error() ?? cfg?.error,
      helperText: this.helperText() ?? cfg?.helperText,
      disabled: this.disabled() ?? cfg?.disabled,
      checked: this.checked(),
    };
  });

  /** Syncs with AlfBaseConfiguration resolvedConfig */
  public override readonly resolvedConfig = this.finalConfig;

  /** Resolves the effective radio style */
  public readonly radioButtonStyleComputed = computed<AlfRadioButtonVariantEnum>(
    () => this.resolvedConfig()?.radioButtonStyle ?? AlfRadioButtonVariantEnum.Elegant
  );

  /** Resolves the visible label */
  public readonly labelComputed = computed<string>(() => this.resolvedConfig()?.label ?? '');

  /** Resolves the label positioning (before/after) */
  public readonly labelPositionComputed = computed<'before' | 'after'>(
    () => this.resolvedConfig()?.labelPosition ?? 'after'
  );

  /** Resolves the dimension scale */
  public readonly sizeComputed = computed<AlfSizeEnum>(() => this.resolvedConfig()?.size ?? AlfSizeEnum.MD);

  /** Resolves if it's disabled */
  public readonly isComponentDisabled = computed(() => 
    this.disabledComputed() || (this.resolvedConfig()?.disabled ?? false)
  );

  // ── 5. Outputs ────────────────────────────────────────────────────────────

  /** Emits when the radio button is selected. Emits its value. */
  public readonly onCheckedChange = output<any>();

  // ── 6. Handlers (Arrow Functions) ─────────────────────────────────────────

  /**
   * Selects the radio button.
   */
  public readonly select = (): void => {
    if (this.isComponentDisabled() || this.checked()) return;

    this.checked.set(true);
    this.onCheckedChange.emit(this.value() ?? this.resolvedConfig()?.value);
  };

  /** Handles the change event from the native input */
  public readonly onInputChange = (event: Event): void => {
    if (this.isComponentDisabled()) return;
    this.select();
  };

  /** Click handler for the label wrapper */
  protected readonly onLabelClick = (event: Event): void => {
    if (this.isComponentDisabled()) return;
    event.preventDefault();
    this.select();
  };

  /** Keyboard support (Space/Enter) */
  protected readonly onInputKeydown = (event: KeyboardEvent): void => {
    if (this.isComponentDisabled()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.select();
    }
  };
}

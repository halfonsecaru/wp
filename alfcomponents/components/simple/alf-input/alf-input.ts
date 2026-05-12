import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import {
  generateUniqueId,
  visualprefixEnum,
  AlfValidationResult,
  alfEmailValidator,
  alfRequiredValidator,
  alfMaxLengthValidator,
  alfMinLengthValidator,
  alfMinValidator,
  alfMaxValidator,
  alfUrlValidator,
  alfPatternValidator
} from '@alfcomponents/shared';
import { AlfColorVariantEnum, AlfInputTypeEnum, AlfInputAppearanceEnum, AlfInputAdornmentEnum, AlfColorEnum } from '@alfcomponents/enums';

import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';
import { AlfInputInterface } from './interfaces/alf-input.interface';
import { ALF_INPUT_DEFAULT, getAlfInputDefaultConfiguration } from './predefined/alf-input.predefined';
import { getAlfInputLabel, AlfInputI18nLabels } from './i18n/alf-input.i18n';
import { interpolate } from '@alfcomponents/i18n/i18n-utils';

@Component({
  selector: 'alf-input',
  standalone: true,
  imports: [AlfTooltipTextDirective, AlfRippleDirective],
  templateUrl: './alf-input.html',
  styleUrl: './alf-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfInput extends AlfBaseConfiguration<AlfInputInterface> {

  // ── Configuración base ────────────────────────────────────────────────────

  protected override readonly visualPrefix: string = visualprefixEnum.Input;
  protected readonly internalId: string = generateUniqueId({ prefix: 'alf-inp' });

  private readonly el: ElementRef = inject(ElementRef);

  // ── Effects ───────────────────────────────────────────────────────────────



  /** Efecto de debounce — aplica el valor pendiente tras el tiempo configurado */
  private readonly debounceEffect = effect((onCleanup) => {
    const pending = this.pendingValue();
    const time = this.resolvedConfig()?.debounceTime ?? 0;

    if (pending === null || time <= 0) return;

    const timerId = setTimeout(() => {
      this.value.set(pending);
      this.onInput.emit(pending);
      this.pendingValue.set(null);
    }, time);

    onCleanup(() => clearTimeout(timerId));
  });

  /** Efecto de validación — corre cuando el valor (debounced) cambia */
  private readonly validationEffect = effect(() => {
    const val = this.value();
    const validators = this.resolvedConfig()?.validators || [];

    if (validators.length === 0) {
      this.validationError.set(null);
      return;
    }

    for (const validator of validators) {
      const result = validator(val);
      if (!result.isValid) {
        // Resolver el mensaje de error vía i18n
        let message = '';
        if (result.code) {
          const label = getAlfInputLabel(result.code as keyof AlfInputI18nLabels);
          const cfg = this.resolvedConfig();
          if (result.code === 'validatorMaxLength' && cfg?.maxLength !== undefined) {
            message = interpolate(label, cfg.maxLength);
          } else if (result.code === 'validatorMinLength' && cfg?.minLength !== undefined) {
            message = interpolate(label, cfg.minLength);
          } else if (result.code === 'validatorMin' && cfg?.min !== undefined) {
            message = interpolate(label, cfg.min);
          } else if (result.code === 'validatorMax' && cfg?.max !== undefined) {
            message = interpolate(label, cfg.max);
          } else {
            message = label;
          }
        } else {
          message = result.error || 'Error';
        }

        this.validationError.set(message);
        return;
      }
    }

    this.validationError.set(null);
  });

  // ── Signals internos ──────────────────────────────────────────────────────

  public readonly isFocused = signal<boolean>(false);
  public readonly isPasswordVisible = signal<boolean>(false);
  private readonly pendingValue = signal<string | null>(null);
  private readonly validationError = signal<string | null>(null);


  // ── ViewChild ─────────────────────────────────────────────────────────────

  public readonly inputElement = viewChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('inputRef');




  // ── Inputs de variante / config ───────────────────────────────────────────

  public readonly variant = input<AlfColorVariantEnum | undefined>(undefined);

  public override readonly inputConfig = input<AlfInputInterface | undefined>(undefined, { alias: 'config' });

  // ── 3. Inputs directos ───────────────────────────────────────────────────────

  public readonly label = input<string | undefined>(undefined);
  public readonly placeholder = input<string | undefined>(undefined);
  public readonly type = input<AlfInputTypeEnum>(AlfInputTypeEnum.Text);

  public readonly error = input<string | undefined>(undefined);
  public readonly helperText = input<string | undefined>(undefined);
  public readonly appearance = input<AlfInputAppearanceEnum | undefined>(undefined);
  public readonly prefix = input<string | AlfInputAdornmentEnum | undefined>(undefined);
  public readonly suffix = input<string | AlfInputAdornmentEnum | undefined>(undefined);
  public readonly required = input<boolean | undefined>(undefined);
  public readonly readonly = input<boolean | undefined>(undefined);
  public readonly loading = input<boolean | undefined>(undefined);
  public readonly maxLength = input<number | undefined>(undefined);
  public readonly minLength = input<number | undefined>(undefined);
  public readonly min = input<number | string | undefined>(undefined);
  public readonly max = input<number | string | undefined>(undefined);
  public readonly step = input<number | undefined>(undefined);
  public readonly pattern = input<string | undefined>(undefined);
  public readonly autofocus = input<boolean | undefined>(undefined);
  public readonly validators = input<((v: string) => AlfValidationResult)[] | undefined>(undefined);
  public readonly clearable = input<boolean | undefined>(undefined);
  public readonly showPasswordToggleInput = input<boolean | undefined>(undefined, { alias: 'showPasswordToggle' });
  public readonly showCharCounterInput = input<boolean | undefined>(undefined, { alias: 'showCharCounter' });


  // ── Model two-way ─────────────────────────────────────────────────────────

  public readonly value = model<string>('');

  // ── Computed: cadena de configuración ────────────────────────────────────

  public readonly finalConfig = computed<AlfInputInterface>(() => {
    const v = this.colorVariant() ?? this.variant();
    const inputCfg = this.inputConfig();

    // Resolve variant with fallbacks
    let variantEnum = AlfColorVariantEnum.Default;
    if (v) {
      if (typeof v === 'string') {
        const normalized = v.toLowerCase().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        variantEnum = (AlfColorVariantEnum as any)[normalized.charAt(0).toUpperCase() + normalized.slice(1)] ?? AlfColorVariantEnum.Default;
      } else {
        variantEnum = v as unknown as AlfColorVariantEnum;
      }
    }


    const app = (this.appearance() ?? inputCfg?.appearance ?? AlfInputAppearanceEnum.Outline) as AlfInputAppearanceEnum;
    const base = getAlfInputDefaultConfiguration(variantEnum, app);
    
    const final: AlfInputInterface = {
      ...base,
      ...inputCfg,
      label: this.label() ?? inputCfg?.label ?? base.label,
      placeholder: this.placeholder() ?? inputCfg?.placeholder ?? base.placeholder,
      value: this.value() ?? inputCfg?.value ?? base.value,
      required: this.required() ?? inputCfg?.required ?? base.required,
      disabled: this.disabled() ?? inputCfg?.disabled ?? base.disabled,
      readonly: this.readonly() ?? inputCfg?.readonly ?? base.readonly,
      loading: this.loading() ?? inputCfg?.loading ?? base.loading,
      error: this.error() ?? inputCfg?.error ?? base.error,
      helperText: this.helperText() ?? inputCfg?.helperText ?? base.helperText,
      prefix: this.prefix() ?? inputCfg?.prefix ?? base.prefix,
      suffix: this.suffix() ?? inputCfg?.suffix ?? base.suffix,
      maxLength: this.maxLength() ?? inputCfg?.maxLength ?? base.maxLength,
      minLength: this.minLength() ?? inputCfg?.minLength ?? base.minLength,
      min: this.min() ?? inputCfg?.min ?? base.min,
      max: this.max() ?? inputCfg?.max ?? base.max,
      step: this.step() ?? inputCfg?.step ?? base.step,
      pattern: this.pattern() ?? inputCfg?.pattern ?? base.pattern,
      autofocus: this.autofocus() ?? inputCfg?.autofocus ?? base.autofocus,
      validators: this.validators() ?? inputCfg?.validators ?? base.validators,
      clearable: this.clearable() ?? inputCfg?.clearable ?? base.clearable,
      showPasswordToggle: this.showPasswordToggleInput() ?? inputCfg?.showPasswordToggle ?? base.showPasswordToggle,
      showCharCounter: this.showCharCounterInput() ?? inputCfg?.showCharCounter ?? base.showCharCounter,
      inputType: this.type() ?? inputCfg?.inputType ?? base.inputType,
      colorVariant: variantEnum,
    };

    // Auto-resolve validators
    const resolvedValidators: ((v: string) => AlfValidationResult)[] = [];
    if (final.required) resolvedValidators.push(alfRequiredValidator);
    if (final.inputType === AlfInputTypeEnum.Email) resolvedValidators.push(alfEmailValidator);
    if (final.inputType === AlfInputTypeEnum.Url) resolvedValidators.push(alfUrlValidator);
    if (final.maxLength) resolvedValidators.push(alfMaxLengthValidator(final.maxLength));
    if (final.minLength) resolvedValidators.push(alfMinLengthValidator(final.minLength));
    if (final.min !== undefined && final.min !== null) resolvedValidators.push(alfMinValidator(Number(final.min)));
    if (final.max !== undefined && final.max !== null) resolvedValidators.push(alfMaxValidator(Number(final.max)));
    if (final.pattern) resolvedValidators.push(alfPatternValidator(final.pattern));
    if (final.validators && final.validators.length > 0) resolvedValidators.push(...final.validators);

    // Danger override if error exists
    const errorVal = this.error() ?? this.validationError() ?? inputCfg?.error;
    const hasError = !!(errorVal && errorVal.toString().trim() !== '');
    const dangerBorder = (hasError && final.border) ? {
      ...final.border,
      default: { ...final.border.default, borderColor: AlfColorEnum.Danger },
      hover: { ...final.border.hover, borderColor: AlfColorEnum.Danger },
      focus: { ...final.border.focus, borderColor: AlfColorEnum.Danger },
      active: { ...final.border.active, borderColor: AlfColorEnum.Danger },
    } : final.border;

    return {
      ...final,
      border: dangerBorder,
      validators: resolvedValidators
    };
  });

  public override readonly resolvedConfig = this.finalConfig;


  // ── Computed derivados ────────────────────────────────────────────────────

  public readonly isDisabled = computed(() => this.disabledComputed());
  public readonly isReadonly = computed(() => this.readonly() ?? this.resolvedConfig()?.readonly ?? false);
  public readonly isLoading = computed(() => this.loading() ?? this.resolvedConfig()?.loading ?? false);


  public readonly inputId = computed(() =>
    this.resolvedConfig()?.id ?? this.internalId
  );

  /** Resolves if the current variant is an outlined one (to use fieldset/legend) */
  public readonly isOutlined = computed(() => {
    const app = this.appearance() ?? this.resolvedConfig()?.appearance;
    if (app) return app === AlfInputAppearanceEnum.Outline;
    return this.colorVariantComputed().toString().toLowerCase().includes('outline') ||
      this.colorVariantComputed() === AlfColorVariantEnum.Default;
  });

  public readonly labelComputed = computed(() =>
    this.label() ?? this.resolvedConfig()?.label ?? ''
  );

  public readonly placeholderComputed = computed(() =>
    this.placeholder() ?? this.resolvedConfig()?.placeholder ?? ''
  );

  public readonly errorComputed = computed(() =>
    this.error() ?? this.validationError() ?? this.resolvedConfig()?.error ?? ''
  );

  public readonly errorColorComputed = computed(() => {
    const err = this.errorComputed();
    if (!err) return null;
    return this.resolvedConfig()?.border?.default?.borderColor ?? AlfColorEnum.Danger;
  });

  public readonly helperTextComputed = computed(() =>
    this.helperText() ?? this.resolvedConfig()?.helperText ?? ''
  );

  public readonly inputTypeAttr = computed(() => {
    const type = this.type() ?? this.resolvedConfig()?.inputType;
    if (type === AlfInputTypeEnum.Password && this.isPasswordVisible()) return 'text';
    return this.resolveInputTypeAttr(type);
  });

  public readonly shouldFloat = computed(() =>
    this.isFocused() || this.value().length > 0
  );

  // Variable usada en el template (line 16)
  public readonly showClear = computed(() => {
    const cfg = this.resolvedConfig();
    return cfg?.clearable &&
      this.value().length > 0 &&
      !this.isDisabled() &&
      !this.isReadonly() &&
      !this.isLoading();
  });

  // Variable usada en el template (line 17)
  public readonly showPasswordToggle = computed(() => {
    const type = this.type() ?? this.resolvedConfig()?.inputType;
    return type === AlfInputTypeEnum.Password &&
      this.resolvedConfig()?.showPasswordToggle !== false;
  });

  // Variable usada en el template (line 18)
  public readonly showCharCounter = computed(() => {
    const cfg = this.resolvedConfig();
    return cfg?.showCharCounter && cfg?.maxLength !== undefined;
  });

  public readonly hasSuffix = computed(() =>
    !!this.resolvedConfig()?.suffix ||
    this.showPasswordToggle() ||
    this.showClear() ||
    this.isLoading()
  );

  // ── i18n labels ───────────────────────────────────────────────────────────

  public readonly clearLabel = computed(() => getAlfInputLabel('clearAriaLabel'));
  public readonly showPwdLabel = computed(() => getAlfInputLabel('showPassword'));
  public readonly hidePwdLabel = computed(() => getAlfInputLabel('hidePassword'));
  public readonly loadingLabel = computed(() => getAlfInputLabel('loading'));

  // ── Outputs ───────────────────────────────────────────────────────────────

  public readonly onFocus = output<FocusEvent>();
  public readonly onBlur = output<FocusEvent>();
  public readonly onInput = output<string>();
  public readonly onClear = output<void>();

  // ── Handlers ─────────────────────────────────────────────────────────────

  public readonly handleInput = (event: Event): void => {
    const val = (event.target as HTMLInputElement).value;
    const time = this.resolvedConfig()?.debounceTime ?? 0;



    if (time > 0) {
      this.pendingValue.set(val);
    } else {
      this.value.set(val);
      this.onInput.emit(val);
    }
  };

  public readonly handleFocus = (event: FocusEvent): void => {
    this.isFocused.set(true);
    this.onFocus.emit(event);
  };

  public readonly handleBlur = (event: FocusEvent): void => {
    this.isFocused.set(false);
    this.onBlur.emit(event);
  };

  public readonly focusInput = (): void => {
    const el = this.inputElement();
    if (el && !this.isDisabled()) el.nativeElement.focus();
  };

  public readonly clear = (event: MouseEvent): void => {
    event.stopPropagation();
    this.value.set('');
    this.onClear.emit();
    this.focusInput();
  };

  public readonly togglePassword = (event: MouseEvent): void => {
    event.stopPropagation();
    this.isPasswordVisible.update(v => !v);
  };


  /**
   * Resuelve el atributo type HTML real para el elemento input nativo.
   * El tipo 'textarea' no es un type HTML válido, se trata como elemento separado.
   */
  private resolveInputTypeAttr = (type?: AlfInputTypeEnum): string => {
    if (!type) return 'text';
    return type;
  };

}

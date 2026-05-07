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
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum, AlfInputTypeEnum, AlfInputAppearanceEnum, AlfInputAdornmentEnum } from '@alfcomponents/enums';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';
import { AlfInputInterface } from './interfaces/alf-input.interface';
import { ALF_INPUT_DEFAULT, getAlfInputDefaultConfig } from './predefined/alf-input.predefined';
import { getAlfInputLabel } from './i18n/alf-input.i18n';

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

  protected override readonly visualPrefix = visualprefixEnum.Input;
  protected readonly internalId = generateUniqueId({ prefix: 'alf-inp' });

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

  // ── Signals internos ──────────────────────────────────────────────────────

  public readonly isFocused = signal<boolean>(false);
  public readonly isPasswordVisible = signal<boolean>(false);
  private readonly pendingValue = signal<string | null>(null);

  // ── ViewChild ─────────────────────────────────────────────────────────────

  public readonly inputElement = viewChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('inputRef');

  // ── ElementRef ────────────────────────────────────────────────────────────

  private readonly el = inject(ElementRef);

  // ── Inputs de variante / config ───────────────────────────────────────────

  public readonly variant = input<AlfColorVariantEnum>(undefined);
  public override readonly inputConfig = input<AlfInputInterface>();

  // ── Inputs directos ───────────────────────────────────────────────────────

  public readonly label = input<string>();
  public readonly placeholder = input<string>();
  public readonly type = input<AlfInputTypeEnum>(AlfInputTypeEnum.Text);

  public readonly error = input<string>();
  public readonly helperText = input<string>();
  public readonly appearance = input<AlfInputAppearanceEnum>();
  public readonly prefix = input<string | AlfInputAdornmentEnum>();
  public readonly suffix = input<string | AlfInputAdornmentEnum>();
  public readonly required = input<boolean>();
  public readonly readonly = input<boolean>();
  public readonly loading = input<boolean>();
  public readonly maxLength = input<number>();
  public readonly clearable = input<boolean>();
  public readonly showPasswordToggleInput = input<boolean>(undefined, { alias: 'showPasswordToggle' });
  public readonly showCharCounterInput = input<boolean>(undefined, { alias: 'showCharCounter' });

  // ── Model two-way ─────────────────────────────────────────────────────────

  public readonly value = model<string>('');

  // ── Computed: cadena de configuración ────────────────────────────────────

  public readonly finalConfig = computed(() => {
    const v = this.colorVariant() ?? this.variant();
    const cfg = {
      ...ALF_INPUT_DEFAULT,
      ...this.inputConfig(),
    }

    // Si hay un error real, forzamos la variante Danger para el feedback visual
    let variantEnum = AlfColorVariantEnum.Default;
    const errorVal = this.error() || cfg?.error;

    if (errorVal && errorVal.toString().trim() !== '') {
      variantEnum = AlfColorVariantEnum.Danger;
    } else if (v) {
      if (typeof v === 'string') {
        const normalized = v.toLowerCase().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        variantEnum = (AlfColorVariantEnum as any)[normalized.charAt(0).toUpperCase() + normalized.slice(1)] ?? AlfColorVariantEnum.Default;
      } else {
        variantEnum = v;
      }
    }

    const base = getAlfInputDefaultConfig(
      variantEnum,
      this.appearance() ?? cfg?.appearance ?? AlfInputAppearanceEnum.Outline
    );

    return {
      ...base,
      ...cfg,
      // Los inputs directos tienen prioridad máxima
      label: this.label() ?? cfg?.label ?? base.label,
      placeholder: this.placeholder() ?? cfg?.placeholder ?? base.placeholder,
      value: this.value() ?? cfg?.value ?? base.value,
      required: this.required() ?? cfg?.required ?? base.required,
      disabled: this.disabled() ?? cfg?.disabled ?? base.disabled,
      readonly: this.readonly() ?? cfg?.readonly ?? base.readonly,
      loading: this.loading() ?? cfg?.loading ?? base.loading,
      error: this.error() ?? cfg?.error ?? base.error,
      helperText: this.helperText() ?? cfg?.helperText ?? base.helperText,
      prefix: this.prefix() ?? cfg?.prefix ?? base.prefix,
      suffix: this.suffix() ?? cfg?.suffix ?? base.suffix,
      maxLength: this.maxLength() ?? cfg?.maxLength ?? base.maxLength,
      clearable: this.clearable() ?? cfg?.clearable ?? base.clearable,
      showPasswordToggle: this.showPasswordToggleInput() ?? cfg?.showPasswordToggle ?? base.showPasswordToggle,
      showCharCounter: this.showCharCounterInput() ?? cfg?.showCharCounter ?? base.showCharCounter,
      type: this.type() ?? cfg?.inputType ?? base.inputType,
      colorVariant: variantEnum,
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
    this.error() ?? this.resolvedConfig()?.error ?? ''
  );

  public readonly helperTextComputed = computed(() =>
    this.helperText() ?? this.resolvedConfig()?.helperText ?? ''
  );

  public readonly inputTypeAttr = computed(() => {
    const type = this.type() ?? this.resolvedConfig()?.inputType;
    if (type === AlfInputTypeEnum.Password && this.isPasswordVisible()) return 'text';
    return this.resolveInputTypeAttr(type);
  });

  public readonly shouldFloat = computed(() =>
    this.shouldLabelFloat(
      this.isFocused(),
      this.value(),
      this.type() ?? this.resolvedConfig()?.inputType,
    )
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

  // ── WAAPI ─────────────────────────────────────────────────────────────────




  /**
   * Determina si el label debe flotar hacia arriba.
   * Flota cuando hay foco, cuando hay valor, o cuando el tipo es number (siempre muestra placeholder).
   */
  private shouldLabelFloat = (
    focused: boolean,
    value: string,
    type?: AlfInputTypeEnum,
  ): boolean => focused || value.length > 0 || type === AlfInputTypeEnum.Number;

  /**
   * Resuelve el atributo type HTML real para el elemento input nativo.
   * El tipo 'textarea' no es un type HTML válido, se trata como elemento separado.
   */
  private resolveInputTypeAttr = (type?: AlfInputTypeEnum): string => {
    if (!type) return 'text';
    return type;
  };

}

import {
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
import { AlfColorVariantEnum, AlfInputTypeEnum, AlfInputAppearanceEnum } from '@alfcomponents/enums';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';
import { AlfInputInterface } from './interfaces/alf-input.interface';
import { ALF_INPUT_DEFAULT, getAlfInputDefaultConfig } from './predefined/alf-input.predefined';
import { getAlfInputLabel } from './i18n/alf-input.i18n';
import { resolveInputTypeAttr, shouldLabelFloat } from './utils/alf-input.utils';

@Component({
  selector: 'alf-input',
  standalone: true,
  imports: [AlfTooltipTextDirective, AlfRippleDirective],
  templateUrl: './alf-input.html',
  styleUrl: './alf-input.scss',
})
export class AlfInput extends AlfBaseConfiguration<AlfInputInterface> {

  // ── Configuración base ────────────────────────────────────────────────────

  protected override readonly visualPrefix = visualprefixEnum.Input;
  protected readonly internalId = generateUniqueId({ prefix: 'alf-inp' });

  // ── Effects ───────────────────────────────────────────────────────────────

  /** Sincroniza el auto-resize del textarea cuando el valor cambia */
  private readonly autoResizeEffect = effect(() => {
    const val = this.value();
    const cfg = this.resolvedConfig();
    const inputEl = this.inputElement();

    if (cfg?.autoResize && cfg?.inputType === AlfInputTypeEnum.Textarea && inputEl) {
      this.applyAutoResize(inputEl.nativeElement);
    }
  });

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

  public readonly variant = input<string | AlfColorVariantEnum>(undefined, { alias: 'variant' });
  public override readonly inputConfig = input<AlfInputInterface>(ALF_INPUT_DEFAULT, { alias: 'config' });

  // ── Inputs directos ───────────────────────────────────────────────────────

  public readonly label = input<string>();
  public readonly placeholder = input<string>();
  public readonly inputType = input<AlfInputTypeEnum>();
  public readonly error = input<string>();
  public readonly helperText = input<string>();
  public readonly appearance = input<AlfInputAppearanceEnum>();

  // ── Model two-way ─────────────────────────────────────────────────────────

  public readonly value = model<string>('');

  // ── Computed: cadena de configuración ────────────────────────────────────

  public readonly finalConfig = computed(() => {
    const v = this.variant();
    const cfg = this.inputConfig();
    
    // Si v es string, intentamos resolver el enum (ej: "outlined-primary" -> AlfColorVariantEnum.PrimaryOutline)
    let variantEnum = AlfColorVariantEnum.Default;
    if (v) {
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
    };
  });

  public override readonly resolvedConfig = this.finalConfig;

  // ── Computed derivados ────────────────────────────────────────────────────

  public readonly isDisabled = computed(() => this.disabledComputed());
  public readonly isReadonly = computed(() => this.resolvedConfig()?.readonly ?? false);
  public readonly isLoading = computed(() => this.resolvedConfig()?.loading ?? false);
  public readonly isTextarea = computed(() =>
    (this.inputType() ?? this.resolvedConfig()?.inputType) === AlfInputTypeEnum.Textarea
  );

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
    const type = this.inputType() ?? this.resolvedConfig()?.inputType;
    if (type === AlfInputTypeEnum.Password && this.isPasswordVisible()) return 'text';
    return resolveInputTypeAttr(type);
  });

  public readonly shouldFloat = computed(() =>
    shouldLabelFloat(
      this.isFocused(),
      this.value(),
      this.inputType() ?? this.resolvedConfig()?.inputType,
    )
  );

  public readonly showClear = computed(() => {
    const cfg = this.resolvedConfig();
    return cfg?.clearable &&
      this.value().length > 0 &&
      !this.isDisabled() &&
      !this.isReadonly() &&
      !this.isLoading();
  });

  public readonly showPasswordToggle = computed(() => {
    const type = this.inputType() ?? this.resolvedConfig()?.inputType;
    return type === AlfInputTypeEnum.Password &&
      this.resolvedConfig()?.showPasswordToggle !== false;
  });

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

    if (this.resolvedConfig()?.autoResize && this.isTextarea()) {
      this.applyAutoResize(event.target as HTMLElement);
    }

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


  private readonly applyAutoResize = (el: HTMLElement): void => {
    const textarea = el as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
}

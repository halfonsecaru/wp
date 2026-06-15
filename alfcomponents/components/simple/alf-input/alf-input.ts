import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  generateUniqueId,
} from '@alfcomponents/shared';
import { AlfInputTypeEnum, AlfInputAppearanceEnum, AlfInputAdornmentEnum, AlfColorEnum, AlfRemEnum, AlfColorVariantEnum } from '@alfcomponents/enums';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfSpinner } from '@alfcomponents/components/simple/alf-spinner/alf-spinner';
import { AlfInputInterface } from './interfaces/alf-input.interface';
import { getAlfInputLabel, AlfInputI18nLabels } from './i18n/alf-input.i18n';
import { AlfBaseDirectives, AlfComponentTypeEnum, deepMergeStates } from '@alfcomponents/components/base/bases.directive';
import { generatedComponentFunction, calculateErrorBorder, calculateErrorTextStyle, calculateErrorBackground } from './alf-input-functions';

@Component({
  selector: 'alf-input',
  standalone: true,
  imports: [...ALF_CORE_DIRECTIVES, AlfSpinner],
  templateUrl: './alf-input.html',
  styleUrl: './alf-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AlfInput),
      multi: true
    }
  ],
  host: {}
})
export class AlfInput extends AlfBaseDirectives implements ControlValueAccessor {
  // ── 1. Constants & View Queries ───────────────────────────────────────────
  protected readonly AlfRemEnum = AlfRemEnum;
  private readonly inputElement = viewChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('inputRef');

  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  public readonly value = model<string>();
  protected readonly inputConfig = input<AlfInputInterface | undefined>(undefined, { alias: 'config' });
  protected readonly id = input<string>();
  protected readonly label = input<string>();
  protected readonly placeholder = input<string>();
  protected readonly inputType = input<AlfInputTypeEnum | string | undefined>(undefined, { alias: 'type' });
  protected readonly helperText = input<string>();
  protected readonly appearance = input<AlfInputAppearanceEnum>();
  protected readonly prefix = input<string | AlfInputAdornmentEnum>();
  protected readonly suffix = input<string | AlfInputAdornmentEnum>();
  protected readonly readonly = input<boolean>();
  protected readonly step = input<number>();
  protected readonly autofocus = input<boolean>();
  protected readonly autocomplete = input<string>();
  protected readonly clearable = input<boolean>();
  protected readonly showPasswordToggle = input<boolean>();
  protected readonly showCharCounter = input<boolean>();
  protected readonly clearOnClick = input<boolean>();
  protected readonly debounceTime = input<number>();

  // ── 3. Outputs ────────────────────────────────────────────────────────────
  public readonly onInput = output<string>();
  public readonly onClear = output<void>();

  // ── 4. Internal State (Signals & Variables) ───────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: this.baseCssClass() });
  protected readonly isPasswordVisible = signal<boolean>(false);
  protected readonly internalDisabled = signal<boolean>(false);
  private debounceTimerId: any = null;

  // ── 5. Computed State (Derived from Inputs & State) ───────────────────────
  protected readonly idComputed = computed(() => this.id() ?? this.inputConfig()?.id ?? this.internalId);
  protected readonly labelComputed = computed<string | null>(() => this.label() ?? this.inputConfig()?.label ?? null);
  protected readonly placeholderComputed = computed(() => this.placeholder() ?? this.inputConfig()?.placeholder ?? undefined);
  protected readonly inputTypeComputed = computed(() => {

    const type = this.inputType() ?? this.inputConfig()?.inputType;
    if (!type || (type === AlfInputTypeEnum.Password && this.isPasswordVisible())) return 'text';
    return type;
  });

  protected readonly helperTextComputed = computed(() => this.helperText() ?? this.inputConfig()?.helperText);
  protected readonly appearanceComputed = computed(() => this.appearance() ?? this.inputConfig()?.appearance ?? AlfInputAppearanceEnum.Standard);
  protected readonly prefixComputed = computed(() => this.prefix() ?? this.inputConfig()?.prefix);
  protected readonly suffixComputed = computed(() => this.suffix() ?? this.inputConfig()?.suffix);
  protected readonly stepComputed = computed(() => this.step() ?? this.inputConfig()?.step);
  protected readonly autofocusComputed = computed(() => this.autofocus() ?? this.inputConfig()?.autofocus ?? false);
  protected readonly autocompleteComputed = computed(() => this.autocomplete() ?? this.inputConfig()?.autocomplete);
  protected readonly clearableComputed = computed(() => this.clearable() ?? this.inputConfig()?.clearable ?? false);
  protected readonly clearOnClickComputed = computed(() => this.clearOnClick() ?? this.inputConfig()?.clearOnClick ?? false);
  protected readonly showPasswordToggleComputed = computed(() => {
    const type = this.inputType() ?? this.inputConfig()?.inputType;
    return type === AlfInputTypeEnum.Password && (this.showPasswordToggle() ?? this.inputConfig()?.showPasswordToggle !== false);
  });
  protected readonly showCharCounterComputed = computed(() =>
    (this.showCharCounter() && this.maxLength()) ||
    (this.inputConfig()?.showCharCounter && this.inputConfig()?.maxLength)
  );
  protected readonly disabledComputed = computed(() => this.disabled() || this.internalDisabled() || (this.inputConfig()?.disabled ?? false));
  protected readonly isReadonly = computed(() => this.readonly() ?? this.inputConfig()?.readonly ?? false);

  protected readonly hasSuffix = computed(() =>
    this.suffix() ||
    this.inputConfig()?.suffix ||
    this.showPasswordToggleComputed() ||
    this.showPasswordToggleComputed() ||
    this.showClear()
  );

  protected readonly hasContrastingLabel = computed(() => {
    const v = this.variant();
    if (!v) return false;
    const str = v.toString();
    return str.includes('depth-') || str.includes('gradient-') || !str.includes('-');
  });

  protected readonly shouldFloat = computed(() => {
    const v = this.value() ?? '';
    return this.isFocused() || v.length > 0;
  });

  protected readonly showClear = computed(() => {
    const cfg = this.inputConfig();
    const v = this.value() ?? '';
    return cfg?.clearable &&
      v.length > 0 &&
      !this.disabledComputed() &&
      !this.isReadonly() &&
      !this.isLoading();
  });

  // ── 6. i18n Labels ────────────────────────────────────────────────────────
  protected readonly clearLabel = computed(() => getAlfInputLabel('clearAriaLabel'));
  protected readonly showPwdLabel = computed(() => getAlfInputLabel('showPassword'));
  protected readonly hidePwdLabel = computed(() => getAlfInputLabel('hidePassword'));
  protected readonly loadingLabel = computed(() => getAlfInputLabel('loading'));

  // ── 7. Styling Computeds & Overrides ──────────────────────────────────────
  protected readonly generatedComponent = computed(() => {
    const appearance = this.appearanceComputed();
    const currentVariant = this.variant() ?? AlfColorVariantEnum.SecondaryOutline;

    const ccc = generatedComponentFunction(
      this.predefinedInputComponent(),
      appearance,
      currentVariant,
      (v: AlfColorVariantEnum) => this.createSolidComponentSoftBackground(v),
      (v: AlfColorVariantEnum) => this.create3dComponentSolidText(v),
      (v: AlfColorVariantEnum) => this.createSolidComponent(v)
    );
    return ccc;
  });

  protected readonly finalPaddingComputed = computed(() => {
    const comp = this.generatedComponent();
    return deepMergeStates(comp?.padding, this.paddingComputed());
  });

  protected readonly colorComputed = computed(() => {
    const err = this.errorComputed();
    if (!err) return null;
    return this.inputConfig()?.border?.default?.borderColor ?? AlfColorEnum.Danger;
  });

  protected readonly inputBorderComputed = computed(() => {
    const comp = this.generatedComponent();
    const baseBorder = deepMergeStates(comp?.border, this.borderComputed());
    const color = this.colorComputed();
    return calculateErrorBorder(baseBorder, color);
  });

  protected readonly inputTextStyleComputed = computed(() => {
    const comp = this.generatedComponent();
    const baseTextStyle = deepMergeStates(comp?.textStyle, this.textStyleComputed());
    const color = this.colorComputed();
    return calculateErrorTextStyle(baseTextStyle, color);
  });

  protected readonly inputBackgroundComputed = computed(() => {
    const comp = this.generatedComponent();
    const baseBackground = deepMergeStates(comp?.background, this.backgroundComputed());
    const hasError = !!this.errorComputed();
    return calculateErrorBackground(baseBackground, hasError);
  });


  // ── 7.1. ControlValueAccessor Implementation ──────────────────────────────────────────────
  protected getControlValue = (): string => {
    return this.value();
  }
  protected getControlType(): string {
    return this.inputTypeComputed();
  }
  protected getValidationLabel(key: string) {
    return getAlfInputLabel(key as keyof AlfInputI18nLabels);
  }
  protected getControlConfig() {
    return this.inputConfig();
  }
  protected setControlValue(val: any): void {
    this.value.set(val === null || val === undefined ? '' : String(val));
  }
  protected setControlDisabled(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }

  // ── 8. Constructor ────────────────────────────────────────────────────────
  constructor() {
    super();
    this.initialization('--alf-inp', 'alf-input', AlfComponentTypeEnum.Input);
  }

  // ── 9. Handlers & Public API ──────────────────────────────────────────────
  protected readonly handleInput = (event: Event): void => {
    this.markAsDirty();
    const val = (event.target as HTMLInputElement).value;
    const time = this.debounceTime() ?? this.inputConfig()?.debounceTime ?? 0;

    if (time > 0) {
      if (this.debounceTimerId) clearTimeout(this.debounceTimerId);
      this.debounceTimerId = setTimeout(() => {
        this.value.set(val);
        this.onInput.emit(val);
        if (this.onChange) this.onChange(val);
      }, time);
    } else {
      this.value.set(val);
      this.onInput.emit(val);
      if (this.onChange) this.onChange(val);
    }
  };

  protected readonly handleClick = (event: MouseEvent): void => {
    if (this.clearOnClickComputed() && this.value()) {
      this.value.set('');
    }
  };

  protected readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (this.inputTypeComputed() === AlfInputTypeEnum.Number || this.inputTypeComputed() === 'number') {
      if (event.key === 'e' || event.key === 'E') {
        event.preventDefault();
      }
    }
  };

  public readonly focusInput = (): void => {
    const el = this.inputElement();
    if (el && !this.disabledComputed()) el.nativeElement.focus();
  };

  protected readonly clear = (event: MouseEvent): void => {
    event.stopPropagation();
    this.value.set('');
    this.onClear.emit();
    this.focusInput();
  };

  protected readonly togglePassword = (event: MouseEvent): void => {
    event.stopPropagation();
    this.isPasswordVisible.update(v => !v);
  };

  // ── 10. Private Helpers ───────────────────────────────────────────────────
  /**
   * Resuelve el atributo type HTML real para el elemento input nativo.
   * El tipo 'textarea' no es un type HTML válido, se trata como elemento separado.
   */
  // private resolveInputTypeAttr = (type?: AlfInputTypeEnum): string => {
  //   if (!type) return 'text';
  //   return type;
  // };
}

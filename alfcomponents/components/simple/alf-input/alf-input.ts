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
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  generateUniqueId,
  visualprefixEnum,
} from '@alfcomponents/shared';
import { AlfInputTypeEnum, AlfInputAppearanceEnum, AlfColorEnum, AlfRemEnum, AlfIconsUnicodeIconEnum, AlfIconsEmojiIconEnum } from '@alfcomponents/enums';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfSpinner } from '@alfcomponents/components/simple/alf-spinner/alf-spinner';
import { getAlfInputLabel, AlfInputI18nLabels } from './i18n/alf-input.i18n';
import { AlfBaseDirectives } from '@alfcomponents/components/base/bases.directive';
import { calculateErrorBorder, calculateErrorTextStyle, calculateErrorBackground, calculateErrorTypography } from './alf-input-functions';
import { AlfRippleInterface } from '@alfcomponents/interfaces';
import { AlfComponentTypeEnum } from '@alfcomponents/components/base/enum/AlfComponentType.enum';

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
export class AlfInput extends AlfBaseDirectives {
  // ── 1. Constants & View Queries ───────────────────────────────────────────
  protected readonly AlfRemEnum = AlfRemEnum;
  protected readonly AlfInputAppearanceEnum = AlfInputAppearanceEnum;
  private readonly inputElement = viewChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('inputRef');

  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  public readonly value = model<string>();
  public override readonly ripple = input<boolean | AlfRippleInterface | undefined>(false);
  protected readonly id = input<string>();
  protected readonly label = input<string>();
  protected readonly placeholder = input<string>();
  protected readonly inputType = input<AlfInputTypeEnum>(undefined, { alias: 'type' });
  protected readonly helperText = input<string>();
  protected readonly appearance = input<AlfInputAppearanceEnum>(AlfInputAppearanceEnum.Standard);
  protected readonly prefix = input<string | AlfIconsEmojiIconEnum | AlfIconsUnicodeIconEnum>();
  protected readonly suffix = input<string | AlfIconsEmojiIconEnum | AlfIconsUnicodeIconEnum>();
  protected readonly readonly = input<boolean>(false);
  protected readonly step = input<number>();
  protected readonly autofocus = input<boolean>(false);
  protected readonly autocomplete = input<string>();
  protected readonly clearable = input<boolean>(false);
  protected readonly showPasswordToggle = input<boolean>();
  protected readonly showCharCounter = input<boolean>();
  protected readonly clearOnClick = input<boolean>(false);
  protected readonly forceFloat = input<boolean>(false);
  protected readonly debounceTime = input<number>();

  // ── 3. Outputs ────────────────────────────────────────────────────────────
  public readonly onInput = output<string>();
  public readonly onClear = output<void>();
  public readonly onClick = output<MouseEvent>();
  public readonly onFocus = output<FocusEvent>();
  public readonly onBlur = output<FocusEvent>();

  // ── 4. Internal State (Signals & Variables) ───────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: visualprefixEnum.Input });
  protected readonly isPasswordVisible = signal<boolean>(false);
  private debounceTimerId: any = null;

  // ── 5. Computed State (Derived from Inputs & State) ───────────────────────
  protected readonly idComputed = computed(() => this.id() ?? this.internalId);

  protected readonly inputTypeComputed = computed(() => {
    const type = this.inputType();
    if (!type || (type === AlfInputTypeEnum.Password && this.isPasswordVisible())) return 'text';
    return type;
  });

  protected readonly showPasswordToggleComputed = computed(() => {
    const type = this.inputType();
    return type === AlfInputTypeEnum.Password && (this.showPasswordToggle() !== false);
  });

  protected readonly showCharCounterComputed = computed(() =>
    this.showCharCounter() && this.maxLength()
  );

  protected readonly hasSuffix = computed(() =>
    this.suffix() ||
    this.showPasswordToggleComputed() ||
    this.showClear()
  );

  protected readonly hasContrastingLabel = computed(() => {
    const v = this.variant();
    if (!v) return false;
    const str = v.toString();
    return str.includes('depth-') || str.includes('gradient-') || !str.includes('-');
  });

  protected readonly contrastingLabelColor = computed(() => {
    const v = this.variant();
    if (!v) return null;
    const str = v.toString();
    if (str.includes('depth-')) {
      const baseColor = str.split('-')[1];
      switch (baseColor) {
        case 'primary': return 'var(--alf-primary, #0d6efd)';
        case 'secondary': return 'var(--alf-secondary, #6c757d)';
        case 'success': return 'var(--alf-success, #198754)';
        case 'danger': return 'var(--alf-danger, #dc3545)';
        case 'warning': return 'var(--alf-warning, #ffc107)';
        case 'info': return 'var(--alf-info, #0dcaf0)';
        case 'light': return 'var(--alf-dark, #212529)';
        case 'dark': return 'var(--alf-dark, #212529)';
        default: return 'var(--alf-primary, #0d6efd)';
      }
    }
    return null;
  });

  protected readonly shouldFloat = computed(() => {
    const v = this.value() ?? '';
    return this.isFocused() || v.length > 0 || this.forceFloat();
  });

  protected readonly showClear = computed(() => {
    const v = this.value() ?? '';
    return this.clearable() &&
      v.length > 0 &&
      !this.disabledComputed() &&
      !this.readonly() &&
      !this.isLoading();
  });

  protected readonly clearLabel = computed(() => getAlfInputLabel('clearAriaLabel'));
  protected readonly showPwdLabel = computed(() => getAlfInputLabel('showPassword'));
  protected readonly hidePwdLabel = computed(() => getAlfInputLabel('hidePassword'));
  protected readonly loadingLabel = computed(() => getAlfInputLabel('loading'));

  // ── 6. Styling Computeds & Overrides ──────────────────────────────────────
  protected readonly colorComputed = computed(() => {
    const err = this.errorComputed();
    if (!err) return null;
    return AlfColorEnum.Danger;
  });

  protected readonly inputBorderComputed = computed(() => {
    const baseBorder = this.borderComputed();
    const color = this.colorComputed();
    return calculateErrorBorder(baseBorder, color);
  });

  protected readonly inputTextStyleComputed = computed(() => {
    const baseTextStyle = this.textStyleComputed();
    const color = this.colorComputed();
    return calculateErrorTextStyle(baseTextStyle, color);
  });

  protected readonly inputBackgroundComputed = computed(() => {
    const baseBackground = this.backgroundComputed();
    const hasError = !!this.errorComputed();
    return calculateErrorBackground(baseBackground, hasError);
  });

  protected readonly inputTypographyComputed = computed(() => {
    const baseTypography = this.typographyComputed();
    const color = this.colorComputed();
    return calculateErrorTypography(baseTypography, color);
  });


  // ── 6. Effects ────────────────────────────────────────────────────────────
  private readonly appearanceEffect = effect(() => this.setAppearance(this.appearance()));


  // ── 7 ControlValueAccessor Implementation ──────────────────────────────────────────────
  /**
   * Getter interno para que el motor base (ej. validadores) sepa qué valor tiene el input actualmente.
   */
  protected getControlValue = (): string => {
    return this.value();
  }

  /**
   * Define el tipo de control para el engine base (útil si la clase base hace switch de lógicas por tipo de input).
   */
  protected getControlType(): string {
    return this.inputTypeComputed();
  }

  /**
   * Conecta el motor base de validaciones con el diccionario de i18n
   * para devolver los mensajes de error traducidos según el idioma actual.
   */
  protected getValidationLabel(key: string) {
    return getAlfInputLabel(key as keyof AlfInputI18nLabels);
  }

  /**
   * Implementación del patrón ControlValueAccessor (Reactive Forms / ngModel).
   * Se ejecuta cuando el formulario inyecta un valor (ej. form.patchValue).
   */
  protected setControlValue(val: any): void {
    this.value.set(val === null || val === undefined ? '' : String(val));
  }



  // ── 8. Constructor ────────────────────────────────────────────────────────
  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.Input);
    this.initialization(visualprefixEnum.Input, visualprefixEnum.Inputt, AlfComponentTypeEnum.Input);
  }

  // ── 9. Handlers & Public API ──────────────────────────────────────────────
  protected readonly handleInput = (event: Event): void => {
    this.markAsDirty();
    const val = (event.target as HTMLInputElement).value;
    const time = this.debounceTime() ?? 0;

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
    this.onClick.emit(event);
    if (this.clearOnClick() && this.value()) {
      this.value.set('');
    }
  };

  protected readonly handleFocus = (event: FocusEvent): void => {
    this.isFocused.set(true);
    this.onFocus.emit(event);
  };

  protected readonly handleBlur = (event: FocusEvent): void => {
    this.markAsDirty();
    this.isFocused.set(false);
    this.onBlur.emit(event);
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


}

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
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import {
  AlfRadioButtonVariantEnum,
  AlfSizeEnum,
  AlfIconsUnicodeIconEnum,
  AlfColorVariantEnum,
  AlfRadiusEnum
} from '@alfcomponents/enums';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfSpinner } from '../alf-spinner/alf-spinner';
import { AlfRadioButtonInterface } from './interfaces/alf-radio-button.interface';

import { AlfBaseDirectives, AlfComponentTypeEnum, deepMergeStates } from '@alfcomponents/components/base/bases.directive';
import { AlfRadioButtonI18nLabels, getAlfRadioButtonLabel } from './i18n/alf-radio-button-i18n';

@Component({
  selector: 'alf-radio-button',
  standalone: true,
  imports: [...ALF_CORE_DIRECTIVES, AlfSpinner],
  templateUrl: './alf-radio-button.html',
  styleUrl: './alf-radio-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlfRadioButton extends AlfBaseDirectives {


  // ── 1. Constants & View Queries ───────────────────────────────────────────
  protected readonly cssVarPrefix: string = visualprefixEnum.RadioButton as string;
  protected readonly classPrefix: string = visualprefixEnum.RadioClass;

  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  public readonly checked = model<boolean>(false);

  public readonly id = input<string>();
  public readonly inputConfig = input<AlfRadioButtonInterface>(undefined, { alias: 'config' });
  public readonly label = input<string>();
  public readonly labelText = input<string>(undefined, { alias: 'labelText' });
  public readonly value = input<any>(undefined);
  public readonly name = input<string>(undefined);
  public readonly radioButtonStyle = input<AlfRadioButtonVariantEnum>();
  public readonly helperText = input<string>();
  public readonly iconSelected = input<AlfIconsUnicodeIconEnum | string>();
  public readonly predefined = input<keyof AlfRadioButtonI18nLabels>();
  public readonly labelPosition = input<"before" | "after">("after");

  // Internal State Signals
  protected readonly _label = signal<string>(undefined);

  // ── 3. Outputs and state signals ────────────────────────────────────────────────────────

  public readonly focused = signal<boolean>(false);
  public readonly hovered = signal<boolean>(false);
  public readonly onCheckedChange = output<any>();

  // ── 4. Internal State (Signals & Variables) ─────────────────────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: this.classPrefix });

  // ── 5. Computed State (Derived from Inputs & State) ───────────────────────
  protected readonly idComputed = computed(() => this.id() ?? this.inputConfig()?.id ?? this.internalId);

  protected readonly labelComputed = computed<string | null>(() => {
    // Prefer explicit label input/config; internal CVA label is only a fallback.
    const explicitLabel = this.label() ?? this.labelText() ?? this.inputConfig()?.label;
    if (explicitLabel) return explicitLabel;

    const internalLabel = this._label();
    if (internalLabel) return internalLabel;

    const pref = this.predefined() ?? this.inputConfig()?.predefined;
    if (pref) return getAlfRadioButtonLabel(pref as keyof AlfRadioButtonI18nLabels);

    return '';
  });


  protected readonly predefinedConfig = computed(() => {
    const currentVariant = this.variant() ?? AlfColorVariantEnum.SecondaryOutline;
    const vStr = currentVariant.toString();
    const style = this.radioButtonStyle() ?? this.inputConfig()?.radioButtonStyle ?? AlfRadioButtonVariantEnum.Elegant;

    let comp;
    if (vStr.includes('soft-')) {
      comp = this.createSolidComponentSoftBackground(currentVariant);
    } else if (vStr.includes('depth-')) {
      comp = this.create3dComponentSolidText(currentVariant);
    } else {
      comp = this.createSolidComponent(currentVariant);
    }

    // Override label color for solid, gradient, and 3D variants
    // so the label matches the base color (which is stored in border color) instead of being white.
    // Soft, outline, ghost, and crystal already handle their text color appropriately.
    if (
      !vStr.includes('outline-') &&
      !vStr.includes('ghost-') &&
      !vStr.includes('soft-') &&
      !vStr.includes('crystal-') &&
      vStr !== 'transparent' &&
      vStr !== 'Default') {

      if (comp.border) {
        if (!comp.typography) comp.typography = {
          default: { color: comp.border.default?.borderColor }
        };
      }

    }

    if (style === AlfRadioButtonVariantEnum.Standard) {
      comp.border.default.borderRadius = AlfRadiusEnum.Sm;
    } else {
      comp.border.default.borderRadius = AlfRadiusEnum.Full;
    }

    return {
      backgrounds: comp.background,
      border: comp.border,
      padding: comp.padding,
      textStyle: comp.textStyle,
      typography: comp.typography,
      shadows: comp.shadows
    };

  });

  public readonly radioButtonStyleComputed = computed<AlfRadioButtonVariantEnum>(
    () => this.radioButtonStyle() ?? this.inputConfig()?.radioButtonStyle ?? AlfRadioButtonVariantEnum.Elegant
  );

  public readonly labelPositionComputed = computed<'before' | 'after'>(
    () => this.labelPosition() ?? this.inputConfig()?.labelPosition ?? 'after'
  );

  public readonly sizeComputed = computed<AlfSizeEnum>(() =>
    (this.size() as AlfSizeEnum) ?? (this.inputConfig()?.size as AlfSizeEnum) ?? AlfSizeEnum.MD);

  // ── 6. Constructor ────────────────────────────────────────────────────────
  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.RadioButton);
    this.initialization(visualprefixEnum.RadioButton, visualprefixEnum.Radio, AlfComponentTypeEnum.RadioButton);
  };


  // ── 7. Handlers & Public API ──────────────────────────────────────────────

  public readonly select = (): void => {
    if (this.disabledComputed() || this.checked()) return;
    this.checked.set(true);
    this.onCheckedChange.emit(this.value() ?? this.inputConfig()?.value);
  };

  public readonly onInputChange = (event: Event): void => {
    if (this.disabledComputed()) return;
    this.select();
  };

  protected readonly onLabelClick = (event: Event): void => {
    if (this.disabledComputed()) return;
    event.preventDefault();
    this.select();
  };

  // /** Keyboard support (Space/Enter) */
  protected readonly onInputKeydown = (event: KeyboardEvent): void => {
    if (this.disabledComputed()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.select();
    }
  };

  // ── 8 ControlValueAccessor & Core Implementation ──────────────────────────────────────────────

  /**
   * Getter interno para que el motor base (ej. validadores) sepa qué valor tiene el botón actualmente.
   */
  protected getControlValue = (): string => {
    return this._label() ?? this.label() ?? this.inputConfig()?.label ?? '';
  }

  /**
   * Define el tipo de control para el engine base (útil si la clase base hace switch de lógicas por tipo).
   */
  protected getControlType(): string {
    return AlfComponentTypeEnum.RadioButton;
  }

  /**
   * Conecta el motor base de validaciones con el diccionario de i18n
   * para devolver los mensajes de error traducidos según el idioma actual.
   */
  protected getValidationLabel(key: string) {
    return getAlfRadioButtonLabel(key as keyof AlfRadioButtonI18nLabels);
  }

  /**
   * Núcleo del motor de diseño: fusiona la configuración visual calculada internamente
   * con cualquier configuración global/manual que el usuario pase por inputConfig.
   */
  protected getControlConfig() {
    return deepMergeStates(this.predefinedConfig(), this.inputConfig());
  }

  /**
   * Implementación del patrón ControlValueAccessor (Reactive Forms / ngModel).
   * Se ejecuta cuando el formulario inyecta un valor (ej. form.patchValue).
   */
  protected setControlValue(val: any): void {
    this._label.set(val === null || val === undefined ? '' : String(val));
  }

}

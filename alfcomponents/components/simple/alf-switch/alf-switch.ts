import { ChangeDetectionStrategy, Component, computed, input, model, output, signal, ViewEncapsulation } from '@angular/core';
import { AlfSwitchInterface, AlfSwitchVariantEnum } from './interfaces/alf-switch.interface';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfLabelsPositionEnum, AlfColorVariantEnum, AlfSizeEnum, AlfRadiusEnum, AlfColorEnum } from '@alfcomponents/enums';

import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfBaseDirectives, deepMergeStates } from '@alfcomponents/components/base/bases.directive';
import { AlfSwitchI18nLabels, getAlfSwitchLabel } from './i18n/switch-i18n';
import { AlfSpinner } from '../alf-spinner/alf-spinner';
import { AlfRemEnum } from '@alfcomponents/enums';
import { resetAlfBorderRadiusAndGiveBorder } from '@alfcomponents/shared/functions/generateStyles';

type SwitchCompConfig = {
  background: any;
  border: any;
  padding: any;
  textStyle: any;
  shadows?: any;
  typography?: {
    default?: { color?: string };
    hover?: { color?: string };
    focus?: { color?: string };
    active?: { color?: string };
    disabled?: { color?: string };
  };
};



@Component({
  selector: 'alf-switch',
  standalone: true,
  imports: [...ALF_CORE_DIRECTIVES, AlfSpinner],
  templateUrl: './alf-switch.html',
  styleUrl: './alf-switch.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlfSwitch extends AlfBaseDirectives<AlfSwitchInterface> {

  // ── 1. Constants & View Queries ───────────────────────────────────────────
  public readonly AlfRemEnum = AlfRemEnum;
  protected readonly cssVarPrefix: string = visualprefixEnum.Switch as string;
  protected readonly classPrefix: string = visualprefixEnum.SwitchPrefix as string;

  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  public readonly checked = model<boolean>(false);


  public readonly id = input<string>();
  public readonly inputConfig = input<AlfSwitchInterface>(undefined, { alias: 'config' });
  public readonly label = input<string | undefined>();
  public readonly labelText = input<string | undefined>(undefined, { alias: 'labelText' });
  public readonly switchStyle = input<AlfSwitchVariantEnum | 'standard' | 'elegant'>(AlfSwitchVariantEnum.Elegant);
  public readonly name = input<string>();
  public readonly helperText = input<string | undefined>();
  public readonly labelPosition = input<AlfLabelsPositionEnum | 'before' | 'after'>(AlfLabelsPositionEnum.After);
  public readonly predefined = input<keyof AlfSwitchI18nLabels>();
  public readonly colorSwitch = input<AlfColorEnum | string | undefined>(undefined);

  // Workaround for strict template checker not resolving inherited signal/computed members.


  // A) Generales a todo el componente
  //protected override readonly visualPrefix: string = visualprefixEnum.Switch;
  //protected override readonly componentType = AlfComponentTypeEnum.Switch;

  // Internal State Signals
  protected readonly _label = signal<string>(undefined);
  private readonly _disabled = signal<boolean>(false);

  // ── 3. Outputs and state signals ────────────────────────────────────────────────────────
  public readonly focused = signal<boolean>(false);
  public readonly hovered = signal<boolean>(false);
  public readonly onCheckedChange = output<boolean>();


  // ── 4. Internal State (Signals & Variables) ─────────────────────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: this.classPrefix });

  // ── 5. Computed State (Derived from Inputs & State) ───────────────────────
  protected readonly idComputed = computed(() => this.id() ?? this.inputConfig()?.id ?? this.internalId);

  public readonly disabledComputed = computed<boolean>(() => {
    return !!(this.disabled() || this.inputConfig()?.disabled || this._disabled());
  });

  protected readonly labelComputed = computed<string | null>(() => {
    // Prefer explicit label input/config; internal CVA label is only a fallback.
    const explicitLabel = this.label() ?? this.labelText() ?? this.inputConfig()?.label;
    if (explicitLabel) return explicitLabel;

    const internalLabel = this._label();
    if (internalLabel) return internalLabel;

    const pref = this.predefined() ?? this.inputConfig()?.predefined;
    if (pref) return getAlfSwitchLabel(pref as keyof AlfSwitchI18nLabels);

    return '';
  });

  public readonly switchStyleComputed = computed<AlfSwitchVariantEnum>(() =>
    (this.switchStyle() ?? this.inputConfig()?.switchStyle ?? AlfSwitchVariantEnum.Elegant) as AlfSwitchVariantEnum
  );

  protected readonly predefinedConfig = computed(() => {
    const currentVariant = this.variant() ?? this.inputConfig()?.variant ?? AlfColorVariantEnum.SecondaryOutline;
    const currentSwitchStyle = this.switchStyleComputed();

    return getSwitch(
      currentVariant,
      currentSwitchStyle,
      (v) => this.createSolidComponentSoftBackground(v),
      (v) => this.create3dComponentSolidText(v),
      (v) => this.createSolidComponent(v)
    );
  });

  public readonly labelPositionComputed = computed<AlfLabelsPositionEnum>(
    () => (this.labelPosition() ?? this.inputConfig()?.labelPosition ?? AlfLabelsPositionEnum.After) as AlfLabelsPositionEnum
  );

  public readonly sizeComputed = computed<AlfSizeEnum>(() =>
    (this.size() as AlfSizeEnum) ?? (this.inputConfig()?.size as AlfSizeEnum) ?? AlfSizeEnum.MD);

  public readonly isOutlineVariant = computed<boolean>(() => {
    const currentVariant = this.variant() ?? AlfColorVariantEnum.Secondary;
    const vStr = currentVariant.toString();
    return vStr.includes('outline-');
  });


  protected readonly colorSwitchComputed = computed<AlfColorEnum | string | undefined>(() =>
    this.colorSwitch() ?? this.inputConfig()?.colorSwitch
  );

  // ── 6. Constructor ────────────────────────────────────────────────────────
  constructor() {
    super();
    this.initialization(this.cssVarPrefix, visualprefixEnum.SwitchClass, AlfComponentTypeEnum.Switch);
  };


  // ── 7. Handlers & Public API ──────────────────────────────────────────────

  public readonly toggle = (): void => {
    if (this.disabledComputed() || this.isLoading()) return;
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onCheckedChange.emit(newValue);
  };

  protected readonly onInputKeydown = (event: KeyboardEvent): void => {
    if (this.disabledComputed() || this.isLoading()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
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
    return getAlfSwitchLabel(key as keyof AlfSwitchI18nLabels);
  }

  /**
   * Núcleo del motor de diseño: fusiona la configuración visual calculada internamente
   * con cualquier configuración global/manual que el usuario pase por inputConfig.
   */
  protected getControlConfig() {
    const thumbColor = this.colorSwitchComputed();

    const thumbColorConfig = thumbColor
      ? {
        textStyle: {
          default: { color: thumbColor },
        }
      }
      : undefined;

    return deepMergeStates(this.predefinedConfig(), this.inputConfig(), thumbColorConfig);
  }

  /**
   * Implementación del patrón ControlValueAccessor (Reactive Forms / ngModel).
   * Se ejecuta cuando el formulario inyecta un valor (ej. form.patchValue).
   */
  protected setControlValue(val: any): void {
    this._label.set(val === null || val === undefined ? '' : String(val));
  }

  /**
   * Implementación del patrón ControlValueAccessor.
   * Se ejecuta automáticamente cuando el formGroup deshabilita o habilita el control.
   */
  protected setControlDisabled(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

}


const getSwitch = (
  currentVariant: AlfColorVariantEnum,
  currentSwitchStyle: AlfSwitchVariantEnum,
  createSolidComponentSoftBackground: (variant: AlfColorVariantEnum) => SwitchCompConfig,
  create3dComponentSolidText: (variant: AlfColorVariantEnum) => SwitchCompConfig,
  createSolidComponent: (variant: AlfColorVariantEnum) => SwitchCompConfig
) => {

  const vStr = currentVariant.toString();

  let comp: SwitchCompConfig;
  if (vStr.includes('soft-')) {
    comp = createSolidComponentSoftBackground(currentVariant);
  } else if (vStr.includes('depth-')) {
    comp = create3dComponentSolidText(currentVariant);
  } else {
    comp = createSolidComponent(currentVariant);
  }

  if (currentSwitchStyle === AlfSwitchVariantEnum.Standard) {
    resetAlfBorderRadiusAndGiveBorder(AlfRadiusEnum.Lg, comp);
  } else {
    resetAlfBorderRadiusAndGiveBorder(AlfRadiusEnum.Full, comp);
  }

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

  const finalConfig = {
    backgrounds: comp.background,
    border: comp.border,
    padding: comp.padding,
    textStyle: comp.textStyle,
    typography: comp.typography,
    shadows: comp.shadows
  };

  return finalConfig;
}
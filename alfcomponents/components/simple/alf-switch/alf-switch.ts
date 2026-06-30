import { ChangeDetectionStrategy, Component, computed, input, model, output, signal, ViewEncapsulation } from '@angular/core';
import { AlfSwitchVariantEnum } from './interfaces/alf-switch.interface';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfLabelsPositionEnum, AlfColorEnum } from '@alfcomponents/enums';

import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfBaseDirectives } from '@alfcomponents/components/base/bases.directive';
import { AlfSwitchI18nLabels, getAlfSwitchLabel } from './i18n/switch-i18n';
import { AlfSpinner } from '../alf-spinner/alf-spinner';
import { AlfRemEnum } from '@alfcomponents/enums';
import { AlfComponentTypeEnum } from '@alfcomponents/components/base/enum/AlfComponentType.enum';



@Component({
  selector: 'alf-switch',
  standalone: true,
  imports: [...ALF_CORE_DIRECTIVES, AlfSpinner],
  templateUrl: './alf-switch.html',
  styleUrl: './alf-switch.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlfSwitch extends AlfBaseDirectives {

  // ── 1. Constants & View Queries ───────────────────────────────────────────
  public readonly AlfRemEnum = AlfRemEnum;
  protected readonly cssVarPrefix: string = visualprefixEnum.Switch as string;
  protected readonly classPrefix: string = visualprefixEnum.SwitchPrefix as string;

  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  public readonly checked = model<boolean>(false);


  public readonly id = input<string>();
  public readonly label = input<string | undefined>();
  public readonly labelText = input<string | undefined>(undefined, { alias: 'labelText' });
  public readonly switchStyle = input<AlfSwitchVariantEnum | 'standard' | 'elegant'>(AlfSwitchVariantEnum.Elegant);
  public readonly name = input<string>();
  public readonly helperText = input<string | undefined>();
  public readonly labelPosition = input<AlfLabelsPositionEnum | 'before' | 'after'>(AlfLabelsPositionEnum.After);
  public readonly predefined = input<keyof AlfSwitchI18nLabels>();
  public readonly colorSwitch = input<AlfColorEnum | string | undefined>(undefined);

  // Internal State Signals
  protected readonly _label = signal<string>(undefined);

  // ── 3. Outputs and state signals ────────────────────────────────────────────────────────
  public readonly focused = signal<boolean>(false);
  public readonly hovered = signal<boolean>(false);
  public readonly onCheckedChange = output<boolean>();


  // ── 4. Internal State (Signals & Variables) ─────────────────────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: this.classPrefix });

  // ── 5. Computed State (Derived from Inputs & State) ───────────────────────
  protected readonly idComputed = computed(() => this.id() ?? this.internalId);


  protected readonly labelComputed = computed<string | null>(() => {
    // Prefer explicit label input/config; internal CVA label is only a fallback.
    const explicitLabel = this._label() ?? this.label() ?? this.labelText();
    if (explicitLabel) return explicitLabel;

    const internalLabel = this._label();
    if (internalLabel) return internalLabel;

    const pref = this.predefined();
    if (pref) return getAlfSwitchLabel(pref as keyof AlfSwitchI18nLabels);

    return '';
  });







  // ── 6. Constructor ────────────────────────────────────────────────────────
  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.Switch);
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
    return this._label() ?? this.label() ?? '';
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
    const thumbColor = this.colorSwitch();

    return thumbColor
      ? {
        textStyle: {
          default: { color: thumbColor },
        }
      }
      : undefined;
  }

  /**
   * Implementación del patrón ControlValueAccessor (Reactive Forms / ngModel).
   * Se ejecuta cuando el formulario inyecta un valor (ej. form.patchValue).
   */
  protected setControlValue(val: any): void {
    this._label.set(val === null || val === undefined ? '' : String(val));
  }

}
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
  AlfColorVariantEnum
} from '@alfcomponents/enums';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfSpinner } from '../alf-spinner/alf-spinner';
import { AlfRadioButtonInterface } from './interfaces/alf-radio-button.interface';

import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { AlfBaseDirectives, deepMergeStates } from '@alfcomponents/components/base/bases.directive';
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
export class AlfRadioButton extends AlfBaseDirectives{

  
  // ── 1. Constants & View Queries ───────────────────────────────────────────
  // esto es en caso de ser necesario, eliminar si procede
  //  private readonly checkboxElement = viewChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('inputRef');
  


  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  public readonly checked = model<boolean>(false);

  public readonly id = input<string>();
  public readonly inputConfig = input<AlfRadioButtonInterface>(undefined, { alias: 'config' });
  public readonly label = input<string>();
  public readonly value = input<any>(undefined);
  public readonly name = input<string>(undefined);
  public readonly radioButtonStyle = input<AlfRadioButtonVariantEnum>();
  public readonly helperText = input<string>();
  public readonly iconSelected = input<AlfIconsUnicodeIconEnum | string>();
  public readonly predefined = input<keyof AlfRadioButtonI18nLabels>();
  public readonly labelPosition = input<"before" | "after">("after");

  // Internal State Signals
  protected readonly _label = signal<string>(undefined);
  private readonly _disabled = signal<boolean>(false);

  // ── 3. Outputs and state signals ────────────────────────────────────────────────────────

  public readonly focused = signal<boolean>(false);
  public readonly hovered = signal<boolean>(false);
  public readonly onCheckedChange = output<any>();

  // ── 4. Internal State (Signals & Variables) ─────────────────────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: 'alf-rb' });
  
  // ── 5. Computed State (Derived from Inputs & State) ───────────────────────
  protected readonly idComputed = computed(() => this.id() ?? this.inputConfig()?.id ?? this.internalId);
  
  public readonly disabledComputed = computed<boolean>(() => {
    return this.disabled() ?? this.inputConfig()?.disabled ?? this._disabled() ?? false;
  });

  protected readonly labelComputed = computed<string | null>(() => {
    const lbl = this._label() ?? this.label() ?? this.inputConfig()?.label;
    if (lbl) return lbl;

    const pref = this.predefined() ?? this.inputConfig()?.predefined;
    if (pref) return getAlfRadioButtonLabel(pref as keyof AlfRadioButtonI18nLabels);

    return '';
  });


  protected readonly predefinedConfig = computed(() => {
    const currentVariant = this.variant() ?? AlfColorVariantEnum.SecondaryOutline;
    const vStr = currentVariant.toString();

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
    if (!vStr.includes('outline-') && !vStr.includes('ghost-') && !vStr.includes('soft-') && !vStr.includes('crystal-') && vStr !== 'transparent' && vStr !== 'Default') {
      if (comp.border) {
        if (!comp.typography) comp.typography = {};
        if (!comp.typography.default) comp.typography.default = {};
        comp.typography.default.color = comp.border.default?.borderColor;

        if (comp.border.hover) {
          if (!comp.typography.hover) comp.typography.hover = {};
          comp.typography.hover.color = comp.border.hover.borderColor || comp.border.default?.borderColor;
        }
        if (comp.border.focus) {
          if (!comp.typography.focus) comp.typography.focus = {};
          comp.typography.focus.color = comp.border.focus.borderColor || comp.border.default?.borderColor;
        }
        if (comp.border.active) {
          if (!comp.typography.active) comp.typography.active = {};
          comp.typography.active.color = comp.border.active.borderColor || comp.border.default?.borderColor;
        }
        if (comp.border.disabled) {
          if (!comp.typography.disabled) comp.typography.disabled = {};
          comp.typography.disabled.color = comp.border.disabled.borderColor || comp.border.default?.borderColor;
        }
      }
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
  
    /**
     * Implementación del patrón ControlValueAccessor.
     * Se ejecuta automáticamente cuando el formGroup deshabilita o habilita el control.
     */
    protected setControlDisabled(isDisabled: boolean): void {
      this._disabled.set(isDisabled);
    }
}

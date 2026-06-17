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
  AlfCheckboxVariantEnum,
  AlfColorVariantEnum,
  AlfIconsUnicodeIconEnum,
  AlfSizeEnum
} from '@alfcomponents/enums';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfSpinner } from '@alfcomponents/components/simple/alf-spinner/alf-spinner';
import { AlfCheckboxInterface } from './interfaces/alf-checkbox.interface';
import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { AlfBaseDirectives, deepMergeStates } from '@alfcomponents/components/base/bases.directive';
import { AlfCheckboxI18nLabels, getAlfCheckboxLabel } from './i18n/checkbox-i18n';

@Component({
  selector: 'alf-checkbox',
  standalone: true,
  imports: [
    ...ALF_CORE_DIRECTIVES,
    AlfSpinner
  ],
  templateUrl: './alf-checkbox.html',
  styleUrl: './alf-checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlfCheckbox extends AlfBaseDirectives {
  
  // ── 1. Constants & View Queries ───────────────────────────────────────────
  // esto es en caso de ser necesario, eliminar si procede
  //  private readonly checkboxElement = viewChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('inputRef');

  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  public readonly checked = model<boolean>(false);
  public readonly indeterminate = model<boolean>(false);

  public readonly id = input<string>();
  public readonly inputConfig = input<AlfCheckboxInterface>(undefined, { alias: 'config' });
  public readonly value = input<string | number>();
  public readonly name = input<string>();
  public readonly checkboxStyle = input<AlfCheckboxVariantEnum | 'elegant' | 'standard' | string>(AlfCheckboxVariantEnum.Elegant);
  public readonly label = input<string>();
  public readonly labelPosition = input<"before" | "after">("after");
  public readonly helperText = input<string>(undefined);
  public readonly iconSelected = input<AlfIconsUnicodeIconEnum | string>();
  public readonly isChecked = input<boolean>(false);
  public readonly isIndeterminate = input<boolean>(false);
  public readonly predefined = input<keyof AlfCheckboxI18nLabels>();

  // Internal State Signals
  protected readonly _label = signal<string>(undefined);
  private readonly _disabled = signal<boolean>(false);

  // ── 3. Outputs and state signals ────────────────────────────────────────────────────────
  public readonly onCheckedChange = output<boolean>();
  public readonly focused = signal<boolean>(false);
  public readonly hovered = signal<boolean>(false);

  // ── 4. Internal State (Signals & Variables) ─────────────────────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: 'alf-cb' });
  protected readonly idComputed = computed(() => this.id() ?? this.inputConfig()?.id ?? this.internalId);
  protected readonly labelComputed = computed<string | null>(() => {
    const lbl = this._label() ?? this.label() ?? this.inputConfig()?.label;
    if (lbl) return lbl;

    const pref = this.predefined() ?? this.inputConfig()?.predefined;
    if (pref) return getAlfCheckboxLabel(pref as keyof AlfCheckboxI18nLabels);

    return '';
  });

  // ── 5. Computed State (Derived from Inputs & State) ───────────────────────
  protected readonly checkboxStyleComputed = computed<AlfCheckboxVariantEnum>(() => (this.checkboxStyle() ?? this.inputConfig()?.checkboxStyle ?? AlfCheckboxVariantEnum.Elegant) as AlfCheckboxVariantEnum);
  protected readonly labelPositionComputed = computed<'before' | 'after'>(() => this.labelPosition() ?? this.inputConfig()?.labelPosition);
  protected readonly sizeComputed = computed<AlfSizeEnum>(() => (this.size() as AlfSizeEnum) ?? (this.inputConfig()?.size as AlfSizeEnum) ?? AlfSizeEnum.MD);
  protected readonly iconSelectedComputed = computed<string>(() => this.iconSelected() ?? this.inputConfig()?.iconSelected ?? AlfIconsUnicodeIconEnum.CheckMark);
  protected readonly isCheckedComputed = computed<boolean>(() => this.isChecked() ?? this.inputConfig()?.checked);
  protected readonly isIndeterminatedComputed = computed<boolean>(() => this.isIndeterminate() ?? this.inputConfig()?.indeterminate);
  protected readonly valueComputed = computed<string | number>(() => this.value() ?? this.inputConfig()?.value);
  protected readonly nameComputed = computed<string>(() => this.name() ?? this.inputConfig()?.name);
  protected readonly helperComputed = computed<string>(() => this.helperText() ?? this.inputConfig()?.helperText);
  protected readonly errorComputed = computed<string | boolean>(() => this.error() ?? this.inputConfig()?.error);

  // ── 6. Constructor ────────────────────────────────────────────────────────
  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.Checkbox);
    this.initialization(visualprefixEnum.Checkbox, visualprefixEnum.Check, AlfComponentTypeEnum.Checkbox);
  };

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

  // ── 7. Handlers & Public API ──────────────────────────────────────────────

  public readonly toggle = (): void => {
    if (this.disabled()) return;

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.indeterminate.set(false);
    this.onCheckedChange.emit(newValue);
  };

  public readonly onInputChange = (event: Event): void => {
    if (this.disabled()) return;
    this.toggle();
  };

  protected readonly onLabelClick = (event: Event): void => {
    if (this.disabled()) return;
    event.preventDefault();
    this.toggle();
  };

  protected readonly onInputKeydown = (event: KeyboardEvent): void => {
    if (this.disabled()) return;
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
    return AlfComponentTypeEnum.Checkbox;
  }

  /**
   * Conecta el motor base de validaciones con el diccionario de i18n
   * para devolver los mensajes de error traducidos según el idioma actual.
   */
  protected getValidationLabel(key: string) {
    return getAlfCheckboxLabel(key as keyof AlfCheckboxI18nLabels);
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

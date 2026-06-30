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
  AlfIconsUnicodeIconEnum,
} from '@alfcomponents/enums';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfSpinner } from '@alfcomponents/components/simple/alf-spinner/alf-spinner';
import { AlfBaseDirectives } from '@alfcomponents/components/base/bases.directive';
import { AlfCheckboxI18nLabels, getAlfCheckboxLabel } from './i18n/checkbox-i18n';
import { AlfComponentTypeEnum } from '@alfcomponents/components/base/enum/AlfComponentType.enum';

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
  protected readonly cssVarPrefix: string = visualprefixEnum.Checkbox as string;
  protected readonly classPrefix: string = visualprefixEnum.CheckPrefix as string;

  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  public readonly checked = model<boolean>(false);
  public readonly indeterminate = model<boolean>(false);

  public readonly id = input<string>();
  public readonly value = input<string | number>();
  public readonly name = input<string>();
  public readonly checkboxStyle = input<AlfCheckboxVariantEnum | 'elegant' | 'standard'>(AlfCheckboxVariantEnum.Elegant);
  public readonly label = input<string>();
  public readonly labelPosition = input<"before" | "after">("after");
  public readonly helperText = input<string>(undefined);
  public readonly iconSelected = input<AlfIconsUnicodeIconEnum | string>();
  public readonly predefined = input<keyof AlfCheckboxI18nLabels>();

  // Internal State Signals
  protected readonly _label = signal<string>(undefined);

  // ── 3. Outputs and state signals ────────────────────────────────────────────────────────
  public readonly onCheckedChange = output<boolean>();
  public readonly focused = signal<boolean>(false);
  public readonly hovered = signal<boolean>(false);

  // ── 4. Internal State (Signals & Variables) ─────────────────────────────────────────────
  protected readonly internalId: string = generateUniqueId({ prefix: this.classPrefix });
  protected readonly idComputed = computed(() => this.id() ?? this.internalId);
  protected readonly labelComputed = computed<string | null>(() => {
    const lbl = this._label() ?? this.label();
    if (lbl) return lbl;

    const pref = this.predefined();
    if (pref) return getAlfCheckboxLabel(pref as keyof AlfCheckboxI18nLabels);

    return '';
  });


  // public readonly isSoft = computed(() => {
  //   const v = this.variant() || '';
  //   return v.toLowerCase().includes('soft');
  // });

  // public readonly isCrystal = computed(() => {
  //   const v = this.variant() || '';
  //   return v.toLowerCase().includes('crystal');
  // });

  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.Checkbox);
    this.initialization(visualprefixEnum.Checkbox, visualprefixEnum.Check, AlfComponentTypeEnum.Checkbox);
  };


  // ── 7. Handlers & Public API ──────────────────────────────────────────────

  public readonly toggle = (): void => {
    if (this.disabledComputed() || this.isLoading()) return;

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.indeterminate.set(false);
    this.onCheckedChange.emit(newValue);
  };

  public readonly onInputChange = (event: Event): void => {
    if (this.disabledComputed()) return;
    this.toggle();
  };

  protected readonly onLabelClick = (event: Event): void => {
    if (this.disabledComputed()) return;
    event.preventDefault();
    this.toggle();
  };

  protected readonly onInputKeydown = (event: KeyboardEvent): void => {
    if (this.disabledComputed()) return;
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
   * Implementación del patrón ControlValueAccessor (Reactive Forms / ngModel).
   * Se ejecuta cuando el formulario inyecta un valor (ej. form.patchValue).
   */
  protected setControlValue(val: any): void {
    this._label.set(val === null || val === undefined ? '' : String(val));
  }

}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import {
  generateUniqueId,
  visualprefixEnum,
} from '@alfcomponents/shared';
import {
  AlfButtonTypeEnum,
  AlfColorVariantEnum,
  AlfIconsUnicodeIconEnum,
  AlfIconsEmojiIconEnum,
} from '@alfcomponents/enums';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';

import { ButtonLink } from './interfaces/alf-button.interface';
import { AlfButtonI18nLabels, getAlfButtonLabel } from './i18n/alf-button.i18n';
import { AlfBaseDirectives, AlfComponentTypeEnum } from '@alfcomponents/components/base/bases.directive';
@Component({
  selector: 'alf-button',
  standalone: true,
  imports: [
    ...ALF_CORE_DIRECTIVES
  ],
  templateUrl: './alf-button.html',
  styleUrl: './alf-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfButton extends AlfBaseDirectives {


  // ── 2. Inputs & Models ────────────────────────────────────────────────────
  public readonly id = input<string>();
  public readonly label = input<string>();
  public readonly type = input<AlfButtonTypeEnum>();
  public readonly iconLeft = input<string | AlfIconsUnicodeIconEnum | AlfIconsEmojiIconEnum>();
  public readonly iconRight = input<string | AlfIconsUnicodeIconEnum | AlfIconsEmojiIconEnum>();
  public readonly link = input<ButtonLink>();
  public readonly debounceTime = input<number>();
  public readonly predefined = input<keyof AlfButtonI18nLabels>();

  // Internal State Signals
  protected readonly _label = signal<string>(undefined);

  // ── 3. Outputs ────────────────────────────────────────────────────────────
  public readonly onClick = output<MouseEvent>();
  public readonly onHoverEnter = output<MouseEvent>();
  public readonly onHoverLeave = output<MouseEvent>();

  // ── 4. Internal State (Signals & Variables) ───────────────────────────────
  private lastClickTime = 0;
  private readonly internalId = generateUniqueId({ prefix: visualprefixEnum.ButtonsInternalId });

  // ── 5. Computed State (Derived from Inputs & State) ───────────────────────
  protected readonly idComputed = computed(() => this.id() ?? this.internalId);
  protected readonly labelComputed = computed<string | null>(() => {
    const lbl = this._label() ?? this.label();
    if (lbl) return lbl;

    const pref = this.predefined();
    if (pref) return getAlfButtonLabel(pref as keyof AlfButtonI18nLabels);

    return '';
  });


  // ── 6. Constructor ────────────────────────────────────────────────────────
  constructor() {
    super();
    this.initialization(visualprefixEnum.Buttons, visualprefixEnum.Button, AlfComponentTypeEnum.Button);
  };

  // ── 7. Handlers & Public API ──────────────────────────────────────────────

  public onHostClick(event: MouseEvent): void {
    const now = Date.now();
    const threshold = this.debounceTime() ?? 0;

    if (threshold > 0 && (now - this.lastClickTime < threshold)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.lastClickTime = now;

    if (event.detail > 0 && event.currentTarget instanceof HTMLElement) {
      event.currentTarget.blur();
    }

    this.onClick.emit(event);
  }

  public onMouseEnter(event: MouseEvent): void {
    this.onHoverEnter.emit(event);
  }

  public onMouseLeave(event: MouseEvent): void {
    this.onHoverLeave.emit(event);
  }

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
    return AlfComponentTypeEnum.Button;
  }

  /**
   * Conecta el motor base de validaciones con el diccionario de i18n
   * para devolver los mensajes de error traducidos según el idioma actual.
   */
  protected getValidationLabel(key: string) {
    return getAlfButtonLabel(key as keyof AlfButtonI18nLabels);
  }


  /**
   * Implementación del patrón ControlValueAccessor (Reactive Forms / ngModel).
   * Se ejecuta cuando el formulario inyecta un valor (ej. form.patchValue).
   */
  protected setControlValue(val: any): void {
    this._label.set(val === null || val === undefined ? '' : String(val));
  }

}

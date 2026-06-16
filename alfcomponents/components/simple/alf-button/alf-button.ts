import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  generateUniqueId,
  visualprefixEnum,
} from '@alfcomponents/shared';
import {
  AlfButtonTypeEnum,
  AlfColorVariantEnum,
  AlfIconsUnicodeIconEnum,
  AlfInputAppearanceEnum,
  AlfRemEnum,
} from '@alfcomponents/enums';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';
import {
  AlfBackgroundDirective,
  AlfBorderDirective,
  AlfOutlineDirective,
  AlfShadowsDirective,
  AlfMarginDirective,
  AlfPaddingDirective,
  AlfTypographyDirective,
  AlfTextStyleDirective,
  AlfTransformDirective,
  AlfTransitionDirective,
  AlfDisplayAndLayoutDirective,
  AlfCursorDirective,
  AlfSizeDirective,
  AlfDisabledDirective,
  AlfAriaDirective,
} from '@alfcomponents/visualStyles';
import { AlfButtonInterface, ButtonLink } from './interfaces/alf-button.interface';
import { AlfButtonI18nLabels, getAlfButtonLabel } from './i18n/alf-button.i18n';
import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { AlfBaseDirectives, deepMergeStates } from '@alfcomponents/components/base/bases.directive';
import { generatedComponentFunction } from '../alf-input/alf-input-functions';
import { AlfInputI18nLabels } from '../alf-input/i18n/alf-input.i18n';

@Component({
  selector: 'alf-button',
  standalone: true,
  imports: [
    AlfTooltipTextDirective,
    AlfRippleDirective,
    AlfBackgroundDirective,
    AlfBorderDirective,
    AlfOutlineDirective,
    AlfShadowsDirective,
    AlfMarginDirective,
    AlfPaddingDirective,
    AlfTypographyDirective,
    AlfTextStyleDirective,
    AlfTransformDirective,
    AlfTransitionDirective,
    AlfDisplayAndLayoutDirective,
    AlfCursorDirective,
    AlfSizeDirective,
    AlfDisabledDirective,
    AlfAriaDirective
  ],
  templateUrl: './alf-button.html',
  styleUrl: './alf-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfButton extends AlfBaseDirectives {


  // ── 1. Constants & View Queries ───────────────────────────────────────────
  protected readonly AlfRemEnum = AlfRemEnum;
  private readonly inputElement = viewChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('inputRef');


  // ── 2. Inputs & Models ────────────────────────────────────────────────────

  public readonly inputConfig = input<AlfButtonInterface>(undefined, { alias: 'config' });
  public readonly id = input<string | undefined>(undefined);
  public readonly label = input<string>();
  public readonly type = input<AlfButtonTypeEnum>();
  public readonly iconLeft = input<string | AlfIconsUnicodeIconEnum>();
  public readonly iconRight = input<string | AlfIconsUnicodeIconEnum>();
  public readonly link = input<ButtonLink>();
  public readonly debounceTime = input<number>();
  public readonly predefined = input<keyof AlfButtonI18nLabels>();
  // Internal State Signals
  protected readonly _label = signal<string>(undefined);
  private readonly _disabled = signal<boolean>(false);
  // ── 3. Outputs ────────────────────────────────────────────────────────────
  public readonly onClick = output<MouseEvent>();
  public readonly onHoverEnter = output<MouseEvent>();
  public readonly onHoverLeave = output<MouseEvent>();

  // ── 4. Internal State (Signals & Variables) ───────────────────────────────
  private lastClickTime = 0;
  private readonly internalId = generateUniqueId({ prefix: visualprefixEnum.ButtonsInternalId });

  // ── 5. Computed State (Derived from Inputs & State) ───────────────────────
  protected readonly idComputed = computed(() => this.id() ?? this.inputConfig()?.id ?? this.internalId);
  protected readonly labelComputed = computed<string | null>(() => {
    const lbl = this._label() ?? this.label() ?? this.inputConfig()?.label;
    if (lbl) return lbl;

    const pref = this.predefined() ?? this.inputConfig()?.predefined;
    if (pref) return getAlfButtonLabel(pref as keyof AlfButtonI18nLabels);

    return '';
  });
  protected readonly iconLeftComputed = computed(() => this.iconLeft() ?? this.inputConfig()?.iconLeft);
  protected readonly iconRightComputed = computed(() => this.iconRight() ?? this.inputConfig()?.iconRight);
  protected readonly typeComputed = computed(() => this.type() ?? this.inputConfig()?.type ?? AlfButtonTypeEnum.Button);
  protected readonly linkComputed = computed(() => this.link() ?? this.inputConfig()?.link ?? undefined);
  protected readonly disabledComputed = computed(() => this.disabled() || this._disabled() || (this.inputConfig()?.disabled ?? false));


  // ── 6. Constructor ────────────────────────────────────────────────────────
  constructor() {
    super();
    this.initialization('--alf-btn', 'alf-button', AlfComponentTypeEnum.Button);
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

    return {
      backgrounds: comp.background,
      border: comp.border,
      padding: comp.padding,
      textStyle: comp.textStyle,
      shadows: comp.shadows
    };

  });



  // ── 7. Handlers & Public API ──────────────────────────────────────────────

  public onHostClick(event: MouseEvent): void {
    const now = Date.now();
    const threshold = this.debounceTime() ?? this.inputConfig()?.debounceTime ?? 0;

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
    return this._label() ?? this.label() ?? this.inputConfig()?.label ?? '';
  }

  /**
   * Define el tipo de control para el engine base (útil si la clase base hace switch de lógicas por tipo).
   */
  protected getControlType(): string {
    return undefined;
  }

  /**
   * Conecta el motor base de validaciones con el diccionario de i18n
   * para devolver los mensajes de error traducidos según el idioma actual.
   */
  protected getValidationLabel(key: string) {
    return getAlfButtonLabel(key as keyof AlfButtonI18nLabels);
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

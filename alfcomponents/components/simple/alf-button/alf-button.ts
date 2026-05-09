import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
} from '@angular/core';
import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import {
  generateUniqueId,
  visualprefixEnum,
} from '@alfcomponents/shared';
import {
  AlfColorVariantEnum,
  AlfButtonTypeEnum,
  AlfIconsUnicodeIconEnum,
} from '@alfcomponents/enums';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';
import { AlfButtonInterface, ButtonLink } from './interfaces/alf-button.interface';
import { getAlfButtonDefaultConfig } from './predefined/alf-button.predefined';
import { AlfButtonI18nLabels } from './i18n/alf-button.i18n';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'alf-button',
  standalone: true,
  imports: [AlfTooltipTextDirective, AlfRippleDirective, CommonModule],
  templateUrl: './alf-button.html',
  styleUrl: './alf-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfButton extends AlfBaseConfiguration<AlfButtonInterface> {

  // ── Configuración base ────────────────────────────────────────────────────

  protected override readonly visualPrefix = visualprefixEnum.Buttons;
  protected readonly internalId = generateUniqueId({ prefix: visualprefixEnum.ButtonsInternalId });

  // ── Signals internos ──────────────────────────────────────────────────────

  private lastClickTime = 0;

  // ── ElementRef ────────────────────────────────────────────────────────────

  private readonly el = inject(ElementRef);

  // ── Inputs de variante / config ───────────────────────────────────────────

  public override readonly colorVariant = input<AlfColorVariantEnum>();
  public override readonly inputConfig = input<AlfButtonInterface>();

  // ── Inputs directos ───────────────────────────────────────────────────────

  public readonly label = input<string>();
  public readonly type = input<AlfButtonTypeEnum>();
  public readonly iconLeft = input<string | AlfIconsUnicodeIconEnum>();
  public readonly iconRight = input<string | AlfIconsUnicodeIconEnum>();
  public readonly link = input<ButtonLink>();
  public readonly loading = input<boolean>();
  public readonly debounceTime = input<number>();
  public readonly predefined = input<keyof AlfButtonI18nLabels>();

  // ── Computed: cadena de configuración ────────────────────────────────────

  /**
   * 1. Obtenemos la configuración predefinida basada en variante y estilo
   */
  protected readonly predefinedConfig = computed(() => {
    return getAlfButtonDefaultConfig(this.colorVariantComputed(), this.predefined());
  });

  /**
   * 3. Combinamos con el inputConfig manual
   */
  public override readonly resolvedConfig = computed(() => {
    const predefined = this.predefinedConfig();
    const manual = this.inputConfig();
    const variant = this.colorVariantComputed();

    return {
      ...predefined,
      ...manual,
      colorVariant: variant,
      label: this.label() ?? manual?.label ?? predefined.label,
      type: this.type() ?? manual?.type ?? predefined.type ?? AlfButtonTypeEnum.Button,
      iconLeft: this.iconLeft() ?? manual?.iconLeft ?? predefined.iconLeft,
      iconRight: this.iconRight() ?? manual?.iconRight ?? predefined.iconRight,
      link: this.link() ?? manual?.link ?? predefined.link,
      disabled: this.disabled() ?? manual?.disabled ?? predefined.disabled,
      loading: this.loading() ?? manual?.loading ?? predefined.loading,
      debounceTime: this.debounceTime() ?? manual?.debounceTime ?? predefined.debounceTime ?? 0,
    };
  });


  // ── Computed derivados ────────────────────────────────────────────────────

  public readonly isDisabled = computed(() => this.disabledComputed());
  public readonly isLoading = computed(() => this.loading() ?? this.resolvedConfig()?.loading ?? false);
  
  public readonly buttonId = computed(() =>
    this.resolvedConfig()?.id ?? this.internalId
  );

  public readonly labelComputed = computed(() =>
    this.label() ?? this.resolvedConfig()?.label ?? ''
  );

  public readonly iconLeftComputed = computed(() =>
    this.iconLeft() ?? this.resolvedConfig()?.iconLeft
  );

  public readonly iconRightComputed = computed(() =>
    this.iconRight() ?? this.resolvedConfig()?.iconRight
  );

  public readonly typeComputed = computed(() =>
    this.type() ?? this.resolvedConfig()?.type ?? AlfButtonTypeEnum.Button
  );

  public readonly linkComputed = computed(() =>
    this.link() ?? this.resolvedConfig()?.link
  );

  // ── Outputs ───────────────────────────────────────────────────────────────

  public readonly onClick = output<MouseEvent>();
  public readonly onHoverEnter = output<MouseEvent>();
  public readonly onHoverLeave = output<MouseEvent>();

  // ── Handlers ─────────────────────────────────────────────────────────────

  @HostListener('click', ['$event'])
  public readonly onHostClick = (event: MouseEvent): void => {
    const now = Date.now();
    const threshold = this.debounceTime() ?? this.resolvedConfig()?.debounceTime ?? 0;

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
  };

  @HostListener('mouseenter', ['$event'])
  public readonly onMouseEnter = (event: MouseEvent): void => {
    this.onHoverEnter.emit(event);
  };

  @HostListener('mouseleave', ['$event'])
  public readonly onMouseLeave = (event: MouseEvent): void => {
    this.onHoverLeave.emit(event);
  };

}

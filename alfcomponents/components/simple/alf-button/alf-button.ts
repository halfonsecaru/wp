import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {
  generateUniqueId,
  visualprefixEnum,
} from '@alfcomponents/shared';
import {
  AlfButtonTypeEnum,
  AlfIconsUnicodeIconEnum,
} from '@alfcomponents/enums';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';
import {
  AlfBackgroundDirective,
  AlfBorderDirective,
  AlfOutlineDirective,
  AlfShadowsDirective,
  AlfAnimationsDirective,
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
import { AlfButtonI18nLabels } from './i18n/alf-button.i18n';
import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { AlfBaseDirective } from '@alfcomponents/components/base/base.directive';

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
export class AlfButton extends AlfBaseDirective {

 
  // B) Internos
  private lastClickTime = 0;
  private readonly internalId = generateUniqueId({ prefix: visualprefixEnum.ButtonsInternalId });

  // ── Inputs de variante / config ───────────────────────────────────────────
  public readonly inputConfig = input<AlfButtonInterface>(undefined, { alias: 'config' });
  

  // ── Inputs  ───────────────────────────────────────────────────────────────

  public readonly id = input<string | undefined>(undefined);
  public readonly label = input<string>();
  public readonly type = input<AlfButtonTypeEnum>();
  public readonly iconLeft = input<string | AlfIconsUnicodeIconEnum>();
  public readonly iconRight = input<string | AlfIconsUnicodeIconEnum>();
  public readonly link = input<ButtonLink>();
  public readonly debounceTime = input<number>();
  public readonly predefined = input<keyof AlfButtonI18nLabels>();

  public override readonly isDisabled = computed<boolean>(() => 
    this.disabled() === true || 
    this.isDisabledInput() === true || 
    this.inputConfig()?.disabled === true
  );

  // ── 3. Computed (Reactive Engine) ─────────────────────────────────────────

  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.Button);
  };

  /**
   * 1. Obtenemos la configuración predefinida basada en variante y estilo
   */
  protected readonly predefinedConfig = computed(() => {
    //return getAlfButtonDefaultConfig(this.colorVariantComputed());
  });

 

  // ── Computed derivados ────────────────────────────────────────────────────

  public readonly buttonId = computed(() =>
    this.id() ?? this.internalId
  );

  public readonly labelComputed = computed(() =>
    this.label() ?? ''
  );

  public readonly iconLeftComputed = computed(() =>
    this.iconLeft()
  );

  public readonly iconRightComputed = computed(() =>
    this.iconRight()
  );

  public readonly typeComputed = computed(() =>
    this.type() ?? AlfButtonTypeEnum.Button
  );

  public readonly linkComputed = computed(() =>
    this.link()
  );

  // ── Outputs ───────────────────────────────────────────────────────────────

  public readonly onClick = output<MouseEvent>();
  public readonly onHoverEnter = output<MouseEvent>();
  public readonly onHoverLeave = output<MouseEvent>();

  // ── Handlers ─────────────────────────────────────────────────────────────

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

}

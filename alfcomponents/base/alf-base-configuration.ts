import { computed, Directive, input } from '@angular/core';
import { AlfTooltipConfig } from '@alfcomponents/directives';
import { AlfColorVariantEnum, AlfCursorEnum } from '@alfcomponents/enums';
import {
  AlfAnimateCssInterface,
  AlfBackgroundsInterface,
  AlfBorderInterface,
  AlfDisplayAndLayoutInterface,
  AlfMarginInterface,
  AlfOutlineInterface,
  AlfPaddingInterface,
  AlfRippleInterface,
  AlfShadowsInterface,
  AlfTextStyleInterface,
  AlfTransformInterface,
  AlfTypographyInterface
} from '@alfcomponents/interfaces';
import { AlfAriaBaseInterface } from '@alfcomponents/interfaces/alf-aria.interface';
import {
  visualAnimationsBase,
  visualBackgroundBase,
  visualBorderBase,
  visualDisplayAndLayoutBase,
  visualMarginBase,
  visualOutlineBase,
  visualPaddingBase,
  visualRippleColorBase,
  visualShadowsBase,
  visualTextStyleBase,
  visualTransformBase,
  visualTypographyBase,
  visualAnimationsClassBase
} from './base-visual';
import { buildBorderColor, buildBackgroundColor } from './predefined';

export interface AlfBaseCommonConfigInterface {
  readonly colorVariant?: AlfColorVariantEnum;
  readonly cursor?: AlfCursorEnum;
  readonly disabled?: boolean;
  readonly backgrounds?: AlfBackgroundsInterface;
  readonly border?: AlfBorderInterface;
  readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
  readonly margin?: AlfMarginInterface;
  readonly outline?: AlfOutlineInterface;
  readonly padding?: AlfPaddingInterface;
  readonly shadows?: AlfShadowsInterface;
  readonly textStyle?: AlfTextStyleInterface;
  readonly transform?: AlfTransformInterface;
  readonly typography?: AlfTypographyInterface;
  readonly animations?: AlfAnimateCssInterface;
  readonly customClass?: string;
  readonly customStyle?: string;
}

@Directive()
export abstract class AlfBaseConfiguration<TConfig extends AlfBaseCommonConfigInterface> {
  protected abstract readonly visualPrefix: string;

  // Input de configuración principal
  public readonly inputConfig = input<TConfig>();

  // Inputs directos para sobrescritura
  protected readonly tooltip = input<string | AlfTooltipConfig | undefined>();
  protected readonly ripple = input<boolean | AlfRippleInterface | undefined>();
  protected readonly colorVariant = input<AlfColorVariantEnum>();
  protected readonly cursor = input<AlfCursorEnum>();
  protected readonly disabled = input<boolean>();
  protected readonly aria = input<AlfAriaBaseInterface | undefined>();
  protected readonly backgrounds = input<AlfBackgroundsInterface | undefined>();
  protected readonly border = input<AlfBorderInterface | undefined>();
  protected readonly displayAndLayout = input<AlfDisplayAndLayoutInterface | undefined>();
  protected readonly margin = input<AlfMarginInterface | undefined>();
  protected readonly outline = input<AlfOutlineInterface | undefined>();
  protected readonly padding = input<AlfPaddingInterface | undefined>();
  protected readonly shadows = input<AlfShadowsInterface | undefined>();
  protected readonly textStyle = input<AlfTextStyleInterface | undefined>();
  protected readonly transform = input<AlfTransformInterface | undefined>();
  protected readonly typography = input<AlfTypographyInterface | undefined>();
  protected readonly animations = input<AlfAnimateCssInterface | undefined>();
  protected readonly customClass = input<string | undefined>();
  protected readonly customStyle = input<string | undefined>();

  /**
   * Configuración resuelta base.
   */
  public readonly resolvedConfig = computed(() => this.inputConfig());

  // Computeds de resolución de estado
  protected readonly colorVariantComputed = computed(() =>
    this.colorVariant() ?? this.resolvedConfig()?.colorVariant ?? AlfColorVariantEnum.Default,
  );

  protected readonly cursorComputed = computed(() =>
    this.cursor() ?? this.resolvedConfig()?.cursor ?? AlfCursorEnum.Pointer,
  );

  protected readonly rippleInputComputed = computed(() =>
    this.ripple() ?? true,
  );

  protected readonly disabledComputed = computed(() =>
    this.disabled() ?? this.resolvedConfig()?.disabled ?? false,
  );

  public readonly tooltipComputed = computed(() =>
    this.tooltip() ?? (this.resolvedConfig() as any)?.tooltip
  );

  public readonly ariaComputed = computed(() =>
    this.aria() ?? (this.resolvedConfig() as any)?.aria
  );

  public readonly customClassComputed = computed(() =>
    this.customClass() ?? this.resolvedConfig()?.customClass ?? ''
  );

  public readonly customStyleComputed = computed(() =>
    this.customStyle() ?? this.resolvedConfig()?.customStyle ?? ''
  );

  // Computeds para estilos inyectados
  protected readonly backgroundsComputed = computed(() => {
    const resolved = this.resolvedConfig()?.backgrounds || {};
    const user = this.backgrounds() || {};
    return buildBackgroundColor(
      this.colorVariantComputed() ? this.colorVariantComputed() : undefined,
      {
        default: { ...resolved.default, ...user.default },
        hover: { ...resolved.hover, ...user.hover },
        focus: { ...resolved.focus, ...user.focus },
        active: { ...resolved.active, ...user.active },
        disabled: { ...resolved.disabled, ...user.disabled },
      }
    );
  });
  protected readonly displayAndLayoutComputed = computed(() => this.displayAndLayout() ?? this.resolvedConfig()?.displayAndLayout);
  protected readonly marginComputed = computed(() => this.margin() ?? this.resolvedConfig()?.margin);
  protected readonly outlineComputed = computed(() => this.outline() ?? this.resolvedConfig()?.outline);
  protected readonly paddingComputed = computed(() => this.padding() ?? this.resolvedConfig()?.padding);
  protected readonly shadowsComputed = computed(() => this.shadows() ?? this.resolvedConfig()?.shadows);
  protected readonly textStyleComputed = computed(() => this.textStyle() ?? this.resolvedConfig()?.textStyle);
  protected readonly transformComputed = computed(() => this.transform() ?? this.resolvedConfig()?.transform);
  protected readonly typographyComputed = computed(() => this.typography() ?? this.resolvedConfig()?.typography);
  protected readonly animationsComputed = computed(() => this.animations() ?? this.resolvedConfig()?.animations);

  protected readonly borderComputed = computed(() => {
    const resolved = this.resolvedConfig()?.border || {};
    const user = this.border() || {};
    return buildBorderColor(
      this.colorVariantComputed() ? this.colorVariantComputed() : undefined,
      {
        default: { ...resolved.default, ...user.default },
        hover: { ...resolved.hover, ...user.hover },
        focus: { ...resolved.focus, ...user.focus },
        active: { ...resolved.active, ...user.active },
        disabled: { ...resolved.disabled, ...user.disabled },
      }
    );
  });



  public readonly animationsClassComputed = computed(() =>
    visualAnimationsClassBase({
      animations: this.animationsComputed(),
    })
  );

  // ****************************************** //
  // **** CREACION DE LOS ESTILOS PARA SCSS **** //
  // ****************************************** //

  public readonly createBorderStyle = computed(() =>
    visualBorderBase(this.visualPrefix, {
      type: this.colorVariantComputed(),
      border: this.borderComputed(),
    }),
  );

  public readonly createBackgroundsStyle = computed(() =>
    visualBackgroundBase(this.visualPrefix, {
      type: this.colorVariantComputed(),
      backgrounds: this.backgroundsComputed(),
    }),
  );



  public readonly createDisplayAndLayoutStyle = computed(() =>
    visualDisplayAndLayoutBase(this.visualPrefix, {
      type: this.colorVariantComputed(),
      displayAndLayout: this.displayAndLayoutComputed(),
    }),
  );

  public readonly createMarginStyle = computed(() =>
    visualMarginBase(this.visualPrefix, {
      type: this.colorVariantComputed(),
      margin: this.marginComputed(),
    }),
  );

  public readonly createOutlineStyle = computed(() =>
    visualOutlineBase(this.visualPrefix, {
      type: this.colorVariantComputed(),
      outline: this.outlineComputed(),
    }),
  );

  public readonly createPaddingStyle = computed(() =>
    visualPaddingBase(this.visualPrefix, {
      type: this.colorVariantComputed(),
      padding: this.paddingComputed(),
    }),
  );

  public readonly createShadowsStyle = computed(() =>
    visualShadowsBase(this.visualPrefix, {
      type: this.colorVariantComputed(),
      shadows: this.shadowsComputed(),
    }),
  );

  public readonly createTextStyle = computed(() =>
    visualTextStyleBase(this.visualPrefix, {
      type: this.colorVariantComputed(),
      textStyle: this.textStyleComputed(),
    }),
  );

  public readonly createTransformStyle = computed(() =>
    visualTransformBase(this.visualPrefix, {
      type: this.colorVariantComputed(),
      transform: this.transformComputed(),
    }),
  );

  public readonly createTypographyStyle = computed(() =>
    visualTypographyBase(this.visualPrefix, {
      type: this.colorVariantComputed(),
      typography: this.typographyComputed(),
    }),
  );

  public readonly createAnimationsStyle = computed(() =>
    visualAnimationsBase(this.visualPrefix, {
      type: this.colorVariantComputed(),
      animations: this.animationsComputed(),
    }),
  );

  public readonly rippleComputed = computed<boolean | AlfRippleInterface>(() => {
    const baseRippleConf: AlfRippleInterface = {
      color: visualRippleColorBase({
        type: this.colorVariantComputed(),
      }),
    };
    const rippleInput = this.rippleInputComputed();

    if (rippleInput === undefined || rippleInput === true) return baseRippleConf;
    if (rippleInput === false) return false;

    return { ...baseRippleConf, ...rippleInput };
  });
}

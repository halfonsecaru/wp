import { computed, Directive, input } from '@angular/core';
import { AlfTooltipConfig } from '@alfcomponents/directives';
import { AlfButtonVisualTypeEnum, AlfColorVariantEnum, AlfCursorEnum, AlfVisualPredefinedEnum } from '@alfcomponents/enums';
import { AlfAnimateCssInterface, AlfBackgroundsInterface, AlfBorderInterface, AlfDisplayAndLayoutInterface, AlfMarginInterface, AlfOutlineInterface, AlfPaddingInterface, AlfRippleInterface, AlfShadowsInterface, AlfTextStyleInterface, AlfTransformInterface, AlfTypographyInterface } from '@alfcomponents/interfaces';
import { AlfAriaBaseInterface } from '@alfcomponents/interfaces/alf-aria.interface';
import { visualAnimationsBase, visualBackgroundBase, visualBorderBase, visualDisplayAndLayoutBase, visualMarginBase, visualOutlineBase, visualPaddingBase, visualRippleColorBase, visualShadowsBase, visualTextStyleBase, visualTransformBase, visualTypographyBase } from './base-visual';

export interface AlfBaseCommonConfigInterface {
  readonly colorVariant?: AlfColorVariantEnum;
  readonly visualType?: AlfButtonVisualTypeEnum;
  readonly predefined?: AlfVisualPredefinedEnum;
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

  // Inputs base comunes a la mayoría de componentes interactivos
  // El input de configuracion principal que engloba todos
  public readonly inputConfig = input<TConfig>();

  // ***************************************************** //
  // **** CONFIGURACION BASE PARA LOS INPUTS DIRECTOS **** //
  // ***************************************************** //
  // Entrados directamente en el componente

  protected readonly tooltip = input<string | AlfTooltipConfig | undefined>();
  protected readonly ripple = input<boolean | AlfRippleInterface | undefined>();
  protected readonly colorVariant = input<AlfColorVariantEnum>();
  protected readonly visualType = input<AlfButtonVisualTypeEnum>();
  protected readonly predefined = input<AlfVisualPredefinedEnum>();
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

  // ******************************************** //
  // **** CONFIGURACION BASE PARA LOS INPUTS **** //
  // ******************************************** //
  
  /**
   * Configuración resuelta. 
   * Por defecto es el inputConfig(), pero puede ser sobrescrita en componentes derivados 
   * (ej: para combinar configuraciones predefinidas de un input [variant]).
   */
  protected readonly resolvedConfig = computed(() => this.inputConfig());

  // Computeds base (fallback: direct input -> resolvedConfig -> default)

  protected readonly tooltipComputed = computed(() =>
    this.tooltip() ?? undefined,
  );

  protected readonly colorVariantComputed = computed(() =>
    this.colorVariant() ?? this.resolvedConfig()?.colorVariant ?? AlfColorVariantEnum.Default,
  );

  protected readonly cursorComputed = computed(() =>
    this.cursor() ?? this.resolvedConfig()?.cursor ?? AlfCursorEnum.Pointer,
  );

  protected readonly predefinedComputed = computed(() =>
    this.predefined() ?? this.resolvedConfig()?.predefined,
  );

  protected readonly visualTypeComputed = computed(() =>
    this.visualType() ?? this.resolvedConfig()?.visualType,
  );

  protected readonly rippleInputComputed = computed(() =>
    this.ripple() ?? true,
  );

  protected readonly disabledComputed = computed(() =>
    this.disabled() ?? this.resolvedConfig()?.disabled ?? false,
  );

  protected readonly ariaComputed = computed(() =>
    this.aria() ?? undefined,
  );

  protected readonly backgroundsComputed = computed(() =>
    this.backgrounds() ?? this.resolvedConfig()?.backgrounds,
  );

  protected readonly borderComputed = computed(() =>
    this.border() ?? this.resolvedConfig()?.border,
  );

  protected readonly displayAndLayoutComputed = computed(() =>
    this.displayAndLayout() ?? this.resolvedConfig()?.displayAndLayout,
  );

  protected readonly marginComputed = computed(() =>
    this.margin() ?? this.resolvedConfig()?.margin,
  );

  protected readonly outlineComputed = computed(() =>
    this.outline() ?? this.resolvedConfig()?.outline,
  );

  protected readonly paddingComputed = computed(() =>
    this.padding() ?? this.resolvedConfig()?.padding,
  );

  protected readonly shadowsComputed = computed(() =>
    this.shadows() ?? this.resolvedConfig()?.shadows,
  );

  protected readonly textStyleComputed = computed(() =>
    this.textStyle() ?? this.resolvedConfig()?.textStyle,
  );

  protected readonly transformComputed = computed(() =>
    this.transform() ?? this.resolvedConfig()?.transform,
  );

  protected readonly typographyComputed = computed(() =>
    this.typography() ?? this.resolvedConfig()?.typography,
  );

  protected readonly animationsComputed = computed(() =>
    this.animations() ?? this.resolvedConfig()?.animations,
  );

  protected readonly customClassComputed = computed(() =>
    this.resolvedConfig()?.customClass ?? '',
  );

  protected readonly customStyleComputed = computed(() =>
    this.resolvedConfig()?.customStyle ?? '',
  );

  // ****************************************** //
  // **** CREACION DE LO ESTILOS PARA SCSS **** //
  // ****************************************** //
  // Computeds visuales comunes (estilo + ripple)

  protected readonly createBackgroundsStyle = computed(() =>
    visualBackgroundBase(this.visualPrefix, {
      type: this.colorVariantComputed() ?? AlfColorVariantEnum.Default,
      predefined: this.predefinedComputed(),
      visualType: this.visualTypeComputed(),
      backgrounds: this.backgroundsComputed(),
    }),
  );

  protected readonly createBorderStyle = computed(() =>
    visualBorderBase(this.visualPrefix, {
      type: this.colorVariantComputed() ?? AlfColorVariantEnum.Default,
      predefined: this.predefinedComputed(),
      visualType: this.visualTypeComputed(),
      border: this.borderComputed(),
    }),
  );

  protected readonly createDisplayAndLayoutStyle = computed(() =>
    visualDisplayAndLayoutBase(this.visualPrefix, {
      type: this.colorVariantComputed() ?? AlfColorVariantEnum.Default,
      predefined: this.predefinedComputed(),
      visualType: this.visualTypeComputed(),
      displayAndLayout: this.displayAndLayoutComputed(),
    }),
  );

  protected readonly createMarginStyle = computed(() =>
    visualMarginBase(this.visualPrefix, {
      type: this.colorVariantComputed() ?? AlfColorVariantEnum.Default,
      predefined: this.predefinedComputed(),
      visualType: this.visualTypeComputed(),
      margin: this.marginComputed(),
    }),
  );

  protected readonly createOutlineStyle = computed(() =>
    visualOutlineBase(this.visualPrefix, {
      type: this.colorVariantComputed() ?? AlfColorVariantEnum.Default,
      predefined: this.predefinedComputed(),
      visualType: this.visualTypeComputed(),
      outline: this.outlineComputed(),
    }),
  );

  protected readonly createPaddingStyle = computed(() =>
    visualPaddingBase(this.visualPrefix, {
      type: this.colorVariantComputed() ?? AlfColorVariantEnum.Default,
      predefined: this.predefinedComputed(),
      visualType: this.visualTypeComputed(),
      padding: this.paddingComputed(),
    }),
  );

  protected readonly createShadowsStyle = computed(() =>
    visualShadowsBase(this.visualPrefix, {
      type: this.colorVariantComputed() ?? AlfColorVariantEnum.Default,
      predefined: this.predefinedComputed(),
      visualType: this.visualTypeComputed(),
      shadows: this.shadowsComputed(),
    }),
  );

  protected readonly createTextStyle = computed(() =>
    visualTextStyleBase(this.visualPrefix, {
      type: this.colorVariantComputed() ?? AlfColorVariantEnum.Default,
      predefined: this.predefinedComputed(),
      visualType: this.visualTypeComputed(),
      textStyle: this.textStyleComputed(),
    }),
  );

  protected readonly createTransformStyle = computed(() =>
    visualTransformBase(this.visualPrefix, {
      type: this.colorVariantComputed() ?? AlfColorVariantEnum.Default,
      predefined: this.predefinedComputed(),
      visualType: this.visualTypeComputed(),
      transform: this.transformComputed(),
    }),
  );

  protected readonly createTypographyStyle = computed(() =>
    visualTypographyBase(this.visualPrefix, {
      type: this.colorVariantComputed() ?? AlfColorVariantEnum.Default,
      predefined: this.predefinedComputed(),
      visualType: this.visualTypeComputed(),
      typography: this.typographyComputed(),
    }),
  );

  protected readonly createAnimationsStyle = computed(() =>
    visualAnimationsBase(this.visualPrefix, {
      animations: this.animationsComputed(),
    }),
  );

  protected readonly animationsClassComputed = computed(() => {
    return this.animationsComputed()?.enterStage ?? '';
  });

  protected readonly rippleComputed = computed<boolean | AlfRippleInterface>(() => {
    const baseRippleConf: AlfRippleInterface = {
      color: visualRippleColorBase({
        type: this.colorVariantComputed() ?? AlfColorVariantEnum.Default,
        predefined: this.predefinedComputed(),
        visualType: this.visualTypeComputed(),
      }),
    };
    const rippleInput = this.rippleInputComputed();

    if (rippleInput === undefined || rippleInput === true) {
      return baseRippleConf;
    }

    if (rippleInput === false) {
      return false;
    }

    return {
      ...baseRippleConf,
      ...rippleInput,
    };
  });
}

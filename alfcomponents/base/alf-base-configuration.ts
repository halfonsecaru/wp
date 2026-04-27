import { computed, Directive, input } from '@angular/core';
import { AlfTooltipConfig } from '@alfcomponents/directives';
import { AlfButtonVisualTypeEnum, AlfColorVariantEnum, AlfCursorEnum, AlfVisualPredefinedEnum } from '@alfcomponents/enums';
import { AlfAnimateCssInterface, AlfBackgroundsInterface, AlfBorderInterface, AlfDisplayAndLayoutInterface, AlfMarginInterface, AlfOutlineInterface, AlfPaddingInterface, AlfRippleInterface, AlfShadowsInterface, AlfTextStyleInterface, AlfTransformInterface, AlfTypographyInterface } from '@alfcomponents/interfaces';
import { AlfAriaBaseInterface } from '@alfcomponents/interfaces/alf-aria.interface';
import { visualBackgroundBase, visualBorderBase, visualDisplayAndLayoutBase, visualMarginBase, visualOutlineBase, visualPaddingBase, visualRippleColorBase, visualShadowsBase, visualTextStyleBase, visualTransformBase, visualTypographyBase } from './base-visual';

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
}

@Directive()
export abstract class AlfBaseConfiguration<TConfig extends AlfBaseCommonConfigInterface> {
  protected abstract readonly visualPrefix: string;

  // Inputs base comunes a la mayoría de componentes interactivos
  // El input de configuracion principal que engloba todos
  protected readonly inputConfig = input<TConfig>();

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
  // Computeds base (fallback: direct input -> inputConfig -> default)

  protected readonly tooltipComputed = computed(() =>
    this.tooltip() ?? undefined,
  );

  protected readonly colorVariantComputed = computed(() =>
    this.colorVariant() ?? this.inputConfig()?.colorVariant ?? AlfColorVariantEnum.Default,
  );

  protected readonly cursorComputed = computed(() =>
    this.cursor() ?? this.inputConfig()?.cursor ?? AlfCursorEnum.Pointer,
  );

  protected readonly predefinedComputed = computed(() =>
    this.predefined() ?? this.inputConfig()?.predefined,
  );

  protected readonly visualTypeComputed = computed(() =>
    this.visualType() ?? this.inputConfig()?.visualType,
  );

  protected readonly rippleInputComputed = computed(() =>
    this.ripple() ?? true,
  );

  protected readonly disabledComputed = computed(() =>
    this.disabled() ?? this.inputConfig()?.disabled ?? false,
  );

  protected readonly ariaComputed = computed(() =>
    this.aria() ?? undefined,
  );

  protected readonly backgroundsComputed = computed(() =>
    this.backgrounds() ?? this.inputConfig()?.backgrounds,
  );

  protected readonly borderComputed = computed(() =>
    this.border() ?? this.inputConfig()?.border,
  );

  protected readonly displayAndLayoutComputed = computed(() =>
    this.displayAndLayout() ?? this.inputConfig()?.displayAndLayout,
  );

  protected readonly marginComputed = computed(() =>
    this.margin() ?? this.inputConfig()?.margin,
  );

  protected readonly outlineComputed = computed(() =>
    this.outline() ?? this.inputConfig()?.outline,
  );

  protected readonly paddingComputed = computed(() =>
    this.padding() ?? this.inputConfig()?.padding,
  );

  protected readonly shadowsComputed = computed(() =>
    this.shadows() ?? this.inputConfig()?.shadows,
  );

  protected readonly textStyleComputed = computed(() =>
    this.textStyle() ?? this.inputConfig()?.textStyle,
  );

  protected readonly transformComputed = computed(() =>
    this.transform() ?? this.inputConfig()?.transform,
  );

  protected readonly typographyComputed = computed(() =>
    this.typography() ?? this.inputConfig()?.typography,
  );

  protected readonly animationsComputed = computed(() =>
    this.animations() ?? this.inputConfig()?.animations,
  );

  // ****************************************** //
  // **** CREACION DE LO ESTILOS PARA SCSS **** //
  // ****************************************** //
  // Computeds visuales comunes (estilo + ripple)

  protected readonly createButtonStyle = computed(() =>
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

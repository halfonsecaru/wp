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
  AlfTypographyInterface,
  AlfBaseCommonConfigInterface
} from '@alfcomponents/interfaces';
import { AlfAriaBaseInterface } from '@alfcomponents/interfaces/alf-aria.interface';
import { resolveAlfColorVariant } from '@alfcomponents/shared';
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
import { resolveVariantConfig } from './defaultVariants';



@Directive()
export abstract class AlfBaseConfiguration<TConfig extends AlfBaseCommonConfigInterface> {
  protected abstract readonly visualPrefix: string;

  // Input de configuración principal
  public readonly inputConfig = input<TConfig>();

  // Inputs directos para sobrescritura
  public readonly tooltip = input<string | AlfTooltipConfig | undefined>();
  public readonly ripple = input<boolean | AlfRippleInterface | undefined>();
  public readonly colorVariant = input<AlfColorVariantEnum>();
  public readonly cursor = input<AlfCursorEnum>();
  public readonly disabled = input<boolean>();
  public readonly aria = input<AlfAriaBaseInterface | undefined>();
  public readonly backgrounds = input<AlfBackgroundsInterface | undefined>();
  public readonly border = input<AlfBorderInterface | undefined>();
  public readonly displayAndLayout = input<AlfDisplayAndLayoutInterface | undefined>();
  public readonly margin = input<AlfMarginInterface | undefined>();
  public readonly outline = input<AlfOutlineInterface | undefined>();
  public readonly padding = input<AlfPaddingInterface | undefined>();
  public readonly shadows = input<AlfShadowsInterface | undefined>();
  public readonly textStyle = input<AlfTextStyleInterface | undefined>();
  public readonly transform = input<AlfTransformInterface | undefined>();
  public readonly typography = input<AlfTypographyInterface | undefined>();
  public readonly animations = input<AlfAnimateCssInterface | undefined>();
  public readonly customClass = input<string | undefined>();
  public readonly customStyle = input<string | undefined>();

  /**
   * Configuración resuelta base.
   */
  public readonly resolvedConfig = computed(() => this.inputConfig());

  // Computeds de resolución de estado
  protected readonly colorVariantComputed = computed(() => {
    const v = this.colorVariant() ?? this.inputConfig()?.colorVariant;
    return resolveAlfColorVariant(v);
  });



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
    const variant = this.colorVariantComputed() ?? AlfColorVariantEnum.Default;
    const base = resolveVariantConfig(variant).backgrounds;
    const resolved = this.resolvedConfig()?.backgrounds || {};
    const user = this.backgrounds() || {};

    return {
      default: { ...base.default, ...resolved.default, ...user.default },
      hover: { ...base.hover, ...resolved.hover, ...user.hover },
      focus: { ...base.focus, ...resolved.focus, ...user.focus },
      active: { ...base.active, ...resolved.active, ...user.active },
      disabled: { ...base.disabled, ...resolved.disabled, ...user.disabled },
    };
  });

  protected readonly displayAndLayoutComputed = computed(() => {
    const variant = this.colorVariantComputed() ?? AlfColorVariantEnum.Default;
    const base = resolveVariantConfig(variant).displayAndLayout;
    const resolved = this.resolvedConfig()?.displayAndLayout || {};
    const user = this.displayAndLayout() || {};

    return {
      ...base,
      ...resolved,
      ...user,
      default: { 
        ...base.default, 
        ...resolved.default, 
        ...user.default,
        cursor: this.cursorComputed()
      },
    };
  });

  protected readonly marginComputed = computed(() => {
    const variant = this.colorVariantComputed() ?? AlfColorVariantEnum.Default;
    const base = resolveVariantConfig(variant).margin;
    const resolved = this.resolvedConfig()?.margin || {};
    const user = this.margin() || {};

    return {
      ...base,
      ...resolved,
      ...user,
      default: { ...base.default, ...resolved.default, ...user.default },
    };
  });
  protected readonly outlineComputed = computed(() => {
    const variant = this.colorVariantComputed() ?? AlfColorVariantEnum.Default;
    const base = resolveVariantConfig(variant).outline;
    const resolved = this.resolvedConfig()?.outline || {};
    const user = this.outline() || {};

    return {
      ...base,
      ...resolved,
      ...user,
      default: { ...base.default, ...resolved.default, ...user.default },
      focus: { ...base.focus, ...resolved.focus, ...user.focus },
    };
  });

  protected readonly paddingComputed = computed(() => {
    const variant = this.colorVariantComputed() ?? AlfColorVariantEnum.Default;
    const base = resolveVariantConfig(variant).padding;
    const resolved = this.resolvedConfig()?.padding || {};
    const user = this.padding() || {};

    return {
      ...base,
      ...resolved,
      ...user,
      default: { ...base.default, ...resolved.default, ...user.default },
    };
  });

  protected readonly shadowsComputed = computed(() => {
    const variant = this.colorVariantComputed() ?? AlfColorVariantEnum.Default;
    const base = resolveVariantConfig(variant).shadows;
    const resolved = this.resolvedConfig()?.shadows || {};
    const user = this.shadows() || {};

    return {
      ...base,
      ...resolved,
      ...user,
      default: { ...base.default, ...resolved.default, ...user.default },
      hover: { ...base.hover, ...resolved.hover, ...user.hover },
      active: { ...base.active, ...resolved.active, ...user.active },
      focus: { ...base.focus, ...resolved.focus, ...user.focus },
      disabled: { ...base.disabled, ...resolved.disabled, ...user.disabled },
    };
  });

  protected readonly textStyleComputed = computed(() => {
    const variant = this.colorVariantComputed() ?? AlfColorVariantEnum.Default;
    const base = resolveVariantConfig(variant).textStyle;
    const resolved = this.resolvedConfig()?.textStyle || {};
    const user = this.textStyle() || {};

    return {
      ...base,
      ...resolved,
      ...user,
      default: { ...base.default, ...resolved.default, ...user.default },
      hover: { ...base.hover, ...resolved.hover, ...user.hover },
      active: { ...base.active, ...resolved.active, ...user.active },
      focus: { ...base.focus, ...resolved.focus, ...user.focus },
      disabled: { ...base.disabled, ...resolved.disabled, ...user.disabled },
    };
  });

  protected readonly typographyComputed = computed(() => {
    const variant = this.colorVariantComputed() ?? AlfColorVariantEnum.Default;
    const base = resolveVariantConfig(variant).typography;
    const resolved = this.resolvedConfig()?.typography || {};
    const user = this.typography() || {};

    return {
      ...base,
      ...resolved,
      ...user,
      default: { ...base.default, ...resolved.default, ...user.default },
      hover: { ...base.hover, ...resolved.hover, ...user.hover },
      active: { ...base.active, ...resolved.active, ...user.active },
      focus: { ...base.focus, ...resolved.focus, ...user.focus },
      disabled: { ...base.disabled, ...resolved.disabled, ...user.disabled },
    };
  });


  protected readonly transformComputed = computed(() => {
    const variant = this.colorVariantComputed() ?? AlfColorVariantEnum.Default;
    const base = resolveVariantConfig(variant).transform;
    const resolved = this.resolvedConfig()?.transform || {};
    const user = this.transform() || {};

    return {
      ...base,
      ...resolved,
      ...user,
      default: { ...base.default, ...resolved.default, ...user.default },
      hover: { ...base.hover, ...resolved.hover, ...user.hover },
      active: { ...base.active, ...resolved.active, ...user.active },
      focus: { ...base.focus, ...resolved.focus, ...user.focus },
      disabled: { ...base.disabled, ...resolved.disabled, ...user.disabled },
    };
  });

  protected readonly animationsComputed = computed(() => {
    const variant = this.colorVariantComputed() ?? AlfColorVariantEnum.Default;
    const base = resolveVariantConfig(variant).animations;
    const resolved = this.resolvedConfig()?.animations || {};
    const user = this.animations() || {};

    return {
      ...base,
      ...resolved,
      ...user,
    };
  });

  protected readonly borderComputed = computed(() => {
    const variant = this.colorVariantComputed() ?? AlfColorVariantEnum.Default;
    const base = resolveVariantConfig(variant).border;
    const resolved = this.resolvedConfig()?.border || {};
    const user = this.border() || {};

    return {
      default: { ...base.default, ...resolved.default, ...user.default },
      hover: { ...base.hover, ...resolved.hover, ...user.hover },
      focus: { ...base.focus, ...resolved.focus, ...user.focus },
      active: { ...base.active, ...resolved.active, ...user.active },
      disabled: { ...base.disabled, ...resolved.disabled, ...user.disabled },
    };
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

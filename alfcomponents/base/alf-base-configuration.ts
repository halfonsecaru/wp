import { computed, Directive, input, signal, WritableSignal } from '@angular/core';
import { AlfTooltipConfig } from '@alfcomponents/directives';
import { AlfColorVariantEnum, AlfCursorEnum, AlfSizeEnum } from '@alfcomponents/enums';
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
import { resolveVariantConfig, AlfComponentTypeEnum } from './defaultVariants';



@Directive()
export abstract class AlfBaseConfiguration<TConfig extends AlfBaseCommonConfigInterface> {
  protected abstract readonly visualPrefix: string;
  protected readonly componentType: AlfComponentTypeEnum = AlfComponentTypeEnum.Default;

  // Input de configuración principal
  public readonly inputConfig = input<TConfig>();

  // Inputs directos para sobrescritura
  public readonly tooltip = input<string | AlfTooltipConfig | undefined>();
  public readonly ripple = input<boolean | AlfRippleInterface | undefined>();
  public readonly colorVariant = input<AlfColorVariantEnum>();
  public readonly size = input<AlfSizeEnum>();
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
    const v = this.colorVariant() ?? this.inputConfig()?.variant;
    return resolveAlfColorVariant(v);
  });

  /** Resolves if the active variant is outline */
  public readonly isOutline = computed<boolean>(() => {
    const rawV = this.colorVariantComputed() as string;
    return !!rawV && /outline/i.test(rawV);
  });

  /** Resolves if the active variant is ghost */
  public readonly isGhost = computed<boolean>(() => {
    const rawV = this.colorVariantComputed() as string;
    return !!rawV && /ghost/i.test(rawV);
  });

  /** Resolves if the active variant is crystal */
  public readonly isCrystal = computed<boolean>(() => {
    const rawV = this.colorVariantComputed() as string;
    return !!rawV && /crystal/i.test(rawV);
  });

  /** Resolves if the active variant is soft */
  public readonly isSoft = computed<boolean>(() => {
    const rawV = this.colorVariantComputed() as string;
    return !!rawV && /soft/i.test(rawV);
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
  protected readonly resolvedVariantConfig = computed(() => {
    const variant = this.colorVariantComputed();
    if (!variant || variant === AlfColorVariantEnum.Default || variant === AlfColorVariantEnum.Transparent) return undefined;
    return resolveVariantConfig(variant, this.componentType);
  });

  // Computeds para estilos inyectados
  protected readonly backgroundsComputed = computed(() => {
    const base = this.resolvedVariantConfig()?.backgroundsBase;
    const resolved = this.resolvedConfig()?.backgrounds || {};
    const user = this.backgrounds() || {};

    return {
      default: { ...base?.default, ...resolved.default, ...user.default },
      hover: { ...base?.hover, ...resolved.hover, ...user.hover },
      focus: { ...base?.focus, ...resolved.focus, ...user.focus },
      active: { ...base?.active, ...resolved.active, ...user.active },
      disabled: { ...base?.disabled, ...resolved.disabled, ...user.disabled },
    };
  });

  // ******* Completado ******* //
  protected readonly displayAndLayoutComputed = computed(() => {
    const base = this.resolvedVariantConfig()?.displayAndLayoutBase;
    const resolved = this.resolvedConfig()?.displayAndLayout || {};
    const user = this.displayAndLayout() || {};

    return {
      default: {
        ...base?.default,
        ...resolved?.default,
        ...user?.default,
        cursor: this.cursorComputed()
      },
      hover: { ...base?.hover, ...resolved?.hover, ...user?.hover },
      active: { ...base?.active, ...resolved?.active, ...user?.active },
      focus: { ...base?.focus, ...resolved?.focus, ...user?.focus },
      disabled: { ...base?.disabled, ...resolved?.disabled, ...user?.disabled },
    };
  });
  // ************************** //


  // ******* Completado ******* //
  protected readonly marginComputed = computed(() => {
    const base = this.resolvedVariantConfig()?.marginBase;
    const resolved = this.resolvedConfig()?.margin || undefined;
    const user = this.margin() || undefined;

    return {
      default: { ...base?.default, ...resolved?.default, ...user?.default },
      hover: { ...base?.hover, ...resolved?.hover, ...user?.hover },
      active: { ...base?.active, ...resolved?.active, ...user?.active },
      focus: { ...base?.focus, ...resolved?.focus, ...user?.focus },
      disabled: { ...base?.disabled, ...resolved?.disabled, ...user?.disabled },
    };
  });
  // ************************** //

  protected readonly outlineComputed = computed(() => {
    const base = this.resolvedVariantConfig()?.outlineBase;
    const resolved = this.resolvedConfig()?.outline || {};
    const user = this.outline() || {};

    return {
      ...base,
      ...resolved,
      ...user,
      default: { ...base?.default, ...resolved.default, ...user.default },
      focus: { ...base?.focus, ...resolved.focus, ...user.focus },
    };
  });

  // ******* Completado ******* //
  protected readonly paddingComputed = computed(() => {
    const base = this.resolvedVariantConfig()?.paddingBase;
    const resolved = this.resolvedConfig()?.padding || undefined;
    const user = this.padding() || {};

    return {
      default: { ...base?.default, ...resolved?.default, ...user?.default },
      hover: { ...base?.hover, ...resolved?.hover, ...user?.hover },
      active: { ...base?.active, ...resolved?.active, ...user?.active },
      focus: { ...base?.focus, ...resolved?.focus, ...user?.focus },
      disabled: { ...base?.disabled, ...resolved?.disabled, ...user?.disabled },
    };
  });
  // ************************** //

  protected readonly typographyComputed = computed(() => {
    const base = this.resolvedVariantConfig()?.typographyBase;
    const resolved = this.resolvedConfig()?.typography || {};
    const user = this.typography() || {};

    return {
      default: { ...base?.default, ...resolved.default, ...user.default },
      hover: { ...base?.hover, ...resolved.hover, ...user.hover },
      active: { ...base?.active, ...resolved.active, ...user.active },
      focus: { ...base?.focus, ...resolved.focus, ...user.focus },
      disabled: { ...base?.disabled, ...resolved.disabled, ...user.disabled },
    };
  });

  protected readonly shadowsComputed = computed(() => {
    const base = this.resolvedVariantConfig()?.shadowsBase;
    const resolved = this.resolvedConfig()?.shadows || undefined;
    const user = this.shadows() || undefined;

    return {
      default: { ...base?.default, ...resolved?.default, ...user?.default },
      hover: { ...base?.hover, ...resolved?.hover, ...user?.hover },
      active: { ...base?.active, ...resolved?.active, ...user?.active },
      focus: { ...base?.focus, ...resolved?.focus, ...user?.focus },
      disabled: { ...base?.disabled, ...resolved?.disabled, ...user?.disabled },
    };
  });

  protected readonly textStyleComputed = computed(() => {
    const base = this.resolvedVariantConfig()?.textStyleBase;
    const resolved = this.resolvedConfig()?.textStyle || {};
    const user = this.textStyle() || {};

    return {
      ...base,
      ...resolved,
      ...user,
      default: { ...base?.default, ...resolved.default, ...user.default },
      hover: { ...base?.hover, ...resolved.hover, ...user.hover },
      active: { ...base?.active, ...resolved.active, ...user.active },
      focus: { ...base?.focus, ...resolved.focus, ...user.focus },
      disabled: { ...base?.disabled, ...resolved.disabled, ...user.disabled },
    };
  });




  protected readonly transformComputed = computed(() => {
    const base = this.resolvedVariantConfig()?.transformBase;
    const resolved = this.resolvedConfig()?.transform || {};
    const user = this.transform() || {};

    return {
      ...base,
      ...resolved,
      ...user,
      default: { ...base?.default, ...resolved.default, ...user.default },
      hover: { ...base?.hover, ...resolved.hover, ...user.hover },
      active: { ...base?.active, ...resolved.active, ...user.active },
      focus: { ...base?.focus, ...resolved.focus, ...user.focus },
      disabled: { ...base?.disabled, ...resolved.disabled, ...user.disabled },
    };
  });

  protected readonly animationsComputed = computed(() => {
    const base = this.resolvedVariantConfig()?.animationsBase;
    const resolved = this.resolvedConfig()?.animations || {};
    const user = this.animations() || {};

    return {
      ...base,
      ...resolved,
      ...user,
    };
  });

  protected readonly borderComputed = computed(() => {
    const base = this.resolvedVariantConfig()?.borderBase;
    const resolved = this.resolvedConfig()?.border || {};
    const user = this.border() || {};

    return {
      default: { ...base?.default, ...resolved.default, ...user.default },
      hover: { ...base?.hover, ...resolved.hover, ...user.hover },
      focus: { ...base?.focus, ...resolved.focus, ...user.focus },
      active: { ...base?.active, ...resolved.active, ...user.active },
      disabled: { ...base?.disabled, ...resolved.disabled, ...user.disabled },
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

  public readonly combinedStyles = computed(() => {
    const variant = this.colorVariantComputed();
    const resolved = this.resolvedVariantConfig();

    return [
      visualBackgroundBase(this.visualPrefix, {
        type: variant,
        backgrounds: this.backgroundsComputed(),
        componentType: this.componentType,
        resolvedVariant: resolved,
      }),
      visualBorderBase(this.visualPrefix, {
        type: variant,
        border: this.borderComputed(),
        componentType: this.componentType,
        resolvedVariant: resolved,
      }),
      visualPaddingBase(this.visualPrefix, {
        type: variant,
        padding: this.paddingComputed(),
        componentType: this.componentType,
        resolvedVariant: resolved,
      }),
      visualShadowsBase(this.visualPrefix, {
        type: variant,
        shadows: this.shadowsComputed(),
        componentType: this.componentType,
        resolvedVariant: resolved,
      }),
      visualTypographyBase(this.visualPrefix, {
        type: variant,
        typography: this.typographyComputed(),
        componentType: this.componentType,
        resolvedVariant: resolved,
      }),
      visualTextStyleBase(this.visualPrefix, {
        type: variant,
        textStyle: this.textStyleComputed(),
        componentType: this.componentType,
        resolvedVariant: resolved,
      }),
      visualDisplayAndLayoutBase(this.visualPrefix, {
        type: variant,
        displayAndLayout: this.displayAndLayoutComputed(),
      }),
      visualMarginBase(this.visualPrefix, {
        type: variant,
        margin: this.marginComputed(),
        componentType: this.componentType,
        resolvedVariant: resolved,
      }),
      visualOutlineBase(this.visualPrefix, {
        type: variant,
        outline: this.outlineComputed(),
        componentType: this.componentType,
        resolvedVariant: resolved,
      }),
      visualTransformBase(this.visualPrefix, {
        type: variant,
        transform: this.transformComputed(),
        componentType: this.componentType,
        resolvedVariant: resolved,
      }),
      visualAnimationsBase(this.visualPrefix, {
        type: variant,
        animations: this.animationsComputed(),
        componentType: this.componentType,
        resolvedVariant: resolved,
      }),
      this.customStyleComputed()
    ].filter(Boolean).join(' ');
  });

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

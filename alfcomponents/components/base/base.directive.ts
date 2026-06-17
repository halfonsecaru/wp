import { computed, Directive, effect, input, signal, inject, ElementRef, untracked } from '@angular/core';
import { AlfBackgroundsInterface, AlfBackgroundsBaseInterface, AlfBorderInterface, AlfBorderBaseInterface, AlfOutlineInterface, AlfOutlineBaseInterface, AlfShadowsInterface, AlfShadowsBaseInterface, AlfAnimateCssInterface, AlfMarginInterface, AlfMarginBaseInterface, AlfPaddingInterface, AlfPaddingBaseInterface, AlfTypographyInterface, AlfTypographyBaseInterface, AlfTextStyleInterface, AlfTextStyleStateBaseInterface, AlfTransformInterface, AlfTransformBaseInterface, AlfDisplayAndLayoutInterface, AlfDisplayAndLayoutBaseInterface, AlfRippleInterface, AlfAriaBaseInterface, AlfTransitionInterface, AlfTransitionBaseInterface } from '@alfcomponents/interfaces';
import {
  AlfAlignItemsEnum,
  AlfAnimationTypeEnum,
  AlfBorderStyleEnum,
  AlfColorEnum,
  AlfColorVariantEnum,
  AlfCssPositionEnum,
  AlfCursorEnum,
  AlfDisplayEnum,
  AlfFontFamilyEnum,
  AlfFontSizeEnum,
  AlfFontStyleEnum,
  AlfFontWeightEnum,
  AlfJustifyContentEnum,
  AlfLetterSpacingEnum,
  AlfLineHeightEnum,
  AlfOpacityEnum,
  AlfOverflowWrapEnum,
  AlfPxEnum,
  AlfRadiusEnum,
  AlfShadowEnum,
  AlfSizeEnum,
  AlfTextAlignEnum,
  AlfTextDecorationEnum,
  AlfTextOverflowEnum,
  AlfTextShadowEnum,
  AlfTextTransformEnum,
  AlfVerticalAlignEnum,
  AlfVisibilityEnum,
  AlfWhiteSpaceEnum,
  AlfWordBreakEnum,
  AlfBackgroundSizeEnum,
  AlfPositionEnum,
  AlfBackgroundRepeatEnum,
  AlfBackgroundAttachmentEnum,
  AlfBackgroundClipEnum
} from '@alfcomponents/enums';
import { AlfTooltipConfig } from '@alfcomponents/directives';
import { AlfDisplayAndLayoutDirective } from '@alfcomponents/visualStyles';

export enum AlfComponentTypeEnum {
  Button = 'Button',
  Switch = 'Switch',
  Checkbox = 'Checkbox',
  RadioButton = 'RadioButton',
  Input = 'Input',
  Textarea = 'Textarea',
  Tabs = 'alf-tabs',
  Autocomplete = 'Autocomplete',
  Card = 'Card',
  Default = 'Default',
}

export interface PredefinedConfig {
  marginBase: AlfMarginInterface;
  paddingBase: AlfPaddingInterface;
  displayAndLayoutBase: AlfDisplayAndLayoutInterface;
  shadowsBase: AlfShadowsInterface;
  transformBase: AlfTransformInterface;
  backgroundsBase: AlfBackgroundsInterface;
  typographyBase: AlfTypographyInterface;
  borderBase: AlfBorderInterface;
  animationsBase: AlfAnimateCssInterface;
  ripple: AlfRippleInterface;
  textStyleBase: AlfTextStyleInterface;
  outlineBase: AlfOutlineInterface;
  transitionBase: AlfTransitionInterface;
}

const backgroundInitial: AlfBackgroundsBaseInterface = {
  backgroundColor: AlfColorEnum.Transparent,
  backgroundSize: AlfBackgroundSizeEnum.Auto,
  backgroundPosition: AlfPositionEnum.TopLeft,
  backgroundRepeat: AlfBackgroundRepeatEnum.Repeat,
  backgroundAttachment: AlfBackgroundAttachmentEnum.Scroll,
  backgroundClip: AlfBackgroundClipEnum.BorderBox,
  backgroundImage: 'none',
};

const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

const marginInitial: AlfMarginBaseInterface = {
  margin: AlfPxEnum.None
};

const paddingInitial: AlfPaddingBaseInterface = {
  padding: AlfPxEnum.None
};

const textStyleInitial: AlfTextStyleStateBaseInterface = {
  color: AlfColorEnum.Black,
}



@Directive()
export abstract class AlfBaseDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  private readonly visualPredefined = effect(() => {
    if (this.componentType()) {

      const predefined = this.resolveVariantConfig(this.activeVariant(), this.componentType()!);

      let paddingConfig: AlfPaddingInterface | undefined = undefined;
      let displayConfig: AlfDisplayAndLayoutInterface | undefined = undefined;
      if(this.variant()){

        if (this.componentType() === AlfComponentTypeEnum.Button) {
  
          paddingConfig = {
            default: {
              padding: AlfPxEnum.Px20
            }
          };
  
          displayConfig = {
            default: {
              minWidth: AlfPxEnum.Px100
            }
          };
        } else if (this.componentType() === AlfComponentTypeEnum.Input) {

          paddingConfig = {
            default: {
              paddingTop: AlfPxEnum.Px20,
              paddingBottom: AlfPxEnum.Px20,
            }
          };
        }
      }

      this._background.set(predefined.backgroundsBase);
      this._border.set(predefined.borderBase);
      this._outline.set(predefined.outlineBase);
      this._shadows.set(predefined.shadowsBase);
      this._margin.set(predefined.marginBase);
      this._padding.set(paddingConfig ? paddingConfig : predefined.paddingBase);
      this._typography.set(predefined.typographyBase);
      this._textStyle.set(predefined.textStyleBase);
      this._transform.set(predefined.transformBase);
      this._transition.set(predefined.transitionBase);
      this._displayAndLayout.set({
        ...predefined.displayAndLayoutBase,

        default: {
          ...predefined.displayAndLayoutBase?.default,
          ...displayConfig?.default
        }
      });
    }
  });

  // Variantes
  public readonly colorVariant = input<AlfColorVariantEnum | undefined>(undefined);
  public readonly variant = input<AlfColorVariantEnum>();
  public readonly activeVariant = computed(() => {
    const v = this.colorVariant() ?? this.variant();
    if (!v) {
      return undefined;
    }
    return v;
  });

  public readonly componentType = signal<AlfComponentTypeEnum>(AlfComponentTypeEnum.Default);


  // **** Inputs signals **** //
  public readonly background = input<AlfBackgroundsInterface | AlfBackgroundsBaseInterface | undefined>(undefined);
  private readonly _background = signal<AlfBackgroundsInterface | AlfBackgroundsBaseInterface | undefined>(backgroundInitial, { equal: deepEqual });

  public readonly border = input<AlfBorderInterface | AlfBorderBaseInterface | undefined>(undefined);
  private readonly _border = signal<AlfBorderInterface | AlfBorderBaseInterface | undefined>(undefined, { equal: deepEqual });

  public readonly outline = input<AlfOutlineInterface | AlfOutlineBaseInterface | undefined>(undefined);
  private readonly _outline = signal<AlfOutlineInterface | AlfOutlineBaseInterface | undefined>(undefined, { equal: deepEqual });

  public readonly shadows = input<AlfShadowsInterface | AlfShadowsBaseInterface | undefined>(undefined);
  private readonly _shadows = signal<AlfShadowsInterface | AlfShadowsBaseInterface | undefined>(undefined, { equal: deepEqual });

  public readonly margin = input<AlfMarginInterface | AlfMarginBaseInterface | undefined>(undefined);
  private readonly _margin = signal<AlfMarginInterface | AlfMarginBaseInterface | undefined>(marginInitial, { equal: deepEqual });

  public readonly padding = input<AlfPaddingInterface | AlfPaddingBaseInterface | undefined>(undefined);
  private readonly _padding = signal<AlfPaddingInterface | AlfPaddingBaseInterface | undefined>(paddingInitial, { equal: deepEqual });

  public readonly typography = input<AlfTypographyInterface | AlfTypographyBaseInterface | undefined>(undefined);
  private readonly _typography = signal<AlfTypographyInterface | AlfTypographyBaseInterface | undefined>(undefined, { equal: deepEqual });

  public readonly textStyle = input<AlfTextStyleInterface | AlfTextStyleStateBaseInterface | undefined>(undefined);
  private readonly _textStyle = signal<AlfTextStyleInterface | AlfTextStyleStateBaseInterface | undefined>(textStyleInitial, { equal: deepEqual });

  public readonly transform = input<AlfTransformInterface | AlfTransformBaseInterface | undefined>(undefined);
  private readonly _transform = signal<AlfTransformInterface | AlfTransformBaseInterface | undefined>(undefined, { equal: deepEqual });

  public readonly transition = input<AlfTransitionInterface | AlfTransitionBaseInterface | undefined>(undefined);
  private readonly _transition = signal<AlfTransitionInterface | AlfTransitionBaseInterface | undefined>(undefined, { equal: deepEqual });

  public readonly displayAndLayout = input<AlfDisplayAndLayoutInterface | AlfDisplayAndLayoutBaseInterface | undefined>(undefined);
  private readonly _displayAndLayout = signal<AlfDisplayAndLayoutInterface | AlfDisplayAndLayoutBaseInterface | undefined>(undefined, { equal: deepEqual });

  public readonly ripple = input<boolean | AlfRippleInterface | undefined>(undefined);
  public readonly cursor = input<AlfCursorEnum | undefined>(undefined);
  public readonly size = input<AlfSizeEnum | undefined>(undefined);
  public readonly animations = input<AlfAnimateCssInterface | undefined>(undefined);
  public readonly isExiting = input<boolean>(false);
  public readonly tooltip = input<string | AlfTooltipConfig | undefined>(undefined);

  public readonly aria = input<AlfAriaBaseInterface | undefined>(undefined);
  public readonly customClass = input<string | undefined>(undefined);
  public readonly customStyle = input<string | undefined>(undefined);

  public readonly disabled = input<boolean | undefined>(undefined);
  public readonly isDisabledInput = input<boolean | undefined>(undefined, { alias: 'isDisabled' });
  public readonly isDisabled = computed<boolean>(() => this.disabled() === true || this.isDisabledInput() === true);
  public readonly isLoading = input<boolean | undefined>(undefined);

  public readonly isSoft = computed<boolean>(() => this.activeVariant()?.toLowerCase().includes('soft') ?? false);
  public readonly isCrystal = computed<boolean>(() => this.activeVariant()?.toLowerCase().includes('crystal') ?? false);
  public readonly isGhost = computed<boolean>(() => this.activeVariant()?.toLowerCase().includes('ghost') ?? false);

  // getters for internal state signals (used for untracked reads in derived effects)
  protected getInternalBackground() { return untracked(() => this._background()); }
  protected getInternalBorder() { return untracked(() => this._border()); }
  protected getInternalOutline() { return untracked(() => this._outline()); }
  protected getInternalShadows() { return untracked(() => this._shadows()); }
  protected getInternalMargin() { return untracked(() => this._margin()); }
  protected getInternalPadding() { return untracked(() => this._padding()); }
  protected getInternalTypography() { return untracked(() => this._typography()); }
  protected getInternalTextStyle() { return untracked(() => this._textStyle()); }
  protected getInternalTransform() { return untracked(() => this._transform()); }
  protected getInternalTransition() { return untracked(() => this._transition()); }
  protected getInternalDisplayAndLayout() { return untracked(() => this._displayAndLayout()); }

  // setters
  protected setBackground(value: AlfBackgroundsInterface | AlfBackgroundsBaseInterface) {
    this._background.set(value);
  };
  protected setBorder(value: AlfBorderInterface | AlfBorderBaseInterface) {
    this._border.set(value);
  };
  protected setOutline(value: AlfOutlineInterface | AlfOutlineBaseInterface) {
    this._outline.set(value);
  };
  protected setShadows(value: AlfShadowsInterface | AlfShadowsBaseInterface) {
    this._shadows.set(value);
  };
  protected setMargin(value: AlfMarginInterface | AlfMarginBaseInterface) {
    this._margin.set(value);
  };
  protected setPadding(value: AlfPaddingInterface | AlfPaddingBaseInterface) {
    this._padding.set(value);
  };
  protected setTypography(value: AlfTypographyInterface | AlfTypographyBaseInterface) {
    this._typography.set(value);
  };
  protected setTextStyle(value: AlfTextStyleInterface | AlfTextStyleStateBaseInterface) {
    this._textStyle.set(value);
  };
  protected setTransform(value: AlfTransformInterface | AlfTransformBaseInterface) {
    this._transform.set(value);
  };
  protected setTransition(value: AlfTransitionInterface | AlfTransitionBaseInterface) {
    this._transition.set(value);
  };
  protected setDisplayAndLayout(value: AlfDisplayAndLayoutInterface | AlfDisplayAndLayoutBaseInterface) {
    this._displayAndLayout.set(value);
  };
  
  // Computed 
  public readonly backgroundComputed = computed(() => {
    return this.deepMergeStates(this._background(), this.background());
  });

  public readonly borderComputed = computed(() => {
    return this.deepMergeStates(this._border(), this.border());
  });

  public readonly outlineComputed = computed(() => {
    return this.deepMergeStates(this._outline(), this.outline());
  });

  public readonly shadowsComputed = computed(() => {
    return this.deepMergeStates(this._shadows(), this.shadows());
  });

  public readonly marginComputed = computed(() => {
    return this.deepMergeStates(this._margin(), this.margin());
  });

  public readonly paddingComputed = computed(() => {
    return this.deepMergeStates(this._padding(), this.padding());
  });

  public readonly typographyComputed = computed(() => {
    return this.deepMergeStates(this._typography(), this.typography());
  });

  public readonly textStyleComputed = computed(() => {
    return this.deepMergeStates(this._textStyle(), this.textStyle());
  });

  public readonly transformComputed = computed(() => {
    return this.deepMergeStates(this._transform(), this.transform());
  });

  public readonly transitionComputed = computed(() => {
    return {
      ...this._transition(),
      ...this.transition()
    };
  });

  public readonly displayAndLayoutComputed = computed(() => {
    return this.deepMergeStates(this._displayAndLayout(), this.displayAndLayout());
  });

  protected deepMergeStates(...configs: any[]): any {
    const result: any = {};
    for (const config of configs) {
      if (!config) continue;
      for (const [state, stateObj] of Object.entries(config)) {
        if (!stateObj) continue;
        result[state] = { ...result[state], ...(stateObj as any) };
      }
    }
    return Object.keys(result).length > 0 ? result : undefined;
  }

  // ==========================================
  // Animations on Host
  // ==========================================
  protected readonly resolvedStage = computed(() => {
    const config = this.animations();
    if (!config) return undefined;
    return this.isExiting() ? config.exitStage : (config.enterStage || config.type);
  });

  protected readonly resolvedClasses = computed(() => {
    const stage = this.resolvedStage();
    if (!stage) return [];
    
    let stageStr = typeof stage === 'string' ? stage : (stage as any).name || (stage as any).type;
    if (!stageStr || stageStr === 'none') return [];
    
    const classes = ['animate__animated'];
    if (stageStr.includes('animate__')) {
      classes.push(...stageStr.split(' ').filter((c: string) => c.trim()));
    } else {
      classes.push(`animate__${stageStr}`);
    }
    
    const config = this.animations();
    if (config?.infinite && !this.isExiting()) {
      classes.push('animate__infinite');
    }
    
    return Array.from(new Set(classes));
  });

  protected readonly resolvedDuration = computed(() => {
    const stage = this.resolvedStage();
    const config = this.animations();
    if (stage && typeof stage !== 'string' && (stage as any).duration) return (stage as any).duration;
    return config?.duration;
  });

  protected readonly resolvedDelay = computed(() => {
    const stage = this.resolvedStage();
    const config = this.animations();
    if (this.isExiting()) return '0s';
    if (stage && typeof stage !== 'string' && (stage as any).delay) return (stage as any).delay;
    return config?.delay;
  });

  protected readonly resolvedIterationCount = computed(() => {
    const stage = this.resolvedStage();
    const config = this.animations();
    if (stage && typeof stage !== 'string' && (stage as any).iterationCount) return (stage as any).iterationCount;
    if (config?.infinite && !this.isExiting()) return 'infinite';
    return config?.iterationCount;
  });

  protected readonly resolvedTimingFunction = computed(() => {
    const stage = this.resolvedStage();
    const config = this.animations();
    if (stage && typeof stage !== 'string' && (stage as any).timingFunction) return (stage as any).timingFunction;
    return config?.timingFunction;
  });

  protected readonly resolvedFillMode = computed(() => {
    const stage = this.resolvedStage();
    const config = this.animations();
    if (stage && typeof stage !== 'string' && (stage as any).fillMode) return (stage as any).fillMode;
    return config?.fillMode || 'both';
  });

  protected readonly resolvedDirection = computed(() => {
    const stage = this.resolvedStage();
    const config = this.animations();
    if (stage && typeof stage !== 'string' && (stage as any).direction) return (stage as any).direction;
    return config?.direction;
  });

  private previousAnimClasses: string[] = [];

  private readonly _animationsEffect = effect(() => {
    const el = this.el.nativeElement as HTMLElement;
    const newClasses = this.resolvedClasses();
    
    this.previousAnimClasses.forEach(cls => {
      if (!newClasses.includes(cls)) el.classList.remove(cls);
    });
    
    newClasses.forEach(cls => {
      if (!this.previousAnimClasses.includes(cls)) el.classList.add(cls);
    });
    
    this.previousAnimClasses = [...newClasses];

    const set = (prop: string, val: string | number | undefined) => {
      if (val != null) el.style.setProperty(prop, String(val));
      else el.style.removeProperty(prop);
    };

    // Use native animate.css variables instead of the alf ones so we don't need alf-animations-style
    set('--animate-duration', this.resolvedDuration());
    set('--animate-delay', this.resolvedDelay());
    set('--animate-repeat', this.resolvedIterationCount());
    // Animate.css doesn't use variables for fill-mode, timing-function, and direction natively by default, 
    // so we set them inline if provided
    set('animation-timing-function', this.resolvedTimingFunction());
    set('animation-fill-mode', this.resolvedFillMode());
    set('animation-direction', this.resolvedDirection());
  });

  private readonly resolveAlfColorVariant = (v: any): AlfColorVariantEnum => {
    if (!v) return AlfColorVariantEnum.Default;
    if (typeof v === 'string') {
      const values = Object.values(AlfColorVariantEnum) as string[];
      if (values.includes(v)) return v as AlfColorVariantEnum;
      const keys = Object.keys(AlfColorVariantEnum);
      const cleanV = v.toLowerCase().replace(/[-_]/g, '');
      let foundKey = keys.find(k => k.toLowerCase().replace(/[-_]/g, '') === cleanV);
      if (!foundKey && v.includes('-')) {
        const parts = v.split('-');
        if (parts.length === 2) {
          const reversed = `${parts[1]}-${parts[0]}`;
          if (values.includes(reversed)) {
            return reversed as AlfColorVariantEnum;
          }
        }
      }
      if (foundKey) {
        return (AlfColorVariantEnum as any)[foundKey];
      }
      return AlfColorVariantEnum.Default;
    }
    return v;
  };

  private readonly buildTypographyBaseConfig = (main: AlfColorEnum, hover: AlfColorEnum, focus: AlfColorEnum, disabled: AlfColorEnum, active: AlfColorEnum): AlfTypographyInterface => {
    const base: AlfTypographyBaseInterface = {
      fontSize: AlfFontSizeEnum.Base,
      fontWeight: AlfFontWeightEnum.Normal,
      lineHeight: AlfLineHeightEnum.Normal,
      textAlign: AlfTextAlignEnum.Left,
      color: main,
      letterSpacing: AlfLetterSpacingEnum.Normal,
      whiteSpace: AlfWhiteSpaceEnum.Normal,
      wordBreak: AlfWordBreakEnum.Normal,
      textTransform: AlfTextTransformEnum.None,
      textDecoration: AlfTextDecorationEnum.None,
      fontStyle: AlfFontStyleEnum.Normal,
      opacity: AlfOpacityEnum.Opacity100,
      fontFamily: AlfFontFamilyEnum.System,
      overflowWrap: AlfOverflowWrapEnum.Normal,
      textOverflow: AlfTextOverflowEnum.Clip,
      textShadow: AlfTextShadowEnum.None,
      verticalAlign: AlfVerticalAlignEnum.Middle,
    }

    return {
      default: base,
      hover: {
        color: hover,
      },
      focus: {
        color: focus,
      },
      disabled: {
        color: disabled,
      },
      active: {
        color: active,
      },
    }
  };


  private readonly buildTransformBaseConfig = (): AlfTransformBaseInterface => ({
    translateX: AlfPxEnum.None,
    translateY: AlfPxEnum.None,
    translateZ: AlfPxEnum.None,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    scale: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skewX: 0,
    skewY: 0,
    perspective: AlfPxEnum.None,
    transformStyle: 'flat' as any,
    backfaceVisibility: AlfVisibilityEnum.Visible
  });


  private readonly buildShadowsBaseConfig = (main: AlfColorEnum, hover: AlfColorEnum, focus: AlfColorEnum, disabled: AlfColorEnum, active: AlfColorEnum, shadowType: AlfShadowEnum = AlfShadowEnum.None): AlfShadowsInterface => {
    // Derive state-specific shadow levels from the base shadowType
    const hoverShadow = shadowType !== AlfShadowEnum.None ? AlfShadowEnum.Sm : AlfShadowEnum.None;
    const activeShadow = AlfShadowEnum.None;
    const disabledShadow = AlfShadowEnum.None;

    return {
      default: {
        boxShadow: shadowType,
        boxShadowColor: main,
        boxShadowInset: false,
        textShadow: AlfTextShadowEnum.None,
        textShadowColor: main
      },
      hover: {
        boxShadow: hoverShadow,
        boxShadowColor: hover,
        boxShadowInset: false,
        textShadow: AlfTextShadowEnum.None,
        textShadowColor: hover
      },
      focus: {
        boxShadow: shadowType,
        boxShadowColor: focus,
        boxShadowInset: false,
        textShadow: AlfTextShadowEnum.None,
        textShadowColor: focus
      },
      disabled: {
        boxShadow: disabledShadow,
        boxShadowColor: disabled,
        boxShadowInset: false,
        textShadow: AlfTextShadowEnum.None,
        textShadowColor: disabled
      },
      active: {
        boxShadow: activeShadow,
        boxShadowColor: active,
        boxShadowInset: false,
        textShadow: AlfTextShadowEnum.None,
        textShadowColor: active
      }
    }
  };


  private readonly buildAnimationsBaseConfig = (): AlfAnimateCssInterface => ({
    enterStage: AlfAnimationTypeEnum.FadeIn,
    exitStage: AlfAnimationTypeEnum.FadeOut,
    duration: '300ms',
    delay: '0ms',
    iterationCount: 1,
    direction: 'normal'
  });

  private readonly buildPaddingBaseConfig = (): AlfPaddingInterface => {
    const basePadding: AlfPaddingInterface = {
      default: {
        padding: AlfPxEnum.None,
      }
    };
    return basePadding;
  };

  private readonly buildOutlineBaseConfig = (main: AlfColorEnum, hover: AlfColorEnum, focus: AlfColorEnum, disabled: AlfColorEnum, active: AlfColorEnum): AlfOutlineInterface => {
    // AlfOutlineBaseInterface
    const base: AlfOutlineInterface = {
      default: {
        outlineColor: AlfColorEnum.Transparent,
        outlineWidth: AlfPxEnum.None,
      }
    };
    return base;
  };


  private readonly buildMarginBaseConfig = (): AlfMarginInterface => {
    const base: AlfMarginInterface = {
      default: {
        margin: AlfPxEnum.None,
      }
    };
    return base;
  };

  private readonly buildDisplayAndLayoutBaseConfig = (): AlfDisplayAndLayoutInterface => {
    const base: AlfDisplayAndLayoutBaseInterface =
    {
      display: AlfDisplayEnum.InlineFlex,
      position: AlfCssPositionEnum.Relative,
      cursor: AlfCursorEnum.Pointer,
      justifyContent: AlfJustifyContentEnum.Center,
      alignItems: AlfAlignItemsEnum.Center,
      width: AlfPxEnum.auto,
      height: AlfPxEnum.Px30,
      overflow: 'hidden' as any,
    };
    return {
      default: { ...base }
    };
  }

  private readonly buildColorBackgroundConfig = (
    main: AlfColorEnum,
    hover: AlfColorEnum,
    disabled?: AlfColorEnum
  ): AlfBackgroundsInterface => {
    const isGrad = (val: string) => val?.includes('gradient');
    const state = (v: AlfColorEnum) => isGrad(v)
      ? { backgroundImage: v, backgroundColor: AlfColorEnum.Transparent }
      : { backgroundColor: v, backgroundImage: 'none' };

    return {
      default: state(main),
      hover: state(hover),
      focus: state(hover),
      active: state(hover),
      disabled: state(disabled)
    };
  };

  private readonly buildColorBorderConfig = (
    main: AlfColorEnum,
    hover: AlfColorEnum,
    width: AlfPxEnum = AlfPxEnum.Px015,
    disabled?: AlfColorEnum
  ): AlfBorderInterface => {
    const base = {
      borderColor: main,
      borderStyle: AlfBorderStyleEnum.Solid,
      borderWidth: width,
      borderRadius: AlfRadiusEnum.Lg,
    };

    return {
      default: base,
      hover: { borderColor: hover },
      focus: { borderColor: hover },
      active: { borderColor: hover },
      disabled: { borderColor: disabled ? disabled : AlfColorEnum.Gray300 },
    };
  };

  private readonly buildTextStyleConfig = (main: AlfColorEnum, hover?: AlfColorEnum, focus?: AlfColorEnum, disabled?: AlfColorEnum, active?: AlfColorEnum): AlfTextStyleInterface => {
    return {
      default: {
        color: main,
        fontWeight: AlfFontWeightEnum.Normal,

      },
      hover: {
        color: hover ? hover : main,
        fontWeight: AlfFontWeightEnum.Normal,
      },
      focus: {

        color: focus ? focus : main,
        fontWeight: AlfFontWeightEnum.Normal,
      },
      disabled: {

        color: disabled ? disabled : AlfColorEnum.PrimaryDisabled,
        fontWeight: AlfFontWeightEnum.Normal,
      },
      active: {
        color: active ? active : main,
        fontWeight: AlfFontWeightEnum.Normal,
      }
    }
  };

  private readonly buildTransformConfig = (): AlfTransformInterface => ({
    default: { ...this.buildTransformBaseConfig() }
  });

  // ── CONSTRUCTORES BASE: El ADN neutro del sistema ───────────────────────

  private readonly defaultConstruct = (
    main: AlfColorEnum,
    hover: AlfColorEnum,
    focus: AlfColorEnum,
    disabled: AlfColorEnum,
    active: AlfColorEnum,
    backgroundDefault?: AlfColorEnum,
    backgroundHover?: AlfColorEnum,
    borderDefault?: AlfColorEnum,
    borderHover?: AlfColorEnum,
    borderWidth?: AlfPxEnum,
    textStyleDefault?: AlfColorEnum,
    textStyleHover?: AlfColorEnum,
    textStyleFocus?: AlfColorEnum,
    textStyleDisabled?: AlfColorEnum,
    textStyleActive?: AlfColorEnum,
    shadowType?: AlfShadowEnum,
  ) => {
    if (!backgroundDefault) {
      backgroundDefault = AlfColorEnum.Transparent;
    }
    if (!backgroundHover) {
      backgroundHover = AlfColorEnum.Transparent;
    }
    if (!borderDefault) {
      borderDefault = AlfColorEnum.Transparent;
    }
    if (!borderHover) {
      borderHover = AlfColorEnum.Transparent;
    }
    if (!borderWidth) {
      const needsBorder = [
        AlfComponentTypeEnum.RadioButton,
        AlfComponentTypeEnum.Checkbox,
        AlfComponentTypeEnum.Switch,
        AlfComponentTypeEnum.Tabs,
        AlfComponentTypeEnum.Card,
      ].includes(this.componentType());
      borderWidth = needsBorder ? AlfPxEnum.Px1 : AlfPxEnum.None;
    }
    const completed = {
      paddingBase: this.buildPaddingBaseConfig(),
      displayAndLayoutBase: this.buildDisplayAndLayoutBaseConfig(),
      marginBase: this.buildMarginBaseConfig(),
      animationsBase: this.buildAnimationsBaseConfig(),
      transitionBase: this.buildTransitionBaseConfig(),
      transformBase: this.buildTransformConfig(),
      typographyBase: this.buildTypographyBaseConfig(main, hover, focus, disabled, active),
      borderBase: this.buildColorBorderConfig(borderDefault, borderHover, borderWidth, disabled),
      textStyleBase: this.buildTextStyleConfig(
        textStyleDefault ? textStyleDefault : main,
        textStyleHover ? textStyleHover : hover,
        textStyleFocus ? textStyleFocus : focus,
        textStyleDisabled ? textStyleDisabled : disabled,
        textStyleActive ? textStyleActive : active
      ),
      shadowsBase: this.buildShadowsBaseConfig(main, hover, focus, disabled, active, shadowType),
      outlineBase: this.buildOutlineBaseConfig(main, hover, focus, disabled, active),
      backgroundsBase: this.buildColorBackgroundConfig(backgroundDefault, backgroundHover, disabled),
      ripple: { color: main }
    } as PredefinedConfig;

    return completed;
  }

  private buildTransitionBaseConfig(): AlfTransitionInterface {
    return {
      default: {
        duration: '700ms',
        timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        property: 'all'
      },
      hover: {
        duration: '300ms',
        timingFunction: 'ease-out',
      },
      active: {
        duration: '150ms',
        timingFunction: 'ease-out',
      }
    };
  }

  private readonly resolveVariantConfig = (
    variant?: AlfColorVariantEnum,
    componentType?: AlfComponentTypeEnum
  ): PredefinedConfig => {
    const v = this.resolveAlfColorVariant(variant);

    if (!v || v === AlfColorVariantEnum.Transparent || v === AlfColorVariantEnum.Default) {
      const fullConfig = this.defaultConstruct(
        AlfColorEnum.SecondaryOutlineText, AlfColorEnum.SecondaryOutlineTextHover, AlfColorEnum.SecondaryOutlineTextHover, AlfColorEnum.SecondaryOutlineDisabled, AlfColorEnum.SecondaryOutlineTextHover,
        AlfColorEnum.SecondaryOutlineBG, AlfColorEnum.SecondaryOutlineHoverBG,
        AlfColorEnum.SecondaryOutline, AlfColorEnum.SecondaryOutlineHover, AlfPxEnum.Px1
      );

      const onlyDefaultConfig: any = {};
      for (const [key, baseValue] of Object.entries(fullConfig)) {
        if (baseValue && typeof baseValue === 'object' && 'default' in baseValue) {
          onlyDefaultConfig[key] = { default: (baseValue as any).default };
        } else {
          onlyDefaultConfig[key] = baseValue;
        }
      }

      return onlyDefaultConfig as PredefinedConfig;
    }

    const outlinedFilledComponents = [
      AlfComponentTypeEnum.RadioButton,
      AlfComponentTypeEnum.Checkbox,
      AlfComponentTypeEnum.Switch,
      AlfComponentTypeEnum.Tabs,
      AlfComponentTypeEnum.Card,
    ];



    switch (v as any) {

      // FAMILY: PRIMARY
      case AlfColorVariantEnum.Primary:
        return this.defaultConstruct(AlfColorEnum.PrimaryText, AlfColorEnum.PrimaryTextHover, AlfColorEnum.PrimaryTextHover, AlfColorEnum.PrimaryTextDisabled, AlfColorEnum.PrimaryTextHover, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover);
      case AlfColorVariantEnum.Primary3D:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.Primary3DText, AlfColorEnum.Primary3DTextHover, AlfColorEnum.Primary3DTextHover, AlfColorEnum.PrimaryDisabled, AlfColorEnum.Primary3DTextHover, AlfColorEnum.Primary3D, AlfColorEnum.Primary3DHover, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfPxEnum.Px1, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.PrimaryDisabled, AlfColorEnum.White, AlfShadowEnum.Md);
        }
        return this.defaultConstruct(AlfColorEnum.Primary3DText, AlfColorEnum.Primary3DTextHover, AlfColorEnum.Primary3DTextHover, AlfColorEnum.PrimaryDisabled, AlfColorEnum.Primary3DTextHover, AlfColorEnum.Primary3D, AlfColorEnum.Primary3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, undefined, undefined, undefined, undefined, undefined, AlfShadowEnum.Md);
      case AlfColorVariantEnum.PrimaryOutline:
        return this.defaultConstruct(AlfColorEnum.PrimaryOutlineText, AlfColorEnum.PrimaryOutlineTextHover, AlfColorEnum.PrimaryOutlineTextHover, AlfColorEnum.PrimaryOutlineDisabled, AlfColorEnum.PrimaryOutlineTextHover, AlfColorEnum.PrimaryOutlineHoverBG, AlfColorEnum.PrimaryOutlineHoverBG, AlfColorEnum.PrimaryOutline, AlfColorEnum.PrimaryOutlineHover, AlfPxEnum.Px015);
      case AlfColorVariantEnum.PrimarySoft:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.PrimarySoftText, AlfColorEnum.PrimarySoftTextHover, AlfColorEnum.PrimarySoftFocus, AlfColorEnum.PrimarySoftDisabled, AlfColorEnum.PrimarySoftActive, AlfColorEnum.PrimarySoft, AlfColorEnum.PrimarySoftHover, AlfColorEnum.PrimarySoftText, AlfColorEnum.PrimarySoftTextHover, AlfPxEnum.Px1, AlfColorEnum.PrimarySoftText, AlfColorEnum.PrimarySoftTextHover, AlfColorEnum.PrimarySoftText, AlfColorEnum.PrimarySoftDisabled, AlfColorEnum.PrimarySoftText);
        }
        return this.defaultConstruct(AlfColorEnum.PrimarySoftText, AlfColorEnum.PrimarySoftTextHover, AlfColorEnum.PrimarySoftFocus, AlfColorEnum.PrimarySoftDisabled, AlfColorEnum.PrimarySoftActive, AlfColorEnum.PrimarySoft, AlfColorEnum.PrimarySoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.PrimaryGhost:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.PrimaryGhostText, AlfColorEnum.PrimaryGhostTextHover, AlfColorEnum.PrimaryGhostFocus, AlfColorEnum.PrimaryGhostDisabled, AlfColorEnum.PrimaryGhostActive, AlfColorEnum.PrimaryGhostHover, AlfColorEnum.PrimaryGhostHover, AlfColorEnum.PrimaryGhostText, AlfColorEnum.PrimaryGhostTextHover, AlfPxEnum.Px1, AlfColorEnum.PrimaryGhostText, AlfColorEnum.PrimaryGhostTextHover, AlfColorEnum.PrimaryGhostText, AlfColorEnum.PrimaryGhostDisabled, AlfColorEnum.PrimaryGhostText);
        }
        return this.defaultConstruct(AlfColorEnum.PrimaryGhostText, AlfColorEnum.PrimaryGhostTextHover, AlfColorEnum.PrimaryGhostFocus, AlfColorEnum.PrimaryGhostDisabled, AlfColorEnum.PrimaryGhostActive, AlfColorEnum.PrimaryGhostHover, AlfColorEnum.PrimaryGhostHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.PrimaryCrystal:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.PrimaryCrystalText, AlfColorEnum.PrimaryCrystalTextHover, AlfColorEnum.PrimaryCrystalFocus, AlfColorEnum.PrimaryCrystalDisabled, AlfColorEnum.PrimaryCrystalActive, AlfColorEnum.PrimaryCrystal, AlfColorEnum.PrimaryCrystalHover, AlfColorEnum.PrimaryCrystalText, AlfColorEnum.PrimaryCrystalTextHover, AlfPxEnum.Px1, AlfColorEnum.PrimaryCrystalText, AlfColorEnum.PrimaryCrystalTextHover, AlfColorEnum.PrimaryCrystalText, AlfColorEnum.PrimaryCrystalDisabled, AlfColorEnum.PrimaryCrystalText);
        }
        return this.defaultConstruct(AlfColorEnum.PrimaryCrystalText, AlfColorEnum.PrimaryCrystalTextHover, AlfColorEnum.PrimaryCrystalFocus, AlfColorEnum.PrimaryCrystalDisabled, AlfColorEnum.PrimaryCrystalActive, AlfColorEnum.PrimaryCrystal, AlfColorEnum.PrimaryCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

      // FAMILY: SECONDARY
      case AlfColorVariantEnum.Secondary:
        return this.defaultConstruct(AlfColorEnum.SecondaryText, AlfColorEnum.SecondaryTextHover, AlfColorEnum.SecondaryTextHover, AlfColorEnum.SecondaryTextDisabled, AlfColorEnum.SecondaryTextHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover);
      case AlfColorVariantEnum.Secondary3D:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.Secondary3DText, AlfColorEnum.Secondary3DTextHover, AlfColorEnum.Secondary3DTextHover, AlfColorEnum.SecondaryDisabled, AlfColorEnum.Secondary3DTextHover, AlfColorEnum.Secondary3D, AlfColorEnum.Secondary3DHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfPxEnum.Px1, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.SecondaryDisabled, AlfColorEnum.White, AlfShadowEnum.Md);
        }
        return this.defaultConstruct(AlfColorEnum.Secondary3DText, AlfColorEnum.Secondary3DTextHover, AlfColorEnum.Secondary3DTextHover, AlfColorEnum.SecondaryDisabled, AlfColorEnum.Secondary3DTextHover, AlfColorEnum.Secondary3D, AlfColorEnum.Secondary3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, undefined, undefined, undefined, undefined, undefined, AlfShadowEnum.Md);
      case AlfColorVariantEnum.SecondaryOutline:
        return this.defaultConstruct(AlfColorEnum.SecondaryOutlineText, AlfColorEnum.SecondaryOutlineTextHover, AlfColorEnum.SecondaryOutlineTextHover, AlfColorEnum.SecondaryOutlineDisabled, AlfColorEnum.SecondaryOutlineTextHover, AlfColorEnum.SecondaryOutlineBG, AlfColorEnum.SecondaryOutlineHoverBG, AlfColorEnum.SecondaryOutline, AlfColorEnum.SecondaryOutlineHover, AlfPxEnum.Px1);
      case AlfColorVariantEnum.SecondarySoft:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.SecondarySoftText, AlfColorEnum.SecondarySoftTextHover, AlfColorEnum.SecondarySoftFocus, AlfColorEnum.SecondarySoftDisabled, AlfColorEnum.SecondarySoftActive, AlfColorEnum.SecondarySoft, AlfColorEnum.SecondarySoftHover, AlfColorEnum.SecondarySoftText, AlfColorEnum.SecondarySoftTextHover, AlfPxEnum.Px1, AlfColorEnum.SecondarySoftText, AlfColorEnum.SecondarySoftTextHover, AlfColorEnum.SecondarySoftText, AlfColorEnum.SecondarySoftDisabled, AlfColorEnum.SecondarySoftText);
        }
        return this.defaultConstruct(AlfColorEnum.SecondarySoftText, AlfColorEnum.SecondarySoftTextHover, AlfColorEnum.SecondarySoftFocus, AlfColorEnum.SecondarySoftDisabled, AlfColorEnum.SecondarySoftActive, AlfColorEnum.SecondarySoft, AlfColorEnum.SecondarySoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.SecondaryGhost:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfColorEnum.SecondaryGhostFocus, AlfColorEnum.SecondaryGhostDisabled, AlfColorEnum.SecondaryGhostActive, AlfColorEnum.SecondaryGhostHoverBG, AlfColorEnum.SecondaryGhostHoverBG, AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfPxEnum.Px1, AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostDisabled, AlfColorEnum.SecondaryGhostText);
        }
        return this.defaultConstruct(AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfColorEnum.SecondaryGhostFocus, AlfColorEnum.SecondaryGhostDisabled, AlfColorEnum.SecondaryGhostActive, AlfColorEnum.SecondaryGhostHoverBG, AlfColorEnum.SecondaryGhostHoverBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.SecondaryCrystal:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.SecondaryCrystalText, AlfColorEnum.SecondaryCrystalTextHover, AlfColorEnum.SecondaryCrystalFocus, AlfColorEnum.SecondaryCrystalDisabled, AlfColorEnum.SecondaryCrystalActive, AlfColorEnum.SecondaryCrystal, AlfColorEnum.SecondaryCrystalHover, AlfColorEnum.SecondaryCrystalText, AlfColorEnum.SecondaryCrystalTextHover, AlfPxEnum.Px1, AlfColorEnum.SecondaryCrystalText, AlfColorEnum.SecondaryCrystalTextHover, AlfColorEnum.SecondaryCrystalText, AlfColorEnum.SecondaryCrystalDisabled, AlfColorEnum.SecondaryCrystalText);
        }
        return this.defaultConstruct(AlfColorEnum.SecondaryCrystalText, AlfColorEnum.SecondaryCrystalTextHover, AlfColorEnum.SecondaryCrystalFocus, AlfColorEnum.SecondaryCrystalDisabled, AlfColorEnum.SecondaryCrystalActive, AlfColorEnum.SecondaryCrystal, AlfColorEnum.SecondaryCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

      // FAMILY: SUCCESS
      case AlfColorVariantEnum.Success:
        return this.defaultConstruct(AlfColorEnum.SuccessText, AlfColorEnum.SuccessTextHover, AlfColorEnum.SuccessTextHover, AlfColorEnum.SuccessTextDisabled, AlfColorEnum.SuccessTextHover, AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.Success, AlfColorEnum.SuccessHover);
      case AlfColorVariantEnum.Success3D:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.Success3DText, AlfColorEnum.Success3DTextHover, AlfColorEnum.Success3DTextHover, AlfColorEnum.SuccessDisabled, AlfColorEnum.Success3DTextHover, AlfColorEnum.Success3D, AlfColorEnum.Success3DHover, AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfPxEnum.Px1, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.SuccessDisabled, AlfColorEnum.White, AlfShadowEnum.Md);
        }
        return this.defaultConstruct(AlfColorEnum.Success3DText, AlfColorEnum.Success3DTextHover, AlfColorEnum.Success3DTextHover, AlfColorEnum.SuccessDisabled, AlfColorEnum.Success3DTextHover, AlfColorEnum.Success3D, AlfColorEnum.Success3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, undefined, undefined, undefined, undefined, undefined, AlfShadowEnum.Md);
      case AlfColorVariantEnum.SuccessOutline:
        return this.defaultConstruct(AlfColorEnum.SuccessOutlineText, AlfColorEnum.SuccessOutlineTextHover, AlfColorEnum.SuccessOutlineTextHover, AlfColorEnum.SuccessOutlineDisabled, AlfColorEnum.SuccessOutlineTextHover, AlfColorEnum.SuccessOutlineBG, AlfColorEnum.SuccessOutlineHoverBG, AlfColorEnum.SuccessOutline, AlfColorEnum.SuccessOutlineHover, AlfPxEnum.Px1);
      case AlfColorVariantEnum.SuccessSoft:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.SuccessSoftText, AlfColorEnum.SuccessSoftTextHover, AlfColorEnum.SuccessSoftFocus, AlfColorEnum.SuccessSoftDisabled, AlfColorEnum.SuccessSoftActive, AlfColorEnum.SuccessSoft, AlfColorEnum.SuccessSoftHover, AlfColorEnum.SuccessSoftText, AlfColorEnum.SuccessSoftTextHover, AlfPxEnum.Px1, AlfColorEnum.SuccessSoftText, AlfColorEnum.SuccessSoftTextHover, AlfColorEnum.SuccessSoftText, AlfColorEnum.SuccessDisabled, AlfColorEnum.SuccessSoftText);
        }
        return this.defaultConstruct(AlfColorEnum.SuccessSoftText, AlfColorEnum.SuccessSoftTextHover, AlfColorEnum.SuccessSoftFocus, AlfColorEnum.SuccessSoftDisabled, AlfColorEnum.SuccessSoftActive, AlfColorEnum.SuccessSoft, AlfColorEnum.SuccessSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);

      case AlfColorVariantEnum.SuccessGhost:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.SuccessGhostText, AlfColorEnum.SuccessGhostTextHover, AlfColorEnum.SuccessGhostFocus, AlfColorEnum.SuccessGhostDisabled, AlfColorEnum.SuccessGhostActive, AlfColorEnum.SuccessGhostHoverBG, AlfColorEnum.SuccessGhostHoverBG, AlfColorEnum.SuccessGhostText, AlfColorEnum.SuccessGhostTextHover, AlfPxEnum.Px1, AlfColorEnum.SuccessGhostText, AlfColorEnum.SuccessGhostTextHover, AlfColorEnum.SuccessGhostText, AlfColorEnum.SuccessGhostDisabled, AlfColorEnum.SuccessGhostText);
        }
        return this.defaultConstruct(AlfColorEnum.SuccessGhostText, AlfColorEnum.SuccessGhostTextHover, AlfColorEnum.SuccessGhostFocus, AlfColorEnum.SuccessGhostDisabled, AlfColorEnum.SuccessGhostActive, AlfColorEnum.SuccessGhostHoverBG, AlfColorEnum.SuccessGhostHoverBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.SuccessCrystal:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.SuccessCrystalText, AlfColorEnum.SuccessCrystalTextHover, AlfColorEnum.SuccessCrystalFocus, AlfColorEnum.SuccessCrystalDisabled, AlfColorEnum.SuccessCrystalActive, AlfColorEnum.SuccessCrystal, AlfColorEnum.SuccessCrystalHover, AlfColorEnum.SuccessCrystalText, AlfColorEnum.SuccessCrystalTextHover, AlfPxEnum.Px1, AlfColorEnum.SuccessCrystalText, AlfColorEnum.SuccessCrystalTextHover, AlfColorEnum.SuccessCrystalText, AlfColorEnum.SuccessCrystalDisabled, AlfColorEnum.SuccessCrystalText);
        }
        return this.defaultConstruct(AlfColorEnum.SuccessCrystalText, AlfColorEnum.SuccessCrystalTextHover, AlfColorEnum.SuccessCrystalFocus, AlfColorEnum.SuccessCrystalDisabled, AlfColorEnum.SuccessCrystalActive, AlfColorEnum.SuccessCrystal, AlfColorEnum.SuccessCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

      // FAMILY: DANGER
      case AlfColorVariantEnum.Danger:
        return this.defaultConstruct(AlfColorEnum.DangerText, AlfColorEnum.DangerTextHover, AlfColorEnum.DangerTextHover, AlfColorEnum.DangerTextDisabled, AlfColorEnum.DangerTextHover, AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.Danger, AlfColorEnum.DangerHover);
      case AlfColorVariantEnum.Danger3D:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.Danger3DText, AlfColorEnum.Danger3DTextHover, AlfColorEnum.Danger3DTextHover, AlfColorEnum.DangerDisabled, AlfColorEnum.Danger3DTextHover, AlfColorEnum.Danger3D, AlfColorEnum.Danger3DHover, AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfPxEnum.Px1, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.DangerDisabled, AlfColorEnum.White, AlfShadowEnum.Md);
        }
        return this.defaultConstruct(AlfColorEnum.Danger3DText, AlfColorEnum.Danger3DTextHover, AlfColorEnum.Danger3DTextHover, AlfColorEnum.DangerDisabled, AlfColorEnum.Danger3DTextHover, AlfColorEnum.Danger3D, AlfColorEnum.Danger3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, undefined, undefined, undefined, undefined, undefined, AlfShadowEnum.Md);
      case AlfColorVariantEnum.DangerOutline:
        return this.defaultConstruct(AlfColorEnum.DangerOutlineText, AlfColorEnum.DangerOutlineTextHover, AlfColorEnum.DangerOutlineTextHover, AlfColorEnum.DangerOutlineDisabled, AlfColorEnum.DangerOutlineTextHover, AlfColorEnum.DangerOutlineBG, AlfColorEnum.DangerOutlineHoverBG, AlfColorEnum.DangerOutline, AlfColorEnum.DangerOutlineHover, AlfPxEnum.Px1);
      case AlfColorVariantEnum.DangerSoft:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.DangerSoftText, AlfColorEnum.DangerSoftTextHover, AlfColorEnum.DangerSoftFocus, AlfColorEnum.DangerSoftDisabled, AlfColorEnum.DangerSoftActive, AlfColorEnum.DangerSoft, AlfColorEnum.DangerSoftHover, AlfColorEnum.DangerSoftText, AlfColorEnum.DangerSoftTextHover, AlfPxEnum.Px1, AlfColorEnum.DangerSoftText, AlfColorEnum.DangerSoftTextHover, AlfColorEnum.DangerSoftText, AlfColorEnum.DangerSoftDisabled, AlfColorEnum.DangerSoftText);
        }
        return this.defaultConstruct(AlfColorEnum.DangerSoftText, AlfColorEnum.DangerSoftTextHover, AlfColorEnum.DangerSoftFocus, AlfColorEnum.DangerSoftDisabled, AlfColorEnum.DangerSoftActive, AlfColorEnum.DangerSoft, AlfColorEnum.DangerSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.DangerGhost:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.DangerGhostText, AlfColorEnum.DangerGhostTextHover, AlfColorEnum.DangerGhostFocus, AlfColorEnum.DangerGhostDisabled, AlfColorEnum.DangerGhostActive, AlfColorEnum.DangerGhostHoverBG, AlfColorEnum.DangerGhostHoverBG, AlfColorEnum.DangerGhostText, AlfColorEnum.DangerGhostTextHover, AlfPxEnum.Px1, AlfColorEnum.DangerGhostText, AlfColorEnum.DangerGhostTextHover, AlfColorEnum.DangerGhostText, AlfColorEnum.DangerGhostDisabled, AlfColorEnum.DangerGhostText);
        }
        return this.defaultConstruct(AlfColorEnum.DangerGhostText, AlfColorEnum.DangerGhostTextHover, AlfColorEnum.DangerGhostFocus, AlfColorEnum.DangerGhostDisabled, AlfColorEnum.DangerGhostActive, AlfColorEnum.DangerGhostHoverBG, AlfColorEnum.DangerGhostHoverBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.DangerCrystal:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.DangerCrystalText, AlfColorEnum.DangerCrystalTextHover, AlfColorEnum.DangerCrystalFocus, AlfColorEnum.DangerCrystalDisabled, AlfColorEnum.DangerCrystalActive, AlfColorEnum.DangerCrystal, AlfColorEnum.DangerCrystalHover, AlfColorEnum.DangerCrystalText, AlfColorEnum.DangerCrystalTextHover, AlfPxEnum.Px1, AlfColorEnum.DangerCrystalText, AlfColorEnum.DangerCrystalTextHover, AlfColorEnum.DangerCrystalText, AlfColorEnum.DangerCrystalDisabled, AlfColorEnum.DangerCrystalText);
        }
        return this.defaultConstruct(AlfColorEnum.DangerCrystalText, AlfColorEnum.DangerCrystalTextHover, AlfColorEnum.DangerCrystalFocus, AlfColorEnum.DangerCrystalDisabled, AlfColorEnum.DangerCrystalActive, AlfColorEnum.DangerCrystal, AlfColorEnum.DangerCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

      // FAMILY: WARNING
      case AlfColorVariantEnum.Warning:
        return this.defaultConstruct(AlfColorEnum.WarningText, AlfColorEnum.WarningTextHover, AlfColorEnum.WarningTextHover, AlfColorEnum.WarningTextDisabled, AlfColorEnum.WarningTextHover, AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfColorEnum.Warning, AlfColorEnum.WarningHover);
      case AlfColorVariantEnum.Warning3D:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.Warning3DText, AlfColorEnum.Warning3DTextHover, AlfColorEnum.Warning3DTextHover, AlfColorEnum.WarningDisabled, AlfColorEnum.Warning3DTextHover, AlfColorEnum.Warning3D, AlfColorEnum.Warning3DHover, AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfPxEnum.Px1, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.WarningDisabled, AlfColorEnum.White, AlfShadowEnum.Md);
        }
        return this.defaultConstruct(AlfColorEnum.Warning3DText, AlfColorEnum.Warning3DTextHover, AlfColorEnum.Warning3DTextHover, AlfColorEnum.WarningDisabled, AlfColorEnum.Warning3DTextHover, AlfColorEnum.Warning3D, AlfColorEnum.Warning3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, undefined, undefined, undefined, undefined, undefined, AlfShadowEnum.Md);
      case AlfColorVariantEnum.WarningOutline:
        return this.defaultConstruct(AlfColorEnum.WarningOutlineText, AlfColorEnum.WarningOutlineTextHover, AlfColorEnum.WarningOutlineTextHover, AlfColorEnum.WarningOutlineDisabled, AlfColorEnum.WarningOutlineTextHover, AlfColorEnum.WarningOutlineBG, AlfColorEnum.WarningOutlineHoverBG, AlfColorEnum.WarningOutline, AlfColorEnum.WarningOutlineHover, AlfPxEnum.Px1);
      case AlfColorVariantEnum.WarningSoft:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.WarningSoftText, AlfColorEnum.WarningSoftTextHover, AlfColorEnum.WarningSoftFocus, AlfColorEnum.WarningSoftDisabled, AlfColorEnum.WarningSoftActive, AlfColorEnum.WarningSoft, AlfColorEnum.WarningSoftHover, AlfColorEnum.WarningSoftText, AlfColorEnum.WarningSoftTextHover, AlfPxEnum.Px1, AlfColorEnum.WarningSoftText, AlfColorEnum.WarningSoftTextHover, AlfColorEnum.WarningSoftText, AlfColorEnum.WarningSoftDisabled, AlfColorEnum.WarningSoftText);
        }
        return this.defaultConstruct(AlfColorEnum.WarningSoftText, AlfColorEnum.WarningSoftTextHover, AlfColorEnum.WarningSoftFocus, AlfColorEnum.WarningSoftDisabled, AlfColorEnum.WarningSoftActive, AlfColorEnum.WarningSoft, AlfColorEnum.WarningSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.WarningGhost:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.WarningGhostText, AlfColorEnum.WarningGhostTextHover, AlfColorEnum.WarningGhostFocus, AlfColorEnum.WarningGhostDisabled, AlfColorEnum.WarningGhostActive, AlfColorEnum.WarningGhostHoverBG, AlfColorEnum.WarningGhostHoverBG, AlfColorEnum.WarningGhostText, AlfColorEnum.WarningGhostTextHover, AlfPxEnum.Px1, AlfColorEnum.WarningGhostText, AlfColorEnum.WarningGhostTextHover, AlfColorEnum.WarningGhostText, AlfColorEnum.WarningGhostDisabled, AlfColorEnum.WarningGhostText);
        }
        return this.defaultConstruct(AlfColorEnum.WarningGhostText, AlfColorEnum.WarningGhostTextHover, AlfColorEnum.WarningGhostFocus, AlfColorEnum.WarningGhostDisabled, AlfColorEnum.WarningGhostActive, AlfColorEnum.WarningGhostHoverBG, AlfColorEnum.WarningGhostHoverBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.WarningCrystal:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.WarningCrystalText, AlfColorEnum.WarningCrystalTextHover, AlfColorEnum.WarningCrystalFocus, AlfColorEnum.WarningCrystalDisabled, AlfColorEnum.WarningCrystalActive, AlfColorEnum.WarningCrystal, AlfColorEnum.WarningCrystalHover, AlfColorEnum.WarningCrystalText, AlfColorEnum.WarningCrystalTextHover, AlfPxEnum.Px1, AlfColorEnum.WarningCrystalText, AlfColorEnum.WarningCrystalTextHover, AlfColorEnum.WarningCrystalText, AlfColorEnum.WarningCrystalDisabled, AlfColorEnum.WarningCrystalText);
        }
        return this.defaultConstruct(AlfColorEnum.WarningCrystalText, AlfColorEnum.WarningCrystalTextHover, AlfColorEnum.WarningCrystalFocus, AlfColorEnum.WarningCrystalDisabled, AlfColorEnum.WarningCrystalActive, AlfColorEnum.WarningCrystal, AlfColorEnum.WarningCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

      // FAMILY: INFO
      case AlfColorVariantEnum.Info:
        return this.defaultConstruct(AlfColorEnum.InfoText, AlfColorEnum.InfoTextHover, AlfColorEnum.InfoTextHover, AlfColorEnum.InfoTextDisabled, AlfColorEnum.InfoTextHover, AlfColorEnum.Info, AlfColorEnum.InfoHover, AlfColorEnum.Info, AlfColorEnum.InfoHover);
      case AlfColorVariantEnum.Info3D:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.Info3DText, AlfColorEnum.Info3DTextHover, AlfColorEnum.Info3DTextHover, AlfColorEnum.InfoDisabled, AlfColorEnum.Info3DTextHover, AlfColorEnum.Info3D, AlfColorEnum.Info3DHover, AlfColorEnum.Info, AlfColorEnum.InfoHover, AlfPxEnum.Px1, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.InfoDisabled, AlfColorEnum.White, AlfShadowEnum.Md);
        }
        return this.defaultConstruct(AlfColorEnum.Info3DText, AlfColorEnum.Info3DTextHover, AlfColorEnum.Info3DTextHover, AlfColorEnum.InfoDisabled, AlfColorEnum.Info3DTextHover, AlfColorEnum.Info3D, AlfColorEnum.Info3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, undefined, undefined, undefined, undefined, undefined, AlfShadowEnum.Md);
      case AlfColorVariantEnum.InfoOutline:
        return this.defaultConstruct(AlfColorEnum.InfoOutlineText, AlfColorEnum.InfoOutlineTextHover, AlfColorEnum.InfoOutlineTextHover, AlfColorEnum.InfoOutlineDisabled, AlfColorEnum.InfoOutlineTextHover, AlfColorEnum.InfoOutlineBG, AlfColorEnum.InfoOutlineHoverBG, AlfColorEnum.InfoOutline, AlfColorEnum.InfoOutlineHover, AlfPxEnum.Px1);
      case AlfColorVariantEnum.InfoSoft:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.InfoSoftText, AlfColorEnum.InfoSoftTextHover, AlfColorEnum.InfoSoftFocus, AlfColorEnum.InfoSoftDisabled, AlfColorEnum.InfoSoftActive, AlfColorEnum.InfoSoft, AlfColorEnum.InfoSoftHover, AlfColorEnum.InfoSoftText, AlfColorEnum.InfoSoftTextHover, AlfPxEnum.Px1, AlfColorEnum.InfoSoftText, AlfColorEnum.InfoSoftTextHover, AlfColorEnum.InfoSoftText, AlfColorEnum.InfoSoftDisabled, AlfColorEnum.InfoSoftText);
        }
        return this.defaultConstruct(AlfColorEnum.InfoSoftText, AlfColorEnum.InfoSoftTextHover, AlfColorEnum.InfoSoftFocus, AlfColorEnum.InfoSoftDisabled, AlfColorEnum.InfoSoftActive, AlfColorEnum.InfoSoft, AlfColorEnum.InfoSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.InfoGhost:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.InfoGhostText, AlfColorEnum.InfoGhostTextHover, AlfColorEnum.InfoGhostFocus, AlfColorEnum.InfoGhostDisabled, AlfColorEnum.InfoGhostActive, AlfColorEnum.InfoGhostHoverBG, AlfColorEnum.InfoGhostHoverBG, AlfColorEnum.InfoGhostText, AlfColorEnum.InfoGhostTextHover, AlfPxEnum.Px1, AlfColorEnum.InfoGhostText, AlfColorEnum.InfoGhostTextHover, AlfColorEnum.InfoGhostText, AlfColorEnum.InfoGhostDisabled, AlfColorEnum.InfoGhostText);
        }
        return this.defaultConstruct(AlfColorEnum.InfoGhostText, AlfColorEnum.InfoGhostTextHover, AlfColorEnum.InfoGhostFocus, AlfColorEnum.InfoGhostDisabled, AlfColorEnum.InfoGhostActive, AlfColorEnum.InfoGhostHoverBG, AlfColorEnum.InfoGhostHoverBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.InfoCrystal:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.InfoCrystalText, AlfColorEnum.InfoCrystalTextHover, AlfColorEnum.InfoCrystalFocus, AlfColorEnum.InfoCrystalDisabled, AlfColorEnum.InfoCrystalActive, AlfColorEnum.InfoCrystal, AlfColorEnum.InfoCrystalHover, AlfColorEnum.InfoCrystalText, AlfColorEnum.InfoCrystalTextHover, AlfPxEnum.Px1, AlfColorEnum.InfoCrystalText, AlfColorEnum.InfoCrystalTextHover, AlfColorEnum.InfoCrystalText, AlfColorEnum.InfoCrystalDisabled, AlfColorEnum.InfoCrystalText);
        }
        return this.defaultConstruct(AlfColorEnum.InfoCrystalText, AlfColorEnum.InfoCrystalTextHover, AlfColorEnum.InfoCrystalFocus, AlfColorEnum.InfoCrystalDisabled, AlfColorEnum.InfoCrystalActive, AlfColorEnum.InfoCrystal, AlfColorEnum.InfoCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

      // FAMILY: DARK
      case AlfColorVariantEnum.Dark:
        return this.defaultConstruct(AlfColorEnum.DarkText, AlfColorEnum.DarkTextHover, AlfColorEnum.DarkTextHover, AlfColorEnum.DarkTextDisabled, AlfColorEnum.DarkTextHover, AlfColorEnum.Dark, AlfColorEnum.DarkHover, AlfColorEnum.Dark, AlfColorEnum.DarkHover);
      case AlfColorVariantEnum.Dark3D:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.Dark3DText, AlfColorEnum.Dark3DTextHover, AlfColorEnum.Dark3DTextHover, AlfColorEnum.DarkDisabled, AlfColorEnum.Dark3DTextHover, AlfColorEnum.Dark3D, AlfColorEnum.Dark3DHover, AlfColorEnum.Dark, AlfColorEnum.DarkHover, AlfPxEnum.Px1, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.DarkDisabled, AlfColorEnum.White, AlfShadowEnum.Md);
        }
        return this.defaultConstruct(AlfColorEnum.Dark3DText, AlfColorEnum.Dark3DTextHover, AlfColorEnum.Dark3DTextHover, AlfColorEnum.DarkDisabled, AlfColorEnum.Dark3DTextHover, AlfColorEnum.Dark3D, AlfColorEnum.Dark3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, undefined, undefined, undefined, undefined, undefined, AlfShadowEnum.Md);
      case AlfColorVariantEnum.DarkOutline:
        return this.defaultConstruct(AlfColorEnum.DarkOutlineText, AlfColorEnum.DarkOutlineTextHover, AlfColorEnum.DarkOutlineTextHover, AlfColorEnum.DarkOutlineDisabled, AlfColorEnum.DarkOutlineTextHover, AlfColorEnum.DarkOutlineBG, AlfColorEnum.DarkOutlineHoverBG, AlfColorEnum.DarkOutline, AlfColorEnum.DarkOutlineHover, AlfPxEnum.Px1);
      case AlfColorVariantEnum.DarkSoft:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.DarkSoftText, AlfColorEnum.DarkSoftTextHover, AlfColorEnum.DarkSoftFocus, AlfColorEnum.DarkSoftDisabled, AlfColorEnum.DarkSoftActive, AlfColorEnum.DarkSoft, AlfColorEnum.DarkSoftHover, AlfColorEnum.DarkSoftText, AlfColorEnum.DarkSoftTextHover, AlfPxEnum.Px1, AlfColorEnum.DarkSoftText, AlfColorEnum.DarkSoftTextHover, AlfColorEnum.DarkSoftText, AlfColorEnum.DarkSoftDisabled, AlfColorEnum.DarkSoftText);
        }
        return this.defaultConstruct(AlfColorEnum.DarkSoftText, AlfColorEnum.DarkSoftTextHover, AlfColorEnum.DarkSoftFocus, AlfColorEnum.DarkSoftDisabled, AlfColorEnum.DarkSoftActive, AlfColorEnum.DarkSoft, AlfColorEnum.DarkSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.DarkGhost:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.DarkGhostText, AlfColorEnum.DarkGhostTextHover, AlfColorEnum.DarkGhostFocus, AlfColorEnum.DarkGhostDisabled, AlfColorEnum.DarkGhostActive, AlfColorEnum.DarkGhostHoverBG, AlfColorEnum.DarkGhostHoverBG, AlfColorEnum.DarkGhostText, AlfColorEnum.DarkGhostTextHover, AlfPxEnum.Px1, AlfColorEnum.DarkGhostText, AlfColorEnum.DarkGhostTextHover, AlfColorEnum.DarkGhostText, AlfColorEnum.DarkGhostDisabled, AlfColorEnum.DarkGhostText);
        }
        return this.defaultConstruct(AlfColorEnum.DarkGhostText, AlfColorEnum.DarkGhostTextHover, AlfColorEnum.DarkGhostFocus, AlfColorEnum.DarkGhostDisabled, AlfColorEnum.DarkGhostActive, AlfColorEnum.DarkGhostHoverBG, AlfColorEnum.DarkGhostHoverBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.DarkCrystal:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.DarkCrystalText, AlfColorEnum.DarkCrystalTextHover, AlfColorEnum.DarkCrystalFocus, AlfColorEnum.DarkCrystalDisabled, AlfColorEnum.DarkCrystalActive, AlfColorEnum.DarkCrystal, AlfColorEnum.DarkCrystalHover, AlfColorEnum.DarkCrystalText, AlfColorEnum.DarkCrystalTextHover, AlfPxEnum.Px1, AlfColorEnum.DarkCrystalText, AlfColorEnum.DarkCrystalTextHover, AlfColorEnum.DarkCrystalText, AlfColorEnum.DarkCrystalDisabled, AlfColorEnum.DarkCrystalText);
        }
        return this.defaultConstruct(AlfColorEnum.DarkCrystalText, AlfColorEnum.DarkCrystalTextHover, AlfColorEnum.DarkCrystalFocus, AlfColorEnum.DarkCrystalDisabled, AlfColorEnum.DarkCrystalActive, AlfColorEnum.DarkCrystal, AlfColorEnum.DarkCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

      // FAMILY: LIGHT
      case AlfColorVariantEnum.Light:
        return this.defaultConstruct(AlfColorEnum.LightText, AlfColorEnum.LightTextHover, AlfColorEnum.LightTextHover, AlfColorEnum.LightTextDisabled, AlfColorEnum.LightTextHover, AlfColorEnum.Light, AlfColorEnum.LightHover, AlfColorEnum.Light, AlfColorEnum.LightHover);
      case AlfColorVariantEnum.Light3D:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.Light3DText, AlfColorEnum.Light3DTextHover, AlfColorEnum.Light3DTextHover, AlfColorEnum.LightDisabled, AlfColorEnum.Light3DTextHover, AlfColorEnum.Light3D, AlfColorEnum.Light3DHover, AlfColorEnum.LightOutline, AlfColorEnum.LightOutlineHover, AlfPxEnum.Px1, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.LightDisabled, AlfColorEnum.White, AlfShadowEnum.Md);
        }
        return this.defaultConstruct(AlfColorEnum.Light3DText, AlfColorEnum.Light3DTextHover, AlfColorEnum.Light3DTextHover, AlfColorEnum.LightDisabled, AlfColorEnum.Light3DTextHover, AlfColorEnum.Light3D, AlfColorEnum.Light3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, undefined, undefined, undefined, undefined, undefined, AlfShadowEnum.Md);
      case AlfColorVariantEnum.LightOutline:
        return this.defaultConstruct(AlfColorEnum.LightOutlineText, AlfColorEnum.LightOutlineTextHover, AlfColorEnum.LightOutlineTextHover, AlfColorEnum.LightOutlineDisabled, AlfColorEnum.LightOutlineTextHover, AlfColorEnum.LightOutlineBG, AlfColorEnum.LightOutlineHoverBG, AlfColorEnum.LightOutline, AlfColorEnum.LightOutlineHover, AlfPxEnum.Px1);
      case AlfColorVariantEnum.LightSoft:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.LightSoftText, AlfColorEnum.LightSoftTextHover, AlfColorEnum.LightSoftFocus, AlfColorEnum.LightSoftDisabled, AlfColorEnum.LightSoftActive, AlfColorEnum.LightSoft, AlfColorEnum.LightSoftHover, AlfColorEnum.LightSoftText, AlfColorEnum.LightSoftTextHover, AlfPxEnum.Px1, AlfColorEnum.LightSoftText, AlfColorEnum.LightSoftTextHover, AlfColorEnum.LightSoftText, AlfColorEnum.LightSoftDisabled, AlfColorEnum.LightSoftText);
        }
        return this.defaultConstruct(AlfColorEnum.LightSoftText, AlfColorEnum.LightSoftTextHover, AlfColorEnum.LightSoftFocus, AlfColorEnum.LightSoftDisabled, AlfColorEnum.LightSoftActive, AlfColorEnum.LightSoft, AlfColorEnum.LightSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.LightGhost:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.LightGhostText, AlfColorEnum.LightGhostTextHover, AlfColorEnum.LightGhostFocus, AlfColorEnum.LightGhostDisabled, AlfColorEnum.LightGhostActive, AlfColorEnum.LightGhostHoverBG, AlfColorEnum.LightGhostHoverBG, AlfColorEnum.LightGhostText, AlfColorEnum.LightGhostTextHover, AlfPxEnum.Px1, AlfColorEnum.LightGhostText, AlfColorEnum.LightGhostTextHover, AlfColorEnum.LightGhostText, AlfColorEnum.LightGhostDisabled, AlfColorEnum.LightGhostText);
        }
        return this.defaultConstruct(AlfColorEnum.LightGhostText, AlfColorEnum.LightGhostTextHover, AlfColorEnum.LightGhostFocus, AlfColorEnum.LightGhostDisabled, AlfColorEnum.LightGhostActive, AlfColorEnum.LightGhostHoverBG, AlfColorEnum.LightGhostHoverBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
      case AlfColorVariantEnum.LightCrystal:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(AlfColorEnum.LightCrystalText, AlfColorEnum.LightCrystalTextHover, AlfColorEnum.LightCrystalFocus, AlfColorEnum.LightCrystalDisabled, AlfColorEnum.LightCrystalActive, AlfColorEnum.LightCrystal, AlfColorEnum.LightCrystalHover, AlfColorEnum.LightCrystalText, AlfColorEnum.LightCrystalTextHover, AlfPxEnum.Px1, AlfColorEnum.LightCrystalText, AlfColorEnum.LightCrystalTextHover, AlfColorEnum.LightCrystalText, AlfColorEnum.LightCrystalDisabled, AlfColorEnum.LightCrystalText);
        }
        return this.defaultConstruct(AlfColorEnum.LightCrystalText, AlfColorEnum.LightCrystalTextHover, AlfColorEnum.LightCrystalFocus, AlfColorEnum.LightCrystalDisabled, AlfColorEnum.LightCrystalActive, AlfColorEnum.LightCrystal, AlfColorEnum.LightCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

      // PREMIUM GRADIENTS
      case AlfColorVariantEnum.GradientPurple:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(
            AlfColorEnum.GradientPurpleText,
            AlfColorEnum.GradientPurpleTextHover,
            AlfColorEnum.GradientPurpleTextHover,
            AlfColorEnum.PrimaryDisabled,
            AlfColorEnum.GradientPurpleTextHover,
            AlfColorEnum.GradientPurple,
            AlfColorEnum.GradientPurpleHover,
            AlfColorEnum.Primary,
            AlfColorEnum.PrimaryHover,
            AlfPxEnum.Px1,
            AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.PrimaryDisabled, AlfColorEnum.White
          );
        }
        return this.defaultConstruct(
          AlfColorEnum.GradientPurpleText,
          AlfColorEnum.GradientPurpleTextHover,
          AlfColorEnum.GradientPurpleTextHover,
          AlfColorEnum.PrimaryDisabled,
          AlfColorEnum.GradientPurpleTextHover,
          AlfColorEnum.GradientPurple,
          AlfColorEnum.GradientPurpleHover,
          AlfColorEnum.GradientPurple,
          AlfColorEnum.GradientPurpleHover,
          AlfPxEnum.None
        );
      case AlfColorVariantEnum.GradientSunset:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(
            AlfColorEnum.GradientSunsetText,
            AlfColorEnum.GradientSunsetTextHover,
            AlfColorEnum.GradientSunsetTextHover,
            AlfColorEnum.DangerDisabled,
            AlfColorEnum.GradientSunsetTextHover,
            AlfColorEnum.GradientSunset,
            AlfColorEnum.GradientSunsetHover,
            AlfColorEnum.Danger,
            AlfColorEnum.DangerHover,
            AlfPxEnum.Px1,
            AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.DangerDisabled, AlfColorEnum.White
          );
        }
        return this.defaultConstruct(
          AlfColorEnum.GradientSunsetText, AlfColorEnum.GradientSunsetTextHover, AlfColorEnum.GradientSunsetTextHover, AlfColorEnum.DangerDisabled, AlfColorEnum.GradientSunsetTextHover,
          AlfColorEnum.GradientSunset, AlfColorEnum.GradientSunsetHover, AlfColorEnum.GradientSunset, AlfColorEnum.GradientSunsetHover, AlfPxEnum.None
        );
      case AlfColorVariantEnum.GradientOcean:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(
            AlfColorEnum.GradientOceanText,
            AlfColorEnum.GradientOceanTextHover,
            AlfColorEnum.GradientOceanTextHover,
            AlfColorEnum.InfoDisabled,
            AlfColorEnum.GradientOceanTextHover,
            AlfColorEnum.GradientOcean,
            AlfColorEnum.GradientOceanHover,
            AlfColorEnum.Info,
            AlfColorEnum.InfoHover,
            AlfPxEnum.Px1,
            AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.InfoDisabled, AlfColorEnum.White
          );
        }
        return this.defaultConstruct(
          AlfColorEnum.GradientOceanText, AlfColorEnum.GradientOceanTextHover, AlfColorEnum.GradientOceanTextHover, AlfColorEnum.InfoDisabled, AlfColorEnum.GradientOceanTextHover,
          AlfColorEnum.GradientOcean, AlfColorEnum.GradientOceanHover, AlfColorEnum.GradientOcean, AlfColorEnum.GradientOceanHover, AlfPxEnum.None
        );
      case AlfColorVariantEnum.GradientForest:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(
            AlfColorEnum.GradientForestText,
            AlfColorEnum.GradientForestTextHover,
            AlfColorEnum.GradientForestTextHover,
            AlfColorEnum.SuccessDisabled,
            AlfColorEnum.GradientForestTextHover,
            AlfColorEnum.GradientForest,
            AlfColorEnum.GradientForestHover,
            AlfColorEnum.Success,
            AlfColorEnum.SuccessHover,
            AlfPxEnum.Px1,
            AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.SuccessDisabled, AlfColorEnum.White
          );
        }
        return this.defaultConstruct(
          AlfColorEnum.GradientForestText, AlfColorEnum.GradientForestTextHover, AlfColorEnum.GradientForestTextHover, AlfColorEnum.SuccessDisabled, AlfColorEnum.GradientForestTextHover,
          AlfColorEnum.GradientForest, AlfColorEnum.GradientForestHover, AlfColorEnum.GradientForest, AlfColorEnum.GradientForestHover, AlfPxEnum.None
        );
      case AlfColorVariantEnum.GradientPrimary:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(
            AlfColorEnum.GradientPrimaryText,
            AlfColorEnum.GradientPrimaryTextHover,
            AlfColorEnum.GradientPrimaryTextHover,
            AlfColorEnum.GradientPrimaryDisabled,
            AlfColorEnum.GradientPrimaryTextHover,
            AlfColorEnum.GradientPrimary,
            AlfColorEnum.GradientPrimaryHover,
            AlfColorEnum.Primary,
            AlfColorEnum.PrimaryHover,
            AlfPxEnum.Px1,
            AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.GradientPrimaryDisabled, AlfColorEnum.White
          );
        }
        return this.defaultConstruct(
          AlfColorEnum.GradientPrimaryText, AlfColorEnum.GradientPrimaryTextHover, AlfColorEnum.GradientPrimaryTextHover, AlfColorEnum.GradientPrimaryDisabled, AlfColorEnum.GradientPrimaryTextHover,
          AlfColorEnum.GradientPrimary,
          AlfColorEnum.GradientPrimaryHover,
          AlfColorEnum.GradientPrimary, AlfColorEnum.GradientPrimaryHover, AlfPxEnum.None
        );
      case AlfColorVariantEnum.GradientDanger:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(
            AlfColorEnum.GradientDangerText,
            AlfColorEnum.GradientDangerTextHover,
            AlfColorEnum.GradientDangerTextHover,
            AlfColorEnum.GradientDangerDisabled,
            AlfColorEnum.GradientDangerTextHover,
            AlfColorEnum.GradientDanger,
            AlfColorEnum.GradientDangerHover,
            AlfColorEnum.Danger,
            AlfColorEnum.DangerHover,
            AlfPxEnum.Px1,
            AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.GradientDangerDisabled, AlfColorEnum.White
          );
        }
        return this.defaultConstruct(
          AlfColorEnum.GradientDangerText, AlfColorEnum.GradientDangerTextHover, AlfColorEnum.GradientDangerTextHover, AlfColorEnum.GradientDangerDisabled, AlfColorEnum.GradientDangerTextHover,
          AlfColorEnum.GradientDanger,
          AlfColorEnum.GradientDangerHover,
          AlfColorEnum.GradientDanger, AlfColorEnum.GradientDangerHover, AlfPxEnum.None
        );
      case AlfColorVariantEnum.GradientSuccess:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(
            AlfColorEnum.GradientSuccessText,
            AlfColorEnum.GradientSuccessTextHover,
            AlfColorEnum.GradientSuccessTextHover,
            AlfColorEnum.GradientSuccessDisabled,
            AlfColorEnum.GradientSuccessTextHover,
            AlfColorEnum.GradientSuccess,
            AlfColorEnum.GradientSuccessHover,
            AlfColorEnum.Success,
            AlfColorEnum.SuccessHover,
            AlfPxEnum.Px1,
            AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.GradientSuccessDisabled, AlfColorEnum.White
          );
        }
        return this.defaultConstruct(
          AlfColorEnum.GradientSuccessText, AlfColorEnum.GradientSuccessTextHover, AlfColorEnum.GradientSuccessTextHover, AlfColorEnum.GradientSuccessDisabled, AlfColorEnum.GradientSuccessTextHover,
          AlfColorEnum.GradientSuccess,
          AlfColorEnum.GradientSuccessHover,
          AlfColorEnum.GradientSuccess, AlfColorEnum.GradientSuccessHover, AlfPxEnum.None
        );
      case AlfColorVariantEnum.GradientWarning:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(
            AlfColorEnum.GradientWarningText,
            AlfColorEnum.GradientWarningTextHover,
            AlfColorEnum.GradientWarningTextHover,
            AlfColorEnum.GradientWarningDisabled,
            AlfColorEnum.GradientWarningTextHover,
            AlfColorEnum.GradientWarning,
            AlfColorEnum.GradientWarningHover,
            AlfColorEnum.Warning,
            AlfColorEnum.WarningHover,
            AlfPxEnum.Px1,
            AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.GradientWarningDisabled, AlfColorEnum.White
          );
        }
        return this.defaultConstruct(
          AlfColorEnum.GradientWarningText, AlfColorEnum.GradientWarningTextHover, AlfColorEnum.GradientWarningTextHover, AlfColorEnum.GradientWarningDisabled, AlfColorEnum.GradientWarningTextHover,
          AlfColorEnum.GradientWarning,
          AlfColorEnum.GradientWarningHover,
          AlfColorEnum.GradientWarning, AlfColorEnum.GradientWarningHover, AlfPxEnum.None
        );
      case AlfColorVariantEnum.GradientInfo:
        if (componentType && outlinedFilledComponents.includes(componentType)) {
          return this.defaultConstruct(
            AlfColorEnum.GradientInfoText,
            AlfColorEnum.GradientInfoTextHover,
            AlfColorEnum.GradientInfoTextHover,
            AlfColorEnum.GradientInfoDisabled,
            AlfColorEnum.GradientInfoTextHover,
            AlfColorEnum.GradientInfo,
            AlfColorEnum.GradientInfoHover,
            AlfColorEnum.Info,
            AlfColorEnum.InfoHover,
            AlfPxEnum.Px1,
            AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.White, AlfColorEnum.GradientInfoDisabled, AlfColorEnum.White
          );
        }
        return this.defaultConstruct(
          AlfColorEnum.GradientInfoText, AlfColorEnum.GradientInfoTextHover, AlfColorEnum.GradientInfoTextHover, AlfColorEnum.GradientInfoDisabled, AlfColorEnum.GradientInfoTextHover,
          AlfColorEnum.GradientInfo,
          AlfColorEnum.GradientInfoHover,
          AlfColorEnum.GradientInfo, AlfColorEnum.GradientInfoHover, AlfPxEnum.None
        );

      case AlfColorVariantEnum.Transparent:
        return this.defaultConstruct(AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfColorEnum.SecondaryGhostFocus, AlfColorEnum.SecondaryGhostDisabled, AlfColorEnum.SecondaryGhostActive, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);

      default:
        return this.defaultConstruct(AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.SecondaryFocus, AlfColorEnum.SecondaryDisabled, AlfColorEnum.SecondaryActive, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover);
    }
  };
}


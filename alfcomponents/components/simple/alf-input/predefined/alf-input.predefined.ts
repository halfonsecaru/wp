import { AlfInputAppearanceEnum, AlfInputTypeEnum, AlfColorVariantEnum, AlfPxEnum, AlfDisplayEnum, AlfAlignItemsEnum, AlfPercentageEnum, AlfBoxSizingEnum, AlfColorEnum, AlfBorderStyleEnum, AlfRadiusEnum, AlfOverflowEnum } from '@alfcomponents/enums';
import { AlfInputInterface } from '../interfaces/alf-input.interface';
import { AlfComponentTypeEnum, resolveVariantConfig } from '../../../../base/defaultVariants';
import { AlfBackgroundsBaseInterface, AlfBackgroundsStyleInterface, AlfBorderBaseInterface, AlfBorderInterface, AlfDisplayAndLayoutBaseInterface, AlfDisplayAndLayoutInterface, AlfTextStyleInterface } from '@alfcomponents/interfaces';


const displayState: AlfDisplayAndLayoutBaseInterface = {
  minHeight: AlfPxEnum.Px48,
  height: AlfPxEnum.Px48,
  display: AlfDisplayEnum.Flex,
  alignItems: AlfAlignItemsEnum.Center,
  width: AlfPercentageEnum.Full,
  boxSizing: AlfBoxSizingEnum.BorderBox,
  overflow: AlfOverflowEnum.Visible,
}


const beautyBackground: AlfBackgroundsBaseInterface = {
  backgroundImage: AlfColorEnum.GradientBeauty1,
}

const defaultBorder: AlfBorderBaseInterface = {
  borderWidth: AlfPxEnum.Px1,
  borderStyle: AlfBorderStyleEnum.Solid,
  borderColor: AlfColorEnum.CoolGray,
  borderRadius: AlfRadiusEnum.Lg,
}

export const ALF_INPUT_DEFAULT_BASE: AlfInputInterface = {
  inputType: AlfInputTypeEnum.Text,
  appearance: AlfInputAppearanceEnum.Outline,
  required: false,
  readonly: false,
  loading: false,
  clearable: false,
  showPasswordToggle: true,
  showCharCounter: false,
  debounceTime: 0,
  autocomplete: 'off',
  label: '',
  placeholder: '',
  value: '',
  // DEFINING STANDARD VISUAL SPECIFICATIONS DYNAMICALLY
  displayAndLayout: {
    default: { ...displayState },
    hover: { ...displayState },
    focus: { ...displayState },
    active: { ...displayState },
    disabled: { ...displayState }
  } as AlfDisplayAndLayoutInterface,
  backgrounds: {
    default: { ...beautyBackground },
    hover: { ...beautyBackground },
    focus: { ...beautyBackground },
    active: { ...beautyBackground },
    disabled: {
      backgroundColor: AlfColorEnum.White,
      backgroundImage: 'none',
    }
  } as AlfBackgroundsStyleInterface,
  border: {
    default: { ...defaultBorder },
    hover: { ...defaultBorder },
    focus: { ...defaultBorder },
    active: { ...defaultBorder },
    disabled: {
      borderColor: AlfColorEnum.CoolGray,
      borderStyle: AlfBorderStyleEnum.Solid,
      borderWidth: AlfPxEnum.Px1,
      borderRadius: AlfRadiusEnum.Md,
    }
  } as AlfBorderInterface,
  shadows: {
    default: {
      boxShadow: 'none',
    },
    focus: {
      boxShadow: '0 0 0 1px #4f46e5, 0 4px 12px rgba(79, 70, 229, 0.08)',
    }
  } as any,
  textStyle: {
    default: {
      color: AlfColorEnum.Gray800,
    },
    hover: {
      color: AlfColorEnum.Gray900,
    },
    focus: {
      color: AlfColorEnum.Gray900,
    },
    disabled: {
      color: AlfColorEnum.Gray450,
    }
  } as AlfTextStyleInterface
};





export const getAlfInputDefaultConfiguration = (
  variant?: AlfColorVariantEnum,
  appearance?: AlfInputAppearanceEnum
): AlfInputInterface => {
  const v = variant ?? AlfColorVariantEnum.SecondaryOutline;
  const variantConfig = resolveVariantConfig(v, AlfComponentTypeEnum.Input) as Partial<AlfInputInterface>;
  const isDefault = v === AlfColorVariantEnum.SecondaryOutline || v === AlfColorVariantEnum.Default;
  const isStandard = appearance === AlfInputAppearanceEnum.Standard;

  let resolvedBackgrounds = isDefault ? ALF_INPUT_DEFAULT_BASE.backgrounds : undefined;
  let resolvedBorder = isDefault ? ALF_INPUT_DEFAULT_BASE.border : undefined;

  const vStr = v.toString().toLowerCase();

  // ── BACKGROUND GRADIENT BUILDER FOR OUTLINE VARIANTS ──
  if (!isDefault && vStr.includes('outline') && !isStandard) {
    let grad = AlfColorEnum.GradientBeauty1; // fallback
    if (vStr.includes('primary')) {
      grad = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(219, 234, 254, 0.5) 100%)' as any;
    } else if (vStr.includes('success')) {
      grad = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(220, 252, 231, 0.5) 100%)' as any;
    } else if (vStr.includes('danger')) {
      grad = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 226, 226, 0.5) 100%)' as any;
    } else if (vStr.includes('warning')) {
      grad = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 249, 195, 0.5) 100%)' as any;
    } else if (vStr.includes('info')) {
      grad = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(207, 250, 254, 0.5) 100%)' as any;
    } else if (vStr.includes('dark')) {
      grad = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(243, 244, 246, 0.6) 100%)' as any;
    } else if (vStr.includes('light')) {
      grad = 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.8) 100%)' as any;
    }

    resolvedBackgrounds = {
      default: { backgroundImage: grad },
      hover: { backgroundImage: grad },
      focus: { backgroundImage: grad },
      active: { backgroundImage: grad },
      disabled: {
        backgroundColor: AlfColorEnum.White,
        backgroundImage: 'none',
      }
    };
  }

  // ── DYNAMIC OUTLINE BORDER BUILDER FOR ALL OTHER VARIANTS ──
  if (!isDefault && !isStandard) {
    let baseColor = AlfColorEnum.CoolGray;
    let hoverColor = AlfColorEnum.CoolGray;

    if (vStr.includes('primary')) {
      baseColor = AlfColorEnum.Primary;
      hoverColor = AlfColorEnum.PrimaryHover;
    } else if (vStr.includes('secondary')) {
      baseColor = AlfColorEnum.Secondary;
      hoverColor = AlfColorEnum.SecondaryHover;
    } else if (vStr.includes('success')) {
      baseColor = AlfColorEnum.Success;
      hoverColor = AlfColorEnum.SuccessHover;
    } else if (vStr.includes('danger')) {
      baseColor = AlfColorEnum.Danger;
      hoverColor = AlfColorEnum.DangerHover;
    } else if (vStr.includes('warning')) {
      baseColor = AlfColorEnum.Warning;
      hoverColor = AlfColorEnum.WarningHover;
    } else if (vStr.includes('info')) {
      baseColor = AlfColorEnum.Info;
      hoverColor = AlfColorEnum.InfoHover;
    } else if (vStr.includes('dark')) {
      baseColor = AlfColorEnum.Dark;
      hoverColor = AlfColorEnum.DarkHover;
    } else if (vStr.includes('light')) {
      baseColor = AlfColorEnum.Gray300;
      hoverColor = AlfColorEnum.Gray450;
    } else if (vStr.includes('purple') || vStr.includes('sunset')) {
      baseColor = AlfColorEnum.Purple600 as any;
      hoverColor = AlfColorEnum.Purple700 as any;
    } else if (vStr.includes('ocean')) {
      baseColor = AlfColorEnum.Blue600 as any;
      hoverColor = AlfColorEnum.Blue700 as any;
    } else if (vStr.includes('forest')) {
      baseColor = AlfColorEnum.Green600 as any;
      hoverColor = AlfColorEnum.Green700 as any;
    }

    resolvedBorder = {
      default: {
        borderWidth: AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: baseColor,
        borderRadius: AlfRadiusEnum.Lg,
      },
      hover: {
        borderWidth: AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: hoverColor,
        borderRadius: AlfRadiusEnum.Lg,
      },
      focus: {
        borderWidth: AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: hoverColor,
        borderRadius: AlfRadiusEnum.Lg,
      },
      active: {
        borderWidth: AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: hoverColor,
        borderRadius: AlfRadiusEnum.Lg,
      },
      disabled: {
        borderWidth: AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: AlfColorEnum.CoolGray,
        borderRadius: AlfRadiusEnum.Md,
      }
    };
  }

  // ── CUSTOM STYLING FOR STANDARD (LINE-ONLY) APPEARANCE ──
  if (isStandard) {
    let baseColor = AlfColorEnum.CoolGray;
    let hoverColor = AlfColorEnum.Primary;

    if (vStr.includes('primary')) {
      baseColor = AlfColorEnum.Primary;
      hoverColor = AlfColorEnum.PrimaryHover;
    } else if (vStr.includes('secondary')) {
      baseColor = AlfColorEnum.Secondary;
      hoverColor = AlfColorEnum.SecondaryHover;
    } else if (vStr.includes('success')) {
      baseColor = AlfColorEnum.Success;
      hoverColor = AlfColorEnum.SuccessHover;
    } else if (vStr.includes('danger')) {
      baseColor = AlfColorEnum.Danger;
      hoverColor = AlfColorEnum.DangerHover;
    } else if (vStr.includes('warning')) {
      baseColor = AlfColorEnum.Warning;
      hoverColor = AlfColorEnum.WarningHover;
    } else if (vStr.includes('info')) {
      baseColor = AlfColorEnum.Info;
      hoverColor = AlfColorEnum.InfoHover;
    } else if (vStr.includes('dark')) {
      baseColor = AlfColorEnum.Dark;
      hoverColor = AlfColorEnum.DarkHover;
    } else if (vStr.includes('light')) {
      baseColor = AlfColorEnum.Gray300;
      hoverColor = AlfColorEnum.Gray450;
    } else if (vStr.includes('purple') || vStr.includes('sunset')) {
      baseColor = AlfColorEnum.Purple600 as any;
      hoverColor = AlfColorEnum.Purple700 as any;
    } else if (vStr.includes('ocean')) {
      baseColor = AlfColorEnum.Blue600 as any;
      hoverColor = AlfColorEnum.Blue700 as any;
    } else if (vStr.includes('forest')) {
      baseColor = AlfColorEnum.Green600 as any;
      hoverColor = AlfColorEnum.Green700 as any;
    }

    resolvedBackgrounds = {
      default: { backgroundColor: AlfColorEnum.Transparent, backgroundImage: 'none' },
      hover: { backgroundColor: AlfColorEnum.Transparent, backgroundImage: 'none' },
      focus: { backgroundColor: AlfColorEnum.Transparent, backgroundImage: 'none' },
      active: { backgroundColor: AlfColorEnum.Transparent, backgroundImage: 'none' },
      disabled: { backgroundColor: AlfColorEnum.Transparent, backgroundImage: 'none' }
    };

    resolvedBorder = {
      default: {
        borderTopWidth: AlfPxEnum.None,
        borderLeftWidth: AlfPxEnum.None,
        borderRightWidth: AlfPxEnum.None,
        borderBottomWidth: AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: baseColor,
        borderRadius: AlfRadiusEnum.None,
      },
      hover: {
        borderTopWidth: AlfPxEnum.None,
        borderLeftWidth: AlfPxEnum.None,
        borderRightWidth: AlfPxEnum.None,
        borderBottomWidth: AlfPxEnum.Px2,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: hoverColor,
        borderRadius: AlfRadiusEnum.None,
      },
      focus: {
        borderTopWidth: AlfPxEnum.None,
        borderLeftWidth: AlfPxEnum.None,
        borderRightWidth: AlfPxEnum.None,
        borderBottomWidth: AlfPxEnum.Px2,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: hoverColor,
        borderRadius: AlfRadiusEnum.None,
      },
      active: {
        borderTopWidth: AlfPxEnum.None,
        borderLeftWidth: AlfPxEnum.None,
        borderRightWidth: AlfPxEnum.None,
        borderBottomWidth: AlfPxEnum.Px2,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: hoverColor,
        borderRadius: AlfRadiusEnum.None,
      },
      disabled: {
        borderTopWidth: AlfPxEnum.None,
        borderLeftWidth: AlfPxEnum.None,
        borderRightWidth: AlfPxEnum.None,
        borderBottomWidth: AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: AlfColorEnum.CoolGray,
        borderRadius: AlfRadiusEnum.None,
      }
    };
  }

  return {
    ...ALF_INPUT_DEFAULT_BASE,
    ...variantConfig,
    colorVariant: v,
    appearance: appearance ?? AlfInputAppearanceEnum.Outline,
    backgrounds: resolvedBackgrounds,
    border: resolvedBorder,
    textStyle: isDefault ? ALF_INPUT_DEFAULT_BASE.textStyle : undefined,
  };
};


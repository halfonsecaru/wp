import {
  AlfColorVariantEnum,
  AlfFontSizeEnum,
  AlfFontWeightEnum,
  AlfPxEnum,
  AlfRadiusEnum,
  AlfTextAlignEnum,
  AlfShadowEnum,
  AlfPercentageEnum,
  AlfColorEnum,
  AlfCursorEnum,
  AlfBorderStyleEnum,
} from '@alfcomponents/enums';
import { AlfInputInterface } from '../interfaces/alf-input.interface';
import { AlfBorderInterface, AlfDisplayAndLayoutInterface, AlfPaddingInterface, AlfBorderBaseInterface } from '@alfcomponents/interfaces';
import { resolveVariantConfig } from '@alfcomponents/base/defaultVariants';

/**
 * Configuración base por defecto para el componente alf-input.
 */
export const ALF_INPUT_DEFAULT: AlfInputInterface = {
  disabled: false,
  typography: {
    default: {
      fontWeight: AlfFontWeightEnum.Normal,
      fontSize: AlfFontSizeEnum.Md,
      textAlign: AlfTextAlignEnum.Left,
    }
  },
  padding: {
    default: {
      paddingTop: AlfPxEnum.None,
      paddingBottom: AlfPxEnum.None,
      paddingLeft: AlfPxEnum.None,
      paddingRight: AlfPxEnum.None,
    },
  },
  shadows: {
    default: {
      boxShadow: AlfShadowEnum.None
    },
    hover: {
      boxShadow: AlfShadowEnum.None
    }
  },
  backgrounds: {
    default: {
      backgroundColor: AlfColorEnum.Transparent,
    },
    hover: {
      backgroundColor: AlfColorEnum.Transparent,
    },
    active: {
      backgroundColor: AlfColorEnum.Transparent,
    },
    disabled: {
      backgroundColor: AlfColorEnum.Transparent,
    },
    focus: {
      backgroundColor: AlfColorEnum.Transparent,
    }
  },
  border: {
    default: {

      borderRadius: AlfRadiusEnum.Lg,
      borderColor: AlfColorEnum.Gray700,
    },
    active: {
      borderRadius: AlfRadiusEnum.Lg,
      borderColor: AlfColorEnum.Gray800,
    },
    focus: {
      borderRadius: AlfRadiusEnum.Lg,
      borderColor: AlfColorEnum.Gray800,
    },
    disabled: {
      borderRadius: AlfRadiusEnum.Lg,
      borderColor: AlfColorEnum.Gray800,
    }
  },
  displayAndLayout: {
    default: {
      width: AlfPercentageEnum.Percent100,
      height: AlfPxEnum.Px40,
      cursor: AlfCursorEnum.Text,
    },
    hover: {
      width: AlfPercentageEnum.Percent100,
      height: AlfPxEnum.Px40,
      cursor: AlfCursorEnum.Text,
    },
    focus: {
      width: AlfPercentageEnum.Percent100,
      height: AlfPxEnum.Px40,
      cursor: AlfCursorEnum.Text,
    },
    active: {
      width: AlfPercentageEnum.Percent100,
      height: AlfPxEnum.Px40,
      cursor: AlfCursorEnum.Text,
    },
    disabled: {
      width: AlfPercentageEnum.Percent100,
      height: AlfPxEnum.Px40,
      cursor: AlfCursorEnum.Text,
    }
  },
};

/**
 * Factory de configuración para AlfInput.
 */
export const getAlfInputDefaultConfiguration = (
  variant: AlfColorVariantEnum,
  appearance: 'outline' | 'fill' | 'standard' = 'outline'
): AlfInputInterface => {
  const base = ALF_INPUT_DEFAULT;

  if (appearance === 'outline') {
    return {
      ...base,
      ...(variant !== AlfColorVariantEnum.Default ? resolveVariantConfig(transformSolidToOutline(variant)) : {}),
    };
  } else if (appearance === 'fill' || appearance === 'standard') {
    const isStd = appearance === 'standard';
    const variantConfig = variant !== AlfColorVariantEnum.Default ? transformSolidToOutline(variant) : AlfColorVariantEnum.PrimaryOutline;
    const config = resolveVariantConfig(variantConfig);

    return {
      ...config,
      border: {
        ...config.borderBase,
        default: {
          ...config.borderBase?.default,
          borderWidth: AlfPxEnum.None,
          borderBottomWidth: AlfPxEnum.Px2,
          borderStyle: AlfBorderStyleEnum.Solid,
          borderBottomStyle: AlfBorderStyleEnum.Solid,
          borderColor: config.borderBase?.default?.borderColor || AlfColorEnum.Primary,
          borderBottomColor: config.borderBase?.default?.borderColor || AlfColorEnum.Primary,
          borderRadius:  AlfRadiusEnum.None,
          borderBottomLeftRadius: AlfRadiusEnum.None,
          borderBottomRightRadius: AlfRadiusEnum.None,
        },
        hover: {
          ...config.borderBase?.hover,
          borderWidth: AlfPxEnum.None,
          borderBottomWidth: AlfPxEnum.Px2,
          borderStyle: AlfBorderStyleEnum.Solid,
          borderBottomStyle: AlfBorderStyleEnum.Solid,
          borderRadius: AlfRadiusEnum.None,
          borderBottomColor: config.borderBase?.hover?.borderColor || AlfColorEnum.Primary,
        },
        active: {
          ...config.borderBase?.hover,
          borderWidth: AlfPxEnum.None,
          borderBottomWidth: AlfPxEnum.Px2,
          borderStyle: AlfBorderStyleEnum.Solid,
          borderBottomStyle: AlfBorderStyleEnum.Solid,
          borderRadius: AlfRadiusEnum.None,
          borderBottomColor: config.borderBase?.hover?.borderColor || AlfColorEnum.Primary,
        },
        focus: {
          ...config.borderBase?.focus,
          borderWidth: AlfPxEnum.None,
          borderBottomWidth: AlfPxEnum.Px2,
          borderStyle: AlfBorderStyleEnum.Solid,
          borderBottomStyle: AlfBorderStyleEnum.Solid,
          borderRadius: AlfRadiusEnum.None,
          borderBottomColor: config.borderBase?.focus?.borderColor || AlfColorEnum.Primary,
        }
      },
      backgrounds: {
        default: { backgroundColor: isStd ? AlfColorEnum.Transparent : (config.backgroundsBase?.default?.backgroundColor || AlfColorEnum.Transparent) },
        hover: { backgroundColor: isStd ? AlfColorEnum.Transparent : (config.backgroundsBase?.hover?.backgroundColor || AlfColorEnum.Transparent) },
        focus: { backgroundColor: isStd ? AlfColorEnum.Transparent : (config.backgroundsBase?.focus?.backgroundColor || AlfColorEnum.Transparent) },
        active: { backgroundColor: isStd ? AlfColorEnum.Transparent : (config.backgroundsBase?.active?.backgroundColor || AlfColorEnum.Transparent) },
        disabled: { backgroundColor: isStd ? AlfColorEnum.Transparent : (config.backgroundsBase?.disabled?.backgroundColor || AlfColorEnum.Transparent) },
      }
    };
  }

  return {
    ...base
  };
};

function transformSolidToOutline(variantConfig: AlfColorVariantEnum): AlfColorVariantEnum {

  return variantConfig.toString() + 'Outline' as AlfColorVariantEnum;
}

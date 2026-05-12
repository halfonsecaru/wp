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
        ...config.border,
        default: {
          ...config.border?.default,
          borderWidth: AlfPxEnum.None,
          borderBottomWidth: AlfPxEnum.Px2,
          borderStyle: AlfBorderStyleEnum.Solid,
          borderBottomStyle: AlfBorderStyleEnum.Solid,
          borderColor: config.border?.default?.borderColor || AlfColorEnum.Primary,
          borderBottomColor: config.border?.default?.borderColor || AlfColorEnum.Primary,
          borderRadius:  AlfRadiusEnum.None,
          borderBottomLeftRadius: AlfRadiusEnum.None,
          borderBottomRightRadius: AlfRadiusEnum.None,
        },
        hover: {
          ...config.border?.hover,
          borderWidth: AlfPxEnum.None,
          borderBottomWidth: AlfPxEnum.Px2,
          borderStyle: AlfBorderStyleEnum.Solid,
          borderBottomStyle: AlfBorderStyleEnum.Solid,
          borderRadius: AlfRadiusEnum.None,
          borderBottomColor: config.border?.hover?.borderColor || AlfColorEnum.Primary,
        },
        active: {
          ...config.border?.hover,
          borderWidth: AlfPxEnum.None,
          borderBottomWidth: AlfPxEnum.Px2,
          borderStyle: AlfBorderStyleEnum.Solid,
          borderBottomStyle: AlfBorderStyleEnum.Solid,
          borderRadius: AlfRadiusEnum.None,
          borderBottomColor: config.border?.hover?.borderColor || AlfColorEnum.Primary,
        },
        focus: {
          ...config.border?.focus,
          borderWidth: AlfPxEnum.None,
          borderBottomWidth: AlfPxEnum.Px2,
          borderStyle: AlfBorderStyleEnum.Solid,
          borderBottomStyle: AlfBorderStyleEnum.Solid,
          borderRadius: AlfRadiusEnum.None,
          borderBottomColor: config.border?.focus?.borderColor || AlfColorEnum.Primary,
        }
      },
      backgrounds: {
        default: { backgroundColor: isStd ? AlfColorEnum.Transparent : (config.backgrounds?.default?.backgroundColor || AlfColorEnum.Transparent) },
        hover: { backgroundColor: isStd ? AlfColorEnum.Transparent : (config.backgrounds?.hover?.backgroundColor || AlfColorEnum.Transparent) },
        focus: { backgroundColor: isStd ? AlfColorEnum.Transparent : (config.backgrounds?.focus?.backgroundColor || AlfColorEnum.Transparent) },
        active: { backgroundColor: isStd ? AlfColorEnum.Transparent : (config.backgrounds?.active?.backgroundColor || AlfColorEnum.Transparent) },
        disabled: { backgroundColor: isStd ? AlfColorEnum.Transparent : (config.backgrounds?.disabled?.backgroundColor || AlfColorEnum.Transparent) },
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
// export const getAlfInputDefaultConfiguration = (
//   variant: AlfColorVariantEnum,
//   appearance: 'outline' | 'fill' | 'standard' = 'outline'
// ): AlfInputInterface => {
//   const isStandard = appearance === 'standard';
//   const isFill = appearance === 'fill';

//   const variantConfig = variant === AlfColorVariantEnum.Default 
//     ? {} as any 
//     : resolveVariantConfig(variant);

//   // Forzamos fondo neutro para Outline y Standard, y un gris suave para Fill por defecto
//   const backgroundOverride = (appearance === 'outline' || appearance === 'standard') 
//     ? { backgrounds: ALF_INPUT_DEFAULT.backgrounds } 
//     : { 
//         backgrounds: {
//           default: { backgroundColor: AlfColorEnum.Gray100 },
//           hover: { backgroundColor: AlfColorEnum.Gray200 },
//           active: { backgroundColor: AlfColorEnum.Gray200 },
//           disabled: { backgroundColor: AlfColorEnum.Gray200 },

//           focus: { backgroundColor: AlfColorEnum.White }
//         } 
//       };

//   // Si hay una variante específica (Primary, Success...), esa manda sobre el gris suave del Fill
//   const backgrounds = (variant !== AlfColorVariantEnum.Default && appearance === 'fill')
//     ? variantConfig.backgrounds
//     : backgroundOverride.backgrounds;

//   // PROTECCIÓN GEOMÉTRICA ÉLITE: Replicamos la geometría en todos los estados para evitar Jitter
//   const geometry = {
//     displayAndLayout: generateStableDisplayAndLayout(isStandard, isFill),
//     padding: generateStablePadding()
//   };

//   return {
//     ...ALF_INPUT_DEFAULT,
//     ...variantConfig, // Colores y sombras de la variante
//     ...geometry, // LA GEOMETRÍA MANDA
//     backgrounds, // Fondos calculados
//     border: generateBorders(isStandard, isFill, variantConfig?.border ?? ALF_INPUT_DEFAULT.border!),
//     customStyle: generateCustomStyles(isStandard, isFill)
//   };
// };

// /**
//  * Helpers internos para estabilidad total
//  */

// function generateStablePadding(): AlfPaddingInterface {
//   const base = ALF_INPUT_DEFAULT.padding!.default!;
//   return {
//     default: { ...base },
//     hover: { ...base },
//     focus: { ...base },
//     active: { ...base },
//     disabled: { ...base }
//   };
// }

// function generateStableDisplayAndLayout(isStandard: boolean, isFill: boolean): AlfDisplayAndLayoutInterface {
//   const base = {
//     width: AlfPercentageEnum.Percent100,
//     height: (isStandard || isFill) ? AlfPxEnum.Px56 : AlfPxEnum.Px52,
//     cursor: AlfCursorEnum.Text,
//   };
//   return {
//     default: { ...base },
//     hover: { ...base },
//     focus: { ...base },
//     active: { ...base },
//     disabled: { ...base }
//   };
// }

// function generateCustomStyles(isStandard: boolean, isFill: boolean): string {
//   let styles = '';
//   if (isStandard) {
//     styles += 'background-color: transparent !important;';
//   }
//   if (isFill) {
//     styles += 'border-top-left-radius: 8px !important; border-top-right-radius: 8px !important;';
//   }
//   return styles;
// }

// const generateBorders = (isStandard: boolean, isFill: boolean, baseBorder: AlfBorderInterface): AlfBorderInterface => {
//   const geometryBase: Partial<AlfBorderBaseInterface> = (isStandard || isFill) ? {
//     borderWidth: AlfPxEnum.None,
//     borderTopWidth: AlfPxEnum.None,
//     borderLeftWidth: AlfPxEnum.None,
//     borderRightWidth: AlfPxEnum.None,
//     borderBottomWidth: AlfPxEnum.Px015,
//     borderRadius: AlfRadiusEnum.None,
//   } : {
//     borderWidth: AlfPxEnum.Px015,
//     borderRadius: AlfRadiusEnum.Lg,
//   };

//   return {
//     ...baseBorder,
//     default: { ...baseBorder.default, ...geometryBase },
//     hover: { ...baseBorder.hover, ...geometryBase },
//     focus: { ...baseBorder.focus, ...geometryBase },
//     active: { ...baseBorder.active, ...geometryBase },
//     disabled: { ...baseBorder.disabled, ...geometryBase }
//   };
// }

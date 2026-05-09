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
} from '@alfcomponents/enums';
import { AlfInputInterface } from '../interfaces/alf-input.interface';
import { AlfBorderInterface, AlfDisplayAndLayoutInterface } from '@alfcomponents/interfaces';
import { resolveVariantConfig } from '@alfcomponents/base/defaultVariants';

/**
 * Configuración base por defecto para el componente alf-input.
 */
export const ALF_INPUT_DEFAULT: AlfInputInterface = {
  disabled: false,
  typography: {
    default: {
      fontWeight: AlfFontWeightEnum.Normal,
      fontSize: AlfFontSizeEnum.Xl,
      textAlign: AlfTextAlignEnum.Left,
    }
  },
  padding: {
    default: {
      paddingTop: AlfPxEnum.Px10,
      paddingBottom: AlfPxEnum.Px10,
      paddingLeft: AlfPxEnum.Px10,
      paddingRight: AlfPxEnum.Px10,
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
      backgroundColor: AlfColorEnum.Gray100,
    }
  },
  border: {
    default: {
      borderWidth: AlfPxEnum.Px015,
      borderRadius: AlfRadiusEnum.Lg,
      borderColor: AlfColorEnum.Gray300,
    }
  }
};

/**
 * Factory de configuración para AlfInput.
 */
export const getAlfInputDefaultConfig = (
  variant: AlfColorVariantEnum,
  appearance: 'outline' | 'fill' | 'standard' = 'outline'
): AlfInputInterface => {
  const isStandard = appearance === 'standard';
  const isFill = appearance === 'fill';

  const variantConfig = resolveVariantConfig(variant);
  return {
    ...ALF_INPUT_DEFAULT,
    displayAndLayout: { ...generateDisplayAndLayout(isStandard, isFill) },
    ...variantConfig,
    border: { ...generateBorders(isStandard, isFill, variantConfig.border) },
    customStyle: generateCustomStyles(isStandard, isFill)
  };
};


/**
 * Helpers internos para la construcción de la configuración
 */

function generateDisplayAndLayout(isStandard: boolean, isFill: boolean): AlfDisplayAndLayoutInterface {
  return {
    default: {
      width: AlfPercentageEnum.Percent100,
      height: (isStandard || isFill) ? AlfPxEnum.Px48 : AlfPxEnum.Px44,
    }
  };
}

function generateCustomStyles(isStandard: boolean, isFill: boolean): string {
  let styles = '';
  if (isStandard) {
    styles += 'background-color: transparent !important; padding-left: 0 !important; padding-right: 0 !important;';
  }
  if (isFill) {
    styles += 'border-top-left-radius: 8px !important; border-top-right-radius: 8px !important;';
  }
  return styles;
}



const generateBorders = (isStandard: boolean, isFill: boolean, baseBorder: AlfBorderInterface) => {
  // 1. Geometría base por apariencia
  const geometryBase = (isStandard || isFill) ? {
    borderWidth: AlfPxEnum.None,
    borderTopWidth: AlfPxEnum.None,
    borderLeftWidth: AlfPxEnum.None,
    borderRightWidth: AlfPxEnum.None,
    borderBottomWidth: AlfPxEnum.Px015,
    borderRadius: AlfRadiusEnum.None,
    borderTopLeftRadius: AlfRadiusEnum.None,
    borderTopRightRadius: AlfRadiusEnum.None,
    borderBottomLeftRadius: AlfRadiusEnum.None,
    borderBottomRightRadius: AlfRadiusEnum.None,
  } : {
    borderWidth: AlfPxEnum.Px015,
    borderRadius: AlfRadiusEnum.Lg,
  };

  // 2. Cruzamos los colores base con la geometría de Input
  return {
    ...baseBorder,
    default: { ...baseBorder.default, ...geometryBase },
    hover: { 
      ...baseBorder.hover, 
      ...geometryBase,
      ...((isStandard || isFill) ? { borderBottomWidth: AlfPxEnum.Px015 } : {})
    },
    focus: { 
      ...baseBorder.focus, 
      ...geometryBase,
      ...((isStandard || isFill) ? { borderBottomWidth: AlfPxEnum.Px015 } : {})
    },
    active: { 
      ...baseBorder.active, 
      ...geometryBase,
      ...((isStandard || isFill) ? { borderBottomWidth: AlfPxEnum.Px015 } : {})
    },
    disabled: { ...baseBorder.disabled, ...geometryBase }
  };
}


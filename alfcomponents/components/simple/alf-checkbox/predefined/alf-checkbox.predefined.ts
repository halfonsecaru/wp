import {
  AlfCheckboxVariantEnum,
  AlfSizeEnum,
  AlfButtonVisualTypeEnum,
  AlfColorVariantEnum,
  AlfColorEnum,
  AlfPxEnum,
  AlfBorderStyleEnum,
  AlfRadiusEnum,
  AlfDisplayEnum,
  AlfAlignItemsEnum,
  AlfJustifyContentEnum,
  AlfAnimationTypeEnum,
} from '@alfcomponents/enums';
import { AlfCheckboxInterface } from '../interfaces/alf-checkbox.interface';
import { resolveDefaultVisual } from '@alfcomponents/base';

/**
 * Configuración base por defecto para el componente alf-checkbox.
 */
export const ALF_CHECKBOX_DEFAULT: AlfCheckboxInterface = {
  checkboxStyle: AlfCheckboxVariantEnum.Elegant,
  labelPosition: 'after',
  size: AlfSizeEnum.MD,
  visualType: AlfButtonVisualTypeEnum.Text,
  colorVariant: AlfColorVariantEnum.Primary,
  border: {
    default: {
      borderWidth: AlfPxEnum.Px1,
      borderStyle: AlfBorderStyleEnum.Solid,
      borderColor: AlfColorEnum.Gray500,
      borderRadius: AlfRadiusEnum.Md

    },
    hover: {
      borderColor: AlfColorEnum.Primary
    }
  },
  backgrounds: {
    default: { backgroundColor: AlfColorEnum.White }
  },
  displayAndLayout: {
    default: {
      display: AlfDisplayEnum.Flex,
      alignItems: AlfAlignItemsEnum.Center,
      justifyContent: AlfJustifyContentEnum.Start
    }
  },
  animations: {
    enterStage: AlfAnimationTypeEnum.FadeIn,
    duration: '0.2s'
  }
};

/**
 * Factory que resuelve la configuración según la variante (ej: 'OutlinePrimary', 'SolidSuccess').
 */
export const getAlfCheckboxDefaultConfig = (variantName?: string | AlfColorVariantEnum): AlfCheckboxInterface => {
  const defaultConfig = { ...ALF_CHECKBOX_DEFAULT };
  if (!variantName) return defaultConfig;

  // Si es un enum directo, lo tratamos como la variante de color
  if (typeof variantName !== 'string') {
    return {
      ...defaultConfig,
      colorVariant: variantName
    };
  }

  // Normalización (outline-primary -> OutlinePrimary)
  const normalized = variantName.charAt(0).toUpperCase() + 
                     variantName.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase());

  const isOutline = normalized.startsWith('Outlined');
  const isSolid = normalized.startsWith('Solid');
  const isCrystal = normalized.startsWith('Crystal');
  const isStandard = normalized.startsWith('Standard');
  const isSoft = normalized.startsWith('Soft');

  let variantKey = normalized;
  let visualType = AlfButtonVisualTypeEnum.Text;

  if (isOutline) {
    variantKey = normalized.replace('Outlined', '');
    visualType = AlfButtonVisualTypeEnum.Outlined;
  } else if (isSolid) {
    variantKey = normalized.replace('Solid', '');
    visualType = AlfButtonVisualTypeEnum.Solid;
  } else if (isCrystal) {
    variantKey = normalized.replace('Crystal', '');
    visualType = AlfButtonVisualTypeEnum.Crystal;
  } else if (isStandard) {
    variantKey = normalized.replace('Standard', '');
    visualType = AlfButtonVisualTypeEnum.Text;
  } else if (isSoft) {
    variantKey = normalized.replace('Soft', '');
    visualType = AlfButtonVisualTypeEnum.Soft;
  }
  
  const colorVariant = (AlfColorVariantEnum as any)[variantKey] || AlfColorVariantEnum.Primary;

  // Mapeo de colores semánticos
  let variantColor: AlfColorEnum = AlfColorEnum.Primary;
  switch (variantKey.toLowerCase()) {
    case 'primary': variantColor = AlfColorEnum.Primary; break;
    case 'secondary': variantColor = AlfColorEnum.Secondary; break;
    case 'success': variantColor = AlfColorEnum.Success; break;
    case 'danger': variantColor = AlfColorEnum.Danger; break;
    case 'warning': variantColor = AlfColorEnum.Warning; break;
    case 'info': variantColor = AlfColorEnum.Info; break;
    case 'dark': variantColor = AlfColorEnum.Gray900; break;
    case 'light': variantColor = AlfColorEnum.Gray300; break;
    default: variantColor = AlfColorEnum.Primary;
  }

  // Colores para variantes Solid y Soft
  let backgroundColor: AlfColorEnum = isStandard || isCrystal || isSoft ? AlfColorEnum.Transparent : AlfColorEnum.White;
  let borderColor: AlfColorEnum = AlfColorEnum.Gray300;

  if (isSolid || isSoft) {
    switch (variantKey.toLowerCase()) {
      case 'primary': 
        backgroundColor = isSoft ? 'color-mix(in srgb, #0d6efd, transparent 90%)' as AlfColorEnum : AlfColorEnum.Blue050; 
        borderColor = isSoft ? AlfColorEnum.Blue200 : AlfColorEnum.Blue200; 
        variantColor = isSoft ? AlfColorEnum.Blue600 : AlfColorEnum.Blue600; 
        break;
      case 'secondary': 
        backgroundColor = isSoft ? 'color-mix(in srgb, #6c757d, transparent 90%)' as AlfColorEnum : AlfColorEnum.Gray050; 
        borderColor = isSoft ? AlfColorEnum.Gray200 : AlfColorEnum.Gray200; 
        variantColor = isSoft ? AlfColorEnum.Gray600 : AlfColorEnum.Gray600; 
        break;
      case 'success': 
        backgroundColor = isSoft ? 'color-mix(in srgb, #198754, transparent 90%)' as AlfColorEnum : AlfColorEnum.Green050; 
        borderColor = isSoft ? AlfColorEnum.Green200 : AlfColorEnum.Green200; 
        variantColor = isSoft ? AlfColorEnum.Green600 : AlfColorEnum.Green600; 
        break;
      case 'danger': 
        backgroundColor = isSoft ? 'color-mix(in srgb, #dc3545, transparent 90%)' as AlfColorEnum : AlfColorEnum.Red050; 
        borderColor = isSoft ? AlfColorEnum.Red200 : AlfColorEnum.Red200; 
        variantColor = isSoft ? AlfColorEnum.Red600 : AlfColorEnum.Red600; 
        break;
      case 'warning': 
        backgroundColor = isSoft ? 'color-mix(in srgb, #ffc107, transparent 90%)' as AlfColorEnum : AlfColorEnum.Yellow050; 
        borderColor = isSoft ? AlfColorEnum.Yellow200 : AlfColorEnum.Yellow200; 
        variantColor = isSoft ? AlfColorEnum.Yellow700 : AlfColorEnum.Yellow700; 
        break;
      case 'info': 
        backgroundColor = isSoft ? 'color-mix(in srgb, #0dcaf0, transparent 90%)' as AlfColorEnum : AlfColorEnum.Cyan050; 
        borderColor = isSoft ? AlfColorEnum.Cyan200 : AlfColorEnum.Cyan200; 
        variantColor = isSoft ? AlfColorEnum.Cyan600 : AlfColorEnum.Cyan600; 
        break;
      case 'dark': 
        backgroundColor = isSoft ? 'color-mix(in srgb, #212529, transparent 90%)' as AlfColorEnum : AlfColorEnum.Gray100; 
        borderColor = isSoft ? AlfColorEnum.Gray300 : AlfColorEnum.Gray300; 
        variantColor = isSoft ? AlfColorEnum.Gray900 : AlfColorEnum.Gray900; 
        break;
      case 'light': 
        backgroundColor = isSoft ? 'color-mix(in srgb, #f8f9fa, transparent 90%)' as AlfColorEnum : AlfColorEnum.Gray050; 
        borderColor = isSoft ? AlfColorEnum.Gray200 : AlfColorEnum.Gray200; 
        variantColor = isSoft ? AlfColorEnum.Gray500 : AlfColorEnum.Gray500; 
        break;
    }
  }

  if (isCrystal) {
    borderColor = 'color-mix(in srgb, white, transparent 70%)' as AlfColorEnum;
    backgroundColor = 'color-mix(in srgb, white, transparent 90%)' as AlfColorEnum;
  }


  return {
    ...defaultConfig,
    colorVariant,
    visualType,
    border: {
      default: {
        borderWidth: isStandard ? AlfPxEnum.None : AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: isOutline ? variantColor : (isSolid ? borderColor : (isCrystal ? AlfColorEnum.White : AlfColorEnum.Gray300)),
        borderRadius: AlfRadiusEnum.Md
      },




      hover: {
        borderColor: variantColor
      }
    },
    backgrounds: {
      default: { backgroundColor },
      hover: { backgroundColor }
    },
    textStyle: {
      default: { color: variantColor }
    }
  };
};

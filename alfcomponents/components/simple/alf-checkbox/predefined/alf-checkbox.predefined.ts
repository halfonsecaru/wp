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
      borderRadius: AlfRadiusEnum.Sm
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

  const isOutline = normalized.startsWith('Outline');
  const isSolid = normalized.startsWith('Solid');
  const isCrystal = normalized.startsWith('Crystal');

  let variantKey = normalized;
  let visualType = AlfButtonVisualTypeEnum.Text;

  if (isOutline) {
    variantKey = normalized.replace('Outline', '');
    visualType = AlfButtonVisualTypeEnum.Outlined;
  } else if (isSolid) {
    variantKey = normalized.replace('Solid', '');
    visualType = AlfButtonVisualTypeEnum.Solid;
  } else if (isCrystal) {
    variantKey = normalized.replace('Crystal', '');
    visualType = AlfButtonVisualTypeEnum.Crystal;
  }
  
  const colorVariant = (AlfColorVariantEnum as any)[variantKey] || AlfColorVariantEnum.Primary;

  // Mapeo de colores semánticos
  let variantColor: AlfColorEnum = AlfColorEnum.Primary;
  switch (variantKey.toLowerCase()) {
    case 'primary': variantColor = AlfColorEnum.Primary; break;
    case 'success': variantColor = AlfColorEnum.Success; break;
    case 'danger': variantColor = AlfColorEnum.Danger; break;
    case 'warning': variantColor = AlfColorEnum.Warning; break;
    case 'info': variantColor = AlfColorEnum.Info; break;
    case 'dark': variantColor = AlfColorEnum.Gray900; break;
    case 'light': variantColor = AlfColorEnum.Gray300; break;
    default: variantColor = AlfColorEnum.Primary;
  }

  // Colores para variantes Solid
  let backgroundColor: AlfColorEnum = AlfColorEnum.White;
  let borderColor: AlfColorEnum = AlfColorEnum.Gray300;

  if (isSolid) {
    switch (variantKey.toLowerCase()) {
      case 'primary': backgroundColor = AlfColorEnum.Blue050; borderColor = AlfColorEnum.Blue200; variantColor = AlfColorEnum.Blue600; break;
      case 'success': backgroundColor = AlfColorEnum.Green050; borderColor = AlfColorEnum.Green200; variantColor = AlfColorEnum.Green600; break;
      case 'danger': backgroundColor = AlfColorEnum.Red050; borderColor = AlfColorEnum.Red200; variantColor = AlfColorEnum.Red600; break;
      case 'warning': backgroundColor = AlfColorEnum.Yellow050; borderColor = AlfColorEnum.Yellow200; variantColor = AlfColorEnum.Yellow700; break;
      case 'info': backgroundColor = AlfColorEnum.Cyan050; borderColor = AlfColorEnum.Cyan200; variantColor = AlfColorEnum.Cyan600; break;
      case 'dark': backgroundColor = AlfColorEnum.Gray100; borderColor = AlfColorEnum.Gray300; variantColor = AlfColorEnum.Gray900; break;
      case 'light': backgroundColor = AlfColorEnum.Gray050; borderColor = AlfColorEnum.Gray200; variantColor = AlfColorEnum.Gray500; break;
    }
  }

  return {
    ...defaultConfig,
    colorVariant,
    visualType,
    border: {
      default: {
        borderWidth: AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: isOutline ? variantColor : (isSolid ? borderColor : (isCrystal ? AlfColorEnum.White : AlfColorEnum.Gray300)),
        borderRadius: AlfRadiusEnum.Sm
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

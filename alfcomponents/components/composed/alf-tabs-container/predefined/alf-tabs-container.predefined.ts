import { AlfTabsStyleEnum } from '../enums/alf-tabs.enum';
import {
  AlfButtonVisualTypeEnum,
  AlfColorVariantEnum,
  AlfColorEnum,
  AlfPxEnum,
  AlfBorderStyleEnum,
  AlfRadiusEnum,
  AlfDisplayEnum,
  AlfFlexDirectionEnum,
  AlfAlignItemsEnum,
  AlfJustifyContentEnum,
  AlfPercentageEnum,
  AlfShadowEnum,
  AlfAnimationTypeEnum,
} from '@alfcomponents/enums';
import { AlfTabsContainerConfigInterface, AlfSingleTabInterface } from '../interfaces/alf-tabs.interface';

/**
 * Configuración por defecto para el contenedor de pestañas.
 */
export const ALF_TABS_CONTAINER_DEFAULT: AlfTabsContainerConfigInterface = {
  tabsStyle: AlfTabsStyleEnum.Underline,
  tab: [],
  visualType: AlfButtonVisualTypeEnum.Text,
  colorVariant: AlfColorVariantEnum.Transparent,
  border: {
    default: {
      borderWidth: AlfPxEnum.Px1,
      borderStyle: AlfBorderStyleEnum.Solid,
      borderColor: AlfColorEnum.Gray300,
      borderRadius: AlfRadiusEnum.Md
    }
  },
  padding: {
    default: {
      padding: AlfPxEnum.None,
      paddingBottom: AlfPxEnum.None,
      paddingLeft: AlfPxEnum.None,
      paddingRight: AlfPxEnum.None,
      paddingTop: AlfPxEnum.None
    }
  },
  displayAndLayout: {
    default: {
      display: AlfDisplayEnum.Flex,
      flexDirection: AlfFlexDirectionEnum.Column,
      alignItems: AlfAlignItemsEnum.Stretch,
      justifyContent: AlfJustifyContentEnum.Start,
      width: AlfPercentageEnum.Full
    }
  },
  textStyle: {
    default: {
      color: AlfColorEnum.SecondaryHover
    }
  },
  animations: {
    enterStage: AlfAnimationTypeEnum.FadeIn,
    exitStage: AlfAnimationTypeEnum.FadeOut,
    duration: '0.6s',
    delay: '0s',
  },
  contentAnimations: {
    enterStage: AlfAnimationTypeEnum.FadeIn,
    exitStage: AlfAnimationTypeEnum.FadeOut,
    duration: '0.6s',
    delay: '0s',
  }
};

/**
 * Configuración por defecto para el contenido de las pestañas.
 */
export const ALF_TAB_CONTENT_DEFAULT: Partial<AlfSingleTabInterface> = {
  padding: {
    default: {
      padding: AlfPxEnum.Px10
    }
  },
  backgrounds: {
    default: {
      backgroundColor: AlfColorEnum.Transparent
    }
  }
};



import { resolveDefaultVisual } from '@alfcomponents/base';

/**
 * Obtiene la configuración por defecto para el contenedor según una variante semántica.
 * Utiliza el motor visual central de Alfonizer para máxima consistencia.
 */
export const getAlfTabDefaultConfig = (variantName?: string): AlfTabsContainerConfigInterface => {
  const defaultConfig = { ...ALF_TABS_CONTAINER_DEFAULT };
  if (!variantName) return defaultConfig;

  // Normalizamos a PascalCase (ej: outline-primary -> OutlinePrimary)
  const normalized = variantName.charAt(0).toUpperCase() + 
                     variantName.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase());

  // Detectamos tipo visual y variante de color
  const isOutline = normalized.startsWith('Outline');
  const variantKey = isOutline ? normalized.replace('Outline', '') : normalized;
  
  const colorVariant = (AlfColorVariantEnum as any)[variantKey] || AlfColorVariantEnum.Secondary;
  const visualType = isOutline ? AlfButtonVisualTypeEnum.Outlined : AlfButtonVisualTypeEnum.Text;

  // Resolvemos el estilo visual usando el motor central de Alfonizer
  const visualBase = resolveDefaultVisual({
    colorVariant,
    visualType
  });

  // Mapeamos el color real para el borde según la variante
  let variantColor: AlfColorEnum = AlfColorEnum.Secondary;
  switch (variantKey.toLowerCase()) {
    case 'primary': variantColor = AlfColorEnum.Primary; break;
    case 'success': variantColor = AlfColorEnum.Success; break;
    case 'danger': variantColor = AlfColorEnum.Danger; break;
    case 'warning': variantColor = AlfColorEnum.Warning; break;
    case 'info': variantColor = AlfColorEnum.Info; break;
  }

  return {
    ...defaultConfig,
    colorVariant,
    visualType,
    // Definición explícita de bordes
    border: {
      default: {
        borderWidth: AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: isOutline ? variantColor : AlfColorEnum.Transparent,
        borderRadius: AlfRadiusEnum.Md
      }
    },
    // Definición explícita de fondos
    backgrounds: {
      default: { backgroundColor: AlfColorEnum.Transparent },
      hover: { backgroundColor: isOutline ? AlfColorEnum.Gray100 : AlfColorEnum.Transparent }
    },
    // Estilo de texto heredado de la variante
    textStyle: {
      default: { color: variantColor },
      hover: { color: variantColor }
    },
    // Layout horizontal inamovible
    displayAndLayout: {
      default: {
        display: AlfDisplayEnum.Flex,
        flexDirection: AlfFlexDirectionEnum.Row,
        alignItems: AlfAlignItemsEnum.Center,
        justifyContent: AlfJustifyContentEnum.Center,
        gap: AlfPxEnum.Px8,
        width: AlfPercentageEnum.Percent100
      }
    },
    // Estabilidad total
    transform: {
      default: { scale: 1 },
      hover: { scale: 1 }
    },
    shadows: {
      default: { boxShadow: AlfShadowEnum.None },
      hover: { boxShadow: AlfShadowEnum.None }
    }
  };
};

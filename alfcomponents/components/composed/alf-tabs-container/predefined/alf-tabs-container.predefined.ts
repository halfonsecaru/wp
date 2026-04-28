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
    },
    hover: {
      borderWidth: AlfPxEnum.Px1,
      borderStyle: AlfBorderStyleEnum.Solid,
      borderColor: AlfColorEnum.Gray300,
      borderRadius: AlfRadiusEnum.Md
    },
    active: {
      borderWidth: AlfPxEnum.Px1,
      borderStyle: AlfBorderStyleEnum.Solid,
      borderColor: AlfColorEnum.Gray300,
      borderRadius: AlfRadiusEnum.Md
    }
  },
  backgrounds: {
    default: { backgroundColor: AlfColorEnum.Transparent },
    hover: { backgroundColor: AlfColorEnum.Transparent },
    active: { backgroundColor: AlfColorEnum.Transparent },
    focus: { backgroundColor: AlfColorEnum.Transparent }
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
    },
    hover: {
      color: AlfColorEnum.SecondaryHover
    },
    active: {
      color: AlfColorEnum.SecondaryHover
    }
  },
  shadows: {
    default: { boxShadow: AlfShadowEnum.None },
    hover: { boxShadow: AlfShadowEnum.None },
    active: { boxShadow: AlfShadowEnum.None }
  },
  transform: {
    default: { scale: 1 },
    hover: { scale: 1 },
    active: { scale: 1 }
  },
  animations: {
    enterStage: AlfAnimationTypeEnum.FadeIn,
    exitStage: AlfAnimationTypeEnum.FadeOut,
    duration: '0.4s',
    delay: '0s',
  },
  contentAnimations: {
    enterStage: AlfAnimationTypeEnum.FadeIn,
    exitStage: AlfAnimationTypeEnum.FadeOut,
    duration: '0.4s',
    delay: '0.1s',
  }
};

export const ALF_TAB_CONTENT_DEFAULT: Partial<AlfSingleTabInterface> = {
  padding: {
    default: { padding: AlfPxEnum.Px10 },
    hover: { padding: AlfPxEnum.Px10 },
    active: { padding: AlfPxEnum.Px10 },
    focus: { padding: AlfPxEnum.Px10 }
  },
  backgrounds: {
    default: { backgroundColor: AlfColorEnum.Transparent },
    hover: { backgroundColor: AlfColorEnum.Transparent },
    active: { backgroundColor: AlfColorEnum.Transparent },
    focus: { backgroundColor: AlfColorEnum.Transparent }
  },
  border: {
    default: { borderWidth: AlfPxEnum.None, borderColor: AlfColorEnum.Transparent },
    hover: { borderWidth: AlfPxEnum.None, borderColor: AlfColorEnum.Transparent },
    active: { borderWidth: AlfPxEnum.None, borderColor: AlfColorEnum.Transparent }
  },
  shadows: {
    default: { boxShadow: AlfShadowEnum.None },
    hover: { boxShadow: AlfShadowEnum.None },
    active: { boxShadow: AlfShadowEnum.None }
  },
  transform: {
    default: { scale: 1 },
    hover: { scale: 1 },
    active: { scale: 1 }
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
  
  const colorVariant = (AlfColorVariantEnum as any)[variantKey] || AlfColorVariantEnum.Secondary;

  // Resolvemos el estilo visual usando el motor central de Alfonizer
  const visualBase = resolveDefaultVisual({
    colorVariant,
    visualType
  });

  // Mapeamos el color real para el borde y texto según la variante
  let variantColor: AlfColorEnum = AlfColorEnum.Secondary;
  switch (variantKey.toLowerCase()) {
    case 'primary': variantColor = AlfColorEnum.Primary; break;
    case 'success': variantColor = AlfColorEnum.Success; break;
    case 'danger': variantColor = AlfColorEnum.Danger; break;
    case 'warning': variantColor = AlfColorEnum.Warning; break;
    case 'info': variantColor = AlfColorEnum.Info; break;
    case 'dark': variantColor = AlfColorEnum.Gray900; break;
    case 'light': variantColor = AlfColorEnum.Gray300; break;
  }

  // Mapeamos los colores para Solid (Fondo suave y texto contrastado)
  let backgroundColor: AlfColorEnum = AlfColorEnum.Transparent;
  let borderColor: AlfColorEnum = AlfColorEnum.Transparent;

  if (isSolid) {
    switch (variantKey.toLowerCase()) {
      case 'primary': 
        backgroundColor = AlfColorEnum.Blue050; 
        borderColor = AlfColorEnum.Blue200;
        variantColor = AlfColorEnum.Blue600;
        break;
      case 'success': 
        backgroundColor = AlfColorEnum.Green050; 
        borderColor = AlfColorEnum.Green200;
        variantColor = AlfColorEnum.Green600;
        break;
      case 'danger': 
        backgroundColor = AlfColorEnum.Red050; 
        borderColor = AlfColorEnum.Red200;
        variantColor = AlfColorEnum.Red600;
        break;
      case 'warning': 
        backgroundColor = AlfColorEnum.Yellow050; 
        borderColor = AlfColorEnum.Yellow200;
        variantColor = AlfColorEnum.Yellow700;
        break;
      case 'info': 
        backgroundColor = AlfColorEnum.Cyan050; 
        borderColor = AlfColorEnum.Cyan200;
        variantColor = AlfColorEnum.Cyan600;
        break;
      case 'dark': 
        backgroundColor = AlfColorEnum.Gray100; 
        borderColor = AlfColorEnum.Gray300;
        variantColor = AlfColorEnum.Gray900;
        break;
      case 'light': 
        backgroundColor = AlfColorEnum.Gray050; 
        borderColor = AlfColorEnum.Gray200;
        variantColor = AlfColorEnum.Gray500;
        break;
    }
  }

  return {
    ...defaultConfig,
    colorVariant,
    visualType,
    // Definición explícita de bordes
    border: {
      default: {
        borderWidth: (isOutline || isCrystal || isSolid) ? AlfPxEnum.Px1 : AlfPxEnum.None,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: isOutline ? variantColor : (isSolid ? borderColor : (isCrystal ? AlfColorEnum.White : AlfColorEnum.Transparent)),
        borderRadius: AlfRadiusEnum.Md
      },
      hover: {
        borderWidth: (isOutline || isCrystal || isSolid) ? AlfPxEnum.Px1 : AlfPxEnum.None,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: isOutline ? variantColor : (isSolid ? borderColor : (isCrystal ? AlfColorEnum.White : AlfColorEnum.Transparent)),
        borderRadius: AlfRadiusEnum.Md
      },
      active: {
        borderWidth: (isOutline || isCrystal || isSolid) ? AlfPxEnum.Px1 : AlfPxEnum.None,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: isOutline ? variantColor : (isSolid ? borderColor : (isCrystal ? AlfColorEnum.White : AlfColorEnum.Transparent)),
        borderRadius: AlfRadiusEnum.Md
      }
    },
    // Definición explícita de fondos
    backgrounds: {
      default: { backgroundColor },
      hover: { backgroundColor },
      active: { backgroundColor },
      focus: { backgroundColor }
    },
    // Estilo de texto: Para Solid usamos el color de la variante (ya que el fondo es muy claro)
    textStyle: {
      default: { color: variantColor },
      hover: { color: variantColor },
      active: { color: variantColor }
    },
    // Layout inamovible (debe ser columna para el contenedor)
    displayAndLayout: {
      default: {
        display: AlfDisplayEnum.Flex,
        flexDirection: AlfFlexDirectionEnum.Column,
        alignItems: AlfAlignItemsEnum.Stretch,
        justifyContent: AlfJustifyContentEnum.Start,
        width: AlfPercentageEnum.Full
      }
    },
    // Estabilidad total
    transform: {
      default: { scale: 1 },
      hover: { scale: 1 },
      active: { scale: 1 }
    },
    shadows: {
      default: { boxShadow: AlfShadowEnum.Md },
      hover: { boxShadow: AlfShadowEnum.Md },
      active: { boxShadow: AlfShadowEnum.Md }
    }
  };
};

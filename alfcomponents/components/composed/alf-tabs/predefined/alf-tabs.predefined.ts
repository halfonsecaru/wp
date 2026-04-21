import { AlfTabsInterface, AlfTabContentInterface } from '../interfaces/alf-tabs.interface';
import { DefaultTabsKeys } from '../enums/default-tabs-keys.enum';
import { AlfTabsPositionEnum, AlfTabsVisualTypeEnum } from '../enums/alf-tabs-visual-type.enum';
import { AlfColorEnum, AlfRadiusEnum, AlfPxEnum, AlfAnimationTypeEnum, AlfShadowEnum } from '@alfcomponents/enums';

/**
 * Interface para el ADN puro (Identidad) de AlfTabs.
 */
interface AlfTabsIdentity {
  brandColor: AlfColorEnum;
  position: AlfTabsPositionEnum;
  visualType: AlfTabsVisualTypeEnum;
  enterAnimation?: AlfAnimationTypeEnum;
  exitAnimation?: AlfAnimationTypeEnum;
}

/**
 * 1. MAPA DE IDENTIDADES (ADN Estructural)
 */
const TABS_IDENTITIES: Record<string, AlfTabsIdentity> = {
  [DefaultTabsKeys.Base]: {
    brandColor: AlfColorEnum.Primary,
    position: AlfTabsPositionEnum.Top,
    visualType: AlfTabsVisualTypeEnum.Master,
    enterAnimation: AlfAnimationTypeEnum.SlideInRight,
    exitAnimation: AlfAnimationTypeEnum.SlideOutLeft
  },
  [DefaultTabsKeys.Sidebar]: {
    brandColor: AlfColorEnum.Secondary,
    position: AlfTabsPositionEnum.Left,
    visualType: AlfTabsVisualTypeEnum.Pill,
    enterAnimation: AlfAnimationTypeEnum.SlideInLeft,
    exitAnimation: AlfAnimationTypeEnum.SlideOutRight
  },

  [DefaultTabsKeys.Settings]: {
    brandColor: AlfColorEnum.Info,
    position: AlfTabsPositionEnum.Top,
    visualType: AlfTabsVisualTypeEnum.Modern,
    enterAnimation: AlfAnimationTypeEnum.FadeInDown,
    exitAnimation: AlfAnimationTypeEnum.FadeOutUp
  },
  [DefaultTabsKeys.Profile]: {
    brandColor: AlfColorEnum.Success,
    position: AlfTabsPositionEnum.Top,
    visualType: AlfTabsVisualTypeEnum.Glass,
    enterAnimation: AlfAnimationTypeEnum.ZoomIn,
    exitAnimation: AlfAnimationTypeEnum.ZoomOut
  },
  [DefaultTabsKeys.Master]: {
    brandColor: AlfColorEnum.Primary,
    position: AlfTabsPositionEnum.Top,
    visualType: AlfTabsVisualTypeEnum.Master,
    enterAnimation: AlfAnimationTypeEnum.SlideInRight,
    exitAnimation: AlfAnimationTypeEnum.SlideOutLeft
  }
};

/**
 * 2. CONFIGURACIÓN BASE (El Esqueleto Común)
 */
const TABS_BASE_CONFIG: Partial<AlfTabsInterface> = {
  behavior: {
    showScrollArrows: true,
    circularNavigation: true,
    animationDuration: 400
  },
  backgrounds: {
    default: {
      backgroundColor: AlfColorEnum.White,
    },
    hover: {
    }
  },
  padding: {
    default: {
      padding: AlfPxEnum.Px16
    }
  },
  border: {
    default: {
      borderRadius: AlfRadiusEnum.Md,
      borderWidth: AlfPxEnum.Px1,
      borderColor: AlfColorEnum.Gray200,
    }
  },
  shadows: {
    default: {
      boxShadow: AlfShadowEnum.Md
    }
  }
};

/**
 * 3. CONSTRUCTOR MAESTRO (Factory Pattern)
 * Aplica lógica de transformación ESTRUCTURAL. 
 * Los colores y la "piel" dinámica son resueltos automáticamente por el AlfBaseComponent
 * basándose en el visualType y el themeSignal global.
 */
export function getAlfPredefinedTabs(
  key: string,
  overrides?: Partial<AlfTabsInterface>
): AlfTabsInterface {
  const identity = TABS_IDENTITIES[key.toLowerCase()] ?? TABS_IDENTITIES[DefaultTabsKeys.Base];
  const { brandColor, position, visualType, enterAnimation, exitAnimation } = identity;

  // 1. Empezamos con la base
  let config: AlfTabsInterface = {
    ...TABS_BASE_CONFIG,
    position,
    visualType,
    brandColor,
    ...overrides
  } as AlfTabsInterface;

  // 2. Aplicación de ADN Estructural Élite
  switch (visualType) {
    case AlfTabsVisualTypeEnum.Glass:
    case AlfTabsVisualTypeEnum.Master:
      // No definimos backgrounds aquí. AlfBaseComponent lo inyectará desde theme.premium.glassBackground
      config.border = {
        default: {
          ...config.border?.default,
        }
      };
      break;

    case AlfTabsVisualTypeEnum.Pill:
      config.backgrounds = { 
        ...config.backgrounds,
        default: { ...config.backgrounds?.default, backgroundColor: AlfColorEnum.Transparent } 
      };
      config.border = { 
        ...config.border,
        default: { ...config.border?.default, borderRadius: AlfRadiusEnum.Xl3, borderWidth: AlfPxEnum.None } 
      };
      break;

    case AlfTabsVisualTypeEnum.Modern:
      config.backgrounds = { 
        ...config.backgrounds,
        default: { ...config.backgrounds?.default, backgroundColor: AlfColorEnum.Transparent } 
      };
      break;

    default: // Underline
      // No reseteamos el borderWidth para que respete TABS_BASE_CONFIG si se desea
      break;
  }

  // 3. Fusionamos animaciones y contenido final
  const animDurationStr = `${config.behavior?.animationDuration ?? 400}ms`;
  const defaultContent: AlfTabContentInterface = {
    padding: { default: { padding: AlfPxEnum.Px20 } },
    animations: (enterAnimation || exitAnimation) ? {
      enterStage: enterAnimation,
      exitStage: exitAnimation,
      duration: animDurationStr
    } : undefined
  };

  config.defaultContentConfig = defaultContent;
  config.behavior = {
    ...config.behavior,
    defaultAnimations: (enterAnimation || exitAnimation) ? {
      enterStage: enterAnimation,
      exitStage: exitAnimation,
      duration: animDurationStr
    } : undefined
  };

  return config;
}

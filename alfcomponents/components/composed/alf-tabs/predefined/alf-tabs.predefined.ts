import { AlfTabsInterface, AlfTabContentInterface } from '../interfaces/alf-tabs.interface';
import { DefaultTabsKeys } from '../enums/default-tabs-keys.enum';
import { AlfTabsPositionEnum, AlfTabsVisualTypeEnum } from '../enums/alf-tabs-visual-type.enum';
import { AlfColorEnum, AlfRadiusEnum, AlfPxEnum, AlfAnimationTypeEnum } from '@alfcomponents/enums';
import { AlfAnimateCssInterface } from '@alfcomponents/interfaces';

/**
 * Interface para la Identidad Pura de AlfTabs.
 * Define el ADN visual y de comportamiento base.
 */
interface AlfTabsIdentity {
  brandColor: AlfColorEnum;
  position: AlfTabsPositionEnum;
  visualType: AlfTabsVisualTypeEnum;
  enterAnimation?: AlfAnimationTypeEnum;
  exitAnimation?: AlfAnimationTypeEnum;
}

/**
 * 1. MAPA DE IDENTIDADES (ADN)
 */
const TABS_IDENTITIES: Record<string, AlfTabsIdentity> = {
  [DefaultTabsKeys.Base]: {
    brandColor: AlfColorEnum.Primary,
    position: AlfTabsPositionEnum.Top,
    visualType: AlfTabsVisualTypeEnum.Underline,
    enterAnimation: AlfAnimationTypeEnum.FadeIn,
    exitAnimation: AlfAnimationTypeEnum.FadeOut
  },
  [DefaultTabsKeys.Sidebar]: {
    brandColor: AlfColorEnum.Secondary,
    position: AlfTabsPositionEnum.Left,
    visualType: AlfTabsVisualTypeEnum.Pill,
    enterAnimation: AlfAnimationTypeEnum.SlideInLeft,
    exitAnimation: AlfAnimationTypeEnum.SlideOutLeft
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
  ['master']: {
    brandColor: AlfColorEnum.Primary,
    position: AlfTabsPositionEnum.Top,
    visualType: AlfTabsVisualTypeEnum.Master,
    enterAnimation: AlfAnimationTypeEnum.SlideInRight,
    exitAnimation: AlfAnimationTypeEnum.SlideOutLeft
  }
};

/**
 * 2. CONSTRUCTOR MAESTRO
 * Transforma una Identidad en una configuración completa de AlfTabs.
 */
export function getAlfPredefinedTabs(
  key: string,
  overrides?: Partial<AlfTabsInterface>
): AlfTabsInterface {
  const identity = TABS_IDENTITIES[key] ?? TABS_IDENTITIES[DefaultTabsKeys.Base];
  const { brandColor, position, visualType, enterAnimation, exitAnimation } = identity;

  const animDurationStr = `${overrides?.behavior?.animationDuration ?? 400}ms`;

  // Configuración de Contenido por defecto
  const defaultContent: AlfTabContentInterface = {
    padding: {
      default: {
        padding: AlfPxEnum.Px20
      }
    },
    animations: (enterAnimation || exitAnimation) ? { 
      enterStage: enterAnimation,
      exitStage: exitAnimation,
      duration: animDurationStr
    } : undefined
  };

  const baseConfig: AlfTabsInterface = {
    position,
    visualType,
    behavior: {
      showScrollArrows: true,
      circularNavigation: true,
      animationDuration: 400,
      defaultAnimations: (enterAnimation || exitAnimation) ? { 
        enterStage: enterAnimation,
        exitStage: exitAnimation,
        duration: animDurationStr
      } : undefined
    },
    defaultContentConfig: defaultContent,
    // Estilos del contenedor principal
    padding: {
      default: {
        padding: AlfPxEnum.Px16
      }
    },
    border: {
      default: {
        borderRadius: AlfRadiusEnum.Md
      }
    },
    backgrounds: {
      default: {
        backgroundColor: AlfColorEnum.White
      }
    }
  };

  // Fusión con overrides del usuario
  return { ...baseConfig, ...overrides };
}

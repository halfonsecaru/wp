import { AlfTabsInterface, AlfTabContentInterface } from '../interfaces/alf-tabs.interface';
import { DefaultTabsKeys } from '../enums/default-tabs-keys.enum';
import { AlfTabsPositionEnum, AlfTabsVisualTypeEnum } from '../enums/alf-tabs-visual-type.enum';
import { AlfColorEnum, AlfRadiusEnum, AlfPxEnum, AlfAnimationTypeEnum, AlfShadowEnum, AlfColorVariantEnum, AlfButtonVisualTypeEnum } from '@alfcomponents/enums';

import { AlfButtonInterface } from '../../../simple/alf-button/interfaces/alf-button.interface';

/**
 * Interface para el ADN puro (Identidad) de AlfTabs.
 */
interface AlfTabsIdentity {
  visualType: AlfTabsVisualTypeEnum;
  enterAnimation?: AlfAnimationTypeEnum;
  exitAnimation?: AlfAnimationTypeEnum;
  tabsConfiguration?: AlfButtonInterface;
}


/**
 * 1. CONFIGURACIÓN BASE (El Esqueleto Común)
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
    }
  },
  border: {
    default: {
      borderRadius: AlfRadiusEnum.Md,
      borderWidth: AlfPxEnum.Px1,
      borderColor: AlfColorEnum.Gray200,
    }
  },
  padding: {
    default: {
      padding: AlfPxEnum.Px12,
    }
  }
};

/**
 * FACTORY: getAlfPredefinedTabs
 * Crea una configuración completa de AlfTabs a partir de una clave predefinida,
 * basándose en el visualType y el themeSignal global.
 */
export function getAlfPredefinedTabs(
  key: string,
  overrides?: Partial<AlfTabsInterface>
): AlfTabsInterface {
  const config = buildTabsConfiguration(key, overrides);
  const isSolid = config.tabsConfiguration?.tabConfiguration?.visualType === AlfButtonVisualTypeEnum.Solid;

  // 2. Aplicación de ADN Estructural Élite
  switch (config.visualType) {
    case AlfTabsVisualTypeEnum.Master:
      config.tabsConfiguration = {
        ...config.tabsConfiguration,
        tabConfiguration: {
          ripple: true,
          shadows: { default: { boxShadow: AlfShadowEnum.None } },
          visualType: isSolid ? AlfButtonVisualTypeEnum.Solid : AlfButtonVisualTypeEnum.Text,
          padding: { default: { padding: AlfPxEnum.None } },
          border: {
            default: {
              borderWidth: AlfPxEnum.None,
              borderRadius: AlfRadiusEnum.None
            }
          },
          ...config.tabsConfiguration?.tabConfiguration,
        }
      };
      break;

    default: // Underline
      config.tabsConfiguration = {
        ...config.tabsConfiguration,
        tabConfiguration: {
          visualType: isSolid ? AlfButtonVisualTypeEnum.Solid : AlfButtonVisualTypeEnum.Text,
          padding: { default: { padding: AlfPxEnum.None } },
          border: {
            default: {
              borderWidth: AlfPxEnum.None,
              borderRadius: AlfRadiusEnum.None
            }
          },
          ...config.tabsConfiguration?.tabConfiguration,
        }
      };
      break;
  }

  return config;
}

const buildTabsConfiguration = (key: string, overrides?: Partial<AlfTabsInterface>) => {
  const identity = key.toLowerCase() === DefaultTabsKeys.Master ?
    {
      visualType: AlfTabsVisualTypeEnum.Master,
      enterAnimation: AlfAnimationTypeEnum.FadeIn,
      exitAnimation: AlfAnimationTypeEnum.FadeOut
    }
    : {
      visualType: AlfTabsVisualTypeEnum.Underline,
      enterAnimation: AlfAnimationTypeEnum.FadeIn,
      exitAnimation: AlfAnimationTypeEnum.FadeOut
    };

  const { visualType, enterAnimation, exitAnimation } = identity;

  // 1. Empezamos con la base
  let config: AlfTabsInterface = {
    ...TABS_BASE_CONFIG,
    visualType,
    predefined: key,
    ...overrides
  } as AlfTabsInterface;

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
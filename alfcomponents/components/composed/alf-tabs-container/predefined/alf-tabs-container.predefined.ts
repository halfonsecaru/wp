import { AlfTabsStyleEnum } from '../enums/alf-tabs.enum';
import {
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
  AlfAnimationTypeEnum,
} from '@alfcomponents/enums';
import { AlfTabsContainerConfigInterface, AlfSingleTabInterface } from '../interfaces/alf-tabs.interface';
import { resolveVariantDefinitions } from '@alfcomponents/base/variantes/main-variants-selection';

/**
 * Configuración por defecto para el contenedor de pestañas.
 */
export const ALF_TABS_CONTAINER_DEFAULT: AlfTabsContainerConfigInterface = {
  tabsStyle: AlfTabsStyleEnum.Underline,
  tab: [],
  colorVariant: AlfColorVariantEnum.Transparent,
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

/**
 * Configuración por defecto para el contenido de una pestaña individual.
 */
export const ALF_TAB_CONTENT_DEFAULT: Partial<AlfSingleTabInterface> = {
  padding: {
    default: { padding: AlfPxEnum.Px10 }
  },
  backgrounds: {
    default: { backgroundColor: AlfColorEnum.Transparent }
  },
  border: {
    default: { borderWidth: AlfPxEnum.None, borderColor: AlfColorEnum.Transparent }
  }
};

/**
 * Obtiene la configuración por defecto para el contenedor delegando en el motor Élite.
 */
export const getAlfTabDefaultConfig = (
  variant: AlfColorVariantEnum = AlfColorVariantEnum.Transparent
): AlfTabsContainerConfigInterface => {
  const visualBase = resolveVariantDefinitions(variant);

  return {
    ...ALF_TABS_CONTAINER_DEFAULT,
    ...visualBase,
    colorVariant: variant,
    // Forzamos el layout estructural necesario para el contenedor
    displayAndLayout: {
      default: {
        display: AlfDisplayEnum.Flex,
        flexDirection: AlfFlexDirectionEnum.Column,
        alignItems: AlfAlignItemsEnum.Stretch,
        justifyContent: AlfJustifyContentEnum.Start,
        width: AlfPercentageEnum.Full
      }
    }
  };
};

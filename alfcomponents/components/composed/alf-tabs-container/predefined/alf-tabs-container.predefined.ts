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
  AlfFontWeightEnum,
  AlfCursorEnum,
  AlfShadowEnum
} from '@alfcomponents/enums';
import { AlfTabsContainerConfigInterface, AlfSingleTabInterface } from '../interfaces/alf-tabs.interface';
import { AlfComponentTypeEnum, resolveVariantConfig } from '@alfcomponents/base/defaultVariants';

/**
 * Configuración por defecto para el contenedor de pestañas.
 */
export const ALF_TABS_CONTAINER_DEFAULT: AlfTabsContainerConfigInterface = {
  tabsStyle: AlfTabsStyleEnum.Underline,
  tab: [],
  disabled: false,
  colorVariant: AlfColorVariantEnum.Transparent,
  typography: {
    default: {
      fontWeight: AlfFontWeightEnum.SemiBold,
    }
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
  },
  displayAndLayout: {
    default: {
      display: AlfDisplayEnum.Flex,
      flexDirection: AlfFlexDirectionEnum.Column,
      alignItems: AlfAlignItemsEnum.Stretch,
      justifyContent: AlfJustifyContentEnum.Start,
      width: AlfPxEnum.auto,
      height: AlfPxEnum.auto
    }
  }
};

/**
 * Configuración por defecto para el contenido de una pestaña individual.
 */
export const ALF_TAB_CONTENT_DEFAULT: Partial<AlfSingleTabInterface> = {
};

/**
 * Obtiene la configuración por defecto para el contenedor delegando en el motor Élite.
 */
export const getAlfTabDefaultConfig = (
  variant: AlfColorVariantEnum = AlfColorVariantEnum.Transparent
): AlfTabsContainerConfigInterface => {

  console.log(variant);
  return {
    ...resolveVariantConfig(variant, AlfComponentTypeEnum.Tabs),
    ...ALF_TABS_CONTAINER_DEFAULT,
    colorVariant: variant,
  };
};
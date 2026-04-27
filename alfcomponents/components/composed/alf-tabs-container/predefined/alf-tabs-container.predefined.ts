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
  AlfAnimationTypeEnum
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

/**
 * Obtiene la configuración por defecto para el botón de una pestaña.
 */
export const getAlfTabDefaultConfig = (label: string) => ({
  label,
  visualType: AlfButtonVisualTypeEnum.Text,
  colorVariant: AlfColorVariantEnum.Secondary,
  backgrounds: {
    default: { backgroundColor: AlfColorEnum.Transparent },
    hover: { backgroundColor: AlfColorEnum.Gray150 },
    active: { backgroundColor: AlfColorEnum.Transparent },
  },
  border: {
    default: { borderRadius: AlfRadiusEnum.None, borderWidth: AlfPxEnum.None, borderColor: AlfColorEnum.Transparent },
    hover: { borderRadius: AlfRadiusEnum.None, borderWidth: AlfPxEnum.None, borderColor: AlfColorEnum.Transparent },
  },
  textStyle: {
    default: { color: AlfColorEnum.Secondary },
    hover: { color: AlfColorEnum.Secondary },
  },
  shadows: {
    default: { boxShadow: AlfShadowEnum.None },
    hover: { boxShadow: AlfShadowEnum.None },
  }
});

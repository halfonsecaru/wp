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

/**
 * Configuración por defecto para el contenedor de pestañas.
 */
export const ALF_TABS_CONTAINER_DEFAULT: AlfTabsContainerConfigInterface = {
  tabsStyle: AlfTabsStyleEnum.Underline,
  tab: [],
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
    focus: {
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
    default: {
      backgroundColor: AlfColorEnum.White,
      backgroundImage: 'none'
    },
    hover: {
      backgroundColor: AlfColorEnum.Transparent,
      backgroundImage: 'none'
    },
    active: {
      backgroundColor: AlfColorEnum.Transparent,
      backgroundImage: 'none'
    },
    focus: {
      backgroundColor: AlfColorEnum.Transparent,
      backgroundImage: 'none'
    }
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
  colorVariant: AlfColorVariantEnum.Transparent,
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
  displayAndLayout: {
    default: {
      display: AlfDisplayEnum.Grid,
      flexDirection: AlfFlexDirectionEnum.Column,
      alignItems: AlfAlignItemsEnum.Stretch,
      justifyContent: AlfJustifyContentEnum.Start,
      width: AlfPxEnum.auto,
      height: AlfPxEnum.auto,
      cursor: AlfCursorEnum.Default
    },
    hover: {
      display: AlfDisplayEnum.Grid,
      flexDirection: AlfFlexDirectionEnum.Column,
      alignItems: AlfAlignItemsEnum.Stretch,
      justifyContent: AlfJustifyContentEnum.Start,
      width: AlfPxEnum.auto,
      height: AlfPxEnum.auto,
      cursor: AlfCursorEnum.Pointer
    },
    active: {
      display: AlfDisplayEnum.Grid,
      flexDirection: AlfFlexDirectionEnum.Column,
      alignItems: AlfAlignItemsEnum.Stretch,
      justifyContent: AlfJustifyContentEnum.Start,
      width: AlfPxEnum.auto,
      height: AlfPxEnum.auto,
      cursor: AlfCursorEnum.Pointer
    },
    focus: {
      display: AlfDisplayEnum.Grid,
      flexDirection: AlfFlexDirectionEnum.Column,
      alignItems: AlfAlignItemsEnum.Stretch,
      justifyContent: AlfJustifyContentEnum.Start,
      width: AlfPxEnum.auto,
      height: AlfPxEnum.auto,
      cursor: AlfCursorEnum.Pointer
    },
    disabled: {
      display: AlfDisplayEnum.Grid,
      flexDirection: AlfFlexDirectionEnum.Column,
      alignItems: AlfAlignItemsEnum.Stretch,
      justifyContent: AlfJustifyContentEnum.Start,
      width: AlfPxEnum.auto,
      height: AlfPxEnum.auto,
      cursor: AlfCursorEnum.NotAllowed
    }
  },


};

/**
 * Obtiene la configuración por defecto para el contenedor delegando en el motor Élite.
 */
export const getAlfTabDefaultConfig = (
  variant: AlfColorVariantEnum = AlfColorVariantEnum.Transparent
): AlfTabsContainerConfigInterface => {

  return {
    ...ALF_TABS_CONTAINER_DEFAULT,
    colorVariant: variant,
    // Forzamos el layout estructural necesario para el contenedor
    displayAndLayout: {
      default: {
        display: AlfDisplayEnum.Flex,
        flexDirection: AlfFlexDirectionEnum.Column,
        alignItems: AlfAlignItemsEnum.Stretch,
        justifyContent: AlfJustifyContentEnum.Start,
        width: AlfPercentageEnum.Full,
        height: AlfPxEnum.auto
      }
    }
  };
};


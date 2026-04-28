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
  AlfVisualPredefinedEnum
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
 * Obtiene una configuración predefinida para el contenedor de pestañas.
 * @param variant Variante de color (Primary, Secondary, etc.)
 * @param visualType Tipo visual (Solid, Outlined)
 */
export const getAlfPredefinedTabs = (
  variant: AlfColorVariantEnum,
  visualType: AlfButtonVisualTypeEnum = AlfButtonVisualTypeEnum.Solid
): AlfTabsContainerConfigInterface => {
  const isOutlined = visualType === AlfButtonVisualTypeEnum.Outlined;
  const predefined = isOutlined 
    ? resolveOutlinedPredefined(variant) 
    : resolveSolidPredefined(variant);

  return {
    ...ALF_TABS_CONTAINER_DEFAULT,
    colorVariant: variant,
    visualType: visualType,
    predefined: predefined,
    border: {
      default: {
        borderWidth: AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: AlfColorEnum.Transparent, // El color lo gestionará el predefined
        borderRadius: AlfRadiusEnum.Md
      }
    }
  };
};

/**
 * Auxiliares para resolver el enum de predefinidos (copiados de button para consistencia)
 */
const resolveSolidPredefined = (variant: AlfColorVariantEnum): AlfVisualPredefinedEnum => {
  switch (variant) {
    case AlfColorVariantEnum.Primary: return AlfVisualPredefinedEnum.SolidPrimary;
    case AlfColorVariantEnum.Secondary: return AlfVisualPredefinedEnum.SolidSecondary;
    case AlfColorVariantEnum.Success: return AlfVisualPredefinedEnum.SolidSuccess;
    case AlfColorVariantEnum.Danger: return AlfVisualPredefinedEnum.SolidDanger;
    case AlfColorVariantEnum.Warning: return AlfVisualPredefinedEnum.SolidWarning;
    case AlfColorVariantEnum.Info: return AlfVisualPredefinedEnum.SolidInfo;
    case AlfColorVariantEnum.Light: return AlfVisualPredefinedEnum.SolidLight;
    case AlfColorVariantEnum.Dark: return AlfVisualPredefinedEnum.SolidDark;
    default: return AlfVisualPredefinedEnum.SolidDefault;
  }
};

const resolveOutlinedPredefined = (variant: AlfColorVariantEnum): AlfVisualPredefinedEnum => {
  switch (variant) {
    case AlfColorVariantEnum.Primary: return AlfVisualPredefinedEnum.OutlinedPrimary;
    case AlfColorVariantEnum.Secondary: return AlfVisualPredefinedEnum.OutlinedSecondary;
    case AlfColorVariantEnum.Success: return AlfVisualPredefinedEnum.OutlinedSuccess;
    case AlfColorVariantEnum.Danger: return AlfVisualPredefinedEnum.OutlinedDanger;
    case AlfColorVariantEnum.Warning: return AlfVisualPredefinedEnum.OutlinedWarning;
    case AlfColorVariantEnum.Info: return AlfVisualPredefinedEnum.OutlinedInfo;
    case AlfColorVariantEnum.Light: return AlfVisualPredefinedEnum.OutlinedLight;
    case AlfColorVariantEnum.Dark: return AlfVisualPredefinedEnum.OutlinedDark;
    default: return AlfVisualPredefinedEnum.OutlinedDefault;
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

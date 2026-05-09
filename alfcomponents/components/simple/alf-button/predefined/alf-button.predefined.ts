import {
  AlfColorVariantEnum,
  AlfCursorEnum,
  AlfButtonTypeEnum,
  AlfPxEnum,
} from '@alfcomponents/enums';
import { AlfButtonInterface } from '../interfaces/alf-button.interface';
import { getAlfButtonLabel, AlfButtonI18nLabels } from '../i18n/alf-button.i18n';
import { SupportedLanguage } from '@alfcomponents/i18n/i18n-utils';
import { resolveVariantConfig } from '@alfcomponents/base/defaultVariants';

/**
 * Configuración base por defecto para el componente alf-button.
 */
export const ALF_BUTTON_DEFAULT: AlfButtonInterface = {
  type: AlfButtonTypeEnum.Button,
  disabled: false,
  loading: false,
  debounceTime: 0,
  cursor: AlfCursorEnum.Pointer,

};


export const getAlfButtonDefaultConfig = (
  variant: AlfColorVariantEnum,
  labelKey?: keyof AlfButtonI18nLabels,
  lang?: SupportedLanguage
): AlfButtonInterface => {

  const variantConfig = resolveVariantConfig(variant);
  return {
    ...ALF_BUTTON_DEFAULT,
    ...variantConfig,
    padding: {
      default: {
        paddingLeft: AlfPxEnum.Px20,
        paddingRight: AlfPxEnum.Px20
      },
      hover: {
        paddingLeft: AlfPxEnum.Px20,
        paddingRight: AlfPxEnum.Px20
      },
      focus: {
        paddingLeft: AlfPxEnum.Px20,
        paddingRight: AlfPxEnum.Px20
      },
      active: {
        paddingLeft: AlfPxEnum.Px20,
        paddingRight: AlfPxEnum.Px20
      },
      disabled: {
        paddingLeft: AlfPxEnum.Px20,
        paddingRight: AlfPxEnum.Px20
      },
    },
    colorVariant: variant,
    label: labelKey ? getAlfButtonLabel(labelKey, lang) : 'Button',
  };
};

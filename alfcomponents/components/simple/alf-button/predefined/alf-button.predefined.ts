import {
  AlfColorVariantEnum,
  AlfCursorEnum,
  AlfButtonTypeEnum,
  AlfPxEnum,
} from '@alfcomponents/enums';
import { AlfButtonInterface } from '../interfaces/alf-button.interface';
import { getAlfButtonLabel, AlfButtonI18nLabels } from '../i18n/alf-button.i18n';
import { SupportedLanguage } from '@alfcomponents/i18n/i18n-utils';
import { AlfComponentTypeEnum, resolveVariantConfig } from '@alfcomponents/base/defaultVariants';
import { AlfPaddingInterface } from '@alfcomponents/interfaces';

export const getAlfButtonDefaultConfig = (
  variant: AlfColorVariantEnum,
  labelKey?: keyof AlfButtonI18nLabels,
  lang?: SupportedLanguage
): AlfButtonInterface => {

  const paddingBase: AlfPaddingInterface = {
    default: {
      paddingLeft: AlfPxEnum.Px15,
      paddingRight: AlfPxEnum.Px15,
      paddingTop: AlfPxEnum.Px18,
      paddingBottom: AlfPxEnum.Px18,
    },
    hover: {
      paddingLeft: AlfPxEnum.Px15,
      paddingRight: AlfPxEnum.Px15,
      paddingTop: AlfPxEnum.Px18,
      paddingBottom: AlfPxEnum.Px18,
    },
    focus: {
      paddingLeft: AlfPxEnum.Px15,
      paddingRight: AlfPxEnum.Px15,
      paddingTop: AlfPxEnum.Px18,
      paddingBottom: AlfPxEnum.Px18,
    },
    active: {
      paddingLeft: AlfPxEnum.Px15,
      paddingRight: AlfPxEnum.Px15,
      paddingTop: AlfPxEnum.Px18,
      paddingBottom: AlfPxEnum.Px18,
    },
    disabled: {
      paddingLeft: AlfPxEnum.Px15,
      paddingRight: AlfPxEnum.Px15,
      paddingTop: AlfPxEnum.Px18,
      paddingBottom: AlfPxEnum.Px18,
    }
  }
  return {
    type: AlfButtonTypeEnum.Button,
    disabled: false,
    loading: false,
    debounceTime: 0.100,
    cursor: AlfCursorEnum.Pointer,
    ...resolveVariantConfig(variant, AlfComponentTypeEnum.Button),
    padding: paddingBase,
    label: labelKey ? getAlfButtonLabel(labelKey, lang) : 'Button',
  };
};

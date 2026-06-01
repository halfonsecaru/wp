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
    colorVariant: variant,
    ...resolveVariantConfig(variant, AlfComponentTypeEnum.Button),
    padding: paddingBase,
    label: labelKey ? getAlfButtonLabel(labelKey, lang) : 'Button',
  };
};

import { DefaultButtonKeys } from '../enums/defaultButtonKeys.interface';

export interface PredefinedButtonOptions {
  styleKind?: 'outlined' | 'solid' | 'soft' | 'crystal';
}

export const getAlfPredefinedButton = (
  key: DefaultButtonKeys,
  options?: PredefinedButtonOptions
): AlfButtonInterface => {
  let variant = AlfColorVariantEnum.Primary;
  let labelKey: keyof AlfButtonI18nLabels = 'accept';

  switch (key) {
    case DefaultButtonKeys.Accept:
      variant = options?.styleKind === 'outlined' ? AlfColorVariantEnum.PrimaryOutline : AlfColorVariantEnum.Primary;
      labelKey = 'accept';
      break;
    case DefaultButtonKeys.Cancel:
      variant = options?.styleKind === 'outlined' ? AlfColorVariantEnum.SecondaryOutline : AlfColorVariantEnum.Secondary;
      labelKey = 'cancel';
      break;
    case DefaultButtonKeys.Success:
      variant = options?.styleKind === 'outlined' ? AlfColorVariantEnum.SuccessOutline : AlfColorVariantEnum.Success;
      labelKey = 'success';
      break;
    case DefaultButtonKeys.Danger:
      variant = options?.styleKind === 'outlined' ? AlfColorVariantEnum.DangerOutline : AlfColorVariantEnum.Danger;
      labelKey = 'danger';
      break;
    case DefaultButtonKeys.Warning:
      variant = options?.styleKind === 'outlined' ? AlfColorVariantEnum.WarningOutline : AlfColorVariantEnum.Warning;
      labelKey = 'warning';
      break;
    case DefaultButtonKeys.Info:
      variant = options?.styleKind === 'outlined' ? AlfColorVariantEnum.InfoOutline : AlfColorVariantEnum.Info;
      labelKey = 'info';
      break;
    case DefaultButtonKeys.Light:
      variant = options?.styleKind === 'outlined' ? AlfColorVariantEnum.LightOutline : AlfColorVariantEnum.Light;
      labelKey = 'light';
      break;
    case DefaultButtonKeys.Dark:
      variant = options?.styleKind === 'outlined' ? AlfColorVariantEnum.DarkOutline : AlfColorVariantEnum.Dark;
      labelKey = 'dark';
      break;
  }

  return getAlfButtonDefaultConfig(variant, labelKey, 'en');
};


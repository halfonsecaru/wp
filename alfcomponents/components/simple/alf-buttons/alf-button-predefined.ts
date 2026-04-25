import { DefaultButtonKeys } from './enums/defaultButtonKeys.interface';
import { AlfButtonInterface } from './interfaces/alf-button.interface';
import {
  AlfButtonVisualTypeEnum,
  AlfColorVariantEnum,
  AlfVisualPredefinedEnum,
} from '@alfcomponents/enums';
import { getAlfButtonLabel, AlfButtonI18nLabels } from './i18n/alf-button.i18n';
import { SupportedLanguage } from '@alfcomponents/i18n/i18n-utils';

interface AlfButtonIdentity {
  readonly labelKey: keyof AlfButtonI18nLabels;
  readonly colorVariant: AlfColorVariantEnum;
}

export interface AlfPredefinedButtonOptions {
  readonly visualType?: AlfButtonVisualTypeEnum;
  readonly hideIcon?: boolean;
  readonly lang?: SupportedLanguage;
}

const BUTTON_IDENTITIES: Readonly<Record<DefaultButtonKeys, AlfButtonIdentity>> = {
  [DefaultButtonKeys.Accept]: {
    labelKey: 'accept',
    colorVariant: AlfColorVariantEnum.Primary,
  },
  [DefaultButtonKeys.Cancel]: {
    labelKey: 'cancel',
    colorVariant: AlfColorVariantEnum.Secondary,
  },
  [DefaultButtonKeys.Success]: {
    labelKey: 'success',
    colorVariant: AlfColorVariantEnum.Success,
  },
  [DefaultButtonKeys.Danger]: {
    labelKey: 'danger',
    colorVariant: AlfColorVariantEnum.Danger,
  },
  [DefaultButtonKeys.Warning]: {
    labelKey: 'warning',
    colorVariant: AlfColorVariantEnum.Warning,
  },
  [DefaultButtonKeys.Info]: {
    labelKey: 'info',
    colorVariant: AlfColorVariantEnum.Info,
  },
  [DefaultButtonKeys.Dark]: {
    labelKey: 'dark',
    colorVariant: AlfColorVariantEnum.Dark,
  },
  [DefaultButtonKeys.Light]: {
    labelKey: 'light',
    colorVariant: AlfColorVariantEnum.Light,
  }
};

const resolveSolidPredefined = (variant: AlfColorVariantEnum): AlfVisualPredefinedEnum => {
  switch (variant) {
    case AlfColorVariantEnum.Primary:
      return AlfVisualPredefinedEnum.SolidPrimary;
    case AlfColorVariantEnum.Secondary:
      return AlfVisualPredefinedEnum.SolidSecondary;
    case AlfColorVariantEnum.Success:
      return AlfVisualPredefinedEnum.SolidSuccess;
    case AlfColorVariantEnum.Danger:
      return AlfVisualPredefinedEnum.SolidDanger;
    case AlfColorVariantEnum.Warning:
      return AlfVisualPredefinedEnum.SolidWarning;
    case AlfColorVariantEnum.Info:
      return AlfVisualPredefinedEnum.SolidInfo;
    case AlfColorVariantEnum.Light:
      return AlfVisualPredefinedEnum.SolidLight;
    case AlfColorVariantEnum.Dark:
      return AlfVisualPredefinedEnum.SolidDark;
    default:
      return AlfVisualPredefinedEnum.SolidDefault;
  }
};

const resolveOutlinedPredefined = (variant: AlfColorVariantEnum): AlfVisualPredefinedEnum => {
  switch (variant) {
    case AlfColorVariantEnum.Primary:
      return AlfVisualPredefinedEnum.OutlinedPrimary;
    case AlfColorVariantEnum.Secondary:
      return AlfVisualPredefinedEnum.OutlinedSecondary;
    case AlfColorVariantEnum.Success:
      return AlfVisualPredefinedEnum.OutlinedSuccess;
    case AlfColorVariantEnum.Danger:
      return AlfVisualPredefinedEnum.OutlinedDanger;
    case AlfColorVariantEnum.Warning:
      return AlfVisualPredefinedEnum.OutlinedWarning;
    case AlfColorVariantEnum.Info:
      return AlfVisualPredefinedEnum.OutlinedInfo;
    case AlfColorVariantEnum.Light:
      return AlfVisualPredefinedEnum.OutlinedLight;
    case AlfColorVariantEnum.Dark:
      return AlfVisualPredefinedEnum.OutlinedDark;
    default:
      return AlfVisualPredefinedEnum.OutlinedDefault;
  }
};

const resolvePredefined = (
  variant: AlfColorVariantEnum,
  visualType: AlfButtonVisualTypeEnum,
): AlfVisualPredefinedEnum => {
  if (visualType === AlfButtonVisualTypeEnum.Outlined) {
    return resolveOutlinedPredefined(variant);
  }

  return resolveSolidPredefined(variant);
};

const resolveIdentity = (key: DefaultButtonKeys): AlfButtonIdentity =>
  BUTTON_IDENTITIES[key] ?? BUTTON_IDENTITIES[DefaultButtonKeys.Light];

const resolvePredefinedByVisualType = (
  identity: AlfButtonIdentity,
  visualType: AlfButtonVisualTypeEnum,
): AlfVisualPredefinedEnum | undefined => {
  if (
    visualType !== AlfButtonVisualTypeEnum.Solid
    && visualType !== AlfButtonVisualTypeEnum.Outlined
  ) {
    return undefined;
  }

  return resolvePredefined(identity.colorVariant, visualType);
};

export const getAlfPredefinedButton = (
  key: DefaultButtonKeys,
  options?: AlfPredefinedButtonOptions,
): AlfButtonInterface => {
  const identity = resolveIdentity(key);
  const visualType = options?.visualType ?? AlfButtonVisualTypeEnum.Solid;
  const predefined = resolvePredefinedByVisualType(identity, visualType);
  const label = getAlfButtonLabel(identity.labelKey, options?.lang);

  return {
    label,
    colorVariant: identity.colorVariant,
    visualType,
    ...(predefined ? { predefined } : {}),
  };
};

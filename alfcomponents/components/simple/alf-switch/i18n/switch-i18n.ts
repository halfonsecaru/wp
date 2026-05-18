import {
  SupportedLanguage,
  createLanguageMap,
  getLabelsForCurrentLanguage,
  getLabelsForLanguage
} from '@alfcomponents/i18n/i18n-utils';

export interface AlfSwitchI18nLabels {
  readonly active: string;
  readonly inactive: string;
  readonly enabled: string;
  readonly disabled: string;
  readonly on: string;
  readonly off: string;
}

const LABELS_ES: AlfSwitchI18nLabels = {
  active: 'Activo',
  inactive: 'Inactivo',
  enabled: 'Habilitado',
  disabled: 'Deshabilitado',
  on: 'Encendido',
  off: 'Apagado'
} as const;

const LABELS_EN: AlfSwitchI18nLabels = {
  active: 'Active',
  inactive: 'Inactive',
  enabled: 'Enabled',
  disabled: 'Disabled',
  on: 'On',
  off: 'Off'
} as const;

const LANGUAGE_MAP = createLanguageMap<AlfSwitchI18nLabels>({
  es: LABELS_ES,
  en: LABELS_EN
});

export const getAlfSwitchLabels = (lang?: SupportedLanguage): AlfSwitchI18nLabels => {
  if (lang) return getLabelsForLanguage(LANGUAGE_MAP, lang);
  return getLabelsForCurrentLanguage(LANGUAGE_MAP);
};

export const getAlfSwitchLabel = (key: keyof AlfSwitchI18nLabels, lang?: SupportedLanguage): string => {
  return getAlfSwitchLabels(lang)[key];
};

import { createLanguageMap, getLabelsForCurrentLanguage, getLabelsForLanguage, SupportedLanguage } from '@alfcomponents/i18n/i18n-utils';

export interface AlfInputI18nLabels {
  readonly clearAriaLabel: string;
  readonly showPassword: string;
  readonly hidePassword: string;
  readonly loading: string;
}

const LABELS_ES: AlfInputI18nLabels = {
  clearAriaLabel: 'Limpiar campo',
  showPassword: 'Mostrar contraseña',
  hidePassword: 'Ocultar contraseña',
  loading: 'Cargando...',
} as const;

const LABELS_EN: AlfInputI18nLabels = {
  clearAriaLabel: 'Clear field',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  loading: 'Loading...',
} as const;

const LABELS_FR: AlfInputI18nLabels = {
  clearAriaLabel: 'Effacer le champ',
  showPassword: 'Afficher le mot de passe',
  hidePassword: 'Masquer le mot de passe',
  loading: 'Chargement...',
} as const;

const LABELS_DE: AlfInputI18nLabels = {
  clearAriaLabel: 'Feld leeren',
  showPassword: 'Passwort anzeigen',
  hidePassword: 'Passwort verbergen',
  loading: 'Laden...',
} as const;

const LABELS_IT: AlfInputI18nLabels = {
  clearAriaLabel: 'Cancella campo',
  showPassword: 'Mostra password',
  hidePassword: 'Nascondi password',
  loading: 'Caricamento...',
} as const;

const LABELS_PT: AlfInputI18nLabels = {
  clearAriaLabel: 'Limpar campo',
  showPassword: 'Mostrar senha',
  hidePassword: 'Ocultar senha',
  loading: 'Carregando...',
} as const;

const LABELS_RU: AlfInputI18nLabels = {
  clearAriaLabel: 'Очистить поле',
  showPassword: 'Показать пароль',
  hidePassword: 'Скрыть пароль',
  loading: 'Загрузка...',
} as const;

const LANGUAGE_MAP = createLanguageMap<AlfInputI18nLabels>({
  es: LABELS_ES,
  en: LABELS_EN,
  fr: LABELS_FR,
  de: LABELS_DE,
  it: LABELS_IT,
  pt: LABELS_PT,
  ru: LABELS_RU,
});

export const getAlfInputLabels = (lang?: SupportedLanguage): AlfInputI18nLabels => {
  if (lang) return getLabelsForLanguage(LANGUAGE_MAP, lang);
  return getLabelsForCurrentLanguage(LANGUAGE_MAP);
};

export const getAlfInputLabel = (key: keyof AlfInputI18nLabels, lang?: SupportedLanguage): string =>
  getAlfInputLabels(lang)[key];

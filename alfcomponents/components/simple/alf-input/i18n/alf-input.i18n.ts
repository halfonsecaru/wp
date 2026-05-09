import { createLanguageMap, getLabelsForCurrentLanguage, getLabelsForLanguage, SupportedLanguage } from '@alfcomponents/i18n/i18n-utils';

export interface AlfInputI18nLabels {
  readonly clearAriaLabel: string;
  readonly showPassword: string;
  readonly hidePassword: string;
  readonly loading: string;
  readonly validatorEmail: string;
  readonly validatorRequired: string;
  readonly validatorMaxLength: string;
  readonly validatorMinLength: string;
  readonly validatorMin: string;
  readonly validatorMax: string;
  readonly validatorUrl: string;
  readonly validatorPattern: string;
}

const LABELS_ES: AlfInputI18nLabels = {
  clearAriaLabel: 'Limpiar campo',
  showPassword: 'Mostrar contraseña',
  hidePassword: 'Ocultar contraseña',
  loading: 'Cargando...',
  validatorEmail: 'Email no válido',
  validatorRequired: 'Este campo es obligatorio',
  validatorMaxLength: 'Máximo {0} caracteres',
  validatorMinLength: 'Mínimo {0} caracteres',
  validatorMin: 'El valor mínimo es {0}',
  validatorMax: 'El valor máximo es {0}',
  validatorUrl: 'URL no válida',
  validatorPattern: 'Formato no válido',
} as const;

const LABELS_EN: AlfInputI18nLabels = {
  clearAriaLabel: 'Clear field',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  loading: 'Loading...',
  validatorEmail: 'Invalid email',
  validatorRequired: 'This field is required',
  validatorMaxLength: 'Maximum {0} characters',
  validatorMinLength: 'Minimum {0} characters',
  validatorMin: 'Minimum value is {0}',
  validatorMax: 'Maximum value is {0}',
  validatorUrl: 'Invalid URL',
  validatorPattern: 'Invalid format',
} as const;

const LABELS_FR: AlfInputI18nLabels = {
  clearAriaLabel: 'Effacer le champ',
  showPassword: 'Afficher le mot de passe',
  hidePassword: 'Masquer le mot de passe',
  loading: 'Chargement...',
  validatorEmail: 'Email invalide',
  validatorRequired: 'Ce champ est obligatoire',
  validatorMaxLength: 'Maximum {0} caractères',
  validatorMinLength: 'Minimum {0} caractères',
  validatorMin: 'La valeur minimale est {0}',
  validatorMax: 'La valeur maximale est {0}',
  validatorUrl: 'URL invalide',
  validatorPattern: 'Format invalide',
} as const;

const LABELS_DE: AlfInputI18nLabels = {
  clearAriaLabel: 'Feld leeren',
  showPassword: 'Passwort anzeigen',
  hidePassword: 'Passwort verbergen',
  loading: 'Laden...',
  validatorEmail: 'Ungültige E-Mail',
  validatorRequired: 'Dieses Feld ist obligatorisch',
  validatorMaxLength: 'Maximal {0} Zeichen',
  validatorMinLength: 'Mindestens {0} Zeichen',
  validatorMin: 'Mindestwert ist {0}',
  validatorMax: 'Höchstwert ist {0}',
  validatorUrl: 'Ungültige URL',
  validatorPattern: 'Ungültiges Format',
} as const;

const LABELS_IT: AlfInputI18nLabels = {
  clearAriaLabel: 'Cancella campo',
  showPassword: 'Mostra password',
  hidePassword: 'Nascondi password',
  loading: 'Caricamento...',
  validatorEmail: 'Email non valida',
  validatorRequired: 'Questo campo è obbligatorio',
  validatorMaxLength: 'Massimo {0} caratteri',
  validatorMinLength: 'Minimo {0} caratteri',
  validatorMin: 'Il valore minimo è {0}',
  validatorMax: 'Il valore massimo è {0}',
  validatorUrl: 'URL non valida',
  validatorPattern: 'Formato non valido',
} as const;

const LABELS_PT: AlfInputI18nLabels = {
  clearAriaLabel: 'Limpar campo',
  showPassword: 'Mostrar senha',
  hidePassword: 'Ocultar senha',
  loading: 'Carregando...',
  validatorEmail: 'E-mail inválido',
  validatorRequired: 'Este campo é obrigatório',
  validatorMaxLength: 'Máximo {0} caracteres',
  validatorMinLength: 'Mínimo {0} caracteres',
  validatorMin: 'O valor mínimo é {0}',
  validatorMax: 'O valor máximo é {0}',
  validatorUrl: 'URL inválida',
  validatorPattern: 'Formato inválido',
} as const;

const LABELS_RU: AlfInputI18nLabels = {
  clearAriaLabel: 'Очистить поле',
  showPassword: 'Показать пароль',
  hidePassword: 'Скрыть пароль',
  loading: 'Загрузка...',
  validatorEmail: 'Неверный email',
  validatorRequired: 'Это поле обязательно',
  validatorMaxLength: 'Максимум {0} символов',
  validatorMinLength: 'Минимум {0} символов',
  validatorMin: 'Минимальное значение {0}',
  validatorMax: 'Максимальное значение {0}',
  validatorUrl: 'Неверный URL',
  validatorPattern: 'Неверный формат',
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

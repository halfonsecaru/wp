import {
  SupportedLanguage,
  createLanguageMap,
  getLabelsForCurrentLanguage,
  getLabelsForLanguage
} from '@alfcomponents/i18n/i18n-utils';

export interface AlfRadioButtonI18nLabels {
  readonly selectOption: string;
  readonly yes: string;
  readonly no: string;
  readonly maybe: string;
  readonly other: string;
  readonly required: string;
  readonly optional: string;
}

const LABELS_ES: AlfRadioButtonI18nLabels = {
  selectOption: 'Seleccionar opción',
  yes: 'Sí',
  no: 'No',
  maybe: 'Tal vez',
  other: 'Otro',
  required: 'Obligatorio',
  optional: 'Opcional'
} as const;

const LABELS_EN: AlfRadioButtonI18nLabels = {
  selectOption: 'Select option',
  yes: 'Yes',
  no: 'No',
  maybe: 'Maybe',
  other: 'Other',
  required: 'Required',
  optional: 'Optional'
} as const;

const LABELS_FR: AlfRadioButtonI18nLabels = {
  selectOption: 'Sélectionner une option',
  yes: 'Oui',
  no: 'Non',
  maybe: 'Peut-être',
  other: 'Autre',
  required: 'Obligatoire',
  optional: 'Optionnel'
} as const;

const LABELS_DE: AlfRadioButtonI18nLabels = {
  selectOption: 'Option auswählen',
  yes: 'Ja',
  no: 'Nein',
  maybe: 'Vielleicht',
  other: 'Andere',
  required: 'Erforderlich',
  optional: 'Optional'
} as const;

const LABELS_IT: AlfRadioButtonI18nLabels = {
  selectOption: 'Seleziona opzione',
  yes: 'Sì',
  no: 'No',
  maybe: 'Forse',
  other: 'Altro',
  required: 'Obbligatorio',
  optional: 'Opzionale'
} as const;

const LABELS_PT: AlfRadioButtonI18nLabels = {
  selectOption: 'Selecionar opção',
  yes: 'Sim',
  no: 'Não',
  maybe: 'Talvez',
  other: 'Outro',
  required: 'Obrigatório',
  optional: 'Opcional'
} as const;

const LABELS_RU: AlfRadioButtonI18nLabels = {
  selectOption: 'Выберите вариант',
  yes: 'Да',
  no: 'Нет',
  maybe: 'Возможно',
  other: 'Другое',
  required: 'Обязательно',
  optional: 'Необязательно'
} as const;

const LANGUAGE_MAP = createLanguageMap<AlfRadioButtonI18nLabels>({
  es: LABELS_ES,
  en: LABELS_EN,
  fr: LABELS_FR,
  de: LABELS_DE,
  it: LABELS_IT,
  pt: LABELS_PT,
  ru: LABELS_RU
});

export const getAlfRadioButtonLabels = (lang?: SupportedLanguage): AlfRadioButtonI18nLabels => {
  if (lang) return getLabelsForLanguage(LANGUAGE_MAP, lang);
  return getLabelsForCurrentLanguage(LANGUAGE_MAP);
};

export const getAlfRadioButtonLabel = (key: keyof AlfRadioButtonI18nLabels, lang?: SupportedLanguage): string => {
  return getAlfRadioButtonLabels(lang)[key];
};

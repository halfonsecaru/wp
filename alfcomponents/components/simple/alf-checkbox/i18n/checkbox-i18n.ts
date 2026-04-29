import {
  SupportedLanguage,
  createLanguageMap,
  getLabelsForCurrentLanguage,
  getLabelsForLanguage
} from '@alfcomponents/i18n/i18n-utils';

export interface AlfCheckboxI18nLabels {
  readonly acceptTerms: string;
  readonly rememberMe: string;
  readonly selectAll: string;
  readonly subscribe: string;
  readonly notifications: string;
  readonly required: string;
  readonly optional: string;
  readonly agree: string;
  readonly active: string;
  readonly enabled: string;
  readonly visible: string;
  readonly public: string;
  readonly private: string;
}

const LABELS_ES: AlfCheckboxI18nLabels = {
  acceptTerms: 'Acepto los términos y condiciones',
  rememberMe: 'Recordarme',
  selectAll: 'Seleccionar todo',
  subscribe: 'Suscribirse al boletín',
  notifications: 'Recibir notificaciones',
  required: 'Obligatorio',
  optional: 'Opcional',
  agree: 'Estoy de acuerdo',
  active: 'Activo',
  enabled: 'Habilitado',
  visible: 'Visible',
  public: 'Público',
  private: 'Privado'
} as const;

const LABELS_EN: AlfCheckboxI18nLabels = {
  acceptTerms: 'I accept the terms and conditions',
  rememberMe: 'Remember me',
  selectAll: 'Select all',
  subscribe: 'Subscribe to newsletter',
  notifications: 'Receive notifications',
  required: 'Required',
  optional: 'Optional',
  agree: 'I agree',
  active: 'Active',
  enabled: 'Enabled',
  visible: 'Visible',
  public: 'Public',
  private: 'Private'
} as const;

const LABELS_FR: AlfCheckboxI18nLabels = {
  acceptTerms: 'J\'accepte les termes et conditions',
  rememberMe: 'Se souvenir de moi',
  selectAll: 'Tout sélectionner',
  subscribe: 'S\'abonner à la newsletter',
  notifications: 'Recevoir des notifications',
  required: 'Obligatoire',
  optional: 'Optionnel',
  agree: 'Je suis d\'accord',
  active: 'Actif',
  enabled: 'Activé',
  visible: 'Visible',
  public: 'Public',
  private: 'Privé'
} as const;

const LABELS_DE: AlfCheckboxI18nLabels = {
  acceptTerms: 'Ich akzeptiere die Geschäftsbedingungen',
  rememberMe: 'Angemeldet bleiben',
  selectAll: 'Alle auswählen',
  subscribe: 'Newsletter abonnieren',
  notifications: 'Benachrichtigungen erhalten',
  required: 'Erforderlich',
  optional: 'Optional',
  agree: 'Ich stimme zu',
  active: 'Aktiv',
  enabled: 'Aktiviert',
  visible: 'Sichtbar',
  public: 'Öffentlich',
  private: 'Privat'
} as const;

const LABELS_IT: AlfCheckboxI18nLabels = {
  acceptTerms: 'Accetto i termini e le condizioni',
  rememberMe: 'Ricordami',
  selectAll: 'Seleziona tutto',
  subscribe: 'Iscriviti alla newsletter',
  notifications: 'Ricevi notifiche',
  required: 'Obbligatorio',
  optional: 'Opzionale',
  agree: 'Sono d\'accordo',
  active: 'Attivo',
  enabled: 'Abilitato',
  visible: 'Visibile',
  public: 'Pubblico',
  private: 'Privato'
} as const;

const LABELS_PT: AlfCheckboxI18nLabels = {
  acceptTerms: 'Aceito os termos e condiciones',
  rememberMe: 'Lembrar-me',
  selectAll: 'Selecionar tudo',
  subscribe: 'Subscrever newsletter',
  notifications: 'Receber notificações',
  required: 'Obrigatório',
  optional: 'Opcional',
  agree: 'Concordo',
  active: 'Ativo',
  enabled: 'Ativado',
  visible: 'Visível',
  public: 'Público',
  private: 'Privado'
} as const;

const LABELS_RU: AlfCheckboxI18nLabels = {
  acceptTerms: 'Я принимаю условия',
  rememberMe: 'Запомнить меня',
  selectAll: 'Выбрать все',
  subscribe: 'Подписаться на рассылку',
  notifications: 'Получать уведомления',
  required: 'Обязательно',
  optional: 'Необязательно',
  agree: 'Я согласен',
  active: 'Активный',
  enabled: 'Включено',
  visible: 'Видимый',
  public: 'Публичный',
  private: 'Приватный'
} as const;

const LANGUAGE_MAP = createLanguageMap<AlfCheckboxI18nLabels>({
  es: LABELS_ES,
  en: LABELS_EN,
  fr: LABELS_FR,
  de: LABELS_DE,
  it: LABELS_IT,
  pt: LABELS_PT,
  ru: LABELS_RU
});

export const getAlfCheckboxLabels = (lang?: SupportedLanguage): AlfCheckboxI18nLabels => {
  if (lang) return getLabelsForLanguage(LANGUAGE_MAP, lang);
  return getLabelsForCurrentLanguage(LANGUAGE_MAP);
};

export const getAlfCheckboxLabel = (key: keyof AlfCheckboxI18nLabels, lang?: SupportedLanguage): string => {
  return getAlfCheckboxLabels(lang)[key];
};

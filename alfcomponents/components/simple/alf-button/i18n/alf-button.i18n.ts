import { createLanguageMap, getLabelsForCurrentLanguage, getLabelsForLanguage, SupportedLanguage } from "@alfcomponents/i18n/i18n-utils";


/**
 * Interface para las etiquetas del botón
 */
export interface AlfButtonI18nLabels {
  readonly accept: string;
  readonly cancel: string;
  readonly danger: string;
  readonly warning: string;
  readonly info: string;
  readonly light: string;
  readonly back: string;
  readonly example: string;
  readonly submit: string;
  readonly save: string;
  readonly delete: string;
  readonly edit: string;
  readonly close: string;
  readonly confirm: string;
  readonly loading: string;
}

const LABELS_ES: AlfButtonI18nLabels = {
  accept: 'Aceptar',
  cancel: 'Cancelar',
  danger: 'Peligro',
  warning: 'Advertencia',
  info: 'Información',
  light: 'Claro',
  back: 'Volver',
  example: 'Ejemplo',
  submit: 'Enviar',
  save: 'Guardar',
  delete: 'Eliminar',
  edit: 'Editar',
  close: 'Cerrar',
  confirm: 'Confirmar',
  loading: 'Cargando...'
} as const;

const LABELS_EN: AlfButtonI18nLabels = {
  accept: 'Accept',
  cancel: 'Cancel',
  danger: 'Danger',
  warning: 'Warning',
  info: 'Information',
  light: 'Light',
  back: 'Back',
  example: 'Example',
  submit: 'Submit',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  close: 'Close',
  confirm: 'Confirm',
  loading: 'Loading...'
} as const;

const LABELS_FR: AlfButtonI18nLabels = {
  accept: 'Accepter',
  cancel: 'Annuler',
  danger: 'Danger',
  warning: 'Avertissement',
  info: 'Information',
  light: 'Clair',
  back: 'Retour',
  example: 'Exemple',
  submit: 'Envoyer',
  save: 'Enregistrer',
  delete: 'Supprimer',
  edit: 'Modifier',
  close: 'Fermer',
  confirm: 'Confirmer',
  loading: 'Chargement...'
} as const;

const LABELS_DE: AlfButtonI18nLabels = {
  accept: 'Akzeptieren',
  cancel: 'Abbrechen',
  danger: 'Gefahr',
  warning: 'Warnung',
  info: 'Information',
  light: 'Hell',
  back: 'Zurück',
  example: 'Beispiel',
  submit: 'Absenden',
  save: 'Speichern',
  delete: 'Löschen',
  edit: 'Bearbeiten',
  close: 'Schließen',
  confirm: 'Bestätigen',
  loading: 'Laden...'
} as const;

const LABELS_IT: AlfButtonI18nLabels = {
  accept: 'Accettare',
  cancel: 'Annulla',
  danger: 'Pericolo',
  warning: 'Avviso',
  info: 'Informazione',
  light: 'Chiaro',
  back: 'Indietro',
  example: 'Esempio',
  submit: 'Inviare',
  save: 'Salvare',
  delete: 'Eliminare',
  edit: 'Modificare',
  close: 'Chiudere',
  confirm: 'Confermare',
  loading: 'Caricamento...'
} as const;

const LABELS_PT: AlfButtonI18nLabels = {
  accept: 'Aceitar',
  cancel: 'Cancelar',
  danger: 'Perigo',
  warning: 'Aviso',
  info: 'Informação',
  light: 'Claro',
  back: 'Voltar',
  example: 'Exemplo',
  submit: 'Enviar',
  save: 'Guardar',
  delete: 'Eliminar',
  edit: 'Editar',
  close: 'Fechar',
  confirm: 'Confirmar',
  loading: 'Carregando...'
} as const;

const LABELS_RU: AlfButtonI18nLabels = {
  accept: 'Принять',
  cancel: 'Отмена',
  danger: 'Опасно',
  warning: 'Предупреждение',
  info: 'Информация',
  light: 'Светлый',
  back: 'Назад',
  example: 'Пример',
  submit: 'Отправить',
  save: 'Сохранить',
  delete: 'Удалить',
  edit: 'Редактировать',
  close: 'Закрыть',
  confirm: 'Подтвердить',
  loading: 'Загрузка...'
} as const;

/**
 * Mapa de idiomas para AlfButton
 */
const LANGUAGE_MAP = createLanguageMap<AlfButtonI18nLabels>({
  es: LABELS_ES,
  en: LABELS_EN,
  fr: LABELS_FR,
  de: LABELS_DE,
  it: LABELS_IT,
  pt: LABELS_PT,
  ru: LABELS_RU
});

/**
 * Obtiene las etiquetas para el idioma configurado o detectado
 */
export const getAlfButtonLabels = (lang?: SupportedLanguage): AlfButtonI18nLabels => {
  if (lang) return getLabelsForLanguage(LANGUAGE_MAP, lang);
  return getLabelsForCurrentLanguage(LANGUAGE_MAP);
};

/**
 * Obtiene una etiqueta específica
 */
export const getAlfButtonLabel = (key: keyof AlfButtonI18nLabels, lang?: SupportedLanguage): string => {
  return getAlfButtonLabels(lang)[key];
};

/**
 * Sistema de internacionalización (i18n) para alf-button predefinidos
 * Detecta automáticamente el idioma del navegador y proporciona labels localizados
 */

import {
  SupportedLanguage,
  createLanguageMap,
  getLabelsForCurrentLanguage,
  getLabelsForLanguage
} from '../../../../shared/i18n/i18n-utils';

export interface ButtonI18nLabels {
  accept: string;
  cancel: string;
  warning: string;
  info: string;
  back: string;
  example: string;
  submit: string;
  save: string;
  delete: string;
  edit: string;
  close: string;
  confirm: string;
  loading: string;
}

const LABELS_ES: ButtonI18nLabels = {
  accept: 'Aceptar',
  cancel: 'Cancelar',
  warning: 'Advertencia',
  info: 'Información',
  back: 'Volver',
  example: 'Ejemplo',
  submit: 'Enviar',
  save: 'Guardar',
  delete: 'Eliminar',
  edit: 'Editar',
  close: 'Cerrar',
  confirm: 'Confirmar',
  loading: 'Cargando...'
};

const LABELS_EN: ButtonI18nLabels = {
  accept: 'Accept',
  cancel: 'Cancel',
  warning: 'Warning',
  info: 'Information',
  back: 'Back',
  example: 'Example',
  submit: 'Submit',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  close: 'Close',
  confirm: 'Confirm',
  loading: 'Loading...'
};

const LABELS_FR: ButtonI18nLabels = {
  accept: 'Accepter',
  cancel: 'Annuler',
  warning: 'Avertissement',
  info: 'Information',
  back: 'Retour',
  example: 'Exemple',
  submit: 'Envoyer',
  save: 'Enregistrer',
  delete: 'Supprimer',
  edit: 'Modifier',
  close: 'Fermer',
  confirm: 'Confirmer',
  loading: 'Chargement...'
};

const LABELS_DE: ButtonI18nLabels = {
  accept: 'Akzeptieren',
  cancel: 'Abbrechen',
  warning: 'Warnung',
  info: 'Information',
  back: 'Zurück',
  example: 'Beispiel',
  submit: 'Absenden',
  save: 'Speichern',
  delete: 'Löschen',
  edit: 'Bearbeiten',
  close: 'Schließen',
  confirm: 'Bestätigen',
  loading: 'Laden...'
};

const LABELS_IT: ButtonI18nLabels = {
  accept: 'Accettare',
  cancel: 'Annulla',
  warning: 'Avviso',
  info: 'Informazione',
  back: 'Indietro',
  example: 'Esempio',
  submit: 'Inviare',
  save: 'Salvare',
  delete: 'Eliminare',
  edit: 'Modificare',
  close: 'Chiudere',
  confirm: 'Confermare',
  loading: 'Caricamento...'
};

const LABELS_PT: ButtonI18nLabels = {
  accept: 'Aceitar',
  cancel: 'Cancelar',
  warning: 'Aviso',
  info: 'Informação',
  back: 'Voltar',
  example: 'Exemplo',
  submit: 'Enviar',
  save: 'Guardar',
  delete: 'Eliminar',
  edit: 'Editar',
  close: 'Fechar',
  confirm: 'Confirmar',
  loading: 'Carregando...'
};

const LABELS_RU: ButtonI18nLabels = {
  accept: 'Принять',
  cancel: 'Отмена',
  warning: 'Предупреждение',
  info: 'Информация',
  back: 'Назад',
  example: 'Пример',
  submit: 'Отправить',
  save: 'Сохранить',
  delete: 'Удалить',
  edit: 'Редактировать',
  close: 'Закрыть',
  confirm: 'Подтвердить',
  loading: 'Загрузка...'
};

/**
 * Mapa de idiomas soportados (DRY - usando utilidad centralizada)
 */
const LANGUAGE_MAP = createLanguageMap<ButtonI18nLabels>({
  es: LABELS_ES,
  en: LABELS_EN,
  fr: LABELS_FR,
  de: LABELS_DE,
  it: LABELS_IT,
  pt: LABELS_PT,
  ru: LABELS_RU
});

/**
 * Obtiene las traducciones para el idioma actual del navegador
 */
export const getButtonLabels = (lang?: SupportedLanguage): ButtonI18nLabels => {
  if (lang) {
    return getLabelsForLanguage(LANGUAGE_MAP, lang);
  }
  return getLabelsForCurrentLanguage(LANGUAGE_MAP);
};

/**
 * Obtiene el label para un tipo de botón específico
 * @param buttonType - Tipo de botón ('accept', 'cancel', etc.)
 * @param lang - Idioma opcional (auto-detecta si no se proporciona)
 */
export const getButtonLabel = (
  buttonType: keyof ButtonI18nLabels,
  lang?: SupportedLanguage
): string => {
  const labels = getButtonLabels(lang);
  return labels[buttonType] || buttonType;
};

/** Idioma actual para los botones (caché) */
let currentLanguage: SupportedLanguage | null = null;

/**
 * Obtiene el idioma actual (detectado o establecido manualmente)
 */
export const getCurrentButtonLanguage = (): SupportedLanguage => {
  if (!currentLanguage) {
    currentLanguage = 'es'; // Default
  }
  return currentLanguage;
};

/**
 * Establece el idioma para los botones
 * @param lang - Idioma a usar
 */
export const setButtonLanguage = (lang: SupportedLanguage): void => {
  currentLanguage = lang;
};

// Re-exportar para compatibilidad con código existente
export type { SupportedLanguage } from '../../../../shared/i18n/i18n-utils';
export { detectBrowserLanguage } from '../../../../shared/i18n/i18n-utils';

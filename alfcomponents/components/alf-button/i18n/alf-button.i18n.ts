import { 
  SupportedLanguage, 
  createLanguageMap, 
  getLabelsForCurrentLanguage, 
  getLabelsForLanguage 
} from '../../../../libs/shared/helpers/i18n.helper';

/**
 * Interface para las etiquetas del botón
 */
export interface AlfButtonI18nLabels {
  readonly accept: string;
  readonly cancel: string;
  readonly back: string;
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
  back: 'Volver',
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
  back: 'Back',
  submit: 'Submit',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  close: 'Close',
  confirm: 'Confirm',
  loading: 'Loading...'
} as const;

/**
 * Mapa de idiomas para AlfButton
 */
const LANGUAGE_MAP = createLanguageMap<AlfButtonI18nLabels>({
  es: LABELS_ES,
  en: LABELS_EN,
  // Los demás idiomas heredarán del español por defecto según createLanguageMap
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

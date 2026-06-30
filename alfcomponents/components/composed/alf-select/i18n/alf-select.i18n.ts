import { createLanguageMap, getLabelsForCurrentLanguage, getLabelsForLanguage, SupportedLanguage } from "@alfcomponents/i18n/i18n-utils";

/**
 * Textos del componente AlfSelect en diferentes idiomas
 */
export interface SelectLabels {
  noOptions: string;
  search: string;
  clearSelection: string;
  selectAll: string;
  deselectAll: string;
  selected: string;
  loading: string;
  done: string;
}

const LABELS_ES: SelectLabels = {
  noOptions: 'No hay opciones disponibles',
  search: 'Buscar...',
  clearSelection: 'Limpiar selección',
  selectAll: 'Seleccionar todo',
  deselectAll: 'Deseleccionar todo',
  selected: 'seleccionado(s)',
  loading: 'Cargando...',
  done: 'Listo'
};

const LABELS_EN: SelectLabels = {
  noOptions: 'No options available',
  search: 'Search...',
  clearSelection: 'Clear selection',
  selectAll: 'Select all',
  deselectAll: 'Deselect all',
  selected: 'selected',
  loading: 'Loading...',
  done: 'Done'
};

const LABELS_FR: SelectLabels = {
  noOptions: 'Aucune option disponible',
  search: 'Rechercher...',
  clearSelection: 'Effacer la sélection',
  selectAll: 'Tout sélectionner',
  deselectAll: 'Tout désélectionner',
  selected: 'sélectionné(s)',
  loading: 'Chargement...',
  done: 'Terminé'
};

const LABELS_DE: SelectLabels = {
  noOptions: 'Keine Optionen verfügbar',
  search: 'Suchen...',
  clearSelection: 'Auswahl löschen',
  selectAll: 'Alle auswählen',
  deselectAll: 'Alle abwählen',
  selected: 'ausgewählt',
  loading: 'Laden...',
  done: 'Fertig'
};

const LABELS_IT: SelectLabels = {
  noOptions: 'Nessuna opzione disponibile',
  search: 'Cerca...',
  clearSelection: 'Cancella selezione',
  selectAll: 'Seleziona tutto',
  deselectAll: 'Deseleziona tutto',
  selected: 'selezionato/i',
  loading: 'Caricamento...',
  done: 'Fatto'
};

const LABELS_PT: SelectLabels = {
  noOptions: 'Nenhuma opção disponível',
  search: 'Pesquisar...',
  clearSelection: 'Limpar seleção',
  selectAll: 'Selecionar tudo',
  deselectAll: 'Desselecionar tudo',
  selected: 'selecionado(s)',
  loading: 'Carregando...',
  done: 'Concluído'
};

const LABELS_RU: SelectLabels = {
  noOptions: 'Нет доступных опций',
  search: 'Поиск...',
  clearSelection: 'Очистить выбор',
  selectAll: 'Выбрать все',
  deselectAll: 'Снять выбор',
  selected: 'выбрано',
  loading: 'Загрузка...',
  done: 'Готово'
};

/**
 * Mapa de idiomas soportados (DRY - usando utilidad centralizada)
 */
const LANGUAGE_MAP = createLanguageMap<SelectLabels>({
  es: LABELS_ES,
  en: LABELS_EN,
  fr: LABELS_FR,
  de: LABELS_DE,
  it: LABELS_IT,
  pt: LABELS_PT,
  ru: LABELS_RU
});

/**
 * Detecta el idioma del navegador y devuelve las etiquetas correspondientes
 * @returns Etiquetas en el idioma del navegador o español por defecto
 */
export const getSelectLabels = (): SelectLabels => {
  return getLabelsForCurrentLanguage(LANGUAGE_MAP);
};

/**
 * Obtener etiquetas en un idioma específico
 * @param lang Código de idioma
 * @returns Etiquetas en el idioma especificado
 */
export const getSelectLabelsByLang = (lang: SupportedLanguage): SelectLabels => {
  return getLabelsForLanguage(LANGUAGE_MAP, lang);
};

import { createLanguageMap, getLabelsForCurrentLanguage, getLabelsForLanguage, SupportedLanguage } from "@alfcomponents/i18n/i18n-utils";

/**
 * Interface para las etiquetas del paginador
 */
export interface AlfPaginatorI18nLabels {
  readonly itemsPerPageLabel: string;
  readonly nextPageLabel: string;
  readonly previousPageLabel: string;
  readonly firstPageLabel: string;
  readonly lastPageLabel: string;
  readonly getRangeLabel: (page: number, pageSize: number, length: number) => string;
}

// Lógica compartida para calcular el rango en todos los idiomas
const defaultGetRangeLabel = (page: number, pageSize: number, length: number, separator: string = 'de'): string => {
  if (length === 0 || pageSize === 0) {
    return `0 ${separator} ${length}`;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} ${separator} ${length}`;
};

const LABELS_ES: AlfPaginatorI18nLabels = {
  itemsPerPageLabel: 'Ítems por página:',
  nextPageLabel: 'Siguiente página',
  previousPageLabel: 'Página anterior',
  firstPageLabel: 'Primera página',
  lastPageLabel: 'Última página',
  getRangeLabel: (page, pageSize, length) => defaultGetRangeLabel(page, pageSize, length, 'de')
} as const;

const LABELS_EN: AlfPaginatorI18nLabels = {
  itemsPerPageLabel: 'Items per page:',
  nextPageLabel: 'Next page',
  previousPageLabel: 'Previous page',
  firstPageLabel: 'First page',
  lastPageLabel: 'Last page',
  getRangeLabel: (page, pageSize, length) => defaultGetRangeLabel(page, pageSize, length, 'of')
} as const;

const LABELS_FR: AlfPaginatorI18nLabels = {
  itemsPerPageLabel: 'Éléments par page:',
  nextPageLabel: 'Page suivante',
  previousPageLabel: 'Page précédente',
  firstPageLabel: 'Première page',
  lastPageLabel: 'Dernière page',
  getRangeLabel: (page, pageSize, length) => defaultGetRangeLabel(page, pageSize, length, 'sur')
} as const;

const LABELS_DE: AlfPaginatorI18nLabels = {
  itemsPerPageLabel: 'Elemente pro Seite:',
  nextPageLabel: 'Nächste Seite',
  previousPageLabel: 'Vorherige Seite',
  firstPageLabel: 'Erste Seite',
  lastPageLabel: 'Letzte Seite',
  getRangeLabel: (page, pageSize, length) => defaultGetRangeLabel(page, pageSize, length, 'von')
} as const;

const LABELS_IT: AlfPaginatorI18nLabels = {
  itemsPerPageLabel: 'Elementi per pagina:',
  nextPageLabel: 'Pagina successiva',
  previousPageLabel: 'Pagina precedente',
  firstPageLabel: 'Prima pagina',
  lastPageLabel: 'Ultima pagina',
  getRangeLabel: (page, pageSize, length) => defaultGetRangeLabel(page, pageSize, length, 'di')
} as const;

const LABELS_PT: AlfPaginatorI18nLabels = {
  itemsPerPageLabel: 'Itens por página:',
  nextPageLabel: 'Próxima página',
  previousPageLabel: 'Página anterior',
  firstPageLabel: 'Primeira página',
  lastPageLabel: 'Última página',
  getRangeLabel: (page, pageSize, length) => defaultGetRangeLabel(page, pageSize, length, 'de')
} as const;

const LABELS_RU: AlfPaginatorI18nLabels = {
  itemsPerPageLabel: 'Элементов на странице:',
  nextPageLabel: 'Следующая страница',
  previousPageLabel: 'Предыдущая страница',
  firstPageLabel: 'Первая страница',
  lastPageLabel: 'Последняя страница',
  getRangeLabel: (page, pageSize, length) => defaultGetRangeLabel(page, pageSize, length, 'из')
} as const;

/**
 * Mapa de idiomas para AlfPaginator
 */
const LANGUAGE_MAP = createLanguageMap<AlfPaginatorI18nLabels>({
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
export const getAlfPaginatorLabels = (lang?: SupportedLanguage): AlfPaginatorI18nLabels => {
  if (lang) return getLabelsForLanguage(LANGUAGE_MAP, lang);
  return getLabelsForCurrentLanguage(LANGUAGE_MAP);
};

/**
 * Obtiene una etiqueta específica
 */
export const getAlfPaginatorLabel = (key: keyof AlfPaginatorI18nLabels, lang?: SupportedLanguage): any => {
  return getAlfPaginatorLabels(lang)[key];
};

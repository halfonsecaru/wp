/**
 * Idiomas soportados en la librería
 */
export type SupportedLanguage = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ru';

/**
 * Mapa centralizado de códigos de idioma
 * DRY: Un solo lugar para definir los idiomas soportados
 */
export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский'
};

/**
 * Detecta el idioma del navegador y devuelve el código de idioma soportado
 * @returns Código de idioma ('es', 'en', 'fr', etc.) o 'es' por defecto
 */
export const detectBrowserLanguage = (): SupportedLanguage => {
  if (typeof navigator === 'undefined') {
    return 'es'; // Default para SSR
  }

  const lang = navigator.language?.toLowerCase() || 'es';

  // Intentar match exacto (ej: 'es-ES')
  if (lang in SUPPORTED_LANGUAGES) {
    return lang as SupportedLanguage;
  }

  // Intentar match por código de idioma (ej: 'es' de 'es-MX')
  const langCode = lang.split('-')[0];
  if (langCode in SUPPORTED_LANGUAGES) {
    return langCode as SupportedLanguage;
  }

  return 'es'; // Default español
};

/**
 * Crea un mapa de idiomas a partir de las traducciones
 * Utilidad genérica para crear LANGUAGE_MAP en cada componente
 * 
 * @example
 * ```typescript
 * const LABELS_ES = { save: 'Guardar', cancel: 'Cancelar' };
 * const LABELS_EN = { save: 'Save', cancel: 'Cancel' };
 * 
 * const LANGUAGE_MAP = createLanguageMap({
 *   es: LABELS_ES,
 *   en: LABELS_EN
 * });
 * ```
 */
export const createLanguageMap = <T>(translations: Partial<Record<SupportedLanguage, T>>): Record<SupportedLanguage, T> => {
  const defaultTranslation = translations.es || translations.en || Object.values(translations)[0];

  if (!defaultTranslation) {
    throw new Error('At least one translation must be provided');
  }

  // Crear mapa completo con fallback al español
  const map = {} as Record<SupportedLanguage, T>;

  for (const lang of Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[]) {
    map[lang] = translations[lang] || defaultTranslation;
  }

  return map;
};

/**
 * Obtiene las traducciones para el idioma actual del navegador
 * Utilidad genérica para obtener labels en componentes
 * 
 * @param languageMap Mapa de idiomas a traducciones
 * @returns Traducciones en el idioma del navegador
 * 
 * @example
 * ```typescript
 * const labels = getLabelsForCurrentLanguage(LANGUAGE_MAP);
 * ```
 */
export const getLabelsForCurrentLanguage = <T>(languageMap: Record<SupportedLanguage, T>): T => {
  const currentLang = detectBrowserLanguage();
  return languageMap[currentLang];
};

/**
 * Obtiene las traducciones para un idioma específico
 * 
 * @param languageMap Mapa de idiomas a traducciones
 * @param lang Código de idioma
 * @returns Traducciones en el idioma especificado
 * 
 * @example
 * ```typescript
 * const labels = getLabelsForLanguage(LANGUAGE_MAP, 'fr');
 * ```
 */
export const getLabelsForLanguage = <T>(
  languageMap: Record<SupportedLanguage, T>,
  lang: SupportedLanguage
): T => {
  return languageMap[lang] || languageMap.es;
};

/**
 * Interpola valores en una cadena con formato {0}, {1}, etc.
 * 
 * @param text Cadena con placeholders
 * @param params Valores a insertar
 * @returns Cadena interpolada
 */
export const interpolate = (text: string, ...params: any[]): string => {
  return text.replace(/{(\d+)}/g, (match, number) => {
    return typeof params[number] !== 'undefined' ? params[number] : match;
  });
};

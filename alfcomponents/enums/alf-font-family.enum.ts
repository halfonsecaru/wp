/**
 * Enum para familias de fuentes de la librería
 * Agrupa fuentes modernas para UI, tipografías del sistema y genéricas.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * font: AlfFontFamilyEnum.Inter // Aplica la fuente moderna Inter
 * ```
 */
export enum AlfFontFamilyEnum {
  // Modern UI Fonts (Popular for Design)
  Inter = '"Inter", sans-serif',
  Montserrat = '"Montserrat", sans-serif',
  Poppins = '"Poppins", sans-serif',
  Ubuntu = '"Ubuntu", sans-serif',
  Lato = '"Lato", sans-serif',
  Roboto = '"Roboto", sans-serif',
  OpenSans = '"Open Sans", sans-serif',

  // Fuentes del sistema
  System = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  
  // Sans-serif
  Arial = 'Arial, sans-serif',
  Helvetica = 'Helvetica, Arial, sans-serif',
  Verdana = 'Verdana, Geneva, sans-serif',
  Tahoma = 'Tahoma, Geneva, sans-serif',
  
  // Serif
  TimesNewRoman = '"Times New Roman", Times, serif',
  Georgia = 'Georgia, serif',
  Garamond = 'Garamond, serif',
  
  // Monospace
  Monospace = '"Fira Code", Consolas, Monaco, "Courier New", monospace',
  CourierNew = '"Courier New", Courier, monospace',
  Consolas = 'Consolas, Monaco, monospace',
  
  // Genéricas
  SansSerif = 'sans-serif',
  Serif = 'serif',
  MonospaceGeneric = 'monospace',
  Cursive = 'cursive',
  Fantasy = 'fantasy',
}

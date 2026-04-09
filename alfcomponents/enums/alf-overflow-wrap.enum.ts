/**
 * Enum para la propiedad CSS overflow-wrap
 * Define si el navegador puede romper líneas dentro de palabras para evitar overflow.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * wrap: AlfOverflowWrapEnum.BreakWord // Rompe palabras largas si no caben
 * ```
 */
export enum AlfOverflowWrapEnum {
  Normal = 'normal',
  BreakWord = 'break-word',
  Anywhere = 'anywhere',
}

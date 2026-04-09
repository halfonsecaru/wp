/**
 * Enum para la propiedad CSS word-break
 * Define las reglas de ruptura de palabras al final de línea.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * breakRule: AlfWordBreakEnum.BreakAll // Permite romper cualquier palabra
 * ```
 */
export enum AlfWordBreakEnum {
  Normal = 'normal',
  BreakAll = 'break-all',
  KeepAll = 'keep-all',
  BreakWord = 'break-word',
}

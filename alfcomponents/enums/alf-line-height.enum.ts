/**
 * Enum para altura de línea (Line Height)
 * Gestiona el espacio vertical entre líneas de texto.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * height: AlfLineHeightEnum.Relaxed // Altura de línea cómoda para lectura
 * ```
 */
export enum AlfLineHeightEnum {
  None = '1',
  Tight = '1.25',
  Snug = '1.375',
  Normal = '1.5',
  Relaxed = '1.625',
  Loose = '2',
}

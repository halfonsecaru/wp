/**
 * Enum para la posición de etiquetas (Labels)
 * Define si el texto aparece antes o después del control (Checkbox, Radio, etc.).
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * labelPosition: AlfLabelsPositionEnum.Before // Texto a la izquierda del control
 * ```
 */
export enum AlfLabelsPositionEnum {
  Before = 'before',
  After = 'after',
}

/**
 * Enum para espaciado de letras (Letter Spacing)
 * Define la distancia entre caracteres para ajustar la legibilidad.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * spacing: AlfLetterSpacingEnum.Wide // Espaciado amplio para títulos
 * ```
 */
export enum AlfLetterSpacingEnum {
  Tighter = '-0.05em',
  Tight = '-0.025em',
  Normal = '0',
  Wide = '0.025em',
  Wider = '0.05em',
  Widest = '0.1em',
}

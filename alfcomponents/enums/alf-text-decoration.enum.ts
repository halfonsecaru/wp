/**
 * Enum para la decoración de texto
 * Controla líneas decorativas (subrayado, tachado) sobre el texto.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * decoration: AlfTextDecorationEnum.Underline // Subraya el texto
 * ```
 */
export enum AlfTextDecorationEnum {
  None = 'none',
  Underline = 'underline',
  Overline = 'overline',
  LineThrough = 'line-through',
  UnderlineOverline = 'underline overline',
}

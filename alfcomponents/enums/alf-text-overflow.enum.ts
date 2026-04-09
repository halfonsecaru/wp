/**
 * Enum para el comportamiento del desbordamiento de texto
 * Define cómo se visualiza el texto cuando supera el contenedor.
 * 
 * @example
 * ```typescript
 * textOverflow: AlfTextOverflowEnum.Ellipsis // Añade "..." al final
 * ```
 */
export enum AlfTextOverflowEnum {
  Clip = 'clip',
  Ellipsis = 'ellipsis',
}

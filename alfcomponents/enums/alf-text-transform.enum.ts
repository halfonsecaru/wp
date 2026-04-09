/**
 * Enum para la transformación de texto
 * Controla la capitalización dinámica del contenido de texto.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * transform: AlfTextTransformEnum.Uppercase // Convierte todo a MAYÚSCULAS
 * ```
 */
export enum AlfTextTransformEnum {
  None = 'none',
  Capitalize = 'capitalize',
  Uppercase = 'uppercase',
  Lowercase = 'lowercase',
}

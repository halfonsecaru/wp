/**
 * Enum para la propiedad CSS resize
 * Controla si el usuario puede redimensionar manualmente un elemento (ej. textarea).
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * resize: AlfResizeEnum.Vertical // Permite redimensionar solo en altura
 * ```
 */
export enum AlfResizeEnum {
  None = 'none',
  Both = 'both',
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Block = 'block',
  Inline = 'inline',
}

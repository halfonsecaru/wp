/**
 * Enum para posicionamiento CSS (Layout)
 * Determina cómo se ubica un elemento en el flujo del documento.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * position: AlfCssPositionEnum.Sticky // El elemento se queda pegado al hacer scroll
 * ```
 */
export enum AlfCssPositionEnum {
  Static = 'static',
  Relative = 'relative',
  Absolute = 'absolute',
  Fixed = 'fixed',
  Sticky = 'sticky',
}

/**
 * Enum para la propiedad CSS overflow
 * Controla cómo se maneja el contenido que excede el tamaño del contenedor.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * overflow: AlfOverflowEnum.Auto // Muestra barras de scroll solo si es necesario
 * ```
 */
export enum AlfOverflowEnum {
  Visible = 'visible',
  Hidden = 'hidden',
  Scroll = 'scroll',
  Auto = 'auto',
  Clip = 'clip',
}

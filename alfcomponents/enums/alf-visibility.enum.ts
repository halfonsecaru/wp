/**
 * Enum para la propiedad CSS visibility
 * Alterna entre ocultar un elemento manteniendo su espacio o mostrarlo.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * visibility: AlfVisibilityEnum.Hidden // Oculta el elemento pero mantiene su hueco
 * ```
 */
export enum AlfVisibilityEnum {
  Visible = 'visible',
  Hidden = 'hidden',
  Collapse = 'collapse',
}

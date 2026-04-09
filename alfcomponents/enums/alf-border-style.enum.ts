/**
 * Enum para estilos de borde CSS
 * Define el trazado de los bordes (Sólido, Discontinuo, etc.).
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * style: AlfBorderStyleEnum.Dashed // Bordes de línea discontinua
 * ```
 */
export enum AlfBorderStyleEnum {
  None = 'none',
  Hidden = 'hidden',
  Solid = 'solid',
  Dashed = 'dashed',
  Dotted = 'dotted',
  Double = 'double',
  Groove = 'groove',
  Ridge = 'ridge',
  Inset = 'inset',
  Outset = 'outset',
}

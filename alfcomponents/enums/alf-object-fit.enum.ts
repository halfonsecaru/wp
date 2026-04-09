/**
 * Enum para la propiedad CSS object-fit
 * Controla cómo el contenido de un elemento reemplazado (img, video) se adapta a su caja.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * fit: AlfObjectFitEnum.Cover // La imagen cubre todo el contenedor sin deformarse
 * ```
 */
export enum AlfObjectFitEnum {
  Fill = 'fill',
  Contain = 'contain',
  Cover = 'cover',
  None = 'none',
  ScaleDown = 'scale-down',
}

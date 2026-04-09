/**
 * Enum para tamaño de fondos CSS
 * Gestiona cómo se escala la imagen de fondo dentro del contenedor.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * size: AlfBackgroundSizeEnum.Cover // La imagen cubre el 100% del espacio
 * ```
 */
export enum AlfBackgroundSizeEnum {
  Auto = 'auto',
  Cover = 'cover',
  Contain = 'contain',
  Inherit = 'inherit',
  Initial = 'initial',
  Unset = 'unset'
}

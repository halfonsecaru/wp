/**
 * Enum para recorte de fondos CSS (Box Model)
 * Define el área donde se pinta el fondo (borde, padding o texto).
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * clip: AlfBackgroundClipEnum.Text // El fondo se recorta con la silueta del texto
 * ```
 */
export enum AlfBackgroundClipEnum {
  BorderBox = 'border-box',
  PaddingBox = 'padding-box',
  ContentBox = 'content-box',
  Text = 'text',
}

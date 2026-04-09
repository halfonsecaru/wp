/**
 * Enum para la propiedad CSS mix-blend-mode
 * Define cómo se mezclan los colores de un elemento con el contenido de su fondo.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * blend: AlfMixBlendModeEnum.Multiply // Oscurece el color mezclándolo con el fondo
 * ```
 */
export enum AlfMixBlendModeEnum {
  Normal = 'normal',
  Multiply = 'multiply',
  Screen = 'screen',
  Overlay = 'overlay',
  Darken = 'darken',
  Lighten = 'lighten',
  ColorDodge = 'color-dodge',
  ColorBurn = 'color-burn',
  HardLight = 'hard-light',
  SoftLight = 'soft-light',
  Difference = 'difference',
  Exclusion = 'exclusion',
  Hue = 'hue',
  Saturation = 'saturation',
  Color = 'color',
  Luminosity = 'luminosity',
}

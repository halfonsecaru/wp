/**
 * Enum para repetición de fondos CSS
 * Controla cómo se repite una imagen de fondo en un contenedor.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * repeat: AlfBackgroundRepeatEnum.NoRepeat // La imagen no se repite
 * ```
 */
export enum AlfBackgroundRepeatEnum {
  Repeat = 'repeat',
  RepeatX = 'repeat-x',
  RepeatY = 'repeat-y',
  NoRepeat = 'no-repeat',
  Space = 'space',
  Round = 'round',
}

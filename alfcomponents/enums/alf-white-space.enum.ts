/**
 * Enum para la propiedad CSS white-space
 * Controla cómo se procesan los espacios en blanco y los saltos de línea.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * whiteSpace: AlfWhiteSpaceEnum.Nowrap // Todo el texto en una sola línea
 * ```
 */
export enum AlfWhiteSpaceEnum {
  Normal = 'normal',
  Nowrap = 'nowrap',
  Pre = 'pre',
  PreLine = 'pre-line',
  PreWrap = 'pre-wrap',
  BreakSpaces = 'break-spaces',
}

/**
 * Enum para la propiedad CSS pointer-events
 * Define bajo qué circunstancias un elemento puede ser objetivo de eventos del ratón.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * events: AlfPointerEventsEnum.None // El elemento ignora clicks y hovers
 * ```
 */
export enum AlfPointerEventsEnum {
  Auto = 'auto',
  None = 'none',
  VisiblePainted = 'visiblePainted',
  VisibleFill = 'visibleFill',
  VisibleStroke = 'visibleStroke',
  Visible = 'visible',
  Painted = 'painted',
  Fill = 'fill',
  Stroke = 'stroke',
  All = 'all',
}

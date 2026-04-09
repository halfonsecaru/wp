/**
 * Enum para dirección de flujo en Flexbox
 * Define el eje principal por donde se distribuyen los elementos.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * direction: AlfFlexDirectionEnum.Column // Apila elementos verticalmente
 * ```
 */
export enum AlfFlexDirectionEnum {
  Row = 'row',
  RowReverse = 'row-reverse',
  Column = 'column',
  ColumnReverse = 'column-reverse',
}

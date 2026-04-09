/**
 * Enum para la alineación en el eje principal (X en row, Y en column)
 */
export enum AlfJustifyContentEnum {
  Start = 'flex-start',
  End = 'flex-end',
  Center = 'center',
  Between = 'space-between',
  Around = 'space-around',
  Evenly = 'space-evenly',
}

/**
 * Enum para la alineación en el eje secundario (Y en row, X en column)
 */
export enum AlfAlignItemsEnum {
  Stretch = 'stretch',
  Start = 'flex-start',
  End = 'flex-end',
  Center = 'center',
  Baseline = 'baseline',
}

/**
 * Enum para el control del salto de línea en Flexbox
 */
export enum AlfFlexWrapEnum {
  NoWrap = 'nowrap',
  Wrap = 'wrap',
  WrapReverse = 'wrap-reverse',
}

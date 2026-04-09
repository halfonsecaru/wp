/**
 * Enum para niveles de profundidad Z-Index
 * Provee una escala consistente para capas superpuestas.
 */
export enum AlfZIndexEnum {
  Auto = 'auto',
  Behind = '-1',
  Base = '0',
  Default = '1',
  Above = '10',
  Dropdown = '100',
  Sticky = '200',
  Overlay = '300',
  Modal = '400',
  Popover = '500',
  Tooltip = '600',
  Toast = '700',
  Max = '9999',
}

/**
 * Enum para tipos de cursor CSS
 * Controla la apariencia visual del puntero del ratón en interacciones.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * cursor: AlfCursorEnum.Pointer // Convierte el cursor en la mano de enlace
 * ```
 */
export enum AlfCursorEnum {
  Auto = 'auto',
  Default = 'default',
  Pointer = 'pointer',
  Wait = 'wait',
  Text = 'text',
  Move = 'move',
  NotAllowed = 'not-allowed',
  Help = 'help',
  None = 'none',
  ContextMenu = 'context-menu',
  Progress = 'progress',
  Cell = 'cell',
  Crosshair = 'crosshair',
  VerticalText = 'vertical-text',
  Alias = 'alias',
  Copy = 'copy',
  NoDrop = 'no-drop',
  Grab = 'grab',
  Grabbing = 'grabbing',
  AllScroll = 'all-scroll',
  ColResize = 'col-resize',
  RowResize = 'row-resize',
  NResize = 'n-resize',
  EResize = 'e-resize',
  SResize = 's-resize',
  WResize = 'w-resize',
  NeResize = 'ne-resize',
  NwResize = 'nw-resize',
  SeResize = 'se-resize',
  SwResize = 'sw-resize',
  EwResize = 'ew-resize',
  NsResize = 'ns-resize',
  NeswResize = 'nesw-resize',
  NwseResize = 'nwse-resize',
  ZoomIn = 'zoom-in',
  ZoomOut = 'zoom-out',
}

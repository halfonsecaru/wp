/**
 * Enum para modelos de visualización CSS
 * Gestiona el comportamiento de cajas (Bloque, Flex, Grid, etc.).
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * display: AlfDisplayEnum.Grid // Organiza los hijos en una cuadrícula
 * ```
 */
export enum AlfDisplayEnum {
  Block = 'block',
  Inline = 'inline',
  InlineBlock = 'inline-block',
  Flex = 'flex',
  InlineFlex = 'inline-flex',
  Grid = 'grid',
  InlineGrid = 'inline-grid',
  None = 'none',
  Contents = 'contents',
  FlowRoot = 'flow-root',
  Table = 'table',
  TableRow = 'table-row',
  TableCell = 'table-cell',
}

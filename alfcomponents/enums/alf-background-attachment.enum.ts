/**
 * Enum para fijación de fondos CSS
 * Define si el fondo se desplaza con el scroll o permanece fijo.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * attach: AlfBackgroundAttachmentEnum.Fixed // Efecto de fondo estático
 * ```
 */
export enum AlfBackgroundAttachmentEnum {
  Scroll = 'scroll',
  Fixed = 'fixed',
  Local = 'local',
}

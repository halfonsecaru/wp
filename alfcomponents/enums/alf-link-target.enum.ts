/**
 * Enum para el atributo 'target' de enlaces HTML
 * Define en qué ventana o contexto se abrirá el recurso vinculado.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * target: AlfLinkTargetEnum.Blank // Abre el enlace en una pestaña nueva
 * ```
 */
export enum AlfLinkTargetEnum {
  /** Abre el enlace en la misma ventana/pestaña (comportamiento por defecto) */
  Self = '_self',

  /** Abre el enlace en una nueva ventana o pestaña */
  Blank = '_blank',

  /** Abre el enlace en el frame padre */
  Parent = '_parent',

  /** Abre el enlace en la ventana completa (rompe frames) */
  Top = '_top',
}

/**
 * Enum para sombras (Box Shadow)
 * Provee diferentes niveles de profundidad según el sistema de diseño.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * shadow: AlfShadowEnum.Lg // Aplica una sombra suave y amplia para elevación
 * ```
 */
export enum AlfShadowEnum {
  None = 'none',
  Sm = '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  Base = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  Md = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  Lg = '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  Xl = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  Xl2 = '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  Inner = 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
}

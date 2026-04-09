/**
 * Enum para redondeado de bordes (Border Radius)
 * Sincronizado con el sistema de diseño para mantener la consistencia visual.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * radius: AlfRadiusEnum.Lg // Aplica un redondeado de 8px (0.5rem)
 * ```
 */
export enum AlfRadiusEnum {
  None = '0',
  Sm = '0.125rem',     // 2px
  Base = '0.25rem',    // 4px
  Md = '0.375rem',     // 6px
  Lg = '0.5rem',       // 8px
  Xl = '0.75rem',      // 12px
  Xl2 = '1rem',        // 16px
  Xl3 = '1.5rem',      // 24px
  Full = '9999px',     // Círculo perfecto
}

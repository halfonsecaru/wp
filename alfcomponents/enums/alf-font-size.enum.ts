/**
 * Enum para tamaños de componentes
 * Los valores coinciden con las clases CSS globales (.alf-size-*)
 * Estas clases son reutilizables en todos los componentes de la librería
 * 
 * @example
 * ```typescript
 * // En un componente
 * size: AlfFontSizeEnum.Lg  // Genera clase: .alf-size-lg
 * ```
 */
export enum AlfFontSizeEnum {
  Nano = 'alf-size-nano',  // Nano - 8px-10px
  Xs = 'alf-size-xs',      // Extra small - 12px
  Sm = 'alf-size-sm',      // Small - 14px
  Md = 'alf-size-md',      // Medium - 16px (Alias de Base)
  Base = 'alf-size-base',  // Base/Medium - 16px
  Lg = 'alf-size-lg',      // Large - 18px
  Xl = 'alf-size-xl',      // Extra large - 20px
  Xl2 = 'alf-size-xl2',    // 2XL - 24px
  Xl3 = 'alf-size-xl3',    // 3XL - 30px
  Xl4 = 'alf-size-xl4',    // 4XL - 36px
  Xl5 = 'alf-size-xl5',    // 5XL - 48px
}

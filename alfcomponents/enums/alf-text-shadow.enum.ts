/**
 * Enum para sombras de texto (Text Shadow)
 * Permite añadir profundidad y efectos de brillo al texto.
 */
export enum AlfTextShadowEnum {
  None = 'none',
  
  /** Sombra sutil para lectura */
  Sm = '0 1px 2px rgba(0, 0, 0, 0.1)',
  
  /** Sombra estándar */
  Base = '0 1px 3px rgba(0, 0, 0, 0.1)',
  
  /** Sombra media para destacar */
  Md = '0 2px 4px rgba(0, 0, 0, 0.15)',
  
  /** Sombra pronunciada */
  Lg = '0 4px 8px rgba(0, 0, 0, 0.2)',
  
  /** Efecto resplandor exterior suave */
  Glow = '0 0 8px rgba(255, 255, 255, 0.5)',
  
  /** Efecto de borde/perfilado */
  Outline = '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
}

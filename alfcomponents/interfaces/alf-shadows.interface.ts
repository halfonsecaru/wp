import {
  AlfShadowEnum,
  AlfColorEnum,
  AlfTextShadowEnum
} from '../enums';

/**
 * Propiedades de sombra para un estado específico
 */
export interface AlfShadowsBaseInterface {
  /**
   * Sombra de caja (box-shadow)
   * Puede usar valores del enum AlfShadowEnum o un string personalizado.
   * @example AlfShadowEnum.Md 
   */
  boxShadow?: AlfShadowEnum;

  /**
   * Color de la sombra de caja
   * Solo aplica cuando se usa un valor del enum AlfShadowEnum.
   * @example AlfColorEnum.Black 
   */
  boxShadowColor?: AlfColorEnum;

  /**
   * Si la sombra de caja es interior (inset)
   * Cuando es true, la sombra se renderiza dentro del elemento.
   * @default false
   */
  boxShadowInset?: boolean;

  /**
   * Sombra de texto (text-shadow)
   * Puede usar valores del enum AlfTextShadowEnum o un string personalizado.
   * @example AlfTextShadowEnum.Base 
   */
  textShadow?: AlfTextShadowEnum;

  /**
   * Color de la sombra de texto
   * Solo aplica cuando se usa un valor del enum AlfTextShadowEnum.
   * @example AlfColorEnum.Black 
   */
  textShadowColor?: AlfColorEnum;
}

/**
 * Interface para estilos de sombras con soporte de estados
 */
export interface AlfShadowsInterface {
  /**
   * Estilos base aplicados por defecto al componente.
   */
  default?: AlfShadowsBaseInterface;

  /**
   * Estilos aplicados cuando el puntero del usuario está sobre el elemento.
   */
  hover?: AlfShadowsBaseInterface;

  /**
   * Estilos aplicados cuando el elemento recibe el foco.
   */
  focus?: AlfShadowsBaseInterface;

  /**
   * Estilos aplicados cuando el componente se encuentra en estado deshabilitado.
   */
  disabled?: AlfShadowsBaseInterface;

  /**
   * Estilos aplicados cuando el componente está activo (en click).
   */
  active?: AlfShadowsBaseInterface;
}

import {
  AlfPxEnum,
  AlfRemEnum,
  AlfPercentageEnum
} from '../enums';

/**
 * Propiedades de espaciado interno para un estado específico
 */
export interface AlfPaddingBaseInterface {
  /** 
   * Padding en todos los lados 
   * @example AlfPxEnum.Px16 | AlfRemEnum.Rem1 
   */
  padding?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Padding superior */
  paddingTop?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Padding derecho */
  paddingRight?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Padding inferior */
  paddingBottom?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Padding izquierdo */
  paddingLeft?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;
}

/**
 * Interface para estilos de padding con soporte de estados
 */
export interface AlfPaddingInterface {
  /**
   * Estilos base aplicados por defecto al componente.
   */
  default?: AlfPaddingBaseInterface;

  /**
   * Estilos aplicados cuando el puntero del usuario está sobre el elemento.
   */
  hover?: AlfPaddingBaseInterface;

  /**
   * Estilos aplicados cuando el elemento recibe el foco.
   */
  focus?: AlfPaddingBaseInterface;

  /**
   * Estilos aplicados cuando el componente se encuentra en estado deshabilitado.
   */
  disabled?: AlfPaddingBaseInterface;

  /**
   * Estilos aplicados cuando el componente está activo (en click).
   */
  active?: AlfPaddingBaseInterface;
}

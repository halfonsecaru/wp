import {
  AlfPxEnum,
  AlfRemEnum,
  AlfPercentageEnum
} from '../enums';

/**
 * Propiedades de espaciado externo para un estado específico
 */
export interface AlfMarginBaseInterface {
  /** 
   * Margen en todos los lados 
   * @example AlfPxEnum.Px16 | 'auto' 
   */
  margin?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum | 'auto';

  /** Margen superior */
  marginTop?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum | 'auto';

  /** Margen derecho */
  marginRight?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum | 'auto';

  /** Margen inferior */
  marginBottom?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum | 'auto';

  /** Margen izquierdo */
  marginLeft?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum | 'auto';
}

/**
 * Interface para estilos de margen con soporte de estados
 */
export interface AlfMarginInterface {
  /**
   * Estilos base aplicados por defecto al componente.
   */
  default?: AlfMarginBaseInterface;

  /**
   * Estilos aplicados cuando el puntero del usuario está sobre el elemento.
   */
  hover?: AlfMarginBaseInterface;

  /**
   * Estilos aplicados cuando el elemento recibe el foco.
   */
  focus?: AlfMarginBaseInterface;

  /**
   * Estilos aplicados cuando el componente se encuentra en estado deshabilitado.
   */
  disabled?: AlfMarginBaseInterface;

  /**
   * Estilos aplicados cuando el componente está activo (en click).
   */
  active?: AlfMarginBaseInterface;
}

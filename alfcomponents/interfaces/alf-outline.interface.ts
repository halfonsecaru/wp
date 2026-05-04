import {
  AlfPxEnum,
  AlfRemEnum,
  AlfBorderStyleEnum,
  AlfColorEnum
} from '../enums';

/**
 * Propiedades de contorno (outline) para un estado específico
 */
export interface AlfOutlineBaseInterface {
  /**
   * Ancho del contorno
   * @example AlfPxEnum.Px2 
   */
  outlineWidth?: AlfPxEnum | AlfRemEnum;

  /**
   * Estilo del contorno
   * @example AlfBorderStyleEnum.Solid 
   */
  outlineStyle?: AlfBorderStyleEnum;

  /**
   * Color del contorno
   * @example AlfColorEnum.Primary 
   */
  outlineColor?: AlfColorEnum;

  /**
   * Distancia entre el contorno y el borde del elemento
   * @example AlfPxEnum.Px2 
   */
  outlineOffset?: AlfPxEnum | AlfRemEnum;
}

/**
 * Interface para estilos de contorno con soporte de estados
 */
export interface AlfOutlineInterface {
  /**
   * Estilos base aplicados por defecto al componente.
   */
  default?: AlfOutlineBaseInterface;

  /**
   * Estilos aplicados cuando el puntero del usuario está sobre el elemento.
   */
  hover?: AlfOutlineBaseInterface;

  /**
   * Estilos aplicados cuando el elemento recibe el foco.
   */
  focus?: AlfOutlineBaseInterface;

  /**
   * Estilos aplicados cuando el componente se encuentra en estado deshabilitado.
   */
  disabled?: AlfOutlineBaseInterface;

  /**
   * Estilos aplicados cuando el elemento está activo (click).
   */
  active?: AlfOutlineBaseInterface;
}

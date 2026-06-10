import { AlfCursorEnum } from '../enums';

/**
 * Propiedades del cursor para un estado específico
 */
export interface AlfCursorBaseInterface {
  /** 
   * Tipo de cursor
   * @example AlfCursorEnum.Pointer
   */
  cursor?: AlfCursorEnum;
}

/**
 * Interface para estilos de cursor con soporte de estados
 */
export interface AlfCursorInterface {
  /**
   * Estilos base aplicados por defecto al componente.
   */
  default?: AlfCursorBaseInterface;

  /**
   * Estilos aplicados cuando el puntero del usuario está sobre el elemento.
   */
  hover?: AlfCursorBaseInterface;

  /**
   * Estilos aplicados cuando el elemento recibe el foco.
   */
  focus?: AlfCursorBaseInterface;

  /**
   * Estilos aplicados cuando el componente se encuentra en estado deshabilitado.
   */
  disabled?: AlfCursorBaseInterface;

  /**
   * Estilos aplicados cuando el componente está activo (en click).
   */
  active?: AlfCursorBaseInterface;
}

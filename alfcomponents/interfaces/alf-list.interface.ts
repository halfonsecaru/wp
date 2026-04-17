import {
  AlfListStyleTypeEnum,
  AlfListStylePositionEnum
} from '../enums';

/**
 * Propiedades de estilo de lista para un estado específico
 */
export interface AlfListBaseInterface {
  /**
   * Tipo de marcador de lista (viñeta)
   * @example AlfListStyleTypeEnum.Disc 
   */
  listStyleType?: AlfListStyleTypeEnum;

  /**
   * Posición del marcador de lista respecto al contenido
   * @example AlfListStylePositionEnum.Inside 
   */
  listStylePosition?: AlfListStylePositionEnum;

  /** Clase CSS personalizada delegada al elemento */
  customCssClass?: string | string[];

  /** 
   * Estilos CSS en línea personalizados 
   * @example [{ 'list-style-image': 'url("...")' }] 
   */
  customCssStyle?: Record<string, string>[];
}

/**
 * Interface para estilos de listas con soporte de estados
 */
export interface AlfListInterface {
  /**
   * Estilos base aplicados por defecto al componente.
   */
  default?: AlfListBaseInterface;

  /**
   * Estilos aplicados cuando el puntero del usuario está sobre el elemento.
   */
  hover?: AlfListBaseInterface;

  /**
   * Estilos aplicados cuando el elemento recibe el foco.
   */
  focus?: AlfListBaseInterface;

  /**
   * Estilos aplicados cuando el componente se encuentra en estado deshabilitado.
   */
  disabled?: AlfListBaseInterface;
}

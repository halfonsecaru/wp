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
}

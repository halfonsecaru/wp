import { AlfPxEnum } from '@alfcomponents/enums';
import { AlfPaddingBaseInterface } from '@alfcomponents/interfaces';

/**
 * Configuración base para padding.
 * Define un espaciado por defecto para evitar valores undefined.
 */
export const defaultPaddingBase: AlfPaddingBaseInterface = {
  paddingTop: AlfPxEnum.None,
  paddingRight: AlfPxEnum.None,
  paddingBottom: AlfPxEnum.None,
  paddingLeft: AlfPxEnum.None,
  padding: AlfPxEnum.None
};

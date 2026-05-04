import { AlfPxEnum } from '@alfcomponents/enums';
import { AlfMarginBaseInterface } from '@alfcomponents/interfaces';

/**
 * Configuración base para el margen (Margin).
 * Define un margen nulo por defecto en todos los lados.
 */
export const defaultMarginBase: AlfMarginBaseInterface = {
  margin: AlfPxEnum.None,
  marginTop: AlfPxEnum.None,
  marginRight: AlfPxEnum.None,
  marginBottom: AlfPxEnum.None,
  marginLeft: AlfPxEnum.None,
};

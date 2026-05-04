import { AlfBorderStyleEnum, AlfColorEnum, AlfPxEnum } from '@alfcomponents/enums';
import { AlfOutlineBaseInterface } from '@alfcomponents/interfaces';

/**
 * Configuración base para el contorno (Outline).
 * Define un estado neutro sin contorno por defecto.
 */
export const defaultOutlineBase: AlfOutlineBaseInterface = {
  outlineWidth: AlfPxEnum.None,
  outlineStyle: AlfBorderStyleEnum.None,
  outlineColor: AlfColorEnum.Transparent,
  outlineOffset: AlfPxEnum.None
};

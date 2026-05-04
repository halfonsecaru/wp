import { 
  AlfBorderStyleEnum, 
  AlfColorEnum, 
  AlfPxEnum, 
  AlfRadiusEnum 
} from "@alfcomponents/enums";
import { AlfBorderBaseInterface } from "@alfcomponents/interfaces";

/**
 * Configuración base para bordes.
 * Define un estado neutro y sin bordes visibles por defecto.
 */
export const defaultBorderBase: AlfBorderBaseInterface = {
  borderWidth: AlfPxEnum.None,
  borderStyle: AlfBorderStyleEnum.None,
  borderColor: AlfColorEnum.Transparent,
  borderRadius: AlfRadiusEnum.None,
  borderBottomColor: AlfColorEnum.Transparent,
  borderTopColor: AlfColorEnum.Transparent,
  borderLeftColor: AlfColorEnum.Transparent,
  borderRightColor: AlfColorEnum.Transparent,
  borderBottomWidth: AlfPxEnum.None,
  borderTopWidth: AlfPxEnum.None,
  borderLeftWidth: AlfPxEnum.None,
  borderRightWidth: AlfPxEnum.None,
  borderBottomLeftRadius: AlfRadiusEnum.None,
  borderTopLeftRadius: AlfRadiusEnum.None,
  borderBottomRightRadius: AlfRadiusEnum.None,
  borderTopRightRadius: AlfRadiusEnum.None,
  borderBottomStyle: AlfBorderStyleEnum.None,
  borderTopStyle: AlfBorderStyleEnum.None,
  borderLeftStyle: AlfBorderStyleEnum.None,
  borderRightStyle: AlfBorderStyleEnum.None,
  // Outline se maneja preferiblemente en su propia interfaz, 
  // pero lo mantenemos neutro aquí si la interfaz lo requiere.
  outlineColor: AlfColorEnum.Transparent,
  outlineWidth: AlfPxEnum.None,
  outlineStyle: AlfBorderStyleEnum.None,
  outlineOffset: AlfPxEnum.None
};
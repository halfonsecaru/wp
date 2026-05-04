import { 
  AlfAlignItemsEnum, 
  AlfCssPositionEnum,
  AlfDisplayEnum, 
  AlfFlexDirectionEnum,
  AlfFlexWrapEnum,
  AlfJustifyContentEnum, 
  AlfObjectFitEnum,
  AlfOverflowEnum,
  AlfPercentageEnum,
  AlfPxEnum,
  AlfVisibilityEnum,
  AlfZIndexEnum
} from "@alfcomponents/enums";
import { AlfDisplayAndLayoutBaseInterface } from "@alfcomponents/interfaces";

/**
 * Configuración base para el diseño y visualización (Display & Layout).
 * Define un comportamiento de flexbox centrado por defecto.
 */
export const defaultDisplayAndLayout: AlfDisplayAndLayoutBaseInterface = {
  display: AlfDisplayEnum.Flex,
  position: AlfCssPositionEnum.Relative,
  top: AlfPxEnum.None,
  right: AlfPxEnum.None,
  bottom: AlfPxEnum.None,
  left: AlfPxEnum.None,
  zIndex: AlfZIndexEnum.Auto,
  width: AlfPercentageEnum.Full,
  minWidth: AlfPxEnum.None,
  maxWidth: AlfPxEnum.None,
  minHeight: AlfPxEnum.None,
  maxHeight: AlfPxEnum.None,
  overflow: AlfOverflowEnum.Auto,
  overflowX: AlfOverflowEnum.Auto,
  overflowY: AlfOverflowEnum.Auto,
  visibility: AlfVisibilityEnum.Visible,
  objectFit: AlfObjectFitEnum.Fill,
  flexDirection: AlfFlexDirectionEnum.Row,
  justifyContent: AlfJustifyContentEnum.Start,
  alignItems: AlfAlignItemsEnum.Center,
  gap: AlfPxEnum.None,
  flexWrap: AlfFlexWrapEnum.NoWrap,
};
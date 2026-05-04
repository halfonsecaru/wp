import { AlfTextStyleStateBaseInterface } from "@alfcomponents/interfaces";
import { 
  AlfColorEnum, 
  AlfFontSizeEnum,
  AlfFontWeightEnum,
  AlfLetterSpacingEnum,
  AlfLineHeightEnum,
  AlfOpacityEnum,
  AlfTextShadowEnum, 
  AlfTextDecorationEnum, 
  AlfTextTransformEnum 
} from "@alfcomponents/enums";

/**
 * Configuración base para estilos de texto (Text Styles).
 * Define un estado neutro basado en herencia y sin decoraciones.
 */
export const defaultTextStyleBase: AlfTextStyleStateBaseInterface = {
  text: '',
  color: AlfColorEnum.Gray900,
  fontSize: AlfFontSizeEnum.Base,
  fontWeight: AlfFontWeightEnum.Normal,
  lineHeight: AlfLineHeightEnum.Normal,
  letterSpacing: AlfLetterSpacingEnum.Normal,
  opacity: AlfOpacityEnum.Opacity100,
  textShadow: AlfTextShadowEnum.None,
  textDecoration: AlfTextDecorationEnum.None,
  textTransform: AlfTextTransformEnum.None,
  
};

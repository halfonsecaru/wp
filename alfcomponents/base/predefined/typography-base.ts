import { AlfTypographyBaseInterface } from "@alfcomponents/interfaces";
import { 
  AlfColorEnum, 
  AlfFontSizeEnum, 
  AlfFontWeightEnum, 
  AlfLineHeightEnum, 
  AlfTextAlignEnum,
  AlfTextTransformEnum,
  AlfTextDecorationEnum,
  AlfFontStyleEnum,
  AlfOpacityEnum,
  AlfLetterSpacingEnum,
  AlfWhiteSpaceEnum,
  AlfWordBreakEnum,
  AlfFontFamilyEnum,
  AlfOverflowWrapEnum,
  AlfTextOverflowEnum,
  AlfTextShadowEnum,
  AlfVerticalAlignEnum
} from "@alfcomponents/enums";

/**
 * Configuración base para tipografía (Typography).
 * Define los valores por defecto para el cuerpo de texto estándar.
 */
export const defaultTypographyBase: AlfTypographyBaseInterface = {
  fontSize: AlfFontSizeEnum.Base,
  fontWeight: AlfFontWeightEnum.Normal,
  lineHeight: AlfLineHeightEnum.Normal,
  textAlign: AlfTextAlignEnum.Left,
  color: AlfColorEnum.Gray900,
  letterSpacing: AlfLetterSpacingEnum.Normal,
  whiteSpace: AlfWhiteSpaceEnum.Normal,
  wordBreak: AlfWordBreakEnum.Normal,
  textTransform: AlfTextTransformEnum.None,
  textDecoration: AlfTextDecorationEnum.None,
  fontStyle: AlfFontStyleEnum.Normal,
  opacity: AlfOpacityEnum.Opacity100,
  fontFamily: AlfFontFamilyEnum.System,
  overflowWrap: AlfOverflowWrapEnum.Normal,
  textOverflow: AlfTextOverflowEnum.Clip,
  textShadow: AlfTextShadowEnum.None,
  verticalAlign: AlfVerticalAlignEnum.Middle,
  
};

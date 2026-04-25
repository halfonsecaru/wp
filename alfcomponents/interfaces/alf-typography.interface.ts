import {
  AlfFontSizeEnum,
  AlfFontWeightEnum,
  AlfFontFamilyEnum,
  AlfLineHeightEnum,
  AlfLetterSpacingEnum,
  AlfTextAlignEnum,
  AlfTextDecorationEnum,
  AlfTextTransformEnum,
  AlfColorEnum,
  AlfWhiteSpaceEnum,
  AlfWordBreakEnum,
  AlfOverflowWrapEnum,
  AlfVerticalAlignEnum,
  AlfFontStyleEnum,
  AlfTextOverflowEnum,
  AlfOpacityEnum,
  AlfTextShadowEnum
} from '../enums';

export interface AlfTypographyBaseInterface {
  /** 
   * Tamaño de la fuente (usando AlfFontSizeEnum) 
   * @example AlfFontSizeEnum.Base 
   */
  fontSize?: AlfFontSizeEnum;

  /** 
   * Grosor/Peso de la fuente (usando AlfFontWeightEnum) 
   * @example AlfFontWeightEnum.Bold 
   */
  fontWeight?: AlfFontWeightEnum;

  /** 
   * Familia tipográfica (usando AlfFontFamilyEnum) 
   * @example AlfFontFamilyEnum.Sans 
   */
  fontFamily?: AlfFontFamilyEnum;

  /** 
   * Altura de línea para interlineado (usando AlfLineHeightEnum) 
   * @example AlfLineHeightEnum.Normal 
   */
  lineHeight?: AlfLineHeightEnum;

  /** 
   * Espaciado entre caracteres (usando AlfLetterSpacingEnum) 
   * @example AlfLetterSpacingEnum.Tight 
   */
  letterSpacing?: AlfLetterSpacingEnum;

  /** 
   * Alineación horizontal del texto (usando AlfTextAlignEnum) 
   * @example AlfTextAlignEnum.Center 
   */
  textAlign?: AlfTextAlignEnum;

  /** 
   * Decoración del texto: subrayado, tachado, etc. (usando AlfTextDecorationEnum) 
   * @example AlfTextDecorationEnum.Underline 
   */
  textDecoration?: AlfTextDecorationEnum;

  /** 
   * Transformación de mayúsculas/minúsculas (usando AlfTextTransformEnum) 
   * @example AlfTextTransformEnum.Uppercase 
   */
  textTransform?: AlfTextTransformEnum;

  /** 
   * Color del texto de la paleta AlfColorEnum 
   * @example AlfColorEnum.Blue500 
   */
  color?: AlfColorEnum;

  /** 
   * Control de espacios en blanco (usando AlfWhiteSpaceEnum) 
   * @example AlfWhiteSpaceEnum.Nowrap 
   */
  whiteSpace?: AlfWhiteSpaceEnum;

  /** 
   * Comportamiento de ruptura de palabras (usando AlfWordBreakEnum) 
   * @example AlfWordBreakEnum.BreakAll 
   */
  wordBreak?: AlfWordBreakEnum;

  /** 
   * Comportamiento de desbordamiento de palabras (usando AlfOverflowWrapEnum) 
   * @example AlfOverflowWrapEnum.BreakWord 
   */
  overflowWrap?: AlfOverflowWrapEnum;

  /** 
   * Alineación vertical del texto (usando AlfVerticalAlignEnum) 
   * @example AlfVerticalAlignEnum.Middle 
   */
  verticalAlign?: AlfVerticalAlignEnum;

  /** 
   * Estilo de fuente: Normal, Itálica, etc. (usando AlfFontStyleEnum) 
   * @example AlfFontStyleEnum.Italic 
   */
  fontStyle?: AlfFontStyleEnum;

  /** 
   * Comportamiento cuando el texto desborda el contenedor (usando AlfTextOverflowEnum) 
   * @example AlfTextOverflowEnum.Ellipsis 
   */
  textOverflow?: AlfTextOverflowEnum;

  /** 
   * Nivel de transparencia del texto (usando AlfOpacityEnum) 
   * @example AlfOpacityEnum.Opacity50 
   */
  opacity?: AlfOpacityEnum;

  /** 
   * Sombra del texto (usando AlfTextShadowEnum) 
   * @example AlfTextShadowEnum.Base 
   */
  textShadow?: AlfTextShadowEnum;

}

/**
 * Interfaz que define la configuración tipográfica completa de un componente,
 * permitiendo especificar estilos para diferentes estados (default, hover, focus, disabled).
 */
export interface AlfTypographyInterface {
  /**
   * Estilos base aplicados por defecto al componente.
   */
  default?: AlfTypographyBaseInterface;

  /**
   * Estilos aplicados cuando el puntero del usuario está sobre el elemento.
   */
  hover?: AlfTypographyBaseInterface;

  /**
   * Estilos aplicados cuando el elemento recibe el foco (teclado/click).
   */
  focus?: AlfTypographyBaseInterface;

  /**
   * Estilos aplicados cuando el componente se encuentra en estado deshabilitado.
   */
  disabled?: AlfTypographyBaseInterface;

  /**
   * Estilos aplicados cuando el componente está activo (en click).
   */
  active?: AlfTypographyBaseInterface;
}

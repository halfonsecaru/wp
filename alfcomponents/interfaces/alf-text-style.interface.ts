import {
    AlfColorEnum,
    AlfFontSizeEnum,
    AlfFontWeightEnum,
    AlfLetterSpacingEnum,
    AlfLineHeightEnum,
    AlfOpacityEnum,
    AlfTextDecorationEnum,
    AlfTextShadowEnum,
    AlfTextTransformEnum
} from '../enums';

/**
 * Propiedades de estilo de texto para un estado específico
 */
export interface AlfTextStyleStateBaseInterface {
    /**
     * Contenido del texto (si el componente lo permite por configuración)
     * @example text: 'Click aquí'
     */
    text?: string;

    /**
     * Color del texto
     * @example color: AlfColorEnum.White
     */
    color?: AlfColorEnum;

    /**
     * Tamaño de la fuente
     * @example fontSize: AlfFontSizeEnum.Base
     */
    fontSize?: AlfFontSizeEnum;

    /**
     * Peso de la fuente (Grosor)
     * @example fontWeight: AlfFontWeightEnum.Bold
     */
    fontWeight?: AlfFontWeightEnum;

    /**
     * Altura de línea
     * @example lineHeight: AlfLineHeightEnum.Normal
     */
    lineHeight?: AlfLineHeightEnum;

    /**
     * Espaciado entre letras
     * @example letterSpacing: AlfLetterSpacingEnum.Normal
     */
    letterSpacing?: AlfLetterSpacingEnum;

    /**
     * Opacidad del texto
     * @example opacity: AlfOpacityEnum.Opacity50
     */
    opacity?: AlfOpacityEnum;

    /**
     * Sombra del texto (Text Shadow)
     * @example textShadow: AlfTextShadowEnum.Base
     */
    textShadow?: AlfTextShadowEnum;

    /**
     * Subrayado, tachado o línea superior
     * @example textDecoration: AlfTextDecorationEnum.Underline
     */
    textDecoration?: AlfTextDecorationEnum;

    /**
     * Transformación: uppercase, lowercase, capitalize
     * @example textTransform: AlfTextTransformEnum.Uppercase
     */
    textTransform?: AlfTextTransformEnum;
}

/**
 * Interface para estilos de texto con soporte de estados
 */
export interface AlfTextStyleInterface {
    /** 
     * Configuración base por defecto 
     */
    default?: AlfTextStyleStateBaseInterface;

    /** 
     * Configuración aplicada al pasar el puntero (hover) 
     */
    hover?: AlfTextStyleStateBaseInterface;

    /** 
     * Configuración aplicada cuando el elemento está activo (click) 
     */
    active?: AlfTextStyleStateBaseInterface;

    /** 
     * Configuración para el estado enfocado (focus) 
     */
    focus?: AlfTextStyleStateBaseInterface;

    /** 
     * Configuración para el estado deshabilitado (disabled) 
     */
    disabled?: AlfTextStyleStateBaseInterface;
}

import {
    AlfColorEnum,
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

    /** Clase CSS personalizada delegada al elemento */
    customCssClass?: string | string[];

    /** Estilos CSS en línea personalizados @example [{ 'opacity': '0.8' }] */
    customCssStyle?: Record<string, string>[];
}

/**
 * Interface para estilos de texto con soporte de estados
 * Permite definir el color y contenido del texto para default, hover y active
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
}

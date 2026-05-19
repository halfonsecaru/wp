import {
    AlfColorEnum,
    AlfColorVariantEnum,
    AlfBorderStyleEnum,
    AlfPxEnum,
    AlfRadiusEnum,
    AlfDisplayEnum,
    AlfCssPositionEnum,
    AlfCursorEnum,
    AlfJustifyContentEnum,
    AlfAlignItemsEnum,
    AlfThemeEnum,
    AlfShadowEnum,
    AlfAnimationTypeEnum,
    AlfIconsUnicodeIconEnum,
    AlfVisibilityEnum,

    AlfVerticalAlignEnum,
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
    AlfFontSizeEnum,
    AlfFontWeightEnum,
} from "@alfcomponents/enums";

import {
    AlfBackgroundsInterface,
    AlfBorderInterface,
    AlfDisplayAndLayoutInterface,
    AlfMarginInterface,
    AlfOutlineInterface,
    AlfPaddingInterface,
    AlfRippleInterface,
    AlfTextStyleInterface,
    AlfTypographyInterface,
    AlfShadowsInterface,
    AlfAnimateCssInterface,
    AlfTransformInterface,
    AlfTypographyBaseInterface,
    AlfTransformBaseInterface,
    AlfShadowsBaseInterface,
    AlfMarginBaseInterface,
    AlfOutlineBaseInterface,
    AlfDisplayAndLayoutBaseInterface,
    AlfTextStyleStateBaseInterface
} from "@alfcomponents/interfaces";

import { resolveAlfColorVariant } from "@alfcomponents/shared";

/**
 * Identidad pura de una variante.
 * Define el ADN cromático base para cualquier componente.
 */
export interface AlfVariantIdentity {
    brand: AlfColorEnum;
    hover: AlfColorEnum;
    ripple: AlfColorEnum;
    contrast: AlfColorEnum;
    icon?: AlfIconsUnicodeIconEnum;
}


/**
 * ADN MAESTRO DE COLORES (Omni-Identity System)
 * Estructura directa por Tema para acceso inmediato.
 */
const BASIC_IDENTITIES: Record<AlfThemeEnum, Record<string, AlfVariantIdentity>> = {
    [AlfThemeEnum.Light]: {
        [AlfColorVariantEnum.Primary]: { brand: AlfColorEnum.Primary, hover: AlfColorEnum.PrimaryHover, ripple: AlfColorEnum.Blue900, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Secondary, hover: AlfColorEnum.SecondaryHover, ripple: AlfColorEnum.Gray800, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Success]: { brand: AlfColorEnum.Success, hover: AlfColorEnum.SuccessHover, ripple: AlfColorEnum.Green900, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Danger]: { brand: AlfColorEnum.Danger, hover: AlfColorEnum.DangerHover, ripple: AlfColorEnum.Red900, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Warning]: { brand: AlfColorEnum.Warning, hover: AlfColorEnum.WarningHover, ripple: AlfColorEnum.Yellow800, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Info]: { brand: AlfColorEnum.Info, hover: AlfColorEnum.InfoHover, ripple: AlfColorEnum.Cyan900, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Light]: { brand: AlfColorEnum.Gray100, hover: AlfColorEnum.Gray200, ripple: AlfColorEnum.Gray400, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Dark]: { brand: AlfColorEnum.Black, hover: AlfColorEnum.Gray900, ripple: AlfColorEnum.Gray600, contrast: AlfColorEnum.White },
    },
    [AlfThemeEnum.Dark]: {
        [AlfColorVariantEnum.Primary]: { brand: AlfColorEnum.Primary, hover: AlfColorEnum.PrimaryHover, ripple: AlfColorEnum.Blue200, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Secondary, hover: AlfColorEnum.SecondaryHover, ripple: AlfColorEnum.Gray500, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Success]: { brand: AlfColorEnum.Success, hover: AlfColorEnum.SuccessHover, ripple: AlfColorEnum.Green200, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Danger]: { brand: AlfColorEnum.Danger, hover: AlfColorEnum.DangerHover, ripple: AlfColorEnum.Red200, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Warning]: { brand: AlfColorEnum.Warning, hover: AlfColorEnum.WarningHover, ripple: AlfColorEnum.Orange200, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Info]: { brand: AlfColorEnum.Info, hover: AlfColorEnum.InfoHover, ripple: AlfColorEnum.Cyan200, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Light]: { brand: AlfColorEnum.Light, hover: AlfColorEnum.LightHover, ripple: AlfColorEnum.Gray500, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Dark]: { brand: AlfColorEnum.Dark, hover: AlfColorEnum.DarkHover, ripple: AlfColorEnum.Gray300, contrast: AlfColorEnum.Black },
    },

    [AlfThemeEnum.HighContrast]: {
        [AlfColorVariantEnum.Primary]: { brand: AlfColorEnum.Black, hover: AlfColorEnum.Gray900, ripple: AlfColorEnum.White, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.White, hover: AlfColorEnum.Gray100, ripple: AlfColorEnum.Black, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Success]: { brand: AlfColorEnum.Green600, hover: AlfColorEnum.Green700, ripple: AlfColorEnum.White, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Danger]: { brand: AlfColorEnum.Red600, hover: AlfColorEnum.Red700, ripple: AlfColorEnum.White, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Warning]: { brand: AlfColorEnum.Yellow400, hover: AlfColorEnum.Yellow500, ripple: AlfColorEnum.Black, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Info]: { brand: AlfColorEnum.Cyan600, hover: AlfColorEnum.Cyan700, ripple: AlfColorEnum.White, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Light]: { brand: AlfColorEnum.White, hover: AlfColorEnum.Gray200, ripple: AlfColorEnum.Black, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Dark]: { brand: AlfColorEnum.Black, hover: AlfColorEnum.Gray900, ripple: AlfColorEnum.White, contrast: AlfColorEnum.White }
    },
    [AlfThemeEnum.MidnightGold]: {
        [AlfColorVariantEnum.Primary]: { brand: AlfColorEnum.Yellow500, hover: AlfColorEnum.Yellow400, ripple: AlfColorEnum.White, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Gray800, hover: AlfColorEnum.Gray700, ripple: AlfColorEnum.Yellow600, contrast: AlfColorEnum.Yellow500 },
        [AlfColorVariantEnum.Success]: { brand: AlfColorEnum.Green600, hover: AlfColorEnum.Green500, ripple: AlfColorEnum.White, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Danger]: { brand: AlfColorEnum.Red600, hover: AlfColorEnum.Red500, ripple: AlfColorEnum.White, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Warning]: { brand: AlfColorEnum.Yellow400, hover: AlfColorEnum.Yellow300, ripple: AlfColorEnum.Black, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Info]: { brand: AlfColorEnum.Cyan600, hover: AlfColorEnum.Cyan500, ripple: AlfColorEnum.White, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Light]: { brand: AlfColorEnum.Gray300, hover: AlfColorEnum.Gray200, ripple: AlfColorEnum.Black, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Dark]: { brand: AlfColorEnum.Black, hover: AlfColorEnum.Gray900, ripple: AlfColorEnum.Yellow500, contrast: AlfColorEnum.Yellow400 }
    },
    [AlfThemeEnum.Cyberpunk]: {
        [AlfColorVariantEnum.Primary]: { brand: AlfColorEnum.Yellow400, hover: AlfColorEnum.Yellow300, ripple: AlfColorEnum.Orange500, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Black, hover: AlfColorEnum.Gray900, ripple: AlfColorEnum.Yellow400, contrast: AlfColorEnum.Yellow400 },
        [AlfColorVariantEnum.Success]: { brand: AlfColorEnum.Green400, hover: AlfColorEnum.Green300, ripple: AlfColorEnum.White, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Danger]: { brand: AlfColorEnum.Red500, hover: AlfColorEnum.Red400, ripple: AlfColorEnum.White, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Warning]: { brand: AlfColorEnum.Yellow300, hover: AlfColorEnum.Yellow200, ripple: AlfColorEnum.Black, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Info]: { brand: AlfColorEnum.Cyan400, hover: AlfColorEnum.Cyan300, ripple: AlfColorEnum.Black, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Light]: { brand: AlfColorEnum.Gray200, hover: AlfColorEnum.White, ripple: AlfColorEnum.Black, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Dark]: { brand: AlfColorEnum.Black, hover: AlfColorEnum.Gray950, ripple: AlfColorEnum.Yellow400, contrast: AlfColorEnum.Yellow400 }
    },
    [AlfThemeEnum.Custom]: {
        [AlfColorVariantEnum.Primary]: { brand: AlfColorEnum.Primary, hover: AlfColorEnum.PrimaryHover, ripple: AlfColorEnum.Blue900, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Secondary, hover: AlfColorEnum.SecondaryHover, ripple: AlfColorEnum.Gray800, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Success]: { brand: AlfColorEnum.Success, hover: AlfColorEnum.SuccessHover, ripple: AlfColorEnum.Green900, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Danger]: { brand: AlfColorEnum.Danger, hover: AlfColorEnum.DangerHover, ripple: AlfColorEnum.Red900, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Warning]: { brand: AlfColorEnum.Warning, hover: AlfColorEnum.WarningHover, ripple: AlfColorEnum.Yellow800, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Info]: { brand: AlfColorEnum.Info, hover: AlfColorEnum.InfoHover, ripple: AlfColorEnum.Cyan900, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Light]: { brand: AlfColorEnum.Gray100, hover: AlfColorEnum.Gray200, ripple: AlfColorEnum.Gray400, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Dark]: { brand: AlfColorEnum.Black, hover: AlfColorEnum.Gray900, ripple: AlfColorEnum.Gray600, contrast: AlfColorEnum.White }
    }
};


/**
 * Contrato visual completo que una variante debe cumplir.
 * Centraliza todas las dimensiones estéticas para garantizar coherencia total
 * entre componentes de la librería Élite.
 */
export interface PredefinedConfig {
    marginBase: AlfMarginInterface;
    paddingBase: AlfPaddingInterface;
    displayAndLayoutBase: AlfDisplayAndLayoutInterface;
    shadows: AlfShadowsInterface;
    typography: AlfTypographyInterface;

    backgrounds: AlfBackgroundsInterface;
    border: AlfBorderInterface;
    ripple: AlfRippleInterface;
    outline: AlfOutlineInterface;
    textStyle: AlfTextStyleInterface;
    animations: AlfAnimateCssInterface;
    transform: AlfTransformInterface;
    transformBase: AlfTransformBaseInterface;
    animationsBase: AlfAnimateCssInterface;
    outlineBase: AlfOutlineBaseInterface;
    textStyleBase: AlfTextStyleStateBaseInterface;
}

// ── CONSTRUCTORES BASE: El ADN neutro del sistema ───────────────────────

/**
 * Construye la base de tipografía por defecto.
 * Define las propiedades tipográficas estándar del sistema.
 */
const buildTypographyBaseConfig = (main: AlfColorEnum, hover: AlfColorEnum, focus: AlfColorEnum, disabled: AlfColorEnum, active: AlfColorEnum): AlfTypographyInterface => {
    const base: AlfTypographyBaseInterface = {
    fontSize: AlfFontSizeEnum.Base,
    fontWeight: AlfFontWeightEnum.Normal,
    lineHeight: AlfLineHeightEnum.Normal,
    textAlign: AlfTextAlignEnum.Left,
    color: main,
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
    }

    return {
        default: base,
        hover: {
            ...base,
            color: hover,
        },
        focus: {
            ...base,
            color: focus,
        },
        disabled: {
            ...base,
            color: disabled,
        },
        active: {
            ...base,
            color: active,
        },
    }
};

/**
 * Construye la base de transformación por defecto.
 * Inicializa el estado espacial neutro (sin escalas ni rotaciones).
 */
const buildTransformBaseConfig = (): AlfTransformBaseInterface => ({
    translateX: AlfPxEnum.None,
    translateY: AlfPxEnum.None,
    translateZ: AlfPxEnum.None,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    scale: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skewX: 0,
    skewY: 0,
    perspective: AlfPxEnum.None,
    transformStyle: 'flat' as any,
    backfaceVisibility: AlfVisibilityEnum.Visible
});

/**
 * Construye la base de sombras por defecto.
 * Define un estado sin sombras visibles.
 */
const buildShadowsBaseConfig = (main: AlfColorEnum, hover: AlfColorEnum, focus: AlfColorEnum, disabled: AlfColorEnum, active: AlfColorEnum): AlfShadowsInterface => {

    return {
        default: {
            boxShadow: AlfShadowEnum.None,
            boxShadowColor: main,
            boxShadowInset: false,
            textShadow: AlfTextShadowEnum.None,
            textShadowColor: main
        },
        hover: {
            boxShadow: AlfShadowEnum.None,
            boxShadowColor: hover,
            boxShadowInset: false,
            textShadow: AlfTextShadowEnum.None,
            textShadowColor: hover
        },
        focus: {
            boxShadow: AlfShadowEnum.None,
            boxShadowColor: focus,
            boxShadowInset: false,
            textShadow: AlfTextShadowEnum.None,
            textShadowColor: focus
        },
        disabled: {
            boxShadow: AlfShadowEnum.None,
            boxShadowColor: disabled,
            boxShadowInset: false,
            textShadow: AlfTextShadowEnum.None,
            textShadowColor: disabled
        },
        active: {
            boxShadow: AlfShadowEnum.None,
            boxShadowColor: active,
            boxShadowInset: false,
            textShadow: AlfTextShadowEnum.None,
            textShadowColor: active
        }
    }
};

/**
 * Construye la base de animaciones por defecto.
 * Establece FadeIn/FadeOut como el comportamiento estándar de entrada/salida.
 */
const buildAnimationsBaseConfig = (): AlfAnimateCssInterface => ({
    enterStage: AlfAnimationTypeEnum.FadeIn,
    exitStage: AlfAnimationTypeEnum.FadeOut,
    duration: '300ms',
    delay: '0ms',
    iterationCount: 1,
    fillMode: 'both',
    direction: 'normal'
});

/**
 * Construye la base de padding por defecto.
 * Inicializa todos los rellenos a cero.
 */
const buildPaddingBaseConfig = (): AlfPaddingInterface => {
    const basePadding: AlfPaddingInterface = {
        default: {
            padding: AlfPxEnum.None,
        },
        hover: {
            padding: AlfPxEnum.None,
        },
        focus: {
            padding: AlfPxEnum.None,
        },
        disabled: {
            padding: AlfPxEnum.None,
        },
        active: {
            padding: AlfPxEnum.None,
        }
    };

    return basePadding;
};

/**
 * Construye la base de márgenes por defecto.
 * Inicializa todos los márgenes externos a cero.
 */
const buildMarginBaseConfig = (): AlfMarginInterface => {
   
    const base: AlfMarginInterface = {
        default: {
            margin: AlfPxEnum.None,
        },
        hover: {
            margin: AlfPxEnum.None,
        },
        focus: {
            margin: AlfPxEnum.None,
        },
        disabled: {
            margin: AlfPxEnum.None,
        },
        active: {
            margin: AlfPxEnum.None,
        }
    };

    return base;
};

/**
 * Construye la base de outline por defecto.
 * Define un borde de enfoque invisible.
 */
const buildOutlineBaseConfig = (): AlfOutlineBaseInterface => ({
    outlineColor: AlfColorEnum.Transparent,
    outlineStyle: AlfBorderStyleEnum.None,
    outlineWidth: AlfPxEnum.None,
    outlineOffset: AlfPxEnum.None
});

/**
 * Construye la base de disposición y layout por defecto.
 * Establece el comportamiento FlexBox e interactividad estándar.
 */
const buildDisplayAndLayoutBaseConfig = (): AlfDisplayAndLayoutInterface => {
    const base: AlfDisplayAndLayoutBaseInterface =
    {
        display: AlfDisplayEnum.InlineFlex,
        position: AlfCssPositionEnum.Relative,
        cursor: AlfCursorEnum.Pointer,
        justifyContent: AlfJustifyContentEnum.Center,
        alignItems: AlfAlignItemsEnum.Center,
        width: AlfPxEnum.auto,
        height: AlfPxEnum.Px40,
        overflow: 'hidden' as any,
    };
    return {
        default: { ...base },
        hover: { ...base },
        focus: { ...base },
        disabled: { ...base },
        active: { ...base },
    };
}
/**
 * Construye la base de estilo de texto por defecto.
 * Centraliza el color base del contenido textual.
 */
const buildTextStyleBaseConfig = (): AlfTextStyleStateBaseInterface => ({
    color: AlfColorEnum.Gray900,
});

// ── CONSTRUCTORES DE ESTADO: Lógica de generación multi-estado ──────────

/**
 * Genera la configuración de fondos manejando gradientes (3D) y colores sólidos.
 */
const buildColorBackgroundConfig = (
    main: AlfColorEnum,
    hover: AlfColorEnum
): AlfBackgroundsInterface => {
    const isGrad = (val: string) => val?.includes('gradient');
    const state = (v: AlfColorEnum) => isGrad(v)
        ? { backgroundImage: v, backgroundColor: AlfColorEnum.Transparent }
        : { backgroundColor: v, backgroundImage: 'none' };

    return {
        default: state(main),
        hover: state(hover),
        focus: state(hover),
        active: state(hover),
        disabled: { backgroundColor: AlfColorEnum.Gray200, backgroundImage: 'none' },
    };
};

/**
 * Genera la configuración de bordes con soporte para estados.
 */
const buildColorBorderConfig = (
    main: AlfColorEnum,
    hover: AlfColorEnum,
    width: AlfPxEnum = AlfPxEnum.Px015
): AlfBorderInterface => {
    const base = {
        borderColor: main,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderWidth: width,
        borderRadius: AlfRadiusEnum.Lg,
    };

    return {
        default: base,
        hover: { ...base, borderColor: hover },
        focus: { ...base, borderColor: hover },
        active: { ...base, borderColor: hover },
        disabled: { ...base, borderColor: AlfColorEnum.Gray300 },
    };
};


/**
 * Genera la configuración de outline heredando de la base.
 */
const buildOutlineConfig = (): AlfOutlineInterface => ({
    default: { ...buildOutlineBaseConfig() },
});


/**
 * Genera la configuración de estilo de texto y contraste según la variante.
 * @param variant La variante de color.
 * @param isSolid Si la variante es sólida (usa color de contraste).
 * @param overrideColor Color opcional para forzar el texto (útil en outlines).
 */
const buildTextStyleConfig = (variant: AlfColorVariantEnum, isSolid: boolean, overrideColor?: AlfColorEnum): AlfTextStyleInterface => {
    const identity = getVariantIdentity(variant);
    const brandColor = variant === AlfColorVariantEnum.Light || variant === AlfColorVariantEnum.LightOutline ? AlfColorEnum.Gray700 : (identity?.brand ?? AlfColorEnum.Gray600);

    // El color final: prioridad override -> (isSolid ? contraste : brand)
    const color = overrideColor ?? (isSolid
        ? (variant === AlfColorVariantEnum.Light ? AlfColorEnum.Gray900 : (identity?.contrast ?? AlfColorEnum.White))
        : brandColor);


    return {
        default: { ...buildTextStyleBaseConfig(), color },
        disabled: { ...buildTextStyleBaseConfig(), color: AlfColorEnum.Gray500 },
    };
};


// /**
//  * Genera la configuración de tipografía reactiva según la variante.
//  * @param variant La variante de color.
//  * @param overrideColor Color opcional para forzar la tipografía (útil en outlines).
//  */
// const buildTypographyConfig = (variant: AlfColorVariantEnum, overrideColor?: AlfColorEnum): AlfTypographyInterface => {
//     const identity = getVariantIdentity(variant);
//     const isLight = variant === AlfColorVariantEnum.Light || variant === AlfColorVariantEnum.LightOutline;
//     const color = overrideColor ?? (isLight ? AlfColorEnum.Gray700 : (identity?.brand ?? AlfColorEnum.Gray600));


//     return {
//         default: { ...buildTypographyBaseConfig(), color },
//         disabled: { ...buildTypographyBaseConfig(), color: AlfColorEnum.Gray500 },
//     };
// };



/**
 * Genera la configuración de animaciones heredando de la base.
 */
const buildAnimationsConfig = (): AlfAnimateCssInterface => ({
    ...buildAnimationsBaseConfig()
});

/**
 * Genera la configuración de transformaciones heredando de la base.
 */
const buildTransformConfig = (): AlfTransformInterface => ({
    default: { ...buildTransformBaseConfig() },
});


/**
 * Configuración de Ripple por defecto (Estilo Material).
 */
export const ALF_RIPPLE_DEFAULT: AlfRippleInterface = {
    color: AlfColorEnum.White,
    duration: 1000,
    enabled: true
};

/**
 * Extrae la variante base (familia) de una variante decorativa.
 * Ej: 'outline-primary' -> 'primary'
 */
const extractBaseVariant = (variant: AlfColorVariantEnum): AlfColorVariantEnum => {
    const v = variant as string;
    if (v.startsWith('outline-')) return v.replace('outline-', '') as any;
    if (v.startsWith('soft-')) return v.replace('soft-', '') as any;
    if (v.startsWith('ghost-')) return v.replace('ghost-', '') as any;
    if (v.startsWith('crystal-')) return v.replace('crystal-', '') as any;
    if (v.startsWith('depth-')) return v.replace('depth-', '') as any;
    if (v.startsWith('gradient-')) return v.replace('gradient-', '') as any;
    return variant;
};


/**
 * Obtiene la identidad de una variante de forma segura.
 * Prioriza la variante específica antes de buscar por familia base.
 */
const getVariantIdentity = (variant: AlfColorVariantEnum): AlfVariantIdentity => {
    // 1. Prioridad absoluta: Buscamos si existe la identidad específica (ej: 'outline-success')
    const specific = BASIC_IDENTITIES[AlfThemeEnum.Light][variant];
    if (specific) return specific;

    // 2. Fallback inteligente: Buscamos por familia (ej: 'success')
    const base = extractBaseVariant(variant);
    const family = BASIC_IDENTITIES[AlfThemeEnum.Light][base];
    if (family) return family;

    // 3. Fallback de seguridad: Si nada existe, usamos Primary
    return BASIC_IDENTITIES[AlfThemeEnum.Light][AlfColorVariantEnum.Primary];
};


// ── CONSTRUCTORES BASE: El ADN neutro del sistema ───────────────────────


/**
 * Variante Sólida estándar: Color pleno, borde a juego y ripple de contraste.
 */
const solid = (variant: AlfColorVariantEnum, main: AlfColorEnum, hover: AlfColorEnum, focus: AlfColorEnum, disabled: AlfColorEnum, active: AlfColorEnum): PredefinedConfig => ({
    paddingBase: buildPaddingBaseConfig(),
    displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
    marginBase: buildMarginBaseConfig(),
    shadows: buildShadowsBaseConfig(main, hover, focus, disabled, active),
    typography: buildTypographyBaseConfig(main, hover, focus, disabled, active),


    backgrounds: buildColorBackgroundConfig(main, hover),
    border: buildColorBorderConfig(main, hover),
    ripple: { color: AlfColorEnum.White },
    outline: buildOutlineConfig(),
    textStyle: buildTextStyleConfig(variant, true),
    animations: buildAnimationsConfig(),
    transform: buildTransformConfig(),
    transformBase: buildTransformBaseConfig(),
    animationsBase: buildAnimationsBaseConfig(),

    outlineBase: buildOutlineBaseConfig(),
    textStyleBase: buildTextStyleBaseConfig(),
});

/**
 * Variante 3D / Profundidad: Utiliza gradientes y efectos de volumen.
 */
const depth = (
    variant: AlfColorVariantEnum,
    main: AlfColorEnum,
    hover: AlfColorEnum,
    focus: AlfColorEnum,
    disabled: AlfColorEnum,
    active: AlfColorEnum
): PredefinedConfig => ({
    paddingBase: buildPaddingBaseConfig(),
    displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
    marginBase: buildMarginBaseConfig(),
    shadows: buildShadowsBaseConfig(main, hover, focus, disabled, active),
    typography: buildTypographyBaseConfig(main, hover, focus, disabled, active),

    backgrounds: buildColorBackgroundConfig(main, hover),
    border: buildColorBorderConfig(AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None),
    ripple: { color: AlfColorEnum.White },
    outline: buildOutlineConfig(),
    textStyle: buildTextStyleConfig(variant, true),
    animations: buildAnimationsConfig(),
    transform: buildTransformConfig(),
    transformBase: buildTransformBaseConfig(),
    animationsBase: buildAnimationsBaseConfig(),
    outlineBase: buildOutlineBaseConfig(),
    textStyleBase: buildTextStyleBaseConfig()
});

/**
 * Variante Outline: Fondo transparente/sutil con borde de color acentuado.
 */
const outline = (
    variant: AlfColorVariantEnum,
    main: AlfColorEnum,
    hover: AlfColorEnum,
    focus: AlfColorEnum,
    disabled: AlfColorEnum,
    active: AlfColorEnum,
    bg: AlfColorEnum = AlfColorEnum.Transparent,
    bgHover: AlfColorEnum = AlfColorEnum.Gray100
): PredefinedConfig => {
    // Si NO es Light, forzamos que el texto sea del color del borde (main)
    const isLight = variant === AlfColorVariantEnum.Light || variant === AlfColorVariantEnum.LightOutline;
    const textColor = isLight ? undefined : main;

    return {
        paddingBase: buildPaddingBaseConfig(),
        displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
        marginBase: buildMarginBaseConfig(),

        shadows: buildShadowsBaseConfig(main, hover, focus, disabled, active),
        backgrounds: buildColorBackgroundConfig(bg, bgHover),
        typography: buildTypographyBaseConfig(main, hover, focus, disabled, active),
        border: buildColorBorderConfig(main, hover),
        ripple: { color: hover },
        outline: buildOutlineConfig(),
        textStyle: buildTextStyleConfig(variant, false, textColor),
        animations: buildAnimationsConfig(),
        transform: buildTransformConfig(),
        transformBase: buildTransformBaseConfig(),
        animationsBase: buildAnimationsBaseConfig(),
        outlineBase: buildOutlineBaseConfig(),
        textStyleBase: buildTextStyleBaseConfig()
    };
};


/**
 * Variante Soft: Colores pastel suaves con alta legibilidad textual.
 */
const soft = (
    variant: AlfColorVariantEnum,
    bg: AlfColorEnum,
    bgHover: AlfColorEnum,
    main: AlfColorEnum,
    hover: AlfColorEnum,
    focus: AlfColorEnum,
    disabled: AlfColorEnum,
    active: AlfColorEnum
): PredefinedConfig => ({
    paddingBase: buildPaddingBaseConfig(),
    displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
    marginBase: buildMarginBaseConfig(),
    shadows: buildShadowsBaseConfig(main, hover, focus, disabled, active),
    backgrounds: buildColorBackgroundConfig(bg, bgHover),
    border: buildColorBorderConfig(AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None),
    ripple: { color: main },
    outline: buildOutlineConfig(),
    textStyle: buildTextStyleConfig(variant, false, main),
    typography: buildTypographyBaseConfig(main, hover, focus, disabled, active),    animations: buildAnimationsConfig(),
    transform: buildTransformConfig(),
    transformBase: buildTransformBaseConfig(),
    animationsBase: buildAnimationsBaseConfig(),
    outlineBase: buildOutlineBaseConfig(),
    textStyleBase: buildTextStyleBaseConfig()
});


/**
 * Variante Crystal: Efecto glassmorphism con desenfoque y bordes translúcidos.
 */
const crystal = (
    variant: AlfColorVariantEnum,
    bg: AlfColorEnum,
    bgHover: AlfColorEnum,
    main: AlfColorEnum,
    hover: AlfColorEnum,
    focus: AlfColorEnum,
    disabled: AlfColorEnum,
    active: AlfColorEnum
): PredefinedConfig => ({
    paddingBase: buildPaddingBaseConfig(),
    displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
    marginBase: buildMarginBaseConfig(),
    shadows: buildShadowsBaseConfig(main, hover, focus, disabled, active),
    backgrounds: buildColorBackgroundConfig(bg, bgHover),
    border: buildColorBorderConfig(AlfColorEnum.White30, AlfColorEnum.White40),
    ripple: { color: main },
    outline: buildOutlineConfig(),
    textStyle: buildTextStyleConfig(variant, false, main),
    typography: buildTypographyBaseConfig(main, hover, focus, disabled, active),
    animations: buildAnimationsConfig(),
    transform: buildTransformConfig(),
    transformBase: buildTransformBaseConfig(),
    animationsBase: buildAnimationsBaseConfig(),
    outlineBase: buildOutlineBaseConfig(),
    textStyleBase: buildTextStyleBaseConfig()
});


/**
 * Variante Ghost: Estilo minimalista, fondo transparente que reacciona al hover.
 */
const ghost = (
    variant: AlfColorVariantEnum,
    main: AlfColorEnum,
    hover: AlfColorEnum,
    focus: AlfColorEnum,
    disabled: AlfColorEnum,
    active: AlfColorEnum,
    hoverBg: AlfColorEnum
): PredefinedConfig => ({
    paddingBase: buildPaddingBaseConfig(),
    displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
    marginBase: buildMarginBaseConfig(),
    shadows: buildShadowsBaseConfig(main, hover, focus, disabled, active),
    backgrounds: buildColorBackgroundConfig(AlfColorEnum.Transparent, hoverBg),
    border: buildColorBorderConfig(AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None),
    ripple: { color: main },
    outline: buildOutlineConfig(),
    textStyle: buildTextStyleConfig(variant, false, main),
    typography: buildTypographyBaseConfig(main, hover, focus, disabled, active),
    animations: buildAnimationsConfig(),
    transform: buildTransformConfig(),
    transformBase: buildTransformBaseConfig(),
    animationsBase: buildAnimationsBaseConfig(),
    outlineBase: buildOutlineBaseConfig(),
    textStyleBase: buildTextStyleBaseConfig()
});


// ── RESOLUTOR: El mapa de todas las variantes del sistema ───────────────

/**
 * Resuelve la configuración completa para una variante de color específica.
 * Es el punto de entrada principal para obtener los estilos predefinidos de un componente.
 * 
 * @param variant La variante de color deseada (ej: Primary, SuccessOutline).
 * @returns La configuración visual completa lista para ser consumida.
 */
export const resolveVariantConfig = (
    variant?: AlfColorVariantEnum
): PredefinedConfig => {

    if (!variant) {
        variant = AlfColorVariantEnum.Transparent;
    }

    const v = resolveAlfColorVariant(variant);

    switch (v) {
        // FAMILY: PRIMARY
        case AlfColorVariantEnum.Primary:
            return solid(v, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.PrimaryFocus, AlfColorEnum.PrimaryDisabled, AlfColorEnum.PrimaryActive);
        case AlfColorVariantEnum.Primary3D:
            return depth(v, AlfColorEnum.Primary3D, AlfColorEnum.Primary3DHover, AlfColorEnum.Primary3DFocus, AlfColorEnum.Primary3DDisabled, AlfColorEnum.Primary3DActive);
        case AlfColorVariantEnum.PrimaryOutline:
            return outline(v, AlfColorEnum.PrimaryOutline, AlfColorEnum.PrimaryOutlineHover, AlfColorEnum.PrimaryOutlineFocus, AlfColorEnum.PrimaryOutlineDisabled, AlfColorEnum.PrimaryOutlineActive, AlfColorEnum.PrimaryOutlineBg, AlfColorEnum.PrimaryOutlineBgHover);
        case AlfColorVariantEnum.PrimarySoft:
            return soft(v, AlfColorEnum.PrimarySoft, AlfColorEnum.PrimarySoftHover, AlfColorEnum.PrimarySoftText, AlfColorEnum.PrimarySoftTextHover, AlfColorEnum.PrimarySoftFocus, AlfColorEnum.PrimarySoftDisabled, AlfColorEnum.PrimarySoftActive);
        case AlfColorVariantEnum.PrimaryGhost:
            return ghost(v, AlfColorEnum.PrimaryGhostText, AlfColorEnum.PrimaryGhostTextHover, AlfColorEnum.PrimaryGhostFocus, AlfColorEnum.PrimaryGhostDisabled, AlfColorEnum.PrimaryGhostActive, AlfColorEnum.PrimaryGhostBgHover);
        case AlfColorVariantEnum.PrimaryCrystal:
            return crystal(v, AlfColorEnum.PrimaryCrystal, AlfColorEnum.PrimaryCrystalHover, AlfColorEnum.PrimaryCrystalText, AlfColorEnum.PrimaryCrystalTextHover, AlfColorEnum.PrimaryCrystalFocus, AlfColorEnum.PrimaryCrystalDisabled, AlfColorEnum.PrimaryCrystalActive);

        // FAMILY: SECONDARY
        case AlfColorVariantEnum.Secondary:
            return solid(v, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.SecondaryFocus, AlfColorEnum.SecondaryDisabled, AlfColorEnum.SecondaryActive);
        case AlfColorVariantEnum.Secondary3D:
            return depth(v, AlfColorEnum.Secondary3D, AlfColorEnum.Secondary3DHover, AlfColorEnum.Secondary3DFocus, AlfColorEnum.Secondary3DDisabled, AlfColorEnum.Secondary3DActive);
        case AlfColorVariantEnum.SecondaryOutline:
            return outline(v, AlfColorEnum.SecondaryOutline, AlfColorEnum.SecondaryOutlineHover, AlfColorEnum.SecondaryOutlineFocus, AlfColorEnum.SecondaryOutlineDisabled, AlfColorEnum.SecondaryOutlineActive, AlfColorEnum.SecondaryOutlineBg, AlfColorEnum.SecondaryOutlineBgHover);
        case AlfColorVariantEnum.SecondarySoft:
            return soft(v, AlfColorEnum.SecondarySoft, AlfColorEnum.SecondarySoftHover, AlfColorEnum.SecondarySoftText, AlfColorEnum.SecondarySoftTextHover, AlfColorEnum.SecondarySoftFocus, AlfColorEnum.SecondarySoftDisabled, AlfColorEnum.SecondarySoftActive);
        case AlfColorVariantEnum.SecondaryGhost:
            return ghost(v, AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfColorEnum.SecondaryGhostFocus, AlfColorEnum.SecondaryGhostDisabled, AlfColorEnum.SecondaryGhostActive, AlfColorEnum.SecondaryGhostBgHover);
        case AlfColorVariantEnum.SecondaryCrystal:
            return crystal(v, AlfColorEnum.SecondaryCrystal, AlfColorEnum.SecondaryCrystalHover, AlfColorEnum.SecondaryCrystalText, AlfColorEnum.SecondaryCrystalTextHover, AlfColorEnum.SecondaryCrystalFocus, AlfColorEnum.SecondaryCrystalDisabled, AlfColorEnum.SecondaryCrystalActive);

        // FAMILY: SUCCESS
        case AlfColorVariantEnum.Success:
            return solid(v, AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.SuccessFocus, AlfColorEnum.SuccessDisabled, AlfColorEnum.SuccessActive);
        case AlfColorVariantEnum.Success3D:
            return depth(v, AlfColorEnum.Success3D, AlfColorEnum.Success3DHover, AlfColorEnum.Success3DFocus, AlfColorEnum.Success3DDisabled, AlfColorEnum.Success3DActive);
        case AlfColorVariantEnum.SuccessOutline:
            return outline(v, AlfColorEnum.SuccessOutline, AlfColorEnum.SuccessOutlineHover, AlfColorEnum.SuccessOutlineFocus, AlfColorEnum.SuccessOutlineDisabled, AlfColorEnum.SuccessOutlineActive, AlfColorEnum.SuccessOutlineBg, AlfColorEnum.SuccessOutlineBgHover);
        case AlfColorVariantEnum.SuccessSoft:
            return soft(v, AlfColorEnum.SuccessSoft, AlfColorEnum.SuccessSoftHover, AlfColorEnum.SuccessSoftText, AlfColorEnum.SuccessSoftTextHover, AlfColorEnum.SuccessSoftFocus, AlfColorEnum.SuccessSoftDisabled, AlfColorEnum.SuccessSoftActive);
        case AlfColorVariantEnum.SuccessGhost:
            return ghost(v, AlfColorEnum.SuccessGhostText, AlfColorEnum.SuccessGhostTextHover, AlfColorEnum.SuccessGhostFocus, AlfColorEnum.SuccessGhostDisabled, AlfColorEnum.SuccessGhostActive, AlfColorEnum.SuccessGhostBgHover);
        case AlfColorVariantEnum.SuccessCrystal:
            return crystal(v, AlfColorEnum.SuccessCrystal, AlfColorEnum.SuccessCrystalHover, AlfColorEnum.SuccessCrystalText, AlfColorEnum.SuccessCrystalTextHover, AlfColorEnum.SuccessCrystalFocus, AlfColorEnum.SuccessCrystalDisabled, AlfColorEnum.SuccessCrystalActive);

        // FAMILY: DANGER
        case AlfColorVariantEnum.Danger:
            return solid(v, AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.DangerFocus, AlfColorEnum.DangerDisabled, AlfColorEnum.DangerActive);
        case AlfColorVariantEnum.Danger3D:
            return depth(v, AlfColorEnum.Danger3D, AlfColorEnum.Danger3DHover, AlfColorEnum.Danger3DFocus, AlfColorEnum.Danger3DDisabled, AlfColorEnum.Danger3DActive);
        case AlfColorVariantEnum.DangerOutline:
            return outline(v, AlfColorEnum.DangerOutline, AlfColorEnum.DangerOutlineHover, AlfColorEnum.DangerOutlineFocus, AlfColorEnum.DangerOutlineDisabled, AlfColorEnum.DangerOutlineActive, AlfColorEnum.DangerOutlineBg, AlfColorEnum.DangerOutlineBgHover);
        case AlfColorVariantEnum.DangerSoft:
            return soft(v, AlfColorEnum.DangerSoft, AlfColorEnum.DangerSoftHover, AlfColorEnum.DangerSoftText, AlfColorEnum.DangerSoftTextHover, AlfColorEnum.DangerSoftFocus, AlfColorEnum.DangerSoftDisabled, AlfColorEnum.DangerSoftActive);
        case AlfColorVariantEnum.DangerGhost:
            return ghost(v, AlfColorEnum.DangerGhostText, AlfColorEnum.DangerGhostTextHover, AlfColorEnum.DangerGhostFocus, AlfColorEnum.DangerGhostDisabled, AlfColorEnum.DangerGhostActive, AlfColorEnum.DangerGhostBgHover);
        case AlfColorVariantEnum.DangerCrystal:
            return crystal(v, AlfColorEnum.DangerCrystal, AlfColorEnum.DangerCrystalHover, AlfColorEnum.DangerCrystalText, AlfColorEnum.DangerCrystalTextHover, AlfColorEnum.DangerCrystalFocus, AlfColorEnum.DangerCrystalDisabled, AlfColorEnum.DangerCrystalActive);

        // FAMILY: WARNING
        case AlfColorVariantEnum.Warning:
            return solid(v, AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfColorEnum.WarningFocus, AlfColorEnum.WarningDisabled, AlfColorEnum.WarningActive);
        case AlfColorVariantEnum.Warning3D:
            return depth(v, AlfColorEnum.Warning3D, AlfColorEnum.Warning3DHover, AlfColorEnum.Warning3DFocus, AlfColorEnum.Warning3DDisabled, AlfColorEnum.Warning3DActive);
        case AlfColorVariantEnum.WarningOutline:
            return outline(v, AlfColorEnum.WarningOutline, AlfColorEnum.WarningOutlineHover, AlfColorEnum.WarningOutlineFocus, AlfColorEnum.WarningOutlineDisabled, AlfColorEnum.WarningOutlineActive, AlfColorEnum.WarningOutlineBg, AlfColorEnum.WarningOutlineBgHover);
        case AlfColorVariantEnum.WarningSoft:
            return soft(v, AlfColorEnum.WarningSoft, AlfColorEnum.WarningSoftHover, AlfColorEnum.WarningSoftText, AlfColorEnum.WarningSoftTextHover, AlfColorEnum.WarningSoftFocus, AlfColorEnum.WarningSoftDisabled, AlfColorEnum.WarningSoftActive);
        case AlfColorVariantEnum.WarningGhost:
            return ghost(v, AlfColorEnum.WarningGhostText, AlfColorEnum.WarningGhostTextHover, AlfColorEnum.WarningGhostFocus, AlfColorEnum.WarningGhostDisabled, AlfColorEnum.WarningGhostActive, AlfColorEnum.WarningGhostBgHover);
        case AlfColorVariantEnum.WarningCrystal:
            return crystal(v, AlfColorEnum.WarningCrystal, AlfColorEnum.WarningCrystalHover, AlfColorEnum.WarningCrystalText, AlfColorEnum.WarningCrystalTextHover, AlfColorEnum.WarningCrystalFocus, AlfColorEnum.WarningCrystalDisabled, AlfColorEnum.WarningCrystalActive);

        // FAMILY: INFO
        case AlfColorVariantEnum.Info:
            return solid(v, AlfColorEnum.Info, AlfColorEnum.InfoHover, AlfColorEnum.InfoFocus, AlfColorEnum.InfoDisabled, AlfColorEnum.InfoActive);
        case AlfColorVariantEnum.Info3D:
            return depth(v, AlfColorEnum.Info3D, AlfColorEnum.Info3DHover, AlfColorEnum.Info3DFocus, AlfColorEnum.Info3DDisabled, AlfColorEnum.Info3DActive);
        case AlfColorVariantEnum.InfoOutline:
            return outline(v, AlfColorEnum.InfoOutline, AlfColorEnum.InfoOutlineHover, AlfColorEnum.InfoOutlineFocus, AlfColorEnum.InfoOutlineDisabled, AlfColorEnum.InfoOutlineActive, AlfColorEnum.InfoOutlineBg, AlfColorEnum.InfoOutlineBgHover);
        case AlfColorVariantEnum.InfoSoft:
            return soft(v, AlfColorEnum.InfoSoft, AlfColorEnum.InfoSoftHover, AlfColorEnum.InfoSoftText, AlfColorEnum.InfoSoftTextHover, AlfColorEnum.InfoSoftFocus, AlfColorEnum.InfoSoftDisabled, AlfColorEnum.InfoSoftActive);
        case AlfColorVariantEnum.InfoGhost:
            return ghost(v, AlfColorEnum.InfoGhostText, AlfColorEnum.InfoGhostTextHover, AlfColorEnum.InfoGhostFocus, AlfColorEnum.InfoGhostDisabled, AlfColorEnum.InfoGhostActive, AlfColorEnum.InfoGhostBgHover);
        case AlfColorVariantEnum.InfoCrystal:
            return crystal(v, AlfColorEnum.InfoCrystal, AlfColorEnum.InfoCrystalHover, AlfColorEnum.InfoCrystalText, AlfColorEnum.InfoCrystalTextHover, AlfColorEnum.InfoCrystalFocus, AlfColorEnum.InfoCrystalDisabled, AlfColorEnum.InfoCrystalActive);

        // FAMILY: DARK
        case AlfColorVariantEnum.Dark:
            return solid(v, AlfColorEnum.Dark, AlfColorEnum.DarkHover, AlfColorEnum.DarkFocus, AlfColorEnum.DarkDisabled, AlfColorEnum.DarkActive);
        case AlfColorVariantEnum.Dark3D:
            return depth(v, AlfColorEnum.Dark3D, AlfColorEnum.Dark3DHover, AlfColorEnum.Dark3DFocus, AlfColorEnum.Dark3DDisabled, AlfColorEnum.Dark3DActive);
        case AlfColorVariantEnum.DarkOutline:
            return outline(v, AlfColorEnum.DarkOutline, AlfColorEnum.DarkOutlineHover, AlfColorEnum.DarkOutlineFocus, AlfColorEnum.DarkOutlineDisabled, AlfColorEnum.DarkOutlineActive, AlfColorEnum.DarkOutlineBg, AlfColorEnum.DarkOutlineBgHover);
        case AlfColorVariantEnum.DarkSoft:
            return soft(v, AlfColorEnum.DarkSoft, AlfColorEnum.DarkSoftHover, AlfColorEnum.DarkSoftText, AlfColorEnum.DarkSoftTextHover, AlfColorEnum.DarkSoftFocus, AlfColorEnum.DarkSoftDisabled, AlfColorEnum.DarkSoftActive);
        case AlfColorVariantEnum.DarkGhost:
            return ghost(v, AlfColorEnum.DarkGhostText, AlfColorEnum.DarkGhostTextHover, AlfColorEnum.DarkGhostFocus, AlfColorEnum.DarkGhostDisabled, AlfColorEnum.DarkGhostActive, AlfColorEnum.DarkGhostBgHover);
        case AlfColorVariantEnum.DarkCrystal:
            return crystal(v, AlfColorEnum.DarkCrystal, AlfColorEnum.DarkCrystalHover, AlfColorEnum.DarkCrystalText, AlfColorEnum.DarkCrystalTextHover, AlfColorEnum.DarkCrystalFocus, AlfColorEnum.DarkCrystalDisabled, AlfColorEnum.DarkCrystalActive);

        // FAMILY: LIGHT
        case AlfColorVariantEnum.Light:
            return solid(v, AlfColorEnum.Light, AlfColorEnum.LightHover, AlfColorEnum.LightFocus, AlfColorEnum.LightDisabled, AlfColorEnum.LightActive);
        case AlfColorVariantEnum.Light3D:
            return depth(v, AlfColorEnum.Light3D, 'linear-gradient(to bottom, #e9ecef, #dee2e6)' as any, AlfColorEnum.Light3DFocus, AlfColorEnum.Light3DDisabled, AlfColorEnum.Light3DActive);
        case AlfColorVariantEnum.LightOutline:
            return outline(v, AlfColorEnum.LightOutline, AlfColorEnum.LightOutlineHover, AlfColorEnum.LightOutlineFocus, AlfColorEnum.LightOutlineDisabled, AlfColorEnum.LightOutlineActive, AlfColorEnum.LightOutlineBg, AlfColorEnum.LightOutlineBgHover);
        case AlfColorVariantEnum.LightSoft:
            return soft(v, AlfColorEnum.LightSoft, AlfColorEnum.LightSoftHover, AlfColorEnum.LightSoftText, AlfColorEnum.LightSoftTextHover, AlfColorEnum.LightSoftFocus, AlfColorEnum.LightSoftDisabled, AlfColorEnum.LightSoftActive);
        case AlfColorVariantEnum.LightGhost:
            return ghost(v, AlfColorEnum.LightGhostText, AlfColorEnum.LightGhostTextHover, AlfColorEnum.LightGhostFocus, AlfColorEnum.LightGhostDisabled, AlfColorEnum.LightGhostActive, AlfColorEnum.LightGhostBgHover);
        case AlfColorVariantEnum.LightCrystal:
            return crystal(v, AlfColorEnum.LightCrystal, AlfColorEnum.LightCrystalHover, AlfColorEnum.LightCrystalText, AlfColorEnum.LightCrystalTextHover, AlfColorEnum.LightCrystalFocus, AlfColorEnum.LightCrystalDisabled, AlfColorEnum.LightCrystalActive);

        case AlfColorVariantEnum.Transparent:
            return ghost(v, AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfColorEnum.SecondaryGhostFocus, AlfColorEnum.SecondaryGhostDisabled, AlfColorEnum.SecondaryGhostActive, AlfColorEnum.Transparent);

        default:
            return solid(v, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.SecondaryFocus, AlfColorEnum.SecondaryDisabled, AlfColorEnum.SecondaryActive);
    }
};
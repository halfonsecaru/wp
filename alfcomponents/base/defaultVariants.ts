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
    AlfPaddingBaseInterface, 
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
        [AlfColorVariantEnum.Primary]:   { brand: AlfColorEnum.Primary,   hover: AlfColorEnum.PrimaryHover, ripple: AlfColorEnum.Blue900,   contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Secondary, hover: AlfColorEnum.SecondaryHover, ripple: AlfColorEnum.Gray800,  contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Success]:   { brand: AlfColorEnum.Success,   hover: AlfColorEnum.SuccessHover, ripple: AlfColorEnum.Green900, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Danger]:    { brand: AlfColorEnum.Danger,    hover: AlfColorEnum.DangerHover,  ripple: AlfColorEnum.Red900,   contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Warning]:   { brand: AlfColorEnum.Warning,   hover: AlfColorEnum.WarningHover, ripple: AlfColorEnum.Yellow800, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Info]:      { brand: AlfColorEnum.Info,      hover: AlfColorEnum.InfoHover,    ripple: AlfColorEnum.Cyan900,   contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Light]:     { brand: AlfColorEnum.Gray100,   hover: AlfColorEnum.Gray200,      ripple: AlfColorEnum.Gray400,   contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Dark]:      { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.Gray600,   contrast: AlfColorEnum.White },
    },
    [AlfThemeEnum.Dark]: {
        [AlfColorVariantEnum.Primary]:   { brand: AlfColorEnum.Primary,   hover: AlfColorEnum.PrimaryHover, ripple: AlfColorEnum.Blue200,   contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Secondary, hover: AlfColorEnum.SecondaryHover, ripple: AlfColorEnum.Gray500,   contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Success]:   { brand: AlfColorEnum.Success,   hover: AlfColorEnum.SuccessHover, ripple: AlfColorEnum.Green200,  contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Danger]:    { brand: AlfColorEnum.Danger,    hover: AlfColorEnum.DangerHover,  ripple: AlfColorEnum.Red200,    contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Warning]:   { brand: AlfColorEnum.Warning,   hover: AlfColorEnum.WarningHover, ripple: AlfColorEnum.Orange200, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Info]:      { brand: AlfColorEnum.Info,      hover: AlfColorEnum.InfoHover,    ripple: AlfColorEnum.Cyan200,   contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Light]:     { brand: AlfColorEnum.Light,     hover: AlfColorEnum.LightHover,   ripple: AlfColorEnum.Gray500,   contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Dark]:      { brand: AlfColorEnum.Dark,      hover: AlfColorEnum.DarkHover,    ripple: AlfColorEnum.Gray300,   contrast: AlfColorEnum.Black },
    },

    [AlfThemeEnum.HighContrast]: {
        [AlfColorVariantEnum.Primary]:   { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.White,     hover: AlfColorEnum.Gray100,      ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Success]:   { brand: AlfColorEnum.Green600,  hover: AlfColorEnum.Green700,     ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Danger]:    { brand: AlfColorEnum.Red600,    hover: AlfColorEnum.Red700,       ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Warning]:   { brand: AlfColorEnum.Yellow400, hover: AlfColorEnum.Yellow500,    ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Info]:      { brand: AlfColorEnum.Cyan600,   hover: AlfColorEnum.Cyan700,      ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Light]:     { brand: AlfColorEnum.White,     hover: AlfColorEnum.Gray200,      ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Dark]:      { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White }
    },
    [AlfThemeEnum.MidnightGold]: {
        [AlfColorVariantEnum.Primary]:   { brand: AlfColorEnum.Yellow500, hover: AlfColorEnum.Yellow400,    ripple: AlfColorEnum.White,     contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Gray800,   hover: AlfColorEnum.Gray700,      ripple: AlfColorEnum.Yellow600, contrast: AlfColorEnum.Yellow500 },
        [AlfColorVariantEnum.Success]:   { brand: AlfColorEnum.Green600,  hover: AlfColorEnum.Green500,     ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Danger]:    { brand: AlfColorEnum.Red600,    hover: AlfColorEnum.Red500,       ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Warning]:   { brand: AlfColorEnum.Yellow400, hover: AlfColorEnum.Yellow300,    ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Info]:      { brand: AlfColorEnum.Cyan600,   hover: AlfColorEnum.Cyan500,      ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Light]:     { brand: AlfColorEnum.Gray300,   hover: AlfColorEnum.Gray200,      ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Dark]:      { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.Yellow500, contrast: AlfColorEnum.Yellow400 }
    },
    [AlfThemeEnum.Cyberpunk]: {
        [AlfColorVariantEnum.Primary]:   { brand: AlfColorEnum.Yellow400, hover: AlfColorEnum.Yellow300,    ripple: AlfColorEnum.Orange500, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.Yellow400, contrast: AlfColorEnum.Yellow400 },
        [AlfColorVariantEnum.Success]:   { brand: AlfColorEnum.Green400,  hover: AlfColorEnum.Green300,     ripple: AlfColorEnum.White,     contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Danger]:    { brand: AlfColorEnum.Red500,    hover: AlfColorEnum.Red400,       ripple: AlfColorEnum.White,     contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Warning]:   { brand: AlfColorEnum.Yellow300, hover: AlfColorEnum.Yellow200,    ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Info]:      { brand: AlfColorEnum.Cyan400,   hover: AlfColorEnum.Cyan300,      ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Light]:     { brand: AlfColorEnum.Gray200,   hover: AlfColorEnum.White,        ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Dark]:      { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray950,      ripple: AlfColorEnum.Yellow400, contrast: AlfColorEnum.Yellow400 }
    },
    [AlfThemeEnum.Custom]: {
        [AlfColorVariantEnum.Primary]:   { brand: AlfColorEnum.Primary,   hover: AlfColorEnum.PrimaryHover, ripple: AlfColorEnum.Blue900,   contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Secondary, hover: AlfColorEnum.SecondaryHover, ripple: AlfColorEnum.Gray800,  contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Success]:   { brand: AlfColorEnum.Success,   hover: AlfColorEnum.SuccessHover, ripple: AlfColorEnum.Green900, contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Danger]:    { brand: AlfColorEnum.Danger,    hover: AlfColorEnum.DangerHover,  ripple: AlfColorEnum.Red900,   contrast: AlfColorEnum.White },
        [AlfColorVariantEnum.Warning]:   { brand: AlfColorEnum.Warning,   hover: AlfColorEnum.WarningHover, ripple: AlfColorEnum.Yellow800, contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Info]:      { brand: AlfColorEnum.Info,      hover: AlfColorEnum.InfoHover,    ripple: AlfColorEnum.Cyan900,   contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Light]:     { brand: AlfColorEnum.Gray100,   hover: AlfColorEnum.Gray200,      ripple: AlfColorEnum.Gray400,   contrast: AlfColorEnum.Black },
        [AlfColorVariantEnum.Dark]:      { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.Gray600,   contrast: AlfColorEnum.White }
    }
};


/**
 * Contrato visual completo que una variante debe cumplir.
 * Centraliza todas las dimensiones estéticas para garantizar coherencia total
 * entre componentes de la librería Élite.
 */
export interface PredefinedConfig {
    backgrounds: AlfBackgroundsInterface;
    border: AlfBorderInterface;
    ripple: AlfRippleInterface;
    margin: AlfMarginInterface;
    outline: AlfOutlineInterface;
    displayAndLayout: AlfDisplayAndLayoutInterface;
    padding: AlfPaddingInterface;
    textStyle: AlfTextStyleInterface;
    typography: AlfTypographyInterface;
    shadows: AlfShadowsInterface;
    animations: AlfAnimateCssInterface;
    transform: AlfTransformInterface;
    typographyBase: AlfTypographyBaseInterface;
    transformBase: AlfTransformBaseInterface;
    shadowsBase: AlfShadowsBaseInterface;
    animationsBase: AlfAnimateCssInterface;
    paddingBase: AlfPaddingBaseInterface;
    marginBase: AlfMarginBaseInterface;
    outlineBase: AlfOutlineBaseInterface;
    displayAndLayoutBase: AlfDisplayAndLayoutBaseInterface;
    textStyleBase: AlfTextStyleStateBaseInterface;
}

// ── CONSTRUCTORES BASE: El ADN neutro del sistema ───────────────────────

/**
 * Construye la base de tipografía por defecto.
 * Define las propiedades tipográficas estándar del sistema.
 */
const buildTypographyBaseConfig = (): AlfTypographyBaseInterface => ({
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
});

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
const buildShadowsBaseConfig = (): AlfShadowsBaseInterface => ({
    boxShadow: AlfShadowEnum.None,
    boxShadowColor: AlfColorEnum.Transparent,
    boxShadowInset: false,
    textShadow: AlfTextShadowEnum.None,
    textShadowColor: AlfColorEnum.Transparent
});

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
const buildPaddingBaseConfig = (): AlfPaddingBaseInterface => ({
    paddingTop: AlfPxEnum.None,
    paddingBottom: AlfPxEnum.None,
    paddingLeft: AlfPxEnum.None,
    paddingRight: AlfPxEnum.None,
});

/**
 * Construye la base de márgenes por defecto.
 * Inicializa todos los márgenes externos a cero.
 */
const buildMarginBaseConfig = (): AlfMarginBaseInterface => ({
    marginTop: AlfPxEnum.None,
    marginBottom: AlfPxEnum.None,
    marginLeft: AlfPxEnum.None,
    marginRight: AlfPxEnum.None,
});

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
const buildDisplayAndLayoutBaseConfig = (): AlfDisplayAndLayoutBaseInterface => ({
    display: AlfDisplayEnum.InlineFlex,
    position: AlfCssPositionEnum.Relative,
    cursor: AlfCursorEnum.Pointer,
    justifyContent: AlfJustifyContentEnum.Center,
    alignItems: AlfAlignItemsEnum.Center,
    width: AlfPxEnum.auto,
    height: AlfPxEnum.Px40,
    overflow: 'hidden' as any,
});

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
 * Genera la configuración de márgenes heredando de la base.
 */
const buildMarginConfig = (): AlfMarginInterface => ({
    default: { ...buildMarginBaseConfig() },
    hover: { ...buildMarginBaseConfig() },
    active: { ...buildMarginBaseConfig() },
    focus: { ...buildMarginBaseConfig() },
    disabled: { ...buildMarginBaseConfig() },
});

/**
 * Genera la configuración de outline heredando de la base.
 */
const buildOutlineConfig = (): AlfOutlineInterface => ({
    default: { ...buildOutlineBaseConfig() },
    hover: { ...buildOutlineBaseConfig() },
    active: { ...buildOutlineBaseConfig() },
    focus: { ...buildOutlineBaseConfig() },
    disabled: { ...buildOutlineBaseConfig() },
});

/**
 * Genera la configuración de disposición y layout heredando de la base.
 */
const buildDisplayAndLayoutConfig = (): AlfDisplayAndLayoutInterface => ({
    default: { ...buildDisplayAndLayoutBaseConfig() },
    hover: { ...buildDisplayAndLayoutBaseConfig() },
    active: { ...buildDisplayAndLayoutBaseConfig() },
    focus: { ...buildDisplayAndLayoutBaseConfig() },
    disabled: { ...buildDisplayAndLayoutBaseConfig() },
});

/**
 * Genera la configuración de rellenos (padding) heredando de la base.
 */
const buildPaddingConfig = (): AlfPaddingInterface => ({
    default: { ...buildPaddingBaseConfig() },
    hover: { ...buildPaddingBaseConfig() },
    active: { ...buildPaddingBaseConfig() },
    focus: { ...buildPaddingBaseConfig() },
    disabled: { ...buildPaddingBaseConfig() },
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
        hover: { ...buildTextStyleBaseConfig(), color },
        active: { ...buildTextStyleBaseConfig(), color },
        focus: { ...buildTextStyleBaseConfig(), color },
        disabled: { ...buildTextStyleBaseConfig(), color: AlfColorEnum.Gray500 },
    };
};


/**
 * Genera la configuración de tipografía reactiva según la variante.
 * @param variant La variante de color.
 * @param overrideColor Color opcional para forzar la tipografía (útil en outlines).
 */
const buildTypographyConfig = (variant: AlfColorVariantEnum, overrideColor?: AlfColorEnum): AlfTypographyInterface => {
    const identity = getVariantIdentity(variant);
    const isLight = variant === AlfColorVariantEnum.Light || variant === AlfColorVariantEnum.LightOutline;
    const color = overrideColor ?? (isLight ? AlfColorEnum.Gray700 : (identity?.brand ?? AlfColorEnum.Gray600));


    return {
        default: { ...buildTypographyBaseConfig(), color },
        hover: { ...buildTypographyBaseConfig(), color },
        active: { ...buildTypographyBaseConfig(), color },
        focus: { ...buildTypographyBaseConfig(), color },
        disabled: { ...buildTypographyBaseConfig(), color: AlfColorEnum.Gray500 },
    };
};


/**
 * Genera la configuración de sombras heredando de la base.
 */
const buildShadowConfig = (): AlfShadowsInterface => ({
    default: { ...buildShadowsBaseConfig(), boxShadow: AlfShadowEnum.None },
    hover: { ...buildShadowsBaseConfig(), boxShadow: AlfShadowEnum.None },
    active: { ...buildShadowsBaseConfig(), boxShadow: AlfShadowEnum.None },
    focus: { ...buildShadowsBaseConfig(), boxShadow: AlfShadowEnum.None },
    disabled: { ...buildShadowsBaseConfig(), boxShadow: AlfShadowEnum.None },
});

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
    hover: { ...buildTransformBaseConfig() },
    active: { ...buildTransformBaseConfig() },
    focus: { ...buildTransformBaseConfig() },
    disabled: { ...buildTransformBaseConfig() },
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
    if (v.startsWith('soft-'))    return v.replace('soft-', '')    as any;
    if (v.startsWith('ghost-'))   return v.replace('ghost-', '')   as any;
    if (v.startsWith('crystal-')) return v.replace('crystal-', '') as any;
    if (v.startsWith('depth-'))   return v.replace('depth-', '')   as any;
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
const solid = (variant: AlfColorVariantEnum, main: AlfColorEnum, hover: AlfColorEnum): PredefinedConfig => ({
    backgrounds: buildColorBackgroundConfig(main, hover),
    border: buildColorBorderConfig(main, hover),
    ripple: { color: AlfColorEnum.White },
    margin: buildMarginConfig(),
    outline: buildOutlineConfig(),
    displayAndLayout: buildDisplayAndLayoutConfig(),
    padding: buildPaddingConfig(),
    textStyle: buildTextStyleConfig(variant, true),
    typography: buildTypographyConfig(variant),
    shadows: buildShadowConfig(),
    animations: buildAnimationsConfig(),
    transform: buildTransformConfig(),
    typographyBase: buildTypographyBaseConfig(),
    transformBase: buildTransformBaseConfig(),
    shadowsBase: buildShadowsBaseConfig(),
    animationsBase: buildAnimationsBaseConfig(),
    paddingBase: buildPaddingBaseConfig(),
    marginBase: buildMarginBaseConfig(),
    outlineBase: buildOutlineBaseConfig(),
    displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
    textStyleBase: buildTextStyleBaseConfig()
});

/**
 * Variante 3D / Profundidad: Utiliza gradientes y efectos de volumen.
 */
const depth = (variant: AlfColorVariantEnum, main: AlfColorEnum, hover: AlfColorEnum): PredefinedConfig => ({
    backgrounds: buildColorBackgroundConfig(main, hover),
    border: buildColorBorderConfig(AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None),
    ripple: { color: AlfColorEnum.White },
    margin: buildMarginConfig(),
    outline: buildOutlineConfig(),
    displayAndLayout: buildDisplayAndLayoutConfig(),
    padding: buildPaddingConfig(),
    textStyle: buildTextStyleConfig(variant, true),
    typography: buildTypographyConfig(variant),
    shadows: buildShadowConfig(),
    animations: buildAnimationsConfig(),
    transform: buildTransformConfig(),
    typographyBase: buildTypographyBaseConfig(),
    transformBase: buildTransformBaseConfig(),
    shadowsBase: buildShadowsBaseConfig(),
    animationsBase: buildAnimationsBaseConfig(),
    paddingBase: buildPaddingBaseConfig(),
    marginBase: buildMarginBaseConfig(),
    outlineBase: buildOutlineBaseConfig(),
    displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
    textStyleBase: buildTextStyleBaseConfig()
});

/**
 * Variante Outline: Fondo transparente/sutil con borde de color acentuado.
 */
const outline = (variant: AlfColorVariantEnum, main: AlfColorEnum, hover: AlfColorEnum, bg: AlfColorEnum = AlfColorEnum.Transparent, bgHover: AlfColorEnum = AlfColorEnum.Gray100): PredefinedConfig => {
    // Si NO es Light, forzamos que el texto sea del color del borde (main)
    const isLight = variant === AlfColorVariantEnum.Light || variant === AlfColorVariantEnum.LightOutline;
    const textColor = isLight ? undefined : main;

    return {
        backgrounds: buildColorBackgroundConfig(bg, bgHover),
        border: buildColorBorderConfig(main, hover),
        ripple: { color: hover },
        margin: buildMarginConfig(),
        outline: buildOutlineConfig(),
        displayAndLayout: buildDisplayAndLayoutConfig(),
        padding: buildPaddingConfig(),
        textStyle: buildTextStyleConfig(variant, false, textColor),
        typography: buildTypographyConfig(variant, textColor),
        shadows: buildShadowConfig(),
        animations: buildAnimationsConfig(),
        transform: buildTransformConfig(),
        typographyBase: buildTypographyBaseConfig(),
        transformBase: buildTransformBaseConfig(),
        shadowsBase: buildShadowsBaseConfig(),
        animationsBase: buildAnimationsBaseConfig(),
        paddingBase: buildPaddingBaseConfig(),
        marginBase: buildMarginBaseConfig(),
        outlineBase: buildOutlineBaseConfig(),
        displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
        textStyleBase: buildTextStyleBaseConfig()
    };
};


/**
 * Variante Soft: Colores pastel suaves con alta legibilidad textual.
 */
const soft = (variant: AlfColorVariantEnum, bg: AlfColorEnum, hover: AlfColorEnum, text: AlfColorEnum): PredefinedConfig => ({
    backgrounds: buildColorBackgroundConfig(bg, hover),
    border: buildColorBorderConfig(AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None),
    ripple: { color: text },
    margin: buildMarginConfig(),
    outline: buildOutlineConfig(),
    displayAndLayout: buildDisplayAndLayoutConfig(),
    padding: buildPaddingConfig(),
    textStyle: buildTextStyleConfig(variant, false, text),
    typography: buildTypographyConfig(variant, text),
    shadows: buildShadowConfig(),
    animations: buildAnimationsConfig(),
    transform: buildTransformConfig(),
    typographyBase: buildTypographyBaseConfig(),
    transformBase: buildTransformBaseConfig(),
    shadowsBase: buildShadowsBaseConfig(),
    animationsBase: buildAnimationsBaseConfig(),
    paddingBase: buildPaddingBaseConfig(),
    marginBase: buildMarginBaseConfig(),
    outlineBase: buildOutlineBaseConfig(),
    displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
    textStyleBase: buildTextStyleBaseConfig()
});


/**
 * Variante Crystal: Efecto glassmorphism con desenfoque y bordes translúcidos.
 */
const crystal = (variant: AlfColorVariantEnum, main: AlfColorEnum, hover: AlfColorEnum, text: AlfColorEnum): PredefinedConfig => ({
    backgrounds: buildColorBackgroundConfig(main, hover),
    border: buildColorBorderConfig(AlfColorEnum.White30, AlfColorEnum.White40),
    ripple: { color: text },
    margin: buildMarginConfig(),
    outline: buildOutlineConfig(),
    displayAndLayout: buildDisplayAndLayoutConfig(),
    padding: buildPaddingConfig(),
    textStyle: buildTextStyleConfig(variant, false, text),
    typography: buildTypographyConfig(variant, text),
    shadows: buildShadowConfig(),
    animations: buildAnimationsConfig(),
    transform: buildTransformConfig(),
    typographyBase: buildTypographyBaseConfig(),
    transformBase: buildTransformBaseConfig(),
    shadowsBase: buildShadowsBaseConfig(),
    animationsBase: buildAnimationsBaseConfig(),
    paddingBase: buildPaddingBaseConfig(),
    marginBase: buildMarginBaseConfig(),
    outlineBase: buildOutlineBaseConfig(),
    displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
    textStyleBase: buildTextStyleBaseConfig()
});


/**
 * Variante Ghost: Estilo minimalista, fondo transparente que reacciona al hover.
 */
const ghost = (variant: AlfColorVariantEnum, text: AlfColorEnum, hoverBg: AlfColorEnum): PredefinedConfig => ({
    backgrounds: buildColorBackgroundConfig(AlfColorEnum.Transparent, hoverBg),
    border: buildColorBorderConfig(AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None),
    ripple: { color: text },
    margin: buildMarginConfig(),
    outline: buildOutlineConfig(),
    displayAndLayout: buildDisplayAndLayoutConfig(),
    padding: buildPaddingConfig(),
    textStyle: buildTextStyleConfig(variant, false, text),
    typography: buildTypographyConfig(variant, text),
    shadows: buildShadowConfig(),
    animations: buildAnimationsConfig(),
    transform: buildTransformConfig(),
    typographyBase: buildTypographyBaseConfig(),
    transformBase: buildTransformBaseConfig(),
    shadowsBase: buildShadowsBaseConfig(),
    animationsBase: buildAnimationsBaseConfig(),
    paddingBase: buildPaddingBaseConfig(),
    marginBase: buildMarginBaseConfig(),
    outlineBase: buildOutlineBaseConfig(),
    displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
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
    const v = resolveAlfColorVariant(variant);

    switch (v) {
        // FAMILY: PRIMARY
        case AlfColorVariantEnum.Primary:
            return solid(v, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover);
        case AlfColorVariantEnum.Primary3D:
            return depth(v, AlfColorEnum.Primary3D, AlfColorEnum.Primary3DHover);
        case AlfColorVariantEnum.PrimaryOutline: 
            return outline(v, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.PrimarySoft, AlfColorEnum.PrimarySoftHover);
        case AlfColorVariantEnum.PrimarySoft:
            return soft(v, AlfColorEnum.PrimarySoft, AlfColorEnum.PrimarySoftHover, AlfColorEnum.Primary);
        case AlfColorVariantEnum.PrimaryGhost:
            return ghost(v, AlfColorEnum.Primary, AlfColorEnum.PrimarySoft);
        case AlfColorVariantEnum.PrimaryCrystal: 
            return crystal(v, AlfColorEnum.PrimaryCrystal, AlfColorEnum.PrimaryCrystalHover, AlfColorEnum.Primary);

        // FAMILY: SECONDARY
        case AlfColorVariantEnum.Secondary:
            return solid(v, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover);
        case AlfColorVariantEnum.Secondary3D:
            return depth(v, AlfColorEnum.Secondary3D, AlfColorEnum.Secondary3DHover);
        case AlfColorVariantEnum.SecondaryOutline: 
            return outline(v, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.SecondarySoft, AlfColorEnum.SecondarySoftHover);
        case AlfColorVariantEnum.SecondarySoft:
            return soft(v, AlfColorEnum.SecondarySoft, AlfColorEnum.SecondarySoftHover, AlfColorEnum.Secondary);
        case AlfColorVariantEnum.SecondaryGhost:
            return ghost(v, AlfColorEnum.Secondary, AlfColorEnum.SecondarySoft);
        case AlfColorVariantEnum.SecondaryCrystal: 
            return crystal(v, AlfColorEnum.SecondaryCrystal, AlfColorEnum.SecondaryCrystalHover, AlfColorEnum.Secondary);

        // FAMILY: SUCCESS
        case AlfColorVariantEnum.Success:
            return solid(v, AlfColorEnum.Success, AlfColorEnum.SuccessHover);
        case AlfColorVariantEnum.Success3D:
            return depth(v, AlfColorEnum.Success3D, AlfColorEnum.Success3DHover);
        case AlfColorVariantEnum.SuccessOutline: 
            return outline(v, AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.SuccessSoft, AlfColorEnum.SuccessSoftHover);
        case AlfColorVariantEnum.SuccessSoft:
            return soft(v, AlfColorEnum.SuccessSoft, AlfColorEnum.SuccessSoftHover, AlfColorEnum.Success);
        case AlfColorVariantEnum.SuccessGhost:
            return ghost(v, AlfColorEnum.Success, AlfColorEnum.SuccessSoft);
        case AlfColorVariantEnum.SuccessCrystal: 
            return crystal(v, AlfColorEnum.SuccessCrystal, AlfColorEnum.SuccessCrystalHover, AlfColorEnum.Success);

        // FAMILY: DANGER
        case AlfColorVariantEnum.Danger:
            return solid(v, AlfColorEnum.Danger, AlfColorEnum.DangerHover);
        case AlfColorVariantEnum.Danger3D:
            return depth(v, AlfColorEnum.Danger3D, AlfColorEnum.Danger3DHover);
        case AlfColorVariantEnum.DangerOutline:  
            return outline(v, AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.DangerSoft, AlfColorEnum.DangerSoftHover);
        case AlfColorVariantEnum.DangerSoft:
            return soft(v, AlfColorEnum.DangerSoft, AlfColorEnum.DangerSoftHover, AlfColorEnum.Danger);
        case AlfColorVariantEnum.DangerGhost:
            return ghost(v, AlfColorEnum.Danger, AlfColorEnum.DangerSoft);
        case AlfColorVariantEnum.DangerCrystal:  
            return crystal(v, AlfColorEnum.DangerCrystal, AlfColorEnum.DangerCrystalHover, AlfColorEnum.Danger);

        // FAMILY: WARNING
        case AlfColorVariantEnum.Warning:
            return solid(v, AlfColorEnum.Warning, AlfColorEnum.WarningHover);
        case AlfColorVariantEnum.Warning3D:
            return depth(v, AlfColorEnum.Warning3D, AlfColorEnum.Warning3DHover);
        case AlfColorVariantEnum.WarningOutline: 
            return outline(v, AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfColorEnum.WarningSoft, AlfColorEnum.WarningSoftHover);
        case AlfColorVariantEnum.WarningSoft:
            return soft(v, AlfColorEnum.WarningSoft, AlfColorEnum.WarningSoftHover, AlfColorEnum.Warning);
        case AlfColorVariantEnum.WarningGhost:
            return ghost(v, AlfColorEnum.Warning, AlfColorEnum.WarningSoft);
        case AlfColorVariantEnum.WarningCrystal: 
            return crystal(v, AlfColorEnum.WarningCrystal, AlfColorEnum.WarningCrystalHover, AlfColorEnum.Warning);

        // FAMILY: INFO
        case AlfColorVariantEnum.Info:
            return solid(v, AlfColorEnum.Info, AlfColorEnum.InfoHover);
        case AlfColorVariantEnum.Info3D:
            return depth(v, AlfColorEnum.Info3D, AlfColorEnum.Info3DHover);
        case AlfColorVariantEnum.InfoOutline:    
            return outline(v, AlfColorEnum.Info, AlfColorEnum.InfoHover, AlfColorEnum.InfoSoft, AlfColorEnum.InfoSoftHover);
        case AlfColorVariantEnum.InfoSoft:
            return soft(v, AlfColorEnum.InfoSoft, AlfColorEnum.InfoSoftHover, AlfColorEnum.Info);
        case AlfColorVariantEnum.InfoGhost:
            return ghost(v, AlfColorEnum.Info, AlfColorEnum.InfoSoft);
        case AlfColorVariantEnum.InfoCrystal:    
            return crystal(v, AlfColorEnum.InfoCrystal, AlfColorEnum.InfoCrystalHover, AlfColorEnum.Info);

        // FAMILY: DARK
        case AlfColorVariantEnum.Dark:
            return solid(v, AlfColorEnum.Dark, AlfColorEnum.DarkHover);
        case AlfColorVariantEnum.Dark3D:
            return depth(v, AlfColorEnum.Dark3D, AlfColorEnum.Dark3DHover);
        case AlfColorVariantEnum.DarkOutline:    
            return outline(v, AlfColorEnum.Dark, AlfColorEnum.DarkHover, AlfColorEnum.DarkSoft, AlfColorEnum.DarkSoftHover);
        case AlfColorVariantEnum.DarkSoft:
            return soft(v, AlfColorEnum.DarkSoft, AlfColorEnum.DarkSoftHover, AlfColorEnum.Dark);
        case AlfColorVariantEnum.DarkGhost:
            return ghost(v, AlfColorEnum.Dark, AlfColorEnum.DarkSoft);
        case AlfColorVariantEnum.DarkCrystal:    
            return crystal(v, AlfColorEnum.DarkCrystal, AlfColorEnum.DarkCrystalHover, AlfColorEnum.Dark);

        // FAMILY: LIGHT
        case AlfColorVariantEnum.Light:
            return solid(v, AlfColorEnum.Gray300, AlfColorEnum.Gray400);
        case AlfColorVariantEnum.Light3D:        
            return depth(v, AlfColorEnum.Light3DHover, 'linear-gradient(to bottom, #e9ecef, #dee2e6)' as any);
        case AlfColorVariantEnum.LightOutline:   
            return outline(v, AlfColorEnum.Gray400, AlfColorEnum.Gray500, AlfColorEnum.LightSoft, AlfColorEnum.LightSoftHover);
        case AlfColorVariantEnum.LightSoft:
            return soft(v, AlfColorEnum.LightSoft, AlfColorEnum.LightSoftHover, AlfColorEnum.Gray600);
        case AlfColorVariantEnum.LightGhost:
            return ghost(v, AlfColorEnum.Gray600, AlfColorEnum.LightSoft);
        case AlfColorVariantEnum.LightCrystal:   
            return crystal(v, AlfColorEnum.LightCrystal, AlfColorEnum.LightCrystalHover, AlfColorEnum.Gray600);

        default:
            return solid(v, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover);
    }
};
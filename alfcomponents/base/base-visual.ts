import { AlfButtonVisualTypeEnum, AlfColorEnum, AlfColorVariantEnum, AlfPxEnum, AlfVisualPredefinedEnum } from '@alfcomponents/enums';
import {
    AlfBorderInterface,
    AlfBorderBaseInterface,
    AlfBackgroundsInterface,
    AlfBackgroundsBaseInterface,
    AlfDisplayAndLayoutInterface,
    AlfDisplayAndLayoutBaseInterface,
    AlfMarginInterface,
    AlfMarginBaseInterface,
    AlfPaddingBaseInterface,
    AlfPaddingInterface,
    AlfShadowsBaseInterface,
    AlfShadowsInterface,
    AlfTextStyleInterface,
    AlfTextStyleStateBaseInterface,
    AlfTypographyBaseInterface,
    AlfTypographyInterface,
    AlfTransformBaseInterface,
    AlfTransformInterface,
    AlfOutlineBaseInterface,
    AlfOutlineInterface
} from '@alfcomponents/interfaces';
import { MainVisualStyleInterface, resolveDefaultVisual } from './default-visual';
export type { MainVisualStyleInterface } from './default-visual';

/**
 * Estructura base de colores visuales por estado.
 */
export interface AlfVisualResolvedInterface {
    readonly backgroundStyle: string;
    readonly rippleConf: {
        readonly color: AlfColorEnum;
    };
}

/**
 * Obtiene la configuracion visual base por variante de color.
 * Si no existe, aplica fallback a Primary.
 */
export const getPredefinedVisualType = (
    type: AlfColorVariantEnum,
    predefined?: AlfVisualPredefinedEnum,
    visualType?: AlfButtonVisualTypeEnum,
): MainVisualStyleInterface => {
    return resolveDefaultVisual({
        colorVariant: type,
        predefined,
        visualType,
    });
};

/**
 * Resuelve el estilo inline (variables CSS) para un prefijo y variante visual.
 * Devuelve string listo para `[style]` en template.
 */
export const visualBackgroundColorBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly predefined?: AlfVisualPredefinedEnum;
    readonly visualType?: AlfButtonVisualTypeEnum;
}): string => {
    return visualBackgroundBase(prefix, {
        type: input.type,
        predefined: input.predefined,
        visualType: input.visualType,
    });
};

/**
 * Resuelve variables CSS para background por estado.
 * Mantiene compatibilidad con `--*-bg`, `--*-bg-hover`, `--*-bg-active`.
 */
export const visualBackgroundBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly predefined?: AlfVisualPredefinedEnum;
    readonly visualType?: AlfButtonVisualTypeEnum;
    readonly backgrounds?: AlfBackgroundsInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type, input.predefined, input.visualType);
    const predefinedBackgrounds = selectedVisual.backgrounds;
    const defaultBg = predefinedBackgrounds?.default?.backgroundColor ?? AlfColorEnum.Primary;
    const hoverBg = predefinedBackgrounds?.hover?.backgroundColor ?? defaultBg;
    const activeBg = predefinedBackgrounds?.active?.backgroundColor ?? hoverBg;
    const focusBg = predefinedBackgrounds?.focus?.backgroundColor ?? defaultBg;
    const disabledBg = predefinedBackgrounds?.disabled?.backgroundColor ?? defaultBg;

    const backgrounds = input.backgrounds;
    const declarations: string[] = [];

    const addState = (statePrefix: string, state?: AlfBackgroundsBaseInterface): void => {
        if (!state) {
            return;
        }

        if (state.backgroundColor !== undefined) declarations.push(`${statePrefix}-color: ${state.backgroundColor};`);
        if (state.backgroundImage !== undefined) declarations.push(`${statePrefix}-img: ${state.backgroundImage};`);
        if (state.backgroundSize !== undefined) declarations.push(`${statePrefix}-size: ${state.backgroundSize};`);
        if (state.backgroundPosition !== undefined) declarations.push(`${statePrefix}-pos: ${state.backgroundPosition};`);
        if (state.backgroundRepeat !== undefined) declarations.push(`${statePrefix}-repeat: ${state.backgroundRepeat};`);
        if (state.backgroundAttachment !== undefined) declarations.push(`${statePrefix}-attachment: ${state.backgroundAttachment};`);
        if (state.backgroundClip !== undefined) declarations.push(`${statePrefix}-clip: ${state.backgroundClip};`);
    };

    const defaultState: AlfBackgroundsBaseInterface = {
        ...predefinedBackgrounds?.default,
        ...backgrounds?.default,
        backgroundColor: backgrounds?.default?.backgroundColor ?? predefinedBackgrounds?.default?.backgroundColor ?? defaultBg,
    };
    const hoverState: AlfBackgroundsBaseInterface = {
        ...predefinedBackgrounds?.hover,
        ...backgrounds?.hover,
        backgroundColor: backgrounds?.hover?.backgroundColor ?? predefinedBackgrounds?.hover?.backgroundColor ?? hoverBg,
    };
    const activeState: AlfBackgroundsBaseInterface = {
        ...predefinedBackgrounds?.active,
        ...backgrounds?.active,
        backgroundColor: backgrounds?.active?.backgroundColor ?? predefinedBackgrounds?.active?.backgroundColor ?? activeBg,
    };
    const focusState: AlfBackgroundsBaseInterface = {
        ...predefinedBackgrounds?.focus,
        ...backgrounds?.focus,
        backgroundColor: backgrounds?.focus?.backgroundColor ?? predefinedBackgrounds?.focus?.backgroundColor ?? focusBg,
    };
    const disabledState: AlfBackgroundsBaseInterface = {
        ...predefinedBackgrounds?.disabled,
        ...backgrounds?.disabled,
        backgroundColor: backgrounds?.disabled?.backgroundColor ?? predefinedBackgrounds?.disabled?.backgroundColor ?? disabledBg,
    };

    addState(`${prefix}-bg`, defaultState);
    addState(`${prefix}-bg-hover`, hoverState);
    addState(`${prefix}-bg-active`, activeState);
    addState(`${prefix}-bg-focus`, focusState);
    addState(`${prefix}-bg-disabled`, disabledState);

    // Compatibilidad con variables legacy (solo color por estado)
    declarations.push(`${prefix}-bg: ${defaultState.backgroundColor ?? defaultBg};`);
    declarations.push(`${prefix}-bg-hover: ${hoverState.backgroundColor ?? hoverBg};`);
    declarations.push(`${prefix}-bg-active: ${activeState.backgroundColor ?? activeBg};`);

    return declarations.join(' ');
};

/**
 * Resuelve el color base del ripple según variante visual.
 * Se usa para construir la config de `alfRipple`.
 */
export const visualRippleColorBase = (input: {
    readonly type: AlfColorVariantEnum;
    readonly predefined?: AlfVisualPredefinedEnum;
    readonly visualType?: AlfButtonVisualTypeEnum;
}): AlfColorEnum => {
    const selectedVisual = getPredefinedVisualType(input.type, input.predefined, input.visualType);
    return selectedVisual?.ripple?.backgroundColor ?? AlfColorEnum.PrimaryHover;
};

/**
 * Resuelve variables CSS para borde por estado.
 * Se aplican en SCSS con pseudoclases (:hover, :active, :focus-visible, :disabled).
 */
export const visualBorderBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type?: AlfColorVariantEnum;
    readonly predefined?: AlfVisualPredefinedEnum;
    readonly visualType?: AlfButtonVisualTypeEnum;
    readonly border?: AlfBorderInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(
        input.type ?? AlfColorVariantEnum.Default,
        input.predefined,
        input.visualType,
    );
    const predefinedBorder = selectedVisual.border;
    const defaultBorderColor = predefinedBorder?.default?.borderColor ?? AlfColorEnum.Primary;
    const hoverBorderColor = predefinedBorder?.hover?.borderColor ?? defaultBorderColor;
    const activeBorderColor = predefinedBorder?.active?.borderColor ?? hoverBorderColor;
    const defaultBorderWidth = predefinedBorder?.default?.borderWidth ?? AlfPxEnum.Px1;
    const hoverBorderWidth = predefinedBorder?.hover?.borderWidth ?? defaultBorderWidth;
    const activeBorderWidth = predefinedBorder?.active?.borderWidth ?? hoverBorderWidth;
    const focusBorderWidth = defaultBorderWidth;
    const disabledBorderWidth = defaultBorderWidth;
    const focusBorderColor = defaultBorderColor;
    const disabledBorderColor = defaultBorderColor;

    const border = input.border;
    const declarations: string[] = [];

    const addState = (statePrefix: string, state?: AlfBorderBaseInterface): void => {
        if (!state) {
            return;
        }

        if (state.borderWidth !== undefined) declarations.push(`${statePrefix}-width: ${state.borderWidth};`);
        if (state.borderTopWidth !== undefined) declarations.push(`${statePrefix}-top-width: ${state.borderTopWidth};`);
        if (state.borderRightWidth !== undefined) declarations.push(`${statePrefix}-right-width: ${state.borderRightWidth};`);
        if (state.borderBottomWidth !== undefined) declarations.push(`${statePrefix}-bottom-width: ${state.borderBottomWidth};`);
        if (state.borderLeftWidth !== undefined) declarations.push(`${statePrefix}-left-width: ${state.borderLeftWidth};`);

        if (state.borderStyle !== undefined) declarations.push(`${statePrefix}-style: ${state.borderStyle};`);
        if (state.borderTopStyle !== undefined) declarations.push(`${statePrefix}-top-style: ${state.borderTopStyle};`);
        if (state.borderRightStyle !== undefined) declarations.push(`${statePrefix}-right-style: ${state.borderRightStyle};`);
        if (state.borderBottomStyle !== undefined) declarations.push(`${statePrefix}-bottom-style: ${state.borderBottomStyle};`);
        if (state.borderLeftStyle !== undefined) declarations.push(`${statePrefix}-left-style: ${state.borderLeftStyle};`);

        if (state.borderColor !== undefined) declarations.push(`${statePrefix}-color: ${state.borderColor};`);
        if (state.borderTopColor !== undefined) declarations.push(`${statePrefix}-top-color: ${state.borderTopColor};`);
        if (state.borderRightColor !== undefined) declarations.push(`${statePrefix}-right-color: ${state.borderRightColor};`);
        if (state.borderBottomColor !== undefined) declarations.push(`${statePrefix}-bottom-color: ${state.borderBottomColor};`);
        if (state.borderLeftColor !== undefined) declarations.push(`${statePrefix}-left-color: ${state.borderLeftColor};`);

        if (state.borderRadius !== undefined) declarations.push(`${statePrefix}-radius: ${state.borderRadius};`);
        if (state.borderTopLeftRadius !== undefined) declarations.push(`${statePrefix}-top-left-radius: ${state.borderTopLeftRadius};`);
        if (state.borderTopRightRadius !== undefined) declarations.push(`${statePrefix}-top-right-radius: ${state.borderTopRightRadius};`);
        if (state.borderBottomRightRadius !== undefined) declarations.push(`${statePrefix}-bottom-right-radius: ${state.borderBottomRightRadius};`);
        if (state.borderBottomLeftRadius !== undefined) declarations.push(`${statePrefix}-bottom-left-radius: ${state.borderBottomLeftRadius};`);

        if (state.outlineWidth !== undefined) declarations.push(`${statePrefix}-outline-width: ${state.outlineWidth};`);
        if (state.outlineStyle !== undefined) declarations.push(`${statePrefix}-outline-style: ${state.outlineStyle};`);
        if (state.outlineColor !== undefined) declarations.push(`${statePrefix}-outline-color: ${state.outlineColor};`);
        if (state.outlineOffset !== undefined) declarations.push(`${statePrefix}-outline-offset: ${state.outlineOffset};`);
        if (state.boxSizing !== undefined) declarations.push(`${statePrefix}-box-sizing: ${state.boxSizing};`);
    };

    const defaultState: AlfBorderBaseInterface = {
        ...predefinedBorder?.default,
        ...border?.default,
        borderWidth: border?.default?.borderWidth ?? predefinedBorder?.default?.borderWidth ?? defaultBorderWidth,
        borderColor: border?.default?.borderColor ?? predefinedBorder?.default?.borderColor ?? defaultBorderColor,
    };
    const hoverState: AlfBorderBaseInterface = {
        ...predefinedBorder?.hover,
        ...border?.hover,
        borderWidth: border?.hover?.borderWidth ?? predefinedBorder?.hover?.borderWidth ?? hoverBorderWidth,
        borderColor: border?.hover?.borderColor ?? predefinedBorder?.hover?.borderColor ?? hoverBorderColor,
    };
    const activeState: AlfBorderBaseInterface = {
        ...predefinedBorder?.active,
        ...border?.active,
        borderWidth: border?.active?.borderWidth ?? predefinedBorder?.active?.borderWidth ?? activeBorderWidth,
        borderColor: border?.active?.borderColor ?? predefinedBorder?.active?.borderColor ?? activeBorderColor,
    };
    const focusState: AlfBorderBaseInterface = {
        ...predefinedBorder?.focus,
        ...border?.focus,
        borderWidth: border?.focus?.borderWidth ?? predefinedBorder?.focus?.borderWidth ?? focusBorderWidth,
        borderColor: border?.focus?.borderColor ?? predefinedBorder?.focus?.borderColor ?? focusBorderColor,
    };
    const disabledState: AlfBorderBaseInterface = {
        ...predefinedBorder?.disabled,
        ...border?.disabled,
        borderWidth: border?.disabled?.borderWidth ?? predefinedBorder?.disabled?.borderWidth ?? disabledBorderWidth,
        borderColor: border?.disabled?.borderColor ?? predefinedBorder?.disabled?.borderColor ?? disabledBorderColor,
    };

    addState(`${prefix}-border`, defaultState);
    addState(`${prefix}-border-hover`, hoverState);
    addState(`${prefix}-border-active`, activeState);
    addState(`${prefix}-border-focus`, focusState);
    addState(`${prefix}-border-disabled`, disabledState);

    if (border?.default?.boxSizing !== undefined) {
        declarations.push(`${prefix}-box-sizing: ${border.default.boxSizing};`);
    }

    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para display/layout por estado.
 * Se aplican en SCSS con pseudoclases (:hover, :focus-visible, :disabled).
 */
export const visualDisplayAndLayoutBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type?: AlfColorVariantEnum;
    readonly predefined?: AlfVisualPredefinedEnum;
    readonly visualType?: AlfButtonVisualTypeEnum;
    readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(
        input.type ?? AlfColorVariantEnum.Default,
        input.predefined,
        input.visualType,
    );
    const predefinedDisplayAndLayout = selectedVisual.displayAndLayout;
    const displayAndLayout: AlfDisplayAndLayoutInterface = {
        default: {
            ...predefinedDisplayAndLayout?.default,
            ...input.displayAndLayout?.default,
        },
        hover: {
            ...predefinedDisplayAndLayout?.hover,
            ...input.displayAndLayout?.hover,
        },
        focus: {
            ...predefinedDisplayAndLayout?.focus,
            ...input.displayAndLayout?.focus,
        },
        disabled: {
            ...predefinedDisplayAndLayout?.disabled,
            ...input.displayAndLayout?.disabled,
        },
    };
    const declarations: string[] = [];

    const addState = (statePrefix: string, state?: AlfDisplayAndLayoutBaseInterface): void => {
        if (!state) {
            return;
        }

        if (state.display !== undefined) declarations.push(`${statePrefix}-display: ${state.display};`);
        if (state.position !== undefined) declarations.push(`${statePrefix}-position: ${state.position};`);
        if (state.top !== undefined) declarations.push(`${statePrefix}-top: ${state.top};`);
        if (state.right !== undefined) declarations.push(`${statePrefix}-right: ${state.right};`);
        if (state.bottom !== undefined) declarations.push(`${statePrefix}-bottom: ${state.bottom};`);
        if (state.left !== undefined) declarations.push(`${statePrefix}-left: ${state.left};`);
        if (state.zIndex !== undefined) declarations.push(`${statePrefix}-z-index: ${state.zIndex};`);

        if (state.width !== undefined) declarations.push(`${statePrefix}-width: ${state.width};`);
        if (state.height !== undefined) declarations.push(`${statePrefix}-height: ${state.height};`);
        if (state.minWidth !== undefined) declarations.push(`${statePrefix}-min-width: ${state.minWidth};`);
        if (state.maxWidth !== undefined) declarations.push(`${statePrefix}-max-width: ${state.maxWidth};`);
        if (state.minHeight !== undefined) declarations.push(`${statePrefix}-min-height: ${state.minHeight};`);
        if (state.maxHeight !== undefined) declarations.push(`${statePrefix}-max-height: ${state.maxHeight};`);

        if (state.overflow !== undefined) declarations.push(`${statePrefix}-overflow: ${state.overflow};`);
        if (state.overflowX !== undefined) declarations.push(`${statePrefix}-overflow-x: ${state.overflowX};`);
        if (state.overflowY !== undefined) declarations.push(`${statePrefix}-overflow-y: ${state.overflowY};`);
        if (state.visibility !== undefined) declarations.push(`${statePrefix}-visibility: ${state.visibility};`);
        if (state.objectFit !== undefined) declarations.push(`${statePrefix}-object-fit: ${state.objectFit};`);

        if (state.flexDirection !== undefined) declarations.push(`${statePrefix}-flex-direction: ${state.flexDirection};`);
        if (state.justifyContent !== undefined) declarations.push(`${statePrefix}-justify-content: ${state.justifyContent};`);
        if (state.alignItems !== undefined) declarations.push(`${statePrefix}-align-items: ${state.alignItems};`);
        if (state.gap !== undefined) declarations.push(`${statePrefix}-gap: ${state.gap};`);
        if (state.flexWrap !== undefined) declarations.push(`${statePrefix}-flex-wrap: ${state.flexWrap};`);
    };

    addState(`${prefix}-layout`, displayAndLayout?.default);
    addState(`${prefix}-layout-hover`, displayAndLayout?.hover);
    addState(`${prefix}-layout-focus`, displayAndLayout?.focus);
    addState(`${prefix}-layout-disabled`, displayAndLayout?.disabled);

    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para margin por estado.
 * Se aplican en SCSS con pseudoclases (:hover, :active, :focus-visible, :disabled).
 */
export const visualMarginBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type?: AlfColorVariantEnum;
    readonly predefined?: AlfVisualPredefinedEnum;
    readonly visualType?: AlfButtonVisualTypeEnum;
    readonly margin?: AlfMarginInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(
        input.type ?? AlfColorVariantEnum.Default,
        input.predefined,
        input.visualType,
    );
    const predefinedMargin = selectedVisual.margin;
    const margin: AlfMarginInterface = {
        default: {
            ...predefinedMargin?.default,
            ...input.margin?.default,
        },
        hover: {
            ...predefinedMargin?.hover,
            ...input.margin?.hover,
        },
        active: {
            ...predefinedMargin?.active,
            ...input.margin?.active,
        },
        focus: {
            ...predefinedMargin?.focus,
            ...input.margin?.focus,
        },
        disabled: {
            ...predefinedMargin?.disabled,
            ...input.margin?.disabled,
        },
    };
    const declarations: string[] = [];

    const addState = (statePrefix: string, state?: AlfMarginBaseInterface): void => {
        if (!state) {
            return;
        }

        if (state.margin !== undefined) declarations.push(`${statePrefix}: ${state.margin};`);
        if (state.marginTop !== undefined) declarations.push(`${statePrefix}-top: ${state.marginTop};`);
        if (state.marginRight !== undefined) declarations.push(`${statePrefix}-right: ${state.marginRight};`);
        if (state.marginBottom !== undefined) declarations.push(`${statePrefix}-bottom: ${state.marginBottom};`);
        if (state.marginLeft !== undefined) declarations.push(`${statePrefix}-left: ${state.marginLeft};`);
    };

    addState(`${prefix}-margin`, margin?.default);
    addState(`${prefix}-margin-hover`, margin?.hover);
    addState(`${prefix}-margin-active`, margin?.active);
    addState(`${prefix}-margin-focus`, margin?.focus);
    addState(`${prefix}-margin-disabled`, margin?.disabled);

    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para padding por estado.
 * Se aplican en SCSS con pseudoclases (:hover, :active, :focus-visible, :disabled).
 */
export const visualPaddingBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type?: AlfColorVariantEnum;
    readonly predefined?: AlfVisualPredefinedEnum;
    readonly visualType?: AlfButtonVisualTypeEnum;
    readonly padding?: AlfPaddingInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(
        input.type ?? AlfColorVariantEnum.Default,
        input.predefined,
        input.visualType,
    );
    const predefinedPadding = selectedVisual.padding;
    const padding: AlfPaddingInterface = {
        default: {
            ...predefinedPadding?.default,
            ...input.padding?.default,
        },
        hover: {
            ...predefinedPadding?.hover,
            ...input.padding?.hover,
        },
        active: {
            ...predefinedPadding?.active,
            ...input.padding?.active,
        },
        focus: {
            ...predefinedPadding?.focus,
            ...input.padding?.focus,
        },
        disabled: {
            ...predefinedPadding?.disabled,
            ...input.padding?.disabled,
        },
    };
    const declarations: string[] = [];

    const addState = (statePrefix: string, state?: AlfPaddingBaseInterface): void => {
        if (!state) {
            return;
        }

        if (state.padding !== undefined) declarations.push(`${statePrefix}: ${state.padding};`);
        if (state.paddingTop !== undefined) declarations.push(`${statePrefix}-top: ${state.paddingTop};`);
        if (state.paddingRight !== undefined) declarations.push(`${statePrefix}-right: ${state.paddingRight};`);
        if (state.paddingBottom !== undefined) declarations.push(`${statePrefix}-bottom: ${state.paddingBottom};`);
        if (state.paddingLeft !== undefined) declarations.push(`${statePrefix}-left: ${state.paddingLeft};`);
    };

    addState(`${prefix}-padding`, padding?.default);
    addState(`${prefix}-padding-hover`, padding?.hover);
    addState(`${prefix}-padding-active`, padding?.active);
    addState(`${prefix}-padding-focus`, padding?.focus);
    addState(`${prefix}-padding-disabled`, padding?.disabled);

    return declarations.join(' ');
};

const shadowColorPattern = /rgba?\([^)]+\)|rgb\([^)]+\)|#[0-9a-fA-F]{3,8}\b/g;

const normalizeShadowColor = (shadowValue: string, color?: AlfColorEnum): string => {
    if (!color || shadowValue === 'none') {
        return shadowValue;
    }

    if (shadowColorPattern.test(shadowValue)) {
        shadowColorPattern.lastIndex = 0;
        return shadowValue.replace(shadowColorPattern, color);
    }

    return shadowValue
        .split(',')
        .map((segment) => `${segment.trim()} ${color}`)
        .join(', ');
};

const applyShadowInset = (shadowValue: string, inset?: boolean): string => {
    if (!inset || shadowValue === 'none') {
        return shadowValue;
    }

    return shadowValue
        .split(',')
        .map((segment) => {
            const current = segment.trim();
            return current.startsWith('inset') ? current : `inset ${current}`;
        })
        .join(', ');
};

/**
 * Resuelve variables CSS para shadows por estado.
 * Se aplican en SCSS con pseudoclases (:hover, :active, :focus-visible, :disabled).
 */
export const visualShadowsBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type?: AlfColorVariantEnum;
    readonly predefined?: AlfVisualPredefinedEnum;
    readonly visualType?: AlfButtonVisualTypeEnum;
    readonly shadows?: AlfShadowsInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(
        input.type ?? AlfColorVariantEnum.Default,
        input.predefined,
        input.visualType,
    );
    const predefinedShadows = selectedVisual.shadows;
    const shadows: AlfShadowsInterface = {
        default: {
            ...predefinedShadows?.default,
            ...input.shadows?.default,
        },
        hover: {
            ...predefinedShadows?.hover,
            ...input.shadows?.hover,
        },
        active: {
            ...predefinedShadows?.active,
            ...input.shadows?.active,
        },
        focus: {
            ...predefinedShadows?.focus,
            ...input.shadows?.focus,
        },
        disabled: {
            ...predefinedShadows?.disabled,
            ...input.shadows?.disabled,
        },
    };
    const declarations: string[] = [];

    const addState = (statePrefix: string, state?: AlfShadowsBaseInterface): void => {
        if (!state) {
            return;
        }

        if (state.boxShadow !== undefined) {
            const withColor = normalizeShadowColor(state.boxShadow, state.boxShadowColor);
            const withInset = applyShadowInset(withColor, state.boxShadowInset);
            declarations.push(`${statePrefix}-box-shadow: ${withInset};`);
        }

        if (state.textShadow !== undefined) {
            const withTextColor = normalizeShadowColor(state.textShadow, state.textShadowColor);
            declarations.push(`${statePrefix}-text-shadow: ${withTextColor};`);
        }
    };

    addState(`${prefix}-shadows`, shadows?.default);
    addState(`${prefix}-shadows-hover`, shadows?.hover);
    addState(`${prefix}-shadows-active`, shadows?.active);
    addState(`${prefix}-shadows-focus`, shadows?.focus);
    addState(`${prefix}-shadows-disabled`, shadows?.disabled);

    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para estilos de texto por estado.
 * Se aplican en SCSS con pseudoclases (:hover, :active, :focus-visible).
 */
export const visualTextStyleBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type?: AlfColorVariantEnum;
    readonly predefined?: AlfVisualPredefinedEnum;
    readonly visualType?: AlfButtonVisualTypeEnum;
    readonly textStyle?: AlfTextStyleInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(
        input.type ?? AlfColorVariantEnum.Default,
        input.predefined,
        input.visualType,
    );
    const predefinedTextStyle = selectedVisual.textStyle;
    const textStyle: AlfTextStyleInterface = {
        default: {
            ...predefinedTextStyle?.default,
            ...input.textStyle?.default,
        },
        hover: {
            ...predefinedTextStyle?.hover,
            ...input.textStyle?.hover,
        },
        active: {
            ...predefinedTextStyle?.active,
            ...input.textStyle?.active,
        },
        focus: {
            ...predefinedTextStyle?.focus,
            ...input.textStyle?.focus,
        },
    };
    const declarations: string[] = [];

    const addState = (statePrefix: string, state?: AlfTextStyleStateBaseInterface): void => {
        if (!state) {
            return;
        }

        if (state.color !== undefined) declarations.push(`${statePrefix}-color: ${state.color};`);
        if (state.textShadow !== undefined) declarations.push(`${statePrefix}-text-shadow: ${state.textShadow};`);
        if (state.textDecoration !== undefined) declarations.push(`${statePrefix}-text-decoration: ${state.textDecoration};`);
        if (state.textTransform !== undefined) declarations.push(`${statePrefix}-text-transform: ${state.textTransform};`);
    };

    addState(`${prefix}-text`, textStyle?.default);
    addState(`${prefix}-text-hover`, textStyle?.hover);
    addState(`${prefix}-text-active`, textStyle?.active);
    addState(`${prefix}-text-focus`, textStyle?.focus);

    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para typography por estado.
 * Se aplican en SCSS con pseudoclases (:hover, :active, :focus-visible, :disabled).
 */
export const visualTypographyBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type?: AlfColorVariantEnum;
    readonly predefined?: AlfVisualPredefinedEnum;
    readonly visualType?: AlfButtonVisualTypeEnum;
    readonly typography?: AlfTypographyInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(
        input.type ?? AlfColorVariantEnum.Default,
        input.predefined,
        input.visualType,
    );
    const predefinedTypography = selectedVisual.typography;
    const typography: AlfTypographyInterface = {
        default: {
            ...predefinedTypography?.default,
            ...input.typography?.default,
        },
        hover: {
            ...predefinedTypography?.hover,
            ...input.typography?.hover,
        },
        active: {
            ...predefinedTypography?.active,
            ...input.typography?.active,
        },
        focus: {
            ...predefinedTypography?.focus,
            ...input.typography?.focus,
        },
        disabled: {
            ...predefinedTypography?.disabled,
            ...input.typography?.disabled,
        },
    };
    const declarations: string[] = [];

    const addState = (statePrefix: string, state?: AlfTypographyBaseInterface): void => {
        if (!state) {
            return;
        }

        if (state.fontSize !== undefined) declarations.push(`${statePrefix}-font-size: ${state.fontSize};`);
        if (state.fontWeight !== undefined) declarations.push(`${statePrefix}-font-weight: ${state.fontWeight};`);
        if (state.fontFamily !== undefined) declarations.push(`${statePrefix}-font-family: ${state.fontFamily};`);
        if (state.lineHeight !== undefined) declarations.push(`${statePrefix}-line-height: ${state.lineHeight};`);
        if (state.letterSpacing !== undefined) declarations.push(`${statePrefix}-letter-spacing: ${state.letterSpacing};`);
        if (state.textAlign !== undefined) declarations.push(`${statePrefix}-text-align: ${state.textAlign};`);
        if (state.textDecoration !== undefined) declarations.push(`${statePrefix}-text-decoration: ${state.textDecoration};`);
        if (state.textTransform !== undefined) declarations.push(`${statePrefix}-text-transform: ${state.textTransform};`);
        if (state.color !== undefined) declarations.push(`${statePrefix}-color: ${state.color};`);
        if (state.whiteSpace !== undefined) declarations.push(`${statePrefix}-white-space: ${state.whiteSpace};`);
        if (state.wordBreak !== undefined) declarations.push(`${statePrefix}-word-break: ${state.wordBreak};`);
        if (state.overflowWrap !== undefined) declarations.push(`${statePrefix}-overflow-wrap: ${state.overflowWrap};`);
        if (state.verticalAlign !== undefined) declarations.push(`${statePrefix}-vertical-align: ${state.verticalAlign};`);
        if (state.fontStyle !== undefined) declarations.push(`${statePrefix}-font-style: ${state.fontStyle};`);
        if (state.textOverflow !== undefined) declarations.push(`${statePrefix}-text-overflow: ${state.textOverflow};`);
        if (state.opacity !== undefined) declarations.push(`${statePrefix}-opacity: ${state.opacity};`);
        if (state.textShadow !== undefined) declarations.push(`${statePrefix}-text-shadow: ${state.textShadow};`);
    };

    addState(`${prefix}-typography`, typography?.default);
    addState(`${prefix}-typography-hover`, typography?.hover);
    addState(`${prefix}-typography-active`, typography?.active);
    addState(`${prefix}-typography-focus`, typography?.focus);
    addState(`${prefix}-typography-disabled`, typography?.disabled);

    return declarations.join(' ');
};

const buildTransformExpression = (state: AlfTransformBaseInterface): string | undefined => {
    const transforms: string[] = [];

    if (state.translateX !== undefined) transforms.push(`translateX(${state.translateX})`);
    if (state.translateY !== undefined) transforms.push(`translateY(${state.translateY})`);
    if (state.translateZ !== undefined) transforms.push(`translateZ(${state.translateZ})`);

    if (state.scale !== undefined) transforms.push(`scale(${state.scale})`);
    if (state.scaleX !== undefined) transforms.push(`scaleX(${state.scaleX})`);
    if (state.scaleY !== undefined) transforms.push(`scaleY(${state.scaleY})`);
    if (state.scaleZ !== undefined) transforms.push(`scaleZ(${state.scaleZ})`);

    if (state.rotate !== undefined) transforms.push(`rotate(${state.rotate}deg)`);
    if (state.rotateX !== undefined) transforms.push(`rotateX(${state.rotateX}deg)`);
    if (state.rotateY !== undefined) transforms.push(`rotateY(${state.rotateY}deg)`);
    if (state.rotateZ !== undefined) transforms.push(`rotateZ(${state.rotateZ}deg)`);

    if (state.skewX !== undefined) transforms.push(`skewX(${state.skewX}deg)`);
    if (state.skewY !== undefined) transforms.push(`skewY(${state.skewY}deg)`);

    return transforms.length ? transforms.join(' ') : undefined;
};

/**
 * Resuelve variables CSS para transform por estado.
 * Se aplican en SCSS con pseudoclases (:hover, :active, :focus-visible).
 */
export const visualTransformBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type?: AlfColorVariantEnum;
    readonly predefined?: AlfVisualPredefinedEnum;
    readonly visualType?: AlfButtonVisualTypeEnum;
    readonly transform?: AlfTransformInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(
        input.type ?? AlfColorVariantEnum.Default,
        input.predefined,
        input.visualType,
    );
    const predefinedTransform = selectedVisual.transform;
    const transform: AlfTransformInterface = {
        default: {
            ...predefinedTransform?.default,
            ...input.transform?.default,
        },
        hover: {
            ...predefinedTransform?.hover,
            ...input.transform?.hover,
        },
        active: {
            ...predefinedTransform?.active,
            ...input.transform?.active,
        },
        focus: {
            ...predefinedTransform?.focus,
            ...input.transform?.focus,
        },
    };
    const declarations: string[] = [];

    const addState = (statePrefix: string, state?: AlfTransformBaseInterface): void => {
        if (!state) {
            return;
        }

        const transformExpr = buildTransformExpression(state);
        if (transformExpr !== undefined) declarations.push(`${statePrefix}-transform: ${transformExpr};`);
        if (state.perspective !== undefined) declarations.push(`${statePrefix}-perspective: ${state.perspective};`);
        if (state.transformStyle !== undefined) declarations.push(`${statePrefix}-transform-style: ${state.transformStyle};`);
        if (state.backfaceVisibility !== undefined) declarations.push(`${statePrefix}-backface-visibility: ${state.backfaceVisibility};`);
    };

    addState(`${prefix}-transform`, transform?.default);
    addState(`${prefix}-transform-hover`, transform?.hover);
    addState(`${prefix}-transform-active`, transform?.active);
    addState(`${prefix}-transform-focus`, transform?.focus);

    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para outline por estado.
 * Se aplican en SCSS con pseudoclases (:hover, :focus-visible, :disabled).
 */
export const visualOutlineBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type?: AlfColorVariantEnum;
    readonly predefined?: AlfVisualPredefinedEnum;
    readonly visualType?: AlfButtonVisualTypeEnum;
    readonly outline?: AlfOutlineInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(
        input.type ?? AlfColorVariantEnum.Default,
        input.predefined,
        input.visualType,
    );
    const predefinedOutline = selectedVisual.outline;
    const outline: AlfOutlineInterface = {
        default: {
            ...predefinedOutline?.default,
            ...input.outline?.default,
        },
        hover: {
            ...predefinedOutline?.hover,
            ...input.outline?.hover,
        },
        focus: {
            ...predefinedOutline?.focus,
            ...input.outline?.focus,
        },
        disabled: {
            ...predefinedOutline?.disabled,
            ...input.outline?.disabled,
        },
    };
    const declarations: string[] = [];

    const addState = (statePrefix: string, state?: AlfOutlineBaseInterface): void => {
        if (!state) {
            return;
        }

        if (state.outlineWidth !== undefined) declarations.push(`${statePrefix}-width: ${state.outlineWidth};`);
        if (state.outlineStyle !== undefined) declarations.push(`${statePrefix}-style: ${state.outlineStyle};`);
        if (state.outlineColor !== undefined) declarations.push(`${statePrefix}-color: ${state.outlineColor};`);
        if (state.outlineOffset !== undefined) declarations.push(`${statePrefix}-offset: ${state.outlineOffset};`);
    };

    addState(`${prefix}-outline`, outline?.default);
    addState(`${prefix}-outline-hover`, outline?.hover);
    addState(`${prefix}-outline-focus`, outline?.focus);
    addState(`${prefix}-outline-disabled`, outline?.disabled);

    return declarations.join(' ');
};

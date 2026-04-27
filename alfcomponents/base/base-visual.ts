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
    AlfOutlineInterface,
    AlfAnimateCssInterface
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

    const addState = (statePrefix: string, state?: AlfBackgroundsBaseInterface, defaultState?: AlfBackgroundsBaseInterface): void => {
        if (!state) {
            return;
        }

        const isHoverOrActive = statePrefix.includes('-hover') || statePrefix.includes('-active') || statePrefix.includes('-focus') || statePrefix.includes('-disabled');
        const shouldAdd = (val: any, defVal: any) => val !== undefined && (!isHoverOrActive || val !== defVal);

        if (shouldAdd(state.backgroundColor, defaultState?.backgroundColor)) declarations.push(`${statePrefix}-color: ${state.backgroundColor};`);
        if (shouldAdd(state.backgroundImage, defaultState?.backgroundImage)) declarations.push(`${statePrefix}-img: ${state.backgroundImage};`);
        if (shouldAdd(state.backgroundSize, defaultState?.backgroundSize)) declarations.push(`${statePrefix}-size: ${state.backgroundSize};`);
        if (shouldAdd(state.backgroundPosition, defaultState?.backgroundPosition)) declarations.push(`${statePrefix}-pos: ${state.backgroundPosition};`);
        if (shouldAdd(state.backgroundRepeat, defaultState?.backgroundRepeat)) declarations.push(`${statePrefix}-repeat: ${state.backgroundRepeat};`);
        if (shouldAdd(state.backgroundAttachment, defaultState?.backgroundAttachment)) declarations.push(`${statePrefix}-attachment: ${state.backgroundAttachment};`);
        if (shouldAdd(state.backgroundClip, defaultState?.backgroundClip)) declarations.push(`${statePrefix}-clip: ${state.backgroundClip};`);
    };

    const defaultState: AlfBackgroundsBaseInterface = {
        ...predefinedBackgrounds?.default,
        ...backgrounds?.default,
        backgroundColor: backgrounds?.default?.backgroundColor ?? predefinedBackgrounds?.default?.backgroundColor ?? defaultBg,
    };
    const hoverState: AlfBackgroundsBaseInterface = {
        ...predefinedBackgrounds?.hover,
        ...backgrounds?.hover,
        backgroundColor: backgrounds?.hover?.backgroundColor ?? backgrounds?.default?.backgroundColor ?? predefinedBackgrounds?.hover?.backgroundColor ?? hoverBg,
    };
    const activeState: AlfBackgroundsBaseInterface = {
        ...predefinedBackgrounds?.active,
        ...backgrounds?.active,
        backgroundColor: backgrounds?.active?.backgroundColor ?? backgrounds?.default?.backgroundColor ?? predefinedBackgrounds?.active?.backgroundColor ?? activeBg,
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
    addState(`${prefix}-bg-hover`, hoverState, defaultState);
    addState(`${prefix}-bg-active`, activeState, defaultState);
    addState(`${prefix}-bg-focus`, focusState, defaultState);
    addState(`${prefix}-bg-disabled`, disabledState, defaultState);

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

    const addState = (statePrefix: string, state?: AlfBorderBaseInterface, defaultState?: AlfBorderBaseInterface): void => {
        if (!state) {
            return;
        }

        const isInteractive = statePrefix.includes('-hover') || statePrefix.includes('-active') || statePrefix.includes('-focus') || statePrefix.includes('-disabled');
        const shouldAdd = (val: any, defVal: any) => val !== undefined && (!isInteractive || val !== defVal);

        if (shouldAdd(state.borderWidth, defaultState?.borderWidth)) declarations.push(`${statePrefix}-width: ${state.borderWidth};`);
        if (shouldAdd(state.borderTopWidth, defaultState?.borderTopWidth)) declarations.push(`${statePrefix}-top-width: ${state.borderTopWidth};`);
        if (shouldAdd(state.borderRightWidth, defaultState?.borderRightWidth)) declarations.push(`${statePrefix}-right-width: ${state.borderRightWidth};`);
        if (shouldAdd(state.borderBottomWidth, defaultState?.borderBottomWidth)) declarations.push(`${statePrefix}-bottom-width: ${state.borderBottomWidth};`);
        if (shouldAdd(state.borderLeftWidth, defaultState?.borderLeftWidth)) declarations.push(`${statePrefix}-left-width: ${state.borderLeftWidth};`);

        if (shouldAdd(state.borderStyle, defaultState?.borderStyle)) declarations.push(`${statePrefix}-style: ${state.borderStyle};`);
        if (shouldAdd(state.borderTopStyle, defaultState?.borderTopStyle)) declarations.push(`${statePrefix}-top-style: ${state.borderTopStyle};`);
        if (shouldAdd(state.borderRightStyle, defaultState?.borderRightStyle)) declarations.push(`${statePrefix}-right-style: ${state.borderRightStyle};`);
        if (shouldAdd(state.borderBottomStyle, defaultState?.borderBottomStyle)) declarations.push(`${statePrefix}-bottom-style: ${state.borderBottomStyle};`);
        if (shouldAdd(state.borderLeftStyle, defaultState?.borderLeftStyle)) declarations.push(`${statePrefix}-left-style: ${state.borderLeftStyle};`);

        if (shouldAdd(state.borderColor, defaultState?.borderColor)) declarations.push(`${statePrefix}-color: ${state.borderColor};`);
        if (shouldAdd(state.borderTopColor, defaultState?.borderTopColor)) declarations.push(`${statePrefix}-top-color: ${state.borderTopColor};`);
        if (shouldAdd(state.borderRightColor, defaultState?.borderRightColor)) declarations.push(`${statePrefix}-right-color: ${state.borderRightColor};`);
        if (shouldAdd(state.borderBottomColor, defaultState?.borderBottomColor)) declarations.push(`${statePrefix}-bottom-color: ${state.borderBottomColor};`);
        if (shouldAdd(state.borderLeftColor, defaultState?.borderLeftColor)) declarations.push(`${statePrefix}-left-color: ${state.borderLeftColor};`);

        if (shouldAdd(state.borderRadius, defaultState?.borderRadius)) declarations.push(`${statePrefix}-radius: ${state.borderRadius};`);
        if (shouldAdd(state.borderTopLeftRadius, defaultState?.borderTopLeftRadius)) declarations.push(`${statePrefix}-top-left-radius: ${state.borderTopLeftRadius};`);
        if (shouldAdd(state.borderTopRightRadius, defaultState?.borderTopRightRadius)) declarations.push(`${statePrefix}-top-right-radius: ${state.borderTopRightRadius};`);
        if (shouldAdd(state.borderBottomRightRadius, defaultState?.borderBottomRightRadius)) declarations.push(`${statePrefix}-bottom-right-radius: ${state.borderBottomRightRadius};`);
        if (shouldAdd(state.borderBottomLeftRadius, defaultState?.borderBottomLeftRadius)) declarations.push(`${statePrefix}-bottom-left-radius: ${state.borderBottomLeftRadius};`);

        if (shouldAdd(state.outlineWidth, defaultState?.outlineWidth)) declarations.push(`${statePrefix}-outline-width: ${state.outlineWidth};`);
        if (shouldAdd(state.outlineStyle, defaultState?.outlineStyle)) declarations.push(`${statePrefix}-outline-style: ${state.outlineStyle};`);
        if (shouldAdd(state.outlineColor, defaultState?.outlineColor)) declarations.push(`${statePrefix}-outline-color: ${state.outlineColor};`);
        if (shouldAdd(state.outlineOffset, defaultState?.outlineOffset)) declarations.push(`${statePrefix}-outline-offset: ${state.outlineOffset};`);
        if (shouldAdd(state.boxSizing, defaultState?.boxSizing)) declarations.push(`${statePrefix}-box-sizing: ${state.boxSizing};`);
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
        borderWidth: border?.hover?.borderWidth ?? border?.default?.borderWidth ?? predefinedBorder?.hover?.borderWidth ?? hoverBorderWidth,
        borderColor: border?.hover?.borderColor ?? border?.default?.borderColor ?? predefinedBorder?.hover?.borderColor ?? hoverBorderColor,
    };
    const activeState: AlfBorderBaseInterface = {
        ...predefinedBorder?.active,
        ...border?.active,
        borderWidth: border?.active?.borderWidth ?? border?.default?.borderWidth ?? predefinedBorder?.active?.borderWidth ?? activeBorderWidth,
        borderColor: border?.active?.borderColor ?? border?.default?.borderColor ?? predefinedBorder?.active?.borderColor ?? activeBorderColor,
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
    addState(`${prefix}-border-hover`, hoverState, defaultState);
    addState(`${prefix}-border-active`, activeState, defaultState);
    addState(`${prefix}-border-focus`, focusState, defaultState);
    addState(`${prefix}-border-disabled`, disabledState, defaultState);

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
            ...input.displayAndLayout?.default,
            ...input.displayAndLayout?.hover,
        },
        focus: {
            ...predefinedDisplayAndLayout?.focus,
            ...input.displayAndLayout?.default,
            ...input.displayAndLayout?.focus,
        },
        disabled: {
            ...predefinedDisplayAndLayout?.disabled,
            ...input.displayAndLayout?.default,
            ...input.displayAndLayout?.disabled,
        },
    };
    const declarations: string[] = [];

    const addState = (statePrefix: string, state?: AlfDisplayAndLayoutBaseInterface, defaultState?: AlfDisplayAndLayoutBaseInterface): void => {
        if (!state) {
            return;
        }

        const isInteractive = statePrefix.includes('-hover') || statePrefix.includes('-focus') || statePrefix.includes('-disabled');
        const shouldAdd = (val: any, defVal: any) => val !== undefined && (!isInteractive || val !== defVal);

        if (shouldAdd(state.display, defaultState?.display)) declarations.push(`${statePrefix}-display: ${state.display};`);
        if (shouldAdd(state.position, defaultState?.position)) declarations.push(`${statePrefix}-position: ${state.position};`);
        if (shouldAdd(state.top, defaultState?.top)) declarations.push(`${statePrefix}-top: ${state.top};`);
        if (shouldAdd(state.right, defaultState?.right)) declarations.push(`${statePrefix}-right: ${state.right};`);
        if (shouldAdd(state.bottom, defaultState?.bottom)) declarations.push(`${statePrefix}-bottom: ${state.bottom};`);
        if (shouldAdd(state.left, defaultState?.left)) declarations.push(`${statePrefix}-left: ${state.left};`);
        if (shouldAdd(state.zIndex, defaultState?.zIndex)) declarations.push(`${statePrefix}-z-index: ${state.zIndex};`);

        if (shouldAdd(state.width, defaultState?.width)) declarations.push(`${statePrefix}-width: ${state.width};`);
        if (shouldAdd(state.height, defaultState?.height)) declarations.push(`${statePrefix}-height: ${state.height};`);
        if (shouldAdd(state.minWidth, defaultState?.minWidth)) declarations.push(`${statePrefix}-min-width: ${state.minWidth};`);
        if (shouldAdd(state.maxWidth, defaultState?.maxWidth)) declarations.push(`${statePrefix}-max-width: ${state.maxWidth};`);
        if (shouldAdd(state.minHeight, defaultState?.minHeight)) declarations.push(`${statePrefix}-min-height: ${state.minHeight};`);
        if (shouldAdd(state.maxHeight, defaultState?.maxHeight)) declarations.push(`${statePrefix}-max-height: ${state.maxHeight};`);

        if (shouldAdd(state.overflow, defaultState?.overflow)) declarations.push(`${statePrefix}-overflow: ${state.overflow};`);
        if (shouldAdd(state.overflowX, defaultState?.overflowX)) declarations.push(`${statePrefix}-overflow-x: ${state.overflowX};`);
        if (shouldAdd(state.overflowY, defaultState?.overflowY)) declarations.push(`${statePrefix}-overflow-y: ${state.overflowY};`);
        if (shouldAdd(state.visibility, defaultState?.visibility)) declarations.push(`${statePrefix}-visibility: ${state.visibility};`);
        if (shouldAdd(state.objectFit, defaultState?.objectFit)) declarations.push(`${statePrefix}-object-fit: ${state.objectFit};`);

        if (shouldAdd(state.flexDirection, defaultState?.flexDirection)) declarations.push(`${statePrefix}-flex-direction: ${state.flexDirection};`);
        if (shouldAdd(state.justifyContent, defaultState?.justifyContent)) declarations.push(`${statePrefix}-justify-content: ${state.justifyContent};`);
        if (shouldAdd(state.alignItems, defaultState?.alignItems)) declarations.push(`${statePrefix}-align-items: ${state.alignItems};`);
        if (shouldAdd(state.gap, defaultState?.gap)) declarations.push(`${statePrefix}-gap: ${state.gap};`);
        if (shouldAdd(state.flexWrap, defaultState?.flexWrap)) declarations.push(`${statePrefix}-flex-wrap: ${state.flexWrap};`);
    };

    addState(`${prefix}-layout`, displayAndLayout?.default);
    addState(`${prefix}-layout-hover`, displayAndLayout?.hover, displayAndLayout?.default);
    addState(`${prefix}-layout-focus`, displayAndLayout?.focus, displayAndLayout?.default);
    addState(`${prefix}-layout-disabled`, displayAndLayout?.disabled, displayAndLayout?.default);

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
            ...input.margin?.default,
            ...input.margin?.hover,
        },
        active: {
            ...predefinedMargin?.active,
            ...input.margin?.default,
            ...input.margin?.active,
        },
        focus: {
            ...predefinedMargin?.focus,
            ...input.margin?.default,
            ...input.margin?.focus,
        },
        disabled: {
            ...predefinedMargin?.disabled,
            ...input.margin?.default,
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
            ...input.padding?.default,
            ...input.padding?.hover,
        },
        active: {
            ...predefinedPadding?.active,
            ...input.padding?.default,
            ...input.padding?.active,
        },
        focus: {
            ...predefinedPadding?.focus,
            ...input.padding?.default,
            ...input.padding?.focus,
        },
        disabled: {
            ...predefinedPadding?.disabled,
            ...input.padding?.default,
            ...input.padding?.disabled,
        },
    };
    const declarations: string[] = [];

    const addState = (statePrefix: string, state?: AlfPaddingBaseInterface, defaultState?: AlfPaddingBaseInterface): void => {
        if (!state) {
            return;
        }

        const isInteractive = statePrefix.includes('-hover') || statePrefix.includes('-active') || statePrefix.includes('-focus') || statePrefix.includes('-disabled');
        const shouldAdd = (val: any, defVal: any) => val !== undefined && (!isInteractive || val !== defVal);

        if (shouldAdd(state.padding, defaultState?.padding)) declarations.push(`${statePrefix}: ${state.padding};`);
        if (shouldAdd(state.paddingTop, defaultState?.paddingTop)) declarations.push(`${statePrefix}-top: ${state.paddingTop};`);
        if (shouldAdd(state.paddingRight, defaultState?.paddingRight)) declarations.push(`${statePrefix}-right: ${state.paddingRight};`);
        if (shouldAdd(state.paddingBottom, defaultState?.paddingBottom)) declarations.push(`${statePrefix}-bottom: ${state.paddingBottom};`);
        if (shouldAdd(state.paddingLeft, defaultState?.paddingLeft)) declarations.push(`${statePrefix}-left: ${state.paddingLeft};`);
    };

    addState(`${prefix}-padding`, padding?.default);
    addState(`${prefix}-padding-hover`, padding?.hover, padding?.default);
    addState(`${prefix}-padding-active`, padding?.active, padding?.default);
    addState(`${prefix}-padding-focus`, padding?.focus, padding?.default);
    addState(`${prefix}-padding-disabled`, padding?.disabled, padding?.default);

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
            ...input.shadows?.default,
            ...input.shadows?.hover,
        },
        active: {
            ...predefinedShadows?.active,
            ...input.shadows?.default,
            ...input.shadows?.active,
        },
        focus: {
            ...predefinedShadows?.focus,
            ...input.shadows?.default,
            ...input.shadows?.focus,
        },
        disabled: {
            ...predefinedShadows?.disabled,
            ...input.shadows?.default,
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
            ...input.textStyle?.default,
            ...input.textStyle?.hover,
        },
        active: {
            ...predefinedTextStyle?.active,
            ...input.textStyle?.default,
            ...input.textStyle?.active,
        },
        focus: {
            ...predefinedTextStyle?.focus,
            ...input.textStyle?.default,
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
            ...input.typography?.default,
            ...input.typography?.hover,
        },
        active: {
            ...predefinedTypography?.active,
            ...input.typography?.default,
            ...input.typography?.active,
        },
        focus: {
            ...predefinedTypography?.focus,
            ...input.typography?.default,
            ...input.typography?.focus,
        },
        disabled: {
            ...predefinedTypography?.disabled,
            ...input.typography?.default,
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
            ...input.transform?.default,
            ...input.transform?.hover,
        },
        active: {
            ...predefinedTransform?.active,
            ...input.transform?.default,
            ...input.transform?.active,
        },
        focus: {
            ...predefinedTransform?.focus,
            ...input.transform?.default,
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

/**
 * Resuelve variables CSS para animaciones.
 */
export const visualAnimationsBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly animations?: AlfAnimateCssInterface;
}): string => {
    const anim = input.animations;
    if (!anim) return '';

    const declarations: string[] = [];
    if (anim.duration) {
        declarations.push(`${prefix}-anim-duration: ${anim.duration};`);
        declarations.push(`--animate-duration: ${anim.duration};`);
    }
    if (anim.delay) {
        declarations.push(`${prefix}-anim-delay: ${anim.delay};`);
        declarations.push(`--animate-delay: ${anim.delay};`);
    }

    return declarations.join(' ');
};

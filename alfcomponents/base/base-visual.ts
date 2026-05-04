import { AlfColorEnum, AlfColorVariantEnum } from '@alfcomponents/enums';
import {
    AlfBorderInterface,
    AlfBorderBaseInterface,
    AlfBackgroundsInterface,
    AlfBackgroundsBaseInterface,
    AlfPaddingBaseInterface,
    AlfPaddingInterface,
    AlfShadowsBaseInterface,
    AlfShadowsInterface,
    AlfTypographyBaseInterface,
    AlfTypographyInterface,
    MainVisualStyleInterface,
    AlfDisplayAndLayoutInterface,
    AlfDisplayAndLayoutBaseInterface,
    AlfMarginInterface,
    AlfMarginBaseInterface,
    AlfOutlineInterface,
    AlfOutlineBaseInterface,
    AlfTextStyleInterface,
    AlfTextStyleStateBaseInterface,
    AlfTransformInterface,
    AlfTransformBaseInterface,
    AlfAnimateCssInterface
} from '@alfcomponents/interfaces';
import { resolveDefaultVisual } from './default-visual';

/**
 * Obtiene la configuracion visual base por variante de color delegando en el motor Élite.
 */
export const getPredefinedVisualType = (
    type: AlfColorVariantEnum = AlfColorVariantEnum.Default
): MainVisualStyleInterface => {
    return resolveDefaultVisual(type);
};

/**
 * Helper genérico para añadir estados a las declaraciones CSS.
 */
const addStateToDeclarations = <T>(
    statePrefix: string,
    state: T | undefined,
    defaultState: T | undefined,
    declarations: string[],
    mapFn: (prefix: string, s: T, def: T | undefined, decls: string[]) => void
): void => {
    if (!state) return;
    mapFn(statePrefix, state, defaultState, declarations);
};

/**
 * Resuelve variables CSS para background por estado.
 */
export const visualBackgroundBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly backgrounds?: AlfBackgroundsInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const predefinedBg = selectedVisual.backgrounds;
    const backgrounds = input.backgrounds;
    const declarations: string[] = [];

    const mapBg = (p: string, s: AlfBackgroundsBaseInterface, d: AlfBackgroundsBaseInterface | undefined, decls: string[]) => {
        const isInt = p.includes('-hover') || p.includes('-active') || p.includes('-focus') || p.includes('-disabled');
        const should = (v: any, dv: any) => v !== undefined && (!isInt || v !== dv);
        if (should(s.backgroundColor, d?.backgroundColor)) decls.push(`${p}-color: ${s.backgroundColor};`);
        if (should(s.backgroundImage, d?.backgroundImage)) decls.push(`${p}-img: ${s.backgroundImage};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    const base = { ...predefinedBg?.default, ...backgrounds?.default };
    states.forEach(s => {
        const state = { ...predefinedBg?.[s], ...backgrounds?.[s] };
        addStateToDeclarations(`${prefix}-bg${s === 'default' ? '' : '-' + s}`, state, s === 'default' ? undefined : base, declarations, mapBg);
    });
    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para borde por estado.
 */
export const visualBorderBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly border?: AlfBorderInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const predefinedBorder = selectedVisual.border;
    const border = input.border;
    const declarations: string[] = [];

    const mapBorder = (p: string, s: AlfBorderBaseInterface, d: AlfBorderBaseInterface | undefined, decls: string[]) => {
        const isInt = p.includes('-hover') || p.includes('-active') || p.includes('-focus') || p.includes('-disabled');
        const should = (v: any, dv: any) => v !== undefined && (!isInt || v !== dv);
        if (should(s.borderWidth, d?.borderWidth)) decls.push(`${p}-width: ${s.borderWidth};`);
        if (should(s.borderStyle, d?.borderStyle)) decls.push(`${p}-style: ${s.borderStyle};`);
        if (should(s.borderColor, d?.borderColor)) decls.push(`${p}-color: ${s.borderColor};`);
        if (should(s.borderRadius, d?.borderRadius)) decls.push(`${p}-radius: ${s.borderRadius};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    const base = { ...predefinedBorder?.default, ...border?.default };
    states.forEach(s => {
        const state = { ...predefinedBorder?.[s], ...border?.[s] };
        addStateToDeclarations(`${prefix}-border${s === 'default' ? '' : '-' + s}`, state, s === 'default' ? undefined : base, declarations, mapBorder);
    });
    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para padding por estado.
 */
export const visualPaddingBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly padding?: AlfPaddingInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const predefinedPadding = selectedVisual.padding;
    const padding = input.padding;
    const declarations: string[] = [];

    const mapPadding = (p: string, s: AlfPaddingBaseInterface, d: AlfPaddingBaseInterface | undefined, decls: string[]) => {
        if (s.padding !== undefined) decls.push(`${p}: ${s.padding};`);
        if (s.paddingTop !== undefined) decls.push(`${p}-top: ${s.paddingTop};`);
        if (s.paddingRight !== undefined) decls.push(`${p}-right: ${s.paddingRight};`);
        if (s.paddingBottom !== undefined) decls.push(`${p}-bottom: ${s.paddingBottom};`);
        if (s.paddingLeft !== undefined) decls.push(`${p}-left: ${s.paddingLeft};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    states.forEach(s => {
        const state = { ...predefinedPadding?.[s], ...padding?.[s] };
        addStateToDeclarations(`${prefix}-padding${s === 'default' ? '' : '-' + s}`, state, undefined, declarations, mapPadding);
    });
    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para margin por estado.
 */
export const visualMarginBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly margin?: AlfMarginInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const predefinedMargin = selectedVisual.margin;
    const margin = input.margin;
    const declarations: string[] = [];

    const mapMargin = (p: string, s: AlfMarginBaseInterface, d: AlfMarginBaseInterface | undefined, decls: string[]) => {
        if (s.margin !== undefined) decls.push(`${p}: ${s.margin};`);
        if (s.marginTop !== undefined) decls.push(`${p}-top: ${s.marginTop};`);
        if (s.marginRight !== undefined) decls.push(`${p}-right: ${s.marginRight};`);
        if (s.marginBottom !== undefined) decls.push(`${p}-bottom: ${s.marginBottom};`);
        if (s.marginLeft !== undefined) decls.push(`${p}-left: ${s.marginLeft};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    states.forEach(s => {
        const state = { ...predefinedMargin?.[s], ...margin?.[s] };
        addStateToDeclarations(`${prefix}-margin${s === 'default' ? '' : '-' + s}`, state, undefined, declarations, mapMargin);
    });
    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para typography por estado.
 */
export const visualTypographyBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly typography?: AlfTypographyInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const predefinedTypo = selectedVisual.typography;
    const typography = input.typography;
    const declarations: string[] = [];

    const mapTypo = (p: string, s: AlfTypographyBaseInterface, d: AlfTypographyBaseInterface | undefined, decls: string[]) => {
        if (s.fontSize !== undefined) decls.push(`${p}-font-size: ${s.fontSize};`);
        if (s.fontWeight !== undefined) decls.push(`${p}-font-weight: ${s.fontWeight};`);
        if (s.color !== undefined) decls.push(`${p}-color: ${s.color};`);
        if (s.lineHeight !== undefined) decls.push(`${p}-line-height: ${s.lineHeight};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    states.forEach(s => {
        const state = { ...predefinedTypo?.[s], ...typography?.[s] };
        addStateToDeclarations(`${prefix}-typography${s === 'default' ? '' : '-' + s}`, state, undefined, declarations, mapTypo);
    });
    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para shadows por estado.
 */
export const visualShadowsBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly shadows?: AlfShadowsInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const predefinedShadows = selectedVisual.shadows;
    const shadows = input.shadows;
    const declarations: string[] = [];

    const mapShadows = (p: string, s: AlfShadowsBaseInterface, d: AlfShadowsBaseInterface | undefined, decls: string[]) => {
        if (s.boxShadow !== undefined) decls.push(`${p}-box-shadow: ${s.boxShadow};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    states.forEach(s => {
        const state = { ...predefinedShadows?.[s], ...shadows?.[s] };
        addStateToDeclarations(`${prefix}-shadows${s === 'default' ? '' : '-' + s}`, state, undefined, declarations, mapShadows);
    });
    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para display/layout por estado.
 */
export const visualDisplayAndLayoutBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const predefinedLayout = selectedVisual.displayAndLayout;
    const layout = input.displayAndLayout;
    const declarations: string[] = [];

    const mapLayout = (p: string, s: AlfDisplayAndLayoutBaseInterface, d: AlfDisplayAndLayoutBaseInterface | undefined, decls: string[]) => {
        if (s.display !== undefined) decls.push(`${p}-display: ${s.display};`);
        if (s.position !== undefined) decls.push(`${p}-position: ${s.position};`);
        if (s.zIndex !== undefined) decls.push(`${p}-z-index: ${s.zIndex};`);
        if (s.width !== undefined) decls.push(`${p}-width: ${s.width};`);
        if (s.height !== undefined) decls.push(`${p}-height: ${s.height};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    states.forEach(s => {
        const state = { ...predefinedLayout?.[s], ...layout?.[s] };
        addStateToDeclarations(`${prefix}-layout${s === 'default' ? '' : '-' + s}`, state, undefined, declarations, mapLayout);
    });
    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para transform por estado.
 */
export const visualTransformBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly transform?: AlfTransformInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const predefinedTransform = selectedVisual.transform;
    const transform = input.transform;
    const declarations: string[] = [];

    const mapTransform = (p: string, s: AlfTransformBaseInterface, d: AlfTransformBaseInterface | undefined, decls: string[]) => {
        const parts: string[] = [];
        if (s.translateX !== undefined) parts.push(`translateX(${s.translateX})`);
        if (s.translateY !== undefined) parts.push(`translateY(${s.translateY})`);
        if (s.scale !== undefined) parts.push(`scale(${s.scale})`);
        if (s.rotate !== undefined) parts.push(`rotate(${s.rotate}deg)`);
        if (parts.length) decls.push(`${p}-transform: ${parts.join(' ')};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    states.forEach(s => {
        const state = { ...predefinedTransform?.[s], ...transform?.[s] };
        addStateToDeclarations(`${prefix}-transform${s === 'default' ? '' : '-' + s}`, state, undefined, declarations, mapTransform);
    });
    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para textStyle por estado.
 */
export const visualTextStyleBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly textStyle?: AlfTextStyleInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const predefinedTextStyle = selectedVisual.textStyle;
    const textStyle = input.textStyle;
    const declarations: string[] = [];

    const mapTextStyle = (p: string, s: AlfTextStyleStateBaseInterface, d: AlfTextStyleStateBaseInterface | undefined, decls: string[]) => {
        if (s.color !== undefined) decls.push(`${p}-color: ${s.color};`);
        if (s.fontSize !== undefined) decls.push(`${p}-font-size: ${s.fontSize};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    states.forEach(s => {
        const state = { ...predefinedTextStyle?.[s], ...textStyle?.[s] };
        addStateToDeclarations(`${prefix}-text${s === 'default' ? '' : '-' + s}`, state, undefined, declarations, mapTextStyle);
    });
    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para animaciones.
 */
export const visualAnimationsBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly animations?: AlfAnimateCssInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const anims = { ...selectedVisual.animations, ...input.animations };
    const declarations: string[] = [];
    
    if (anims.duration) declarations.push(`${prefix}-anim-duration: ${anims.duration};`);
    if (anims.delay) declarations.push(`${prefix}-anim-delay: ${anims.delay};`);
    return declarations.join(' ');
};

/**
 * Genera la cadena de clases de Animate.css.
 */
export const visualAnimationsClassBase = (input: {
    readonly animations?: AlfAnimateCssInterface;
}): string => {
    const anims = input.animations;
    if (!anims) return '';
    
    const classes: string[] = ['animate__animated'];
    if (anims.enterStage) {
        classes.push(typeof anims.enterStage === 'string' ? anims.enterStage : (anims.enterStage as any).name);
    }
    if (anims.infinite) classes.push('animate__infinite');
    
    return classes.join(' ');
};

/**
 * Resuelve variables CSS para outline por estado.
 */
export const visualOutlineBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly outline?: AlfOutlineInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const predefinedOutline = selectedVisual.outline;
    const outline = input.outline;
    const declarations: string[] = [];

    const mapOutline = (p: string, s: AlfOutlineBaseInterface, d: AlfOutlineBaseInterface | undefined, decls: string[]) => {
        if (s.outlineColor !== undefined) decls.push(`${p}-color: ${s.outlineColor};`);
        if (s.outlineWidth !== undefined) decls.push(`${p}-width: ${s.outlineWidth};`);
        if (s.outlineStyle !== undefined) decls.push(`${p}-style: ${s.outlineStyle};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    states.forEach(s => {
        const state = { ...predefinedOutline?.[s], ...outline?.[s] };
        addStateToDeclarations(`${prefix}-outline${s === 'default' ? '' : '-' + s}`, state, undefined, declarations, mapOutline);
    });
    return declarations.join(' ');
};

/**
 * Resuelve el color base del ripple.
 */
export const visualRippleColorBase = (input: { type: AlfColorVariantEnum }): AlfColorEnum => {
    const selectedVisual = getPredefinedVisualType(input.type);
    return selectedVisual?.ripple?.backgroundColor ?? AlfColorEnum.PrimaryHover;
};

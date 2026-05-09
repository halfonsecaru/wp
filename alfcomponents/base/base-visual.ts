import { AlfColorEnum, AlfColorVariantEnum } from '@alfcomponents/enums';
import { resolveAlfColorVariant } from '@alfcomponents/shared';
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
    AlfAnimateCssInterface,
    AlfRippleInterface
} from '@alfcomponents/interfaces';
import { resolveVariantConfig } from './defaultVariants';


/**
 * Obtiene la configuración visual base por variante de color delegando en el motor Élite.
 */
export const getPredefinedVisualType = (
    type: AlfColorVariantEnum = AlfColorVariantEnum.Default
): MainVisualStyleInterface => {
    return resolveVariantConfig(type) as unknown as MainVisualStyleInterface;
};


/**
 * Añade variables CSS de un estado a una lista de declaraciones.
 */
const addStateToDeclarations = (
    statePrefix: string,
    state: any,
    defaultState: any,
    declarations: string[],
    mapFn: (p: string, s: any, d: any, decls: string[]) => void
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
        if (should(s.borderColor, d?.borderColor)) decls.push(`${p}-color: ${s.borderColor};`);
        if (should(s.borderStyle, d?.borderStyle)) decls.push(`${p}-style: ${s.borderStyle};`);
        if (should(s.borderWidth, d?.borderWidth)) decls.push(`${p}-width: ${s.borderWidth};`);
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
        const isInt = p.includes('-hover') || p.includes('-active') || p.includes('-focus') || p.includes('-disabled');
        const should = (v: any, dv: any) => v !== undefined && (!isInt || v !== dv);
        if (should(s.paddingTop, d?.paddingTop)) decls.push(`${p}-top: ${s.paddingTop};`);
        if (should(s.paddingBottom, d?.paddingBottom)) decls.push(`${p}-bottom: ${s.paddingBottom};`);
        if (should(s.paddingLeft, d?.paddingLeft)) decls.push(`${p}-left: ${s.paddingLeft};`);
        if (should(s.paddingRight, d?.paddingRight)) decls.push(`${p}-right: ${s.paddingRight};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    const base = { ...predefinedPadding?.default, ...padding?.default };
    states.forEach(s => {
        const state = { ...predefinedPadding?.[s], ...padding?.[s] };
        addStateToDeclarations(`${prefix}-padding${s === 'default' ? '' : '-' + s}`, state, s === 'default' ? undefined : base, declarations, mapPadding);
    });
    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para sombras por estado.
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
        const isInt = p.includes('-hover') || p.includes('-active') || p.includes('-focus') || p.includes('-disabled');
        const should = (v: any, dv: any) => v !== undefined && (!isInt || v !== dv);
        if (should(s.boxShadow, d?.boxShadow)) decls.push(`${p}-shadow: ${s.boxShadow};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    const base = { ...predefinedShadows?.default, ...shadows?.default };
    states.forEach(s => {
        const state = { ...predefinedShadows?.[s], ...shadows?.[s] };
        addStateToDeclarations(`${prefix}-shadow${s === 'default' ? '' : '-' + s}`, state, s === 'default' ? undefined : base, declarations, mapShadows);
    });
    return declarations.join(' ');
}/**
 * Resuelve variables CSS para display/layout por estado.
 */
export const visualDisplayAndLayoutBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
}): string => {
    const layout = input.displayAndLayout;
    if (!layout) return '';

    const declarations: string[] = [];

    const mapLayout = (p: string, s: AlfDisplayAndLayoutBaseInterface) => {
        if (s.display !== undefined) declarations.push(`${p}-display: ${s.display};`);
        if (s.width !== undefined) declarations.push(`${p}-width: ${s.width};`);
        if (s.height !== undefined) declarations.push(`${p}-height: ${s.height};`);
        if (s.gap !== undefined) declarations.push(`${p}-gap: ${s.gap};`);
        if (s.justifyContent !== undefined) declarations.push(`${p}-justify: ${s.justifyContent};`);
        if (s.alignItems !== undefined) declarations.push(`${p}-align: ${s.alignItems};`);
        if (s.overflow !== undefined) declarations.push(`${p}-overflow: ${s.overflow};`);
        if (s.position !== undefined) declarations.push(`${p}-position: ${s.position};`);
        if (s.cursor !== undefined) declarations.push(`${p}-cursor: ${s.cursor};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    states.forEach(s => {
        const state = layout[s];
        if (state) {
            mapLayout(`${prefix}-layout${s === 'default' ? '' : '-' + s}`, state);
        }
    });

    return declarations.join(' ');
};


/**
 * Resuelve variables CSS para margen por estado.
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
        const isInt = p.includes('-hover') || p.includes('-active') || p.includes('-focus') || p.includes('-disabled');
        const should = (v: any, dv: any) => v !== undefined && (!isInt || v !== dv);
        if (should(s.marginTop, d?.marginTop)) decls.push(`${p}-top: ${s.marginTop};`);
        if (should(s.marginBottom, d?.marginBottom)) decls.push(`${p}-bottom: ${s.marginBottom};`);
        if (should(s.marginLeft, d?.marginLeft)) decls.push(`${p}-left: ${s.marginLeft};`);
        if (should(s.marginRight, d?.marginRight)) decls.push(`${p}-right: ${s.marginRight};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    const base = { ...predefinedMargin?.default, ...margin?.default };
    states.forEach(s => {
        const state = { ...predefinedMargin?.[s], ...margin?.[s] };
        addStateToDeclarations(`${prefix}-margin${s === 'default' ? '' : '-' + s}`, state, s === 'default' ? undefined : base, declarations, mapMargin);
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
        const isInt = p.includes('-hover') || p.includes('-active') || p.includes('-focus') || p.includes('-disabled');
        const should = (v: any, dv: any) => v !== undefined && (!isInt || v !== dv);
        if (should(s.translateX, d?.translateX)) decls.push(`${p}-translate-x: ${s.translateX};`);
        if (should(s.translateY, d?.translateY)) decls.push(`${p}-translate-y: ${s.translateY};`);
        if (should(s.scale, d?.scale)) decls.push(`${p}-scale: ${s.scale};`);
        if (should(s.rotate, d?.rotate)) decls.push(`${p}-rotate: ${s.rotate};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    const base = { ...predefinedTransform?.default, ...transform?.default };
    states.forEach(s => {
        const state = { ...predefinedTransform?.[s], ...transform?.[s] };
        addStateToDeclarations(`${prefix}-transform${s === 'default' ? '' : '-' + s}`, state, s === 'default' ? undefined : base, declarations, mapTransform);
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
        const isInt = p.includes('-hover') || p.includes('-active') || p.includes('-focus') || p.includes('-disabled');
        const should = (v: any, dv: any) => v !== undefined && (!isInt || v !== dv);
        if (should(s.color, d?.color)) decls.push(`${p}-color: ${s.color};`);
        if (should(s.fontSize, d?.fontSize)) decls.push(`${p}-size: ${s.fontSize};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    const base = { ...predefinedTextStyle?.default, ...textStyle?.default };
    states.forEach(s => {
        const state = { ...predefinedTextStyle?.[s], ...textStyle?.[s] };
        addStateToDeclarations(`${prefix}-text${s === 'default' ? '' : '-' + s}`, state, s === 'default' ? undefined : base, declarations, mapTextStyle);
    });
    return declarations.join(' ');
};

/**
 * Resuelve variables CSS para tipografía por estado.
 */
export const visualTypographyBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly typography?: AlfTypographyInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const predefinedTypography = selectedVisual.typography;
    const typography = input.typography;
    const declarations: string[] = [];

    const mapTypography = (p: string, s: AlfTypographyBaseInterface, d: AlfTypographyBaseInterface | undefined, decls: string[]) => {
        const isInt = p.includes('-hover') || p.includes('-active') || p.includes('-focus') || p.includes('-disabled');
        const should = (v: any, dv: any) => v !== undefined && (!isInt || v !== dv);
        if (should(s.fontSize, d?.fontSize)) decls.push(`${p}-size: ${s.fontSize};`);
        if (should(s.fontWeight, d?.fontWeight)) decls.push(`${p}-weight: ${s.fontWeight};`);
        if (should(s.lineHeight, d?.lineHeight)) decls.push(`${p}-line-height: ${s.lineHeight};`);
        if (should(s.color, d?.color)) decls.push(`${p}-color: ${s.color};`);
        if (should(s.textAlign, d?.textAlign)) decls.push(`${p}-align: ${s.textAlign};`);
        if (should(s.fontFamily, d?.fontFamily)) decls.push(`${p}-family: ${s.fontFamily};`);
    };

    const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;
    const base = { ...predefinedTypography?.default, ...typography?.default };
    states.forEach(s => {
        const state = { ...predefinedTypography?.[s], ...typography?.[s] };
        addStateToDeclarations(`${prefix}-typo${s === 'default' ? '' : '-' + s}`, state, s === 'default' ? undefined : base, declarations, mapTypography);
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
 * Resuelve el color base del ripple con alto contraste.
 */
export const visualRippleColorBase = (input: { type: AlfColorVariantEnum }): AlfColorEnum => {
    const resolved = resolveAlfColorVariant(input.type);
    const variantName = resolved.toLowerCase();

    const isOutline = variantName.includes('outline');
    const isSoft = variantName.includes('soft');
    const isGhost = variantName.includes('ghost');
    const isCrystal = variantName.includes('crystal');

    // 1. CASO: Fondos Claros o Transparentes (Outline, Soft, Ghost, Crystal)
    // El ripple debe ser oscuro y del color de la variante para contraste.
    if (isOutline || isSoft || isGhost || isCrystal) {
        const baseColor = variantName.split('-').pop() || '';
        switch (baseColor) {
            case 'primary': return AlfColorEnum.Blue700;
            case 'success': return AlfColorEnum.Green700;
            case 'danger': return AlfColorEnum.Red700;
            case 'warning': return AlfColorEnum.Orange800;
            case 'info': return AlfColorEnum.Cyan800;
            default: return AlfColorEnum.Gray700;
        }
    }

    // 2. CASO: Fondos Sólidos Claros (Light, White, Warning, Info)
    // El ripple debe ser oscuro (Gris o color profundo).
    const isLightVariant =
        variantName.includes('light') ||
        variantName.includes('white') ||
        variantName.includes('warning') ||
        variantName.includes('info');

    if (isLightVariant) {
        return AlfColorEnum.Gray700;
    }

    // 3. CASO: Fondos Sólidos Oscuros (Primary, Success, Danger, Dark, Secondary, 3D)
    // En fondos oscuros, un ripple oscuro no se ve. Usamos Blanco (la directiva aplica 0.35 opacity).
    return AlfColorEnum.White;
};

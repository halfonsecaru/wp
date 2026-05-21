import { AlfColorEnum, AlfColorVariantEnum } from '@alfcomponents/enums';
import { resolveAlfColorVariant } from '@alfcomponents/shared';
import {
    AlfBorderInterface,
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
} from '@alfcomponents/interfaces';
import { resolveVariantConfig } from './defaultVariants';



/**
 * Obtiene la configuración visual predefinida (PredefinedConfig) para una variante dada.
 * Actúa como puente entre el enum de variante y la configuración base unificada.
 *
 * @param type Variante de color solicitada.
 * @returns Configuración visual base tipada como MainVisualStyleInterface.
 */
export const getPredefinedVisualType = (
    type: AlfColorVariantEnum = AlfColorVariantEnum.Default
): MainVisualStyleInterface => {
    return resolveVariantConfig(type) as unknown as MainVisualStyleInterface;
};



/**
 * Añade las propiedades de un estado (hover, focus, etc.) a las declaraciones CSS.
 * Omite la inyección de propiedades que sean idénticas al estado por defecto para evitar redundancias.
 *
 * @param statePrefix Prefijo CSS a inyectar (ej. '--alf-sw-bg-hover').
 * @param state Objeto con las propiedades del estado actual.
 * @param defaultState Objeto con las propiedades del estado default para comparación.
 * @param declarations Array de declaraciones mutante.
 * @param mapFn Función inyectora específica de cada módulo visual.
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
 * Resuelve y mapea las variables CSS de los fondos (Backgrounds) para todos los estados interactivos.
 * Procesa colores sólidos y gradientes (imágenes de fondo).
 *
 * @param prefix Prefijo base del componente (ej. '--alf-btn').
 * @param input Objeto con la variante y configuraciones opcionales de fondos.
 * @returns Cadena de texto con las variables CSS compiladas listas para el DOM.
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
 * Resuelve y mapea las variables CSS de bordes (Borders) en todos sus estados.
 * Contempla color, estilo, grosor global y grosores específicos por cada lado.
 *
 * @param prefix Prefijo base del componente (ej. '--alf-btn').
 * @param input Objeto con la variante y configuraciones opcionales de bordes.
 * @returns Cadena de texto con las variables CSS compiladas listas para el DOM.
 */
export const visualBorderBase = <TPrefix extends string>(prefix: TPrefix, input: {
    readonly type: AlfColorVariantEnum;
    readonly border?: AlfBorderInterface;
}): string => {
    const selectedVisual = getPredefinedVisualType(input.type);
    const predefinedBorder = selectedVisual.border;
    const border = input.border;
    const declarations: string[] = [];

    const mapBorder = (p: string, s: any, d: any, decls: string[]) => {
        const isInt = p.includes('-hover') || p.includes('-active') || p.includes('-focus') || p.includes('-disabled');
        const should = (v: any, dv: any) => v !== undefined && (!isInt || v !== dv);

        // Propiedades Globales
        if (should(s.borderColor, d?.borderColor)) decls.push(`${p}-color: ${s.borderColor};`);
        if (should(s.borderStyle, d?.borderStyle)) decls.push(`${p}-style: ${s.borderStyle};`);
        if (should(s.borderWidth, d?.borderWidth)) decls.push(`${p}-width: ${s.borderWidth};`);
        if (should(s.borderRadius, d?.borderRadius)) decls.push(`${p}-radius: ${s.borderRadius};`);

        // Anchos por lado
        if (should(s.borderTopWidth, d?.borderTopWidth)) decls.push(`${p}-top-width: ${s.borderTopWidth};`);
        if (should(s.borderRightWidth, d?.borderRightWidth)) decls.push(`${p}-right-width: ${s.borderRightWidth};`);
        if (should(s.borderBottomWidth, d?.borderBottomWidth)) decls.push(`${p}-bottom-width: ${s.borderBottomWidth};`);
        if (should(s.borderLeftWidth, d?.borderLeftWidth)) decls.push(`${p}-left-width: ${s.borderLeftWidth};`);

        // Estilos por lado
        if (should(s.borderTopStyle, d?.borderTopStyle)) decls.push(`${p}-top-style: ${s.borderTopStyle};`);
        if (should(s.borderRightStyle, d?.borderRightStyle)) decls.push(`${p}-right-style: ${s.borderRightStyle};`);
        if (should(s.borderBottomStyle, d?.borderBottomStyle)) decls.push(`${p}-bottom-style: ${s.borderBottomStyle};`);
        if (should(s.borderLeftStyle, d?.borderLeftStyle)) decls.push(`${p}-left-style: ${s.borderLeftStyle};`);

        // Colores por lado
        if (should(s.borderTopColor, d?.borderTopColor)) decls.push(`${p}-top-color: ${s.borderTopColor};`);
        if (should(s.borderRightColor, d?.borderRightColor)) decls.push(`${p}-right-color: ${s.borderRightColor};`);
        if (should(s.borderBottomColor, d?.borderBottomColor)) decls.push(`${p}-bottom-color: ${s.borderBottomColor};`);
        if (should(s.borderLeftColor, d?.borderLeftColor)) decls.push(`${p}-left-color: ${s.borderLeftColor};`);

        // Radios individuales
        if (should(s.borderTopLeftRadius, d?.borderTopLeftRadius)) decls.push(`${p}-top-left-radius: ${s.borderTopLeftRadius};`);
        if (should(s.borderTopRightRadius, d?.borderTopRightRadius)) decls.push(`${p}-top-right-radius: ${s.borderTopRightRadius};`);
        if (should(s.borderBottomRightRadius, d?.borderBottomRightRadius)) decls.push(`${p}-bottom-right-radius: ${s.borderBottomRightRadius};`);
        if (should(s.borderBottomLeftRadius, d?.borderBottomLeftRadius)) decls.push(`${p}-bottom-left-radius: ${s.borderBottomLeftRadius};`);
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
 * Resuelve y mapea las variables CSS para los rellenos (Paddings) por estado.
 * Soporta rellenos globales o detallados (top, right, bottom, left).
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones de padding.
 * @returns Cadena de texto con las variables CSS.
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
        if (should(s.padding, d?.padding)) decls.push(`${p}: ${s.padding};`);
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
 * Resuelve y mapea las variables CSS para las sombras (Box Shadows) interactivas.
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones de sombras.
 * @returns Cadena de texto con las variables CSS para sombras.
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
}

/**
 * Resuelve y mapea las variables CSS de layout (Display, Flex, Width, Height, etc.).
 * Controla el comportamiento estructural y geométrico del componente.
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones de layout.
 * @returns Cadena de texto con las variables CSS de layout.
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
        if (s.flexDirection !== undefined) declarations.push(`${p}-flex-direction: ${s.flexDirection};`);
        if (s.flexWrap !== undefined) declarations.push(`${p}-flex-wrap: ${s.flexWrap};`);
        if (s.width !== undefined) declarations.push(`${p}-width: ${s.width};`);
        if (s.height !== undefined) declarations.push(`${p}-height: ${s.height};`);
        if (s.gap !== undefined) declarations.push(`${p}-gap: ${s.gap};`);
        if (s.justifyContent !== undefined) declarations.push(`${p}-justify-content: ${s.justifyContent};`);
        if (s.alignItems !== undefined) declarations.push(`${p}-align-items: ${s.alignItems};`);
        if (s.overflow !== undefined) declarations.push(`${p}-overflow: ${s.overflow};`);
        if (s.position !== undefined) declarations.push(`${p}-position: ${s.position};`);
        if (s.cursor !== undefined) declarations.push(`${p}-cursor: ${s.cursor};`);
        if (s.opacity !== undefined) declarations.push(`${p}-opacity: ${s.opacity};`);
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
 * Resuelve y mapea las variables CSS para los márgenes (Margins) externos.
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones de margen.
 * @returns Cadena de texto con las variables CSS.
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
        if (should(s.margin, d?.margin)) decls.push(`${p}: ${s.margin};`);
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
 * Resuelve y mapea las variables CSS de transformación espacial (Translate, Scale, Rotate) 
 * reactivas a cada estado interactivo.
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones espaciales.
 * @returns Cadena de texto con las variables CSS.
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
 * Resuelve y mapea las variables CSS relacionadas exclusivamente con el color del texto y su grosor,
 * diferenciadas de la tipografía base para permitir herencias limpias en elementos hijos (ej. spans de iconos).
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones de estilo de texto.
 * @returns Cadena de texto con las variables CSS.
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
 * Resuelve y mapea las variables CSS completas de Tipografía (Size, Family, Line Height, Align, etc.).
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones tipográficas.
 * @returns Cadena de texto con las variables CSS.
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
        addStateToDeclarations(`${prefix}-typography${s === 'default' ? '' : '-' + s}`, state, s === 'default' ? undefined : base, declarations, mapTypography);
    });
    return declarations.join(' ');
};


/**
 * Resuelve variables CSS para duraciones y delays de animaciones inyectadas.
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con las configuraciones de animación.
 * @returns Cadena de texto con las variables CSS (anim-duration, anim-delay).
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
 * Genera la cadena de clases nativas de Animate.css necesarias para inyectar al DOM
 * durante los ciclos de vida de enterStage/exitStage.
 *
 * @param input Objeto con la configuración de la animación.
 * @returns Cadena con clases compuestas (ej. 'animate__animated animate__fadeIn').
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
 * Resuelve y mapea las variables CSS para el Outline de accesibilidad o enfoque.
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la configuración de outline.
 * @returns Cadena de texto con las variables CSS de outline.
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
 * Resuelve matemáticamente el color base ideal para el efecto Ripple, asegurando
 * siempre un contraste óptimo (WCAG) sobre el fondo de la variante elegida.
 *
 * @param input Variante actual.
 * @returns El color calculado para la expansión del Ripple.
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

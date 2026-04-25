// import { Directive, input, computed, Signal, Input, signal, WritableSignal, untracked, effect } from '@angular/core';
// import { resolveStyleVarsForCategory } from './alf-base.style-resolver';
// import {
//   AlfAnimateCssInterface,
//   AlfAriaInterface,
//   AlfBackgroundsInterface,
//   AlfBorderInterface,
//   AlfLoadingInterface,
//   AlfMarginInterface,
//   AlfPaddingInterface,
//   AlfRippleInterface,
//   AlfShadowsInterface,
//   AlfTransformInterface,
//   AlfTypographyInterface,
//   AlfTransitionsInterface,
// } from '../interfaces';
// import {
//   AlfColorVariantEnum,
//   AlfCursorEnum,
//   AlfIconsUnicodeIconEnum,
//   AlfSizeEnum,
// } from '../enums';
// import { LOADING_DEFAULT_SIGNAL } from '../directives/alf-loading/predefined/alf-loading.tokens';
// import { themeSignal } from '../themes/alf-theme.tokens';
// import { AlfThemeInterface } from '../interfaces/alf-theme.interface';

// /**
//  * @directive AlfBaseComponent
//  * @description Clase base abstracta estructurada para proveer a todos los componentes de la librería
//  * los Inputs y Signals computados comunes. Ordenado alfabéticamente.
//  */
// @Directive()
// export abstract class AlfBaseComponent<T> {

//   // --- Abstract Source of Truth ---
//   /**
//    * Signal abstracto que debe ser resuelto por el hijo.
//    * Contiene la configuración predefinida ya resuelta a T.
//    */
//   protected abstract readonly resolvedPredefined: Signal<T | undefined>;

//   // --- Theme Engine ---
//   /** Signal reactivo al tema global estructurado */
//   protected readonly globalTheme: Signal<AlfThemeInterface> = themeSignal;

//   // --- Bridge Inputs (@Input Setters for JIT/Vitest compatibility) ---

//   @Input('aria') set aria(v: AlfAriaInterface | undefined) { this.ariaInput.set(v); }
//   @Input('backgrounds') set backgrounds(v: AlfBackgroundsInterface | undefined) { this.backgroundsInput.set(v); }
//   @Input('border') set border(v: AlfBorderInterface | undefined) { this.borderInput.set(v); }
//   @Input('cursor') set cursor(v: AlfCursorEnum | undefined) { this.cursorInput.set(v); }
//   @Input('customClass') set customClass(v: string | string[] | undefined) { this.customClassInput.set(v); }
//   @Input('customStyle') set customStyle(v: Record<string, string> | undefined) { this.customStyleInput.set(v); }
//   @Input('defineComponent') set defineComponent(v: T | undefined) { this.defineComponentInput.set(v); }
//   @Input('disabled') set disabled(v: boolean | undefined) { this.disabledInput.set(v); }
//   @Input('iconLeft') set iconLeft(v: AlfIconsUnicodeIconEnum | undefined) { this.iconLeftInput.set(v); }
//   @Input('iconRight') set iconRight(v: AlfIconsUnicodeIconEnum | undefined) { this.iconRightInput.set(v); }
//   @Input('id') set id(v: string | number | undefined) { this.idInput.set(v); }
//   @Input('label') set label(v: string | undefined) { this.labelInput.set(v); }
//   @Input('loading') set loading(v: AlfLoadingInterface | undefined) { this.loadingInput.set(v); }
//   @Input('margin') set margin(v: AlfMarginInterface | undefined) { this.marginInput.set(v); }
//   @Input('padding') set padding(v: AlfPaddingInterface | undefined) { this.paddingInput.set(v); }
//   @Input('ripple') set ripple(v: boolean | AlfRippleInterface | undefined) { this.rippleInput.set(v); }
//   @Input('shadows') set shadows(v: AlfShadowsInterface | undefined) { this.shadowsInput.set(v); }
//   @Input('size') set size(v: AlfSizeEnum | undefined) { this.sizeInput.set(v); }
//   @Input('transitions') set transitions(v: AlfTransitionsInterface | undefined) { this.transitionsInput.set(v); }
//   @Input('transform') set transform(v: AlfTransformInterface | undefined) { this.transformInput.set(v); }
//   @Input('typography') set typography(v: AlfTypographyInterface | undefined) { this.typographyInput.set(v); }
//   @Input('variant') set variant(v: AlfColorVariantEnum | undefined) { this.variantInput.set(v); }

//   // --- Internal Signals ---
//   protected readonly ariaInput = signal<AlfAriaInterface | undefined>(undefined);
//   protected readonly backgroundsInput = signal<AlfBackgroundsInterface | undefined>(undefined);
//   protected readonly borderInput = signal<AlfBorderInterface | undefined>(undefined);
//   protected readonly cursorInput = signal<AlfCursorEnum | undefined>(undefined);
//   protected readonly customClassInput = signal<string | string[] | undefined>(undefined);
//   protected readonly customStyleInput = signal<Record<string, string> | undefined>(undefined);
//   protected readonly defineComponentInput = signal<T | undefined>(undefined);
//   protected readonly disabledInput = signal<boolean | undefined>(undefined);
//   protected readonly iconLeftInput = signal<AlfIconsUnicodeIconEnum | undefined>(undefined);
//   protected readonly iconRightInput = signal<AlfIconsUnicodeIconEnum | undefined>(undefined);
//   protected readonly idInput = signal<string | number | undefined>(undefined);
//   protected readonly labelInput = signal<string | undefined>(undefined);
//   protected readonly loadingInput = signal<AlfLoadingInterface | undefined>(undefined);
//   protected readonly marginInput = signal<AlfMarginInterface | undefined>(undefined);
//   protected readonly paddingInput = signal<AlfPaddingInterface | undefined>(undefined);
//   protected readonly rippleInput = signal<boolean | AlfRippleInterface | undefined>(undefined);
//   protected readonly shadowsInput = signal<AlfShadowsInterface | undefined>(undefined);
//   protected readonly sizeInput = signal<AlfSizeEnum | undefined>(undefined);
//   protected readonly transitionsInput = signal<AlfTransitionsInterface | undefined>(undefined);
//   protected readonly transformInput = signal<AlfTransformInterface | undefined>(undefined);
//   protected readonly typographyInput = signal<AlfTypographyInterface | undefined>(undefined);
//   protected readonly variantInput = signal<AlfColorVariantEnum | undefined>(undefined);

//   /**
//    * Configuración total resuelta.
//    * Une la identidad predefinida con los overrides manuales de 'defineComponent'.
//    */
//   protected readonly resolvedConfigComputed = computed(() => {
//     const predefined = this.resolvedPredefined();
//     const overrides = this.defineComponentInput();
//     if (!predefined) return overrides;
//     if (!overrides) return predefined;
//     return { ...predefined, ...overrides };
//   });

//   // --- Signals Computados (A-Z - Merging Config + Inputs) ---
//   protected readonly ariaComputed = computed(() => this.ariaInput() ?? (this.defineComponentInput() as any)?.aria ?? (this.resolvedPredefined() as any)?.aria);
  
//   /**
//    * Fusión Reactiva de Fondos (DNA Cascade)
//    */
//   protected readonly backgroundsComputed = computed(() => {
//     const theme = this.globalTheme().backgrounds;
//     const comp = this.backgroundsInput() ?? (this.defineComponentInput() as any)?.backgrounds ?? (this.resolvedPredefined() as any)?.backgrounds;

//     if (!comp) return theme;
//     return {
//       ...theme,
//       ...comp,
//       default:  { ...theme?.default,  ...comp?.default },
//       hover:    { ...theme?.hover,    ...comp?.hover },
//       active:   { ...theme?.active,   ...comp?.active },
//       focus:    { ...theme?.focus,    ...comp?.focus },
//       disabled: { ...theme?.disabled, ...comp?.disabled },
//     };
//   });

//   /**
//    * Fusión Reactiva de Bordes (DNA Cascade)
//    */
//   protected readonly borderComputed = computed(() => {
//     const theme = this.globalTheme().border;
//     const comp = this.borderInput() ?? (this.defineComponentInput() as any)?.border ?? (this.resolvedPredefined() as any)?.border;
    
//     if (!comp) return theme;
//     return { 
//       ...theme, 
//       ...comp,
//       default:  { ...theme?.default,  ...comp?.default },
//       hover:    { ...theme?.hover,    ...comp?.hover },
//       active:   { ...theme?.active,   ...comp?.active },
//       focus:    { ...theme?.focus,    ...comp?.focus },
//       disabled: { ...theme?.disabled, ...comp?.disabled },
//     };
//   });

//   protected readonly cursorComputed = computed(() => this.cursorInput() ?? (this.defineComponentInput() as any)?.cursor ?? (this.resolvedPredefined() as any)?.cursor);
//   protected readonly customClassComputed = computed(() => this.customClassInput() ?? (this.defineComponentInput() as any)?.customClass ?? (this.resolvedPredefined() as any)?.customClass);
//   protected readonly customStyleComputed = computed(() => {
//     const componentStyle = this.customStyleInput() ?? (this.defineComponentInput() as any)?.customStyle ?? (this.resolvedPredefined() as any)?.customStyle;
//     return componentStyle || {};
//   });

//   protected readonly disabledComputed = computed(() => this.disabledInput() ?? (this.defineComponentInput() as any)?.disabled ?? (this.resolvedPredefined() as any)?.disabled);
//   protected readonly iconLeftComputed = computed(() => this.iconLeftInput() ?? (this.defineComponentInput() as any)?.iconLeft ?? (this.resolvedPredefined() as any)?.iconLeft);
//   protected readonly iconRightComputed = computed(() => this.iconRightInput() ?? (this.defineComponentInput() as any)?.iconRight ?? (this.resolvedPredefined() as any)?.iconRight);
//   protected readonly idComputed = computed(() => this.idInput() ?? (this.defineComponentInput() as any)?.id ?? (this.resolvedPredefined() as any)?.id);
//   protected readonly labelComputed = computed(() => this.labelInput() ?? (this.defineComponentInput() as any)?.label ?? (this.resolvedPredefined() as any)?.label);
//   protected readonly loadingComputed: Signal<AlfLoadingInterface> = computed(() => {
//     return this.loadingInput() ?? (this.defineComponentInput() as any)?.loading ?? (this.resolvedPredefined() as any)?.loading ?? LOADING_DEFAULT_SIGNAL();
//   });

//   /**
//    * Fusión Reactiva de Márgenes (DNA Cascade)
//    */
//   protected readonly marginComputed = computed(() => {
//     return this.marginInput() ?? (this.defineComponentInput() as any)?.margin ?? (this.resolvedPredefined() as any)?.margin;
//   });

//   /**
//    * Fusión Reactiva de Rellenos (DNA Cascade)
//    */
//   protected readonly paddingComputed = computed(() => {
//     return this.paddingInput() ?? (this.defineComponentInput() as any)?.padding ?? (this.resolvedPredefined() as any)?.padding;
//   });

//   protected readonly rippleComputed = computed(() => this.rippleInput() ?? (this.defineComponentInput() as any)?.ripple ?? (this.resolvedPredefined() as any)?.ripple);
  
//   protected readonly shadowsComputed = computed(() => {
//     const theme = this.globalTheme().shadows;
//     const comp = this.shadowsInput() ?? (this.defineComponentInput() as any)?.shadows ?? (this.resolvedPredefined() as any)?.shadows;

//     if (!comp) return theme;
//     return {
//       ...theme,
//       ...comp,
//       default:  { ...theme?.default,  ...comp?.default },
//       hover:    { ...theme?.hover,    ...comp?.hover },
//       active:   { ...theme?.active,   ...comp?.active },
//       focus:    { ...theme?.focus,    ...comp?.focus },
//       disabled: { ...theme?.disabled, ...comp?.disabled },
//     };
//   });

//   protected readonly sizeComputed = computed(() => this.sizeInput() ?? (this.defineComponentInput() as any)?.size ?? (this.resolvedPredefined() as any)?.size);
//   protected readonly transformComputed = computed(() => this.transformInput() ?? (this.defineComponentInput() as any)?.transform ?? (this.resolvedPredefined() as any)?.transform);
  
//   protected readonly typographyComputed = computed(() => {
//     const theme = this.globalTheme().typography;
//     const comp = this.typographyInput() ?? (this.defineComponentInput() as any)?.typography ?? (this.resolvedPredefined() as any)?.typography;

//     if (!comp) return theme;
//     return {
//       ...theme,
//       ...comp,
//       default:  { ...theme?.default,  ...comp?.default },
//       hover:    { ...theme?.hover,    ...comp?.hover },
//       active:   { ...theme?.active,   ...comp?.active },
//       focus:    { ...theme?.focus,    ...comp?.focus },
//       disabled: { ...theme?.disabled, ...comp?.disabled },
//     };
//   });

//   protected readonly variantComputed = computed(() => this.variantInput() ?? (this.defineComponentInput() as any)?.variant ?? (this.resolvedPredefined() as any)?.variant);

//   /**
//    * Fusión Reactiva de Transiciones (Theme -> Predefined -> Manual)
//    */
//   protected readonly transitionsComputed = computed(() => {
//     const theme = this.globalTheme().transitions;
//     const comp = this.transitionsInput() ?? (this.defineComponentInput() as any)?.transitions ?? (this.resolvedPredefined() as any)?.transitions;

//     if (!comp) return theme;
//     return {
//       ...theme,
//       ...comp,
//       default:  { ...theme?.default,  ...comp?.default },
//       hover:    { ...theme?.hover,    ...comp?.hover },
//       active:   { ...theme?.active,   ...comp?.active },
//       focus:    { ...theme?.focus,    ...comp?.focus },
//       disabled: { ...theme?.disabled, ...comp?.disabled },
//     };
//   });

//   /**
//    * Orquestador Central de Transiciones (Master Orchestrator)
//    * Construye una única declaración de 'transition' para el elemento.
//    */
//   protected readonly masterTransitionComputed = computed(() => {
//     const transitions = this.transitionsComputed()?.default;
//     const duration = transitions?.transitionDuration ?? '700ms';
//     const timing = transitions?.transitionTiming ?? 'cubic-bezier(0.4, 0, 0.2, 1)';


//     // Lista de propiedades seguras para transicionar en la librería
//     const safeProps = [
//       'background-color',
//       'background-image',
//       'background-position',
//       'border-color',
//       'border-radius',
//       'border-width',
//       'box-shadow',
//       'opacity',
//       'transform',
//       'outline-color',
//       'outline-offset'
//     ];

//     return safeProps
//       .map(prop => `${prop} ${duration} ${timing}`)
//       .join(', ');
//   });

//   // --- Elite CSS Variable Engine ---
//   /**
//    * Genera el mapa de variables CSS inyectables en el HTML.
//    * Ahora devuelve un STRING concatenado para ser consumido directamente por [style] vía @let.
//    */
//   protected readonly styleVariablesComputed = computed(() => {
//     const vars: Record<string, string> = {};

//     // 0. Transición Maestra (Unificada)
//     vars['transition'] = this.masterTransitionComputed();
    
//     // Inyectamos las variables locales para sincronizar los pseudo-elementos o hijos SCSS automáticos
//     const tr = this.transitionsComputed()?.default;
//     vars['--alf-transition-duration'] = tr?.transitionDuration ?? '700ms';
//     vars['--alf-transition-timing'] = tr?.transitionTiming ?? 'cubic-bezier(0.4, 0, 0.2, 1)';

//     // 1. Estilos custom manuales
//     const customStyles = this.customStyleComputed();
//     if (customStyles) Object.assign(vars, customStyles);

//     // 2. Mapa de categorías
//     const configMap = [
//       { key: 'backgrounds' as const, sign: this.backgroundsComputed },
//       { key: 'border'      as const, sign: this.borderComputed },
//       { key: 'margin'      as const, sign: this.marginComputed },
//       { key: 'padding'     as const, sign: this.paddingComputed },
//       { key: 'shadows'     as const, sign: this.shadowsComputed },
//       { key: 'transform'   as const, sign: this.transformComputed },
//       { key: 'typography'  as const, sign: this.typographyComputed },
//     ];

//     const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const;

//     configMap.forEach(cat => {
//       const config = cat.sign();
//       if (!config) return;

//       states.forEach(state => {
//         const stateData = (config as any)[state];
//         if (!stateData) return;
//         const resolved = resolveStyleVarsForCategory(cat.key, stateData, state);
//         Object.assign(vars, resolved);
//       });
//     });

//     // 3. Conversión a String Directo (Optimización Élite)
//     return Object.entries(vars)
//       .map(([k, v]) => `${k}:${v}`)
//       .join(';');
//   });

//   // --- Elite Animation Engine (Animate.css) ---

//   /** 
//    * Estado interno de salida. 
//    * Se activa cuando un componente deja de ser 'activo' pero tiene animación de salida. 
//    */
//   public readonly isExiting = signal(false);

//   /** 
//    * Resuelve la configuración de Animate.css del componente actual. 
//    * Busca la propiedad 'animations' en el objeto de configuración T.
//    */
//   public readonly resolvedAnimationsComputed = computed(() => {
//     const config = this.resolvedConfigComputed() as any;
//     return config?.animations as AlfAnimateCssInterface | undefined;
//   });

//   /**
//    * Genera las clases de Animate.css según el estado actual (Entrada/Salida).
//    * @param isActive Señal que indica si el componente está actualmente activo.
//    */
//   public createAnimationClasses(isActive: Signal<boolean>): Signal<string> {
//     return computed(() => {
//       const anim = this.resolvedAnimationsComputed();
//       // Priorizamos la salida: si el componente está saliendo, usamos esa animación
//       if (this.isExiting()) return anim?.exitStage ? `${anim.exitStage}` : '';
//       if (isActive()) return anim?.enterStage ? `${anim.enterStage}` : '';
//       return '';
//     });
//   }

//   /**
//    * Genera los estilos inline para controlar la duración y el retraso de Animate.css.
//    */
//   public readonly animationStylesComputed = computed(() => {
//     const anim = this.resolvedAnimationsComputed();
//     const styles: Record<string, string> = {};
//     if (anim?.duration) styles['--animate-duration'] = anim.duration;
//     if (anim?.delay) styles['--animate-delay'] = anim.delay;
//     return styles;
//   });

//   /**
//    * Debe llamarse desde el (animationend) del HTML para limpiar el estado de salida.
//    */
//   public onAnimationEnd(): void {
//     if (this.isExiting()) {
//       this.isExiting.set(false);
//     }
//   }

//   /**
//    * Orquestador reactivo para el ciclo de vida de animaciones.
//    * Monitoriza una señal de activación y gestiona el flag 'isExiting' automáticamente.
//    */
//   protected setupAnimationTrigger(isActive: Signal<boolean>): void {
//     effect(() => {
//       const active = isActive();
//       const anim = untracked(() => this.resolvedAnimationsComputed());
      
//       untracked(() => {
//         if (!active && anim?.exitStage) {
//           this.isExiting.set(true);
//         } else {
//           this.isExiting.set(false);
//         }
//       });
//     });
//   }
// }

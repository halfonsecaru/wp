import { AlfBorderStyleEnum, AlfColorEnum, AlfColorVariantEnum, AlfCursorEnum, AlfFontSizeEnum, AlfInputAppearanceEnum, AlfPxEnum, AlfRadiusEnum, AlfSizeEnum, AlfShadowEnum, AlfRemEnum, AlfTextShadowEnum } from "@alfcomponents/enums";
import { AlfBackgroundsInterface, AlfBackgroundsBaseInterface, AlfBorderInterface, AlfBorderBaseInterface, AlfOutlineInterface, AlfOutlineBaseInterface, AlfShadowsInterface, AlfShadowsBaseInterface, AlfMarginInterface, AlfMarginBaseInterface, AlfPaddingInterface, AlfPaddingBaseInterface, AlfTypographyInterface, AlfTypographyBaseInterface, AlfTextStyleInterface, AlfTextStyleStateBaseInterface, AlfTransformInterface, AlfTransformBaseInterface, AlfTransitionInterface, AlfTransitionBaseInterface, AlfDisplayAndLayoutInterface, AlfDisplayAndLayoutBaseInterface, AlfAnimateCssInterface, AlfAriaBaseInterface, AlfRippleInterface, AlfBaseCommonConfigInterface } from "@alfcomponents/interfaces";
import { AlfValidationResult, alfRequiredValidator, alfMinLengthValidator, alfMaxLengthValidator, alfMinValidator, alfMaxValidator, alfPatternValidator, alfEmailValidator } from '@alfcomponents/shared';
import { interpolate } from '@alfcomponents/i18n/i18n-utils';
import { computed, Directive, input, signal, untracked, output, inject, ElementRef, effect } from "@angular/core";
import { ControlValueAccessor } from '@angular/forms';
import { AlfTooltipConfig } from "@alfcomponents/directives";
import { buildColorBackgroundConfig } from "./default/background";
import { deepEqual, deepMergeStates, getPredefinedColorByVariant } from "./default/functions";
import { buildColorShadowsConfig } from "./default/shadows";
import { buildDisplayAndLayoutConfig } from "./default/displayAndLayout";
import { buildTransitionConfig } from "./default/transition";
import { buildTransformConfig } from "./default/transform";
import { buildTextColorStyleConfig } from "./default/textColor";
import { buildTypographyConfig } from "./default/typography";
import { buildPaddingConfig } from "./default/padding";
import { buildMarginConfig } from "./default/margin";
import { buildColorOutlineConfig } from "./default/outline";
import { buildColorBorderConfig } from "./default/border";
import { AlfComponentTypeEnum } from "./enum/AlfComponentType.enum";


const defaultPadding: AlfPaddingBaseInterface = {
    paddingTop: AlfPxEnum.Px10,
    paddingBottom: AlfPxEnum.Px10,
    paddingLeft: AlfPxEnum.Px10,
    paddingRight: AlfPxEnum.Px10
};

@Directive()
export abstract class AlfBaseDirectives implements ControlValueAccessor {
    // ---- Estos son los enum para llamar directamente ----
    protected readonly AlfRemEnum = AlfRemEnum;

    // -----------------------------------------------------
    protected readonly el = inject(ElementRef<HTMLElement>);
    private previousAnimClasses: string[] = [];

    // ── 1. Visual & Interactive Inputs ───────────────────────────────────────
    public readonly aria = input<AlfAriaBaseInterface | undefined>();
    public readonly tooltip = input<string | AlfTooltipConfig>();
    public readonly ripple = input<boolean | AlfRippleInterface | undefined>();
    public readonly cursor = input<AlfCursorEnum>(AlfCursorEnum.Pointer);
    public readonly size = input<AlfSizeEnum>(AlfSizeEnum.MD);
    public readonly customClass = input<string>();
    public readonly customStyle = input<string>();
    public readonly elevated = input<boolean>(true);

    // ── 2. State Inputs ──────────────────────────────────────────────────────
    public readonly variant = input<AlfColorVariantEnum>();
    public readonly disabled = input<boolean>(false);
    public readonly isLoading = input<boolean>(false);
    public readonly isExiting = input<boolean>(false);

    // ── 3. Visual Style Inputs ───────────────────────────────────────────────
    public readonly background = input<AlfBackgroundsInterface | AlfBackgroundsBaseInterface>();
    public readonly border = input<AlfBorderInterface | AlfBorderBaseInterface>();
    public readonly outline = input<AlfOutlineInterface | AlfOutlineBaseInterface>();
    public readonly shadows = input<AlfShadowsInterface | AlfShadowsBaseInterface>();
    public readonly margin = input<AlfMarginInterface | AlfMarginBaseInterface>();
    public readonly padding = input<AlfPaddingInterface | AlfPaddingBaseInterface>();
    public readonly typography = input<AlfTypographyInterface | AlfTypographyBaseInterface>();
    public readonly textStyle = input<AlfTextStyleInterface | AlfTextStyleStateBaseInterface>();
    public readonly transform = input<AlfTransformInterface | AlfTransformBaseInterface>();
    public readonly transition = input<AlfTransitionInterface | AlfTransitionBaseInterface>();
    public readonly displayAndLayout = input<AlfDisplayAndLayoutInterface | AlfDisplayAndLayoutBaseInterface>();
    public readonly animations = input<AlfAnimateCssInterface>();

    // ── 4. Validation Inputs
    public readonly required = input<boolean | undefined>(undefined);
    public readonly maxLength = input<number>();
    public readonly minLength = input<number>();
    public readonly min = input<number>();
    public readonly max = input<number>();
    public readonly pattern = input<string>();
    public readonly validators = input<((v: any) => AlfValidationResult)[]>([]);
    public readonly error = input<string | boolean | undefined>(undefined);

    // ── 5. Outputs ────────────────────────────────────────────────────────────
    public readonly onFocus = output<FocusEvent>();
    public readonly onBlur = output<FocusEvent>();

    // ── 6. Internal State (Signals) ───────────────────────────────────────────
    protected readonly _disabled = signal<boolean>(false);
    public readonly disabledComputed = computed(() => this.disabled() || this._disabled());
    protected readonly isFocused = signal<boolean>(false);
    protected readonly isDirty = signal<boolean>(false);
    protected readonly componentType = signal<AlfComponentTypeEnum>(AlfComponentTypeEnum.Default);
    protected readonly cssPrefix = signal<string>('');
    protected readonly baseCssClass = signal<string>('');
    protected readonly _appearance = signal<AlfInputAppearanceEnum>(AlfInputAppearanceEnum.Outline);

    private readonly _background = signal<AlfBackgroundsInterface | AlfBackgroundsBaseInterface>(undefined, { equal: deepEqual });
    private readonly _border = signal<AlfBorderInterface | AlfBorderBaseInterface>(undefined, { equal: deepEqual });
    private readonly _outline = signal<AlfOutlineInterface | AlfOutlineBaseInterface>(undefined, { equal: deepEqual });
    private readonly _shadows = signal<AlfShadowsInterface | AlfShadowsBaseInterface>(undefined, { equal: deepEqual });
    private readonly _margin = signal<AlfMarginInterface | AlfMarginBaseInterface>(undefined, { equal: deepEqual });
    private readonly _padding = signal<AlfPaddingInterface | AlfPaddingBaseInterface>(undefined, { equal: deepEqual });
    private readonly _typography = signal<AlfTypographyInterface | AlfTypographyBaseInterface>(undefined, { equal: deepEqual });
    private readonly _textStyle = signal<AlfTextStyleInterface | AlfTextStyleStateBaseInterface>(undefined, { equal: deepEqual });
    private readonly _transform = signal<AlfTransformInterface | AlfTransformBaseInterface>(undefined, { equal: deepEqual });
    private readonly _transition = signal<AlfTransitionInterface | AlfTransitionBaseInterface>(undefined, { equal: deepEqual });
    private readonly _displayAndLayout = signal<AlfDisplayAndLayoutInterface | AlfDisplayAndLayoutBaseInterface>(undefined, { equal: deepEqual });
    private readonly _animations = signal<AlfAnimateCssInterface>(undefined, { equal: deepEqual });

    // ── 7. Computed State ─────────────────────────────────────────────────────

    /* */

    public readonly backgroundComputed = computed(() => {
        const innerBackground = this._background();
        const signalBackground = this.background();
        const variant = this.variant();
        const type = this.componentType();

        const defaultBackground = buildColorBackgroundConfig(variant, type, this.getInternalAppearance());
        return deepMergeStates(defaultBackground, innerBackground, signalBackground)
    });

    public readonly borderComputed = computed(() => {
        const innerBorder = this._border();
        const signalBorder = this.border();
        const variant = this.variant();
        const appearance = this._appearance();
        const type = this.componentType();
        const cbStyle = (this as any).checkboxStyle?.();
        const defaultBorder = buildColorBorderConfig(
            variant,
            appearance,
            AlfPxEnum.Px015,
            AlfRadiusEnum.Lg,
            AlfBorderStyleEnum.Solid,
            type,
            cbStyle
        );
        return deepMergeStates(defaultBorder, innerBorder, signalBorder)
    });


    public readonly outlineComputed = computed(() => {
        const innerOutline = this._outline();
        const signalOutline = this.outline();
        const variant = this.variant();
        const defaultOutline = buildColorOutlineConfig();
        return deepMergeStates(defaultOutline, innerOutline, signalOutline)
    });

    public readonly shadowsComputed = computed(() => {
        const innerShadows = this._shadows();
        const signalShadows = this.shadows();
        const variant = this.variant();
        const defaultShadows = buildColorShadowsConfig(variant, this.elevated(), this.componentType(), this.getInternalAppearance());
        return deepMergeStates(defaultShadows, innerShadows, signalShadows);
    });



    public readonly marginComputed = computed(() => {
        const innerMargin = this._margin();
        const signalMargin = this.margin();
        const componentType = this.componentType() || AlfComponentTypeEnum.Default;
        const variant = this.variant();
        const defaultMargin = buildMarginConfig(componentType, variant);
        return deepMergeStates(defaultMargin, innerMargin, signalMargin);
    });

    public readonly paddingComputed = computed(() => {
        const innerPadding = this._padding();
        const signalPadding = this.padding();
        const componentType = this.componentType() || AlfComponentTypeEnum.Default;
        const defaultPadding = buildPaddingConfig(componentType, this.getInternalAppearance());
        return deepMergeStates(defaultPadding, innerPadding, signalPadding);
    });


    public readonly typographyComputed = computed(() => {
        const innerTypography = this._typography();
        const signalTypography = this.typography();
        const componentType = this.componentType() || AlfComponentTypeEnum.Default;
        const variant = this.variant();
        const defaultTypography = buildTypographyConfig(componentType, variant, this.getInternalAppearance());
        return deepMergeStates(defaultTypography, innerTypography, signalTypography);
    });

    public readonly textStyleComputed = computed(() => {
        const innerTextStyle = this._textStyle();
        const signalTextStyle = this.textStyle();
        const componentType = this.componentType() || AlfComponentTypeEnum.Default;
        const variant = this.variant();
        const defaultTextStyle = buildTextColorStyleConfig(componentType, variant);
        return deepMergeStates(defaultTextStyle, innerTextStyle, signalTextStyle);
    });



    public readonly transformComputed = computed(() => {
        const innerTransform = this._transform();
        const signalTransform = this.transform();
        const defaultTransform = buildTransformConfig();
        return deepMergeStates(defaultTransform, innerTransform, signalTransform);
    });

    public readonly transitionComputed = computed(() => {
        const innerTransition = this._transition();
        const signalTransition = this.transition();
        const defaultTransition = buildTransitionConfig();
        return deepMergeStates(defaultTransition, innerTransition, signalTransition);
    });

    public readonly animationsComputed = computed(() => {
        const c1 = this._animations() || {};
        const c2 = this.getControlConfig()?.animations || {};
        const c3 = this.animations() || {};
        const merged = { ...c1, ...c2, ...c3 };

        return Object.keys(merged).length > 0 ? merged as AlfAnimateCssInterface : undefined;
    });

    public readonly displayAndLayoutComputed = computed(() => {
        const innerDL = this._displayAndLayout();
        const signalDL = this.displayAndLayout();
        const controlDL = this.getControlConfig()?.displayAndLayout;
        const componentType = this.componentType() || AlfComponentTypeEnum.Default;
        const defaultDL = buildDisplayAndLayoutConfig(componentType);
        return deepMergeStates(defaultDL, innerDL, signalDL, controlDL);
    });



    public readonly spinnerColorComputed = computed<string | undefined>(() => {
        let state: 'default' | 'hover' | 'focus' | 'disabled' = 'default';

        // aqui el this, correspone al componente que lo invoca, button, input, etc...
        if (this.disabled()) {
            state = 'disabled';
        } else if (this.isFocused()) {
            state = 'focus';
        } else if ((this as any).hovered?.()) {
            state = 'hover';
        }

        const typography = this.typographyComputed() as any;
        const textStyle = this.textStyleComputed() as any;

        return (
            typography?.[state]?.color ??
            textStyle?.[state]?.color ??
            typography?.default?.color ??
            textStyle?.default?.color
        );
    });

    /* */

    // ── Animations on Host ───────────────────────────────────────────────────
    protected readonly resolvedStage = computed(() => {
        const config = this.animationsComputed();
        if (!config) return undefined;
        return this.isExiting() ? config.exitStage : (config.enterStage || config.type);
    });

    protected readonly resolvedClasses = computed(() => {
        const stage = this.resolvedStage();
        if (!stage) return [];

        let stageStr = typeof stage === 'string' ? stage : (stage as any).name || (stage as any).type;
        if (!stageStr || stageStr === 'none') return [];

        const classes = ['animate__animated'];
        if (stageStr.includes('animate__')) {
            classes.push(...stageStr.split(' ').filter((c: string) => c.trim()));
        } else {
            classes.push(`animate__${stageStr}`);
        }

        const config = this.animationsComputed();
        if (config?.infinite && !this.isExiting()) {
            classes.push('animate__infinite');
        }

        return Array.from(new Set(classes));
    });

    protected readonly resolvedDuration = computed(() => {
        const stage = this.resolvedStage();
        const config = this.animationsComputed();
        if (stage && typeof stage !== 'string' && (stage as any).duration) return (stage as any).duration;
        return config?.duration || '500ms';
    });

    protected readonly resolvedDelay = computed(() => {
        const stage = this.resolvedStage();
        const config = this.animationsComputed();
        if (this.isExiting()) return '0s';
        if (stage && typeof stage !== 'string' && (stage as any).delay) return (stage as any).delay;
        return config?.delay;
    });

    protected readonly resolvedIterationCount = computed(() => {
        const stage = this.resolvedStage();
        const config = this.animationsComputed();
        if (stage && typeof stage !== 'string' && (stage as any).iterationCount) return (stage as any).iterationCount;
        if (config?.infinite && !this.isExiting()) return 'infinite';
        return config?.iterationCount;
    });

    protected readonly resolvedTimingFunction = computed(() => {
        const stage = this.resolvedStage();
        const config = this.animationsComputed();
        if (stage && typeof stage !== 'string' && (stage as any).timingFunction) return (stage as any).timingFunction;
        return config?.timingFunction;
    });

    protected readonly resolvedFillMode = computed(() => {
        const stage = this.resolvedStage();
        const config = this.animationsComputed();
        if (stage && typeof stage !== 'string' && (stage as any).fillMode) return (stage as any).fillMode;
        return config?.fillMode;
    });

    protected readonly resolvedDirection = computed(() => {
        const stage = this.resolvedStage();
        const config = this.animationsComputed();
        if (stage && typeof stage !== 'string' && (stage as any).direction) return (stage as any).direction;
        return config?.direction;
    });



    private readonly _animationsEffect = effect(() => {
        const el = this.el.nativeElement as HTMLElement;
        const newClasses = this.resolvedClasses();

        this.previousAnimClasses.forEach(cls => {
            if (!newClasses.includes(cls)) el.classList.remove(cls);
        });

        newClasses.forEach(cls => {
            if (!this.previousAnimClasses.includes(cls)) el.classList.add(cls);
        });

        this.previousAnimClasses = [...newClasses];

        const set = (prop: string, val: string | number | undefined) => {
            if (val != null) el.style.setProperty(prop, String(val));
            else el.style.removeProperty(prop);
        };

        set('--animate-duration', this.resolvedDuration());
        set('--animate-delay', this.resolvedDelay());
        set('--animate-repeat', this.resolvedIterationCount());
        set('animation-timing-function', this.resolvedTimingFunction());
        set('animation-fill-mode', this.resolvedFillMode());
        set('animation-direction', this.resolvedDirection());
    });

    // ── Transitions on Host ───────────────────────────────────────────────────
    private readonly _transitionEffect = effect(() => {
        const tr = this.transitionComputed();
        const p = this.cssPrefix();
        const el = this.el.nativeElement as HTMLElement;

        if (!p) return;

        // Limpiar propiedades previas
        for (const sfx of ['', '-hover', '-active', '-focus', '-disabled']) {
            for (const prop of ['duration', 'timing-function', 'delay', 'property']) {
                el.style.removeProperty(`${p}-transition${sfx}-${prop}`);
                el.style.removeProperty(`--alf-transition${sfx}-${prop}`);
            }
        }

        if (!tr) return;

        const set = (prop: string, val: any) => {
            if (val != null) {
                el.style.setProperty(prop, String(val));
                if (prop.startsWith(`${p}-transition`)) {
                    const globalProp = prop.replace(p, '--alf');
                    el.style.setProperty(globalProp, String(val));
                }
            }
        };

        const applyState = (state: AlfTransitionBaseInterface | undefined, sfx: string) => {
            if (!state) return;
            set(`${p}-transition${sfx}-duration`, state.duration);
            set(`${p}-transition${sfx}-timing-function`, state.timingFunction);
            set(`${p}-transition${sfx}-delay`, state.delay);
            set(`${p}-transition${sfx}-property`, state.property);
        };

        applyState(tr.default, '');
        applyState(tr.hover, '-hover');
        applyState(tr.active, '-active');
        applyState(tr.focus, '-focus');
        applyState(tr.disabled, '-disabled');
    });

    // ── Display & Layout on Host ──────────────────────────────────────────────
    private readonly LAYOUT_PROPS = [
        'display', 'position', 'top', 'right', 'bottom', 'left', 'z-index', 'box-sizing',
        'width', 'height', 'min-width', 'max-width', 'min-height', 'max-height',
        'overflow', 'overflow-x', 'overflow-y', 'visibility', 'object-fit',
        'flex-direction', 'justify-content', 'align-items', 'gap', 'flex-wrap',
        'opacity', 'pointer-events', 'cursor',
    ] as const;

    private readonly STATES = ['', '-hover', '-active', '-focus', '-disabled'] as const;

    private readonly _displayAndLayoutEffect = effect(() => {
        const dl = this.displayAndLayoutComputed();
        const p = this.cssPrefix();
        const el = this.el.nativeElement as HTMLElement;

        if (!p) return;

        for (const sfx of this.STATES) {
            for (const prop of this.LAYOUT_PROPS) {
                el.style.removeProperty(`${p}-layout${sfx}-${prop}`);
            }
        }

        if (!dl) return;

        const set = (prop: string, val: any) => {
            if (val != null) el.style.setProperty(prop, String(val));
        };

        const applyState = (state: any, sfx: string) => {
            if (!state) return;
            set(`${p}-layout${sfx}-display`, state.display);
            set(`${p}-layout${sfx}-position`, state.position);
            set(`${p}-layout${sfx}-top`, state.top);
            set(`${p}-layout${sfx}-right`, state.right);
            set(`${p}-layout${sfx}-bottom`, state.bottom);
            set(`${p}-layout${sfx}-left`, state.left);
            set(`${p}-layout${sfx}-z-index`, state.zIndex);
            set(`${p}-layout${sfx}-box-sizing`, state.boxSizing);
            set(`${p}-layout${sfx}-width`, state.width);
            set(`${p}-layout${sfx}-height`, state.height);
            set(`${p}-layout${sfx}-min-width`, state.minWidth);
            set(`${p}-layout${sfx}-max-width`, state.maxWidth);
            set(`${p}-layout${sfx}-min-height`, state.minHeight);
            set(`${p}-layout${sfx}-max-height`, state.maxHeight);
            set(`${p}-layout${sfx}-overflow`, state.overflow);
            set(`${p}-layout${sfx}-overflow-x`, state.overflowX);
            set(`${p}-layout${sfx}-overflow-y`, state.overflowY);
            set(`${p}-layout${sfx}-visibility`, state.visibility);
            set(`${p}-layout${sfx}-object-fit`, state.objectFit);
            set(`${p}-layout${sfx}-flex-direction`, state.flexDirection);
            set(`${p}-layout${sfx}-justify-content`, state.justifyContent);
            set(`${p}-layout${sfx}-align-items`, state.alignItems);
            set(`${p}-layout${sfx}-gap`, state.gap);
            set(`${p}-layout${sfx}-flex-wrap`, state.flexWrap);
            set(`${p}-layout${sfx}-opacity`, state.opacity);
            set(`${p}-layout${sfx}-pointer-events`, state.pointerEvents);
            set(`${p}-layout${sfx}-cursor`, state.cursor);
        };

        applyState(dl.default, '');
        applyState(dl.hover, '-hover');
        applyState(dl.active, '-active');
        applyState(dl.focus, '-focus');
        applyState(dl.disabled, '-disabled');
    });
    // ── 4. Methods for Validation & CVA ───────────────────────────────
    protected getControlValue(): any {
        return undefined;
    }
    protected getControlType(): string | undefined {
        return undefined;
    }
    protected getValidationLabel(key: string): string {
        return undefined;
    }
    protected getControlConfig(): any {
        return undefined;
    }

    protected setControlValue(val: any): void { }
    protected setControlDisabled(isDisabled: boolean): void {
        this._disabled.set(isDisabled);
    }

    // ── 4b. ControlValueAccessor Implementation ─────────────────────────────────
    protected onChange?: (value: any) => void;
    protected onTouched?: () => void;

    public writeValue(obj: any): void {
        this.setControlValue(obj);
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.setControlDisabled(isDisabled);
    }

    // ── 4c. State Validation ───────────────────────────────────────────────────
    protected readonly requiredComputed = computed(() => this.required() ?? this.getControlConfig()?.required ?? false);
    protected readonly maxLengthComputed = computed(() => this.maxLength() ?? this.getControlConfig()?.maxLength);
    protected readonly minLengthComputed = computed(() => this.minLength() ?? this.getControlConfig()?.minLength);
    protected readonly minComputed = computed(() => this.min() ?? this.getControlConfig()?.min);
    protected readonly maxComputed = computed(() => this.max() ?? this.getControlConfig()?.max);
    protected readonly patternComputed = computed(() => this.pattern() ?? this.getControlConfig()?.pattern);

    protected readonly validatorsComputed = computed(() => {
        const v1 = this.validators() ?? [];
        const v2 = this.getControlConfig()?.validators ?? [];
        const allValidators = [...v1, ...v2];

        if (this.requiredComputed()) allValidators.push(alfRequiredValidator);
        if (this.minLengthComputed() !== undefined) allValidators.push(alfMinLengthValidator(Number(this.minLengthComputed()!)));
        if (this.maxLengthComputed() !== undefined) allValidators.push(alfMaxLengthValidator(Number(this.maxLengthComputed()!)));
        if (this.minComputed() !== undefined) allValidators.push(alfMinValidator(Number(this.minComputed()!)));
        if (this.maxComputed() !== undefined) allValidators.push(alfMaxValidator(Number(this.maxComputed()!)));
        if (this.patternComputed() !== undefined) allValidators.push(alfPatternValidator(this.patternComputed()!));

        const type = this.getControlType();
        if (type === 'email') allValidators.push(alfEmailValidator);

        return allValidators;
    });

    protected readonly validationError = computed(() => {
        const val = this.getControlValue();
        if (!this.isDirty() && (val === undefined || val === null || val === '')) return null;

        const allValidators = this.validatorsComputed();
        if (allValidators.length === 0) return null;

        for (const validator of allValidators) {
            const result = validator(val);
            if (!result.isValid) {
                let message = '';
                if (result.code) {
                    const label = this.getValidationLabel(result.code);
                    if (result.code === 'validatorMaxLength' && this.maxLengthComputed() !== undefined) {
                        message = interpolate(label, this.maxLengthComputed());
                    } else if (result.code === 'validatorMinLength' && this.minLengthComputed() !== undefined) {
                        message = interpolate(label, this.minLengthComputed());
                    } else if (result.code === 'validatorMin' && this.minComputed() !== undefined) {
                        message = interpolate(label, this.minComputed());
                    } else if (result.code === 'validatorMax' && this.maxComputed() !== undefined) {
                        message = interpolate(label, this.maxComputed());
                    } else {
                        message = label;
                    }
                } else {
                    message = result.error || 'Error';
                }
                return message;
            }
        }
        return null;
    });

    protected readonly errorComputed = computed(() => this.error() ?? this.validationError() ?? this.getControlConfig()?.error);

    // ── 8. Base Handlers & Initialization ─────────────────────────────────────
    protected readonly initialization = (cssPrefixIn: string, baseCssClassIn: string, componentTypeIn: AlfComponentTypeEnum) => {
        this.cssPrefix.set(cssPrefixIn);
        this.baseCssClass.set(baseCssClassIn);
        this.componentType.set(componentTypeIn);
    }

    protected readonly handleFocus = (event: FocusEvent): void => {
        this.isFocused.set(true);
        this.onFocus.emit(event);
    };

    protected readonly markAsDirty = (): void => {
        if (!this.isDirty()) {
            this.isDirty.set(true);
            if (this.onTouched) {
                this.onTouched();
            }
        }
    };

    protected readonly handleBlur = (event: FocusEvent): void => {
        this.markAsDirty();
        this.isFocused.set(false);
        this.onBlur.emit(event);
    };

    // ── 9. Getters & Setters ──────────────────────────────────────────────────
    protected getInternalBackground() { return untracked(() => this._background()); }
    protected getInternalBorder() { return untracked(() => this._border()); }
    protected getInternalOutline() { return untracked(() => this._outline()); }
    protected getInternalShadows() { return untracked(() => this._shadows()); }
    protected getInternalMargin() { return untracked(() => this._margin()); }
    protected getInternalPadding() { return untracked(() => this._padding()); }
    protected getInternalTypography() { return untracked(() => this._typography()); }
    protected getInternalTextStyle() { return untracked(() => this._textStyle()); }
    protected getInternalTransform() { return untracked(() => this._transform()); }
    protected getInternalTransition() { return untracked(() => this._transition()); }
    protected getInternalDisplayAndLayout() { return untracked(() => this._displayAndLayout()); }
    protected getInternalAnimations() { return untracked(() => this._animations()); }
    protected getInternalAppearance() { return this._appearance(); }

    public readonly isSolid3dGradient = computed(() => {
        const v = this.variant() || AlfColorVariantEnum.Default;
        if (v === AlfColorVariantEnum.Default || v === AlfColorVariantEnum.Standard || v === AlfColorVariantEnum.Transparent) return false;
        if (v.includes('outline') || v.includes('ghost') || v.includes('soft') || v.includes('crystal')) return false;
        return true;
    });

    protected setBackground(value: AlfBackgroundsInterface | AlfBackgroundsBaseInterface) { this._background.set(value); }
    protected setBorder(value: AlfBorderInterface | AlfBorderBaseInterface) { this._border.set(value); }
    protected setOutline(value: AlfOutlineInterface | AlfOutlineBaseInterface) { this._outline.set(value); }
    protected setShadows(value: AlfShadowsInterface | AlfShadowsBaseInterface) { this._shadows.set(value); }
    protected setMargin(value: AlfMarginInterface | AlfMarginBaseInterface) { this._margin.set(value); }
    protected setPadding(value: AlfPaddingInterface | AlfPaddingBaseInterface) { this._padding.set(value); }
    protected setTypography(value: AlfTypographyInterface | AlfTypographyBaseInterface) { this._typography.set(value); }
    protected setTextStyle(value: AlfTextStyleInterface | AlfTextStyleStateBaseInterface) { this._textStyle.set(value); }
    protected setTransform(value: AlfTransformInterface | AlfTransformBaseInterface) { this._transform.set(value); }
    protected setTransition(value: AlfTransitionInterface | AlfTransitionBaseInterface) { this._transition.set(value); }
    protected setDisplayAndLayout(value: AlfDisplayAndLayoutInterface | AlfDisplayAndLayoutBaseInterface) { this._displayAndLayout.set(value); }
    protected setAnimations(value: AlfAnimateCssInterface) { this._animations.set(value); }
    protected setAppearance(value: AlfInputAppearanceEnum) { this._appearance.set(value); }








    // ── 10. Component Generation Factories ─────────────────────────────────────
    protected predefinedInputComponent = () => {
        const createComponent = this.createSolidComponent(AlfColorVariantEnum.Standard);
        return createComponent;
    };

    protected createSolidComponent = (variant: AlfColorVariantEnum, padding: AlfPaddingBaseInterface = defaultPadding): {
        padding: AlfPaddingInterface,
        border: AlfBorderInterface,
        textStyle: AlfTextStyleInterface,
        background: AlfBackgroundsInterface,
        shadows?: AlfShadowsInterface
    } => {
        return createSolidComponent(variant, padding, this.elevated());
    }

    protected createSolidComponentSoftBackground = (variant: AlfColorVariantEnum, padding: AlfPaddingBaseInterface = defaultPadding): {
        background: AlfBackgroundsInterface,
        border: AlfBorderInterface,
        padding: AlfPaddingInterface,
        textStyle: AlfTextStyleInterface,
        shadows?: AlfShadowsInterface
    } => {
        const baseComponent = createSolidComponentSoftBackground(variant, padding, this.elevated());
        return {
            padding: deepMergeStates(baseComponent.padding, this.getInternalPadding()),
            border: deepMergeStates(baseComponent.border, this.getInternalBorder()),
            textStyle: deepMergeStates(baseComponent.textStyle, this.getInternalTextStyle()),
            background: deepMergeStates(baseComponent.background, this.getInternalBackground()),
            shadows: baseComponent.shadows
        };
    }

    protected create3dComponentSolidText = (variant: AlfColorVariantEnum, padding: AlfPaddingBaseInterface = defaultPadding): {
        border: AlfBorderInterface,
        padding: AlfPaddingInterface,
        textStyle: AlfTextStyleInterface,
        background: AlfBackgroundsInterface,
        shadows?: AlfShadowsInterface
    } => {
        return create3dComponentSolidText(variant, padding, this.elevated());
    }
}






//* ************************************* */
//* **** Funciones fuera de la clase **** */
//* ************************************* */



const inputBackgroundPredefined = (color: any): AlfBackgroundsInterface => {
    const resolveBg = (c: any) => {
        if (!c) return {};
        if (typeof c === 'string' && c.includes('gradient')) {
            return { backgroundImage: c };
        }
        return { backgroundColor: c };
    };

    return {
        default: resolveBg(color.default),
        hover: resolveBg(color.hover),
        focus: resolveBg(color.focus),
        disabled: resolveBg(color.disabled),
        active: resolveBg(color.active)
    }
}

const inputPaddingPredefined = (padding?: AlfPaddingBaseInterface): AlfPaddingInterface | undefined => {
    return {
        default: {
            paddingTop: padding?.paddingTop,
            paddingBottom: padding?.paddingBottom,
            paddingLeft: padding?.paddingLeft,
            paddingRight: padding?.paddingRight,
        }
    }
}

const inputTextStylePredefined = (color: {
    default: AlfColorEnum;
    hover: AlfColorEnum;
    focus: AlfColorEnum;
    disabled: AlfColorEnum;
    active: AlfColorEnum;
}): AlfTextStyleInterface => {
    return {
        default: {
            fontSize: AlfFontSizeEnum.Md,
            color: color.default
        },
        hover: { color: color.hover },
        focus: { color: color.focus },
        disabled: { color: color.disabled },
        active: { color: color.active }
    }
}

const inputBorderPredefined = (width: AlfPxEnum, radius: AlfRadiusEnum, style: AlfBorderStyleEnum, color: {
    default: AlfColorEnum;
    hover: AlfColorEnum;
    focus: AlfColorEnum;
    disabled: AlfColorEnum;
    active: AlfColorEnum;
}): AlfBorderInterface => {

    const defaultColor = {
        borderWidth: width,
        borderRadius: radius,
        borderColor: color.default,
        borderStyle: style
    }

    return {
        default: {
            ...defaultColor,
            borderColor: color.default
        },
        hover: { borderColor: color.hover },
        focus: { borderColor: color.focus },
        disabled: { borderColor: color.disabled },
        active: { borderColor: color.active }
    };
}

export const createSolidComponent = (variant: AlfColorVariantEnum, padding: AlfPaddingBaseInterface = defaultPadding, elevated: boolean = false): {
    padding: AlfPaddingInterface,
    border: AlfBorderInterface,
    textStyle: AlfTextStyleInterface,
    background: AlfBackgroundsInterface,
    shadows?: AlfShadowsInterface
} => {
    const borderColor = getPredefinedColorByVariant(variant, 0);
    const textColor = getPredefinedColorByVariant(variant, 1);
    const backgroundColor = getPredefinedColorByVariant(variant, 2);

    let shadows: AlfShadowsInterface | undefined = undefined;
    if (elevated) {
        shadows = {
            default: {
                boxShadow: AlfShadowEnum.Elevated,
                boxShadowColor: borderColor.default
            }
        };
    }

    return {
        padding: inputPaddingPredefined(padding)!,
        border: inputBorderPredefined(AlfPxEnum.Px015, AlfRadiusEnum.Md, AlfBorderStyleEnum.Solid, borderColor),
        textStyle: inputTextStylePredefined(textColor),
        background: inputBackgroundPredefined(backgroundColor),
        shadows: shadows
    };
}

export const createSolidComponentSoftBackground = (variant: AlfColorVariantEnum, padding: AlfPaddingBaseInterface = defaultPadding, elevated: boolean = false): {
    background: AlfBackgroundsInterface,
    border: AlfBorderInterface,
    padding: AlfPaddingInterface,
    textStyle: AlfTextStyleInterface,
    shadows?: AlfShadowsInterface
} => {
    const variantString = variant as string;
    const softVariantValue = `soft-${variantString}`;
    const softVariant = Object.values(AlfColorVariantEnum).find(v => v === softVariantValue) as AlfColorVariantEnum || variant;

    const borderColor = getPredefinedColorByVariant(variant, 0);
    const textColor = getPredefinedColorByVariant(variant, 1);
    const backgroundColor = getPredefinedColorByVariant(softVariant, 2);

    let shadows: AlfShadowsInterface | undefined = undefined;
    if (elevated) {
        shadows = {
            default: {
                boxShadow: AlfShadowEnum.Elevated,
                boxShadowColor: borderColor.default
            }
        };
    }

    return {
        padding: inputPaddingPredefined(padding)!,
        border: inputBorderPredefined(AlfPxEnum.Px015, AlfRadiusEnum.Md, AlfBorderStyleEnum.Solid, borderColor),
        textStyle: inputTextStylePredefined(textColor),
        background: inputBackgroundPredefined(backgroundColor),
        shadows: shadows
    };
}

export const create3dComponentSolidText = (variant: AlfColorVariantEnum, padding: AlfPaddingBaseInterface = defaultPadding, elevated: boolean = false): {
    border: AlfBorderInterface,
    padding: AlfPaddingInterface,
    textStyle: AlfTextStyleInterface,
    background: AlfBackgroundsInterface,
    shadows?: AlfShadowsInterface
} => {
    const borderColor = getPredefinedColorByVariant(variant, 0);
    const textColor = getPredefinedColorByVariant(variant, 1);
    const backgroundColor = getPredefinedColorByVariant(variant, 2);

    let shadows: AlfShadowsInterface | undefined = undefined;
    if (elevated) {
        shadows = {
            default: {
                boxShadow: AlfShadowEnum.Elevated,
                boxShadowColor: borderColor.default
            }
        };
    }

    return {
        padding: inputPaddingPredefined(padding)!,
        border: inputBorderPredefined(AlfPxEnum.Px3, AlfRadiusEnum.Md, AlfBorderStyleEnum.Ridge, borderColor),
        textStyle: inputTextStylePredefined(textColor),
        background: inputBackgroundPredefined(backgroundColor),
        shadows: shadows
    };
}



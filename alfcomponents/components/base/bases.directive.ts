import { AlfBorderStyleEnum, AlfColorEnum, AlfColorVariantEnum, AlfFontSizeEnum, AlfInputAppearanceEnum, AlfPxEnum, AlfRadiusEnum } from "@alfcomponents/enums";
import { AlfBackgroundsInterface, AlfBackgroundsBaseInterface, AlfBorderInterface, AlfBorderBaseInterface, AlfOutlineInterface, AlfOutlineBaseInterface, AlfShadowsInterface, AlfShadowsBaseInterface, AlfMarginInterface, AlfMarginBaseInterface, AlfPaddingInterface, AlfPaddingBaseInterface, AlfTypographyInterface, AlfTypographyBaseInterface, AlfTextStyleInterface, AlfTextStyleStateBaseInterface, AlfTransformInterface, AlfTransformBaseInterface, AlfTransitionInterface, AlfTransitionBaseInterface, AlfDisplayAndLayoutInterface, AlfDisplayAndLayoutBaseInterface } from "@alfcomponents/interfaces";
import { AlfValidationResult, alfRequiredValidator, alfMinLengthValidator, alfMaxLengthValidator, alfMinValidator, alfMaxValidator, alfPatternValidator, alfEmailValidator } from '@alfcomponents/shared';
import { interpolate } from '@alfcomponents/i18n/i18n-utils';
import { computed, Directive, input, signal, untracked, output } from "@angular/core";
import { ControlValueAccessor } from '@angular/forms';

export enum AlfComponentTypeEnum {
    Button = 'Button',
    Switch = 'Switch',
    Checkbox = 'Checkbox',
    RadioButton = 'RadioButton',
    Input = 'Input',
    Textarea = 'Textarea',
    Tabs = 'alf-tabs',
    Autocomplete = 'Autocomplete',
    Card = 'Card',
    Default = 'Default',
}

const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

export const deepMergeStates = (...configs: any[]): any => {
    const result: any = {};
    for (const config of configs) {
        if (!config) continue;
        for (const [state, stateObj] of Object.entries(config)) {
            if (!stateObj) continue;
            result[state] = { ...result[state], ...(stateObj as any) };
        }
    }
    return Object.keys(result).length > 0 ? result : undefined;
}

@Directive()
export abstract class AlfBaseDirectives implements ControlValueAccessor {
    // ── 1. Inputs ─────────────────────────────────────────────────────────────
    public readonly variant = input<AlfColorVariantEnum>(undefined);
    public readonly disabled = input<boolean>(false);
    public readonly isLoading = input<boolean>(false);

    public readonly background = input<AlfBackgroundsInterface | AlfBackgroundsBaseInterface | undefined>(undefined);
    public readonly border = input<AlfBorderInterface | AlfBorderBaseInterface | undefined>(undefined);
    public readonly outline = input<AlfOutlineInterface | AlfOutlineBaseInterface | undefined>(undefined);
    public readonly shadows = input<AlfShadowsInterface | AlfShadowsBaseInterface | undefined>(undefined);
    public readonly margin = input<AlfMarginInterface | AlfMarginBaseInterface | undefined>(undefined);
    public readonly padding = input<AlfPaddingInterface | AlfPaddingBaseInterface | undefined>(undefined);
    public readonly typography = input<AlfTypographyInterface | AlfTypographyBaseInterface | undefined>(undefined);
    public readonly textStyle = input<AlfTextStyleInterface | AlfTextStyleStateBaseInterface | undefined>(undefined);
    public readonly transform = input<AlfTransformInterface | AlfTransformBaseInterface | undefined>(undefined);
    public readonly transition = input<AlfTransitionInterface | AlfTransitionBaseInterface | undefined>(undefined);
    public readonly displayAndLayout = input<AlfDisplayAndLayoutInterface | AlfDisplayAndLayoutBaseInterface | undefined>(undefined);

    // Validation Inputs
    public readonly required = input<boolean>(false);
    public readonly maxLength = input<number>();
    public readonly minLength = input<number>();
    public readonly min = input<number>();
    public readonly max = input<number>();
    public readonly pattern = input<string>();
    public readonly validators = input<((v: any) => AlfValidationResult)[]>([]);
    public readonly error = input<string>();

    // ── 2. Outputs ────────────────────────────────────────────────────────────
    public readonly onFocus = output<FocusEvent>();
    public readonly onBlur = output<FocusEvent>();

    // ── 3. Internal State (Signals) ───────────────────────────────────────────
    protected readonly isFocused = signal<boolean>(false);
    protected readonly isDirty = signal<boolean>(false);
    protected readonly componentType = signal<AlfComponentTypeEnum>(AlfComponentTypeEnum.Default);
    protected readonly cssPrefix = signal<string>('');
    protected readonly baseCssClass = signal<string>('');

    private readonly _background = signal<AlfBackgroundsInterface | AlfBackgroundsBaseInterface | undefined>(undefined, { equal: deepEqual });
    private readonly _border = signal<AlfBorderInterface | AlfBorderBaseInterface | undefined>(undefined, { equal: deepEqual });
    private readonly _outline = signal<AlfOutlineInterface | AlfOutlineBaseInterface | undefined>(undefined, { equal: deepEqual });
    private readonly _shadows = signal<AlfShadowsInterface | AlfShadowsBaseInterface | undefined>(undefined, { equal: deepEqual });
    private readonly _margin = signal<AlfMarginInterface | AlfMarginBaseInterface | undefined>(undefined, { equal: deepEqual });
    private readonly _padding = signal<AlfPaddingInterface | AlfPaddingBaseInterface | undefined>(undefined, { equal: deepEqual });
    private readonly _typography = signal<AlfTypographyInterface | AlfTypographyBaseInterface | undefined>(undefined, { equal: deepEqual });
    private readonly _textStyle = signal<AlfTextStyleInterface | AlfTextStyleStateBaseInterface | undefined>(undefined, { equal: deepEqual });
    private readonly _transform = signal<AlfTransformInterface | AlfTransformBaseInterface | undefined>(undefined, { equal: deepEqual });
    private readonly _transition = signal<AlfTransitionInterface | AlfTransitionBaseInterface | undefined>(undefined, { equal: deepEqual });
    private readonly _displayAndLayout = signal<AlfDisplayAndLayoutInterface | AlfDisplayAndLayoutBaseInterface | undefined>(undefined, { equal: deepEqual });

    // ── 4. Computed State ─────────────────────────────────────────────────────
    public readonly backgroundComputed = computed(() => deepMergeStates(this._background(), this.background()));
    public readonly borderComputed = computed(() => deepMergeStates(this._border(), this.border()));
    public readonly outlineComputed = computed(() => deepMergeStates(this._outline(), this.outline()));
    public readonly shadowsComputed = computed(() => deepMergeStates(this._shadows(), this.shadows()));
    public readonly marginComputed = computed(() => deepMergeStates(this._margin(), this.margin()));
    public readonly paddingComputed = computed(() => deepMergeStates(this._padding(), this.padding()));
    public readonly typographyComputed = computed(() => deepMergeStates(this._typography(), this.typography()));
    public readonly textStyleComputed = computed(() => deepMergeStates(this._textStyle(), this.textStyle()));
    public readonly transformComputed = computed(() => deepMergeStates(this._transform(), this.transform()));

    // ── 4. Abstract Methods for Validation & CVA ───────────────────────────────
    protected abstract getControlValue(): any;
    protected abstract getControlType(): string | undefined;
    protected abstract getValidationLabel(key: string): string;
    protected abstract getControlConfig(): any;
    protected abstract setControlValue(val: any): void;
    protected abstract setControlDisabled(isDisabled: boolean): void;

    // ── 5. ControlValueAccessor Implementation ─────────────────────────────────
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

    // ── 6. State Validation ───────────────────────────────────────────────────
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

    // ── 5. Base Handlers & Initialization ─────────────────────────────────────
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

    // ── 6. Getters & Setters ──────────────────────────────────────────────────
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

    // ── 7. Component Generation Factories ─────────────────────────────────────
    protected predefinedInputComponent = () => {
        const createComponent = this.createSolidComponent(AlfColorVariantEnum.SecondaryOutline);
        return createComponent;
    };

    protected createSolidComponent = (variant: AlfColorVariantEnum): {
        padding: AlfPaddingInterface,
        border: AlfBorderInterface,
        textStyle: AlfTextStyleInterface,
        background: AlfBackgroundsInterface
    } => {
        const borderColor = this.getColorByVariant(variant, 0);
        const textColor = this.getColorByVariant(variant, 1);
        const backgroundColor = this.getColorByVariant(variant, 2);

        let component: {
            padding: AlfPaddingInterface,
            border: AlfBorderInterface,
            textStyle: AlfTextStyleInterface,
            background: AlfBackgroundsInterface
        } = {
            padding: this.inputPaddingPredefined(AlfPxEnum.Px10, AlfPxEnum.Px10, AlfPxEnum.Px15, AlfPxEnum.Px5)!,
            border: this.inputBorderPredefined(AlfPxEnum.Px015, AlfRadiusEnum.Md, AlfBorderStyleEnum.Solid, borderColor),
            textStyle: this.inputTextStylePredefined(textColor),
            background: this.inputBackgroundPredefined(backgroundColor)
        };

        return component;
    }

    protected createSolidComponentSoftBackground = (variant: AlfColorVariantEnum): {
        padding: AlfPaddingInterface,
        border: AlfBorderInterface,
        textStyle: AlfTextStyleInterface,
        background: AlfBackgroundsInterface
    } => {
        const variantString = variant as string;
        const softVariantValue = `soft-${variantString}`;
        const softVariant = Object.values(AlfColorVariantEnum).find(v => v === softVariantValue) as AlfColorVariantEnum || variant;

        const borderColor = this.getColorByVariant(variant, 0);
        const textColor = this.getColorByVariant(variant, 1);
        const backgroundColor = this.getColorByVariant(softVariant, 2);

        let component: {
            padding: AlfPaddingInterface,
            border: AlfBorderInterface,
            textStyle: AlfTextStyleInterface,
            background: AlfBackgroundsInterface
        } = {
            padding: deepMergeStates(this.inputPaddingPredefined(AlfPxEnum.Px10, AlfPxEnum.Px10, AlfPxEnum.Px15, AlfPxEnum.Px5), this.getInternalPadding()),
            border: deepMergeStates(this.inputBorderPredefined(AlfPxEnum.Px015, AlfRadiusEnum.Md, AlfBorderStyleEnum.Solid, borderColor), this.getInternalBorder()),
            textStyle: deepMergeStates(this.inputTextStylePredefined(textColor), this.getInternalTextStyle()),
            background: deepMergeStates(this.inputBackgroundPredefined(backgroundColor), this.getInternalBackground())
        };

        return component;
    }

    protected create3dComponentSolidText = (variant: AlfColorVariantEnum): {
        padding: AlfPaddingInterface,
        border: AlfBorderInterface,
        textStyle: AlfTextStyleInterface,
        background: AlfBackgroundsInterface
    } => {
        const variantString = variant as string;
        // El variant es tipo 'depth-primary'. Buscamos el equivalente solid ('primary')
        const solidVariantValue = variantString.replace('depth-', '');
        const solidVariant = Object.values(AlfColorVariantEnum).find(v => v === solidVariantValue) as AlfColorVariantEnum || variant;

        const borderColor = this.getColorByVariant(variant, 0); // Borde 3D
        const textColor = this.getColorByVariant(variant, 1); // Texto del 3D
        const backgroundColor = this.getColorByVariant(variant, 2); // Fondo 3D

        let component: {
            padding: AlfPaddingInterface,
            border: AlfBorderInterface,
            textStyle: AlfTextStyleInterface,
            background: AlfBackgroundsInterface
        } = {
            padding: this.inputPaddingPredefined(AlfPxEnum.Px10, AlfPxEnum.Px10, AlfPxEnum.Px15, AlfPxEnum.Px5)!,
            border: this.inputBorderPredefined(AlfPxEnum.Px3, AlfRadiusEnum.Md, AlfBorderStyleEnum.Ridge, borderColor),
            textStyle: this.inputTextStylePredefined(textColor),
            background: this.inputBackgroundPredefined(backgroundColor)
        };

        return component;
    }

    // ── 8. Private Helpers ────────────────────────────────────────────────────
    private readonly inputBackgroundPredefined = (color: any): AlfBackgroundsInterface => {
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

    private readonly inputPaddingPredefined = (top?: AlfPxEnum, bottom?: AlfPxEnum, left?: AlfPxEnum, right?: AlfPxEnum): AlfPaddingInterface | undefined => {
        return {
            default: {
                paddingTop: top,
                paddingBottom: bottom,
                paddingLeft: left,
                paddingRight: right,
            }
        }
    }

    private readonly inputTextStylePredefined = (color: {
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

    private readonly inputBorderPredefined = (width: AlfPxEnum, radius: AlfRadiusEnum, style: AlfBorderStyleEnum, color: {
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

    private readonly getColorByVariant = (variant: AlfColorVariantEnum, seleccion: number): {
        default: AlfColorEnum,
        hover: AlfColorEnum,
        focus: AlfColorEnum,
        disabled: AlfColorEnum,
        active: AlfColorEnum,
    } => {
        const variantKeys = Object.keys(AlfColorVariantEnum) as (keyof typeof AlfColorVariantEnum)[];
        const prefix = variantKeys.find(key => AlfColorVariantEnum[key] === variant) || 'Default';

        let suffixDefault = '';
        let suffixHover = 'Hover';
        let suffixFocus = 'Focus';
        let suffixDisabled = 'Disabled';
        let suffixActive = 'Active';

        if (seleccion === 0) {
            suffixDefault = 'Border';
            suffixHover = 'BorderHover';
            suffixFocus = 'BorderFocus';
            suffixDisabled = 'BorderDisabled';
            suffixActive = 'BorderActive';
        } else if (seleccion === 1) {
            suffixDefault = 'Text';
            suffixHover = 'TextHover';
            suffixFocus = 'TextFocus';
            suffixDisabled = 'TextDisabled';
            suffixActive = 'TextActive';
        } else if (seleccion === 2) {
            suffixDefault = 'BG';
            suffixHover = 'HoverBG';
            suffixFocus = 'FocusBG';
            suffixDisabled = 'DisabledBG';
            suffixActive = 'ActiveBG';
        }

        const kDefault = `${prefix}${suffixDefault}` as keyof typeof AlfColorEnum;
        const kHover = `${prefix}${suffixHover}` as keyof typeof AlfColorEnum;
        const kFocus = `${prefix}${suffixFocus}` as keyof typeof AlfColorEnum;
        const kDisabled = `${prefix}${suffixDisabled}` as keyof typeof AlfColorEnum;
        const kActive = `${prefix}${suffixActive}` as keyof typeof AlfColorEnum;

        return {
            default: AlfColorEnum[kDefault] || AlfColorEnum.Transparent,
            hover: AlfColorEnum[kHover] || AlfColorEnum.Transparent,
            focus: AlfColorEnum[kFocus] || AlfColorEnum.Transparent,
            disabled: AlfColorEnum[kDisabled] || AlfColorEnum.Transparent,
            active: AlfColorEnum[kActive] || AlfColorEnum.Transparent,
        };
    }
}
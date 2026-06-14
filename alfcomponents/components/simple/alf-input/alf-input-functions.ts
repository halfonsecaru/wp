import {
    AlfInputAppearanceEnum,
    AlfColorVariantEnum,
    AlfPxEnum,
    AlfRadiusEnum,
    AlfColorEnum
} from "@alfcomponents/enums";
import { AlfPaddingInterface, AlfBorderInterface, AlfTextStyleInterface, AlfBackgroundsInterface } from "@alfcomponents/interfaces";
import { AlfValidationResult } from '@alfcomponents/shared';
import { getAlfInputLabel, AlfInputI18nLabels } from './i18n/alf-input.i18n';
import { interpolate } from '@alfcomponents/i18n/i18n-utils';
import { deepMergeStates } from '@alfcomponents/components/base/bases.directive';

export interface InputColorVariants {
    padding: AlfPaddingInterface;
    border: AlfBorderInterface;
    textStyle: AlfTextStyleInterface;
    background: AlfBackgroundsInterface;
}

export const generatedComponentFunction = (
    predefinedInputComponent: InputColorVariants,
    appearance: AlfInputAppearanceEnum,
    currentVariant: AlfColorVariantEnum,
    createSolidComponentSoftBackground: (v: AlfColorVariantEnum) => InputColorVariants,
    create3dComponentSolidText: (v: AlfColorVariantEnum) => InputColorVariants,
    createSolidComponent: (v: AlfColorVariantEnum) => InputColorVariants
) => {

    let component: InputColorVariants = { padding: null, border: null, textStyle: null, background: null };

    if (!appearance) return null;

    if (!currentVariant) {
        component = predefinedInputComponent;
    } else {
        if ([
            AlfColorVariantEnum.PrimarySoft,
            AlfColorVariantEnum.SecondarySoft,
            AlfColorVariantEnum.SuccessSoft,
            AlfColorVariantEnum.DangerSoft,
            AlfColorVariantEnum.WarningSoft,
            AlfColorVariantEnum.InfoSoft,
            AlfColorVariantEnum.LightSoft,
            AlfColorVariantEnum.DarkSoft
        ].includes(currentVariant as any)) {
            component = createSolidComponentSoftBackground(currentVariant);
        } else if ([
            AlfColorVariantEnum.Primary3D,
            AlfColorVariantEnum.Secondary3D,
            AlfColorVariantEnum.Success3D,
            AlfColorVariantEnum.Danger3D,
            AlfColorVariantEnum.Warning3D,
            AlfColorVariantEnum.Info3D,
            AlfColorVariantEnum.Light3D,
            AlfColorVariantEnum.Dark3D
        ].includes(currentVariant as any)) {
            component = create3dComponentSolidText(currentVariant);
        } else {
            component = createSolidComponent(currentVariant);
        }

        // No need to merge with predefinedInputComponent here.
        // predefinedInputComponent is just the fallback when no variant is provided.
        // Manual user overrides are merged in alf-input.ts (e.g. this.background()).
    }

    if (component) {
        // Create a shallow copy of objects we might mutate to avoid polluting cached/base templates
        component = { ...component };

        if (appearance === AlfInputAppearanceEnum.Fill) {
            if (component.border?.default) {
                component.border = JSON.parse(JSON.stringify(component.border));
                component.border.default.borderTopWidth = AlfPxEnum.None;
                component.border.default.borderLeftWidth = AlfPxEnum.None;
                component.border.default.borderRightWidth = AlfPxEnum.None;
                component.border.default.borderBottomWidth = AlfPxEnum.Px2;
                component.border.default.borderBottomLeftRadius = AlfRadiusEnum.None;
                component.border.default.borderBottomRightRadius = AlfRadiusEnum.None;
            }
        } else if (appearance === AlfInputAppearanceEnum.Standard) {
            if (component.border?.default) {
                component.border = JSON.parse(JSON.stringify(component.border));
                component.border.default.borderTopWidth = AlfPxEnum.None;
                component.border.default.borderLeftWidth = AlfPxEnum.None;
                component.border.default.borderRightWidth = AlfPxEnum.None;
                component.border.default.borderBottomWidth = AlfPxEnum.Px2;
                component.border.default.borderBottomLeftRadius = AlfRadiusEnum.None;
                component.border.default.borderBottomRightRadius = AlfRadiusEnum.None;
                component.border.default.borderTopLeftRadius = AlfRadiusEnum.None;
                component.border.default.borderTopRightRadius = AlfRadiusEnum.None;

                if (currentVariant === AlfColorVariantEnum.Light || currentVariant === AlfColorVariantEnum.Light3D) {
                    component.border.default.borderColor = AlfColorEnum.LightOutline;
                    if (component.border.hover) component.border.hover.borderColor = AlfColorEnum.LightOutlineHover;
                    if (component.border.focus) component.border.focus.borderColor = AlfColorEnum.LightOutlineFocus;
                    if (component.border.active) component.border.active.borderColor = AlfColorEnum.LightOutlineActive;
                }
            }

            if (component.background) {
                component.background = {
                    default: {
                        backgroundColor: AlfColorEnum.Transparent,
                        backgroundImage: 'none'
                    }
                };
            }

            if (component.padding) {
                component.padding = JSON.parse(JSON.stringify(component.padding));
                if (component.padding.default) {
                    component.padding.default.paddingTop = AlfPxEnum.Px2;
                    component.padding.default.paddingRight = AlfPxEnum.Px2;
                    component.padding.default.paddingBottom = AlfPxEnum.Px2;
                    component.padding.default.paddingLeft = AlfPxEnum.Px5;
                }
            }

            if (component.textStyle && component.border) {
                component.textStyle = JSON.parse(JSON.stringify(component.textStyle));

                let colorDef = component.border.default?.borderColor;
                let colorHov = component.border.hover?.borderColor;
                let colorFoc = component.border.focus?.borderColor;
                let colorAct = component.border.active?.borderColor;

                if (currentVariant === AlfColorVariantEnum.Light || currentVariant === AlfColorVariantEnum.Light3D) {
                    colorDef = AlfColorEnum.LightText;
                    colorHov = AlfColorEnum.LightTextHover;
                    colorFoc = AlfColorEnum.LightTextFocus;
                    colorAct = AlfColorEnum.LightTextActive;
                }

                if (component.textStyle.default && colorDef) {
                    component.textStyle.default.color = colorDef;
                }
                if (component.textStyle.hover && colorHov) {
                    component.textStyle.hover.color = colorHov;
                }
                if (component.textStyle.focus && colorFoc) {
                    component.textStyle.focus.color = colorFoc;
                }
                if (component.textStyle.active && colorAct) {
                    component.textStyle.active.color = colorAct;
                }
            }
        }
    }
    return component;
}

export const calculateErrorBorder = (baseBorder: AlfBorderInterface | undefined, errorColor: AlfColorEnum | null): AlfBorderInterface | undefined => {
    if (errorColor && baseBorder) {
        const errorDefaultBorder = {
            ...baseBorder.default,
            borderColor: errorColor
        };
        return {
            ...baseBorder,
            default: errorDefaultBorder,
            hover: errorDefaultBorder,
            focus: errorDefaultBorder,
            active: errorDefaultBorder
        };
    }
    return baseBorder;
};

export const calculateErrorTextStyle = (baseTextStyle: AlfTextStyleInterface | undefined, errorColor: AlfColorEnum | null): AlfTextStyleInterface | undefined => {
    if (errorColor && baseTextStyle) {
        const errorDefaultText = {
            ...baseTextStyle.default,
            color: errorColor
        };
        return {
            ...baseTextStyle,
            default: errorDefaultText,
            hover: errorDefaultText,
            focus: errorDefaultText,
            active: errorDefaultText
        };
    }
    return baseTextStyle;
};

export const calculateErrorBackground = (baseBackground: AlfBackgroundsInterface | undefined, hasError: boolean): AlfBackgroundsInterface | undefined => {
    if (hasError && baseBackground) {
        const defaultBg = baseBackground.default;
        return {
            ...baseBackground,
            default: defaultBg,
            hover: defaultBg,
            focus: defaultBg,
            active: defaultBg
        };
    }
    return baseBackground;
};

export const calculateValidationError = (
    val: string | null | undefined,
    validators: ((v: any) => AlfValidationResult)[],
    maxLength: number | string | undefined,
    minLength: number | string | undefined,
    min: number | string | undefined,
    max: number | string | undefined
): string | null => {
    if (validators.length === 0) {
        return null;
    }

    for (const validator of validators) {
        const result = validator(val);
        if (!result.isValid) {
            let message = '';
            if (result.code) {
                const label = getAlfInputLabel(result.code as keyof AlfInputI18nLabels);

                if (result.code === 'validatorMaxLength' && maxLength !== undefined) {
                    message = interpolate(label, maxLength);
                } else if (result.code === 'validatorMinLength' && minLength !== undefined) {
                    message = interpolate(label, minLength);
                } else if (result.code === 'validatorMin' && min !== undefined) {
                    message = interpolate(label, min);
                } else if (result.code === 'validatorMax' && max !== undefined) {
                    message = interpolate(label, max);
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
};
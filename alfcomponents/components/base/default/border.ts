import { AlfColorVariantEnum, AlfInputAppearanceEnum, AlfPxEnum, AlfRadiusEnum, AlfBorderStyleEnum, AlfColorEnum } from "@alfcomponents/enums";
import { AlfBorderInterface } from "@alfcomponents/interfaces";
import { AlfComponentTypeEnum } from "../enum/AlfComponentType.enum";

export const buildColorBorderConfig = (
    variant: AlfColorVariantEnum = AlfColorVariantEnum.SecondaryOutline,
    appearance: AlfInputAppearanceEnum = AlfInputAppearanceEnum.Standard,
    width: AlfPxEnum = AlfPxEnum.Px015,
    radius: AlfRadiusEnum = AlfRadiusEnum.None,
    style: AlfBorderStyleEnum = AlfBorderStyleEnum.Solid,
    componentType: AlfComponentTypeEnum = AlfComponentTypeEnum.Default,
    cbStyle?: any,
): AlfBorderInterface => {
    const variantKeys = Object.keys(AlfColorVariantEnum) as (keyof typeof AlfColorVariantEnum)[];
    let prefix = variantKeys.find(key => AlfColorVariantEnum[key] === variant) || 'Default';

    if (prefix === 'Standard') {
        prefix = 'Light';
    }

    const getColor = (keyStr: string): AlfColorEnum => {
        return (AlfColorEnum[keyStr as keyof typeof AlfColorEnum] ?? AlfColorEnum.Transparent);
    };

    const main = getColor(`${prefix}Border`) !== AlfColorEnum.Transparent ? getColor(`${prefix}Border`) : getColor(prefix);
    const hover = getColor(`${prefix}BorderHover`) !== AlfColorEnum.Transparent ? getColor(`${prefix}BorderHover`) : getColor(`${prefix}Hover`);
    const focus = getColor(`${prefix}BorderFocus`) !== AlfColorEnum.Transparent ? getColor(`${prefix}BorderFocus`) : getColor(`${prefix}Focus`);
    const active = getColor(`${prefix}BorderActive`) !== AlfColorEnum.Transparent ? getColor(`${prefix}BorderActive`) : getColor(`${prefix}Active`);
    const disabled = getColor(`${prefix}BorderDisabled`) !== AlfColorEnum.Transparent ? getColor(`${prefix}BorderDisabled`) : getColor(`${prefix}Disabled`);

    let resolvedRadius = radius;
    switch (componentType) {
        case AlfComponentTypeEnum.Input:
            resolvedRadius = AlfRadiusEnum.Lg;
            break;
        case AlfComponentTypeEnum.Checkbox:
            resolvedRadius = String(cbStyle) === 'standard' ? AlfRadiusEnum.Base : AlfRadiusEnum.Full;
            break;
        default:
            resolvedRadius = radius;
            break;
    }

    switch (appearance) {
        // Standard: solo línea inferior
        case AlfInputAppearanceEnum.Standard: {
            const bottomBase = {
                borderBottomColor: main,
                borderBottomWidth: width,
                borderBottomStyle: style,
                borderRadius: AlfRadiusEnum.None,
            };
            return {
                default: bottomBase,
                hover: { ...bottomBase, borderBottomColor: hover },
                focus: { ...bottomBase, borderBottomColor: focus },
                active: { ...bottomBase, borderBottomColor: active },
                disabled: { ...bottomBase, borderBottomColor: disabled || AlfColorEnum.Gray300 },
            };
        }

        // Fill: fondo relleno, solo borde inferior y sin border-radius
        case AlfInputAppearanceEnum.Fill: {
            const fillBase = {
                borderBottomColor: main,
                borderBottomWidth: width,
                borderBottomStyle: style,
                borderRadius: AlfRadiusEnum.None,
            };
            return {
                default: fillBase,
                hover: { ...fillBase, borderBottomColor: hover },
                focus: { ...fillBase, borderBottomColor: focus },
                active: { ...fillBase, borderBottomColor: active },
                disabled: { ...fillBase, borderBottomColor: disabled || AlfColorEnum.Gray300 },
            };
        }

        // Outline: borde completo (comportamiento por defecto)
        default: {
            const outlineBase = {
                borderColor: main,
                borderStyle: style,
                borderWidth: width,
                borderRadius: resolvedRadius,
            };
            return {
                default: outlineBase,
                hover: { ...outlineBase, borderColor: hover },
                focus: { ...outlineBase, borderColor: focus },
                active: { ...outlineBase, borderColor: active },
                disabled: { ...outlineBase, borderColor: disabled || AlfColorEnum.Gray300 },
            };
        }
    }
};
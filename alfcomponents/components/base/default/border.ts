import { AlfColorVariantEnum, AlfInputAppearanceEnum, AlfPxEnum, AlfRadiusEnum, AlfBorderStyleEnum, AlfColorEnum } from "@alfcomponents/enums";
import { AlfBorderInterface } from "@alfcomponents/interfaces";
import { AlfComponentTypeEnum } from "../enum/AlfComponentType.enum";

const noneBorderConfig = (): AlfBorderInterface => {
    const base = {
        borderColor: AlfColorEnum.Transparent,
        borderStyle: AlfBorderStyleEnum.None,
        borderWidth: AlfPxEnum.None,
        borderRadius: AlfRadiusEnum.None,
    };
    return { default: base, hover: base, focus: base, active: base, disabled: base };
};

const cardSideBorderConfig = (top: boolean, radius: AlfRadiusEnum): AlfBorderInterface => {
    const base = {
        borderColor: AlfColorEnum.Transparent,
        borderStyle: AlfBorderStyleEnum.None,
        borderWidth: AlfPxEnum.None,
        ...(top ? { borderTopLeftRadius: radius, borderTopRightRadius: radius } : { borderBottomLeftRadius: radius, borderBottomRightRadius: radius })
    };
    return { default: base, hover: base, focus: base, active: base, disabled: base };
};

export const buildColorBorderConfig = (
    variant: AlfColorVariantEnum = AlfColorVariantEnum.SecondaryOutline,
    appearance: AlfInputAppearanceEnum = AlfInputAppearanceEnum.Standard,
    width: AlfPxEnum = AlfPxEnum.Px015,
    radius: AlfRadiusEnum = AlfRadiusEnum.None,
    style: AlfBorderStyleEnum = AlfBorderStyleEnum.Solid,
    componentType: AlfComponentTypeEnum = AlfComponentTypeEnum.Default,
    cbStyle?: any,
): AlfBorderInterface => {
    let resolvedRadius = radius;
    switch (componentType) {
        case AlfComponentTypeEnum.Input:
            resolvedRadius = AlfRadiusEnum.Lg;
            break;
        case AlfComponentTypeEnum.Checkbox:
            resolvedRadius = String(cbStyle) === 'standard' ? AlfRadiusEnum.Base : AlfRadiusEnum.Full;
            break;
        case AlfComponentTypeEnum.Card:
        case AlfComponentTypeEnum.CardImage:
        case AlfComponentTypeEnum.CardHeader:
        case AlfComponentTypeEnum.CardFooter:
            resolvedRadius = radius === AlfRadiusEnum.None ? AlfRadiusEnum.Lg : radius;
            break;
        case AlfComponentTypeEnum.Paginator:
            resolvedRadius = AlfRadiusEnum.Md;
            break;
        default:
            resolvedRadius = radius;
            break;
    }

    if (componentType === AlfComponentTypeEnum.CardImage || componentType === AlfComponentTypeEnum.CardHeader) {
        return cardSideBorderConfig(true, resolvedRadius);
    }

    if (componentType === AlfComponentTypeEnum.CardFooter) {
        return cardSideBorderConfig(false, resolvedRadius);
    }

    if (
        componentType === AlfComponentTypeEnum.CardTitle ||
        componentType === AlfComponentTypeEnum.CardBody ||
        componentType === AlfComponentTypeEnum.CardActions
    ) {
        return noneBorderConfig();
    }

    const variantKeys = Object.keys(AlfColorVariantEnum) as (keyof typeof AlfColorVariantEnum)[];
    let prefix = variantKeys.find(key => AlfColorVariantEnum[key] === variant) || 'Default';
    if (prefix === 'Standard') prefix = 'Light';

    const getColor = (keyStr: string): AlfColorEnum => AlfColorEnum[keyStr as keyof typeof AlfColorEnum] ?? AlfColorEnum.Transparent;

    const main = getColor(`${prefix}Border`) !== AlfColorEnum.Transparent ? getColor(`${prefix}Border`) : getColor(prefix);
    const hover = getColor(`${prefix}BorderHover`) !== AlfColorEnum.Transparent ? getColor(`${prefix}BorderHover`) : getColor(`${prefix}Hover`);
    const focus = getColor(`${prefix}BorderFocus`) !== AlfColorEnum.Transparent ? getColor(`${prefix}BorderFocus`) : getColor(`${prefix}Focus`);
    const active = getColor(`${prefix}BorderActive`) !== AlfColorEnum.Transparent ? getColor(`${prefix}BorderActive`) : getColor(`${prefix}Active`);
    const disabled = getColor(`${prefix}BorderDisabled`) !== AlfColorEnum.Transparent ? getColor(`${prefix}BorderDisabled`) : getColor(`${prefix}Disabled`);

    if (appearance === AlfInputAppearanceEnum.Standard || appearance === AlfInputAppearanceEnum.Fill) {
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
};
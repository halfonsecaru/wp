import { AlfColorEnum, AlfColorVariantEnum, AlfInputAppearanceEnum, AlfShadowEnum, AlfTextShadowEnum } from "@alfcomponents/enums";
import { AlfShadowsInterface } from "@alfcomponents/interfaces";
import { AlfComponentTypeEnum } from "../enum/AlfComponentType.enum";

const getColor = (keyStr: string): AlfColorEnum => {
    return (AlfColorEnum[keyStr as keyof typeof AlfColorEnum] ?? AlfColorEnum.Transparent);
};

const cleanColor = (color: AlfColorEnum, fallbackPrefix: string): AlfColorEnum => {
    const colorStr = color as string;
    if (colorStr.includes('gradient')) {
        const cleanPrefix = fallbackPrefix.replace('3D', '').replace('Gradient', '');
        return (AlfColorEnum[cleanPrefix as keyof typeof AlfColorEnum] ?? AlfColorEnum.Gray500);
    }
    return color;
};

const defaultShadow = (variant: AlfColorVariantEnum, elevated: boolean = true, shadowPredefined?: string, boxShadowPredefined?: string) => {
    const variantKeys = Object.keys(AlfColorVariantEnum) as (keyof typeof AlfColorVariantEnum)[];
    let prefix = variantKeys.find(key => AlfColorVariantEnum[key] === variant) || 'Default';

    const mainColor = cleanColor(getColor(prefix), prefix);
    const hoverColor = cleanColor(getColor(`${prefix}Hover`) !== AlfColorEnum.Transparent ? getColor(`${prefix}Hover`) : getColor(prefix), prefix);
    const focusColor = cleanColor(getColor(`${prefix}Focus`) !== AlfColorEnum.Transparent ? getColor(`${prefix}Focus`) : getColor(prefix), prefix);
    const activeColor = cleanColor(getColor(`${prefix}Active`) !== AlfColorEnum.Transparent ? getColor(`${prefix}Active`) : getColor(prefix), prefix);
    const disabledColor = cleanColor(getColor(`${prefix}Disabled`), prefix);

    const shadowVal = boxShadowPredefined ? boxShadowPredefined : (elevated ? AlfShadowEnum.Elevated : AlfShadowEnum.None);

    return {
        default: {
            boxShadow: shadowVal,
            boxShadowColor: mainColor,
            boxShadowInset: false,
            textShadow: shadowPredefined ? shadowPredefined : AlfTextShadowEnum.None,
            textShadowColor: mainColor
        },
        hover: {
            boxShadow: shadowVal,
            boxShadowColor: hoverColor,
            boxShadowInset: false,
            textShadow: shadowPredefined ? shadowPredefined : AlfTextShadowEnum.None,
            textShadowColor: hoverColor
        },
        focus: {
            boxShadow: shadowVal,
            boxShadowColor: focusColor,
            boxShadowInset: false,
            textShadow: shadowPredefined ? shadowPredefined : AlfTextShadowEnum.None,
            textShadowColor: focusColor
        },
        active: {
            boxShadow: shadowVal,
            boxShadowColor: activeColor,
            boxShadowInset: false,
            textShadow: shadowPredefined ? shadowPredefined : AlfTextShadowEnum.None,
            textShadowColor: activeColor
        },
        disabled: {
            boxShadow: shadowVal,
            boxShadowColor: disabledColor,
            boxShadowInset: false,
            textShadow: shadowPredefined ? shadowPredefined : AlfTextShadowEnum.None,
            textShadowColor: disabledColor
        }
    };
}

export const buildColorShadowsConfig = (
    variant: AlfColorVariantEnum = AlfColorVariantEnum.SecondaryOutline,
    elevated: boolean = true,
    componentType: AlfComponentTypeEnum,
    appearance: AlfInputAppearanceEnum = AlfInputAppearanceEnum.Standard,
): AlfShadowsInterface => {

    if (!elevated) {
        return defaultShadow(variant, elevated);
    }

    if (
        componentType === AlfComponentTypeEnum.CardTitle ||
        componentType === AlfComponentTypeEnum.CardBody ||
        componentType === AlfComponentTypeEnum.CardActions ||
        componentType === AlfComponentTypeEnum.CardHeader ||
        componentType === AlfComponentTypeEnum.CardFooter ||
        componentType === AlfComponentTypeEnum.CardImage ||
        componentType === AlfComponentTypeEnum.Paginator
    ) {
        return defaultShadow(variant, false);
    }

    if (componentType === AlfComponentTypeEnum.Input && (appearance === AlfInputAppearanceEnum.Standard || appearance === AlfInputAppearanceEnum.Fill)) {
        return defaultShadow(variant, elevated, undefined, '0 5px 5px -4px rgb(0 0 0 / 0.15)');
    }


    return defaultShadow(variant, elevated);

};

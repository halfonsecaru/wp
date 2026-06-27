import { AlfColorEnum, AlfColorVariantEnum, AlfInputAppearanceEnum } from "@alfcomponents/enums";
import { AlfTypographyInterface } from "@alfcomponents/interfaces";
import { getPredefinedColorByVariant } from "./functions";
import { AlfComponentTypeEnum } from "../enum/AlfComponentType.enum";

const getColor = (keyStr: string): AlfColorEnum => {
    return (AlfColorEnum[keyStr as keyof typeof AlfColorEnum] ?? AlfColorEnum.Transparent);
};

const getPrefixByVariant = (variant: AlfColorVariantEnum): string => {
    const variantKeys = Object.keys(AlfColorVariantEnum) as (keyof typeof AlfColorVariantEnum)[];
    return variantKeys.find(key => AlfColorVariantEnum[key] === variant) || 'Default';
}

const checkSolidGradient3D = (variant: AlfColorVariantEnum): boolean => {
    const vStr = String(variant);
    const isSolidOrGradientOr3D =
        !vStr.includes('outline-') &&
        !vStr.includes('ghost-') &&
        !vStr.includes('soft-') &&
        !vStr.includes('crystal-') &&
        vStr !== 'transparent' &&
        vStr !== 'standard' &&
        vStr !== 'Default';

    return isSolidOrGradientOr3D;
}
const getInputAppearance = (variant: AlfColorVariantEnum, appearance: AlfInputAppearanceEnum) => {
    if (appearance === AlfInputAppearanceEnum.Standard) {
        const borderColors = getPredefinedColorByVariant(variant, 0);
        const prefix = getPrefixByVariant(variant);
        const fallback = getColor(prefix);
        const mainColor = borderColors.default !== AlfColorEnum.Transparent ? borderColors.default : fallback;
        return {
            main: mainColor,
            hover: borderColors.hover !== AlfColorEnum.Transparent ? borderColors.hover : mainColor,
            focus: borderColors.focus !== AlfColorEnum.Transparent ? borderColors.focus : mainColor,
            active: borderColors.active !== AlfColorEnum.Transparent ? borderColors.active : mainColor,
            disabled: borderColors.disabled !== AlfColorEnum.Transparent ? borderColors.disabled : mainColor,
        };
    }

    return defaultTypographyConfig(variant);
}

const defaultTypographyConfig = (
    variant: AlfColorVariantEnum = AlfColorVariantEnum.SecondaryOutline,
) => {


    //---------------------------------------------------------

    const prefix = getPrefixByVariant(variant);
    const isSolidOrGradientOr3D = checkSolidGradient3D(variant);

    let mainColor = getColor(`${prefix}Text`) !== AlfColorEnum.Transparent ? getColor(`${prefix}Text`) : getColor(prefix);
    let hoverColor: AlfColorEnum;
    let focusColor: AlfColorEnum;
    let activeColor: AlfColorEnum;
    let disabledColor: AlfColorEnum;

    if (isSolidOrGradientOr3D) {
        const isGrad = (val: string) => val.toLowerCase().includes('gradient');
        const textHover = getColor(`${prefix}TextHover`);
        const textFocus = getColor(`${prefix}TextFocus`);
        const textActive = getColor(`${prefix}TextActive`);
        const textDisabled = getColor(`${prefix}TextDisabled`);

        hoverColor = (textHover !== AlfColorEnum.Transparent && !isGrad(textHover)) ? textHover : mainColor;
        focusColor = (textFocus !== AlfColorEnum.Transparent && !isGrad(textFocus)) ? textFocus : mainColor;
        activeColor = (textActive !== AlfColorEnum.Transparent && !isGrad(textActive)) ? textActive : mainColor;
        disabledColor = (textDisabled !== AlfColorEnum.Transparent && !isGrad(textDisabled)) ? textDisabled : mainColor;
    } else {
        hoverColor = getColor(`${prefix}TextHover`) !== AlfColorEnum.Transparent ? getColor(`${prefix}TextHover`) : getColor(`${prefix}Hover`);
        focusColor = getColor(`${prefix}TextFocus`) !== AlfColorEnum.Transparent ? getColor(`${prefix}TextFocus`) : getColor(`${prefix}Focus`);
        activeColor = getColor(`${prefix}TextActive`) !== AlfColorEnum.Transparent ? getColor(`${prefix}TextActive`) : getColor(`${prefix}Active`);
        disabledColor = getColor(`${prefix}TextDisabled`) !== AlfColorEnum.Transparent ? getColor(`${prefix}TextDisabled`) : getColor(`${prefix}Disabled`);
    }

    return {
        main: mainColor,
        hover: hoverColor,
        focus: focusColor,
        active: activeColor,
        disabled: disabledColor
    };
};

const statesConfigured = (mainColor: AlfColorEnum, hoverColor: AlfColorEnum, focusColor: AlfColorEnum, activeColor: AlfColorEnum, disabledColor: AlfColorEnum) => {
    return {
        default: {
            color: mainColor,
        },
        hover: {
            color: hoverColor,
        },
        focus: {
            color: focusColor,
        },
        active: {
            color: activeColor,
        },
        disabled: {
            color: disabledColor,
        }
    };
};

export const buildTypographyConfig = (
    componentType: AlfComponentTypeEnum,
    variant: AlfColorVariantEnum = AlfColorVariantEnum.SecondaryOutline,
    appearance: AlfInputAppearanceEnum = AlfInputAppearanceEnum.Standard,
): AlfTypographyInterface => {
    let colors = {
        main: AlfColorEnum.Transparent,
        hover: AlfColorEnum.Transparent,
        focus: AlfColorEnum.Transparent,
        active: AlfColorEnum.Transparent,
        disabled: AlfColorEnum.Transparent
    };

    if (componentType === AlfComponentTypeEnum.Input) {
        colors = getInputAppearance(variant, appearance);
    } else if (componentType === AlfComponentTypeEnum.Checkbox || componentType === AlfComponentTypeEnum.RadioButton) {
        const isSolidOrGradientOr3D = checkSolidGradient3D(variant);
        if (isSolidOrGradientOr3D) {
            const borderColors = getPredefinedColorByVariant(variant, 0);
            const prefix = getPrefixByVariant(variant);
            const fallback = getColor(prefix);
            colors.main = borderColors.default !== AlfColorEnum.Transparent ? borderColors.default : fallback;
            colors.hover = borderColors.hover !== AlfColorEnum.Transparent ? borderColors.hover : colors.main;
            colors.focus = borderColors.focus !== AlfColorEnum.Transparent ? borderColors.focus : colors.main;
            colors.active = borderColors.active !== AlfColorEnum.Transparent ? borderColors.active : colors.main;
            colors.disabled = borderColors.disabled !== AlfColorEnum.Transparent ? borderColors.disabled : colors.main;
        } else {
            colors = defaultTypographyConfig(variant);
        }
    } else if (componentType === AlfComponentTypeEnum.Button) {
        colors = defaultTypographyConfig(variant);
    }

    return statesConfigured(colors.main, colors.hover, colors.focus, colors.active, colors.disabled);
};

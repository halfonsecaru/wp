import { AlfColorEnum, AlfColorVariantEnum } from "@alfcomponents/enums";
import { AlfTextStyleInterface } from "@alfcomponents/interfaces";
import { getPredefinedColorByVariant } from "./functions";
import { AlfComponentTypeEnum } from "../enum/AlfComponentType.enum";

export const buildTextColorStyleConfig = (componentType: AlfComponentTypeEnum, variant: AlfColorVariantEnum = AlfColorVariantEnum.SecondaryOutline): AlfTextStyleInterface => {
    const variantKeys = Object.keys(AlfColorVariantEnum) as (keyof typeof AlfColorVariantEnum)[];
    let prefix = variantKeys.find(key => AlfColorVariantEnum[key] === variant) || 'Default';

    if (prefix === 'Standard') {
        prefix = 'Light';
    }

    const getColor = (keyStr: string): AlfColorEnum => {
        return (AlfColorEnum[keyStr as keyof typeof AlfColorEnum] ?? AlfColorEnum.Transparent);
    };

    const vStr = String(variant);
    const isSolidOrGradientOr3D =
        !vStr.includes('outline-') &&
        !vStr.includes('ghost-') &&
        !vStr.includes('soft-') &&
        !vStr.includes('crystal-') &&
        vStr !== 'transparent' &&
        vStr !== 'standard' &&
        vStr !== 'Default';

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

    if ((componentType === AlfComponentTypeEnum.Checkbox ||
        componentType === AlfComponentTypeEnum.RadioButton ||
        componentType === AlfComponentTypeEnum.Switch ||
        componentType === AlfComponentTypeEnum.SelectPanel ||
        componentType === AlfComponentTypeEnum.SelectPanelOption)
        && isSolidOrGradientOr3D) {
        const textColors = getPredefinedColorByVariant(variant, 1);
        if (textColors.default !== AlfColorEnum.Transparent) {
            mainColor = textColors.default;
            hoverColor = textColors.hover !== AlfColorEnum.Transparent ? textColors.hover : textColors.default;
            focusColor = textColors.focus !== AlfColorEnum.Transparent ? textColors.focus : textColors.default;
            activeColor = textColors.active !== AlfColorEnum.Transparent ? textColors.active : textColors.default;
            disabledColor = textColors.disabled !== AlfColorEnum.Transparent ? textColors.disabled : textColors.default;
        }
    }

    if (componentType === AlfComponentTypeEnum.Paginator && (!mainColor || mainColor === AlfColorEnum.Transparent)) {
        mainColor = AlfColorEnum.Gray800;
    }

    return {
        default: {
            color: mainColor !== AlfColorEnum.Transparent ? mainColor : undefined,
        },
        hover: {
            color: hoverColor !== AlfColorEnum.Transparent ? hoverColor : undefined,
        },
        focus: {
            color: focusColor !== AlfColorEnum.Transparent ? focusColor : undefined,
        },
        active: {
            color: activeColor !== AlfColorEnum.Transparent ? activeColor : undefined,
        },
        disabled: {
            color: disabledColor !== AlfColorEnum.Transparent ? disabledColor : undefined,
        }
    };
};
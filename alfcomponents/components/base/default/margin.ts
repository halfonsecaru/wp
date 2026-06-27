import { AlfColorVariantEnum, AlfPxEnum } from "@alfcomponents/enums";
import { AlfMarginInterface } from "@alfcomponents/interfaces";
import { AlfComponentTypeEnum } from "../enum/AlfComponentType.enum";

export const buildMarginConfig = (componentType: AlfComponentTypeEnum, variant: AlfColorVariantEnum): AlfMarginInterface => {
    return {
        default: {
            margin: AlfPxEnum.None,
        },
        hover: {
            margin: AlfPxEnum.None,
        },
        focus: {
            margin: AlfPxEnum.None,
        },
        active: {
            margin: AlfPxEnum.None,
        },
        disabled: {
            margin: AlfPxEnum.None,
        }
    };
};

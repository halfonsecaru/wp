import { AlfBorderStyleEnum, AlfColorEnum, AlfPxEnum, AlfRemEnum } from "@alfcomponents/enums";
import { AlfOutlineInterface } from "@alfcomponents/interfaces";

export const buildColorOutlineConfig = (): AlfOutlineInterface => {

    const hidden = {
        outlineColor: AlfColorEnum.Transparent,
        outlineWidth: AlfPxEnum.None,
        outlineStyle: AlfBorderStyleEnum.None,
        outlineOffset: AlfPxEnum.None,
    };

    return {
        default: hidden,
        hover: hidden,
        focus: {
            outlineColor: AlfColorEnum.Transparent,
            outlineWidth: AlfRemEnum.None,
            outlineStyle: AlfBorderStyleEnum.None,
            outlineOffset: AlfRemEnum.None,
        },
        active: {
            outlineColor: AlfColorEnum.Transparent,
            outlineWidth: AlfRemEnum.None,
            outlineStyle: AlfBorderStyleEnum.None,
            outlineOffset: AlfRemEnum.None,
        },
        disabled: {
            outlineColor: AlfColorEnum.Transparent,
            outlineWidth: AlfRemEnum.None,
            outlineStyle: AlfBorderStyleEnum.None,
            outlineOffset: AlfRemEnum.None,
        },
    };
};


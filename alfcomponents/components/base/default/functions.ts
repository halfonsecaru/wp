import { AlfColorEnum, AlfColorVariantEnum } from "@alfcomponents/enums";

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

export const getPredefinedColorByVariant = (variant: AlfColorVariantEnum, seleccion: number): {
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

export const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

import { AlfColorEnum, AlfColorVariantEnum, AlfInputAppearanceEnum } from "@alfcomponents/enums";
import { AlfBackgroundsInterface } from "@alfcomponents/interfaces";
import { AlfComponentTypeEnum } from "../enum/AlfComponentType.enum";

const defaultBackgroundConfig = (variant: AlfColorVariantEnum = AlfColorVariantEnum.SecondaryOutline, componentType?: AlfComponentTypeEnum): AlfBackgroundsInterface => {
    const variantKeys = Object.keys(AlfColorVariantEnum) as (keyof typeof AlfColorVariantEnum)[];
    let prefix = variantKeys.find(key => AlfColorVariantEnum[key] === variant) || 'Default';

    const main = getColor(`${prefix}BG`) !== AlfColorEnum.Transparent ? getColor(`${prefix}BG`) : getColor(prefix);
    const hover = getColor(`${prefix}HoverBG`) !== AlfColorEnum.Transparent ? getColor(`${prefix}HoverBG`) : getColor(`${prefix}Hover`);
    let focus = getColor(`${prefix}FocusBG`) !== AlfColorEnum.Transparent ? getColor(`${prefix}FocusBG`) : getColor(`${prefix}Focus`);
    let active = getColor(`${prefix}ActiveBG`) !== AlfColorEnum.Transparent ? getColor(`${prefix}ActiveBG`) : getColor(`${prefix}Active`);
    const disabled = getColor(`${prefix}DisabledBG`) !== AlfColorEnum.Transparent ? getColor(`${prefix}DisabledBG`) : getColor(`${prefix}Disabled`);

    // Para SelectPanel, no queremos efectos hover, active, focus, etc.
    // Todos los estados serán iguales al estado default
    if (componentType === AlfComponentTypeEnum.SelectPanel) {
        return {
            default: state(main),
            hover: state(main),
            focus: state(main),
            active: state(main),
            disabled: state(disabled)
        };
    }

    // Para SelectPanelOption, queremos que el estado default sea transparente
    // pero los otros estados (hover, active, focus, disabled) se comporten normalmente
    if (componentType === AlfComponentTypeEnum.SelectPanelOption) {
        return {
            default: state(AlfColorEnum.Transparent),
            hover: state(hover),
            focus: state(focus),
            active: state(active),
            disabled: state(disabled)
        };
    }

    if (componentType === AlfComponentTypeEnum.Paginator && String(variant).includes('outline-')) {
        // Use a softer active background for outline variants (soft variant of the base color)
        const basePrefix = prefix.replace('Outline', '');
        const softActiveBG = getColor(`${basePrefix}SoftActiveBG`);
        if (softActiveBG !== AlfColorEnum.Transparent) {
            active = softActiveBG;
            focus = softActiveBG;
        } else {
            // fallback to original outline active BG if soft not defined
            const outlineActiveBG = getColor(`${prefix}ActiveBG`);
            if (outlineActiveBG !== AlfColorEnum.Transparent) {
                active = outlineActiveBG;
                focus = outlineActiveBG;
            }
        }
    }

    return {
        default: state(main),
        hover: state(hover),
        focus: state(focus),
        active: state(active),
        disabled: state(disabled)
    };
}

const transparentBackgroundConfig: () => AlfBackgroundsInterface = () => {
    return {
        default: state(AlfColorEnum.Transparent),
        hover: state(AlfColorEnum.Transparent),
        focus: state(AlfColorEnum.Transparent),
        active: state(AlfColorEnum.Transparent),
        disabled: state(AlfColorEnum.Transparent)
    };
}

const isGrad = (val: AlfColorEnum) => val.includes('gradient');

const state = (v: AlfColorEnum) => isGrad(v)
    ? { backgroundImage: v, backgroundColor: AlfColorEnum.Transparent }
    : { backgroundColor: v, backgroundImage: 'none' };

const getColor = (keyStr: string): AlfColorEnum => {
    return (AlfColorEnum[keyStr as keyof typeof AlfColorEnum] ?? AlfColorEnum.Transparent);
};

export const buildColorBackgroundConfig = (
    variant: AlfColorVariantEnum = AlfColorVariantEnum.SecondaryOutline,
    componentType: AlfComponentTypeEnum,
    appearance: AlfInputAppearanceEnum = AlfInputAppearanceEnum.Standard,
): AlfBackgroundsInterface => {

    if (
        (componentType === AlfComponentTypeEnum.Input && appearance === AlfInputAppearanceEnum.Standard) ||
        componentType === AlfComponentTypeEnum.CardTitle ||
        componentType === AlfComponentTypeEnum.CardBody ||
        componentType === AlfComponentTypeEnum.CardActions ||
        componentType === AlfComponentTypeEnum.CardHeader ||
        componentType === AlfComponentTypeEnum.CardFooter ||
        componentType === AlfComponentTypeEnum.CardImage
    ) {
        return transparentBackgroundConfig();
    }

    return defaultBackgroundConfig(variant, componentType);
}

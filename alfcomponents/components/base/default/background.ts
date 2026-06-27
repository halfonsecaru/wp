import { AlfColorEnum, AlfColorVariantEnum, AlfInputAppearanceEnum } from "@alfcomponents/enums";
import { AlfBackgroundsInterface } from "@alfcomponents/interfaces";
import { AlfComponentTypeEnum } from "../enum/AlfComponentType.enum";

const defaultBackgroundConfig: (variant: AlfColorVariantEnum) => AlfBackgroundsInterface = (variant: AlfColorVariantEnum = AlfColorVariantEnum.SecondaryOutline,) => {
    // 1. Buscamos la clave correspondiente dentro del enum de variantes
    const variantKeys = Object.keys(AlfColorVariantEnum) as (keyof typeof AlfColorVariantEnum)[];
    let prefix = variantKeys.find(key => AlfColorVariantEnum[key] === variant) || 'Default';


    // 2. Resolvemos los colores dinámicamente usando el prefijo (ej. 'Primary', 'PrimarySoft', etc.)
    // Primero intenta buscar con sufijo 'BG' (ej: PrimaryBG) y si no existe usa la base (ej: Primary)
    const main = getColor(`${prefix}BG`) !== AlfColorEnum.Transparent ? getColor(`${prefix}BG`) : getColor(prefix);
    const hover = getColor(`${prefix}HoverBG`) !== AlfColorEnum.Transparent ? getColor(`${prefix}HoverBG`) : getColor(`${prefix}Hover`);
    const focus = getColor(`${prefix}FocusBG`) !== AlfColorEnum.Transparent ? getColor(`${prefix}FocusBG`) : getColor(`${prefix}Focus`);
    const active = getColor(`${prefix}ActiveBG`) !== AlfColorEnum.Transparent ? getColor(`${prefix}ActiveBG`) : getColor(`${prefix}Active`);
    const disabled = getColor(`${prefix}DisabledBG`) !== AlfColorEnum.Transparent ? getColor(`${prefix}DisabledBG`) : getColor(`${prefix}Disabled`);

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

// Helper para buscar el color en AlfColorEnum de forma segura
const getColor = (keyStr: string): AlfColorEnum => {
    return (AlfColorEnum[keyStr as keyof typeof AlfColorEnum] ?? AlfColorEnum.Transparent);
};

export const buildColorBackgroundConfig = (
    variant: AlfColorVariantEnum = AlfColorVariantEnum.SecondaryOutline,
    componentType: AlfComponentTypeEnum,
    appearance: AlfInputAppearanceEnum = AlfInputAppearanceEnum.Standard,
): AlfBackgroundsInterface => {

    if (componentType === AlfComponentTypeEnum.Input && appearance === AlfInputAppearanceEnum.Standard) {

        return transparentBackgroundConfig();
    }


    return defaultBackgroundConfig(variant);
}

import { AlfComponentTypeEnum, resolveVariantConfig } from "@alfcomponents/base/defaultVariants";
import { AlfColorVariantEnum } from "@alfcomponents/enums";

/**
 * Genera la configuración final de un componente combinando capas de configuración
 * con el siguiente orden de prioridad (de menor a mayor):
 *
 * 1. `defaultComponentConfig` — Configuración base predefinida del componente (ej: `ALF_TABS_CONTAINER_DEFAULT`).
 * 2. `resolveVariantConfig(variant, componentType)` — Estilos del motor visual según la variante de color y tipo de componente.
 * 3. `inputConfig` — Configuración proporcionada por el usuario vía `[config]` input.
 * 4. `colorVariant` — Se fuerza siempre al final para garantizar coherencia.
 *
 * @template T - Tipo de la interfaz de configuración del componente.
 * @param variant - Variante de color a aplicar (ej: `PrimaryOutline`, `Secondary`, etc.). Por defecto `Transparent`.
 * @param componentType - Tipo de componente del motor visual (ej: `Tabs`, `Button`, `Switch`).
 * @param defaultComponentConfig - Configuración base/predefinida del componente.
 * @param inputConfig - Configuración del usuario que sobreescribe las anteriores.
 * @returns Objeto de configuración final con todas las capas fusionadas.
 *
 * @example
 * ```ts
 * const config = getAlfDefaultConfig(
 *   AlfColorVariantEnum.PrimaryOutline,
 *   AlfComponentTypeEnum.Tabs,
 *   ALF_TABS_CONTAINER_DEFAULT,
 *   this.inputConfig() ?? {}
 * );
 * ```
 */
export const getAlfDefaultConfig = <T extends object>(
    variant: AlfColorVariantEnum = AlfColorVariantEnum.Transparent,
    componentType: AlfComponentTypeEnum,
    defaultComponentConfig: T,
    inputConfig: T
) => {

    return {
        ...defaultComponentConfig,
        ...resolveVariantConfig(variant, componentType),
        ...inputConfig,
        colorVariant: variant,
    };
};
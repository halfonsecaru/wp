import { 
  AlfButtonTypeEnum, 
  AlfColorVariantEnum,
  AlfIconsUnicodeIconEnum 
} from "@alfcomponents/enums";
import { 
  AlfBackgroundsInterface, 
  AlfBorderInterface, 
  AlfDisplayAndLayoutInterface, 
  AlfMarginInterface, 
  AlfPaddingInterface, 
  AlfShadowsInterface, 
  AlfTextStyleInterface, 
  AlfTypographyInterface, 
  AlfAnimateCssInterface 
} from "@alfcomponents/interfaces";
import { AlfTabsStyleEnum } from "../enums/alf-tabs.enum";
import { InjectionToken } from "@angular/core";

/**
 * Interfaz para el componente padre (contenedor) accesible desde los hijos.
 */
export interface AlfTabsParentInterface {
  onTabHeightMeasured(height: number, startHeightOverride?: number): void;
}

export const ALF_TABS_CONTAINER_TOKEN = new InjectionToken<AlfTabsParentInterface>('ALF_TABS_CONTAINER_TOKEN');

export interface AlfSingleTabInterface {
    readonly id: string;
    readonly label: string;
    readonly tabName?: string;
    readonly icon?: string | AlfIconsUnicodeIconEnum;
    readonly iconLeft?: string | AlfIconsUnicodeIconEnum;
    readonly iconRight?: string | AlfIconsUnicodeIconEnum;
    readonly disabled?: boolean;
    readonly colorVariant?: AlfColorVariantEnum;
    readonly backgrounds?: AlfBackgroundsInterface;
    readonly border?: AlfBorderInterface;
    readonly margin?: AlfMarginInterface;
    readonly padding?: AlfPaddingInterface;
    readonly shadows?: AlfShadowsInterface;
    readonly textStyle?: AlfTextStyleInterface;
    readonly typography?: AlfTypographyInterface;
    readonly animations?: AlfAnimateCssInterface;
}

export interface AlfTabsContainerConfigInterface {
    readonly tabsStyle?: AlfTabsStyleEnum;
    readonly tab?: AlfSingleTabInterface[];
    readonly colorVariant?: AlfColorVariantEnum;
    readonly backgrounds?: AlfBackgroundsInterface;
    readonly border?: AlfBorderInterface;
    readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
    readonly margin?: AlfMarginInterface;
    readonly padding?: AlfPaddingInterface;
    readonly shadows?: AlfShadowsInterface;
    readonly textStyle?: AlfTextStyleInterface;
    readonly typography?: AlfTypographyInterface;
    readonly animations?: AlfAnimateCssInterface;
    readonly contentAnimations?: AlfAnimateCssInterface;
    readonly fluidHeight?: boolean;
}

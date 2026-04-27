import { AlfButtonInterface } from "@alfcomponents/components/simple/alf-buttons/interfaces/alf-button.interface";
import { AlfTabsStyleEnum } from "../enums/alf-tabs.enum";
import { AlfBaseCommonConfigInterface } from "@alfcomponents/base";
import { AlfAnimateCssInterface } from "@alfcomponents/interfaces";

/**
 * AlfTabsContainerInterface
 * Configuración para el contenedor de pestañas.
 */
export interface AlfTabsContainerConfigInterface extends AlfBaseCommonConfigInterface {
  readonly tab?: AlfSingleTabInterface[];
  readonly tabsStyle?: AlfTabsStyleEnum;
  readonly contentAnimations?: AlfAnimateCssInterface;
}

export interface AlfSingleTabInterface extends AlfBaseCommonConfigInterface {
  readonly tabName: string;
  readonly configuration?: AlfButtonInterface;
}

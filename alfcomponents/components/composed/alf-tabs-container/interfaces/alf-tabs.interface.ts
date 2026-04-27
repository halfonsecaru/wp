import { AlfButtonInterface } from "@alfcomponents/components/simple/alf-buttons/interfaces/alf-button.interface";
import { AlfTabsStyleEnum } from "../enums/alf-tabs.enum";
import { AlfBaseCommonConfigInterface } from "@alfcomponents/base";

/**
 * AlfTabsContainerInterface
 * Configuración para el contenedor de pestañas.
 */
export interface AlfTabsContainerConfigInterface extends AlfBaseCommonConfigInterface {
  readonly tab?: AlfSingleTabInterface[];
  readonly tabsStyle?: AlfTabsStyleEnum;
}

/**
 * AlfSingleTabInterface
 * Configuración para una pestaña individual.
 */
export interface AlfSingleTabInterface {
  readonly tabName: string;
  readonly configuration?: AlfButtonInterface;
}

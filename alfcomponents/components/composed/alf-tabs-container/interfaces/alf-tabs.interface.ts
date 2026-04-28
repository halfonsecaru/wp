import { AlfButtonInterface } from "@alfcomponents/components/simple/alf-buttons/interfaces/alf-button.interface";
import { AlfTabsStyleEnum } from "../enums/alf-tabs.enum";
import { AlfBaseCommonConfigInterface } from "@alfcomponents/base";
import { AlfAnimateCssInterface } from "@alfcomponents/interfaces";
import { InjectionToken } from "@angular/core";

/**
 * Interfaz para el contrato de comunicación Padre-Hijo.
 */
export interface AlfTabsParentInterface {
  onTabHeightMeasured(height: number): void;
}

/**
 * Token de inyección para evitar dependencias circulares.
 */
export const ALF_TABS_CONTAINER_TOKEN = new InjectionToken<AlfTabsParentInterface>('ALF_TABS_CONTAINER_TOKEN');

/**
 * AlfTabsContainerInterface
 * Configuración para el contenedor de pestañas.
 */
export interface AlfTabsContainerConfigInterface extends AlfBaseCommonConfigInterface {
  readonly tab?: AlfSingleTabInterface[];
  readonly tabsStyle?: AlfTabsStyleEnum;
  readonly contentAnimations?: AlfAnimateCssInterface;
  readonly fluidHeight?: boolean;
  readonly fluid?: boolean;
}

export interface AlfSingleTabInterface extends AlfButtonInterface {
  /**
   * Nombre de la pestaña (alias de label para retrocompatibilidad).
   */
  readonly tabName?: string;
  
  /**
   * Indica si se debe aplicar un efecto de agrandamiento al entrar.
   */
  readonly expandHeight?: boolean;
}

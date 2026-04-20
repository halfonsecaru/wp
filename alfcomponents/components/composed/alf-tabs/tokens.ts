import { InjectionToken, Signal } from '@angular/core';

/**
 * Interfaz de coordinación para evitar dependencias circulares.
 * Define lo que los hijos (AlfTab y AlfTabContent) pueden ver del padre (AlfTabs).
 */
export interface AlfTabsCoordinator {
  readonly activeIndex: Signal<number>;
  readonly contentIndex: Signal<number>;
  readonly configComputed: Signal<any>;
  readonly selectTabByIndex: (index: number) => void;
  readonly getPanelId: (index: number) => string;
  readonly getTabId: (index: number) => string;
}

/**
 * Token para inyectar al coordinador padre desde los hijos.
 */
export const ALF_TABS_TOKEN = new InjectionToken<AlfTabsCoordinator>('ALF_TABS_TOKEN');

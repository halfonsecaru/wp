import { signal, WritableSignal } from '@angular/core';
import { AlfThemeEnum } from '../enums';

/**
 * Token Global del Tema Activo.
 * Controla el aspecto visual de toda la librería de forma reactiva.
 */
export const ALF_ACTIVE_THEME: WritableSignal<AlfThemeEnum> = signal(AlfThemeEnum.Light);

/**
 * Helper para cambiar el tema de forma programática.
 */
export const setAlfTheme = (theme: AlfThemeEnum): void => {
  ALF_ACTIVE_THEME.set(theme);
};

import { signal, WritableSignal } from '@angular/core';
import { AlfLoadingInterface } from '../../../interfaces/alf-loading.interface';
import { ALF_DEFAULT_LOADING } from './alf-loading.predefined';

/**
 * Token Global de Configuración de Carga por defecto.
 */
export const LOADING_DEFAULT_SIGNAL: WritableSignal<AlfLoadingInterface> = signal(ALF_DEFAULT_LOADING);

/**
 * Helper para actualizar la configuración de carga por defecto.
 */
export const updateAlfDefaultLoading = (config: Partial<AlfLoadingInterface>): void => {
  LOADING_DEFAULT_SIGNAL.update(current => ({ ...current, ...config }));
};

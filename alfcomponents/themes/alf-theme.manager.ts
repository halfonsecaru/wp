import { effect, Injectable } from '@angular/core';
import { ALF_ACTIVE_THEME } from './alf-theme.tokens';
import { AlfThemeEnum } from '../enums/alf-theme.enum';
import { updateAlfDefaultLoading } from '../directives/alf-loading/predefined/alf-loading.tokens';
import { ALF_DEFAULT_LOADING, ALF_DARK_LOADING } from '../directives/alf-loading/predefined/alf-loading.predefined';

/**
 * @service AlfThemeManager
 * @description Orquestador central de temas. 
 * Reacciona al cambio de ALF_ACTIVE_THEME y actualiza las configuraciones globales 
 * de componentes y directivas (como Loading).
 */
@Injectable({ providedIn: 'root' })
export class AlfThemeManager {
  constructor() {
    this.initThemeEffect();
  }

  private initThemeEffect(): void {
    effect(() => {
      const currentTheme = ALF_ACTIVE_THEME();
      
      switch (currentTheme) {
        case AlfThemeEnum.Dark:
          updateAlfDefaultLoading(ALF_DARK_LOADING);
          break;

        case AlfThemeEnum.Light:
        default:
          updateAlfDefaultLoading(ALF_DEFAULT_LOADING);
          break;
      }

      console.log(`🌓 AlfThemeManager: Aplicando tema [${currentTheme}]`);
    });
  }
}

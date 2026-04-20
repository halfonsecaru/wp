import { signal, WritableSignal } from '@angular/core';
import { AlfColorEnum, AlfThemeEnum } from '../enums';
import { AlfThemeInterface } from '../interfaces/alf-theme.interface';

/** 
 * Configuración de Tema Claro (Light Identity)
 */
const lightTheme: AlfThemeInterface = {
  theme: AlfThemeEnum.Light,
  backgrounds: {
    default: { backgroundColor: AlfColorEnum.White },
    hover: { backgroundColor: AlfColorEnum.White },
    active: { backgroundColor: AlfColorEnum.White }
  }
};

/** 
 * Configuración de Tema Oscuro (Dark Identity)
 */
const darkTheme: AlfThemeInterface = {
  theme: AlfThemeEnum.Dark,
  backgrounds: {
    default: { backgroundColor: AlfColorEnum.Black },
    hover: { backgroundColor: AlfColorEnum.Black },
    active: { backgroundColor: AlfColorEnum.Black }
  }
};

/**
 * Token Global del Tema Estructurado (La Única Fuente de Verdad).
 */
export const themeSignal: WritableSignal<AlfThemeInterface> = signal(lightTheme);

/**
 * Helper para cambiar el tema de forma programática.
 * Gestiona el cambio de "piel" de toda la librería.
 */
export const updateThemeColors = (theme: AlfThemeEnum): void => {
  switch (theme) {
    case AlfThemeEnum.Dark:
      themeSignal.set(darkTheme);
      break;
    case AlfThemeEnum.Light:
      themeSignal.set(lightTheme);
      break;
    default:
      themeSignal.set(lightTheme);
      break;
  }
};

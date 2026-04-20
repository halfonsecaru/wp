import { AlfThemeEnum } from '../enums/alf-theme.enum';
import { AlfBackgroundsInterface, AlfBorderInterface, AlfShadowsInterface, AlfTypographyInterface } from './index';

/**
 * @interface AlfThemeInterface
 * @description Estructura maestra del "ADN Visual" de la librería.
 * Define la piel global que consumirán todos los componentes desde el AlfBaseComponent.
 */
export interface AlfThemeInterface {
  theme: AlfThemeEnum;
  
  /** Paleta de fondos globales reactivos */
  backgrounds: AlfBackgroundsInterface;

  /** Configuración de bordes globales (Opcional) */
  border?: AlfBorderInterface;

  /** Sombras globales (Opcional) */
  shadows?: AlfShadowsInterface;

  /** Tipografía global (Opcional) */
  typography?: AlfTypographyInterface;
}

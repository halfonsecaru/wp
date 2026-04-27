import { AlfThemeEnum } from '../enums/alf-theme.enum';
import { 
  AlfBackgroundsInterface, 
  AlfBorderInterface, 
  AlfShadowsInterface, 
  AlfTypographyInterface 
} from './index';

/**
 * AlfThemeInterface
 * Define la estructura de un tema visual completo en la librería.
 */
export interface AlfThemeInterface {
  theme: AlfThemeEnum;
  backgrounds?: AlfBackgroundsInterface;
  border?: AlfBorderInterface;
  shadows?: AlfShadowsInterface;
  typography?: AlfTypographyInterface;
  // Añadir transitions si existe la interfaz, por ahora usamos las básicas detectadas
  transitions?: any; 
}

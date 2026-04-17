import { AlfLoadingInterface } from '../../../interfaces/alf-loading.interface';
import {
  AlfLoadingModeEnum,
  AlfSpinnerTypeEnum,
  AlfColorEnum,
  AlfPxEnum,
  AlfSpinnerStrokeWidthEnum
} from '../../../enums';

/**
 * Plantilla de Carga por Defecto (Tonos Grises - Web Estándar)
 */
export const ALF_DEFAULT_LOADING: AlfLoadingInterface = {
  isLoading: false,
  mode: AlfLoadingModeEnum.Inline,
  spinnerType: AlfSpinnerTypeEnum.Circle,
  spinnerColor: AlfColorEnum.Gray400,
  spinnerSize: AlfPxEnum.Px16,
  spinnerStrokeWidth: AlfSpinnerStrokeWidthEnum.Base,
  message: 'Cargando...' // Esto será sobreescrito por el i18n o el token global
};

/**
 * Plantilla de Carga Dark (Para fondos oscuros)
 */
export const ALF_DARK_LOADING: AlfLoadingInterface = {
  ...ALF_DEFAULT_LOADING,
  spinnerColor: AlfColorEnum.Gray200,
  overlayOpacity: 'O70' as any // Ejemplo de extensión
};

import {
  AlfLoadingModeEnum,
  AlfSpinnerTypeEnum,
  AlfOpacityEnum,
  AlfColorEnum,
  AlfSpinnerStrokeWidthEnum,
  AlfPxEnum,
  AlfRemEnum,
  AlfPercentageEnum
} from '../enums';

/**
 * Interfaz para el control y visualización de estados de carga
 * Permite definir cómo se comporta el componente mientras espera datos.
 */
export interface AlfLoadingInterface {
  /**
   * Indica si el componente se encuentra actualmente cargando.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Modo de visualización del estado de carga.
   * @example AlfLoadingModeEnum.Overlay 
   */
  mode?: AlfLoadingModeEnum;

  /**
   * Tipo de cargador visual (spinner) a mostrar.
   * @example AlfSpinnerTypeEnum.Circle 
   */
  spinnerType?: AlfSpinnerTypeEnum;

  /**
   * Color del cargador visual.
   * @example AlfColorEnum.Primary 
   */
  spinnerColor?: AlfColorEnum;

  /**
   * Grosor del trazo del spinner.
   * @example AlfSpinnerStrokeWidthEnum.Base 
   */
  spinnerStrokeWidth?: AlfSpinnerStrokeWidthEnum;

  /**
   * Tamaño del cargador (ej. AlfPxEnum.Px24).
   * @example AlfPxEnum.Px32 
   */
  spinnerSize?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /**
   * Nivel de opacidad de la capa de carga (solo para modo Overlay).
   * @example AlfOpacityEnum.O50 
   */
  overlayOpacity?: AlfOpacityEnum;

  /**
   * Si se debe aplicar un desenfoque (blur) al contenido de fondo durante la carga.
   * @default false
   */
  useBlur?: boolean;

  /**
   * Mensaje de texto opcional que se muestra junto al cargador.
   * @example 'Cargando datos...' 
   */
  message?: string;

  /** Clase CSS personalizada delegada al elemento de carga */
  customCssClass?: string | string[];

  /** Estilos CSS en línea personalizados @example [{ 'backdrop-filter': 'blur(4px)' }] */
  customCssStyle?: Record<string, string>[];
}

import { 
  AlfAnimationTypeEnum, 
  AlfTimingFunctionEnum 
} from '../enums';

/**
 * Propiedades de configuración para animaciones
 * Gestiona el comportamiento de entrada, salida y repetición.
 */
export interface AlfAnimationConfigInterface {
  /**
   * Animación de entrada (in)
   * Define el efecto al aparecer el elemento.
   * @example AlfAnimationTypeEnum.FadeIn 
   */
  in?: AlfAnimationTypeEnum;

  /**
   * Animación de salida (out)
   * Define el efecto al desaparecer el elemento.
   * @example AlfAnimationTypeEnum.FadeOut 
   */
  out?: AlfAnimationTypeEnum;

  /**
   * Duración de la animación en milisegundos
   * @default 300
   * @example 500 
   */
  duration?: number;

  /**
   * Retraso antes de iniciar la animación en milisegundos
   * @default 0
   * @example 100 
   */
  delay?: number;

  /**
   * Función de temporización (easing)
   * @default AlfTimingFunctionEnum.EaseInOut
   * @example AlfTimingFunctionEnum.Linear 
   */
  timingFunction?: AlfTimingFunctionEnum;

  /**
   * Número de veces que se repite la animación
   * @default 1
   * @example 1 | 'infinite'
   */
  iterationCount?: number | 'infinite';

  /** Clase CSS personalizada delegada al elemento */
  customCssClass?: string | string[];

  /** 
   * Estilos CSS en línea personalizados 
   * @example [{ 'animation-fill-mode': 'both' }] 
   */
  customCssStyle?: Record<string, string>[];
}

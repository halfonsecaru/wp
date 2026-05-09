import {
  AlfAnimationTypeEnum,
  AlfTimingFunctionEnum
} from '../enums';

/**
 * Interface para la configuración de un estado de animación CSS individual.
 */
export interface AlfAnimateCssStateInterface {
  /** Tipo de animación (Enum o string personalizado) */
  name?: AlfAnimationTypeEnum | string;
  /** @deprecated Usar name para consistencia con WAAPI */
  type?: AlfAnimationTypeEnum | string;
  /** Duración (ej: '500ms') */
  duration?: string;
  /** Retraso (ej: '200ms') */
  delay?: string;
  /** Repeticiones (ej: 'infinite' o número) */
  iterationCount?: string | number;
  /** Función de tiempo */
  timingFunction?: AlfTimingFunctionEnum | string;
  /** Fill mode */
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  /** Dirección */
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

/**
 * Interface principal para animaciones CSS basadas en etapas (Animate.css).
 */
export interface AlfAnimateCssInterface {
  /** Configuración para la etapa de entrada (Objeto completo o solo el tipo) */
  enterStage?: AlfAnimateCssStateInterface | AlfAnimationTypeEnum | string;
  
  /** Configuración para la etapa de salida (Objeto completo o solo el tipo) */
  exitStage?: AlfAnimateCssStateInterface | AlfAnimationTypeEnum | string;

  /** 
   * Propiedades globales opcionales que sobreescriben las de las etapas 
   * si no se definen en ellas.
   */
  duration?: string;
  delay?: string;
  iterationCount?: string | number;
  timingFunction?: AlfTimingFunctionEnum | string;
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  
  /** Acceso rápido para animación infinita */
  infinite?: boolean;

  /** 
   * @deprecated Usar enterStage/exitStage para mayor claridad.
   */
  type?: AlfAnimationTypeEnum | string;
}

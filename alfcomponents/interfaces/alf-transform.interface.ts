import {
  AlfPxEnum,
  AlfRemEnum,
  AlfPercentageEnum
} from '../enums';

/**
 * Interface para transformaciones CSS
 * Soporta todas las funciones de transform de forma individual o combinada.
 */
export interface AlfTransformBaseInterface {
  // ===== TRANSLATE (Traslación) =====
  /**
   * Traslación en el eje X
   * @example AlfPxEnum.Px10 | AlfRemEnum.Rem2 | AlfPercentageEnum.Percent50
   */
  translateX?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /**
   * Traslación en el eje Y
   * @example AlfPxEnum.Px10 | AlfRemEnum.Rem2 | AlfPercentageEnum.Percent50
   */
  translateY?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /**
   * Traslación en el eje Z (requiere perspective)
   * @example AlfPxEnum.Px10 | AlfRemEnum.Rem2
   */
  translateZ?: AlfPxEnum | AlfRemEnum;

  // ===== SCALE (Escala) =====
  /**
   * Escala en el eje X
   * @example 1.5 | 0.5 | 2
   */
  scaleX?: number;

  /**
   * Escala en el eje Y
   * @example 1.5 | 0.5 | 2
   */
  scaleY?: number;

  /**
   * Escala en el eje Z
   * @example 1.5 | 0.5 | 2
   */
  scaleZ?: number;

  /**
   * Escala uniforme en X e Y
   * @example 1.5 | 0.5 | 2
   */
  scale?: number;

  // ===== ROTATE (Rotación) =====
  /**
   * Rotación en 2D (equivalente a rotateZ)
   * Valor en grados
   * @example 45 | 90 | 180
   */
  rotate?: number;

  /**
   * Rotación en el eje X
   * Valor en grados
   * @example 45 | 90 | 180
   */
  rotateX?: number;

  /**
   * Rotación en el eje Y
   * Valor en grados
   * @example 45 | 90 | 180
   */
  rotateY?: number;

  /**
   * Rotación en el eje Z
   * Valor en grados
   * @example 45 | 90 | 180
   */
  rotateZ?: number;

  // ===== SKEW (Sesgo/Inclinación) =====
  /**
   * Sesgo en el eje X
   * Valor en grados
   * @example 10 | 20 | -10
   */
  skewX?: number;

  /**
   * Sesgo en el eje Y
   * Valor en grados
   * @example 10 | 20 | -10
   */
  skewY?: number;

  // ===== PERSPECTIVE =====
  /**
   * Perspectiva 3D
   * @example AlfPxEnum.Px1000
   */
  perspective?: AlfPxEnum | AlfRemEnum;

  // ===== TRANSFORM STYLE =====
  /**
   * Estilo de transformación 3D
   * @example 'preserve-3d'
   */
  transformStyle?: 'flat' | 'preserve-3d';

  // ===== BACKFACE VISIBILITY =====
  /**
   * Visibilidad de la cara trasera
   * @example 'hidden'
   */
  backfaceVisibility?: 'visible' | 'hidden';

}

/**
 * Interface para transformaciones con estados (default, hover, focus, active).
 */
export interface AlfTransformInterface {
  /**
   * Transformaciones por defecto aplicadas al componente.
   */
  default?: AlfTransformBaseInterface;

  /**
   * Transformaciones aplicadas cuando el puntero del usuario está sobre el elemento.
   */
  hover?: AlfTransformBaseInterface;

  /**
   * Transformaciones aplicadas cuando el elemento recibe el foco.
   */
  focus?: AlfTransformBaseInterface;

  /**
   * Transformaciones aplicadas cuando el elemento está activo (en click).
   */
  active?: AlfTransformBaseInterface;

  /**
   * Transformaciones aplicadas cuando el componente está deshabilitado.
   */
  disabled?: AlfTransformBaseInterface;
}

import { AlfTransformBaseInterface } from '@alfcomponents/interfaces';
import { AlfPxEnum, AlfVisibilityEnum } from '@alfcomponents/enums';

/**
 * Configuración base para transformaciones (Transform).
 * Define un estado neutro sin traslaciones, rotaciones ni escalas.
 */
export const defaultTransformBase: AlfTransformBaseInterface = {
  translateX: AlfPxEnum.None,
  translateY: AlfPxEnum.None,
  translateZ: AlfPxEnum.None,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  scale: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  skewX: 0,
  skewY: 0,
  perspective: AlfPxEnum.None,
  transformStyle: 'flat',
  backfaceVisibility: AlfVisibilityEnum.Visible
};

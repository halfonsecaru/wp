import { AlfAnimationTypeEnum } from "@alfcomponents/enums";
import { AlfAnimateCssInterface } from "@alfcomponents/interfaces";

/**
 * Configuración base para animaciones CSS.
 * Define un estado sin animación por defecto.
 */
export const defaultAnimationsBase: AlfAnimateCssInterface = {
  type: AlfAnimationTypeEnum.None,
  duration: '0ms',
  delay: '0ms',
  iterationCount: 1,
  fillMode: 'none',
  direction: 'normal'
};

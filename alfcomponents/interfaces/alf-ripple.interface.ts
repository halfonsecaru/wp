import { AlfColorEnum } from '../enums';

/**
 * Configuración para el efecto Ripple (material design)
 */
export interface AlfRippleInterface {
  /**
   * Habilita o deshabilita el efecto
   * @default true
   */
  enabled?: boolean;

  /**
   * Color del círculo del ripple.
   * SOLO AlfColorEnum según Regla #3 de memoria.md.
   * @default AlfColorEnum.Black (con opacidad)
   */
  color?: AlfColorEnum;

  /**
   * Duración de la animación en milisegundos
   * @default 600
   */
  duration?: number;

  /**
   * Opacidad final del ripple antes de desaparecer
   * @default 0
   */
  opacity?: number;

  /**
   * Escala final del ripple (multiplicador del diámetro)
   * @default 4
   */
  scale?: number;
}

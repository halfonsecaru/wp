import { AlfRippleInterface } from '../interfaces/alf-ripple.interface';
import { AlfColorEnum } from '../enums';

/**
 * ALF_RIPPLE_MATERIAL
 * Configuración base para el efecto ripple en toda la librería.
 * ✅ Duración ralentizada a 1000ms para un efecto más elegante.
 * ✅ Escalado ajustado para cobertura total.
 */
export const ALF_RIPPLE_MATERIAL: AlfRippleInterface = {
  enabled: true,
  color: AlfColorEnum.Black,
  duration: 1000, // Ahora el estándar de la librería es 1s
  scale: 1        // Usamos scale 1 porque ahora calculamos el diámetro por diagonal
};

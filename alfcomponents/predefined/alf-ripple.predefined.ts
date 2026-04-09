import { AlfColorEnum } from '../enums';
import { AlfRippleInterface } from '../interfaces/alf-ripple.interface';

/**
 * 🎨 Presets predefinidos del efecto Ripple.
 * Se usan como valor por defecto cuando la directiva recibe `true` o no recibe nada.
 *
 * @example
 * ```html
 * <!-- Usa ALF_RIPPLE_MATERIAL por defecto -->
 * <button alfRipple>Click</button>
 *
 * <!-- Usa un preset específico -->
 * <button [alfRipple]="ALF_RIPPLE_SUBTLE">Subtle</button>
 * ```
 */

/**
 * 🟢 Preset Material Design (DEFAULT)
 * Réplica fiel del ripple de Angular Material:
 * - Color negro con opacidad baja (efecto sobre fondos claros)
 * - Duración 450ms (entrada rápida, salida suave)
 * - Escala ×4 para cubrir el elemento completo
 * - Opacidad inicial 0.12, se desvanece a 0
 */
export const ALF_RIPPLE_MATERIAL: Readonly<AlfRippleInterface> = {
  enabled: true,
  color: AlfColorEnum.Black,
  duration: 450,
  opacity: 0,
  scale: 4,
};

/**
 * ⚪ Preset Material Design Dark (para fondos oscuros)
 * Usa blanco con opacidad baja para contrastar sobre fondos oscuros.
 */
export const ALF_RIPPLE_MATERIAL_DARK: Readonly<AlfRippleInterface> = {
  enabled: true,
  color: AlfColorEnum.White,
  duration: 450,
  opacity: 0,
  scale: 4,
};

/**
 * 🔵 Preset Primary
 * Ripple con el color primario del tema.
 */
export const ALF_RIPPLE_PRIMARY: Readonly<AlfRippleInterface> = {
  enabled: true,
  color: AlfColorEnum.Primary,
  duration: 450,
  opacity: 0,
  scale: 4,
};

/**
 * 🤏 Preset Subtle
 * Ripple discreto y rápido. Ideal para listas, items pequeños.
 */
export const ALF_RIPPLE_SUBTLE: Readonly<AlfRippleInterface> = {
  enabled: true,
  color: AlfColorEnum.Black,
  duration: 300,
  opacity: 0,
  scale: 3,
};

/**
 * 💥 Preset Bold
 * Ripple grande y bien visible. Para botones CTA o cards destacadas.
 */
export const ALF_RIPPLE_BOLD: Readonly<AlfRippleInterface> = {
  enabled: true,
  color: AlfColorEnum.Black,
  duration: 600,
  opacity: 0,
  scale: 6,
};

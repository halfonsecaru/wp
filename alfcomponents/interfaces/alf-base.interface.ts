import { 
  AlfColorVariantEnum, 
  AlfSizeEnum, 
  AlfIconsUnicodeIconEnum 
} from '../enums';
import { AlfTypographyInterface } from './alf-typography.interface';
import { AlfPaddingInterface } from './alf-padding.interface';
import { AlfMarginInterface } from './alf-margin.interface';
import { AlfBorderInterface } from './alf-border.interface';
import { AlfShadowsInterface } from './alf-shadows.interface';
import { AlfBackgroundsInterface } from './alf-backgrounds.interface';
import { AlfTransformInterface } from './alf-transform.interface';
import { AlfAriaInterface } from './alf-aria.interface';
import { AlfRippleInterface } from './alf-ripple.interface';
import { AlfLoadingInterface } from './alf-loading.interface';

/**
 * Interface AlfBaseInterface
 * Contenedor maestro que agrupa tanto propiedades primitivas como composiciones 
 * de estilo granular comunes para la arquitectura de componentes Alf.
 */
export interface AlfBaseInterface {
 
  /** Control de estados de carga y spinners */
  loading?: AlfLoadingInterface;
  
  /** Tipografía (fontSize, fontWeight, colors, alignment, etc.) */
  typography?: AlfTypographyInterface;

  /** Espaciado interno */
  padding?: AlfPaddingInterface;

  /** Espaciado externo */
  margin?: AlfMarginInterface;

  /** Bordes, radios y estilos de línea */
  border?: AlfBorderInterface;

  /** Sombras (box-shadow) */
  shadows?: AlfShadowsInterface;

  /** Fondos, gradientes y colores de fondo */
  backgrounds?: AlfBackgroundsInterface;

  /** Transformaciones (scale, rotate, translate) */
  transform?: AlfTransformInterface;

  /** Accesibilidad (ARIA roles y estados) */
  aria?: AlfAriaInterface;

  /** Efecto de pulsación táctil/visual */
  ripple?: boolean | AlfRippleInterface;
}

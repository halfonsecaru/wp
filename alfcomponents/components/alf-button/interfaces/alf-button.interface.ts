import { 
  AlfTypographyInterface, 
  AlfPaddingInterface, 
  AlfMarginInterface, 
  AlfBorderInterface, 
  AlfShadowsInterface, 
  AlfBackgroundsInterface, 
  AlfTransformInterface, 
  AlfAriaInterface,
  AlfRippleInterface,
  AlfLoadingInterface
} from '../../../interfaces';
import { AlfButtonTypeEnum, AlfColorVariantEnum, AlfSizeEnum } from '../../../enums';
import { AlfLinkTargetEnum } from '../../../enums/alf-link-target.enum';

/**
 * Interface AlfButtonConfig
 * Define la configuración completa y altamente granular para el AlfButton Élite.
 */
export interface AlfButtonConfig {
  /** Label/Texto del botón (soporta i18n dinámico si se integra) */
  label?: string;

  /** Variante semántica de color */
  variant?: AlfColorVariantEnum;

  /** Tamaño predefinido (Talle camiseta) */
  size?: AlfSizeEnum;

  /** Tipo HTML del botón */
  type?: AlfButtonTypeEnum;

  /** Si el botón está deshabilitado */
  disabled?: boolean;

  /** Configuración de enlace (convierte el botón en <a>) */
  link?: {
    url: string;
    target?: AlfLinkTargetEnum;
  };

  /** Icono a la izquierda */
  iconLeft?: string;

  /** Icono a la derecha */
  iconRight?: string;

  /** Estado de carga y configuración del spinner */
  loading?: AlfLoadingInterface;

  // --- Composiciones de Estilo Granular ---
  
  /** Tipografía (fontSize, fontWeight, colors, etc.) */
  typography?: AlfTypographyInterface;

  /** Espaciado interno */
  padding?: AlfPaddingInterface;

  /** Espaciado externo */
  margin?: AlfMarginInterface;

  /** Bordes y radios */
  border?: AlfBorderInterface;

  /** Sombras */
  shadows?: AlfShadowsInterface;

  /** Fondos y gradientes */
  backgrounds?: AlfBackgroundsInterface;

  /** Transformaciones (scale, rotate, etc.) */
  transform?: AlfTransformInterface;

  /** Accesibilidad ARIA */
  aria?: AlfAriaInterface;

  /** Configuración del efecto Ripple */
  ripple?: boolean | AlfRippleInterface;

  /** Identificador único para tests y tracking */
  id?: string | number;

  /** Clases CSS adicionales */
  customClass?: string | string[];

  /** Estilos manuales de último recurso */
  customStyle?: Record<string, string>;
}

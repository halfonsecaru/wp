import {
  AlfBaseInterface
} from '../../../interfaces';
import { AlfButtonTypeEnum, AlfColorVariantEnum, AlfIconsUnicodeIconEnum, AlfSizeEnum } from '../../../enums';
import { AlfLinkTargetEnum } from '../../../enums/alf-link-target.enum';

/**
 * Interface AlfButtonBaseInterface
 * Define las propiedades básicas del AlfButton, extendiendo la base común.
 */
export interface AlfButtonInterface extends AlfBaseInterface {
  /** Tipo HTML del botón */
  type?: AlfButtonTypeEnum;

  /** Configuración de enlace (convierte el botón en <a>) */
  link?: {
    url: string;
    target?: AlfLinkTargetEnum;
  };

  /** Identificador único para tests y tracking */
  id?: string | number;

  /** Label/Texto principal (soporta i18n) */
  label?: string;

  /** Variante semántica de color (Primary, Danger, Success, etc.) */
  variant?: AlfColorVariantEnum;

  /** Tamaño predefinido (talle camiseta) */
  size?: AlfSizeEnum;

  /** Estado de deshabilitado */
  disabled?: boolean;

  /** Icono izquierdo (Unicode) */
  iconLeft?: AlfIconsUnicodeIconEnum;

  /** Icono derecho (Unicode) */
  iconRight?: AlfIconsUnicodeIconEnum;

  /** Clases CSS adicionales */
  customClass?: string | string[];

  /** Estilos manuales de último recurso (inline styles) */
  customStyle?: Record<string, string>;
}


import { AlfTooltipConfig } from "@alfcomponents/directives";
import { AlfButtonTypeEnum, AlfButtonVisualTypeEnum, AlfColorVariantEnum, AlfCursorEnum, AlfIconsUnicodeIconEnum, AlfLinkTargetEnum, AlfSizeEnum } from "@alfcomponents/enums";
import { AlfBaseInterface } from "@alfcomponents/interfaces";

/**
 * Interface AlfButtonInterface
 * Define las propiedades básicas del AlfButton, extendiendo la base común.
 */
export interface AlfButtonInterface extends AlfBaseInterface {
  /** Configuración del Tooltip (Opcional) */
  tooltip?: string | AlfTooltipConfig;

  /** Tipo HTML del botón */
  type?: AlfButtonTypeEnum;

  /** Estilo visual del botón (Normal, Text, etc.) */
  visualType?: AlfButtonVisualTypeEnum;

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

  /** cursor predefinido (hand) */
  cursor?: AlfCursorEnum;

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


import { AlfBaseCommonConfigInterface } from "@alfcomponents/base";
import { AlfButtonTypeEnum, AlfButtonVisualTypeEnum, AlfIconsUnicodeIconEnum, AlfLinkTargetEnum } from "@alfcomponents/enums";

export interface ButtonLink {
  url: string;
  target?: AlfLinkTargetEnum;
};
/**
 * Interface AlfButtonInterface
 * Define las propiedades básicas del AlfButton, extendiendo la base común.
 */
export interface AlfButtonInterface extends AlfBaseCommonConfigInterface {
  /** Tipo HTML del botón */
  type?: AlfButtonTypeEnum;

  /** Estilo visual del botón (Normal, Text, etc.) */
  visualType?: AlfButtonVisualTypeEnum;

  /** Label/Texto principal (soporta i18n) */
  label?: string;

  /** Icono izquierdo (Unicode) */
  iconLeft?: AlfIconsUnicodeIconEnum;

  /** Icono derecho (Unicode) */
  iconRight?: AlfIconsUnicodeIconEnum;


  /** Configuración de enlace (convierte el botón en <a>) */
  link?: ButtonLink;

}


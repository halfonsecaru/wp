import { AlfBaseCommonConfigInterface } from '@alfcomponents/base/alf-base-configuration';
import { AlfCheckboxVariantEnum, AlfIconsUnicodeIconEnum, AlfSizeEnum } from '@alfcomponents/enums';

export interface AlfCheckboxInterface extends AlfBaseCommonConfigInterface {
  /** Estilo visual del checkbox (Elegant, Standard, Moving) */
  readonly checkboxStyle?: AlfCheckboxVariantEnum;

  /** Texto de la etiqueta */
  readonly label?: string;

  /** Posición de la etiqueta respecto al checkbox */
  readonly labelPosition?: 'before' | 'after';

  /** Tamaño del checkbox (Sm, Md, Lg, Xl) */
  readonly size?: AlfSizeEnum;

  /** Icono personalizado cuando está seleccionado */
  readonly iconSelected?: AlfIconsUnicodeIconEnum;

  /** Mensaje de error */
  readonly error?: string;

  /** Texto de ayuda debajo del checkbox */
  readonly helperText?: string;

  /** ID para accesibilidad */
  readonly id?: string;

  /** Valor asociado al checkbox */
  readonly value?: unknown;
}

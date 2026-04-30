import { AlfBaseCommonConfigInterface } from '@alfcomponents/base/alf-base-configuration';
import { AlfRadioButtonVariantEnum, AlfSizeEnum } from '@alfcomponents/enums';

export interface AlfRadioButtonInterface extends AlfBaseCommonConfigInterface {
  /** Estilo visual del radio button (Elegant, Standard) */
  readonly radioButtonStyle?: AlfRadioButtonVariantEnum;

  /** Texto de la etiqueta */
  readonly label?: string;

  /** Posición de la etiqueta respecto al radio button */
  readonly labelPosition?: 'before' | 'after';

  /** Tamaño del radio button (Sm, Md, Lg, Xl) */
  readonly size?: AlfSizeEnum;

  /** Mensaje de error */
  readonly error?: string;

  /** Texto de ayuda debajo del radio button */
  readonly helperText?: string;

  /** ID para accesibilidad */
  readonly id?: string;

  /** Valor asociado al radio button */
  readonly value?: unknown;

  /** Nombre del grupo de radios */
  readonly name?: string;
}

import {
  AlfColorEnum,
  AlfLabelsPositionEnum,
  AlfPxEnum,
  AlfSizeEnum,
} from '@alfcomponents/enums';
import { AlfBaseCommonConfigInterface } from '@alfcomponents/interfaces';

/**
 * Interface for the AlfSwitch component configuration.
 * Inherits from AlfBaseCommonConfigInterface to ensure visual consistency.
 */
export interface AlfSwitchInterface extends AlfBaseCommonConfigInterface {
  /**
   * Estilo visual del switch.
   * - 'standard': Diseño cuadrado/rectangular.
   * - 'elegant': Diseño redondeado/neumórfico.
   * @default 'elegant'
   * @example switchStyle: 'standard'
   */
  readonly switchStyle?: 'standard' | 'elegant';

  /**
   * Valor del componente para uso en formularios.
   * @example value: 'notifications_enabled'
   */
  readonly value?: any;

  /**
   * Nombre identificador para el elemento input del switch.
   * @example name: 'pushNotifications'
   */
  readonly name?: string;

  /**
   * Texto de ayuda reactivo que se muestra debajo del switch.
   * @example helperText: 'Recibe alertas en tiempo real'
   */
  readonly helperText?: string;

  /**
   * Mensaje de error reactivo. Al proveerse, activa el estado de error visual.
   * @example error: 'Este campo es obligatorio'
   */
  readonly error?: string;

  /**
   * Escala de dimensión visual (XS a 2XL).
   * @default AlfSizeEnum.MD
   * @example size: AlfSizeEnum.LG
   */
  readonly size?: AlfSizeEnum;

  /**
   * Estado del switch (activado/desactivado).
   * @default false
   * @example checked: true
   */
  readonly checked?: boolean;

  /**
   * Texto a mostrar dentro del track cuando el switch está activado.
   * Solo visible si showLabels es true.
   * @example onLabel: 'ON'
   */
  readonly onLabel?: string;

  /**
   * Texto a mostrar dentro del track cuando el switch está desactivado.
   * Solo visible si showLabels es true.
   * @example offLabel: 'OFF'
   */
  readonly offLabel?: string;

  /**
   * Controla la visibilidad de los labels internos (on/off) dentro del track.
   * @default false
   * @example showLabels: true
   */
  readonly showLabels?: boolean;

  /**
   * Posición del label descriptivo principal.
   * - 'before': Label a la izquierda del switch.
   * - 'after': Label a la derecha del switch.
   * @default 'after'
   * @example labelPosition: 'before'
   */
  readonly labelPosition?: AlfLabelsPositionEnum;

  /**
   * Texto del label principal descriptivo.
   * @example labelText: 'Activar notificaciones'
   */
  readonly labelText?: string;

  /**
   * Color del track cuando el switch está activado.
   * @default AlfColorEnum.Primary
   * @example checkedColor: AlfColorEnum.Green500
   */
  readonly checkedColor?: AlfColorEnum;

  /**
   * Color del track cuando el switch está desactivado.
   * @default AlfColorEnum.Gray400
   * @example uncheckedColor: AlfColorEnum.Gray300
   */
  readonly uncheckedColor?: AlfColorEnum;

  /**
   * Color del círculo/thumb deslizante del switch.
   * @default AlfColorEnum.White
   * @example thumbColor: AlfColorEnum.Gray100
   */
  readonly thumbColor?: AlfColorEnum;

  /**
   * Altura de la pista del switch.
   * Se aplica el estilo AlfBorderRadiusEnum.ExtraSmall si switchStyle es 'standard'
   * Se aplica el estilo AlfBorderRadiusEnum.ExtraLarge si switchStyle es 'elegant'
   * @default AlfSizeEnum.Size24
   * @example trackHeight: AlfSizeEnum.Size32
   */
  readonly trackHeight?: AlfSizeEnum;

  /**
   * Ancho de la pista del switch.
   * @default AlfPxEnum.Px48
   * @example trackWidth: AlfPxEnum.Px60
   */
  readonly trackWidth?: AlfPxEnum;

  /**
   * Tamaño del círculo/thumb deslizante.
   * @default AlfPxEnum.Px20
   * @example thumbSize: AlfPxEnum.Px28
   */
  readonly thumbSize?: AlfPxEnum;
}

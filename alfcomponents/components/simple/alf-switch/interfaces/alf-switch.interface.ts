import {
  AlfLabelsPositionEnum,
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
}


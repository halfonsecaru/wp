import {
  AlfLabelsPositionEnum,
  AlfSizeEnum,
} from '@alfcomponents/enums';
import { AlfBaseCommonConfigInterface } from '@alfcomponents/interfaces';
import { AlfSwitchI18nLabels } from '../i18n/switch-i18n';

/**
 * Interface for the AlfSwitch component configuration.
 * Inherits from AlfBaseCommonConfigInterface to ensure visual consistency.
 */
export interface AlfSwitchInterface extends AlfBaseCommonConfigInterface {
  
  readonly size?: AlfSizeEnum;
  readonly id?: string;
  readonly switchStyle?: 'standard' | 'elegant';
  readonly value?: any;
  readonly name?: string;
  readonly helperText?: string;
  readonly error?: string;
  readonly checked?: boolean;
  readonly onLabel?: string;
  readonly offLabel?: string;
  readonly showLabels?: boolean;
  readonly labelPosition?: AlfLabelsPositionEnum;
  readonly label?: string;
  readonly predefined?: keyof AlfSwitchI18nLabels;
}


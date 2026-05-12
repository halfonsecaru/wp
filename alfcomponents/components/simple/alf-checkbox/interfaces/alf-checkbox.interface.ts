import {
  AlfCheckboxVariantEnum,
  AlfSizeEnum,
} from '@alfcomponents/enums';
import { AlfBaseCommonConfigInterface } from '@alfcomponents/interfaces';

/**
 * Interface for the AlfCheckbox component configuration.
 * Inherits from AlfBaseCommonConfigInterface to ensure visual consistency.
 */
export interface AlfCheckboxInterface extends AlfBaseCommonConfigInterface {
  readonly checkboxStyle?: AlfCheckboxVariantEnum;
  readonly label?: string;
  readonly labelPosition?: 'before' | 'after';
  readonly checked?: boolean;
  readonly indeterminate?: boolean;
  readonly value?: any;
  readonly name?: string;
  readonly iconSelected?: string;
  readonly helperText?: string;
  readonly error?: string;
  readonly size?: AlfSizeEnum;
}

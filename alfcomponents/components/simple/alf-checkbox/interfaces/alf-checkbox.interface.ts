import {
  AlfCheckboxVariantEnum,
  AlfIconsUnicodeIconEnum,
  AlfSizeEnum,
} from '@alfcomponents/enums';
import { AlfBaseCommonConfigInterface } from '@alfcomponents/interfaces';
import { AlfCheckboxI18nLabels } from '../i18n/checkbox-i18n';

/**
 * Interface for the AlfCheckbox component configuration.
 * Inherits from AlfBaseCommonConfigInterface to ensure visual consistency.
 */
export interface AlfCheckboxInterface extends AlfBaseCommonConfigInterface {
  readonly id?: string;
  readonly checkboxStyle?: AlfCheckboxVariantEnum | 'standard' | 'elegant';
  readonly label?: string;
  readonly labelPosition?: 'before' | 'after';
  readonly checked?: boolean;
  readonly size?: AlfSizeEnum;
  readonly error?: string;
  readonly helperText?: string;
  readonly value?: string | number;
  readonly name?: string;
  readonly indeterminate?: boolean;
  readonly iconSelected?: AlfIconsUnicodeIconEnum;
  readonly predefined?: keyof AlfCheckboxI18nLabels;
}

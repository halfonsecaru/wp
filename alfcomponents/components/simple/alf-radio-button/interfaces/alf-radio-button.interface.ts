import {
  AlfRadioButtonVariantEnum,
  AlfSizeEnum,
  AlfColorVariantEnum,
  AlfIconsUnicodeIconEnum,
} from '@alfcomponents/enums';
import {
  AlfBaseCommonConfigInterface,
} from '@alfcomponents/interfaces';
import { AlfRadioButtonI18nLabels } from '../i18n/alf-radio-button-i18n';

export interface AlfRadioButtonInterface  extends AlfBaseCommonConfigInterface {
  readonly id?: string;
  readonly radioButtonStyle?: AlfRadioButtonVariantEnum;
  readonly label?: string;
  readonly labelPosition?: 'before' | 'after';
  readonly checked?: boolean;
  readonly size?: AlfSizeEnum;
  readonly error?: string;
  readonly helperText?: string;
  readonly value?: any;
  readonly name?: string;
  readonly iconSelected?: AlfIconsUnicodeIconEnum;
  readonly predefined?: keyof AlfRadioButtonI18nLabels;
}

import {
  AlfCheckboxVariantEnum,
  AlfSizeEnum,
  AlfColorVariantEnum,
} from '@alfcomponents/enums';
import {
  AlfBackgroundsInterface,
  AlfBorderInterface,
  AlfDisplayAndLayoutInterface,
  AlfMarginInterface,
  AlfPaddingInterface,
  AlfShadowsInterface,
  AlfTextStyleInterface,
  AlfTypographyInterface,
  AlfAnimateCssInterface,
} from '@alfcomponents/interfaces';

export interface AlfCheckboxInterface {
  readonly checkboxStyle?: AlfCheckboxVariantEnum;
  readonly label?: string;
  readonly labelPosition?: 'before' | 'after';
  readonly checked?: boolean;
  readonly indeterminate?: boolean;
  readonly disabled?: boolean;
  readonly size?: AlfSizeEnum;
  readonly colorVariant?: AlfColorVariantEnum;
  readonly value?: any;
  readonly name?: string;
  readonly iconSelected?: string;
  readonly helperText?: string;
  readonly error?: string;
  
  // Overrides visuales
  readonly backgrounds?: AlfBackgroundsInterface;
  readonly border?: AlfBorderInterface;
  readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
  readonly margin?: AlfMarginInterface;
  readonly padding?: AlfPaddingInterface;
  readonly shadows?: AlfShadowsInterface;
  readonly textStyle?: AlfTextStyleInterface;
  readonly typography?: AlfTypographyInterface;
  readonly animations?: AlfAnimateCssInterface;
}

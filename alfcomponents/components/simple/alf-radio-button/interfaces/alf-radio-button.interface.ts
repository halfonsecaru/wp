import {
  AlfRadioButtonVariantEnum,
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

export interface AlfRadioButtonInterface {
  readonly radioButtonStyle?: AlfRadioButtonVariantEnum;
  readonly label?: string;
  readonly labelPosition?: 'before' | 'after';
  readonly checked?: boolean;
  readonly disabled?: boolean;
  readonly size?: AlfSizeEnum;
  readonly error?: string;
  readonly helperText?: string;
  readonly colorVariant?: AlfColorVariantEnum;
  readonly value?: any;
  readonly name?: string;
  
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

import {
  AlfBackgroundsInterface,
  AlfBorderInterface,
  AlfDisplayAndLayoutInterface,
  AlfMarginInterface,
  AlfPaddingInterface,
  AlfShadowsInterface,
  AlfAnimateCssInterface,
  AlfBaseCommonConfigInterface,
} from '@alfcomponents/interfaces';
import { AlfColorVariantEnum } from '@alfcomponents/enums';

export interface AlfCardActionsConfigInterface extends AlfBaseCommonConfigInterface {
  readonly id?: string;
  readonly colorVariant?: AlfColorVariantEnum;
  readonly backgrounds?: AlfBackgroundsInterface;
  readonly border?: AlfBorderInterface;
  readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
  readonly margin?: AlfMarginInterface;
  readonly padding?: AlfPaddingInterface;
  readonly shadows?: AlfShadowsInterface;
  readonly animations?: AlfAnimateCssInterface;
}

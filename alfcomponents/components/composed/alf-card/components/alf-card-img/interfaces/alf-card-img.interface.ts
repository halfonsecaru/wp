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

export interface AlfCardImgConfigInterface extends AlfBaseCommonConfigInterface {
  readonly id?: string;
  readonly colorVariant?: AlfColorVariantEnum;
  readonly src?: string;
  readonly alt?: string;
  readonly backgrounds?: AlfBackgroundsInterface;
  readonly border?: AlfBorderInterface;
  readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
  readonly margin?: AlfMarginInterface;
  readonly padding?: AlfPaddingInterface;
  readonly shadows?: AlfShadowsInterface;
  readonly animations?: AlfAnimateCssInterface;
}

import {
  AlfColorVariantEnum,
} from "@alfcomponents/enums";
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
  AlfBaseCommonConfigInterface
} from "@alfcomponents/interfaces";

export interface AlfCardConfigInterface extends AlfBaseCommonConfigInterface {
  readonly id?: string;
  readonly backgrounds?: AlfBackgroundsInterface;
  readonly border?: AlfBorderInterface;
  readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
  readonly margin?: AlfMarginInterface;
  readonly padding?: AlfPaddingInterface;
  readonly shadows?: AlfShadowsInterface;
  readonly textStyle?: AlfTextStyleInterface;
  readonly typography?: AlfTypographyInterface;
  readonly animations?: AlfAnimateCssInterface;
  readonly helperText?: string;

}

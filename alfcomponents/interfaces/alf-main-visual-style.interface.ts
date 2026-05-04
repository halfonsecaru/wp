import { AlfAnimateCssInterface } from "./alf-animations.interface";
import { AlfBackgroundsInterface } from "./alf-backgrounds.interface";
import { AlfBorderInterface } from "./alf-border.interface";
import { AlfDisplayAndLayoutInterface } from "./alf-display-and-layout.interface";
import { AlfMarginInterface } from "./alf-margin.interface";
import { AlfOutlineInterface } from "./alf-outline.interface";
import { AlfPaddingInterface } from "./alf-padding.interface";
import { AlfShadowsInterface } from "./alf-shadows.interface";
import { AlfTextStyleInterface } from "./alf-text-style.interface";
import { AlfTransformInterface } from "./alf-transform.interface";
import { AlfTypographyInterface } from "./alf-typography.interface";
import { AlfColorEnum } from "@alfcomponents/enums";

/**
 * Interface maestra que engloba todas las dimensiones visuales de un componente.
 */
export interface MainVisualStyleInterface {
  readonly ripple: {
    readonly backgroundColor: AlfColorEnum;
  };
  readonly backgrounds?: AlfBackgroundsInterface;
  readonly border?: AlfBorderInterface;
  readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
  readonly margin?: AlfMarginInterface;
  readonly outline?: AlfOutlineInterface;
  readonly padding?: AlfPaddingInterface;
  readonly shadows?: AlfShadowsInterface;
  readonly textStyle?: AlfTextStyleInterface;
  readonly transform?: AlfTransformInterface;
  readonly typography?: AlfTypographyInterface;
  readonly animations?: AlfAnimateCssInterface;
}

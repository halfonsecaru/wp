import { Directive, input } from '@angular/core';
import { AlfBackgroundsInterface, AlfBackgroundsBaseInterface, AlfBorderInterface, AlfBorderBaseInterface, AlfOutlineInterface, AlfOutlineBaseInterface, AlfShadowsInterface, AlfShadowsBaseInterface, AlfAnimateCssInterface, AlfMarginInterface, AlfMarginBaseInterface, AlfPaddingInterface, AlfPaddingBaseInterface, AlfTypographyInterface, AlfTypographyBaseInterface, AlfTextStyleInterface, AlfTextStyleStateBaseInterface, AlfTransformInterface, AlfTransformBaseInterface, AlfDisplayAndLayoutInterface, AlfDisplayAndLayoutBaseInterface, AlfRippleInterface, AlfAriaBaseInterface } from '@alfcomponents/interfaces';
import { AlfCursorEnum, AlfSizeEnum } from '@alfcomponents/enums';
import { AlfTooltipConfig } from '@alfcomponents/directives';

@Directive()
export abstract class AlfBaseDirective {

  public readonly background       = input<AlfBackgroundsInterface      | AlfBackgroundsBaseInterface      | undefined>(undefined);
  public readonly border           = input<AlfBorderInterface           | AlfBorderBaseInterface           | undefined>(undefined);
  public readonly outline          = input<AlfOutlineInterface          | AlfOutlineBaseInterface          | undefined>(undefined);
  public readonly shadows          = input<AlfShadowsInterface          | AlfShadowsBaseInterface          | undefined>(undefined);
  public readonly margin           = input<AlfMarginInterface           | AlfMarginBaseInterface           | undefined>(undefined);
  public readonly padding          = input<AlfPaddingInterface          | AlfPaddingBaseInterface          | undefined>(undefined);
  public readonly typography       = input<AlfTypographyInterface       | AlfTypographyBaseInterface       | undefined>(undefined);
  public readonly textStyle        = input<AlfTextStyleInterface        | AlfTextStyleStateBaseInterface   | undefined>(undefined);
  public readonly transform        = input<AlfTransformInterface        | AlfTransformBaseInterface        | undefined>(undefined);
  public readonly displayAndLayout = input<AlfDisplayAndLayoutInterface | AlfDisplayAndLayoutBaseInterface | undefined>(undefined);

  public readonly ripple           = input<boolean | AlfRippleInterface | undefined>(undefined);
  public readonly cursor           = input<AlfCursorEnum | undefined>(undefined);
  public readonly size             = input<AlfSizeEnum | undefined>(undefined);
  public readonly animations       = input<AlfAnimateCssInterface  | undefined>(undefined);
  public readonly tooltip          = input<string | AlfTooltipConfig | undefined>(undefined);
  
  public readonly disabled         = input<boolean>(false);
  public readonly aria             = input<AlfAriaBaseInterface | undefined>(undefined);
  public readonly customClass      = input<string | undefined>(undefined);
  public readonly customStyle      = input<string | undefined>(undefined);
}

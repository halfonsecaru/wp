import { Component } from '@angular/core';
import { AlfTooltipTextDirective, AlfRippleDirective } from '@alfcomponents/directives';
import { AlfBackgroundDirective } from '../../visualStyles/background/background';
import { AlfBorderDirective } from '../../visualStyles/border/border';
import { AlfOutlineDirective } from '../../visualStyles/outline/outline';
import { AlfShadowsDirective } from '../../visualStyles/shadows/shadows';
import { AlfAnimationsDirective } from '../../visualStyles/animations/animations';
import { AlfMarginDirective } from '../../visualStyles/margin/margin';
import { AlfPaddingDirective } from '../../visualStyles/padding/padding';
import { AlfTypographyDirective } from '../../visualStyles/typography/typography';
import { AlfTextStyleDirective } from '../../visualStyles/textStyle/textStyle';
import { AlfTransformDirective } from '../../visualStyles/transform/transform';
import { AlfDisplayAndLayoutDirective } from '../../visualStyles/displayAndLayout/displayAndLayout';
import { AlfCursorDirective } from '../../visualStyles/cursor/cursor';
import { AlfSizeDirective } from '../../visualStyles/size/size';
import { AlfDisabledDirective } from '../../visualStyles/disabled/disabled';
import { AlfAriaDirective } from '../../visualStyles/aria/aria';
import { AlfBaseDirective } from './base.directive';

@Component({
  selector: 'alf-base',
  imports: [
    AlfBackgroundDirective,
    AlfBorderDirective,
    AlfOutlineDirective,
    AlfShadowsDirective,
    AlfAnimationsDirective,
    AlfMarginDirective,
    AlfPaddingDirective,
    AlfTypographyDirective,
    AlfTextStyleDirective,
    AlfTransformDirective,
    AlfDisplayAndLayoutDirective,
    AlfCursorDirective,
    AlfSizeDirective,
    AlfDisabledDirective,
    AlfTooltipTextDirective,
    AlfRippleDirective,
    AlfAriaDirective
  ],
  templateUrl: './base.html',
  styleUrl: './base.scss',
})
export class Base extends AlfBaseDirective {

}

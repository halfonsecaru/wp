import { AlfBackgroundDirective } from './background/background';
import { AlfBorderDirective } from './border/border';
import { AlfOutlineDirective } from './outline/outline';
import { AlfShadowsDirective } from './shadows/shadows';
import { AlfAnimationsDirective } from './animations/animations';
import { AlfMarginDirective } from './margin/margin';
import { AlfPaddingDirective } from './padding/padding';
import { AlfTypographyDirective } from './typography/typography';
import { AlfTextStyleDirective } from './textStyle/textStyle';
import { AlfTransformDirective } from './transform/transform';
import { AlfTransitionDirective } from './transition/transition';
import { AlfDisplayAndLayoutDirective } from './displayAndLayout/displayAndLayout';
import { AlfCursorDirective } from './cursor/cursor';
import { AlfSizeDirective } from './size/size';
import { AlfDisabledDirective } from './disabled/disabled';
import { AlfAriaDirective } from './aria/aria';

/**
 * Common barrel for all Elite Visual Engine directives.
 * Use this array to quickly import all visual directives into a component.
 */
export const ALF_VISUAL_DIRECTIVES = [
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
  AlfTransitionDirective,
  AlfDisplayAndLayoutDirective,
  AlfCursorDirective,
  AlfSizeDirective,
  AlfDisabledDirective,
  AlfAriaDirective,
] as const;

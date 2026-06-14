import { AlfRippleDirective } from './ripple/alf-ripple.directive';
import { AlfTooltipTextDirective } from './tooltip-text/tooltip-text';
import { ALF_VISUAL_DIRECTIVES } from '@alfcomponents/visualStyles';

/**
 * Ultimate general barrel for Elite Components.
 * Combines all visual directives with common behavior directives (Ripple, Tooltip).
 */
export const ALF_CORE_DIRECTIVES = [
  ...ALF_VISUAL_DIRECTIVES,
  AlfRippleDirective,
  AlfTooltipTextDirective,
] as const;

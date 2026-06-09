import { Directive, input, computed } from '@angular/core';
import { AlfTypographyInterface, AlfTypographyBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfTypography]',
  standalone: true,
  host: {
    // --- TRANSITION ---
    '[style.transition]': '"color 0.25s ease-in-out, font-size 0.25s ease-in-out, font-weight 0.25s ease-in-out, letter-spacing 0.25s ease-in-out, opacity 0.25s ease-in-out"',

    // --- DEFAULT STATE ---
    '[style.--alf-font-size]':         'this.resolvedTypography()?.default?.fontSize         ?? undefined',
    '[style.--alf-font-weight]':       'this.resolvedTypography()?.default?.fontWeight       ?? undefined',
    '[style.--alf-font-family]':       'this.resolvedTypography()?.default?.fontFamily       ?? undefined',
    '[style.--alf-line-height]':       'this.resolvedTypography()?.default?.lineHeight       ?? undefined',
    '[style.--alf-letter-spacing]':    'this.resolvedTypography()?.default?.letterSpacing    ?? undefined',
    '[style.--alf-text-align]':        'this.resolvedTypography()?.default?.textAlign        ?? undefined',
    '[style.--alf-text-decoration]':   'this.resolvedTypography()?.default?.textDecoration   ?? undefined',
    '[style.--alf-text-transform]':    'this.resolvedTypography()?.default?.textTransform    ?? undefined',
    '[style.--alf-color]':             'this.resolvedTypography()?.default?.color             ?? undefined',
    '[style.--alf-white-space]':       'this.resolvedTypography()?.default?.whiteSpace       ?? undefined',
    '[style.--alf-word-break]':        'this.resolvedTypography()?.default?.wordBreak        ?? undefined',
    '[style.--alf-overflow-wrap]':     'this.resolvedTypography()?.default?.overflowWrap     ?? undefined',
    '[style.--alf-vertical-align]':    'this.resolvedTypography()?.default?.verticalAlign    ?? undefined',
    '[style.--alf-font-style]':        'this.resolvedTypography()?.default?.fontStyle        ?? undefined',
    '[style.--alf-text-overflow]':     'this.resolvedTypography()?.default?.textOverflow     ?? undefined',
    '[style.--alf-opacity]':           'this.resolvedTypography()?.default?.opacity          ?? undefined',
    '[style.--alf-text-shadow]':       'this.resolvedTypography()?.default?.textShadow       ?? undefined',

    // --- HOVER STATE ---
    '[style.--alf-font-size-hover]':         'this.resolvedTypography()?.hover?.fontSize         ?? undefined',
    '[style.--alf-font-weight-hover]':       'this.resolvedTypography()?.hover?.fontWeight       ?? undefined',
    '[style.--alf-font-family-hover]':       'this.resolvedTypography()?.hover?.fontFamily       ?? undefined',
    '[style.--alf-line-height-hover]':       'this.resolvedTypography()?.hover?.lineHeight       ?? undefined',
    '[style.--alf-letter-spacing-hover]':    'this.resolvedTypography()?.hover?.letterSpacing    ?? undefined',
    '[style.--alf-text-align-hover]':        'this.resolvedTypography()?.hover?.textAlign        ?? undefined',
    '[style.--alf-text-decoration-hover]':   'this.resolvedTypography()?.hover?.textDecoration   ?? undefined',
    '[style.--alf-text-transform-hover]':    'this.resolvedTypography()?.hover?.textTransform    ?? undefined',
    '[style.--alf-color-hover]':             'this.resolvedTypography()?.hover?.color             ?? undefined',
    '[style.--alf-white-space-hover]':       'this.resolvedTypography()?.hover?.whiteSpace       ?? undefined',
    '[style.--alf-word-break-hover]':        'this.resolvedTypography()?.hover?.wordBreak        ?? undefined',
    '[style.--alf-overflow-wrap-hover]':     'this.resolvedTypography()?.hover?.overflowWrap     ?? undefined',
    '[style.--alf-vertical-align-hover]':    'this.resolvedTypography()?.hover?.verticalAlign    ?? undefined',
    '[style.--alf-font-style-hover]':        'this.resolvedTypography()?.hover?.fontStyle        ?? undefined',
    '[style.--alf-text-overflow-hover]':     'this.resolvedTypography()?.hover?.textOverflow     ?? undefined',
    '[style.--alf-opacity-hover]':           'this.resolvedTypography()?.hover?.opacity          ?? undefined',
    '[style.--alf-text-shadow-hover]':       'this.resolvedTypography()?.hover?.textShadow       ?? undefined',

    // --- ACTIVE STATE ---
    '[style.--alf-font-size-active]':         'this.resolvedTypography()?.active?.fontSize         ?? undefined',
    '[style.--alf-font-weight-active]':       'this.resolvedTypography()?.active?.fontWeight       ?? undefined',
    '[style.--alf-font-family-active]':       'this.resolvedTypography()?.active?.fontFamily       ?? undefined',
    '[style.--alf-line-height-active]':       'this.resolvedTypography()?.active?.lineHeight       ?? undefined',
    '[style.--alf-letter-spacing-active]':    'this.resolvedTypography()?.active?.letterSpacing    ?? undefined',
    '[style.--alf-text-align-active]':        'this.resolvedTypography()?.active?.textAlign        ?? undefined',
    '[style.--alf-text-decoration-active]':   'this.resolvedTypography()?.active?.textDecoration   ?? undefined',
    '[style.--alf-text-transform-active]':    'this.resolvedTypography()?.active?.textTransform    ?? undefined',
    '[style.--alf-color-active]':             'this.resolvedTypography()?.active?.color             ?? undefined',
    '[style.--alf-white-space-active]':       'this.resolvedTypography()?.active?.whiteSpace       ?? undefined',
    '[style.--alf-word-break-active]':        'this.resolvedTypography()?.active?.wordBreak        ?? undefined',
    '[style.--alf-overflow-wrap-active]':     'this.resolvedTypography()?.active?.overflowWrap     ?? undefined',
    '[style.--alf-vertical-align-active]':    'this.resolvedTypography()?.active?.verticalAlign    ?? undefined',
    '[style.--alf-font-style-active]':        'this.resolvedTypography()?.active?.fontStyle        ?? undefined',
    '[style.--alf-text-overflow-active]':     'this.resolvedTypography()?.active?.textOverflow     ?? undefined',
    '[style.--alf-opacity-active]':           'this.resolvedTypography()?.active?.opacity          ?? undefined',
    '[style.--alf-text-shadow-active]':       'this.resolvedTypography()?.active?.textShadow       ?? undefined',

    // --- FOCUS STATE ---
    '[style.--alf-font-size-focus]':         'this.resolvedTypography()?.focus?.fontSize         ?? undefined',
    '[style.--alf-font-weight-focus]':       'this.resolvedTypography()?.focus?.fontWeight       ?? undefined',
    '[style.--alf-font-family-focus]':       'this.resolvedTypography()?.focus?.fontFamily       ?? undefined',
    '[style.--alf-line-height-focus]':       'this.resolvedTypography()?.focus?.lineHeight       ?? undefined',
    '[style.--alf-letter-spacing-focus]':    'this.resolvedTypography()?.focus?.letterSpacing    ?? undefined',
    '[style.--alf-text-align-focus]':        'this.resolvedTypography()?.focus?.textAlign        ?? undefined',
    '[style.--alf-text-decoration-focus]':   'this.resolvedTypography()?.focus?.textDecoration   ?? undefined',
    '[style.--alf-text-transform-focus]':    'this.resolvedTypography()?.focus?.textTransform    ?? undefined',
    '[style.--alf-color-focus]':             'this.resolvedTypography()?.focus?.color             ?? undefined',
    '[style.--alf-white-space-focus]':       'this.resolvedTypography()?.focus?.whiteSpace       ?? undefined',
    '[style.--alf-word-break-focus]':        'this.resolvedTypography()?.focus?.wordBreak        ?? undefined',
    '[style.--alf-overflow-wrap-focus]':     'this.resolvedTypography()?.focus?.overflowWrap     ?? undefined',
    '[style.--alf-vertical-align-focus]':    'this.resolvedTypography()?.focus?.verticalAlign    ?? undefined',
    '[style.--alf-font-style-focus]':        'this.resolvedTypography()?.focus?.fontStyle        ?? undefined',
    '[style.--alf-text-overflow-focus]':     'this.resolvedTypography()?.focus?.textOverflow     ?? undefined',
    '[style.--alf-opacity-focus]':           'this.resolvedTypography()?.focus?.opacity          ?? undefined',
    '[style.--alf-text-shadow-focus]':       'this.resolvedTypography()?.focus?.textShadow       ?? undefined',

    // --- DISABLED STATE ---
    '[style.--alf-font-size-disabled]':         'this.resolvedTypography()?.disabled?.fontSize         ?? undefined',
    '[style.--alf-font-weight-disabled]':       'this.resolvedTypography()?.disabled?.fontWeight       ?? undefined',
    '[style.--alf-font-family-disabled]':       'this.resolvedTypography()?.disabled?.fontFamily       ?? undefined',
    '[style.--alf-line-height-disabled]':       'this.resolvedTypography()?.disabled?.lineHeight       ?? undefined',
    '[style.--alf-letter-spacing-disabled]':    'this.resolvedTypography()?.disabled?.letterSpacing    ?? undefined',
    '[style.--alf-text-align-disabled]':        'this.resolvedTypography()?.disabled?.textAlign        ?? undefined',
    '[style.--alf-text-decoration-disabled]':   'this.resolvedTypography()?.disabled?.textDecoration   ?? undefined',
    '[style.--alf-text-transform-disabled]':    'this.resolvedTypography()?.disabled?.textTransform    ?? undefined',
    '[style.--alf-color-disabled]':             'this.resolvedTypography()?.disabled?.color             ?? undefined',
    '[style.--alf-white-space-disabled]':       'this.resolvedTypography()?.disabled?.whiteSpace       ?? undefined',
    '[style.--alf-word-break-disabled]':        'this.resolvedTypography()?.disabled?.wordBreak        ?? undefined',
    '[style.--alf-overflow-wrap-disabled]':     'this.resolvedTypography()?.disabled?.overflowWrap     ?? undefined',
    '[style.--alf-vertical-align-disabled]':    'this.resolvedTypography()?.disabled?.verticalAlign    ?? undefined',
    '[style.--alf-font-style-disabled]':        'this.resolvedTypography()?.disabled?.fontStyle        ?? undefined',
    '[style.--alf-text-overflow-disabled]':     'this.resolvedTypography()?.disabled?.textOverflow     ?? undefined',
    '[style.--alf-opacity-disabled]':           'this.resolvedTypography()?.disabled?.opacity          ?? undefined',
    '[style.--alf-text-shadow-disabled]':       'this.resolvedTypography()?.disabled?.textShadow       ?? undefined',
  }
})
export class AlfTypographyDirective {
  public readonly alfTypography = input<AlfTypographyInterface | AlfTypographyBaseInterface | undefined>(undefined);

  public readonly resolvedTypography = computed<AlfTypographyInterface | undefined>(() => {
    const typography = this.alfTypography();
    if (!typography) return undefined;

    if ('default' in typography) {
      return typography as AlfTypographyInterface;
    }

    return {
      default: typography as AlfTypographyBaseInterface,
    };
  });
}

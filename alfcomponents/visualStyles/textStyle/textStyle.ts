import { Directive, input, computed } from '@angular/core';
import { AlfTextStyleInterface, AlfTextStyleStateBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfTextStyle]',
  standalone: true,
  host: {
    // --- TRANSITION ---
    '[style.transition]': '"color 0.25s ease-in-out, font-size 0.25s ease-in-out, font-weight 0.25s ease-in-out, letter-spacing 0.25s ease-in-out, opacity 0.25s ease-in-out, text-shadow 0.25s ease-in-out"',

    // --- DEFAULT STATE ---
    '[style.--alf-ts-color]':           'this.resolvedTextStyle()?.default?.color          ?? undefined',
    '[style.--alf-ts-font-size]':       'this.resolvedTextStyle()?.default?.fontSize       ?? undefined',
    '[style.--alf-ts-font-weight]':     'this.resolvedTextStyle()?.default?.fontWeight     ?? undefined',
    '[style.--alf-ts-line-height]':     'this.resolvedTextStyle()?.default?.lineHeight     ?? undefined',
    '[style.--alf-ts-letter-spacing]':  'this.resolvedTextStyle()?.default?.letterSpacing  ?? undefined',
    '[style.--alf-ts-opacity]':         'this.resolvedTextStyle()?.default?.opacity        ?? undefined',
    '[style.--alf-ts-text-shadow]':     'this.resolvedTextStyle()?.default?.textShadow     ?? undefined',
    '[style.--alf-ts-text-decoration]': 'this.resolvedTextStyle()?.default?.textDecoration ?? undefined',
    '[style.--alf-ts-text-transform]':  'this.resolvedTextStyle()?.default?.textTransform  ?? undefined',

    // --- HOVER STATE ---
    '[style.--alf-ts-color-hover]':           'this.resolvedTextStyle()?.hover?.color          ?? undefined',
    '[style.--alf-ts-font-size-hover]':       'this.resolvedTextStyle()?.hover?.fontSize       ?? undefined',
    '[style.--alf-ts-font-weight-hover]':     'this.resolvedTextStyle()?.hover?.fontWeight     ?? undefined',
    '[style.--alf-ts-line-height-hover]':     'this.resolvedTextStyle()?.hover?.lineHeight     ?? undefined',
    '[style.--alf-ts-letter-spacing-hover]':  'this.resolvedTextStyle()?.hover?.letterSpacing  ?? undefined',
    '[style.--alf-ts-opacity-hover]':         'this.resolvedTextStyle()?.hover?.opacity        ?? undefined',
    '[style.--alf-ts-text-shadow-hover]':     'this.resolvedTextStyle()?.hover?.textShadow     ?? undefined',
    '[style.--alf-ts-text-decoration-hover]': 'this.resolvedTextStyle()?.hover?.textDecoration ?? undefined',
    '[style.--alf-ts-text-transform-hover]':  'this.resolvedTextStyle()?.hover?.textTransform  ?? undefined',

    // --- ACTIVE STATE ---
    '[style.--alf-ts-color-active]':           'this.resolvedTextStyle()?.active?.color          ?? undefined',
    '[style.--alf-ts-font-size-active]':       'this.resolvedTextStyle()?.active?.fontSize       ?? undefined',
    '[style.--alf-ts-font-weight-active]':     'this.resolvedTextStyle()?.active?.fontWeight     ?? undefined',
    '[style.--alf-ts-line-height-active]':     'this.resolvedTextStyle()?.active?.lineHeight     ?? undefined',
    '[style.--alf-ts-letter-spacing-active]':  'this.resolvedTextStyle()?.active?.letterSpacing  ?? undefined',
    '[style.--alf-ts-opacity-active]':         'this.resolvedTextStyle()?.active?.opacity        ?? undefined',
    '[style.--alf-ts-text-shadow-active]':     'this.resolvedTextStyle()?.active?.textShadow     ?? undefined',
    '[style.--alf-ts-text-decoration-active]': 'this.resolvedTextStyle()?.active?.textDecoration ?? undefined',
    '[style.--alf-ts-text-transform-active]':  'this.resolvedTextStyle()?.active?.textTransform  ?? undefined',

    // --- FOCUS STATE ---
    '[style.--alf-ts-color-focus]':           'this.resolvedTextStyle()?.focus?.color          ?? undefined',
    '[style.--alf-ts-font-size-focus]':       'this.resolvedTextStyle()?.focus?.fontSize       ?? undefined',
    '[style.--alf-ts-font-weight-focus]':     'this.resolvedTextStyle()?.focus?.fontWeight     ?? undefined',
    '[style.--alf-ts-line-height-focus]':     'this.resolvedTextStyle()?.focus?.lineHeight     ?? undefined',
    '[style.--alf-ts-letter-spacing-focus]':  'this.resolvedTextStyle()?.focus?.letterSpacing  ?? undefined',
    '[style.--alf-ts-opacity-focus]':         'this.resolvedTextStyle()?.focus?.opacity        ?? undefined',
    '[style.--alf-ts-text-shadow-focus]':     'this.resolvedTextStyle()?.focus?.textShadow     ?? undefined',
    '[style.--alf-ts-text-decoration-focus]': 'this.resolvedTextStyle()?.focus?.textDecoration ?? undefined',
    '[style.--alf-ts-text-transform-focus]':  'this.resolvedTextStyle()?.focus?.textTransform  ?? undefined',

    // --- DISABLED STATE ---
    '[style.--alf-ts-color-disabled]':           'this.resolvedTextStyle()?.disabled?.color          ?? undefined',
    '[style.--alf-ts-font-size-disabled]':       'this.resolvedTextStyle()?.disabled?.fontSize       ?? undefined',
    '[style.--alf-ts-font-weight-disabled]':     'this.resolvedTextStyle()?.disabled?.fontWeight     ?? undefined',
    '[style.--alf-ts-line-height-disabled]':     'this.resolvedTextStyle()?.disabled?.lineHeight     ?? undefined',
    '[style.--alf-ts-letter-spacing-disabled]':  'this.resolvedTextStyle()?.disabled?.letterSpacing  ?? undefined',
    '[style.--alf-ts-opacity-disabled]':         'this.resolvedTextStyle()?.disabled?.opacity        ?? undefined',
    '[style.--alf-ts-text-shadow-disabled]':     'this.resolvedTextStyle()?.disabled?.textShadow     ?? undefined',
    '[style.--alf-ts-text-decoration-disabled]': 'this.resolvedTextStyle()?.disabled?.textDecoration ?? undefined',
    '[style.--alf-ts-text-transform-disabled]':  'this.resolvedTextStyle()?.disabled?.textTransform  ?? undefined',
  }
})
export class AlfTextStyleDirective {
  public readonly alfTextStyle = input<AlfTextStyleInterface | AlfTextStyleStateBaseInterface | undefined>(undefined);

  public readonly resolvedTextStyle = computed<AlfTextStyleInterface | undefined>(() => {
    const textStyle = this.alfTextStyle();
    if (!textStyle) return undefined;

    if ('default' in textStyle) {
      return textStyle as AlfTextStyleInterface;
    }

    return {
      default: textStyle as AlfTextStyleStateBaseInterface,
    };
  });
}

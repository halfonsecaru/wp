import { Directive, input, computed } from '@angular/core';
import { AlfBorderInterface, AlfBorderBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfBorder]',
  standalone: true,
  host: {
    // --- TRANSITION ---
    '[style.transition]': '"background-color 0.25s ease-in-out, background-image 0.25s ease-in-out, border-color 0.25s ease-in-out, border-width 0.25s ease-in-out, border-style 0.25s ease-in-out, border-radius 0.25s ease-in-out, outline-color 0.25s ease-in-out, outline-width 0.25s ease-in-out, outline-offset 0.25s ease-in-out"',

    // --- DEFAULT STATE ---
    '[style.--alf-border-width]': 'this.resolvedBorder()?.default?.borderWidth ?? undefined',
    '[style.--alf-border-top-width]': 'this.resolvedBorder()?.default?.borderTopWidth ?? undefined',
    '[style.--alf-border-right-width]': 'this.resolvedBorder()?.default?.borderRightWidth ?? undefined',
    '[style.--alf-border-bottom-width]': 'this.resolvedBorder()?.default?.borderBottomWidth ?? undefined',
    '[style.--alf-border-left-width]': 'this.resolvedBorder()?.default?.borderLeftWidth ?? undefined',

    '[style.--alf-border-style]': 'this.resolvedBorder()?.default?.borderStyle ?? undefined',
    '[style.--alf-border-top-style]': 'this.resolvedBorder()?.default?.borderTopStyle ?? undefined',
    '[style.--alf-border-right-style]': 'this.resolvedBorder()?.default?.borderRightStyle ?? undefined',
    '[style.--alf-border-bottom-style]': 'this.resolvedBorder()?.default?.borderBottomStyle ?? undefined',
    '[style.--alf-border-left-style]': 'this.resolvedBorder()?.default?.borderLeftStyle ?? undefined',

    '[style.--alf-border-color]': 'this.resolvedBorder()?.default?.borderColor ?? undefined',
    '[style.--alf-border-top-color]': 'this.resolvedBorder()?.default?.borderTopColor ?? undefined',
    '[style.--alf-border-right-color]': 'this.resolvedBorder()?.default?.borderRightColor ?? undefined',
    '[style.--alf-border-bottom-color]': 'this.resolvedBorder()?.default?.borderBottomColor ?? undefined',
    '[style.--alf-border-left-color]': 'this.resolvedBorder()?.default?.borderLeftColor ?? undefined',

    '[style.--alf-border-radius]': 'this.resolvedBorder()?.default?.borderRadius ?? undefined',
    '[style.--alf-border-top-left-radius]': 'this.resolvedBorder()?.default?.borderTopLeftRadius ?? undefined',
    '[style.--alf-border-top-right-radius]': 'this.resolvedBorder()?.default?.borderTopRightRadius ?? undefined',
    '[style.--alf-border-bottom-right-radius]': 'this.resolvedBorder()?.default?.borderBottomRightRadius ?? undefined',
    '[style.--alf-border-bottom-left-radius]': 'this.resolvedBorder()?.default?.borderBottomLeftRadius ?? undefined',

    '[style.--alf-outline-width]': 'this.resolvedBorder()?.default?.outlineWidth ?? undefined',
    '[style.--alf-outline-style]': 'this.resolvedBorder()?.default?.outlineStyle ?? undefined',
    '[style.--alf-outline-color]': 'this.resolvedBorder()?.default?.outlineColor ?? undefined',
    '[style.--alf-outline-offset]': 'this.resolvedBorder()?.default?.outlineOffset ?? undefined',
    '[style.--alf-box-sizing]': 'this.resolvedBorder()?.default?.boxSizing ?? undefined',

    // --- HOVER STATE ---
    '[style.--alf-border-width-hover]': 'this.resolvedBorder()?.hover?.borderWidth ?? undefined',
    '[style.--alf-border-top-width-hover]': 'this.resolvedBorder()?.hover?.borderTopWidth ?? undefined',
    '[style.--alf-border-right-width-hover]': 'this.resolvedBorder()?.hover?.borderRightWidth ?? undefined',
    '[style.--alf-border-bottom-width-hover]': 'this.resolvedBorder()?.hover?.borderBottomWidth ?? undefined',
    '[style.--alf-border-left-width-hover]': 'this.resolvedBorder()?.hover?.borderLeftWidth ?? undefined',

    '[style.--alf-border-style-hover]': 'this.resolvedBorder()?.hover?.borderStyle ?? undefined',
    '[style.--alf-border-top-style-hover]': 'this.resolvedBorder()?.hover?.borderTopStyle ?? undefined',
    '[style.--alf-border-right-style-hover]': 'this.resolvedBorder()?.hover?.borderRightStyle ?? undefined',
    '[style.--alf-border-bottom-style-hover]': 'this.resolvedBorder()?.hover?.borderBottomStyle ?? undefined',
    '[style.--alf-border-left-style-hover]': 'this.resolvedBorder()?.hover?.borderLeftStyle ?? undefined',

    '[style.--alf-border-color-hover]': 'this.resolvedBorder()?.hover?.borderColor ?? undefined',
    '[style.--alf-border-top-color-hover]': 'this.resolvedBorder()?.hover?.borderTopColor ?? undefined',
    '[style.--alf-border-right-color-hover]': 'this.resolvedBorder()?.hover?.borderRightColor ?? undefined',
    '[style.--alf-border-bottom-color-hover]': 'this.resolvedBorder()?.hover?.borderBottomColor ?? undefined',
    '[style.--alf-border-left-color-hover]': 'this.resolvedBorder()?.hover?.borderLeftColor ?? undefined',

    '[style.--alf-border-radius-hover]': 'this.resolvedBorder()?.hover?.borderRadius ?? undefined',
    '[style.--alf-border-top-left-radius-hover]': 'this.resolvedBorder()?.hover?.borderTopLeftRadius ?? undefined',
    '[style.--alf-border-top-right-radius-hover]': 'this.resolvedBorder()?.hover?.borderTopRightRadius ?? undefined',
    '[style.--alf-border-bottom-right-radius-hover]': 'this.resolvedBorder()?.hover?.borderBottomRightRadius ?? undefined',
    '[style.--alf-border-bottom-left-radius-hover]': 'this.resolvedBorder()?.hover?.borderBottomLeftRadius ?? undefined',

    '[style.--alf-outline-width-hover]': 'this.resolvedBorder()?.hover?.outlineWidth ?? undefined',
    '[style.--alf-outline-style-hover]': 'this.resolvedBorder()?.hover?.outlineStyle ?? undefined',
    '[style.--alf-outline-color-hover]': 'this.resolvedBorder()?.hover?.outlineColor ?? undefined',
    '[style.--alf-outline-offset-hover]': 'this.resolvedBorder()?.hover?.outlineOffset ?? undefined',
    '[style.--alf-box-sizing-hover]': 'this.resolvedBorder()?.hover?.boxSizing ?? undefined',

    // --- ACTIVE STATE ---
    '[style.--alf-border-width-active]': 'this.resolvedBorder()?.active?.borderWidth ?? undefined',
    '[style.--alf-border-top-width-active]': 'this.resolvedBorder()?.active?.borderTopWidth ?? undefined',
    '[style.--alf-border-right-width-active]': 'this.resolvedBorder()?.active?.borderRightWidth ?? undefined',
    '[style.--alf-border-bottom-width-active]': 'this.resolvedBorder()?.active?.borderBottomWidth ?? undefined',
    '[style.--alf-border-left-width-active]': 'this.resolvedBorder()?.active?.borderLeftWidth ?? undefined',

    '[style.--alf-border-style-active]': 'this.resolvedBorder()?.active?.borderStyle ?? undefined',
    '[style.--alf-border-top-style-active]': 'this.resolvedBorder()?.active?.borderTopStyle ?? undefined',
    '[style.--alf-border-right-style-active]': 'this.resolvedBorder()?.active?.borderRightStyle ?? undefined',
    '[style.--alf-border-bottom-style-active]': 'this.resolvedBorder()?.active?.borderBottomStyle ?? undefined',
    '[style.--alf-border-left-style-active]': 'this.resolvedBorder()?.active?.borderLeftStyle ?? undefined',

    '[style.--alf-border-color-active]': 'this.resolvedBorder()?.active?.borderColor ?? undefined',
    '[style.--alf-border-top-color-active]': 'this.resolvedBorder()?.active?.borderTopColor ?? undefined',
    '[style.--alf-border-right-color-active]': 'this.resolvedBorder()?.active?.borderRightColor ?? undefined',
    '[style.--alf-border-bottom-color-active]': 'this.resolvedBorder()?.active?.borderBottomColor ?? undefined',
    '[style.--alf-border-left-color-active]': 'this.resolvedBorder()?.active?.borderLeftColor ?? undefined',

    '[style.--alf-border-radius-active]': 'this.resolvedBorder()?.active?.borderRadius ?? undefined',
    '[style.--alf-border-top-left-radius-active]': 'this.resolvedBorder()?.active?.borderTopLeftRadius ?? undefined',
    '[style.--alf-border-top-right-radius-active]': 'this.resolvedBorder()?.active?.borderTopRightRadius ?? undefined',
    '[style.--alf-border-bottom-right-radius-active]': 'this.resolvedBorder()?.active?.borderBottomRightRadius ?? undefined',
    '[style.--alf-border-bottom-left-radius-active]': 'this.resolvedBorder()?.active?.borderBottomLeftRadius ?? undefined',

    '[style.--alf-outline-width-active]': 'this.resolvedBorder()?.active?.outlineWidth ?? undefined',
    '[style.--alf-outline-style-active]': 'this.resolvedBorder()?.active?.outlineStyle ?? undefined',
    '[style.--alf-outline-color-active]': 'this.resolvedBorder()?.active?.outlineColor ?? undefined',
    '[style.--alf-outline-offset-active]': 'this.resolvedBorder()?.active?.outlineOffset ?? undefined',
    '[style.--alf-box-sizing-active]': 'this.resolvedBorder()?.active?.boxSizing ?? undefined',

    // --- FOCUS STATE ---
    '[style.--alf-border-width-focus]': 'this.resolvedBorder()?.focus?.borderWidth ?? undefined',
    '[style.--alf-border-top-width-focus]': 'this.resolvedBorder()?.focus?.borderTopWidth ?? undefined',
    '[style.--alf-border-right-width-focus]': 'this.resolvedBorder()?.focus?.borderRightWidth ?? undefined',
    '[style.--alf-border-bottom-width-focus]': 'this.resolvedBorder()?.focus?.borderBottomWidth ?? undefined',
    '[style.--alf-border-left-width-focus]': 'this.resolvedBorder()?.focus?.borderLeftWidth ?? undefined',

    '[style.--alf-border-style-focus]': 'this.resolvedBorder()?.focus?.borderStyle ?? undefined',
    '[style.--alf-border-top-style-focus]': 'this.resolvedBorder()?.focus?.borderTopStyle ?? undefined',
    '[style.--alf-border-right-style-focus]': 'this.resolvedBorder()?.focus?.borderRightStyle ?? undefined',
    '[style.--alf-border-bottom-style-focus]': 'this.resolvedBorder()?.focus?.borderBottomStyle ?? undefined',
    '[style.--alf-border-left-style-focus]': 'this.resolvedBorder()?.focus?.borderLeftStyle ?? undefined',

    '[style.--alf-border-color-focus]': 'this.resolvedBorder()?.focus?.borderColor ?? undefined',
    '[style.--alf-border-top-color-focus]': 'this.resolvedBorder()?.focus?.borderTopColor ?? undefined',
    '[style.--alf-border-right-color-focus]': 'this.resolvedBorder()?.focus?.borderRightColor ?? undefined',
    '[style.--alf-border-bottom-color-focus]': 'this.resolvedBorder()?.focus?.borderBottomColor ?? undefined',
    '[style.--alf-border-left-color-focus]': 'this.resolvedBorder()?.focus?.borderLeftColor ?? undefined',

    '[style.--alf-border-radius-focus]': 'this.resolvedBorder()?.focus?.borderRadius ?? undefined',
    '[style.--alf-border-top-left-radius-focus]': 'this.resolvedBorder()?.focus?.borderTopLeftRadius ?? undefined',
    '[style.--alf-border-top-right-radius-focus]': 'this.resolvedBorder()?.focus?.borderTopRightRadius ?? undefined',
    '[style.--alf-border-bottom-right-radius-focus]': 'this.resolvedBorder()?.focus?.borderBottomRightRadius ?? undefined',
    '[style.--alf-border-bottom-left-radius-focus]': 'this.resolvedBorder()?.focus?.borderBottomLeftRadius ?? undefined',

    '[style.--alf-outline-width-focus]': 'this.resolvedBorder()?.focus?.outlineWidth ?? undefined',
    '[style.--alf-outline-style-focus]': 'this.resolvedBorder()?.focus?.outlineStyle ?? undefined',
    '[style.--alf-outline-color-focus]': 'this.resolvedBorder()?.focus?.outlineColor ?? undefined',
    '[style.--alf-outline-offset-focus]': 'this.resolvedBorder()?.focus?.outlineOffset ?? undefined',
    '[style.--alf-box-sizing-focus]': 'this.resolvedBorder()?.focus?.boxSizing ?? undefined',

    // --- DISABLED STATE ---
    '[style.--alf-border-width-disabled]': 'this.resolvedBorder()?.disabled?.borderWidth ?? undefined',
    '[style.--alf-border-top-width-disabled]': 'this.resolvedBorder()?.disabled?.borderTopWidth ?? undefined',
    '[style.--alf-border-right-width-disabled]': 'this.resolvedBorder()?.disabled?.borderRightWidth ?? undefined',
    '[style.--alf-border-bottom-width-disabled]': 'this.resolvedBorder()?.disabled?.borderBottomWidth ?? undefined',
    '[style.--alf-border-left-width-disabled]': 'this.resolvedBorder()?.disabled?.borderLeftWidth ?? undefined',

    '[style.--alf-border-style-disabled]': 'this.resolvedBorder()?.disabled?.borderStyle ?? undefined',
    '[style.--alf-border-top-style-disabled]': 'this.resolvedBorder()?.disabled?.borderTopStyle ?? undefined',
    '[style.--alf-border-right-style-disabled]': 'this.resolvedBorder()?.disabled?.borderRightStyle ?? undefined',
    '[style.--alf-border-bottom-style-disabled]': 'this.resolvedBorder()?.disabled?.borderBottomStyle ?? undefined',
    '[style.--alf-border-left-style-disabled]': 'this.resolvedBorder()?.disabled?.borderLeftStyle ?? undefined',

    '[style.--alf-border-color-disabled]': 'this.resolvedBorder()?.disabled?.borderColor ?? undefined',
    '[style.--alf-border-top-color-disabled]': 'this.resolvedBorder()?.disabled?.borderTopColor ?? undefined',
    '[style.--alf-border-right-color-disabled]': 'this.resolvedBorder()?.disabled?.borderRightColor ?? undefined',
    '[style.--alf-border-bottom-color-disabled]': 'this.resolvedBorder()?.disabled?.borderBottomColor ?? undefined',
    '[style.--alf-border-left-color-disabled]': 'this.resolvedBorder()?.disabled?.borderLeftColor ?? undefined',

    '[style.--alf-border-radius-disabled]': 'this.resolvedBorder()?.disabled?.borderRadius ?? undefined',
    '[style.--alf-border-top-left-radius-disabled]': 'this.resolvedBorder()?.disabled?.borderTopLeftRadius ?? undefined',
    '[style.--alf-border-top-right-radius-disabled]': 'this.resolvedBorder()?.disabled?.borderTopRightRadius ?? undefined',
    '[style.--alf-border-bottom-right-radius-disabled]': 'this.resolvedBorder()?.disabled?.borderBottomRightRadius ?? undefined',
    '[style.--alf-border-bottom-left-radius-disabled]': 'this.resolvedBorder()?.disabled?.borderBottomLeftRadius ?? undefined',

    '[style.--alf-outline-width-disabled]': 'this.resolvedBorder()?.disabled?.outlineWidth ?? undefined',
    '[style.--alf-outline-style-disabled]': 'this.resolvedBorder()?.disabled?.outlineStyle ?? undefined',
    '[style.--alf-outline-color-disabled]': 'this.resolvedBorder()?.disabled?.outlineColor ?? undefined',
    '[style.--alf-outline-offset-disabled]': 'this.resolvedBorder()?.disabled?.outlineOffset ?? undefined',
    '[style.--alf-box-sizing-disabled]': 'this.resolvedBorder()?.disabled?.boxSizing ?? undefined',
  }
})
export class AlfBorderDirective {
  public readonly alfBorder = input<AlfBorderInterface | AlfBorderBaseInterface | undefined>(undefined);

  public readonly resolvedBorder = computed<AlfBorderInterface | undefined>(() => {
    const border = this.alfBorder();
    if (!border) return undefined;

    if ('default' in border) {
      return border as AlfBorderInterface;
    }

    return {
      default: border as AlfBorderBaseInterface,
    };
  });
}

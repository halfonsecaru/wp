import { Directive, input, computed } from '@angular/core';
import { AlfMarginInterface, AlfMarginBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfMargin]',
  standalone: true,
  host: {
    // --- TRANSITION ---
    '[style.transition]': '"margin 0.25s ease-in-out, margin-top 0.25s ease-in-out, margin-right 0.25s ease-in-out, margin-bottom 0.25s ease-in-out, margin-left 0.25s ease-in-out"',

    // --- DEFAULT STATE ---
    '[style.--alf-margin]': 'this.resolvedMargin()?.default?.margin ?? undefined',
    '[style.--alf-margin-top]': 'this.resolvedMargin()?.default?.marginTop ?? undefined',
    '[style.--alf-margin-right]': 'this.resolvedMargin()?.default?.marginRight ?? undefined',
    '[style.--alf-margin-bottom]': 'this.resolvedMargin()?.default?.marginBottom ?? undefined',
    '[style.--alf-margin-left]': 'this.resolvedMargin()?.default?.marginLeft ?? undefined',

    // --- HOVER STATE ---
    '[style.--alf-margin-hover]': 'this.resolvedMargin()?.hover?.margin ?? undefined',
    '[style.--alf-margin-top-hover]': 'this.resolvedMargin()?.hover?.marginTop ?? undefined',
    '[style.--alf-margin-right-hover]': 'this.resolvedMargin()?.hover?.marginRight ?? undefined',
    '[style.--alf-margin-bottom-hover]': 'this.resolvedMargin()?.hover?.marginBottom ?? undefined',
    '[style.--alf-margin-left-hover]': 'this.resolvedMargin()?.hover?.marginLeft ?? undefined',

    // --- ACTIVE STATE ---
    '[style.--alf-margin-active]': 'this.resolvedMargin()?.active?.margin ?? undefined',
    '[style.--alf-margin-top-active]': 'this.resolvedMargin()?.active?.marginTop ?? undefined',
    '[style.--alf-margin-right-active]': 'this.resolvedMargin()?.active?.marginRight ?? undefined',
    '[style.--alf-margin-bottom-active]': 'this.resolvedMargin()?.active?.marginBottom ?? undefined',
    '[style.--alf-margin-left-active]': 'this.resolvedMargin()?.active?.marginLeft ?? undefined',

    // --- FOCUS STATE ---
    '[style.--alf-margin-focus]': 'this.resolvedMargin()?.focus?.margin ?? undefined',
    '[style.--alf-margin-top-focus]': 'this.resolvedMargin()?.focus?.marginTop ?? undefined',
    '[style.--alf-margin-right-focus]': 'this.resolvedMargin()?.focus?.marginRight ?? undefined',
    '[style.--alf-margin-bottom-focus]': 'this.resolvedMargin()?.focus?.marginBottom ?? undefined',
    '[style.--alf-margin-left-focus]': 'this.resolvedMargin()?.focus?.marginLeft ?? undefined',

    // --- DISABLED STATE ---
    '[style.--alf-margin-disabled]': 'this.resolvedMargin()?.disabled?.margin ?? undefined',
    '[style.--alf-margin-top-disabled]': 'this.resolvedMargin()?.disabled?.marginTop ?? undefined',
    '[style.--alf-margin-right-disabled]': 'this.resolvedMargin()?.disabled?.marginRight ?? undefined',
    '[style.--alf-margin-bottom-disabled]': 'this.resolvedMargin()?.disabled?.marginBottom ?? undefined',
    '[style.--alf-margin-left-disabled]': 'this.resolvedMargin()?.disabled?.marginLeft ?? undefined',
  }
})
export class AlfMarginDirective {
  public readonly alfMargin = input<AlfMarginInterface | AlfMarginBaseInterface | undefined>(undefined);

  public readonly resolvedMargin = computed<AlfMarginInterface | undefined>(() => {
    const margin = this.alfMargin();
    if (!margin) return undefined;

    if ('default' in margin) {
      return margin as AlfMarginInterface;
    }

    return {
      default: margin as AlfMarginBaseInterface,
    };
  });
}

import { Directive, input, computed } from '@angular/core';
import { AlfPaddingInterface, AlfPaddingBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfPadding]',
  standalone: true,
  host: {
    // --- TRANSITION ---
    '[style.transition]': '"padding 0.25s ease-in-out, padding-top 0.25s ease-in-out, padding-right 0.25s ease-in-out, padding-bottom 0.25s ease-in-out, padding-left 0.25s ease-in-out"',

    // --- DEFAULT STATE ---
    '[style.--alf-padding]': 'this.resolvedPadding()?.default?.padding ?? undefined',
    '[style.--alf-padding-top]': 'this.resolvedPadding()?.default?.paddingTop ?? undefined',
    '[style.--alf-padding-right]': 'this.resolvedPadding()?.default?.paddingRight ?? undefined',
    '[style.--alf-padding-bottom]': 'this.resolvedPadding()?.default?.paddingBottom ?? undefined',
    '[style.--alf-padding-left]': 'this.resolvedPadding()?.default?.paddingLeft ?? undefined',

    // --- HOVER STATE ---
    '[style.--alf-padding-hover]': 'this.resolvedPadding()?.hover?.padding ?? undefined',
    '[style.--alf-padding-top-hover]': 'this.resolvedPadding()?.hover?.paddingTop ?? undefined',
    '[style.--alf-padding-right-hover]': 'this.resolvedPadding()?.hover?.paddingRight ?? undefined',
    '[style.--alf-padding-bottom-hover]': 'this.resolvedPadding()?.hover?.paddingBottom ?? undefined',
    '[style.--alf-padding-left-hover]': 'this.resolvedPadding()?.hover?.paddingLeft ?? undefined',

    // --- ACTIVE STATE ---
    '[style.--alf-padding-active]': 'this.resolvedPadding()?.active?.padding ?? undefined',
    '[style.--alf-padding-top-active]': 'this.resolvedPadding()?.active?.paddingTop ?? undefined',
    '[style.--alf-padding-right-active]': 'this.resolvedPadding()?.active?.paddingRight ?? undefined',
    '[style.--alf-padding-bottom-active]': 'this.resolvedPadding()?.active?.paddingBottom ?? undefined',
    '[style.--alf-padding-left-active]': 'this.resolvedPadding()?.active?.paddingLeft ?? undefined',

    // --- FOCUS STATE ---
    '[style.--alf-padding-focus]': 'this.resolvedPadding()?.focus?.padding ?? undefined',
    '[style.--alf-padding-top-focus]': 'this.resolvedPadding()?.focus?.paddingTop ?? undefined',
    '[style.--alf-padding-right-focus]': 'this.resolvedPadding()?.focus?.paddingRight ?? undefined',
    '[style.--alf-padding-bottom-focus]': 'this.resolvedPadding()?.focus?.paddingBottom ?? undefined',
    '[style.--alf-padding-left-focus]': 'this.resolvedPadding()?.focus?.paddingLeft ?? undefined',

    // --- DISABLED STATE ---
    '[style.--alf-padding-disabled]': 'this.resolvedPadding()?.disabled?.padding ?? undefined',
    '[style.--alf-padding-top-disabled]': 'this.resolvedPadding()?.disabled?.paddingTop ?? undefined',
    '[style.--alf-padding-right-disabled]': 'this.resolvedPadding()?.disabled?.paddingRight ?? undefined',
    '[style.--alf-padding-bottom-disabled]': 'this.resolvedPadding()?.disabled?.paddingBottom ?? undefined',
    '[style.--alf-padding-left-disabled]': 'this.resolvedPadding()?.disabled?.paddingLeft ?? undefined',
  }
})
export class AlfPaddingDirective {
  public readonly alfPadding = input<AlfPaddingInterface | AlfPaddingBaseInterface | undefined>(undefined);

  public readonly resolvedPadding = computed<AlfPaddingInterface | undefined>(() => {
    const padding = this.alfPadding();
    if (!padding) return undefined;

    if ('default' in padding) {
      return padding as AlfPaddingInterface;
    }

    return {
      default: padding as AlfPaddingBaseInterface,
    };
  });
}

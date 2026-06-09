import { Directive, input, computed } from '@angular/core';
import { AlfShadowsInterface, AlfShadowsBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfShadows]',
  standalone: true,
  host: {
    // --- TRANSITION ---
    '[style.transition]': '"box-shadow 0.25s ease-in-out, text-shadow 0.25s ease-in-out"',

    // --- DEFAULT STATE ---
    '[style.--alf-box-shadow]': 'this.resolvedShadows()?.default?.boxShadow ?? undefined',
    '[style.--alf-box-shadow-color]': 'this.resolvedShadows()?.default?.boxShadowColor ?? undefined',
    '[style.--alf-box-shadow-inset]': 'this.resolvedShadows()?.default?.boxShadowInset !== undefined ? (this.resolvedShadows()?.default?.boxShadowInset ? "inset" : "") : undefined',
    '[style.--alf-text-shadow]': 'this.resolvedShadows()?.default?.textShadow ?? undefined',
    '[style.--alf-text-shadow-color]': 'this.resolvedShadows()?.default?.textShadowColor ?? undefined',

    // --- HOVER STATE ---
    '[style.--alf-box-shadow-hover]': 'this.resolvedShadows()?.hover?.boxShadow ?? undefined',
    '[style.--alf-box-shadow-color-hover]': 'this.resolvedShadows()?.hover?.boxShadowColor ?? undefined',
    '[style.--alf-box-shadow-inset-hover]': 'this.resolvedShadows()?.hover?.boxShadowInset !== undefined ? (this.resolvedShadows()?.hover?.boxShadowInset ? "inset" : "") : undefined',
    '[style.--alf-text-shadow-hover]': 'this.resolvedShadows()?.hover?.textShadow ?? undefined',
    '[style.--alf-text-shadow-color-hover]': 'this.resolvedShadows()?.hover?.textShadowColor ?? undefined',

    // --- ACTIVE STATE ---
    '[style.--alf-box-shadow-active]': 'this.resolvedShadows()?.active?.boxShadow ?? undefined',
    '[style.--alf-box-shadow-color-active]': 'this.resolvedShadows()?.active?.boxShadowColor ?? undefined',
    '[style.--alf-box-shadow-inset-active]': 'this.resolvedShadows()?.active?.boxShadowInset !== undefined ? (this.resolvedShadows()?.active?.boxShadowInset ? "inset" : "") : undefined',
    '[style.--alf-text-shadow-active]': 'this.resolvedShadows()?.active?.textShadow ?? undefined',
    '[style.--alf-text-shadow-color-active]': 'this.resolvedShadows()?.active?.textShadowColor ?? undefined',

    // --- FOCUS STATE ---
    '[style.--alf-box-shadow-focus]': 'this.resolvedShadows()?.focus?.boxShadow ?? undefined',
    '[style.--alf-box-shadow-color-focus]': 'this.resolvedShadows()?.focus?.boxShadowColor ?? undefined',
    '[style.--alf-box-shadow-inset-focus]': 'this.resolvedShadows()?.focus?.boxShadowInset !== undefined ? (this.resolvedShadows()?.focus?.boxShadowInset ? "inset" : "") : undefined',
    '[style.--alf-text-shadow-focus]': 'this.resolvedShadows()?.focus?.textShadow ?? undefined',
    '[style.--alf-text-shadow-color-focus]': 'this.resolvedShadows()?.focus?.textShadowColor ?? undefined',

    // --- DISABLED STATE ---
    '[style.--alf-box-shadow-disabled]': 'this.resolvedShadows()?.disabled?.boxShadow ?? undefined',
    '[style.--alf-box-shadow-color-disabled]': 'this.resolvedShadows()?.disabled?.boxShadowColor ?? undefined',
    '[style.--alf-box-shadow-inset-disabled]': 'this.resolvedShadows()?.disabled?.boxShadowInset !== undefined ? (this.resolvedShadows()?.disabled?.boxShadowInset ? "inset" : "") : undefined',
    '[style.--alf-text-shadow-disabled]': 'this.resolvedShadows()?.disabled?.textShadow ?? undefined',
    '[style.--alf-text-shadow-color-disabled]': 'this.resolvedShadows()?.disabled?.textShadowColor ?? undefined',
  }
})
export class AlfShadowsDirective {
  public readonly alfShadows = input<AlfShadowsInterface | AlfShadowsBaseInterface | undefined>(undefined);

  public readonly resolvedShadows = computed<AlfShadowsInterface | undefined>(() => {
    const shadows = this.alfShadows();
    if (!shadows) return undefined;

    if ('default' in shadows) {
      return shadows as AlfShadowsInterface;
    }

    return {
      default: shadows as AlfShadowsBaseInterface,
    };
  });
}

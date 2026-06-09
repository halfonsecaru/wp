import { Directive, input, computed } from '@angular/core';
import { AlfOutlineInterface, AlfOutlineBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfOutline]',
  standalone: true,
  host: {
    // --- TRANSITION ---
    '[style.transition]': '"outline-color 0.25s ease-in-out, outline-width 0.25s ease-in-out, outline-offset 0.25s ease-in-out"',

    // --- DEFAULT STATE ---
    '[style.--alf-outline-width]': 'this.resolvedOutline()?.default?.outlineWidth ?? undefined',
    '[style.--alf-outline-style]': 'this.resolvedOutline()?.default?.outlineStyle ?? undefined',
    '[style.--alf-outline-color]': 'this.resolvedOutline()?.default?.outlineColor ?? undefined',
    '[style.--alf-outline-offset]': 'this.resolvedOutline()?.default?.outlineOffset ?? undefined',

    // --- HOVER STATE ---
    '[style.--alf-outline-width-hover]': 'this.resolvedOutline()?.hover?.outlineWidth ?? undefined',
    '[style.--alf-outline-style-hover]': 'this.resolvedOutline()?.hover?.outlineStyle ?? undefined',
    '[style.--alf-outline-color-hover]': 'this.resolvedOutline()?.hover?.outlineColor ?? undefined',
    '[style.--alf-outline-offset-hover]': 'this.resolvedOutline()?.hover?.outlineOffset ?? undefined',

    // --- ACTIVE STATE ---
    '[style.--alf-outline-width-active]': 'this.resolvedOutline()?.active?.outlineWidth ?? undefined',
    '[style.--alf-outline-style-active]': 'this.resolvedOutline()?.active?.outlineStyle ?? undefined',
    '[style.--alf-outline-color-active]': 'this.resolvedOutline()?.active?.outlineColor ?? undefined',
    '[style.--alf-outline-offset-active]': 'this.resolvedOutline()?.active?.outlineOffset ?? undefined',

    // --- FOCUS STATE ---
    '[style.--alf-outline-width-focus]': 'this.resolvedOutline()?.focus?.outlineWidth ?? undefined',
    '[style.--alf-outline-style-focus]': 'this.resolvedOutline()?.focus?.outlineStyle ?? undefined',
    '[style.--alf-outline-color-focus]': 'this.resolvedOutline()?.focus?.outlineColor ?? undefined',
    '[style.--alf-outline-offset-focus]': 'this.resolvedOutline()?.focus?.outlineOffset ?? undefined',

    // --- DISABLED STATE ---
    '[style.--alf-outline-width-disabled]': 'this.resolvedOutline()?.disabled?.outlineWidth ?? undefined',
    '[style.--alf-outline-style-disabled]': 'this.resolvedOutline()?.disabled?.outlineStyle ?? undefined',
    '[style.--alf-outline-color-disabled]': 'this.resolvedOutline()?.disabled?.outlineColor ?? undefined',
    '[style.--alf-outline-offset-disabled]': 'this.resolvedOutline()?.disabled?.outlineOffset ?? undefined',
  }
})
export class AlfOutlineDirective {
  public readonly alfOutline = input<AlfOutlineInterface | AlfOutlineBaseInterface | undefined>(undefined);

  public readonly resolvedOutline = computed<AlfOutlineInterface | undefined>(() => {
    const outline = this.alfOutline();
    if (!outline) return undefined;

    if ('default' in outline) {
      return outline as AlfOutlineInterface;
    }

    return {
      default: outline as AlfOutlineBaseInterface,
    };
  });
}

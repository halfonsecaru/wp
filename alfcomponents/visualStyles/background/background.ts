import { Directive, input, computed } from '@angular/core';
import { AlfBackgroundsInterface, AlfBackgroundsBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfBackground]',
  standalone: true,
  host: {
    // --- TRANSITION & BASE / DEFAULT ---
    '[style.transition]': '"background-color 0.25s ease-in-out, background-image 0.25s ease-in-out, background-position 0.25s ease-in-out"',
    '[style.--alf-bg-color]': 'this.resolvedBackground()?.default?.backgroundColor ?? undefined',
    '[style.--alf-bg-image]': 'this.resolvedBackground()?.default?.backgroundImage ?? undefined',
    '[style.--alf-bg-size]': 'this.resolvedBackground()?.default?.backgroundSize ?? undefined',
    '[style.--alf-bg-pos]': 'this.resolvedBackground()?.default?.backgroundPosition ?? undefined',
    '[style.--alf-bg-repeat]': 'this.resolvedBackground()?.default?.backgroundRepeat ?? undefined',
    '[style.--alf-bg-attachment]': 'this.resolvedBackground()?.default?.backgroundAttachment ?? undefined',
    '[style.--alf-bg-clip]': 'this.resolvedBackground()?.default?.backgroundClip ?? undefined',

    // --- HOVER ---
    '[style.--alf-bg-color-hover]': 'this.resolvedBackground()?.hover?.backgroundColor ?? undefined',
    '[style.--alf-bg-image-hover]': 'this.resolvedBackground()?.hover?.backgroundImage ?? undefined',
    '[style.--alf-bg-size-hover]': 'this.resolvedBackground()?.hover?.backgroundSize ?? undefined',
    '[style.--alf-bg-pos-hover]': 'this.resolvedBackground()?.hover?.backgroundPosition ?? undefined',
    '[style.--alf-bg-repeat-hover]': 'this.resolvedBackground()?.hover?.backgroundRepeat ?? undefined',
    '[style.--alf-bg-attachment-hover]': 'this.resolvedBackground()?.hover?.backgroundAttachment ?? undefined',
    '[style.--alf-bg-clip-hover]': 'this.resolvedBackground()?.hover?.backgroundClip ?? undefined',

    // --- ACTIVE ---
    '[style.--alf-bg-color-active]': 'this.resolvedBackground()?.active?.backgroundColor ?? undefined',
    '[style.--alf-bg-image-active]': 'this.resolvedBackground()?.active?.backgroundImage ?? undefined',
    '[style.--alf-bg-size-active]': 'this.resolvedBackground()?.active?.backgroundSize ?? undefined',
    '[style.--alf-bg-pos-active]': 'this.resolvedBackground()?.active?.backgroundPosition ?? undefined',
    '[style.--alf-bg-repeat-active]': 'this.resolvedBackground()?.active?.backgroundRepeat ?? undefined',
    '[style.--alf-bg-attachment-active]': 'this.resolvedBackground()?.active?.backgroundAttachment ?? undefined',
    '[style.--alf-bg-clip-active]': 'this.resolvedBackground()?.active?.backgroundClip ?? undefined',

    // --- FOCUS ---
    '[style.--alf-bg-color-focus]': 'this.resolvedBackground()?.focus?.backgroundColor ?? undefined',
    '[style.--alf-bg-image-focus]': 'this.resolvedBackground()?.focus?.backgroundImage ?? undefined',
    '[style.--alf-bg-size-focus]': 'this.resolvedBackground()?.focus?.backgroundSize ?? undefined',
    '[style.--alf-bg-pos-focus]': 'this.resolvedBackground()?.focus?.backgroundPosition ?? undefined',
    '[style.--alf-bg-repeat-focus]': 'this.resolvedBackground()?.focus?.backgroundRepeat ?? undefined',
    '[style.--alf-bg-attachment-focus]': 'this.resolvedBackground()?.focus?.backgroundAttachment ?? undefined',
    '[style.--alf-bg-clip-focus]': 'this.resolvedBackground()?.focus?.backgroundClip ?? undefined',

    // --- DISABLED ---
    '[style.--alf-bg-color-disabled]': 'this.resolvedBackground()?.disabled?.backgroundColor ?? undefined',
    '[style.--alf-bg-image-disabled]': 'this.resolvedBackground()?.disabled?.backgroundImage ?? undefined',
    '[style.--alf-bg-size-disabled]': 'this.resolvedBackground()?.disabled?.backgroundSize ?? undefined',
    '[style.--alf-bg-pos-disabled]': 'this.resolvedBackground()?.disabled?.backgroundPosition ?? undefined',
    '[style.--alf-bg-repeat-disabled]': 'this.resolvedBackground()?.disabled?.backgroundRepeat ?? undefined',
    '[style.--alf-bg-attachment-disabled]': 'this.resolvedBackground()?.disabled?.backgroundAttachment ?? undefined',
    '[style.--alf-bg-clip-disabled]': 'this.resolvedBackground()?.disabled?.backgroundClip ?? undefined',
  }
})
export class AlfBackgroundDirective {
  public readonly alfBackground = input<AlfBackgroundsInterface | AlfBackgroundsBaseInterface | undefined>(undefined);

  public readonly resolvedBackground = computed<AlfBackgroundsInterface | undefined>(() => {
    const bg = this.alfBackground();
    if (!bg) return undefined;

    if ('default' in bg) {
      return bg as AlfBackgroundsInterface;
    }

    return {
      default: bg as AlfBackgroundsBaseInterface,
    };
  });
}

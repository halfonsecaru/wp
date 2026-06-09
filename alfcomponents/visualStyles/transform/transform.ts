import { Directive, input, computed } from '@angular/core';
import { AlfTransformInterface, AlfTransformBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfTransform]',
  standalone: true,
  host: {
    // --- TRANSITION ---
    '[style.transition]': '"transform 0.25s ease-in-out, perspective 0.25s ease-in-out, opacity 0.25s ease-in-out"',

    // --- DEFAULT STATE ---
    '[style.--alf-tr-translate-x]':          'this.resolvedTransform()?.default?.translateX        ?? undefined',
    '[style.--alf-tr-translate-y]':          'this.resolvedTransform()?.default?.translateY        ?? undefined',
    '[style.--alf-tr-translate-z]':          'this.resolvedTransform()?.default?.translateZ        ?? undefined',
    '[style.--alf-tr-scale]':                'this.resolvedTransform()?.default?.scale             != null ? this.resolvedTransform()!.default!.scale     : undefined',
    '[style.--alf-tr-scale-x]':              'this.resolvedTransform()?.default?.scaleX            != null ? this.resolvedTransform()!.default!.scaleX    : undefined',
    '[style.--alf-tr-scale-y]':              'this.resolvedTransform()?.default?.scaleY            != null ? this.resolvedTransform()!.default!.scaleY    : undefined',
    '[style.--alf-tr-scale-z]':              'this.resolvedTransform()?.default?.scaleZ            != null ? this.resolvedTransform()!.default!.scaleZ    : undefined',
    '[style.--alf-tr-rotate]':               'this.resolvedTransform()?.default?.rotate            != null ? this.resolvedTransform()!.default!.rotate    + "deg" : undefined',
    '[style.--alf-tr-rotate-x]':             'this.resolvedTransform()?.default?.rotateX           != null ? this.resolvedTransform()!.default!.rotateX   + "deg" : undefined',
    '[style.--alf-tr-rotate-y]':             'this.resolvedTransform()?.default?.rotateY           != null ? this.resolvedTransform()!.default!.rotateY   + "deg" : undefined',
    '[style.--alf-tr-rotate-z]':             'this.resolvedTransform()?.default?.rotateZ           != null ? this.resolvedTransform()!.default!.rotateZ   + "deg" : undefined',
    '[style.--alf-tr-skew-x]':               'this.resolvedTransform()?.default?.skewX             != null ? this.resolvedTransform()!.default!.skewX     + "deg" : undefined',
    '[style.--alf-tr-skew-y]':               'this.resolvedTransform()?.default?.skewY             != null ? this.resolvedTransform()!.default!.skewY     + "deg" : undefined',
    '[style.--alf-tr-perspective]':          'this.resolvedTransform()?.default?.perspective       ?? undefined',
    '[style.--alf-tr-transform-style]':      'this.resolvedTransform()?.default?.transformStyle    ?? undefined',
    '[style.--alf-tr-backface-visibility]':  'this.resolvedTransform()?.default?.backfaceVisibility ?? undefined',

    // --- HOVER STATE ---
    '[style.--alf-tr-translate-x-hover]':         'this.resolvedTransform()?.hover?.translateX        ?? undefined',
    '[style.--alf-tr-translate-y-hover]':         'this.resolvedTransform()?.hover?.translateY        ?? undefined',
    '[style.--alf-tr-translate-z-hover]':         'this.resolvedTransform()?.hover?.translateZ        ?? undefined',
    '[style.--alf-tr-scale-hover]':               'this.resolvedTransform()?.hover?.scale             != null ? this.resolvedTransform()!.hover!.scale     : undefined',
    '[style.--alf-tr-scale-x-hover]':             'this.resolvedTransform()?.hover?.scaleX            != null ? this.resolvedTransform()!.hover!.scaleX    : undefined',
    '[style.--alf-tr-scale-y-hover]':             'this.resolvedTransform()?.hover?.scaleY            != null ? this.resolvedTransform()!.hover!.scaleY    : undefined',
    '[style.--alf-tr-scale-z-hover]':             'this.resolvedTransform()?.hover?.scaleZ            != null ? this.resolvedTransform()!.hover!.scaleZ    : undefined',
    '[style.--alf-tr-rotate-hover]':              'this.resolvedTransform()?.hover?.rotate            != null ? this.resolvedTransform()!.hover!.rotate    + "deg" : undefined',
    '[style.--alf-tr-rotate-x-hover]':            'this.resolvedTransform()?.hover?.rotateX           != null ? this.resolvedTransform()!.hover!.rotateX   + "deg" : undefined',
    '[style.--alf-tr-rotate-y-hover]':            'this.resolvedTransform()?.hover?.rotateY           != null ? this.resolvedTransform()!.hover!.rotateY   + "deg" : undefined',
    '[style.--alf-tr-rotate-z-hover]':            'this.resolvedTransform()?.hover?.rotateZ           != null ? this.resolvedTransform()!.hover!.rotateZ   + "deg" : undefined',
    '[style.--alf-tr-skew-x-hover]':              'this.resolvedTransform()?.hover?.skewX             != null ? this.resolvedTransform()!.hover!.skewX     + "deg" : undefined',
    '[style.--alf-tr-skew-y-hover]':              'this.resolvedTransform()?.hover?.skewY             != null ? this.resolvedTransform()!.hover!.skewY     + "deg" : undefined',
    '[style.--alf-tr-perspective-hover]':         'this.resolvedTransform()?.hover?.perspective       ?? undefined',
    '[style.--alf-tr-transform-style-hover]':     'this.resolvedTransform()?.hover?.transformStyle    ?? undefined',
    '[style.--alf-tr-backface-visibility-hover]': 'this.resolvedTransform()?.hover?.backfaceVisibility ?? undefined',

    // --- ACTIVE STATE ---
    '[style.--alf-tr-translate-x-active]':         'this.resolvedTransform()?.active?.translateX        ?? undefined',
    '[style.--alf-tr-translate-y-active]':         'this.resolvedTransform()?.active?.translateY        ?? undefined',
    '[style.--alf-tr-translate-z-active]':         'this.resolvedTransform()?.active?.translateZ        ?? undefined',
    '[style.--alf-tr-scale-active]':               'this.resolvedTransform()?.active?.scale             != null ? this.resolvedTransform()!.active!.scale     : undefined',
    '[style.--alf-tr-scale-x-active]':             'this.resolvedTransform()?.active?.scaleX            != null ? this.resolvedTransform()!.active!.scaleX    : undefined',
    '[style.--alf-tr-scale-y-active]':             'this.resolvedTransform()?.active?.scaleY            != null ? this.resolvedTransform()!.active!.scaleY    : undefined',
    '[style.--alf-tr-scale-z-active]':             'this.resolvedTransform()?.active?.scaleZ            != null ? this.resolvedTransform()!.active!.scaleZ    : undefined',
    '[style.--alf-tr-rotate-active]':              'this.resolvedTransform()?.active?.rotate            != null ? this.resolvedTransform()!.active!.rotate    + "deg" : undefined',
    '[style.--alf-tr-rotate-x-active]':            'this.resolvedTransform()?.active?.rotateX           != null ? this.resolvedTransform()!.active!.rotateX   + "deg" : undefined',
    '[style.--alf-tr-rotate-y-active]':            'this.resolvedTransform()?.active?.rotateY           != null ? this.resolvedTransform()!.active!.rotateY   + "deg" : undefined',
    '[style.--alf-tr-rotate-z-active]':            'this.resolvedTransform()?.active?.rotateZ           != null ? this.resolvedTransform()!.active!.rotateZ   + "deg" : undefined',
    '[style.--alf-tr-skew-x-active]':              'this.resolvedTransform()?.active?.skewX             != null ? this.resolvedTransform()!.active!.skewX     + "deg" : undefined',
    '[style.--alf-tr-skew-y-active]':              'this.resolvedTransform()?.active?.skewY             != null ? this.resolvedTransform()!.active!.skewY     + "deg" : undefined',
    '[style.--alf-tr-perspective-active]':         'this.resolvedTransform()?.active?.perspective       ?? undefined',
    '[style.--alf-tr-transform-style-active]':     'this.resolvedTransform()?.active?.transformStyle    ?? undefined',
    '[style.--alf-tr-backface-visibility-active]': 'this.resolvedTransform()?.active?.backfaceVisibility ?? undefined',

    // --- FOCUS STATE ---
    '[style.--alf-tr-translate-x-focus]':         'this.resolvedTransform()?.focus?.translateX        ?? undefined',
    '[style.--alf-tr-translate-y-focus]':         'this.resolvedTransform()?.focus?.translateY        ?? undefined',
    '[style.--alf-tr-translate-z-focus]':         'this.resolvedTransform()?.focus?.translateZ        ?? undefined',
    '[style.--alf-tr-scale-focus]':               'this.resolvedTransform()?.focus?.scale             != null ? this.resolvedTransform()!.focus!.scale     : undefined',
    '[style.--alf-tr-scale-x-focus]':             'this.resolvedTransform()?.focus?.scaleX            != null ? this.resolvedTransform()!.focus!.scaleX    : undefined',
    '[style.--alf-tr-scale-y-focus]':             'this.resolvedTransform()?.focus?.scaleY            != null ? this.resolvedTransform()!.focus!.scaleY    : undefined',
    '[style.--alf-tr-scale-z-focus]':             'this.resolvedTransform()?.focus?.scaleZ            != null ? this.resolvedTransform()!.focus!.scaleZ    : undefined',
    '[style.--alf-tr-rotate-focus]':              'this.resolvedTransform()?.focus?.rotate            != null ? this.resolvedTransform()!.focus!.rotate    + "deg" : undefined',
    '[style.--alf-tr-rotate-x-focus]':            'this.resolvedTransform()?.focus?.rotateX           != null ? this.resolvedTransform()!.focus!.rotateX   + "deg" : undefined',
    '[style.--alf-tr-rotate-y-focus]':            'this.resolvedTransform()?.focus?.rotateY           != null ? this.resolvedTransform()!.focus!.rotateY   + "deg" : undefined',
    '[style.--alf-tr-rotate-z-focus]':            'this.resolvedTransform()?.focus?.rotateZ           != null ? this.resolvedTransform()!.focus!.rotateZ   + "deg" : undefined',
    '[style.--alf-tr-skew-x-focus]':              'this.resolvedTransform()?.focus?.skewX             != null ? this.resolvedTransform()!.focus!.skewX     + "deg" : undefined',
    '[style.--alf-tr-skew-y-focus]':              'this.resolvedTransform()?.focus?.skewY             != null ? this.resolvedTransform()!.focus!.skewY     + "deg" : undefined',
    '[style.--alf-tr-perspective-focus]':         'this.resolvedTransform()?.focus?.perspective       ?? undefined',
    '[style.--alf-tr-transform-style-focus]':     'this.resolvedTransform()?.focus?.transformStyle    ?? undefined',
    '[style.--alf-tr-backface-visibility-focus]': 'this.resolvedTransform()?.focus?.backfaceVisibility ?? undefined',

    // --- DISABLED STATE ---
    '[style.--alf-tr-translate-x-disabled]':         'this.resolvedTransform()?.disabled?.translateX        ?? undefined',
    '[style.--alf-tr-translate-y-disabled]':         'this.resolvedTransform()?.disabled?.translateY        ?? undefined',
    '[style.--alf-tr-translate-z-disabled]':         'this.resolvedTransform()?.disabled?.translateZ        ?? undefined',
    '[style.--alf-tr-scale-disabled]':               'this.resolvedTransform()?.disabled?.scale             != null ? this.resolvedTransform()!.disabled!.scale     : undefined',
    '[style.--alf-tr-scale-x-disabled]':             'this.resolvedTransform()?.disabled?.scaleX            != null ? this.resolvedTransform()!.disabled!.scaleX    : undefined',
    '[style.--alf-tr-scale-y-disabled]':             'this.resolvedTransform()?.disabled?.scaleY            != null ? this.resolvedTransform()!.disabled!.scaleY    : undefined',
    '[style.--alf-tr-scale-z-disabled]':             'this.resolvedTransform()?.disabled?.scaleZ            != null ? this.resolvedTransform()!.disabled!.scaleZ    : undefined',
    '[style.--alf-tr-rotate-disabled]':              'this.resolvedTransform()?.disabled?.rotate            != null ? this.resolvedTransform()!.disabled!.rotate    + "deg" : undefined',
    '[style.--alf-tr-rotate-x-disabled]':            'this.resolvedTransform()?.disabled?.rotateX           != null ? this.resolvedTransform()!.disabled!.rotateX   + "deg" : undefined',
    '[style.--alf-tr-rotate-y-disabled]':            'this.resolvedTransform()?.disabled?.rotateY           != null ? this.resolvedTransform()!.disabled!.rotateY   + "deg" : undefined',
    '[style.--alf-tr-rotate-z-disabled]':            'this.resolvedTransform()?.disabled?.rotateZ           != null ? this.resolvedTransform()!.disabled!.rotateZ   + "deg" : undefined',
    '[style.--alf-tr-skew-x-disabled]':              'this.resolvedTransform()?.disabled?.skewX             != null ? this.resolvedTransform()!.disabled!.skewX     + "deg" : undefined',
    '[style.--alf-tr-skew-y-disabled]':              'this.resolvedTransform()?.disabled?.skewY             != null ? this.resolvedTransform()!.disabled!.skewY     + "deg" : undefined',
    '[style.--alf-tr-perspective-disabled]':         'this.resolvedTransform()?.disabled?.perspective       ?? undefined',
    '[style.--alf-tr-transform-style-disabled]':     'this.resolvedTransform()?.disabled?.transformStyle    ?? undefined',
    '[style.--alf-tr-backface-visibility-disabled]': 'this.resolvedTransform()?.disabled?.backfaceVisibility ?? undefined',
  }
})
export class AlfTransformDirective {
  public readonly alfTransform = input<AlfTransformInterface | AlfTransformBaseInterface | undefined>(undefined);

  public readonly resolvedTransform = computed<AlfTransformInterface | undefined>(() => {
    const transform = this.alfTransform();
    if (!transform) return undefined;

    if ('default' in transform) {
      return transform as AlfTransformInterface;
    }

    return {
      default: transform as AlfTransformBaseInterface,
    };
  });
}

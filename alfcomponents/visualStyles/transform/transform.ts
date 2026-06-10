import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfTransformInterface, AlfTransformBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfTransform]',
  standalone: true,
})
export class AlfTransformDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfTransform = input<AlfTransformInterface | AlfTransformBaseInterface | undefined>(undefined);
  public readonly alfPrefix    = input<string>('--alf');

  public readonly resolvedTransform = computed<AlfTransformInterface | undefined>(() => {
    const transform = this.alfTransform();
    if (!transform) return undefined;
    if ('default' in transform) return transform as AlfTransformInterface;
    return { default: transform as AlfTransformBaseInterface };
  });

  private readonly _effect = effect(() => {
    const tr = this.resolvedTransform();
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    for (const sfx of ['', '-hover', '-active', '-focus', '-disabled']) {
      for (const prop of ['transform', 'perspective', 'transform-style', 'backface-visibility']) {
        el.style.removeProperty(`${p}-transform${sfx}-${prop}`);
      }
    }

    if (!tr) return;

    const set = (prop: string, val: any) => {
      if (val != null) el.style.setProperty(prop, String(val));
    };

    const applyState = (state: any, sfx: string) => {
      if (!state) return;
      const parts: string[] = [];
      if (state.translateX != null) parts.push(`translateX(${state.translateX})`);
      if (state.translateY != null) parts.push(`translateY(${state.translateY})`);
      if (state.translateZ != null) parts.push(`translateZ(${state.translateZ})`);
      if (state.scale      != null) parts.push(`scale(${state.scale})`);
      if (state.scaleX     != null) parts.push(`scaleX(${state.scaleX})`);
      if (state.scaleY     != null) parts.push(`scaleY(${state.scaleY})`);
      if (state.scaleZ     != null) parts.push(`scaleZ(${state.scaleZ})`);
      if (state.rotate     != null) parts.push(`rotate(${state.rotate}deg)`);
      if (state.rotateX    != null) parts.push(`rotateX(${state.rotateX}deg)`);
      if (state.rotateY    != null) parts.push(`rotateY(${state.rotateY}deg)`);
      if (state.rotateZ    != null) parts.push(`rotateZ(${state.rotateZ}deg)`);
      if (state.skewX      != null) parts.push(`skewX(${state.skewX}deg)`);
      if (state.skewY      != null) parts.push(`skewY(${state.skewY}deg)`);
      if (parts.length) set(`${p}-transform${sfx}-transform`, parts.join(' '));
      set(`${p}-transform${sfx}-perspective`,         state.perspective);
      set(`${p}-transform${sfx}-transform-style`,     state.transformStyle);
      set(`${p}-transform${sfx}-backface-visibility`, state.backfaceVisibility);
    };

    applyState(tr.default,  '');
    applyState(tr.hover,    '-hover');
    applyState(tr.active,   '-active');
    applyState(tr.focus,    '-focus');
    applyState(tr.disabled, '-disabled');
  });
}

import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfTransitionInterface, AlfTransitionBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfTransition]',
  standalone: true,
})
export class AlfTransitionDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfTransition = input<AlfTransitionInterface | AlfTransitionBaseInterface | undefined>(undefined);
  public readonly alfPrefix    = input<string>('--alf');

  public readonly resolvedTransition = computed<AlfTransitionInterface | undefined>(() => {
    const transition = this.alfTransition();
    if (!transition) return undefined;
    if ('default' in transition) return transition as AlfTransitionInterface;
    return { default: transition as AlfTransitionBaseInterface };
  });

  private readonly _effect = effect(() => {
    const tr = this.resolvedTransition();
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    for (const sfx of ['', '-hover', '-active', '-focus', '-disabled']) {
      for (const prop of ['duration', 'timing-function', 'delay', 'property']) {
        el.style.removeProperty(`${p}-transition${sfx}-${prop}`);
      }
    }

    if (!tr) return;

    const set = (prop: string, val: any) => {
      if (val != null) el.style.setProperty(prop, String(val));
    };

    const applyState = (state: AlfTransitionBaseInterface | undefined, sfx: string) => {
      if (!state) return;
      set(`${p}-transition${sfx}-duration`, state.duration);
      set(`${p}-transition${sfx}-timing-function`, state.timingFunction);
      set(`${p}-transition${sfx}-delay`, state.delay);
      set(`${p}-transition${sfx}-property`, state.property);
    };

    applyState(tr.default,  '');
    applyState(tr.hover,    '-hover');
    applyState(tr.active,   '-active');
    applyState(tr.focus,    '-focus');
    applyState(tr.disabled, '-disabled');
  });
}

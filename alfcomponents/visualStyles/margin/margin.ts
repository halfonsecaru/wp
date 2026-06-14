import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfMarginInterface, AlfMarginBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfMargin]',
  standalone: true,
})
export class AlfMarginDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfMargin = input<AlfMarginInterface | AlfMarginBaseInterface | undefined>(undefined);
  public readonly alfPrefix = input<string>('--alf');

  public readonly resolvedMargin = computed<AlfMarginInterface | undefined>(() => {
    const margin = this.alfMargin();
    if (!margin) return undefined;
    if ('default' in margin) return margin as AlfMarginInterface;
    return { default: margin as AlfMarginBaseInterface };
  });

  private readonly SUFFIXES = [
    '-margin', '-margin-top', '-margin-right', '-margin-bottom', '-margin-left',
    '-margin-hover', '-margin-top-hover', '-margin-right-hover', '-margin-bottom-hover', '-margin-left-hover',
    '-margin-active', '-margin-top-active', '-margin-right-active', '-margin-bottom-active', '-margin-left-active',
    '-margin-focus', '-margin-top-focus', '-margin-right-focus', '-margin-bottom-focus', '-margin-left-focus',
    '-margin-disabled', '-margin-top-disabled', '-margin-right-disabled', '-margin-bottom-disabled', '-margin-left-disabled',
  ];

  private readonly _effect = effect(() => {
    const mg = this.resolvedMargin();
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    this.SUFFIXES.forEach(s => el.style.removeProperty(`${p}${s}`));
    if (!mg) return;

    const set = (prop: string, val: string | undefined) => {
      if (val != null) el.style.setProperty(prop, val);
    };

    const applyState = (state: any, sfx: string) => {
      if (!state) return;
      set(`${p}-margin${sfx}`,        state.margin);
      set(`${p}-margin-top${sfx}`,    state.marginTop);
      set(`${p}-margin-right${sfx}`,  state.marginRight);
      set(`${p}-margin-bottom${sfx}`, state.marginBottom);
      set(`${p}-margin-left${sfx}`,   state.marginLeft);
    };

    applyState(mg.default,  '');
    applyState(mg.hover,    '-hover');
    applyState(mg.active,   '-active');
    applyState(mg.focus,    '-focus');
    applyState(mg.disabled, '-disabled');
  });
}

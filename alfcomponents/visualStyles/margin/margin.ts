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
    '-margin-hover', '-margin-hover-top', '-margin-hover-right', '-margin-hover-bottom', '-margin-hover-left',
    '-margin-active', '-margin-active-top', '-margin-active-right', '-margin-active-bottom', '-margin-active-left',
    '-margin-focus', '-margin-focus-top', '-margin-focus-right', '-margin-focus-bottom', '-margin-focus-left',
    '-margin-disabled', '-margin-disabled-top', '-margin-disabled-right', '-margin-disabled-bottom', '-margin-disabled-left',
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
      set(`${p}-margin${sfx}-top`,    state.marginTop);
      set(`${p}-margin${sfx}-right`,  state.marginRight);
      set(`${p}-margin${sfx}-bottom`, state.marginBottom);
      set(`${p}-margin${sfx}-left`,   state.marginLeft);
    };

    applyState(mg.default,  '');
    applyState(mg.hover,    '-hover');
    applyState(mg.active,   '-active');
    applyState(mg.focus,    '-focus');
    applyState(mg.disabled, '-disabled');
  });
}

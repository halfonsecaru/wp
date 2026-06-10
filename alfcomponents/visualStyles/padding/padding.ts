import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfPaddingInterface, AlfPaddingBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfPadding]',
  standalone: true,
})
export class AlfPaddingDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfPadding = input<AlfPaddingInterface | AlfPaddingBaseInterface | undefined>(undefined);
  public readonly alfPrefix  = input<string>('--alf');

  public readonly resolvedPadding = computed<AlfPaddingInterface | undefined>(() => {
    const padding = this.alfPadding();
    if (!padding) return undefined;
    if ('default' in padding) return padding as AlfPaddingInterface;
    return { default: padding as AlfPaddingBaseInterface };
  });

  private readonly SUFFIXES = [
    '-padding', '-padding-top', '-padding-right', '-padding-bottom', '-padding-left',
    '-padding-hover', '-padding-hover-top', '-padding-hover-right', '-padding-hover-bottom', '-padding-hover-left',
    '-padding-active', '-padding-active-top', '-padding-active-right', '-padding-active-bottom', '-padding-active-left',
    '-padding-focus', '-padding-focus-top', '-padding-focus-right', '-padding-focus-bottom', '-padding-focus-left',
    '-padding-disabled', '-padding-disabled-top', '-padding-disabled-right', '-padding-disabled-bottom', '-padding-disabled-left',
  ];

  private readonly _effect = effect(() => {
    const pd = this.resolvedPadding();
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    this.SUFFIXES.forEach(s => el.style.removeProperty(`${p}${s}`));
    if (!pd) return;

    const set = (prop: string, val: string | undefined) => {
      if (val != null) el.style.setProperty(prop, val);
    };

    const applyState = (state: any, sfx: string) => {
      if (!state) return;
      set(`${p}-padding${sfx}`,        state.padding);
      set(`${p}-padding${sfx}-top`,    state.paddingTop);
      set(`${p}-padding${sfx}-right`,  state.paddingRight);
      set(`${p}-padding${sfx}-bottom`, state.paddingBottom);
      set(`${p}-padding${sfx}-left`,   state.paddingLeft);
    };

    applyState(pd.default,  '');
    applyState(pd.hover,    '-hover');
    applyState(pd.active,   '-active');
    applyState(pd.focus,    '-focus');
    applyState(pd.disabled, '-disabled');
  });
}

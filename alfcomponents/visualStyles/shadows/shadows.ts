import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfShadowsInterface, AlfShadowsBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfShadows]',
  standalone: true,
})
export class AlfShadowsDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfShadows = input<AlfShadowsInterface | AlfShadowsBaseInterface | undefined>(undefined);
  public readonly alfPrefix  = input<string>('--alf');

  public readonly resolvedShadows = computed<AlfShadowsInterface | undefined>(() => {
    const shadows = this.alfShadows();
    if (!shadows) return undefined;
    if ('default' in shadows) return shadows as AlfShadowsInterface;
    return { default: shadows as AlfShadowsBaseInterface };
  });

  private readonly SUFFIXES = [
    '-shadows-box-shadow', '-shadows-text-shadow',
    '-shadows-hover-box-shadow', '-shadows-hover-text-shadow',
    '-shadows-active-box-shadow', '-shadows-active-text-shadow',
    '-shadows-focus-box-shadow', '-shadows-focus-text-shadow',
    '-shadows-disabled-box-shadow', '-shadows-disabled-text-shadow',
  ];

  private readonly _effect = effect(() => {
    const sd = this.resolvedShadows();
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    this.SUFFIXES.forEach(s => el.style.removeProperty(`${p}${s}`));
    if (!sd) return;

    const set = (prop: string, val: string | undefined) => {
      if (val != null) el.style.setProperty(prop, val);
    };

    const applyState = (state: any, sfx: string) => {
      if (!state) return;
      set(`${p}-shadows${sfx}-box-shadow`,  state.boxShadow);
      set(`${p}-shadows${sfx}-text-shadow`, state.textShadow);
    };

    applyState(sd.default,  '');
    applyState(sd.hover,    '-hover');
    applyState(sd.active,   '-active');
    applyState(sd.focus,    '-focus');
    applyState(sd.disabled, '-disabled');
  });
}

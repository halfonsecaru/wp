import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfOutlineInterface, AlfOutlineBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfOutline]',
  standalone: true,
})
export class AlfOutlineDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfOutline = input<AlfOutlineInterface | AlfOutlineBaseInterface | undefined>(undefined);
  public readonly alfPrefix  = input<string>('--alf');

  public readonly resolvedOutline = computed<AlfOutlineInterface | undefined>(() => {
    const outline = this.alfOutline();
    if (!outline) return undefined;
    if ('default' in outline) return outline as AlfOutlineInterface;
    return { default: outline as AlfOutlineBaseInterface };
  });

  private readonly SUFFIXES = [
    '-outline-width', '-outline-style', '-outline-color', '-outline-offset',
    '-outline-hover-width', '-outline-hover-style', '-outline-hover-color', '-outline-hover-offset',
    '-outline-active-width', '-outline-active-style', '-outline-active-color', '-outline-active-offset',
    '-outline-focus-width', '-outline-focus-style', '-outline-focus-color', '-outline-focus-offset',
    '-outline-disabled-width', '-outline-disabled-style', '-outline-disabled-color', '-outline-disabled-offset',
  ];

  private readonly _effect = effect(() => {
    const ot = this.resolvedOutline();
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    this.SUFFIXES.forEach(s => el.style.removeProperty(`${p}${s}`));
    if (!ot) return;

    const set = (prop: string, val: string | undefined) => {
      if (val != null) el.style.setProperty(prop, val);
    };

    const applyState = (state: any, sfx: string) => {
      if (!state) return;
      set(`${p}-outline${sfx}-width`,  state.outlineWidth);
      set(`${p}-outline${sfx}-style`,  state.outlineStyle);
      set(`${p}-outline${sfx}-color`,  state.outlineColor);
      set(`${p}-outline${sfx}-offset`, state.outlineOffset);
    };

    applyState(ot.default,  '');
    applyState(ot.hover,    '-hover');
    applyState(ot.active,   '-active');
    applyState(ot.focus,    '-focus');
    applyState(ot.disabled, '-disabled');
  });
}

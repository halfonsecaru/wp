import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfTextStyleInterface, AlfTextStyleStateBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfTextStyle]',
  standalone: true,
})
export class AlfTextStyleDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfTextStyle = input<AlfTextStyleInterface | AlfTextStyleStateBaseInterface | undefined>(undefined);
  public readonly alfPrefix    = input<string>('--alf');

  public readonly resolvedTextStyle = computed<AlfTextStyleInterface | undefined>(() => {
    const textStyle = this.alfTextStyle();
    if (!textStyle) return undefined;
    if ('default' in textStyle) return textStyle as AlfTextStyleInterface;
    return { default: textStyle as AlfTextStyleStateBaseInterface };
  });

  private readonly PROPS = [
    'color', 'font-size', 'font-weight', 'line-height', 'letter-spacing',
    'opacity', 'text-shadow', 'text-decoration', 'text-transform',
  ] as const;

  private readonly STATES = ['', '-hover', '-active', '-focus', '-disabled'] as const;

  private readonly _effect = effect(() => {
    const ts = this.resolvedTextStyle();
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    for (const sfx of this.STATES) {
      for (const prop of this.PROPS) {
        el.style.removeProperty(`${p}-text${sfx}-${prop}`);
      }
    }

    if (!ts) return;

    const set = (prop: string, val: string | undefined) => {
      if (val != null) el.style.setProperty(prop, val);
    };

    const applyState = (state: any, sfx: string) => {
      if (!state) return;
      set(`${p}-text${sfx}-color`,           state.color);
      set(`${p}-text${sfx}-font-size`,       state.fontSize);
      set(`${p}-text${sfx}-font-weight`,     state.fontWeight);
      set(`${p}-text${sfx}-line-height`,     state.lineHeight);
      set(`${p}-text${sfx}-letter-spacing`,  state.letterSpacing);
      set(`${p}-text${sfx}-opacity`,         state.opacity);
      set(`${p}-text${sfx}-text-shadow`,     state.textShadow);
      set(`${p}-text${sfx}-text-decoration`, state.textDecoration);
      set(`${p}-text${sfx}-text-transform`,  state.textTransform);
    };

    applyState(ts.default,  '');
    applyState(ts.hover,    '-hover');
    applyState(ts.active,   '-active');
    applyState(ts.focus,    '-focus');
    applyState(ts.disabled, '-disabled');
  });
}

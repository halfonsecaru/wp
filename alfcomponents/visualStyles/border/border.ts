import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfBorderInterface, AlfBorderBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfBorder]',
  standalone: true,
})
export class AlfBorderDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfBorder = input<AlfBorderInterface | AlfBorderBaseInterface | undefined>(undefined);
  public readonly alfPrefix  = input<string>('--alf');

  public readonly resolvedBorder = computed<AlfBorderInterface | undefined>(() => {
    const border = this.alfBorder();
    if (!border) return undefined;
    if ('default' in border) return border as AlfBorderInterface;
    return { default: border as AlfBorderBaseInterface };
  });

  private readonly SUFFIXES = [
    '-border-width', '-border-top-width', '-border-right-width', '-border-bottom-width', '-border-left-width',
    '-border-style', '-border-top-style', '-border-right-style', '-border-bottom-style', '-border-left-style',
    '-border-color', '-border-top-color', '-border-right-color', '-border-bottom-color', '-border-left-color',
    '-border-radius', '-border-top-left-radius', '-border-top-right-radius', '-border-bottom-right-radius', '-border-bottom-left-radius',
    '-border-outline-width', '-border-outline-style', '-border-outline-color', '-border-outline-offset', '-border-box-sizing',
    '-border-hover-width', '-border-hover-top-width', '-border-hover-right-width', '-border-hover-bottom-width', '-border-hover-left-width',
    '-border-hover-style', '-border-hover-top-style', '-border-hover-right-style', '-border-hover-bottom-style', '-border-hover-left-style',
    '-border-hover-color', '-border-hover-top-color', '-border-hover-right-color', '-border-hover-bottom-color', '-border-hover-left-color',
    '-border-hover-radius', '-border-hover-top-left-radius', '-border-hover-top-right-radius', '-border-hover-bottom-right-radius', '-border-hover-bottom-left-radius',
    '-border-active-width', '-border-active-top-width', '-border-active-right-width', '-border-active-bottom-width', '-border-active-left-width',
    '-border-active-style', '-border-active-top-style', '-border-active-right-style', '-border-active-bottom-style', '-border-active-left-style',
    '-border-active-color', '-border-active-top-color', '-border-active-right-color', '-border-active-bottom-color', '-border-active-left-color',
    '-border-active-radius', '-border-active-top-left-radius', '-border-active-top-right-radius', '-border-active-bottom-right-radius', '-border-active-bottom-left-radius',
    '-border-focus-width', '-border-focus-top-width', '-border-focus-right-width', '-border-focus-bottom-width', '-border-focus-left-width',
    '-border-focus-style', '-border-focus-top-style', '-border-focus-right-style', '-border-focus-bottom-style', '-border-focus-left-style',
    '-border-focus-color', '-border-focus-top-color', '-border-focus-right-color', '-border-focus-bottom-color', '-border-focus-left-color',
    '-border-focus-radius', '-border-focus-top-left-radius', '-border-focus-top-right-radius', '-border-focus-bottom-right-radius', '-border-focus-bottom-left-radius',
    '-border-disabled-width', '-border-disabled-top-width', '-border-disabled-right-width', '-border-disabled-bottom-width', '-border-disabled-left-width',
    '-border-disabled-style', '-border-disabled-top-style', '-border-disabled-right-style', '-border-disabled-bottom-style', '-border-disabled-left-style',
    '-border-disabled-color', '-border-disabled-top-color', '-border-disabled-right-color', '-border-disabled-bottom-color', '-border-disabled-left-color',
    '-border-disabled-radius', '-border-disabled-top-left-radius', '-border-disabled-top-right-radius', '-border-disabled-bottom-right-radius', '-border-disabled-bottom-left-radius',
  ];

  private readonly _effect = effect(() => {
    const bd = this.resolvedBorder();
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    this.SUFFIXES.forEach(s => el.style.removeProperty(`${p}${s}`));
    if (!bd) return;

    const set = (prop: string, val: string | undefined) => {
      if (val != null) el.style.setProperty(prop, val);
    };

    const applyState = (state: any, prefix: string) => {
      if (!state) return;
      set(`${p}${prefix}-width`,               state.borderWidth);
      set(`${p}${prefix}-top-width`,           state.borderTopWidth);
      set(`${p}${prefix}-right-width`,         state.borderRightWidth);
      set(`${p}${prefix}-bottom-width`,        state.borderBottomWidth);
      set(`${p}${prefix}-left-width`,          state.borderLeftWidth);
      set(`${p}${prefix}-style`,               state.borderStyle);
      set(`${p}${prefix}-top-style`,           state.borderTopStyle);
      set(`${p}${prefix}-right-style`,         state.borderRightStyle);
      set(`${p}${prefix}-bottom-style`,        state.borderBottomStyle);
      set(`${p}${prefix}-left-style`,          state.borderLeftStyle);
      set(`${p}${prefix}-color`,               state.borderColor);
      set(`${p}${prefix}-top-color`,           state.borderTopColor);
      set(`${p}${prefix}-right-color`,         state.borderRightColor);
      set(`${p}${prefix}-bottom-color`,        state.borderBottomColor);
      set(`${p}${prefix}-left-color`,          state.borderLeftColor);
      set(`${p}${prefix}-radius`,              state.borderRadius);
      set(`${p}${prefix}-top-left-radius`,     state.borderTopLeftRadius);
      set(`${p}${prefix}-top-right-radius`,    state.borderTopRightRadius);
      set(`${p}${prefix}-bottom-right-radius`, state.borderBottomRightRadius);
      set(`${p}${prefix}-bottom-left-radius`,  state.borderBottomLeftRadius);
      set(`${p}${prefix}-outline-width`,       state.outlineWidth);
      set(`${p}${prefix}-outline-style`,       state.outlineStyle);
      set(`${p}${prefix}-outline-color`,       state.outlineColor);
      set(`${p}${prefix}-outline-offset`,      state.outlineOffset);
      set(`${p}${prefix}-box-sizing`,          state.boxSizing);
    };

    applyState(bd.default,  '-border');
    applyState(bd.hover,    '-border-hover');
    applyState(bd.active,   '-border-active');
    applyState(bd.focus,    '-border-focus');
    applyState(bd.disabled, '-border-disabled');
  });
}

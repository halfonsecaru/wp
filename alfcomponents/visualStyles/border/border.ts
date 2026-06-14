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
    // default
    '-border-width', '-border-top-width', '-border-right-width', '-border-bottom-width', '-border-left-width',
    '-border-style', '-border-top-style', '-border-right-style', '-border-bottom-style', '-border-left-style',
    '-border-color', '-border-top-color', '-border-right-color', '-border-bottom-color', '-border-left-color',
    '-border-radius', '-border-top-left-radius', '-border-top-right-radius', '-border-bottom-right-radius', '-border-bottom-left-radius',
    // hover  (suffix at end, matching mixin: -border-color-hover)
    '-border-width-hover', '-border-top-width-hover', '-border-right-width-hover', '-border-bottom-width-hover', '-border-left-width-hover',
    '-border-style-hover', '-border-top-style-hover', '-border-right-style-hover', '-border-bottom-style-hover', '-border-left-style-hover',
    '-border-color-hover', '-border-top-color-hover', '-border-right-color-hover', '-border-bottom-color-hover', '-border-left-color-hover',
    '-border-radius-hover', '-border-top-left-radius-hover', '-border-top-right-radius-hover', '-border-bottom-right-radius-hover', '-border-bottom-left-radius-hover',
    // active
    '-border-width-active', '-border-top-width-active', '-border-right-width-active', '-border-bottom-width-active', '-border-left-width-active',
    '-border-style-active', '-border-top-style-active', '-border-right-style-active', '-border-bottom-style-active', '-border-left-style-active',
    '-border-color-active', '-border-top-color-active', '-border-right-color-active', '-border-bottom-color-active', '-border-left-color-active',
    '-border-radius-active', '-border-top-left-radius-active', '-border-top-right-radius-active', '-border-bottom-right-radius-active', '-border-bottom-left-radius-active',
    // focus
    '-border-width-focus', '-border-top-width-focus', '-border-right-width-focus', '-border-bottom-width-focus', '-border-left-width-focus',
    '-border-style-focus', '-border-top-style-focus', '-border-right-style-focus', '-border-bottom-style-focus', '-border-left-style-focus',
    '-border-color-focus', '-border-top-color-focus', '-border-right-color-focus', '-border-bottom-color-focus', '-border-left-color-focus',
    '-border-radius-focus', '-border-top-left-radius-focus', '-border-top-right-radius-focus', '-border-bottom-right-radius-focus', '-border-bottom-left-radius-focus',
    // disabled
    '-border-width-disabled', '-border-top-width-disabled', '-border-right-width-disabled', '-border-bottom-width-disabled', '-border-left-width-disabled',
    '-border-style-disabled', '-border-top-style-disabled', '-border-right-style-disabled', '-border-bottom-style-disabled', '-border-left-style-disabled',
    '-border-color-disabled', '-border-top-color-disabled', '-border-right-color-disabled', '-border-bottom-color-disabled', '-border-left-color-disabled',
    '-border-radius-disabled', '-border-top-left-radius-disabled', '-border-top-right-radius-disabled', '-border-bottom-right-radius-disabled', '-border-bottom-left-radius-disabled',
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

    // State suffix goes at the END: --alf-inp-border-color-hover
    const applyState = (state: any, stateSuffix: string) => {
      if (!state) return;
      const s = stateSuffix; // e.g. '-hover', '-active', '' (empty for default)
      set(`${p}-border-width${s}`,               state.borderWidth);
      set(`${p}-border-top-width${s}`,           state.borderTopWidth);
      set(`${p}-border-right-width${s}`,         state.borderRightWidth);
      set(`${p}-border-bottom-width${s}`,        state.borderBottomWidth);
      set(`${p}-border-left-width${s}`,          state.borderLeftWidth);
      set(`${p}-border-style${s}`,               state.borderStyle);
      set(`${p}-border-top-style${s}`,           state.borderTopStyle);
      set(`${p}-border-right-style${s}`,         state.borderRightStyle);
      set(`${p}-border-bottom-style${s}`,        state.borderBottomStyle);
      set(`${p}-border-left-style${s}`,          state.borderLeftStyle);
      set(`${p}-border-color${s}`,               state.borderColor);
      set(`${p}-border-top-color${s}`,           state.borderTopColor);
      set(`${p}-border-right-color${s}`,         state.borderRightColor);
      set(`${p}-border-bottom-color${s}`,        state.borderBottomColor);
      set(`${p}-border-left-color${s}`,          state.borderLeftColor);
      set(`${p}-border-radius${s}`,              state.borderRadius);
      set(`${p}-border-top-left-radius${s}`,     state.borderTopLeftRadius);
      set(`${p}-border-top-right-radius${s}`,    state.borderTopRightRadius);
      set(`${p}-border-bottom-right-radius${s}`, state.borderBottomRightRadius);
      set(`${p}-border-bottom-left-radius${s}`,  state.borderBottomLeftRadius);
    };

    applyState(bd.default,  '');
    applyState(bd.hover,    '-hover');
    applyState(bd.active,   '-active');
    applyState(bd.focus,    '-focus');
    applyState(bd.disabled, '-disabled');
  });
}


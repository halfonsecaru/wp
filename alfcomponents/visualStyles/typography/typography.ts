import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfTypographyInterface, AlfTypographyBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfTypography]',
  standalone: true,
})
export class AlfTypographyDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfTypography = input<AlfTypographyInterface | AlfTypographyBaseInterface | undefined>(undefined);
  public readonly alfPrefix     = input<string>('--alf');

  public readonly resolvedTypography = computed<AlfTypographyInterface | undefined>(() => {
    const typography = this.alfTypography();
    if (!typography) return undefined;
    if ('default' in typography) return typography as AlfTypographyInterface;
    return { default: typography as AlfTypographyBaseInterface };
  });

  private readonly PROPS = [
    'color', 'font-size', 'font-weight', 'font-family', 'line-height', 'letter-spacing',
    'text-align', 'text-decoration', 'text-transform', 'white-space', 'word-break',
    'overflow-wrap', 'vertical-align', 'font-style', 'text-overflow', 'opacity', 'text-shadow',
  ] as const;

  private readonly STATES = ['', '-hover', '-active', '-focus', '-disabled'] as const;

  private readonly _effect = effect(() => {
    const ty = this.resolvedTypography();
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    for (const sfx of this.STATES) {
      for (const prop of this.PROPS) {
        el.style.removeProperty(`${p}-typography${sfx}-${prop}`);
      }
    }

    if (!ty) return;

    const set = (prop: string, val: string | undefined) => {
      if (val != null) el.style.setProperty(prop, val);
    };

    const applyState = (state: any, sfx: string) => {
      if (!state) return;
      set(`${p}-typography${sfx}-color`,          state.color);
      set(`${p}-typography${sfx}-font-size`,      state.fontSize);
      set(`${p}-typography${sfx}-font-weight`,    state.fontWeight);
      set(`${p}-typography${sfx}-font-family`,    state.fontFamily);
      set(`${p}-typography${sfx}-line-height`,    state.lineHeight);
      set(`${p}-typography${sfx}-letter-spacing`, state.letterSpacing);
      set(`${p}-typography${sfx}-text-align`,     state.textAlign);
      set(`${p}-typography${sfx}-text-decoration`,state.textDecoration);
      set(`${p}-typography${sfx}-text-transform`, state.textTransform);
      set(`${p}-typography${sfx}-white-space`,    state.whiteSpace);
      set(`${p}-typography${sfx}-word-break`,     state.wordBreak);
      set(`${p}-typography${sfx}-overflow-wrap`,  state.overflowWrap);
      set(`${p}-typography${sfx}-vertical-align`, state.verticalAlign);
      set(`${p}-typography${sfx}-font-style`,     state.fontStyle);
      set(`${p}-typography${sfx}-text-overflow`,  state.textOverflow);
      set(`${p}-typography${sfx}-opacity`,        state.opacity);
      set(`${p}-typography${sfx}-text-shadow`,    state.textShadow);
    };

    applyState(ty.default,  '');
    applyState(ty.hover,    '-hover');
    applyState(ty.active,   '-active');
    applyState(ty.focus,    '-focus');
    applyState(ty.disabled, '-disabled');
  });
}

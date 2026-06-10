import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfDisplayAndLayoutInterface, AlfDisplayAndLayoutBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfDisplayAndLayout]',
  standalone: true,
})
export class AlfDisplayAndLayoutDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfDisplayAndLayout = input<AlfDisplayAndLayoutInterface | AlfDisplayAndLayoutBaseInterface | undefined>(undefined);
  public readonly alfPrefix           = input<string>('--alf');

  public readonly resolvedDL = computed<AlfDisplayAndLayoutInterface | undefined>(() => {
    const dl = this.alfDisplayAndLayout();
    if (!dl) return undefined;
    if ('default' in dl) return dl as AlfDisplayAndLayoutInterface;
    return { default: dl as AlfDisplayAndLayoutBaseInterface };
  });

  private readonly PROPS = [
    'display', 'position', 'top', 'right', 'bottom', 'left', 'z-index', 'box-sizing',
    'width', 'height', 'min-width', 'max-width', 'min-height', 'max-height',
    'overflow', 'overflow-x', 'overflow-y', 'visibility', 'object-fit',
    'flex-direction', 'justify-content', 'align-items', 'gap', 'flex-wrap',
    'opacity', 'pointer-events', 'cursor',
  ] as const;

  private readonly STATES = ['', '-hover', '-active', '-focus', '-disabled'] as const;

  private readonly _effect = effect(() => {
    const dl = this.resolvedDL();
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    for (const sfx of this.STATES) {
      for (const prop of this.PROPS) {
        el.style.removeProperty(`${p}-layout${sfx}-${prop}`);
      }
    }

    if (!dl) return;

    const set = (prop: string, val: any) => {
      if (val != null) el.style.setProperty(prop, String(val));
    };

    const applyState = (state: any, sfx: string) => {
      if (!state) return;
      set(`${p}-layout${sfx}-display`,         state.display);
      set(`${p}-layout${sfx}-position`,        state.position);
      set(`${p}-layout${sfx}-top`,             state.top);
      set(`${p}-layout${sfx}-right`,           state.right);
      set(`${p}-layout${sfx}-bottom`,          state.bottom);
      set(`${p}-layout${sfx}-left`,            state.left);
      set(`${p}-layout${sfx}-z-index`,         state.zIndex);
      set(`${p}-layout${sfx}-box-sizing`,      state.boxSizing);
      set(`${p}-layout${sfx}-width`,           state.width);
      set(`${p}-layout${sfx}-height`,          state.height);
      set(`${p}-layout${sfx}-min-width`,       state.minWidth);
      set(`${p}-layout${sfx}-max-width`,       state.maxWidth);
      set(`${p}-layout${sfx}-min-height`,      state.minHeight);
      set(`${p}-layout${sfx}-max-height`,      state.maxHeight);
      set(`${p}-layout${sfx}-overflow`,        state.overflow);
      set(`${p}-layout${sfx}-overflow-x`,      state.overflowX);
      set(`${p}-layout${sfx}-overflow-y`,      state.overflowY);
      set(`${p}-layout${sfx}-visibility`,      state.visibility);
      set(`${p}-layout${sfx}-object-fit`,      state.objectFit);
      set(`${p}-layout${sfx}-flex-direction`,  state.flexDirection);
      set(`${p}-layout${sfx}-justify-content`, state.justifyContent);
      set(`${p}-layout${sfx}-align-items`,     state.alignItems);
      set(`${p}-layout${sfx}-gap`,             state.gap);
      set(`${p}-layout${sfx}-flex-wrap`,       state.flexWrap);
      set(`${p}-layout${sfx}-opacity`,         state.opacity);
      set(`${p}-layout${sfx}-pointer-events`,  state.pointerEvents);
      set(`${p}-layout${sfx}-cursor`,          state.cursor);
    };

    applyState(dl.default,  '');
    applyState(dl.hover,    '-hover');
    applyState(dl.active,   '-active');
    applyState(dl.focus,    '-focus');
    applyState(dl.disabled, '-disabled');
  });
}

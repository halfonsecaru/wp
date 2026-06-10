import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfCursorEnum } from '@alfcomponents/enums';
import { AlfCursorInterface, AlfCursorBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfCursor]',
  standalone: true,
})
export class AlfCursorDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfCursor = input<AlfCursorEnum | AlfCursorInterface | AlfCursorBaseInterface | undefined>(undefined);
  public readonly alfPrefix  = input<string>('--alf');

  public readonly resolvedCursor = computed<AlfCursorInterface | undefined>(() => {
    const cur = this.alfCursor();
    if (!cur) return undefined;
    if (typeof cur === 'object' && ('default' in cur || 'hover' in cur || 'active' in cur || 'focus' in cur || 'disabled' in cur)) {
      return cur as AlfCursorInterface;
    }
    return { default: { cursor: cur as AlfCursorEnum } };
  });

  private readonly SUFFIXES = [
    '-cursor',
    '-cursor-hover',
    '-cursor-active',
    '-cursor-focus',
    '-cursor-disabled',
  ];

  private readonly _effect = effect(() => {
    const cur = this.resolvedCursor();
    const p  = this.alfPrefix();
    const el = this.el.nativeElement as HTMLElement;

    this.SUFFIXES.forEach(s => el.style.removeProperty(`${p}${s}`));
    if (!cur) return;

    const set = (prop: string, val: string | undefined) => {
      if (val != null) el.style.setProperty(prop, val);
    };

    if (cur.default?.cursor) set(`${p}-cursor`, cur.default.cursor);
    if (cur.hover?.cursor) set(`${p}-cursor-hover`, cur.hover.cursor);
    if (cur.active?.cursor) set(`${p}-cursor-active`, cur.active.cursor);
    if (cur.focus?.cursor) set(`${p}-cursor-focus`, cur.focus.cursor);
    if (cur.disabled?.cursor) set(`${p}-cursor-disabled`, cur.disabled.cursor);
  });
}

import { Directive, ElementRef, effect, inject, input, computed } from '@angular/core';
import { AlfBackgroundsInterface, AlfBackgroundsBaseInterface } from '@alfcomponents/interfaces';

@Directive({
  selector: '[alfBackground]',
  standalone: true,
})
export class AlfBackgroundDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  public readonly alfBackground = input<AlfBackgroundsInterface | AlfBackgroundsBaseInterface | undefined>(undefined);
  public readonly alfPrefix     = input<string>('--alf');

  public readonly resolvedBackground = computed<AlfBackgroundsInterface | undefined>(() => {
    const bg = this.alfBackground();
    if (!bg) return undefined;
    if ('default' in bg) return bg as AlfBackgroundsInterface;
    return { default: bg as AlfBackgroundsBaseInterface };
  });

  private readonly SUFFIXES = [
    '-bg-color', '-bg-img', '-bg-size', '-bg-pos', '-bg-repeat', '-bg-attachment', '-bg-clip',
    '-bg-hover-color', '-bg-hover-img', '-bg-hover-size', '-bg-hover-pos', '-bg-hover-repeat', '-bg-hover-attachment', '-bg-hover-clip',
    '-bg-active-color', '-bg-active-img',
    '-bg-focus-color', '-bg-focus-img',
    '-bg-disabled-color', '-bg-disabled-img',
  ];

  private readonly _effect = effect(() => {
    const bg  = this.resolvedBackground();
    const p   = this.alfPrefix();
    const el  = this.el.nativeElement as HTMLElement;

    this.SUFFIXES.forEach(s => el.style.removeProperty(`${p}${s}`));
    if (!bg) return;

    const set = (prop: string, val: string | undefined) => {
      if (val != null) el.style.setProperty(prop, val);
    };

    set(`${p}-bg-color`,       bg.default?.backgroundColor);
    set(`${p}-bg-img`,         bg.default?.backgroundImage);
    set(`${p}-bg-size`,        bg.default?.backgroundSize);
    set(`${p}-bg-pos`,         bg.default?.backgroundPosition);
    set(`${p}-bg-repeat`,      bg.default?.backgroundRepeat);
    set(`${p}-bg-attachment`,  bg.default?.backgroundAttachment);
    set(`${p}-bg-clip`,        bg.default?.backgroundClip);

    set(`${p}-bg-hover-color`,       bg.hover?.backgroundColor);
    set(`${p}-bg-hover-img`,         bg.hover?.backgroundImage);
    set(`${p}-bg-hover-size`,        bg.hover?.backgroundSize);
    set(`${p}-bg-hover-pos`,         bg.hover?.backgroundPosition);
    set(`${p}-bg-hover-repeat`,      bg.hover?.backgroundRepeat);
    set(`${p}-bg-hover-attachment`,  bg.hover?.backgroundAttachment);
    set(`${p}-bg-hover-clip`,        bg.hover?.backgroundClip);

    set(`${p}-bg-active-color`, bg.active?.backgroundColor);
    set(`${p}-bg-active-img`,   bg.active?.backgroundImage);

    set(`${p}-bg-focus-color`, bg.focus?.backgroundColor);
    set(`${p}-bg-focus-img`,   bg.focus?.backgroundImage);

    set(`${p}-bg-disabled-color`, bg.disabled?.backgroundColor);
    set(`${p}-bg-disabled-img`,   bg.disabled?.backgroundImage);
  });
}

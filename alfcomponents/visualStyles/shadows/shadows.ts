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

    const processShadow = (shadowStr: string | undefined, colorStr: string | undefined, inset?: boolean) => {
      if (!shadowStr) return undefined;
      let result = shadowStr;

      if (colorStr) {
        result = result.replace(/rgb\(0 0 0 \/ (0\.\d+)\)/g, (match, opacityStr) => {
          // Multiplicamos la opacidad original por 2.5 para que las sombras de colores sean visibles
          // (las sombras coloreadas necesitan más opacidad que las negras para percibirse igual)
          const opacityPercent = Math.min(100, parseFloat(opacityStr) * 100 * 2.5);
          return `color-mix(in srgb, ${colorStr} ${opacityPercent}%, transparent)`;
        });
      }

      if (inset && !result.includes('inset')) {
        result = result.split(',').map(part => `inset ${part.trim()}`).join(', ');
      }

      return result;
    };

    const applyState = (state: any, sfx: string) => {
      if (!state) return;
      
      const processedBoxShadow = processShadow(state.boxShadow, state.boxShadowColor, state.boxShadowInset);
      const processedTextShadow = processShadow(state.textShadow, state.textShadowColor);

      set(`${p}-shadows${sfx}-box-shadow`,  processedBoxShadow);
      set(`${p}-shadows${sfx}-text-shadow`, processedTextShadow);
    };

    applyState(sd.default,  '');
    applyState(sd.hover,    '-hover');
    applyState(sd.active,   '-active');
    applyState(sd.focus,    '-focus');
    applyState(sd.disabled, '-disabled');
  });
}

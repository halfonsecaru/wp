import { Directive, input } from '@angular/core';

@Directive({
  selector: '[alfDisabled]',
  standalone: true,
  host: {
    '[class.alf-disabled]': 'alfDisabled()',
    '[attr.disabled]': 'alfDisabled() ? "" : null',
    '[attr.aria-disabled]': 'alfDisabled() ? "true" : null'
  }
})
export class AlfDisabledDirective {
  public readonly alfDisabled = input<boolean | undefined | null>(false);
}

import { Directive, input } from '@angular/core';
import { AlfCursorEnum } from '@alfcomponents/enums';

@Directive({
  selector: '[alfCursor]',
  standalone: true,
  host: {
    '[style.cursor]': 'alfCursor() ?? undefined'
  }
})
export class AlfCursorDirective {
  public readonly alfCursor = input<AlfCursorEnum | undefined>(undefined);
}

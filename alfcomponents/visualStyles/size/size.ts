import { Directive, input, computed } from '@angular/core';
import { AlfSizeEnum } from '@alfcomponents/enums';

@Directive({
  selector: '[alfSize]',
  standalone: true,
  host: {
    '[class]': 'sizeClass()'
  }
})
export class AlfSizeDirective {
  public readonly alfSize = input<AlfSizeEnum | undefined>(undefined);

  public readonly sizeClass = computed(() => {
    const size = this.alfSize();
    return size ? `alf-size-${size}` : '';
  });
}

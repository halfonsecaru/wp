import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { AlfCheckbox } from '@alfcomponents/components/simple/alf-checkbox/alf-checkbox';
import { AlfCheckboxVariantEnum, AlfColorVariantEnum, AlfSizeEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-checkbox-viewer',
  standalone: true,
  imports: [AlfCheckbox],
  templateUrl: './alf-checkbox-viewer.html',
  styleUrl: './alf-checkbox-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCheckboxViewer {
  protected readonly checked1 = signal(true);
  protected readonly checked2 = signal(false);
  protected readonly checked3 = signal(false);
  protected readonly checked4 = signal(false);
  protected readonly checkedElegant = signal(false);
  protected readonly checkedStandard = signal(true);
  protected readonly checkedMoving = signal(false);
  protected readonly indeterminate2 = signal(true);

  protected readonly AlfCheckboxVariantEnum = AlfCheckboxVariantEnum;
  protected readonly AlfColorVariantEnum = AlfColorVariantEnum;
  protected readonly AlfSizeEnum = AlfSizeEnum;
}

import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AlfRadioButton } from '@alfcomponents/components';
import { AlfRadioButtonVariantEnum, AlfColorVariantEnum, AlfSizeEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-radio-viewer',
  standalone: true,
  imports: [AlfRadioButton],
  templateUrl: './alf-radio-viewer.html',
  styleUrl: './alf-radio-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfRadioViewer {
  public readonly AlfRadioButtonVariantEnum = AlfRadioButtonVariantEnum;
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;

  public readonly solidVariants = [
    AlfColorVariantEnum.Primary,
    AlfColorVariantEnum.Secondary,
    AlfColorVariantEnum.Success,
    AlfColorVariantEnum.Danger,
    AlfColorVariantEnum.Warning,
    AlfColorVariantEnum.Info,
    AlfColorVariantEnum.Dark,
    AlfColorVariantEnum.Default,
  ];

  public readonly radioStyles = [
    { name: 'Elegant', value: AlfRadioButtonVariantEnum.Elegant },
    { name: 'Standard', value: AlfRadioButtonVariantEnum.Standard },
  ];

  public readonly sizes = [
    AlfSizeEnum.XS,
    AlfSizeEnum.SM,
    AlfSizeEnum.MD,
    AlfSizeEnum.LG,
    AlfSizeEnum.XL
  ];

  public readonly demoGroupValue = signal('opt1');

  private readonly checkedStates = new Map<string, any>();

  public getChecked(style: string, variant: string) {
    const key = `${style}-${variant}`;
    if (!this.checkedStates.has(key)) {
      this.checkedStates.set(key, signal(false));
    }
    return this.checkedStates.get(key);
  }
}

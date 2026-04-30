import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AlfRadioButton } from '@alfcomponents/components';
import { AlfRadioButtonVariantEnum, AlfVisualPredefinedEnum, AlfSizeEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlfRadioButton],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  public readonly AlfRadioButtonVariantEnum = AlfRadioButtonVariantEnum;
  public readonly AlfVisualPredefinedEnum = AlfVisualPredefinedEnum;

  // Only Solid variants as requested
  public readonly solidVariants = [
    AlfVisualPredefinedEnum.SolidPrimary,
    AlfVisualPredefinedEnum.SolidSecondary,
    AlfVisualPredefinedEnum.SolidSuccess,
    AlfVisualPredefinedEnum.SolidDanger,
    AlfVisualPredefinedEnum.SolidWarning,
    AlfVisualPredefinedEnum.SolidInfo,
    AlfVisualPredefinedEnum.SolidDark,
    AlfVisualPredefinedEnum.SolidDefault,
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

import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AlfRadioButton } from '@alfcomponents/components';
import { AlfRadioButtonVariantEnum, AlfColorVariantEnum, AlfSizeEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-radio-button-viewer',
  standalone: true,
  imports: [AlfRadioButton],
  templateUrl: './alf-radio-button-viewer.html',
  styleUrl: './alf-radio-button-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfRadioButtonViewer {
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

  public readonly premiumVariants = [
    AlfColorVariantEnum.PrimarySoft,
    AlfColorVariantEnum.SuccessSoft,
    AlfColorVariantEnum.PrimaryCrystal,
    AlfColorVariantEnum.GradientPurple,
    AlfColorVariantEnum.GradientSunset,
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
    AlfSizeEnum.XL,
    AlfSizeEnum.XXL
  ];

  private readonly checkedStates = new Map<string, any>();

  /**
   * Helper to get/create a signal for a specific combination.
   * This maintains internal state for all radio buttons in the demo.
   */
  public readonly getChecked = (style: string, variant: string) => {
    const key = `${style}-${variant}`;
    if (!this.checkedStates.has(key)) {
      // Default to checked for primary variants to show off colors
      this.checkedStates.set(key, signal(variant === AlfColorVariantEnum.Primary || variant === AlfColorVariantEnum.PrimarySoft));
    }
    return this.checkedStates.get(key);
  };

  /**
   * For Radio Group simulation
   */
  public readonly selectedGroupValue = signal('Option 1');
}

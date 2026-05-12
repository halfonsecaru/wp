import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AlfCheckbox } from '@alfcomponents/components';
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
  public readonly AlfCheckboxVariantEnum = AlfCheckboxVariantEnum;
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

  public readonly checkboxStyles = [
    { name: 'Elegant', value: AlfCheckboxVariantEnum.Elegant },
    { name: 'Standard', value: AlfCheckboxVariantEnum.Standard },
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
   * This maintains internal state for all checkboxes in the demo.
   */
  public getChecked(style: string, variant: string) {
    const key = `${style}-${variant}`;
    if (!this.checkedStates.has(key)) {
      // Default to checked for standard/premium variants to show off colors
      this.checkedStates.set(key, signal(true));
    }
    return this.checkedStates.get(key);
  }

  /**
   * For indeterminate demo
   */
  public readonly indeterminateSignal = signal(true);
}

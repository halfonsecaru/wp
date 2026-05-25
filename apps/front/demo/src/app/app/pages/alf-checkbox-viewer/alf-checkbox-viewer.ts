import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlfCheckbox } from '@alfcomponents/components';
import {
  AlfColorVariantEnum,
  AlfSizeEnum,
  AlfCheckboxVariantEnum
} from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-checkbox-viewer',
  standalone: true,
  imports: [AlfCheckbox],
  templateUrl: './alf-checkbox-viewer.html',
  styleUrl: './alf-checkbox-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCheckboxViewer {
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;
  public readonly AlfSizeEnum = AlfSizeEnum;
  public readonly AlfCheckboxVariantEnum = AlfCheckboxVariantEnum;

  public readonly selectedStyleGroup = signal<string>('elegant');
  public readonly selectedLabelPosGroup = signal<string>('after');
  public readonly selectedSizeGroup = signal<AlfSizeEnum>(AlfSizeEnum.MD);

  public readonly selectedSolidElegantGroup = signal<string>('primary');
  public readonly selectedSolidStandardGroup = signal<string>('primary');

  public readonly checkedWithHelper = signal<boolean>(false);
  public readonly checkedWithError = signal<boolean>(false);
  public readonly dynamicSelected = signal<string>('Option A');

  public readonly solidVariants: readonly AlfColorVariantEnum[] = [
    AlfColorVariantEnum.Primary,
    AlfColorVariantEnum.Secondary,
    AlfColorVariantEnum.Success,
    AlfColorVariantEnum.Danger,
    AlfColorVariantEnum.Warning,
    AlfColorVariantEnum.Info,
    AlfColorVariantEnum.Dark,
    AlfColorVariantEnum.Light
  ];

  public readonly sizes: readonly AlfSizeEnum[] = [
    AlfSizeEnum.XS,
    AlfSizeEnum.SM,
    AlfSizeEnum.MD,
    AlfSizeEnum.LG,
    AlfSizeEnum.XL,
    AlfSizeEnum.XXL
  ];

  public readonly getBadgeColorClass = (variant: string): string => {
    const v = variant.toLowerCase();
    if (v.includes('primary')) return 'primary';
    if (v.includes('secondary') || v.includes('default')) return 'secondary';
    if (v.includes('success')) return 'success';
    if (v.includes('danger')) return 'danger';
    if (v.includes('warning') || v.includes('sunset')) return 'warning';
    if (v.includes('info') || v.includes('ocean')) return 'info';
    if (v.includes('dark')) return 'dark';
    if (v.includes('light')) return 'light';
    if (v.includes('purple')) return 'primary';
    if (v.includes('forest')) return 'success';
    return 'primary';
  };
}

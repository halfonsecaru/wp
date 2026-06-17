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
  public readonly selectedExtraGroup = signal<string>('tooltip');
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

  public readonly outlineVariants: readonly AlfColorVariantEnum[] = [
    AlfColorVariantEnum.PrimaryOutline,
    AlfColorVariantEnum.SecondaryOutline,
    AlfColorVariantEnum.SuccessOutline,
    AlfColorVariantEnum.DangerOutline,
    AlfColorVariantEnum.WarningOutline,
    AlfColorVariantEnum.InfoOutline,
    AlfColorVariantEnum.DarkOutline,
    AlfColorVariantEnum.LightOutline
  ];

  public readonly ghostVariants: readonly AlfColorVariantEnum[] = [
    AlfColorVariantEnum.PrimaryGhost,
    AlfColorVariantEnum.SecondaryGhost,
    AlfColorVariantEnum.SuccessGhost,
    AlfColorVariantEnum.DangerGhost,
    AlfColorVariantEnum.WarningGhost,
    AlfColorVariantEnum.InfoGhost,
    AlfColorVariantEnum.DarkGhost,
    AlfColorVariantEnum.LightGhost
  ];

  public readonly softVariants: readonly AlfColorVariantEnum[] = [
    AlfColorVariantEnum.PrimarySoft,
    AlfColorVariantEnum.SecondarySoft,
    AlfColorVariantEnum.SuccessSoft,
    AlfColorVariantEnum.DangerSoft,
    AlfColorVariantEnum.WarningSoft,
    AlfColorVariantEnum.InfoSoft,
    AlfColorVariantEnum.DarkSoft,
    AlfColorVariantEnum.LightSoft
  ];

  public readonly crystalVariants: readonly AlfColorVariantEnum[] = [
    AlfColorVariantEnum.PrimaryCrystal,
    AlfColorVariantEnum.SecondaryCrystal,
    AlfColorVariantEnum.SuccessCrystal,
    AlfColorVariantEnum.DangerCrystal,
    AlfColorVariantEnum.WarningCrystal,
    AlfColorVariantEnum.InfoCrystal,
    AlfColorVariantEnum.DarkCrystal,
    AlfColorVariantEnum.LightCrystal
  ];

  public readonly depth3DVariants: readonly AlfColorVariantEnum[] = [
    AlfColorVariantEnum.Primary3D,
    AlfColorVariantEnum.Secondary3D,
    AlfColorVariantEnum.Success3D,
    AlfColorVariantEnum.Danger3D,
    AlfColorVariantEnum.Warning3D,
    AlfColorVariantEnum.Info3D,
    AlfColorVariantEnum.Dark3D,
    AlfColorVariantEnum.Light3D
  ];

  public readonly gradientVariants: readonly AlfColorVariantEnum[] = [
    AlfColorVariantEnum.GradientPurple,
    AlfColorVariantEnum.GradientSunset,
    AlfColorVariantEnum.GradientOcean,
    AlfColorVariantEnum.GradientForest,
    AlfColorVariantEnum.GradientPrimary,
    AlfColorVariantEnum.GradientDanger,
    AlfColorVariantEnum.GradientSuccess,
    AlfColorVariantEnum.GradientWarning,
    AlfColorVariantEnum.GradientInfo
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

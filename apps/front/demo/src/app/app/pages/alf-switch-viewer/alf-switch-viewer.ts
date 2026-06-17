import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlfSwitch } from '@alfcomponents/components';
import { AlfColorVariantEnum, AlfSizeEnum, AlfLabelsPositionEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-switch-viewer',
  standalone: true,
  imports: [AlfSwitch],
  templateUrl: './alf-switch-viewer.html',
  styleUrl: './alf-switch-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfSwitchViewer {
  // Expose Enums to Template
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;
  public readonly AlfSizeEnum = AlfSizeEnum;
  public readonly AlfLabelsPositionEnum = AlfLabelsPositionEnum;

  // ── Reactive state of individual examples ──────────────────────────────────
  public readonly checkedElegant = signal<boolean>(true);
  public readonly checkedStandard = signal<boolean>(false);
  public readonly selectedStyleGroup = signal<string>('elegant');
  public readonly selectedLabelPosGroup = signal<string>('after');
  public readonly selectedExtraGroup = signal<string>('tooltip');
  public readonly checkedBasic = signal<boolean>(false);
  public readonly checkedLabelBefore = signal<boolean>(false);
  public readonly checkedWithHelper = signal<boolean>(false);
  public readonly checkedWithError = signal<boolean>(false);

  public readonly checkedXS = signal<boolean>(false);
  public readonly checkedSM = signal<boolean>(false);
  public readonly checkedMD = signal<boolean>(false);
  public readonly checkedLG = signal<boolean>(false);
  public readonly checkedXL = signal<boolean>(false);
  public readonly checkedXXL = signal<boolean>(false);

  public readonly checkedGreen = signal<boolean>(true);
  public readonly checkedRed = signal<boolean>(true);

  public readonly checkedPrimary = signal<boolean>(true);
  public readonly checkedSecondary = signal<boolean>(true);
  public readonly checkedSuccess = signal<boolean>(true);
  public readonly checkedDanger = signal<boolean>(true);
  public readonly checkedWarning = signal<boolean>(true);
  public readonly checkedInfo = signal<boolean>(true);
  public readonly checkedLight = signal<boolean>(true);
  public readonly checkedDark = signal<boolean>(true);

  public readonly checkedShadowSoft = signal<boolean>(false);
  public readonly checkedShadowGlow = signal<boolean>(false);
  public readonly checkedShadowNeon = signal<boolean>(false);
  public readonly checkedShadowRetro = signal<boolean>(false);

  // ── Lists for dynamic iterations ──────────────────────────────────────────
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

  private readonly checkedStates: Map<string, any> = new Map<string, any>();

  /**
   * Helper to get or create a signal for a specific dynamic variant in loops.
   */
  public readonly getChecked = (style: string, variant: string): any => {
    const key = `${style}-${variant}`;
    if (!this.checkedStates.has(key)) {
      this.checkedStates.set(key, signal(true));
    }
    return this.checkedStates.get(key);
  };

  /**
   * Helper to return the specific color suffix for styling badges.
   */
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



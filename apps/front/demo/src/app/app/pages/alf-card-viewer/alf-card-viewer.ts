import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AlfCardComponent,
  AlfCardTitleComponent,
  AlfCardImgComponent,
  AlfCardBodyComponent,
  AlfCardActionsComponent,
  AlfButton,
} from '@alfcomponents/components';
import { AlfColorVariantEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-card-viewer',
  standalone: true,
  imports: [
    AlfCardComponent,
    AlfCardTitleComponent,
    AlfCardImgComponent,
    AlfCardBodyComponent,
    AlfCardActionsComponent,
    AlfButton,
  ],
  templateUrl: './alf-card-viewer.html',
  styleUrl: './alf-card-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCardViewer {
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;

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
}

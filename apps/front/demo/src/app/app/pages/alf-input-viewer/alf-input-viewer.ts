import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlfInput } from '@alfcomponents/components';
import { AlfColorVariantEnum, AlfInputAppearanceEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-input-viewer',
  standalone: true,
  imports: [AlfInput],
  templateUrl: './alf-input-viewer.html',
  styleUrl: './alf-input-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfInputViewer {
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;
  public readonly AlfInputAppearanceEnum = AlfInputAppearanceEnum;

  public readonly selectedAppearance = signal<AlfInputAppearanceEnum>(AlfInputAppearanceEnum.Outline);

  public readonly valOutline = signal<string>('');
  public readonly valFill = signal<string>('');
  public readonly valStandard = signal<string>('');
  
  public readonly valPassword = signal<string>('');
  public readonly valEmail = signal<string>('');

  public readonly valDisabled = signal<string>('No se puede editar');
  public readonly valReadonly = signal<string>('Solo lectura');

  public readonly valHelper = signal<string>('');
  public readonly valError = signal<string>('usuario_invalido!');

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

  public readonly depthVariants: readonly AlfColorVariantEnum[] = [
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

  private readonly valueStates: Map<string, any> = new Map<string, any>();

  public readonly getValue = (style: string, variant: string): any => {
    const key = `${style}-${variant}`;
    if (!this.valueStates.has(key)) {
      this.valueStates.set(key, signal(''));
    }
    return this.valueStates.get(key);
  };
}

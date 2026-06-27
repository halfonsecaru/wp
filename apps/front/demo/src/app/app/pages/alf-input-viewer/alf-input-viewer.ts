import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlfInput } from '@alfcomponents/components';
import { AlfColorVariantEnum, AlfInputAppearanceEnum, AlfInputTypeEnum, AlfIconsUnicodeIconEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-input-viewer',
  standalone: true,
  imports: [AlfInput],
  templateUrl: './alf-input-viewer.html',
  styleUrl: './alf-input-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfInputViewer {
  public readonly alfInputTypeEnum = AlfInputTypeEnum;
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;
  public readonly AlfInputAppearanceEnum = AlfInputAppearanceEnum;
  public readonly AlfIconsUnicodeIconEnum = AlfIconsUnicodeIconEnum;

  public readonly selectedAppearance = signal<AlfInputAppearanceEnum>(AlfInputAppearanceEnum.Outline);
  public readonly isElevated = signal<boolean>(true);

  public readonly valOutline = signal<string | undefined>(undefined);
  public readonly valFill = signal<string | undefined>(undefined);
  public readonly valStandard = signal<string | undefined>(undefined);
  public readonly valStandardPrefix = signal<string | undefined>(undefined);

  public onAppearanceChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as AlfInputAppearanceEnum;
    this.selectedAppearance.set(value);
  }
  
  public readonly valPassword = signal<string | undefined>(undefined);
  public readonly valEmail = signal<string | undefined>(undefined);

  public readonly valDisabled = signal<string>('No se puede editar');
  public readonly valReadonly = signal<string>('Solo lectura');

  public readonly valHelper = signal<string | undefined>(undefined);
  public readonly valError = signal<string>('usuario_invalido!');
  public readonly valClearOnClick = signal<string>('¡Haz clic para borrarme mágicamente!');

  // Validation signals
  public readonly valReq = signal<string | undefined>(undefined);
  public readonly valMinLen = signal<string | undefined>(undefined);
  public readonly valMaxLen = signal<string | undefined>(undefined);
  public readonly valMin = signal<string | undefined>(undefined);
  public readonly valMax = signal<string | undefined>(undefined);
  public readonly valPattern = signal<string | undefined>(undefined);
  public readonly valCustom = signal<string | undefined>(undefined);

  public readonly customValidator = [(val: string): any => {
    if (!val) return { isValid: true };
    if (val.toLowerCase() === 'alfon') return { isValid: true };
    return { isValid: false, error: 'El valor debe ser exactamente "alfon"' };
  }];

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

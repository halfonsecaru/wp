import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AlfCheckbox } from '@alfcomponents/components/simple/alf-checkbox/alf-checkbox';
import { AlfCheckboxVariantEnum, AlfVisualPredefinedEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlfCheckbox],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  public readonly AlfCheckboxVariantEnum = AlfCheckboxVariantEnum;
  public readonly AlfVisualPredefinedEnum = AlfVisualPredefinedEnum;

  public readonly solidVariants = [
    AlfVisualPredefinedEnum.SolidPrimary,
    AlfVisualPredefinedEnum.SolidSecondary,
    AlfVisualPredefinedEnum.SolidSuccess,
    AlfVisualPredefinedEnum.SolidDanger,
    AlfVisualPredefinedEnum.SolidWarning,
    AlfVisualPredefinedEnum.SolidInfo,
    AlfVisualPredefinedEnum.SolidLight,
    AlfVisualPredefinedEnum.SolidDark,
    AlfVisualPredefinedEnum.SolidDefault,
  ];

  public readonly standardVariants = [
    AlfVisualPredefinedEnum.StandardPrimary,
    AlfVisualPredefinedEnum.StandardSecondary,
    AlfVisualPredefinedEnum.StandardSuccess,
    AlfVisualPredefinedEnum.StandardDanger,
    AlfVisualPredefinedEnum.StandardWarning,
    AlfVisualPredefinedEnum.StandardInfo,
    AlfVisualPredefinedEnum.StandardLight,
    AlfVisualPredefinedEnum.StandardDark,
    AlfVisualPredefinedEnum.StandardDefault,
  ];

  public readonly crystalVariants = [
    AlfVisualPredefinedEnum.CrystalPrimary,
    AlfVisualPredefinedEnum.CrystalSecondary,
    AlfVisualPredefinedEnum.CrystalSuccess,
    AlfVisualPredefinedEnum.CrystalDanger,
    AlfVisualPredefinedEnum.CrystalWarning,
    AlfVisualPredefinedEnum.CrystalInfo,
    AlfVisualPredefinedEnum.CrystalLight,
    AlfVisualPredefinedEnum.CrystalDark,
    AlfVisualPredefinedEnum.CrystalDefault,
  ];

  public readonly softVariants = [
    AlfVisualPredefinedEnum.SoftPrimary,
    AlfVisualPredefinedEnum.SoftSecondary,
    AlfVisualPredefinedEnum.SoftSuccess,
    AlfVisualPredefinedEnum.SoftDanger,
    AlfVisualPredefinedEnum.SoftWarning,
    AlfVisualPredefinedEnum.SoftInfo,
    AlfVisualPredefinedEnum.SoftLight,
    AlfVisualPredefinedEnum.SoftDark,
    AlfVisualPredefinedEnum.SoftDefault,
  ];



  public readonly outlinedVariants = [
    AlfVisualPredefinedEnum.OutlinedPrimary,
    AlfVisualPredefinedEnum.OutlinedSecondary,
    AlfVisualPredefinedEnum.OutlinedSuccess,
    AlfVisualPredefinedEnum.OutlinedDanger,
    AlfVisualPredefinedEnum.OutlinedWarning,
    AlfVisualPredefinedEnum.OutlinedInfo,
    AlfVisualPredefinedEnum.OutlinedLight,
    AlfVisualPredefinedEnum.OutlinedDark,
    AlfVisualPredefinedEnum.OutlinedDefault,
  ];

  public readonly styles = [

    { name: 'Elegant', value: AlfCheckboxVariantEnum.Elegant },
    { name: 'Standard', value: AlfCheckboxVariantEnum.Standard },
    { name: 'Moving', value: AlfCheckboxVariantEnum.Moving },
  ];

  public readonly checkedStates = new Map<string, any>();

  public getChecked(style: string, variant: string) {
    const key = `${style}-${variant}`;
    if (!this.checkedStates.has(key)) {
      this.checkedStates.set(key, signal(false));
    }

    return this.checkedStates.get(key);
  }
}






import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AlfSelectComponent } from '@alfcomponents/components';
import { AlfColorVariantEnum, AlfInputAppearanceEnum } from '@alfcomponents/enums';
import { AlfSelectOption } from '@alfcomponents/components/composed/alf-autocomplete/interfaces/alf-auto-complete-options-interface';

@Component({
  selector: 'app-alf-select-viewer',
  standalone: true,
  imports: [AlfSelectComponent],
  templateUrl: './alf-select-viewer.html',
  styleUrl: './alf-select-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlfSelectViewer {
  // Enums para el template
  public readonly AlfInputAppearanceEnum = AlfInputAppearanceEnum;
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;

  // Estado global del visor
  public readonly selectedAppearance = signal<AlfInputAppearanceEnum>(AlfInputAppearanceEnum.Outline);

  // Variantes para las demos
  public readonly solidVariants = [
    AlfColorVariantEnum.Primary, AlfColorVariantEnum.Secondary,
    AlfColorVariantEnum.Success, AlfColorVariantEnum.Danger,
    AlfColorVariantEnum.Warning, AlfColorVariantEnum.Info,
    AlfColorVariantEnum.Light, AlfColorVariantEnum.Dark
  ];

  public readonly outlineVariants = [
    AlfColorVariantEnum.PrimaryOutline, AlfColorVariantEnum.SecondaryOutline,
    AlfColorVariantEnum.SuccessOutline, AlfColorVariantEnum.DangerOutline,
    AlfColorVariantEnum.WarningOutline, AlfColorVariantEnum.InfoOutline,
    AlfColorVariantEnum.LightOutline, AlfColorVariantEnum.DarkOutline
  ];

  public readonly ghostVariants = [
    AlfColorVariantEnum.PrimaryGhost, AlfColorVariantEnum.SecondaryGhost,
    AlfColorVariantEnum.SuccessGhost, AlfColorVariantEnum.DangerGhost,
    AlfColorVariantEnum.WarningGhost, AlfColorVariantEnum.InfoGhost,
    AlfColorVariantEnum.LightGhost, AlfColorVariantEnum.DarkGhost
  ];

  public readonly softVariants = [
    AlfColorVariantEnum.PrimarySoft, AlfColorVariantEnum.SecondarySoft,
    AlfColorVariantEnum.SuccessSoft, AlfColorVariantEnum.DangerSoft,
    AlfColorVariantEnum.WarningSoft, AlfColorVariantEnum.InfoSoft,
    AlfColorVariantEnum.LightSoft, AlfColorVariantEnum.DarkSoft
  ];

  public readonly crystalVariants = [
    AlfColorVariantEnum.PrimaryCrystal, AlfColorVariantEnum.SecondaryCrystal,
    AlfColorVariantEnum.SuccessCrystal, AlfColorVariantEnum.DangerCrystal,
    AlfColorVariantEnum.WarningCrystal, AlfColorVariantEnum.InfoCrystal,
    AlfColorVariantEnum.LightCrystal, AlfColorVariantEnum.DarkCrystal
  ];

  public readonly depthVariants = [
    AlfColorVariantEnum.Primary3D, AlfColorVariantEnum.Secondary3D,
    AlfColorVariantEnum.Success3D, AlfColorVariantEnum.Danger3D,
    AlfColorVariantEnum.Warning3D, AlfColorVariantEnum.Info3D,
    AlfColorVariantEnum.Light3D, AlfColorVariantEnum.Dark3D
  ];

  public readonly gradientVariants = [
    AlfColorVariantEnum.GradientPrimary, AlfColorVariantEnum.GradientPurple,
    AlfColorVariantEnum.GradientSuccess, AlfColorVariantEnum.GradientDanger,
    AlfColorVariantEnum.GradientWarning, AlfColorVariantEnum.GradientInfo,
    AlfColorVariantEnum.GradientOcean, AlfColorVariantEnum.GradientSunset
  ];

  // Datos Mock
  public readonly languages: AlfSelectOption[] = [
    {
      value: 'es',
      label: 'Español',
      icon: '🇪🇸',
      data: { id: 1, country: 'España', code: 'ES', region: 'Europa' }
    },
    {
      value: 'en',
      label: 'English',
      icon: '🇬🇧',
      data: { id: 2, country: 'Reino Unido', code: 'UK', region: 'Europa' }
    },
    {
      value: 'fr',
      label: 'Français',
      icon: '🇫🇷',
      data: { id: 3, country: 'Francia', code: 'FR', region: 'Europa' }
    },
    {
      value: 'de',
      label: 'Deutsch',
      icon: '🇩🇪',
      data: { id: 4, country: 'Alemania', code: 'DE', region: 'Europa' }
    },
    {
      value: 'it',
      label: 'Italiano',
      icon: '🇮🇹',
      data: { id: 5, country: 'Italia', code: 'IT', region: 'Europa' }
    },
  ];

  public readonly groupedCities: AlfSelectOption[] = [
    { value: 'mad', label: 'Madrid', icon: '🏛️', group: 'España' },
    { value: 'bar', label: 'Barcelona', icon: '⚽', group: 'España' },
    { value: 'sev', label: 'Sevilla', icon: '☀️', group: 'España' },
    { value: 'par', label: 'Paris', icon: '🗼', group: 'Francia' },
    { value: 'lyo', label: 'Lyon', icon: '🍷', group: 'Francia' },
    { value: 'rom', label: 'Roma', icon: '🏟️', group: 'Italia' },
    { value: 'mil', label: 'Milán', icon: '🍕', group: 'Italia' },
  ];

  // Signals para los valores seleccionados
  public selectedValue = signal<any>(null);

  // Signals para las variantes
  private variantValues = new Map<string, any>();

  public getValue(category: string, variant: string) {
    const key = `${category}-${variant}`;
    if (!this.variantValues.has(key)) {
      this.variantValues.set(key, signal<string | undefined>(undefined));
    }
    return this.variantValues.get(key);
  }

  public onOptionSelected(selected: AlfSelectOption | AlfSelectOption[] | null) {
    if (selected === null) {
      this.selectedValue.set(null);
    } else if (Array.isArray(selected)) {
      // Show complete objects as JSON for demonstration
      this.selectedValue.set(JSON.stringify(selected, null, 2));
    } else {
      // Show complete object as JSON for demonstration
      this.selectedValue.set(JSON.stringify(selected, null, 2));
    }
  }
}

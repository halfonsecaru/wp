import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AlfAutocompleteComponent } from '@alfcomponents/components/composed/alf-autocomplete/alf-autocomplete';
import { AlfAutocompleteConfigInterface, AlfSelectOption } from '@alfcomponents/components/composed/alf-autocomplete/interfaces/alf-autocomplete.interface';
import { AlfColorVariantEnum, AlfInputAppearanceEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-autocomplete-viewer',
  standalone: true,
  imports: [AlfAutocompleteComponent, JsonPipe],
  templateUrl: './alf-autocomplete-viewer.html',
  styleUrl: './alf-autocomplete-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfAutocompleteViewer {
  // Expose Enums to Template
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;
  public readonly AlfInputAppearanceEnum = AlfInputAppearanceEnum;

  // ── Options ──────────────────────────────────────────────────────────────
  protected readonly mockOptions: AlfSelectOption[] = [
    { value: 'es', label: 'España' },
    { value: 'fr', label: 'Francia' },
    { value: 'it', label: 'Italia' },
    { value: 'de', label: 'Alemania' },
    { value: 'uk', label: 'Reino Unido' },
    { value: 'us', label: 'Estados Unidos' },
  ];

  // ── Base Configurations ──────────────────────────────────────────────────
  protected readonly configSingle: AlfAutocompleteConfigInterface = {
    label: 'País (Selección Simple - Searchable)',
    placeholder: 'Selecciona un país...',
    options: this.mockOptions,
    searchable: true,
    clearable: true,
  };

  protected readonly configMultiple: AlfAutocompleteConfigInterface = {
    label: 'Países (Selección Múltiple - Searchable)',
    placeholder: 'Selecciona varios países...',
    options: this.mockOptions,
    searchable: true,
    clearable: true,
    multiple: true,
  };

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

  // ── Signals ──────────────────────────────────────────────────────────────
  public readonly singleValue = signal<string>('es');
  public readonly multipleValue = signal<string[]>(['es', 'it']);

  // Reactive state map for dynamic variant loops
  public readonly valuesMap = signal<Record<string, any>>({});

  // ── Functions ────────────────────────────────────────────────────────────
  public readonly updateValue = (key: string, val: any): void => {
    this.valuesMap.update(map => ({ ...map, [key]: val }));
  };

  public readonly getConfigForVariant = (variant: AlfColorVariantEnum, appearance: AlfInputAppearanceEnum = AlfInputAppearanceEnum.Outline): AlfAutocompleteConfigInterface => {
    return {
      label: `${variant} / ${appearance}`,
      placeholder: 'Selecciona...',
      options: this.mockOptions,
      searchable: true,
      clearable: true,
      colorVariant: variant,
      appearance: appearance
    };
  };

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

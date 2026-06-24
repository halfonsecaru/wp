import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AlfAutocompleteComponent } from '@alfcomponents/components';
import { AlfColorVariantEnum, AlfInputAppearanceEnum } from '@alfcomponents/enums';
import { AlfSelectOption } from '@alfcomponents/components/composed/alf-autocomplete/interfaces/alf-auto-complete-options-interface';

@Component({
  selector: 'app-alf-autocomplete-viewer',
  standalone: true,
  imports: [AlfAutocompleteComponent],
  templateUrl: './alf-autocomplete-viewer.html',
  styleUrl: './alf-autocomplete-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlfAutocompleteViewer {
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
  public readonly countries: AlfSelectOption[] = [
    { value: 'es', label: 'España', icon: '🇪🇸' },
    { value: 'fr', label: 'Francia', icon: '🇫🇷', disabled: true },
    { value: 'it', label: 'Italia', icon: '🇮🇹' },
    { value: 'de', label: 'Alemania', icon: '🇩🇪' },
    { value: 'uk', label: 'Reino Unido', icon: '🇬🇧' },
    { value: 'us', label: 'Estados Unidos', icon: '🇺🇸' },
    { value: 'jp', label: 'Japón', icon: '🇯🇵' },
    { value: 'cn', label: 'China', icon: '🇨🇳' },
    { value: 'br', label: 'Brasil', icon: '🇧🇷' },
    { value: 'mx', label: 'México', icon: '🇲🇽' },
  ];

  public readonly groupedCountries: AlfSelectOption[] = [
    { value: 'es', label: 'España', icon: '🇪🇸', group: 'Europa' },
    { value: 'fr', label: 'Francia', icon: '🇫🇷', group: 'Europa' },
    { value: 'it', label: 'Italia', icon: '🇮🇹', group: 'Europa', disabled: true },
    { value: 'de', label: 'Alemania', icon: '🇩🇪', group: 'Europa' },
    { value: 'uk', label: 'Reino Unido', icon: '🇬🇧', group: 'Europa' },
    { value: 'us', label: 'Estados Unidos', icon: '🇺🇸', group: 'América' },
    { value: 'ca', label: 'Canadá', icon: '🇨🇦', group: 'América', disabled: true },
    { value: 'mx', label: 'México', icon: '🇲🇽', group: 'América' },
    { value: 'br', label: 'Brasil', icon: '🇧🇷', group: 'América' },
    { value: 'ar', label: 'Argentina', icon: '🇦🇷', group: 'América' },
    { value: 'jp', label: 'Japón', icon: '🇯🇵', group: 'Asia' },
    { value: 'cn', label: 'China', icon: '🇨🇳', group: 'Asia' },
    { value: 'in', label: 'India', icon: '🇮🇳', group: 'Asia' },
  ];

  public readonly largeDataset: AlfSelectOption[] = Array.from({ length: 1000 }, (_, i) => ({
    value: `item_${i}`,
    label: `Elemento Virtual ${i + 1}`,
    icon: '📦'
  }));

  // Signals para los valores seleccionados
  public valStandard = signal<string | undefined>(undefined);
  public valSearchable = signal<string | undefined>(undefined);
  public valClearable = signal<string | undefined>('es');
  public valGrouped = signal<string | undefined>(undefined);
  public valVirtual = signal<string | undefined>(undefined);
  public valDisabled = signal<string | undefined>('fr');

  // Signals para las variantes
  private variantValues = new Map<string, any>();

  public getValue(category: string, variant: string) {
    const key = `${category}-${variant}`;
    if (!this.variantValues.has(key)) {
      this.variantValues.set(key, signal<string | undefined>(undefined));
    }
    return this.variantValues.get(key);
  }
}

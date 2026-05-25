import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlfRadioButton } from '@alfcomponents/components';
import { 
  AlfColorVariantEnum, 
  AlfSizeEnum, 
  AlfRadioButtonVariantEnum 
} from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-radio-button-viewer',
  standalone: true,
  imports: [AlfRadioButton],
  templateUrl: './alf-radio-button-viewer.html',
  styleUrl: './alf-radio-button-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfRadioButtonViewer {
  // Expose Enums to Template
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;
  public readonly AlfSizeEnum = AlfSizeEnum;
  public readonly AlfRadioButtonVariantEnum = AlfRadioButtonVariantEnum;

  // ── Reactive group states ──────────────────────────────────────────────────
  public readonly selectedStyleGroup = signal<string>('elegant');
  public readonly selectedLabelPosGroup = signal<string>('after');
  public readonly selectedSizeGroup = signal<AlfSizeEnum>(AlfSizeEnum.MD);
  
  // States for demo groups
  public readonly selectedSolidElegantGroup = signal<string>('primary');
  public readonly selectedSolidStandardGroup = signal<string>('primary');

  // Functional States
  public readonly checkedWithHelper = signal<boolean>(false);
  public readonly checkedWithError = signal<boolean>(false);
  public readonly dynamicSelected = signal<string>('Option A');

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

  public readonly sizes: readonly AlfSizeEnum[] = [
    AlfSizeEnum.XS,
    AlfSizeEnum.SM,
    AlfSizeEnum.MD,
    AlfSizeEnum.LG,
    AlfSizeEnum.XL,
    AlfSizeEnum.XXL
  ];

  // ── Helper functions ──────────────────────────────────────────────────────
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

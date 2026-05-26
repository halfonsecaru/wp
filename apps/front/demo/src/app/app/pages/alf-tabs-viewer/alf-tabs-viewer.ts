import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlfTabsContainerComponent, AlfTabComponent } from '@alfcomponents/components';
import { AlfColorVariantEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-tabs-viewer',
  standalone: true,
  imports: [AlfTabsContainerComponent, AlfTabComponent],
  templateUrl: './alf-tabs-viewer.html',
  styleUrl: './alf-tabs-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfTabsViewer {
  public readonly activeIndex = signal<number>(0);
  public readonly nestedActiveIndex1 = signal<number>(0);
  public readonly nestedActiveIndex2 = signal<number>(0);

  public readonly variants: readonly { label: string; value: AlfColorVariantEnum }[] = [
    { label: 'Primary', value: AlfColorVariantEnum.Primary },
    { label: 'Secondary', value: AlfColorVariantEnum.Secondary },
    { label: 'Success', value: AlfColorVariantEnum.Success },
    { label: 'Danger', value: AlfColorVariantEnum.Danger },
    { label: 'Warning', value: AlfColorVariantEnum.Warning },
    { label: 'Info', value: AlfColorVariantEnum.Info },
    { label: 'Dark', value: AlfColorVariantEnum.Dark },
    { label: 'Primary Outline', value: AlfColorVariantEnum.PrimaryOutline },
    { label: 'Success Soft', value: AlfColorVariantEnum.SuccessSoft },
    { label: 'Danger Crystal', value: AlfColorVariantEnum.DangerCrystal },
    { label: 'Warning 3D', value: AlfColorVariantEnum.Warning3D },
    { label: 'Gradient Purple', value: AlfColorVariantEnum.GradientPurple }
  ];
}

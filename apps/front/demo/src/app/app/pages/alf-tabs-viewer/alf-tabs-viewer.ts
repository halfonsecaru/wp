import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlfTabsContainerComponent, AlfTabComponent } from '@alfcomponents/components';
import { AlfColorVariantEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-tabs-viewer',
  standalone: true,
  imports: [
    AlfTabsContainerComponent,
    AlfTabComponent,
  ],
  templateUrl: './alf-tabs-viewer.html',
  styleUrl: './alf-tabs-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfTabsViewer {
  public readonly activeBasic   = signal(0);
  public readonly activeVariant = signal(0);
  public readonly activeVertical = signal(0);
  public readonly activeClosable = signal(0);
  public readonly closableTabs = signal(['Analytics', 'Reports', 'Settings', 'Profile']);

  public readonly AlfColorVariantEnum = AlfColorVariantEnum;

  public readonly variants: readonly AlfColorVariantEnum[] = [
    AlfColorVariantEnum.Primary,
    AlfColorVariantEnum.Secondary,
    AlfColorVariantEnum.Success,
    AlfColorVariantEnum.Danger,
    AlfColorVariantEnum.Warning,
    AlfColorVariantEnum.Info,
  ];

  public readonly closeTab = (index: number): void => {
    const tabs = this.closableTabs();
    this.closableTabs.set(tabs.filter((_, i) => i !== index));
  };

  /** Devuelve un array de `count` elementos para iterar en template */
  public readonly lines = (count: number): number[] =>
    Array.from({ length: count }, (_, i) => i);
}

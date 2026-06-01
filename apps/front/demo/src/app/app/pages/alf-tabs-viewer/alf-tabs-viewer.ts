import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { AlfTabsContainerComponent, AlfTabComponent } from '@alfcomponents/components';
import { AlfColorVariantEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-tabs-viewer',
  standalone: true,
  imports: [AlfTabsContainerComponent, AlfTabComponent, UpperCasePipe],
  templateUrl: './alf-tabs-viewer.html',
  styleUrl: './alf-tabs-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfTabsViewer {
  public readonly activeIndex = signal<number>(0);
  public readonly nestedActiveIndex1 = signal<number>(0);
  public readonly nestedActiveIndex2 = signal<number>(0);

  // Dynamic/Closable tab list
  public readonly dynamicTabs = signal([
    { id: '1', label: 'Dashboard', content: 'Explore premium metrics, active analytics, and dynamic KPI tracking inside your glassmorphic panel.', closable: true },
    { id: '2', label: 'Reports', content: 'Detailed analytical sheets with multi-column calculations, filter options, and responsive data rows.', closable: false },
    { id: '3', label: 'Settings', content: 'Configure system permissions, API credentials, webhooks, and visual engine themes.', closable: true },
  ]);
  public readonly dynamicActiveIndex = signal<number>(0);

  // Layout showcase configuration
  public readonly demoOrientation = signal<'horizontal' | 'vertical'>('horizontal');
  public readonly demoKeyboard = signal<'automatic' | 'manual'>('automatic');

  public addTab(): void {
    const nextId = String(this.dynamicTabs().length + 1);
    const newTab = {
      id: nextId,
      label: `Dynamic Tab ${nextId}`,
      content: `Content for dynamic pane #${nextId}. This is fully closable and syncs correctly with the stretch indicator.`,
      closable: true
    };
    this.dynamicTabs.update(tabs => [...tabs, newTab]);
    this.dynamicActiveIndex.set(this.dynamicTabs().length - 1);
  }

  public handleCloseTab(index: number): void {
    this.dynamicTabs.update(tabs => tabs.filter((_, idx) => idx !== index));
  }

  public toggleOrientation(): void {
    this.demoOrientation.update(o => o === 'horizontal' ? 'vertical' : 'horizontal');
  }

  public toggleKeyboard(): void {
    this.demoKeyboard.update(k => k === 'automatic' ? 'manual' : 'automatic');
  }

  public readonly variants: readonly { label: string; value: AlfColorVariantEnum }[] = [
    { label: 'Primary Outline', value: AlfColorVariantEnum.PrimaryOutline },
    { label: 'Secondary Outline', value: AlfColorVariantEnum.SecondaryOutline },
    { label: 'Success Outline', value: AlfColorVariantEnum.SuccessOutline },
    { label: 'Danger Outline', value: AlfColorVariantEnum.DangerOutline },
    { label: 'Warning Outline', value: AlfColorVariantEnum.WarningOutline },
    { label: 'Info Outline', value: AlfColorVariantEnum.InfoOutline },
    { label: 'Light Outline', value: AlfColorVariantEnum.LightOutline },
    { label: 'Dark Outline', value: AlfColorVariantEnum.DarkOutline }
  ];

  public readonly manyTabs: readonly { label: string; lines: string[] }[] = Array.from({ length: 20 }, (_, i) => ({
    label: `Tab ${i + 1}`,
    lines: Array.from({ length: i + 1 }, (_, lineIdx) => `Esta es la línea de contenido número ${lineIdx + 1} de la pestaña ${i + 1}.`)
  }));
}

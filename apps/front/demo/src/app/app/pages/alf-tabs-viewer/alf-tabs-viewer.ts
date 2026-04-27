import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { 
  AlfTabsContainerComponent, 
  AlfTabComponent, 
  AlfTabsContainerConfigInterface, 
  AlfTabsStyleEnum,
  AlfButtonVisualTypeEnum,
  AlfColorVariantEnum
} from '@alfcomponents';

@Component({
  selector: 'app-alf-tabs-viewer',
  standalone: true,
  imports: [AlfTabsContainerComponent, AlfTabComponent],
  templateUrl: './alf-tabs-viewer.html',
  styleUrl: './alf-tabs-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfTabsViewer {
  /**
   * Configuración de la demo usando la variante secundaria por defecto para los botones.
   */
  public readonly tabsConfig = signal<AlfTabsContainerConfigInterface>({
    tabsStyle: AlfTabsStyleEnum.Underline
  });

  public readonly manyTabs = Array.from({ length: 20 }, (_, i) => ({
    name: `Tab ${i + 1}`,
    lines: Array.from({ length: i + 1 }, (_, j) => `Línea ${j + 1} de contenido para la pestaña ${i + 1}`)
  }));

  public readonly nestedTabs = Array.from({ length: 5 }, (_, i) => ({
    name: `Sección ${i + 1}`,
    subTabs: Array.from({ length: 4 }, (_, j) => ({
      name: `SubTab ${i + 1}.${j + 1}`,
      lines: Array.from({ length: (i + j + 1) * 2 }, (_, k) => `Detalle ${k + 1} de la sub-pestaña ${j + 1}`)
    }))
  }));
}

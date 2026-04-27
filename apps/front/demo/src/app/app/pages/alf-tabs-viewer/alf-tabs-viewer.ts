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
}

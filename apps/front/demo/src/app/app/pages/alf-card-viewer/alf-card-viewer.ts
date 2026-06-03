import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AlfCardComponent,
  AlfCardTitleComponent,
  AlfCardBodyComponent,
  AlfCardImgComponent,
  AlfCardActionsComponent,
  AlfButton,
} from '@alfcomponents/components';
import { AlfColorVariantEnum } from '@alfcomponents/enums';

@Component({
  selector: 'app-alf-card-viewer',
  standalone: true,
  imports: [
    AlfCardComponent,
    AlfCardTitleComponent,
    AlfCardBodyComponent,
    AlfCardImgComponent,
    AlfCardActionsComponent,
    AlfButton,
  ],
  templateUrl: './alf-card-viewer.html',
  styleUrl: './alf-card-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCardViewer {
  protected readonly AlfColorVariantEnum = AlfColorVariantEnum;

  protected onCardClick(event: MouseEvent): void {
    alert('¡Click en la tarjeta interactiva!');
  }
}

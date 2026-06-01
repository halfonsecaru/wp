import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlfCardComponent } from '@alfcomponents/components';

@Component({
  selector: 'app-alf-card-viewer',
  standalone: true,
  imports: [AlfCardComponent],
  templateUrl: './alf-card-viewer.html',
  styleUrl: './alf-card-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCardViewer {}

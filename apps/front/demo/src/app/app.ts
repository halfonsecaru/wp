import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AlfTabsViewer } from './app/pages/alf-tabs-viewer/alf-tabs-viewer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlfTabsViewer],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App { }



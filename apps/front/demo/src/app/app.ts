import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AlfTabsViewer } from './app/pages/alf-tabs-viewer/alf-tabs-viewer';
import { AlfCheckboxViewer } from './app/pages/alf-checkbox-viewer/alf-checkbox-viewer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlfCheckboxViewer],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App { }



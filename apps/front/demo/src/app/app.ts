import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlfButtonsViewer } from './app/pages/alf-buttons-viewer/alf-buttons-viewer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlfButtonsViewer],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {

  private readonly router = inject(Router);
  

  constructor() {}
}



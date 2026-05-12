import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app/pages/alf-radio-button-viewer/alf-radio-button-viewer').then(m => m.AlfRadioButtonViewer)
  },
  {
    path: 'checkbox',
    loadComponent: () => import('./app/pages/alf-checkbox-viewer/alf-checkbox-viewer').then(m => m.AlfCheckboxViewer)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./app/pages/alf-tabs-viewer/alf-tabs-viewer').then(m => m.AlfTabsViewer)
  },
  {
    path: 'input',
    loadComponent: () => import('./app/pages/alf-input-viewer/alf-input-viewer').then(m => m.AlfInputViewer)
  },
  {
    path: 'buttons',
    loadComponent: () => import('./app/pages/alf-buttons-viewer/alf-buttons-viewer').then(m => m.AlfButtonsViewer)
  }
];

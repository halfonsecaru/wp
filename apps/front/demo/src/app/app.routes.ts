import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./app/pages/alf-radio-button-viewer/alf-radio-button-viewer').then(m => m.AlfRadioButtonViewer)
  },

  {
    path: 'radio',
    loadComponent: () => import('./app/pages/alf-radio-button-viewer/alf-radio-button-viewer').then(m => m.AlfRadioButtonViewer)
  },

  {
    path: 'switch',
    loadComponent: () => import('./app/pages/alf-switch-viewer/alf-switch-viewer').then(m => m.AlfSwitchViewer)
  },
  {
    path: 'checkbox',
    loadComponent: () => import('./app/pages/alf-checkbox-viewer/alf-checkbox-viewer').then(m => m.AlfCheckboxViewer)
  },
  {
    path: 'buttons',
    loadComponent: () => import('./app/pages/alf-button-viewer/alf-button-viewer').then(m => m.AlfButtonViewer)
  }
];

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
    path: 'input',
    loadComponent: () => import('./app/pages/alf-input-viewer/alf-input-viewer').then(m => m.AlfInputViewer)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./app/pages/alf-tabs-viewer/alf-tabs-viewer').then(m => m.AlfTabsViewer)
  },
  {
    path: 'buttons',
    loadComponent: () => import('./app/pages/alf-button-viewer/alf-button-viewer').then(m => m.AlfButtonViewer)
  },
  {
    path: 'card',
    loadComponent: () => import('./app/pages/alf-card-viewer/alf-card-viewer').then(m => m.AlfCardViewer)
  },
  {
    path: 'autocomplete',
    loadComponent: () => import('./app/pages/alf-autocomplete-viewer/alf-autocomplete-viewer').then(m => m.AlfAutocompleteViewer)
  },
  {
    path: 'base',
    loadComponent: () => import('./app/pages/alf-base-viewer/alf-base-viewer').then(m => m.AlfBaseViewer)
  }
];

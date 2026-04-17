import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'buttons/solid',
    loadComponent: () => import('./pages/solid-buttons').then(m => m.SolidButtonsPage)
  },
  {
    path: 'composed/tabs',
    loadComponent: () => import('./pages/tabs-demo').then(m => m.TabsDemoPage)
  },
  {
    path: '',
    redirectTo: 'buttons/solid',
    pathMatch: 'full'
  }
];

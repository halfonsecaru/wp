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
    path: 'composed/tabs',
    loadComponent: () => import('./pages/tabs-demo').then(m => m.TabsDemoPage)
  },
  {
    path: 'playground/tabs',
    loadComponent: () => import('./pages/tabs-playground').then(m => m.TabsPlaygroundPage)
  },
  {
    path: '',
    redirectTo: 'playground/tabs',
    pathMatch: 'full'
  }
];

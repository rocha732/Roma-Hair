import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/login/login').then((m) => m.LoginComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

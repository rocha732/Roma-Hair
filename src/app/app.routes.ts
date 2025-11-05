import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/login/login').then(m => m.LoginComponent)
  },
  {
  path: 'dashboard',
  loadChildren: () =>
    import('./views/dashboard/dashboard-module').then(
      (m) => m.DashboardModule
    ),
  canActivate: [AuthGuard],
}
,
  { path: '**', redirectTo: '' }
];

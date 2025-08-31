import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'processes', loadComponent: () => import('./components/process/process-list/process-list.component').then(m => m.ProcessListComponent) },
  { path: 'processes/new', loadComponent: () => import('./components/process/process-form/process-form.component').then(m => m.ProcessFormComponent) },
  { path: 'processes/edit/:id', loadComponent: () => import('./components/process/process-edit/process-edit.component').then(m => m.ProcessEditComponent) },
  { path: 'statistics', loadComponent: () => import('./components/statistics/statistics.component').then(m => m.StatisticsComponent) },
  { path: 'settings', loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent) },
  { path: '**', redirectTo: '/home' }
]; 
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'employees',
        loadComponent: () =>
          import(
            './features/employee-list/employee-list.component'
          ).then((m) => m.EmployeeListComponent),
      },
      {
        path: 'employees/add',
        loadComponent: () =>
          import(
            './features/employee-add/employee-add.component'
          ).then((m) => m.EmployeeAddComponent),
      },
      {
        path: 'employees/:id',
        loadComponent: () =>
          import(
            './features/employee-detail/employee-detail.component'
          ).then((m) => m.EmployeeDetailComponent),
      },
      {
        path: 'employees/:id/edit',
        loadComponent: () =>
          import(
            './features/employee-edit/employee-edit.component'
          ).then((m) => m.EmployeeEditComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];

import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../auth';

import { Admin } from './admin.component';

const routes: Routes = [
  {
    path: 'pages',
    component: Admin,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'dashboard',
      //   component: Dashboard,
      // },
    ],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', loadChildren: () => System.import('./login/login.module') },
];

export const AdminRouting = RouterModule.forChild(routes);

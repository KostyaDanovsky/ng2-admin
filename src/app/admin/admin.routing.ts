import { Routes, RouterModule } from '@angular/router';

import { Admin } from './admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/dashboard' },
  { path: 'pages', loadChildren: () => System.import('./pages/pages.module') },
  { path: 'login', loadChildren: () => System.import('./login/login.module') },
];

export const AdminRouting = RouterModule.forChild(routes);

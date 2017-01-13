import { Routes, RouterModule }  from '@angular/router';

import { AuthGuard } from '../../auth';
import { Pages } from './pages.component';
import { Dashboard } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
    ],
  },
];

export const PagesRouting = RouterModule.forChild(routes);

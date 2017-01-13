import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../../theme/nga.module';

import { Dashboard } from './dashboard.component';

const DASHBOARD_SERVICES = [
];

const DASHBOARD_COMPONENTS = [
  Dashboard,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
  ],
  declarations: [
    ...DASHBOARD_COMPONENTS
  ],
  providers: [
    ...DASHBOARD_SERVICES
  ],
})
export class DashboardModule {
}

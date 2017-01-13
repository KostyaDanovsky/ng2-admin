import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { PagesRouting }       from './pages.routing';
import { NgaModule } from '../../theme/nga.module';

import { Pages } from './pages.component';
import { Dashboard } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    PagesRouting
  ],
  declarations: [
    Pages,
    Dashboard,
  ]
})
export class PagesModule {
}

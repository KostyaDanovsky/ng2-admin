import {Component, ViewEncapsulation} from '@angular/core';

import { PAGES_MENU } from './pages.menu';

@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ba-sidebar [routes]="adminRoutes"></ba-sidebar>
    <ba-page-top isAdminUI="true"></ba-page-top>
    <template ngbModalContainer></template>
    <error-handling-modal></error-handling-modal>
    <div class="al-main">
      <div class="al-content">
        <router-outlet></router-outlet>
      </div>
    </div>
    `
})
export class Pages {
  adminRoutes = PAGES_MENU;
}

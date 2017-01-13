import { Component, ViewEncapsulation } from '@angular/core';

import { PAGES_MENU } from './admin.menu';

@Component({
  selector: 'admin',
  encapsulation: ViewEncapsulation.None,
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
    `,
})
export class Admin {

  adminRoutes = PAGES_MENU;

}

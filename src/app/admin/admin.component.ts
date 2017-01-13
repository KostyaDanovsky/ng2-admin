import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'admin',
  encapsulation: ViewEncapsulation.None,
  template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <router-outlet></router-outlet>
    </main>
    `,
})
export class Admin {
}

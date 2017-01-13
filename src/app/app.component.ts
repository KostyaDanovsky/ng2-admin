import './app.loader.ts';

import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { GlobalState } from './global.state';
import { BaThemeSpinner } from './theme/services';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('normalize.css'), require('./app.scss')],
  template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App implements AfterViewInit {

  isMenuCollapsed: boolean = false;

  constructor(private state: GlobalState,
              private spinner: BaThemeSpinner,
              private toastr: ToastsManager,
              vRef: ViewContainerRef) {

    this.state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.toastr.setRootViewContainerRef(vRef);
  }

  ngAfterViewInit(): void {
    this.spinner.hide();
  }
}

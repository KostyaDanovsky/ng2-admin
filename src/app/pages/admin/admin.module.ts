import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from '../../environment';

// Routes
import { AdminRouting } from './admin.routing';

// App is our top level component
import { App } from '../../app.component';
import { ConfigProvider } from '../../app.config';
import { routing } from '../../app.routing';
import { AppState, InternalStateType } from '../../app.service';
import { GlobalState } from '../../global.state';
import { NgaModule } from '../../theme/nga.module';

import { Admin } from './admin.component';

// Modules
import { AnnouncementsModule } from './announcements/announcements.module';
import { ChallengesModule } from './challenges/challenges.module';
import { CommunitiesModule } from './communities/communities.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrganizationsModule } from './organizations/organizations.module';

import { PagesCommonModule } from '../common/pages.common.module';
import { AuthModule } from '../../auth/auth.module';
import { HelpersModule } from '../../helpers/helpers.module';
import { ServicesModule } from '../../services/services.module';

import { SharedModule } from './@shared/shared.module';
import { PurchasesModule } from './purchases/purchases.module';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';
import { ReviewTasksModule } from './reviewTasks/reviewTasks.module';
import { RewardsModule } from './rewards/rewards.module';
import { UsersModule } from './users/users.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { SearchModule } from '../common/search/search.module';

import { LoginModule } from '../common/login/login.module';
import { RegisterModule } from '../common/register/register.module';
import { OrganizationModule } from '../common/organization/organization.module';
import { ForgotPasswordModule } from '../common/forgotPassword/forgotPassword.module';
import { RestorePasswordModule } from '../common/restorePassword/restorePassword.module';
import { PolicyModule } from '../common/policy/policy.module';
import { TermsModule } from '../common/terms/terms.module';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  ConfigProvider,
  GlobalState,
  { provide: 'environment', useValue: APP_ENV },
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule,
    NgbModule.forRoot(),
    NgaModule.forRoot(),
    AuthModule.forRoot(),
    HelpersModule.forRoot(),
    ServicesModule.forRoot(),
    routing,
    AdminRouting,
    PagesCommonModule,
    SharedModule,
    AnnouncementsModule,
    ChallengesModule,
    CommunitiesModule,
    DashboardModule,
    OrganizationsModule,
    PurchasesModule,
    QuestionnairesModule,
    ReviewTasksModule,
    RewardsModule,
    UsersModule,
    WorkflowsModule,
    SearchModule,
    LoginModule,
    RegisterModule,
    OrganizationModule,
    ForgotPasswordModule,
    RestorePasswordModule,
    PolicyModule,
    TermsModule,
  ],
  declarations: [
    App,
    Admin
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AdminModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

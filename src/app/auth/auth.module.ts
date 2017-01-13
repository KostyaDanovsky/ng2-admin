import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import {
  AuthGuard,
  AuthorizedHttp,
  AuthService,
} from './';

const AUTH_SERVICES = [
  AuthGuard,
  AuthorizedHttp,
  AuthService,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: AuthModule,
      providers: [
        ...AUTH_SERVICES
      ]
    };
  }
}

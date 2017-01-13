import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgaModule } from '../../../theme/nga.module';

import { LanguageService } from './language.service';
import { Login } from './login.component';

const LOGIN_COMPONENTS = [
  Login,
];

const LOGIN_SERVICES = [
  LanguageService
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgaModule,
  ],
  declarations: [
    LOGIN_COMPONENTS
  ],
  providers: [
    LOGIN_SERVICES
  ]
})
export class LoginModule {
}

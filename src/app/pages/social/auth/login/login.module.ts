import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown/dropdown.module';

import { NgaModule } from '../../../theme/nga.module';

import { LoginContainer } from './loginContainer.component';
import { LanguageService } from './language.service';
import { BaseLogin } from './baseLogin/baseLogin.component';
import { GmLogin } from './gm/gmLogin.component';

const LOGIN_COMPONENTS = [
  LoginContainer,
  BaseLogin,
  GmLogin
];

const LOGIN_SERVICES = [
  LanguageService
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
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

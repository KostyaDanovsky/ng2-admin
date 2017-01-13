import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown/dropdown.module';

import { NgaModule } from '../../../theme/nga.module';

import { RegisterContainer } from './registerContainer.component';
import { BaseRegister } from './baseRegister/baseRegister.component';
import { GmRegister } from './gm/gmRegister.component';
import { LanguageService } from '../login/language.service';

const REGISTER_COMPONENTS = [
  RegisterContainer,
  BaseRegister,
  GmRegister
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReCaptchaModule,
    DropdownModule,
    RouterModule,
    NgaModule,
  ],
  declarations: [
    ...REGISTER_COMPONENTS
  ],
  providers: [
    LanguageService,
  ]
})
export class RegisterModule {
}

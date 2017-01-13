import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgaModule } from '../../theme/nga.module';

import { Login } from './login/login.component';
import { LanguageService } from './language.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgaModule,
  ],
  declarations: [
    Login
  ],
  providers: [
    LanguageService
  ],
})
export class AdminAuthModule {
}

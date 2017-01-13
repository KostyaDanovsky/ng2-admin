import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgaModule } from '../../../theme/nga.module';

import { ForgotPassword } from './forgotPassword.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgaModule,
  ],
  declarations: [
    ForgotPassword
  ],
})
export class ForgotPasswordModule {
}

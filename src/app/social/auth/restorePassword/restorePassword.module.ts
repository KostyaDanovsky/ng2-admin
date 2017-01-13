import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgaModule } from '../../../theme/nga.module';

import { RestorePassword } from './restorePassword.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgaModule,
  ],
  declarations: [
    RestorePassword
  ],
})
export class RestorePasswordModule {
}

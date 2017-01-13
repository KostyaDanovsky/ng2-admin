import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './user.service';

const SERVICES = [
  UserService,
];

@NgModule({
  imports: [
    CommonModule,
  ]
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ServicesModule,
      providers: [
        ...SERVICES
      ]
    };
  }
}

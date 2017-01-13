import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageService } from './language.service';

const SERVICES = [
  LanguageService,
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

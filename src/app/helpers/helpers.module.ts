import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { FileHelperService } from './fileHelper.service';
import { ErrorModal } from './errorModal/errorModal.component';
import { ErrorModalService } from './errorModal/errorModal.service';
import { ErrorModalContent } from './errorModal/errorModalContent/errorModalContent.component';

const HELPERS_SERVICES = [
  FileHelperService,
  ErrorModalService,
];

@NgModule({
  declarations: [
    ErrorModal,
    ErrorModalContent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  providers: [
    ...HELPERS_SERVICES
  ],
  entryComponents: [
    ErrorModalContent,
  ]
})
export class HelpersModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: HelpersModule,
      providers: [
        ...HELPERS_SERVICES
      ]
    };
  }
}

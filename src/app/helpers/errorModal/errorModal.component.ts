import { Component } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { ErrorModalContent } from './errorModalContent/errorModalContent.component';
import { ErrorModalService } from './errorModal.service';
import { AppState, InternalStateType } from '../../app.service';

@Component({
  selector: 'error-modal',
  template: ``,
})
export class ErrorModal {

  constructor(private modalService: NgbModal,
              private errorModalService: ErrorModalService,
              private appState: AppState) {

    errorModalService.show$
      .subscribe((data: { caption: string, message: string, details?: string, errorCode?: number }) => {

        const state: InternalStateType = this.appState.get();

        if (!state['errorModal.opened']) {
          const modalOptions: NgbModalOptions = {
            backdrop: 'static',
          };
          const errorHandlingModal = this.modalService.open(ErrorModalContent, modalOptions);

          errorHandlingModal.componentInstance.caption = data.caption;
          errorHandlingModal.componentInstance.message = data.message;
          errorHandlingModal.componentInstance.details = data.details;
          errorHandlingModal.componentInstance.errorCode = data.errorCode;

          errorHandlingModal.result.then(result => {
            this.appState.set('errorModal.opened', false);
          });

          this.appState.set('errorModal.opened', true);
        }
      });
  }

}

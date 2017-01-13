import { Injector } from '@angular/core';

import { ErrorModalService } from './errorModal/errorModal.service';

export class DefaultErrorHandler {

  constructor(private injector: Injector) {
  }

  handle(error: { caption: string, message: string, details?: string, errorCode?: number }) {
    this.errorModalService.show(error);
  }

  private get errorModalService(): ErrorModalService {
    return this.injector.get(ErrorModalService);
  }

}

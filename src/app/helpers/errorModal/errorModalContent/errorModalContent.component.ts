import { Component, ViewEncapsulation, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'error-handling-modal-content',
  encapsulation: ViewEncapsulation.None,
  template: require('./errorModalContent.component.html'),
  styles: [require('./errorModalContent.component.scss')],
})
export class ErrorModalContent {

  @Input() caption: string;
  @Input() message: string;
  @Input() details: string;
  @Input() errorCode: number;

  isCollapsed: boolean = true;

  constructor(private activeModal: NgbActiveModal) {
  }

  cancel() {
    this.activeModal.close();
  }
}

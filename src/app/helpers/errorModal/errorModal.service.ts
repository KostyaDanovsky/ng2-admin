import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ErrorModalService {

  // Observable source
  private showSource = new Subject<any>();

  // Observable stream
  show$ = this.showSource.asObservable();

  // Service message command
  show(data: any) {
    this.showSource.next(data);
  }

}

import { Injectable, Injector } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { DefaultErrorHandler } from './defaultErrorHandler';

@Injectable()
export class AuthorizedHttp {

  constructor(private http: Http,
              private authService: AuthService,
              private injector: Injector) {
  }

  get(url: string, args: RequestOptionsArgs = { headers: new Headers() },
      errorHandler?: DefaultErrorHandler): Observable<Response> {
    this.addAuthTokenHeader(args.headers);
    return this.intercept(this.http.get(url, args), errorHandler);
  }

  post(url: string, data: string, args: RequestOptionsArgs = { headers: new Headers() },
       errorHandler?: DefaultErrorHandler): Observable<Response> {
    this.addAuthTokenHeader(args.headers);
    return this.intercept(this.http.post(url, data, args), errorHandler);
  }

  put(url: string, data: string, args: RequestOptionsArgs = { headers: new Headers() },
      errorHandler?: DefaultErrorHandler): Observable<Response> {
    this.addAuthTokenHeader(args.headers);
    return this.intercept(this.http.put(url, data, args), errorHandler);
  }

  delete(url: string, args: RequestOptionsArgs = { headers: new Headers() },
         errorHandler?: DefaultErrorHandler): Observable<Response> {
    this.addAuthTokenHeader(args.headers);
    return this.intercept(this.http.delete(url, args), errorHandler);
  }

  private addAuthTokenHeader(headers: Headers) {
    if (this.authService.isLoggedIn()) {
      headers.append('at', this.authService.getAuthToken());
    }
  }

  private intercept(observable: Observable<Response>, errorHandler: DefaultErrorHandler): Observable<Response> {
    return observable.catch((err, source) => {
      if (err.status === 401) {
        this.authService.logout();
        return Observable.empty();
      }

      if (err.status === 500) {
        if (!errorHandler) {
          errorHandler = new DefaultErrorHandler(this.injector);
        }

        errorHandler.handle({
          caption: 'Error Occurred',
          message: 'Something went wrong. Please try again or contact your administrator.',
          details: err.json().stackTrace,
          errorCode: err.json().errorCode,
        });
      }

      return Observable.throw(err.json());
    });
  }

}

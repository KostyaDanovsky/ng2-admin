import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ConfigProvider } from '../app.config';

@Injectable()
export class AuthService {

  redirectUrl: string;

  private endpoint: string;
  private authTokenKey: string = `${APP}_auth_token`;
  private orgNameKey: string = `${APP}_org_name`;

  constructor(private http: Http, private router: Router, private configProvider: ConfigProvider) {
    this.endpoint = this.configProvider.getConfigParam('apiEndpoint');
  }

  login(userInfo) {
    const body = {
      userEmail: userInfo.email,
      password: userInfo.password,
      rememberMe: userInfo.rememberMe,
      orgnName: userInfo.orgName,
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });

    const loginObservable = this.http.post(this.endpoint + 'api/v2/login/' + APP, JSON.stringify(body), { headers });

    return Observable.create(observer => {
      loginObservable.subscribe(res => {
        let data = res.json().data;
        localStorage.setItem(this.authTokenKey, data.authtoken);

        observer.next(res);
        observer.complete();
      }, err => {
        observer.error(err.json());
      });
    });
  }

  signUp(userInfo, captcha) {
    const body = {
      user: {
        email: userInfo.email,
        password: userInfo.passwords.password,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      },
      orgnName: userInfo.orgName,
      key: userInfo.key,
      captchaResponseString: captcha
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });

    const signUpObservable = this.http.post(this.endpoint + 'api/user/signup', JSON.stringify(body), { headers });

    return Observable.create(observer => {
      signUpObservable.subscribe(res => {
        let data = res.json();
        localStorage.setItem(this.authTokenKey, data.authtoken);

        observer.next(res);
        observer.complete();
      }, err => {
        observer.error(err.json());
      });
    });
  }

  checkUserEmail(email) {
    const body = {
      userEmail: email,
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.endpoint + 'core/CheckUserEmail', JSON.stringify(body), { headers })
      .map(res => res.json());
  }

  requestPasswordRest(email, orgName) {
    const body = {
      email: email,
      orgnName: orgName,
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.endpoint + 'api/v2/users/send-password-reset-email', JSON.stringify(body), { headers })
      .map(res => res.json());
  }

  doPasswordRest(password, key, orgName) {
    const body = {
      password: password,
      token: key,
      orgnName: orgName,
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.endpoint + 'api/v2/users/set-new-password', JSON.stringify(body), { headers })
      .map(res => res.json());
  }

  logout() {
    localStorage.removeItem(this.authTokenKey);
    this.router.navigate(['/organization']);
  }

  isLoggedIn() {
    return !!this.getAuthToken();
  }

  getAuthToken() {
    return localStorage.getItem(this.authTokenKey);
  }

  get orgName(): string {
    return localStorage.getItem(this.orgNameKey);
  }

  set orgName(value: string) {
    localStorage.setItem(this.orgNameKey, value);
  }

  clearOrganization() {
    localStorage.removeItem(this.orgNameKey);
  }

}

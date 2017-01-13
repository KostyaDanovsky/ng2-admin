import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ConfigProvider } from '../../app.config';

@Injectable()
export class UserService {

  private endpoint: string;

  constructor(private http: Http, private configProvider: ConfigProvider) {
    this.endpoint = this.configProvider.getConfigParam('apiEndpoint');
  }

  getUsers() {
    return this.http.get(this.endpoint + 'api/v2/users')
      .map(res => res.json().data);
  }
}
